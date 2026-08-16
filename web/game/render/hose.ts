import type { Actor } from "../logic/types";

function ellipse(
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  rx: number,
  ry: number,
  fill: string,
  stroke = "#1a1410",
): void {
  ctx.beginPath();
  ctx.ellipse(x, y, rx, ry, 0, 0, Math.PI * 2);
  ctx.fillStyle = fill;
  ctx.fill();
  ctx.strokeStyle = stroke;
  ctx.lineWidth = 3;
  ctx.stroke();
}

export function drawHose(ctx: CanvasRenderingContext2D, actor: Actor, time: number): void {
  const walk = actor.state === "walk" || actor.state === "dodge" ? 1 : 0;
  const bob = Math.sin(time * 0.01 + actor.x * 0.05) * (2 + walk * 4);
  const squash = actor.state === "hurt" ? 0.9 : actor.state === "attack" ? 1.06 : 1;
  ctx.save();
  ctx.translate(0, bob);
  ctx.scale(actor.facing, squash);

  const kind = actor.enemyKind ?? actor.sprite;
  if (actor.kind === "player" || kind === "sonny") drawSonny(ctx, actor, time);
  else if (kind === "rat") drawCritter(ctx, "#6b5a4a", "#d8c7a8", 0.72, true, actor, time);
  else if (kind === "tenant") drawCritter(ctx, "#c9c2b2", "#4a423a", 0.9, false);
  else if (kind === "patron") drawShadow(ctx);
  else if (kind === "bouncer") drawBrute(ctx, "#2c241c", "#1a1410");
  else if (kind === "mechanic") drawBrute(ctx, "#8a6a3a", "#3d2a14");
  else if (kind === "docker") drawBrute(ctx, "#7a8a94", "#2a3034");
  else if (kind === "sailor") drawCritter(ctx, "#1c1c1c", "#f4e8d3", 0.8, true);
  else drawCritter(ctx, "#c9a55a", "#f4e8d3", 1, false);

  ctx.restore();
}

function drawCritter(
  ctx: CanvasRenderingContext2D,
  fur: string,
  belly: string,
  scale: number,
  hat: boolean,
  actor?: Actor,
  time = 0,
): void {
  ctx.save();
  ctx.scale(scale, scale);
  ctx.lineCap = "round";
  ctx.lineJoin = "round";
  ctx.strokeStyle = "#1a1410";
  ctx.lineWidth = 6;
  const stride = actor?.state === "walk" ? Math.sin(time * 0.014 + actor.x * 0.04) * 18 : 0;
  ctx.beginPath();
  ctx.moveTo(-16, 20);
  ctx.quadraticCurveTo(-28 - stride * 0.25, 50, -18 - stride, 78);
  ctx.moveTo(16, 20);
  ctx.quadraticCurveTo(28 + stride * 0.25, 50, 18 + stride, 78);
  ctx.stroke();
  ellipse(ctx, 0, 8, 22, 28, fur);
  ellipse(ctx, 0, 14, 12, 16, belly);
  ellipse(ctx, 0, -28, 20, 18, fur);
  ellipse(ctx, 14, -24, 10, 7, belly);
  ctx.fillStyle = "#1a1410";
  ctx.beginPath();
  ctx.arc(-6, -30, 3.2, 0, Math.PI * 2);
  ctx.arc(4, -30, 3.2, 0, Math.PI * 2);
  ctx.fill();
  if (hat) {
    ctx.fillStyle = "#f4e8d3";
    ctx.beginPath();
    ctx.ellipse(0, -46, 10, 8, 0, 0, Math.PI * 2);
    ctx.fill();
    ctx.stroke();
  }
  ctx.restore();
}

function drawSonny(ctx: CanvasRenderingContext2D, actor: Actor, time: number): void {
  const stride = actor.state === "walk" || actor.state === "dodge" ? Math.sin(time * 0.014 + actor.x * 0.05) * 20 : 0;
  const swing = actor.state === "attack" ? 38 : stride * 0.6;
  ctx.lineCap = "round";
  ctx.lineJoin = "round";
  ctx.strokeStyle = "#17110d";
  ctx.lineWidth = 8;

  // Long noodle legs and gloves are the main rubber-hose silhouette.
  ctx.beginPath();
  ctx.moveTo(-16, 20);
  ctx.quadraticCurveTo(-30 - stride * 0.3, 46, -18 - stride, 82);
  ctx.moveTo(16, 20);
  ctx.quadraticCurveTo(30 + stride * 0.3, 46, 18 + stride, 82);
  ctx.moveTo(-22, -4);
  ctx.quadraticCurveTo(-48, 18, -42 - swing, 22);
  ctx.moveTo(22, -4);
  ctx.quadraticCurveTo(48, 18, 42 + swing, 16);
  ctx.stroke();
  ellipse(ctx, -19 - stride, 84, 15, 7, "#f1e3bf");
  ellipse(ctx, 19 + stride, 84, 15, 7, "#f1e3bf");
  ellipse(ctx, -43 - swing, 22, 10, 9, "#f1e3bf");
  ellipse(ctx, 43 + swing, 16, 10, 9, "#f1e3bf");

  ellipse(ctx, 0, 12, 27, 33, "#b84537");
  ctx.fillStyle = "#f1d5a0";
  ctx.beginPath();
  ctx.ellipse(0, 15, 13, 18, 0, 0, Math.PI * 2);
  ctx.fill();
  ctx.stroke();
  ellipse(ctx, 0, -31, 28, 23, "#b98a55");
  // floppy ears
  ellipse(ctx, -29, -30, 11, 22, "#8b5b3e");
  ellipse(ctx, 29, -30, 11, 22, "#8b5b3e");
  ctx.fillStyle = "#17110d";
  ctx.beginPath();
  ctx.arc(-9, -34, 4, 0, Math.PI * 2);
  ctx.arc(9, -34, 4, 0, Math.PI * 2);
  ctx.ellipse(0, -23, 7, 5, 0, 0, Math.PI * 2);
  ctx.fill();
  ctx.beginPath();
  ctx.arc(0, -18, 10, 0.1, Math.PI - 0.1);
  ctx.stroke();
}

function drawBrute(ctx: CanvasRenderingContext2D, fur: string, shade: string): void {
  ctx.lineCap = "round";
  ellipse(ctx, 0, 18, 34, 36, fur);
  ellipse(ctx, 0, -22, 24, 20, fur);
  ellipse(ctx, 0, -16, 14, 10, shade);
  ctx.fillStyle = "#1a1410";
  ctx.beginPath();
  ctx.arc(-8, -26, 3.5, 0, Math.PI * 2);
  ctx.arc(8, -26, 3.5, 0, Math.PI * 2);
  ctx.fill();
}

function drawShadow(ctx: CanvasRenderingContext2D): void {
  ctx.globalAlpha = 0.85;
  ellipse(ctx, 0, 10, 16, 34, "#1a1410");
  ellipse(ctx, 0, -28, 14, 14, "#1a1410");
  ctx.fillStyle = "#c9a55a";
  ctx.beginPath();
  ctx.arc(-5, -30, 2.4, 0, Math.PI * 2);
  ctx.arc(5, -30, 2.4, 0, Math.PI * 2);
  ctx.fill();
}

export function drawProjectile(
  ctx: CanvasRenderingContext2D,
  kind: string,
  spin: number,
): void {
  ctx.save();
  ctx.rotate(spin);
  ctx.lineWidth = 3;
  ctx.strokeStyle = "#1a1410";
  if (kind === "record") {
    ctx.beginPath();
    ctx.arc(0, 0, 16, 0, Math.PI * 2);
    ctx.fillStyle = "#1a1410";
    ctx.fill();
    ctx.beginPath();
    ctx.arc(0, 0, 5, 0, Math.PI * 2);
    ctx.fillStyle = "#8b2c2c";
    ctx.fill();
  } else if (kind === "pin") {
    ctx.fillStyle = "#f4e8d3";
    ctx.beginPath();
    ctx.ellipse(0, 0, 8, 20, 0, 0, Math.PI * 2);
    ctx.fill();
    ctx.stroke();
    ctx.fillStyle = "#8b2c2c";
    ctx.fillRect(-8, -4, 16, 6);
  } else {
    ctx.fillStyle = kind === "lamp" ? "#c9a55a" : "#8b2c2c";
    ctx.beginPath();
    ctx.moveTo(-6, -16);
    ctx.lineTo(6, -16);
    ctx.lineTo(8, 16);
    ctx.lineTo(-8, 16);
    ctx.closePath();
    ctx.fill();
    ctx.stroke();
  }
  ctx.restore();
}
