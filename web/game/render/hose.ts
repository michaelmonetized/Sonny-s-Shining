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
  if (kind === "rat") drawCritter(ctx, "#6b5a4a", "#d8c7a8", 0.72, true);
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
): void {
  ctx.save();
  ctx.scale(scale, scale);
  ctx.lineCap = "round";
  ctx.lineJoin = "round";
  ctx.strokeStyle = "#1a1410";
  ctx.lineWidth = 6;
  ctx.beginPath();
  ctx.moveTo(-16, 20);
  ctx.quadraticCurveTo(-28, 50, -18, 78);
  ctx.moveTo(16, 20);
  ctx.quadraticCurveTo(28, 50, 18, 78);
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
