import { describe, expect, test } from "bun:test";
import {
  applyDamage,
  createHealth,
  heal,
  isDead,
  MINOR_HITS_PER_SEGMENT,
} from "./health";

describe("health", () => {
  test("starts with three full segments", () => {
    const hp = createHealth(3);
    expect(hp.segments).toBe(3);
    expect(hp.hits).toBe(3 * MINOR_HITS_PER_SEGMENT);
  });

  test("a minor hit removes one hit from the current segment", () => {
    const hp = applyDamage(createHealth(3), 1);
    expect(hp.hits).toBe(8);
    expect(hp.segments).toBe(3);
  });

  test("three minor hits empty one segment", () => {
    const hp = applyDamage(createHealth(3), MINOR_HITS_PER_SEGMENT);
    expect(hp.segments).toBe(2);
    expect(hp.hits).toBe(6);
  });

  test("a major hit empties one whole segment", () => {
    const hp = applyDamage(createHealth(3), MINOR_HITS_PER_SEGMENT);
    expect(hp.segments).toBe(2);
  });

  test("death when hits reach zero", () => {
    const hp = applyDamage(createHealth(1), MINOR_HITS_PER_SEGMENT);
    expect(isDead(hp)).toBe(true);
    expect(hp.segments).toBe(0);
  });

  test("healing a pie slice restores one segment of hits", () => {
    const hurt = applyDamage(createHealth(3), MINOR_HITS_PER_SEGMENT + 1);
    const healed = heal(hurt, MINOR_HITS_PER_SEGMENT);
    expect(healed.hits).toBe(8);
    expect(healed.segments).toBe(3);
  });

  test("healing never exceeds the starting maximum", () => {
    const full = heal(createHealth(3), 99);
    expect(full.hits).toBe(9);
    expect(full.segments).toBe(3);
  });
});
