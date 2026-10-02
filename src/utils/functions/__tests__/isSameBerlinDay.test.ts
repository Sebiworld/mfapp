import { describe, expect, it, vi } from "vitest";
import { isSameBerlinDay } from "../isSameBerlinDay";

// Runs before the imports so the formatter is created under a non-Berlin process zone.
vi.hoisted(() => {
  vi.stubEnv("TZ", "America/Los_Angeles");
});

// 2026-10-10T17:30:00Z = Saturday 19:30 in Berlin (CEST)
const PERFORMANCE = Date.UTC(2026, 9, 10, 17, 30, 0) / 1000;

describe("isSameBerlinDay", () => {
  it("is true from Berlin midnight of the performance day on", () => {
    // 2026-10-09T22:00:00Z = Saturday 00:00 in Berlin, still Friday in the process zone
    expect(isSameBerlinDay(PERFORMANCE, Date.UTC(2026, 9, 9, 22, 0, 0))).toBe(
      true
    );
  });

  it("is false on the evening before in Berlin", () => {
    // 2026-10-09T21:59:00Z = Friday 23:59 in Berlin
    expect(
      isSameBerlinDay(PERFORMANCE, Date.UTC(2026, 9, 9, 21, 59, 0))
    ).toBe(false);
  });

  it("is false after Berlin midnight following the performance", () => {
    // 2026-10-10T22:00:00Z = Sunday 00:00 in Berlin, still Saturday in the process zone
    expect(
      isSameBerlinDay(PERFORMANCE, Date.UTC(2026, 9, 10, 22, 0, 0))
    ).toBe(false);
  });
});
