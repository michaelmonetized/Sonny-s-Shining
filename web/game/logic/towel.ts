export const CATCH_PERFECT_MS = 80;
export const CATCH_GOOD_MS = 180;

export type CatchQuality = "perfect" | "good" | "miss";

export function catchQuality(input: {
  towelHeld: boolean;
  timeToImpactMs: number;
}): CatchQuality {
  if (!input.towelHeld) return "miss";
  const dt = Math.abs(input.timeToImpactMs);
  if (dt <= CATCH_PERFECT_MS) return "perfect";
  if (dt <= CATCH_GOOD_MS) return "good";
  return "miss";
}

export function returnDamage(base: number, quality: CatchQuality): number {
  if (quality === "perfect") return base * 2;
  if (quality === "good") return base;
  return 0;
}
