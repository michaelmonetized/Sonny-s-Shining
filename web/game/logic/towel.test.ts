import { describe, expect, test } from "bun:test";
import { catchQuality, returnDamage, CATCH_PERFECT_MS, CATCH_GOOD_MS } from "./towel";

describe("towel catch window", () => {
  test("misses when the towel is not held", () => {
    expect(catchQuality({ towelHeld: false, timeToImpactMs: 0 })).toBe("miss");
  });

  test("perfect catch when impact is inside the tight window", () => {
    expect(catchQuality({ towelHeld: true, timeToImpactMs: 0 })).toBe("perfect");
    expect(catchQuality({ towelHeld: true, timeToImpactMs: CATCH_PERFECT_MS })).toBe("perfect");
    expect(catchQuality({ towelHeld: true, timeToImpactMs: -CATCH_PERFECT_MS })).toBe("perfect");
  });

  test("good catch when impact is inside the wide window but outside perfect", () => {
    expect(catchQuality({ towelHeld: true, timeToImpactMs: CATCH_PERFECT_MS + 1 })).toBe("good");
    expect(catchQuality({ towelHeld: true, timeToImpactMs: CATCH_GOOD_MS })).toBe("good");
  });

  test("misses when the projectile is outside the catch window", () => {
    expect(catchQuality({ towelHeld: true, timeToImpactMs: CATCH_GOOD_MS + 1 })).toBe("miss");
  });
});

describe("towel return damage", () => {
  test("perfect catch doubles the projectile damage", () => {
    expect(returnDamage(10, "perfect")).toBe(20);
  });

  test("good catch returns the projectile at full damage", () => {
    expect(returnDamage(10, "good")).toBe(10);
  });

  test("a miss returns no damage", () => {
    expect(returnDamage(10, "miss")).toBe(0);
  });
});
