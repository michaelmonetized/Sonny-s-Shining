import { describe, expect, test } from "bun:test";
import { stickFromPointer } from "./stick";

describe("virtual stick", () => {
  test("rests in the dead zone", () => {
    expect(stickFromPointer(0, 0, 50)).toEqual({ x: 0, y: 0 });
    expect(stickFromPointer(4, 3, 50)).toEqual({ x: 0, y: 0 });
  });

  test("maps a right pull to +x", () => {
    const v = stickFromPointer(50, 0, 50);
    expect(v.x).toBeCloseTo(1);
    expect(v.y).toBeCloseTo(0);
  });

  test("maps a down pull to +y", () => {
    const v = stickFromPointer(0, 50, 50);
    expect(v.x).toBeCloseTo(0);
    expect(v.y).toBeCloseTo(1);
  });

  test("clamps beyond the rim to unit length", () => {
    const v = stickFromPointer(200, 0, 50);
    expect(v.x).toBeCloseTo(1);
    expect(Math.hypot(v.x, v.y)).toBeCloseTo(1);
  });
});
