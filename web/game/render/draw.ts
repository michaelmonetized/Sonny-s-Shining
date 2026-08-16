import type { Assets } from "../engine/assets";
import { THEME_BG } from "../engine/assets";
import { CAMPAIGN, type LevelId } from "../logic/campaign";
import { VIEW_H, VIEW_W, currentWaveLabel } from "../logic/sim";
import type { Actor, World } from "../logic/types";
import { drawHose, drawProjectile } from "./hose";

const SPRITE_FOR: Record<string, string> = {
  sonny: "sonny",
  waitress: "waitress",
  bertie: "bertie",
  charlie: "charlie",
  desi: "desi",
  tippi: "tippi",
  bessie: "bessie",
  harry: "harry",
  ivy: "ivy",
  kewpie: "kewpie",
  lucy: "lucy",
};

export function fill(ctx: CanvasRenderingContext2D, color: string): void {
  ctx.fillStyle = color;
  ctx.fillRect(0, 0, VIEW_W, VIEW_H);
}

export function drawWorld(ctx: CanvasRenderingContext2D, world: World, assets: Assets, time: number): void {
  const shakeX = world.shake ? (Math.random() - 0.5) * world.shake : 0;
  const shakeY = world.shake ? (Math.random() - 0.5) * world.shake : 0;
  ctx.save();
  ctx.translate(shakeX, shakeY);

  if (world.phase === "chase" || world.phase === "crash") {
    drawChase(ctx, world, assets, time);
  } else {
    drawBrawl(ctx, world, assets, time);
  }

  ctx.restore();
  drawHud(ctx, world);
  if (world.phase === "fatality") drawFatalityBanner(ctx, world);
  if (world.player.state === "catch") drawCatchFlash(ctx);
}

function drawBrawl(ctx: CanvasRenderingContext2D, world: World, assets: Assets, time: number): void {
  const bg = assets.bgs[THEME_BG[world.level.theme] ?? "bg-bar"];
  if (bg) {
    const srcW = bg.width * 0.72;
    const sx = (world.cameraX / Math.max(1, world.width - VIEW_W)) * Math.max(0, bg.width - srcW);
    ctx.drawImage(bg, sx, 0, srcW, bg.height, 0, 0, VIEW_W, VIEW_H);
  } else {
    fill(ctx, "#2d1c18");
  }
  ctx.fillStyle = "rgba(10,8,6,0.18)";
  ctx.fillRect(0, 0, VIEW_W, VIEW_H);

  const sorted = [...world.actors].sort((a, b) => a.y - b.y);
  for (const actor of sorted) {
    if (actor.state === "dead" && actor.kind !== "boss") continue;
    drawActor(ctx, actor, assets, time, world.cameraX);
  }
  for (const proj of world.projectiles) {
    ctx.save();
    ctx.translate(proj.x - world.cameraX, proj.y - proj.z * 0.6 - 20);
    drawProjectile(ctx, proj.kind, time * 0.02 + proj.x * 0.01);
    ctx.restore();
  }
  for (const item of world.pickups) {
    ctx.save();
    ctx.translate(item.x - world.cameraX, item.y);
    ctx.fillStyle = item.kind === "pie" ? "#8b2c2c" : "#a67c3d";
    ctx.beginPath();
    ctx.arc(0, -10, 10, 0, Math.PI * 2);
    ctx.fill();
    ctx.restore();
  }
  for (const msg of world.messages) {
    ctx.font = "700 18px 'Playfair Display', serif";
    ctx.fillStyle = msg.color;
    ctx.textAlign = "center";
    ctx.globalAlpha = Math.min(1, msg.life / 200);
    ctx.fillText(msg.text, msg.x - world.cameraX, msg.y - (700 - msg.life) * 0.04);
    ctx.globalAlpha = 1;
  }
}

function drawActor(
  ctx: CanvasRenderingContext2D,
  actor: Actor,
  assets: Assets,
  time: number,
  cameraX: number,
): void {
  const x = actor.x - cameraX;
  const y = actor.y;
  ctx.save();
  ctx.translate(x, y);
  ctx.fillStyle = "rgba(0,0,0,0.28)";
  ctx.beginPath();
  ctx.ellipse(0, 8, actor.radius + 10, 8, 0, 0, Math.PI * 2);
  ctx.fill();

  const flash = actor.state === "hurt" && Math.floor(time / 40) % 2 === 0;
  if (flash) ctx.filter = "brightness(2.2)";

  const key = SPRITE_FOR[actor.sprite] ?? SPRITE_FOR[actor.enemyKind ?? ""];
  const sprite = key ? assets.sprites[key] : undefined;
  const bob = Math.sin(time * 0.008 + actor.x * 0.02) * (actor.state === "walk" ? 4 : 1.6);
  const punch = actor.state === "attack" ? actor.facing * 10 : 0;
  const h = actor.kind === "boss" ? 250 : actor.kind === "player" ? 200 : 168;
  const w = sprite ? (sprite.width / sprite.height) * h : h * 0.7;

  if (sprite) {
    ctx.save();
    ctx.translate(punch, bob);
    ctx.scale(actor.facing, actor.state === "hurt" ? 0.94 : 1);
    ctx.drawImage(sprite, -w / 2, -h + 12, w, h);
    ctx.restore();
  } else {
    ctx.translate(punch, bob);
    drawHose(ctx, actor, time);
  }

  if (actor.kind !== "player" && actor.hp.hits < actor.hp.maxHits && actor.state !== "dead") {
    const pct = actor.hp.hits / actor.hp.maxHits;
    ctx.fillStyle = "#1a1410";
    ctx.fillRect(-22, -h - 8, 44, 6);
    ctx.fillStyle = "#8b2c2c";
    ctx.fillRect(-21, -h - 7, 42 * pct, 4);
  }
  ctx.restore();
}

function drawChase(ctx: CanvasRenderingContext2D, world: World, assets: Assets, time: number): void {
  const bg = assets.bgs["bg-chase"];
  if (bg) {
    const scroll = ((world.chaseTime * 0.25) % bg.height);
    ctx.drawImage(bg, 0, scroll - bg.height, VIEW_W, VIEW_H);
    ctx.drawImage(bg, 0, scroll, VIEW_W, VIEW_H);
  } else {
    fill(ctx, "#1a1410");
  }
  ctx.fillStyle = "rgba(10,8,6,0.25)";
  ctx.fillRect(0, 0, VIEW_W, VIEW_H);

  ctx.fillStyle = "#c9a55a";
  ctx.fillRect(world.player.x + 80, 90, 70, 130);
  ctx.fillStyle = "#f4e8d3";
  ctx.font = "700 14px serif";
  ctx.fillText("LIMO", world.player.x + 90, 80);

  ctx.fillStyle = "#8b2c2c";
  ctx.fillRect(world.player.x - 28, 430, 56, 96);
  ctx.fillStyle = "#f4e8d3";
  ctx.fillText("TAXI", world.player.x - 16, 424);

  for (const car of world.traffic) {
    ctx.fillStyle = "#2d2620";
    ctx.fillRect(car.x - 18, car.y, 36, 70);
  }

  if (world.phase === "crash") {
    ctx.fillStyle = "rgba(139,44,44,0.35)";
    ctx.fillRect(0, 0, VIEW_W, VIEW_H);
    banner(ctx, "WRONG TURN", "A tow truck writes the next chapter.");
  }
}

function drawHud(ctx: CanvasRenderingContext2D, world: World): void {
  ctx.save();
  ctx.fillStyle = "rgba(20,14,10,0.72)";
  ctx.fillRect(0, 0, VIEW_W, 72);
  ctx.fillRect(0, VIEW_H - 46, VIEW_W, 46);

  ctx.fillStyle = "#e8dcc4";
  ctx.font = "700 16px 'Playfair Display', serif";
  ctx.textAlign = "left";
  ctx.fillText(world.level.venue.toUpperCase(), 24, 28);
  ctx.font = "13px 'Libre Baskerville', serif";
  ctx.fillStyle = "#c9a55a";
  ctx.fillText(currentWaveLabel(world), 24, 50);

  for (let i = 0; i < world.player.hp.maxSegments; i++) {
    ctx.fillStyle = i < world.player.hp.segments ? "#8b2c2c" : "#3d3428";
    ctx.fillRect(320 + i * 38, 18, 32, 16);
    ctx.strokeStyle = "#e8dcc4";
    ctx.strokeRect(320 + i * 38, 18, 32, 16);
  }
  ctx.fillStyle = "#e8dcc4";
  ctx.fillText(`LIVES ${world.lives}`, 450, 50);

  ctx.textAlign = "right";
  ctx.font = "700 22px 'Playfair Display', serif";
  ctx.fillText(String(world.score.points).padStart(6, "0"), VIEW_W - 24, 32);
  if (world.score.combo > 1) {
    ctx.fillStyle = "#c9a55a";
    ctx.font = "700 16px serif";
    ctx.fillText(`${world.score.combo}x COMBO`, VIEW_W - 24, 54);
  }

  ctx.fillStyle = "#3d3428";
  ctx.fillRect(320, 56, 120, 8);
  ctx.fillStyle = "#c9a55a";
  ctx.fillRect(320, 56, 120 * world.special, 8);

  ctx.textAlign = "center";
  ctx.fillStyle = "#c9b896";
  ctx.font = "12px 'Libre Baskerville', serif";
  ctx.fillText("WASD move   J punch   K heavy   Q towel   SPACE dodge   E launcher   ENTER pause", VIEW_W / 2, VIEW_H - 18);
  ctx.restore();
}

function drawFatalityBanner(ctx: CanvasRenderingContext2D, world: World): void {
  ctx.fillStyle = "rgba(10,8,6,0.45)";
  ctx.fillRect(0, 0, VIEW_W, VIEW_H);
  banner(ctx, "FINISH HIM", world.level.fatality);
  ctx.textAlign = "center";
  ctx.fillStyle = "#e8dcc4";
  ctx.font = "16px serif";
  ctx.fillText("Press J  ·  the city is watching", VIEW_W / 2, 470);
}

function drawCatchFlash(ctx: CanvasRenderingContext2D): void {
  ctx.strokeStyle = "rgba(244,232,211,0.35)";
  ctx.lineWidth = 4;
  ctx.beginPath();
  ctx.arc(VIEW_W * 0.4, VIEW_H * 0.62, 70, 0, Math.PI * 2);
  ctx.stroke();
}

function banner(ctx: CanvasRenderingContext2D, title: string, sub: string): void {
  ctx.fillStyle = "rgba(20,14,10,0.88)";
  ctx.fillRect(140, 250, VIEW_W - 280, 180);
  ctx.strokeStyle = "#c9a55a";
  ctx.lineWidth = 3;
  ctx.strokeRect(154, 264, VIEW_W - 308, 152);
  ctx.textAlign = "center";
  ctx.fillStyle = "#8b2c2c";
  ctx.font = "700 42px 'Playfair Display', serif";
  ctx.fillText(title, VIEW_W / 2, 330);
  ctx.fillStyle = "#e8dcc4";
  ctx.font = "20px 'Libre Baskerville', serif";
  ctx.fillText(sub, VIEW_W / 2, 372);
}

export function drawTitle(ctx: CanvasRenderingContext2D, assets: Assets, time: number): void {
  const art = assets.bgs.title;
  if (art) ctx.drawImage(art, 0, 0, VIEW_W, VIEW_H);
  else fill(ctx, "#1a1410");
  ctx.fillStyle = "rgba(10,8,6,0.38)";
  ctx.fillRect(0, 0, VIEW_W, VIEW_H);
  ctx.fillStyle = "rgba(10,8,6,0.55)";
  ctx.fillRect(0, 0, VIEW_W, 120);
  ctx.fillRect(0, VIEW_H - 130, VIEW_W, 130);
  ctx.textAlign = "center";
  ctx.fillStyle = "#e8dcc4";
  ctx.font = "16px 'Libre Baskerville', serif";
  ctx.fillText("NEW YEAR'S EVE  1935", VIEW_W / 2, 42);
  ctx.fillStyle = "#c9a55a";
  ctx.font = "700 64px 'Playfair Display', serif";
  ctx.fillText("SONNY'S SHINING", VIEW_W / 2, 100);
  ctx.fillStyle = "#e8dcc4";
  ctx.font = "22px 'Playfair Display', serif";
  ctx.fillText("She keeps running. You keep following.", VIEW_W / 2, VIEW_H - 78);
  const pulse = 0.55 + Math.sin(time * 0.006) * 0.35;
  ctx.globalAlpha = pulse;
  ctx.font = "700 18px serif";
  ctx.fillText("PRESS ENTER  ·  TAP TO START", VIEW_W / 2, VIEW_H - 36);
  ctx.globalAlpha = 1;
}

export function drawIntro(ctx: CanvasRenderingContext2D, assets: Assets, page: number): void {
  fill(ctx, "#100c0a");
  const art = assets.bgs.title;
  if (art) {
    ctx.globalAlpha = 0.28;
    ctx.drawImage(art, 0, 0, VIEW_W, VIEW_H);
    ctx.globalAlpha = 1;
  }
  ctx.fillStyle = "rgba(20,14,10,0.78)";
  ctx.fillRect(160, 140, VIEW_W - 320, 440);
  ctx.strokeStyle = "#c9a55a";
  ctx.strokeRect(176, 156, VIEW_W - 352, 408);
  const pages = [
    { kicker: "THE SHINING GAZETTE", body: "New Year's Eve. Confetti in the air. Her hand in yours. Midnight at Bertie's, and for one perfect moment you are the luckiest hound in the city." },
    { kicker: "THEN HE WHISPERS", body: "Bertie leans in. Lucy's face changes. She pulls away. Through the kitchen door. Into the night. A bowling-pin limousine is already waiting." },
    { kicker: "KEWPIE SENDS HIS REGARDS", body: "The glasses aren't for toasting anymore. Everyone between you and her is on his payroll. The towel comes out. The city shows its teeth." },
    { kicker: "THE CHASE BEGINS", body: "She keeps running. You keep following. Can you win her back?" },
  ];
  const card = pages[page] ?? pages[0];
  ctx.textAlign = "center";
  ctx.fillStyle = "#c9a55a";
  ctx.font = "14px 'Libre Baskerville', serif";
  ctx.fillText(card.kicker, VIEW_W / 2, 210);
  ctx.fillStyle = "#e8dcc4";
  ctx.font = "26px 'Playfair Display', serif";
  wrapText(ctx, card.body, VIEW_W / 2, 280, VIEW_W - 420, 36);
  ctx.font = "16px serif";
  ctx.fillStyle = "#c9b896";
  ctx.fillText("ENTER  ·  continue", VIEW_W / 2, 540);
}

export function drawMap(ctx: CanvasRenderingContext2D, current: LevelId, time: number): void {
  fill(ctx, "#100c0a");
  ctx.fillStyle = "#16110d";
  for (let i = 0; i < 18; i++) {
    const x = 40 + (i * 97 + 20) % 1200;
    const h = 180 + ((i * 67) % 280);
    ctx.fillRect(x, VIEW_H - 80 - h, 70, h);
    ctx.fillStyle = Math.sin(time * 0.004 + i) > 0.3 ? "#c9a55a" : "#3d2a14";
    ctx.fillRect(x + 12, VIEW_H - 80 - h + 20, 8, 10);
    ctx.fillRect(x + 30, VIEW_H - 80 - h + 40, 8, 10);
    ctx.fillStyle = "#16110d";
  }
  ctx.fillStyle = "#1a1410";
  ctx.fillRect(0, VIEW_H - 90, VIEW_W, 90);

  ctx.textAlign = "center";
  ctx.fillStyle = "#c9a55a";
  ctx.font = "16px serif";
  ctx.fillText("THE CITY AT NIGHT", VIEW_W / 2, 48);

  const idx = CAMPAIGN.findIndex((l) => l.id === current);
  ctx.beginPath();
  ctx.strokeStyle = "#8b2c2c";
  ctx.setLineDash([6, 8]);
  ctx.lineWidth = 2;
  CAMPAIGN.forEach((level, i) => {
    const p = stop(i);
    if (i === 0) ctx.moveTo(p.x, p.y);
    else ctx.lineTo(p.x, p.y);
  });
  ctx.stroke();
  ctx.setLineDash([]);

  CAMPAIGN.forEach((level, i) => {
    const p = stop(i);
    const here = level.id === current;
    ctx.fillStyle = i < idx ? "#4a423a" : here ? "#8b2c2c" : "#2d2620";
    ctx.beginPath();
    ctx.arc(p.x, p.y, here ? 12 : 8, 0, Math.PI * 2);
    ctx.fill();
    ctx.strokeStyle = here ? "#c9a55a" : "#e8dcc4";
    ctx.stroke();
    ctx.fillStyle = "#e8dcc4";
    ctx.font = here ? "700 13px serif" : "11px serif";
    ctx.fillText(level.venue.replace(/^[^']+'s /, "").toUpperCase(), p.x, p.y + 28);
    if (here) {
      ctx.fillStyle = "#c9a55a";
      ctx.fillText("LUCY WAS HERE", p.x, p.y - 22);
    }
  });

  ctx.fillStyle = "#e8dcc4";
  ctx.font = "18px 'Playfair Display', serif";
  ctx.fillText("ENTER  ·  follow her", VIEW_W / 2, VIEW_H - 28);
}

export function drawEnding(ctx: CanvasRenderingContext2D, assets: Assets, time: number): void {
  const art = assets.bgs["bg-yacht"] ?? assets.bgs.title;
  if (art) ctx.drawImage(art, 0, 0, VIEW_W, VIEW_H);
  ctx.fillStyle = "rgba(10,8,6,0.62)";
  ctx.fillRect(0, 0, VIEW_W, VIEW_H);
  ctx.textAlign = "center";
  ctx.fillStyle = "#c9a55a";
  ctx.font = "16px serif";
  ctx.fillText("DAWN.  JANUARY 1, 1935.", VIEW_W / 2, 200);
  ctx.fillStyle = "#e8dcc4";
  ctx.font = "32px 'Playfair Display', serif";
  wrapText(ctx, "You finally got what you came for. And lost everything in the process.", VIEW_W / 2, 260, 760, 42);
  ctx.font = "700 22px 'Playfair Display', serif";
  ctx.fillStyle = "#8b2c2c";
  ctx.fillText("She keeps running. You keep following.", VIEW_W / 2, 430);
  ctx.fillStyle = "#c9b896";
  ctx.font = "16px serif";
  ctx.globalAlpha = 0.6 + Math.sin(time * 0.004) * 0.3;
  ctx.fillText("ENTER  ·  one more time", VIEW_W / 2, 520);
  ctx.globalAlpha = 1;
}

export function drawGameOver(ctx: CanvasRenderingContext2D, score: number): void {
  fill(ctx, "#100c0a");
  banner(ctx, "GUTTER BALL", `Score  ${score}`);
  ctx.textAlign = "center";
  ctx.fillStyle = "#c9b896";
  ctx.font = "16px serif";
  ctx.fillText("ENTER  ·  get up", VIEW_W / 2, 500);
}

export function drawPause(ctx: CanvasRenderingContext2D): void {
  ctx.fillStyle = "rgba(10,8,6,0.6)";
  ctx.fillRect(0, 0, VIEW_W, VIEW_H);
  banner(ctx, "PAUSED", "ENTER  ·  back to the bar");
}

function stop(i: number): { x: number; y: number } {
  const x = 90 + i * 128;
  const y = 220 + (i % 2) * 160 + (i === 8 ? 40 : 0);
  return { x, y };
}

function wrapText(
  ctx: CanvasRenderingContext2D,
  text: string,
  x: number,
  y: number,
  width: number,
  line: number,
): void {
  const words = text.split(" ");
  let row = "";
  let yy = y;
  for (const word of words) {
    const next = row ? `${row} ${word}` : word;
    if (ctx.measureText(next).width > width) {
      ctx.fillText(row, x, yy);
      row = word;
      yy += line;
    } else row = next;
  }
  if (row) ctx.fillText(row, x, yy);
}
