import { describe, expect, test } from "bun:test";
import {
  LIGHT_DAMAGE,
  HEAVY_DAMAGE,
  attackHits,
  inRange,
  dodgeIframesMs,
} from "./combat";

describe("melee", () => {
  test("light attacks deal 1 hit of damage", () => {
    expect(LIGHT_DAMAGE).toBe(1);
  });

  test("heavy attacks deal a full segment of damage", () => {
    expect(HEAVY_DAMAGE).toBe(3);
  });

  test("an attack only connects when the target is in facing range and on the same lane", () => {
    const attacker = { x: 100, y: 400, facing: 1 as const, range: 56 };
    expect(inRange(attacker, { x: 140, y: 408 })).toBe(true);
    expect(inRange(attacker, { x: 140, y: 480 })).toBe(false);
    expect(inRange(attacker, { x: 40, y: 400 })).toBe(false);
  });

  test("hurt actors cannot be hit again while invulnerable", () => {
    expect(attackHits({ invulnMs: 120 }, 16)).toBe(false);
    expect(attackHits({ invulnMs: 0 }, 16)).toBe(true);
  });

  test("a dodge grants i-frames", () => {
    expect(dodgeIframesMs()).toBeGreaterThan(100);
  });
});
