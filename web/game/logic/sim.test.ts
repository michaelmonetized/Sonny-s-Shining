import { describe, expect, test } from "bun:test";
import { createWorld, tick } from "./sim";
import { emptyInput } from "./input";

describe("brawl sim", () => {
  test("Sonny walks in the direction he is pushed", () => {
    const world = createWorld("bertie");
    const x = world.player.x;
    tick(world, { ...emptyInput(), moveX: 1 }, 100);
    expect(world.player.x).toBeGreaterThan(x);
    expect(world.player.facing).toBe(1);
  });

  test("a light attack in range hurts a waitress", () => {
    const world = createWorld("bertie");
    const foe = world.actors.find((a) => a.kind === "grunt");
    if (!foe) throw new Error("expected a grunt");
    const before = foe.hp.hits;
    world.player.x = foe.x - 40;
    world.player.y = foe.y;
    world.player.facing = 1;
    tick(world, { ...emptyInput(), light: true }, 16);
    expect(foe.hp.hits).toBeLessThan(before);
  });

  test("holding the towel catches a bottle on a perfect window", () => {
    const world = createWorld("bertie");
    world.projectiles.push({
      id: "bottle-1",
      kind: "bottle",
      x: world.player.x + 20,
      y: world.player.y,
      z: 40,
      vx: -200,
      vy: 0,
      vz: 0,
      damage: 3,
      catchable: true,
      returned: false,
      owner: "bertie",
    });
    tick(world, { ...emptyInput(), towel: true }, 16);
    expect(world.projectiles.some((p) => p.returned)).toBe(true);
    expect(world.score.points).toBeGreaterThan(0);
  });

  test("losing all health costs a life and respawns", () => {
    const world = createWorld("bertie");
    world.player.hp.hits = 1;
    world.player.hp.segments = 1;
    world.player.invulnMs = 0;
    world.projectiles.push({
      id: "kill",
      kind: "bottle",
      x: world.player.x,
      y: world.player.y,
      z: 20,
      vx: 0,
      vy: 0,
      vz: 0,
      damage: 3,
      catchable: false,
      returned: false,
      owner: "bertie",
    });
    tick(world, emptyInput(), 16);
    expect(world.lives).toBe(2);
    expect(world.player.hp.hits).toBeGreaterThan(0);
  });
});

describe("campaign flow", () => {
  test("clearing the last wave of a level spawns the boss", () => {
    const world = createWorld("bertie");
    world.waveIndex = world.level.waves.length;
    world.actors = world.actors.filter((a) => a.kind === "player");
    tick(world, emptyInput(), 16);
    expect(world.phase).toBe("boss");
    expect(world.actors.some((a) => a.kind === "boss")).toBe(true);
  });

  test("dropping the boss opens the fatality window", () => {
    const world = createWorld("bertie");
    world.phase = "boss";
    world.actors = [
      world.player,
      {
        id: "boss",
        kind: "boss",
        name: "Bertie",
        sprite: "bertie",
        x: world.player.x + 50,
        y: world.player.y,
        vx: 0,
        vy: 0,
        facing: -1,
        hp: { hits: 1, maxHits: 12, segments: 1, maxSegments: 4 },
        state: "idle",
        stateMs: 0,
        invulnMs: 0,
        attackCd: 0,
        radius: 36,
        range: 70,
      },
    ];
    tick(world, { ...emptyInput(), light: true }, 16);
    expect(world.phase).toBe("fatality");
  });
});

describe("chase sim", () => {
  test("the chase always ends in the scripted crash", () => {
    const world = createWorld("chase");
    expect(world.phase).toBe("chase");
    tick(world, emptyInput(), 20_000);
    expect(world.phase).toBe("crash");
  });
});
