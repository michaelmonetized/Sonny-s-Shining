export function stickFromPointer(dx: number, dy: number, radius: number): { x: number; y: number } {
  if (radius <= 0) return { x: 0, y: 0 };
  const dead = radius * 0.12;
  const mag = Math.hypot(dx, dy);
  if (mag <= dead) return { x: 0, y: 0 };
  const clamped = Math.min(mag, radius);
  const scale = clamped / radius;
  return { x: (dx / mag) * scale, y: (dy / mag) * scale };
}
