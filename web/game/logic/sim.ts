import { type EnemyKind, type LevelId, CAMPAIGN, levelById } from "./campaign";
import { HEAVY_DAMAGE, LIGHT_DAMAGE, inRange } from "./combat";
import { applyDamage, createHealth, heal, isDead } from "./health";
import type { InputFrame } from "./input";
import { addScore, createScore, tickCombo } from "./score";
import { catchQuality } from "./towel";
import type { Actor, Pickup, Projectile, World } from "./types";

export const VIEW_W = 1280;
export const VIEW_H = 720;
const WALK = 220;
const DODGE_SPEED = 420;
const ATTACK_MS = 200;
const HEAVY_MS = 320;
const HURT_MS = 220;
const CHASE_MS = 16000;

const ENEMY_HITS: Record<EnemyKind, number> = {
  waitress: 3,
  rat: 3,
  tenant: 3,
  patron: 3,
  bouncer: 6,
  mechanic: 4,
  docker: 5,
  sailor: 4,
};

const BOSS_HITS: Record<string, number> = {
  bertie: 12,
  charlie: 15,
  desi: 15,
  tippi: 18,
  bessie: 18,
  harry: 21,
  ivy: 21,
  kewpie: 30,
};

function clamp(n: number, a: number, b: number): number {
  return Math.max(a, Math.min(b, n));
}

function nextId(world: World): string {
  world.nextId += 1;
  return `id-${world.nextId}`;
}

function readyActor(actor: Actor): Actor {
  actor.dodgeCd ??= 0;
  actor.pendingHit ??= false;
  actor.heavy ??= false;
  actor.vx ??= 0;
  actor.vy ??= 0;
  return actor;
}

function makePlayer(x: number, y: number): Actor {
  return {
    id: "sonny",
    kind: "player",
    name: "Sonny",
    sprite: "sonny",
    x,
    y,
    vx: 0,
    vy: 0,
    facing: 1,
    hp: createHealth(3),
    state: "idle",
    stateMs: 0,
    invulnMs: 2200,
    attackCd: 0,
    dodgeCd: 0,
    radius: 22,
    range: 58,
    pendingHit: false,
    heavy: false,
  };
}

function makeEnemy(world: World, kind: EnemyKind, x: number, y: number): Actor {
  const hits = ENEMY_HITS[kind];
  const thrower = kind === "tenant" || kind === "patron" || kind === "sailor";
  return {
    id: nextId(world),
    kind: thrower ? "thrower" : "grunt",
    name: kind,
    sprite: kind,
    enemyKind: kind,
    x,
    y,
    vx: 0,
    vy: 0,
    facing: -1,
    hp: createHealth(Math.ceil(hits / 3)),
    state: "idle",
    stateMs: 0,
    invulnMs: 0,
    attackCd: 900 + Math.random() * 500,
    dodgeCd: 0,
    radius: kind === "bouncer" ? 28 : 20,
    range: 50,
    pendingHit: false,
    heavy: false,
  };
}

function makeBoss(world: World): Actor {
  const hits = BOSS_HITS[world.level.bossKind] ?? 12;
  return {
    id: "boss",
    kind: "boss",
    name: world.level.boss,
    sprite: world.level.bossKind,
    x: Math.min(world.width - 180, world.player.x + 520),
    y: 540,
    vx: 0,
    vy: 0,
    facing: -1,
    hp: createHealth(Math.ceil(hits / 3)),
    state: "idle",
    stateMs: 0,
    invulnMs: 400,
    attackCd: 700,
    dodgeCd: 0,
    radius: 34,
    range: 72,
    pendingHit: false,
    heavy: false,
  };
}

function spawnWave(world: World, index: number): void {
  const wave = world.level.waves[index];
  if (!wave) return;
  wave.forEach((kind, i) => {
    const x = world.player.x + 720 + i * 200;
    const y = 480 + (i % 3) * 70;
    world.actors.push(makeEnemy(world, kind, clamp(x, 200, world.width - 80), y));
  });
}

function livingFoes(world: World): Actor[] {
  return world.actors.filter((a) => a.kind !== "player" && !isDead(a.hp) && a.state !== "dead");
}

function float(world: World, text: string, x: number, y: number, color = "#f4e8d3"): void {
  world.messages.push({ text, x, y, life: 700, color });
}

function hurt(world: World, actor: Actor, amount: number, fromX: number): void {
  if (actor.invulnMs > 0 || isDead(actor.hp)) return;
  actor.hp = applyDamage(actor.hp, amount);
  actor.state = isDead(actor.hp) ? "dead" : "hurt";
  actor.stateMs = isDead(actor.hp) ? 600 : HURT_MS;
  actor.invulnMs = actor.kind === "player" ? 700 : 180;
  actor.vx = Math.sign(actor.x - fromX) * 180 || -actor.facing * 180;
  actor.pendingHit = false;
  if (isDead(actor.hp) && actor.kind === "player") {
    world.lives -= 1;
    if (world.lives <= 0) {
      world.phase = "gameover";
    } else {
      actor.hp = createHealth(3);
      actor.state = "hurt";
      actor.stateMs = HURT_MS;
      actor.invulnMs = 1600;
    }
  } else if (isDead(actor.hp) && actor.kind !== "player") {
    world.score = addScore(world.score, "defeat");
    float(world, "100", actor.x, actor.y - 80, "#c9a55a");
    if (Math.random() < 0.28) {
      world.pickups.push({
        id: nextId(world),
        kind: Math.random() < 0.35 ? "pie" : "hotdog",
        x: actor.x,
        y: actor.y,
        life: 8000,
      });
    }
    if (actor.kind === "boss") {
      world.phase = "fatality";
      world.fatalityMs = 0;
    }
  }
}

function strike(world: World, attacker: Actor): void {
  const dmg = attacker.heavy ? HEAVY_DAMAGE : LIGHT_DAMAGE;
  for (const target of world.actors) {
    if (target.id === attacker.id || isDead(target.hp)) continue;
    if (attacker.kind === "player" && target.kind === "player") continue;
    if (attacker.kind !== "player" && target.kind !== "player") continue;
    if (!inRange(attacker, target)) continue;
    hurt(world, target, dmg, attacker.x);
    world.shake = Math.max(world.shake, attacker.heavy ? 10 : 5);
    if (attacker.kind === "player") world.special = Math.min(1, world.special + 0.08);
  }
}

function controlPlayer(world: World, input: InputFrame, dt: number): void {
  const p = readyActor(world.player);
  const locked = p.state === "attack" || p.state === "hurt" || p.state === "dodge" || p.state === "dead";

  if (!locked) {
    const mx = clamp(input.moveX, -1, 1);
    const my = clamp(input.moveY, -1, 1);
    p.x = clamp(p.x + mx * WALK * (dt / 1000), 48, world.width - 48);
    p.y = clamp(p.y + my * WALK * (dt / 1000), world.floorMin, world.floorMax);
    if (mx !== 0) p.facing = mx > 0 ? 1 : -1;
    p.state = mx !== 0 || my !== 0 ? "walk" : "idle";
  }

  if (p.state === "dodge") {
    p.x = clamp(p.x + p.facing * DODGE_SPEED * (dt / 1000), 48, world.width - 48);
  }

  if (input.dodge && p.dodgeCd <= 0 && p.state !== "hurt" && p.state !== "dead") {
    p.state = "dodge";
    p.stateMs = 200;
    p.invulnMs = 220;
    p.dodgeCd = 420;
  }

  if ((input.light || input.heavy) && p.attackCd <= 0 && p.state !== "hurt" && p.state !== "dead" && p.state !== "dodge") {
    p.state = "attack";
    p.heavy = input.heavy && !input.light;
    p.stateMs = p.heavy ? HEAVY_MS : ATTACK_MS;
    p.attackCd = p.heavy ? 420 : 260;
    p.pendingHit = false;
    strike(world, p);
  }

  if (input.special && world.launcherUnlocked && world.special >= 0.34) {
    world.special -= 0.34;
    world.projectiles.push({
      id: nextId(world),
      kind: "pin",
      x: p.x + p.facing * 30,
      y: p.y,
      z: 36,
      vx: p.facing * 520,
      vy: 0,
      vz: 40,
      damage: 6,
      catchable: false,
      returned: true,
      owner: p.id,
    });
  }
}

function tryCatch(world: World, input: InputFrame): void {
  if (!input.towel) return;
  const p = world.player;
  p.state = "catch";
  for (const proj of world.projectiles) {
    if (!proj.catchable || proj.returned) continue;
    if (Math.abs(proj.y - p.y) > 42) continue;
    const rel = proj.x - p.x;
    const approaching = rel * proj.vx < 0;
    const speed = Math.abs(proj.vx) || 1;
    const timeToImpactMs = approaching ? (Math.abs(rel) / speed) * 1000 : 9999;
    if (Math.abs(rel) > 90) continue;
    const quality = catchQuality({ towelHeld: true, timeToImpactMs });
    if (quality === "miss") continue;
    proj.returned = true;
    proj.catchable = false;
    proj.owner = p.id;
    proj.vx = -Math.sign(rel || p.facing) * Math.max(280, Math.abs(proj.vx) * 1.35);
    proj.vy = 0;
    proj.damage = quality === "perfect" ? proj.damage * 2 : proj.damage;
    world.score = addScore(world.score, quality === "perfect" ? "perfect" : "good");
    float(world, quality === "perfect" ? "PERFECT" : "CATCH", p.x, p.y - 90, "#e8dcc4");
    if (quality === "perfect") world.slowMo = 220;
    world.special = Math.min(1, world.special + 0.12);
  }
}

function thinkEnemy(world: World, actor: Actor, dt: number): void {
  if (isDead(actor.hp) || actor.state === "dead" || actor.state === "hurt") return;
  const p = world.player;
  const dx = p.x - actor.x;
  const dy = p.y - actor.y;
  actor.facing = dx >= 0 ? 1 : -1;

  if (actor.kind === "thrower" || (actor.kind === "boss" && Math.abs(dx) > 90)) {
    if (Math.abs(dx) < 220) {
      actor.x = clamp(actor.x - actor.facing * 70 * (dt / 1000), 60, world.width - 60);
    }
    actor.y = clamp(actor.y + Math.sign(dy) * 40 * (dt / 1000), world.floorMin, world.floorMax);
    if (actor.attackCd <= 0) {
      actor.state = "throw";
      actor.stateMs = 280;
      actor.attackCd = actor.kind === "boss" ? 900 : 1400;
      world.projectiles.push({
        id: nextId(world),
        kind: world.level.projectile,
        x: actor.x + actor.facing * 24,
        y: actor.y,
        z: 46,
        vx: actor.facing * (actor.kind === "boss" ? 340 : 260),
        vy: 0,
        vz: 80,
        damage: actor.kind === "boss" ? 3 : 1,
        catchable: true,
        returned: false,
        owner: actor.id,
      });
    } else if (actor.state !== "throw") {
      actor.state = "walk";
    }
    return;
  }

  const dist = Math.hypot(dx, dy);
  if (dist > 56) {
    actor.x = clamp(actor.x + Math.sign(dx) * 78 * (dt / 1000), 60, world.width - 60);
    actor.y = clamp(actor.y + Math.sign(dy) * 62 * (dt / 1000), world.floorMin, world.floorMax);
    actor.state = "walk";
  } else if (actor.attackCd <= 0) {
    actor.state = "attack";
    actor.stateMs = 240;
    actor.attackCd = 1100;
    actor.pendingHit = true;
    actor.heavy = actor.kind === "boss";
  }

  for (const other of world.actors) {
    if (other.id === actor.id) continue;
    const ox = actor.x - other.x;
    const oy = actor.y - other.y;
    const od = Math.hypot(ox, oy);
    if (od > 0 && od < 54) {
      actor.x += (ox / od) * 40 * (dt / 1000);
      actor.y += (oy / od) * 40 * (dt / 1000);
    }
  }

  if (actor.state === "attack" && actor.pendingHit && actor.stateMs < 140) {
    actor.pendingHit = false;
    strike(world, actor);
  }
}

function tickProjectiles(world: World, dt: number): void {
  const t = dt / 1000;
  for (const proj of world.projectiles) {
    proj.x += proj.vx * t;
    proj.y += proj.vy * t;
    proj.z += proj.vz * t;
    proj.vz -= 420 * t;
    if (proj.z < 0) {
      proj.z = 0;
      proj.vz *= -0.2;
    }
    for (const actor of world.actors) {
      if (isDead(actor.hp) || actor.invulnMs > 0) continue;
      if (proj.owner === actor.id) continue;
      if (proj.owner === world.player.id && actor.kind === "player") continue;
      if (proj.owner !== world.player.id && actor.kind !== "player") continue;
      const d = Math.hypot(proj.x - actor.x, proj.y - actor.y);
      if (d < actor.radius + 16 && proj.z < 58) {
        hurt(world, actor, proj.damage, proj.x);
        proj.z = -99;
      }
    }
  }
  world.projectiles = world.projectiles.filter(
    (p) => p.z >= 0 && p.x > -40 && p.x < world.width + 40,
  );
}

function tickPickups(world: World, dt: number): void {
  for (const item of world.pickups) {
    item.life -= dt;
    if (Math.hypot(item.x - world.player.x, item.y - world.player.y) < 36) {
      world.player.hp = heal(world.player.hp, item.kind === "pie" ? 3 : 1);
      item.life = 0;
      float(world, item.kind === "pie" ? "PIE" : "DOG", item.x, item.y - 40, "#8b2c2c");
    }
  }
  world.pickups = world.pickups.filter((p) => p.life > 0);
}

function advance(world: World): void {
  if (world.phase !== "combat") return;
  if (livingFoes(world).length > 0) return;
  if (world.waveIndex < world.level.waves.length) {
    spawnWave(world, world.waveIndex);
    world.waveIndex += 1;
    return;
  }
  world.actors.push(makeBoss(world));
  world.phase = "boss";
}

function tickChase(world: World, input: InputFrame, dt: number): void {
  world.chaseTime += dt;
  world.player.x = clamp(world.player.x + input.moveX * 360 * (dt / 1000), 180, 1100);
  if (world.chaseTime >= CHASE_MS) {
    world.phase = "crash";
    world.shake = 18;
  }
  if (Math.random() < dt / 400) {
    world.traffic.push({
      x: 80 + Math.random() * 1120,
      y: -80,
      vx: 0,
      lane: 0,
    });
  }
  for (const car of world.traffic) car.y += 420 * (dt / 1000);
  world.traffic = world.traffic.filter((c) => c.y < 800);
}

export function createWorld(levelId: LevelId, opts?: { lives?: number; score?: World["score"]; launcher?: boolean }): World {
  const level = levelById(levelId);
  const player = makePlayer(200, 540);
  const world: World = {
    level,
    phase: level.mode === "chase" ? "chase" : "combat",
    timeMs: 0,
    width: level.width,
    floorMin: 430,
    floorMax: 660,
    cameraX: 0,
    player,
    actors: [player],
    projectiles: [],
    pickups: [],
    score: opts?.score ?? createScore(),
    lives: opts?.lives ?? 3,
    waveIndex: 0,
    special: 0,
    launcherUnlocked: opts?.launcher ?? CAMPAIGN.findIndex((l) => l.id === levelId) > 4,
    shake: 0,
    slowMo: 0,
    fatalityMs: 0,
    messages: [],
    chaseTime: 0,
    traffic: [],
    nextId: 1,
  };
  if (world.phase === "combat") {
    spawnWave(world, 0);
    world.waveIndex = 1;
  }
  return world;
}

export function tick(world: World, input: InputFrame, dtMs: number): World {
  let remaining = Math.max(0, dtMs);
  while (remaining > 0) {
    const step = Math.min(remaining, 50);
    stepWorld(world, input, step);
    remaining -= step;
    if (world.phase === "crash" || world.phase === "gameover" || world.phase === "clear") break;
  }
  return world;
}

function stepWorld(world: World, input: InputFrame, dtMs: number): void {
  const dt = dtMs / (world.slowMo > 0 ? 2.2 : 1);
  world.timeMs += dt;
  world.slowMo = Math.max(0, world.slowMo - dtMs);
  world.shake = Math.max(0, world.shake - dt * 0.04);
  world.score = tickCombo(world.score, dt);
  for (const msg of world.messages) msg.life -= dt;
  world.messages = world.messages.filter((m) => m.life > 0);

  for (const actor of world.actors) {
    readyActor(actor);
    actor.stateMs = Math.max(0, actor.stateMs - dt);
    actor.invulnMs = Math.max(0, actor.invulnMs - dt);
    actor.attackCd = Math.max(0, actor.attackCd - dt);
    actor.dodgeCd = Math.max(0, actor.dodgeCd - dt);
    actor.x += actor.vx * (dt / 1000);
    actor.vx *= 0.82;
    if (actor.stateMs <= 0 && actor.state !== "dead" && actor.state !== "idle" && actor.state !== "walk") {
      actor.state = "idle";
    }
  }

  if (world.phase === "fatality") {
    world.fatalityMs += dtMs;
    if (input.light || input.interact || world.fatalityMs > 3600) world.phase = "clear";
    return;
  }

  if (world.phase === "clear" || world.phase === "crash" || world.phase === "gameover") {
    return;
  }

  if (world.phase === "chase") {
    tickChase(world, input, dt);
    return;
  }

  controlPlayer(world, input, dt);
  tryCatch(world, input);
  for (const actor of world.actors) {
    if (actor.kind === "player") continue;
    thinkEnemy(world, actor, dt);
  }
  tickProjectiles(world, dt);
  tickPickups(world, dt);

  advance(world);
  world.cameraX = clamp(world.player.x - VIEW_W * 0.38, 0, Math.max(0, world.width - VIEW_W));
}

export function currentWaveLabel(world: World): string {
  if (world.phase === "boss") return "BOSS";
  if (world.phase === "chase") return "CHASE";
  return `WAVE ${Math.min(world.waveIndex, world.level.waves.length)} / ${world.level.waves.length}`;
}
