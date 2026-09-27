export const LIGHT_DAMAGE = 1;
export const HEAVY_DAMAGE = 3;
export const LANE_SLACK = 28;
export const DODGE_IFRAMES_MS = 220;

export type Facing = 1 | -1;

export function inRange(
  attacker: { x: number; y: number; facing: Facing; range: number },
  target: { x: number; y: number },
): boolean {
  const dx = target.x - attacker.x;
  const dy = Math.abs(target.y - attacker.y);
  if (dy > LANE_SLACK) return false;
  if (dx * attacker.facing <= 0) return false;
  return Math.abs(dx) <= attacker.range;
}

export function attackHits(target: { invulnMs: number }, _dtMs: number): boolean {
  return target.invulnMs <= 0;
}

export function dodgeIframesMs(): number {
  return DODGE_IFRAMES_MS;
}
