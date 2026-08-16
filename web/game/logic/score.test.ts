import { describe, expect, test } from "bun:test";
import { addScore, createScore, comboMultiplier, tickCombo } from "./score";

describe("score", () => {
  test("an enemy defeat is worth 100 points times the combo", () => {
    const scored = addScore(createScore(), "defeat", 1);
    expect(scored.points).toBe(100);
    expect(scored.combo).toBe(2);
  });

  test("a perfect catch is worth 250 bonus points", () => {
    const scored = addScore(createScore(), "perfect", 1);
    expect(scored.points).toBe(250);
  });

  test("combo multiplies up to 10x", () => {
    expect(comboMultiplier(1)).toBe(1);
    expect(comboMultiplier(10)).toBe(10);
    expect(comboMultiplier(99)).toBe(10);
  });

  test("combo drops if no hits land before the window expires", () => {
    const hot = addScore(createScore(), "defeat", 1);
    const cold = tickCombo(hot, 3000);
    expect(cold.combo).toBe(1);
  });
});
