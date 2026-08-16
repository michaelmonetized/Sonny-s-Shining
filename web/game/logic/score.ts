export const COMBO_WINDOW_MS = 2200;
export const MAX_COMBO = 10;

export type ScoreKind = "defeat" | "perfect" | "good" | "style";

export type ScoreState = {
  points: number;
  combo: number;
  comboMs: number;
};

const VALUE: Record<ScoreKind, number> = {
  defeat: 100,
  perfect: 250,
  good: 50,
  style: 150,
};

export function createScore(): ScoreState {
  return { points: 0, combo: 1, comboMs: 0 };
}

export function comboMultiplier(combo: number): number {
  return Math.min(MAX_COMBO, Math.max(1, combo));
}

export function addScore(score: ScoreState, kind: ScoreKind, _count = 1): ScoreState {
  return {
    points: score.points + VALUE[kind] * comboMultiplier(score.combo),
    combo: Math.min(MAX_COMBO, score.combo + 1),
    comboMs: COMBO_WINDOW_MS,
  };
}

export function tickCombo(score: ScoreState, dtMs: number): ScoreState {
  const comboMs = score.comboMs - dtMs;
  if (comboMs <= 0) return { ...score, combo: 1, comboMs: 0 };
  return { ...score, comboMs };
}
