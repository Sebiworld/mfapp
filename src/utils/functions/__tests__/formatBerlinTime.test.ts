import { describe, expect, it, vi } from "vitest";
import { formatBerlinTime } from "../formatBerlinTime";

// Runs before the imports so the formatter is created under a non-Berlin process zone.
vi.hoisted(() => {
  vi.stubEnv("TZ", "America/Los_Angeles");
});

// 2026-10-10T17:30:00Z = 19:30 in Berlin (CEST)
const SUMMER = Date.UTC(2026, 9, 10, 17, 30, 0) / 1000;
// 2026-12-10T18:30:00Z = 19:30 in Berlin (CET)
const WINTER = Date.UTC(2026, 11, 10, 18, 30, 0) / 1000;

describe("formatBerlinTime", () => {
  it("shows Berlin time in summer and winter, whatever the process time zone", () => {
    // Proves the zone switch took effect: local hours differ from Berlin.
    expect(new Date(SUMMER * 1000).getHours()).toBe(10);

    expect(formatBerlinTime(SUMMER)).toBe("19:30");
    expect(formatBerlinTime(WINTER)).toBe("19:30");
  });
});
