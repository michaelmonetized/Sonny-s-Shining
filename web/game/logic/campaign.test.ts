import { describe, expect, test } from "bun:test";
import { CAMPAIGN, fatalityTitle, nextLevelId, levelById } from "./campaign";

describe("campaign", () => {
  test("has eight main levels plus the chase", () => {
    expect(CAMPAIGN.map((l) => l.id)).toEqual([
      "bertie",
      "charlie",
      "desi",
      "tippi",
      "bessie",
      "chase",
      "harry",
      "ivy",
      "kewpie",
    ]);
  });

  test("walks the city in story order", () => {
    expect(nextLevelId("bertie")).toBe("charlie");
    expect(nextLevelId("bessie")).toBe("chase");
    expect(nextLevelId("chase")).toBe("harry");
    expect(nextLevelId("kewpie")).toBe("ending");
  });

  test("each boss has a fatality title card", () => {
    expect(fatalityTitle("bertie")).toBe("TAKING OUT THE TRASH");
    expect(fatalityTitle("kewpie")).toBe("PERFECT 300");
  });

  test("the chase is a driving level, not a brawler", () => {
    expect(levelById("chase").mode).toBe("chase");
    expect(levelById("bertie").mode).toBe("brawl");
    expect(levelById("kewpie").mode).toBe("brawl");
  });
});
