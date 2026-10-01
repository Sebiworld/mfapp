import { describe, expect, it } from "vitest";
import { getCountdown } from "../getCountdown";

const TARGET = 1_790_875_800;
const at = (secondsBefore: number): number => (TARGET - secondsBefore) * 1000;

describe("getCountdown", () => {
  it("splits the remaining time into days, hours, minutes and seconds", () => {
    const seconds = 3 * 86_400 + 4 * 3_600 + 5 * 60 + 6;

    expect(getCountdown(TARGET, at(seconds))).toEqual({
      days: 3,
      hours: 4,
      minutes: 5,
      seconds: 6,
      totalSeconds: seconds,
    });
  });

  it("rolls over exactly at the unit boundaries", () => {
    expect(getCountdown(TARGET, at(86_400))).toMatchObject({
      days: 1,
      hours: 0,
      minutes: 0,
      seconds: 0,
    });
    expect(getCountdown(TARGET, at(86_399))).toMatchObject({
      days: 0,
      hours: 23,
      minutes: 59,
      seconds: 59,
    });
    expect(getCountdown(TARGET, at(3_600))).toMatchObject({
      hours: 1,
      minutes: 0,
    });
    expect(getCountdown(TARGET, at(60))).toMatchObject({
      minutes: 1,
      seconds: 0,
    });
  });

  it("counts a started second as a full one", () => {
    expect(getCountdown(TARGET, TARGET * 1000 - 400).totalSeconds).toBe(1);
  });

  it("shows zero at the target and never goes negative", () => {
    expect(getCountdown(TARGET, at(0))).toEqual({
      days: 0,
      hours: 0,
      minutes: 0,
      seconds: 0,
      totalSeconds: 0,
    });
    expect(getCountdown(TARGET, at(-3_700))).toEqual({
      days: 0,
      hours: 0,
      minutes: 0,
      seconds: 0,
      totalSeconds: 0,
    });
  });
});
