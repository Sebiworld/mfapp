import { describe, expect, it } from "vitest";
import {
  NextPerformanceItemDto,
  NextPerformancesDto,
} from "@models/utility-types/next-performances-dto.model";
import {
  getNextPerformanceCardState,
  getNextPerformanceCardStateKey,
} from "../getNextPerformanceCardState";

// 2026-10-01T17:30:00Z = 19:30 in Berlin
const START = 1_790_875_800;
const DAY = 86_400;

const item = (
  fields: Partial<NextPerformanceItemDto> = {}
): NextPerformanceItemDto => ({
  id: 1,
  title: "Abendvorstellung",
  timestamp: START,
  timestamp_until: START + 9_000,
  admission_minutes: 60,
  hall_admission_minutes: 30,
  ticket_url: null,
  event: { id: 9, title: "Premiere" },
  project: { id: 5, title: "Annie", url: "/projekte/annie/" },
  casts: [],
  ...fields,
});

const data = (
  current: NextPerformanceItemDto | null,
  next: NextPerformanceItemDto | null
): NextPerformancesDto => ({ current, next, hash: "h" });

const at = (seconds: number): number => seconds * 1000;

describe("getNextPerformanceCardState", () => {
  const first = item();
  const second = item({ id: 2, timestamp: START + DAY, timestamp_until: null });

  it("returns no state without data or without performances", () => {
    expect(getNextPerformanceCardState(undefined, at(START))).toBeNull();
    expect(getNextPerformanceCardState(data(null, null), at(START))).toBeNull();
  });

  it("counts down to the next performance before admission", () => {
    const state = getNextPerformanceCardState(
      data(null, first),
      at(START - 3_601)
    );

    expect(state?.phase).toBe("before");
    expect(state?.performance.id).toBe(1);
    expect(state?.countdownTarget?.id).toBe(1);
  });

  it("opens the foyer first, then the hall, and counts down to the start", () => {
    const phaseAt = (seconds: number) =>
      getNextPerformanceCardState(data(null, first), at(seconds));

    expect(phaseAt(START - 3_600)?.phase).toBe("foyer");
    expect(phaseAt(START - 3_600)?.countdownTarget?.id).toBe(1);
    expect(phaseAt(START - 1_801)?.phase).toBe("foyer");
    expect(phaseAt(START - 1_800)?.phase).toBe("hall");
    expect(phaseAt(START - 1_800)?.countdownTarget?.id).toBe(1);
    expect(phaseAt(START - 1)?.phase).toBe("hall");
    expect(phaseAt(START)?.phase).toBe("running");
  });

  it("has a single admission phase when only the foyer is set", () => {
    const foyerOnly = item({ hall_admission_minutes: null });
    const phaseAt = (seconds: number) =>
      getNextPerformanceCardState(data(null, foyerOnly), at(seconds))?.phase;

    expect(phaseAt(START - 3_601)).toBe("before");
    expect(phaseAt(START - 3_600)).toBe("admission");
    expect(phaseAt(START - 1_800)).toBe("admission");
    expect(phaseAt(START)).toBe("running");
  });

  it("has a single admission phase when only the hall is set", () => {
    const hallOnly = item({ admission_minutes: null });
    const phaseAt = (seconds: number) =>
      getNextPerformanceCardState(data(null, hallOnly), at(seconds))?.phase;

    expect(phaseAt(START - 1_801)).toBe("before");
    expect(phaseAt(START - 1_800)).toBe("admission");
    expect(phaseAt(START)).toBe("running");
  });

  it("has a single admission phase when foyer and hall open at the same time", () => {
    const together = item({ hall_admission_minutes: 60 });
    const phaseAt = (seconds: number) =>
      getNextPerformanceCardState(data(null, together), at(seconds))?.phase;

    expect(phaseAt(START - 3_601)).toBe("before");
    expect(phaseAt(START - 3_600)).toBe("admission");
    expect(phaseAt(START - 1_800)).toBe("admission");
    expect(phaseAt(START - 1)).toBe("admission");
    expect(phaseAt(START)).toBe("running");
  });

  it("has a single admission phase from the hall when the hall opens earlier", () => {
    const early = item({ hall_admission_minutes: 90 });
    const phaseAt = (seconds: number) =>
      getNextPerformanceCardState(data(null, early), at(seconds))?.phase;

    expect(phaseAt(START - 5_401)).toBe("before");
    expect(phaseAt(START - 5_400)).toBe("admission");
    expect(phaseAt(START - 3_600)).toBe("admission");
    expect(phaseAt(START)).toBe("running");
  });

  it("treats 0 and null alike and opens at the start without any admission", () => {
    for (const [foyer, hall] of [
      [0, 0],
      [null, null],
      [0, null],
      [null, 0],
    ] as const) {
      const none = item({
        admission_minutes: foyer,
        hall_admission_minutes: hall,
      });
      const phaseAt = (seconds: number) =>
        getNextPerformanceCardState(data(null, none), at(seconds))?.phase;

      expect(phaseAt(START - 1)).toBe("before");
      expect(phaseAt(START)).toBe("running");
    }
  });

  it("has a single admission phase with one field 0 and the other set", () => {
    for (const [foyer, hall, minutes] of [
      [0, 30, 30],
      [60, 0, 60],
    ] as const) {
      const mixed = item({
        admission_minutes: foyer,
        hall_admission_minutes: hall,
      });
      const phaseAt = (seconds: number) =>
        getNextPerformanceCardState(data(null, mixed), at(seconds))?.phase;

      expect(phaseAt(START - minutes * 60 - 1)).toBe("before");
      expect(phaseAt(START - minutes * 60)).toBe("admission");
      expect(phaseAt(START - 1)).toBe("admission");
      expect(phaseAt(START)).toBe("running");
    }
  });

  it("switches to running at the start and counts down to the following performance", () => {
    const state = getNextPerformanceCardState(data(first, second), at(START));

    expect(state?.phase).toBe("running");
    expect(state?.performance.id).toBe(1);
    expect(state?.countdownTarget?.id).toBe(2);
  });

  it("runs without a countdown when no later performance exists", () => {
    const state = getNextPerformanceCardState(
      data(first, null),
      at(START + 60)
    );

    expect(state?.phase).toBe("running");
    expect(state?.countdownTarget).toBeNull();
  });

  it("moves on to the following performance after the end", () => {
    const state = getNextPerformanceCardState(
      data(first, second),
      at(START + 9_000)
    );

    expect(state?.phase).toBe("before");
    expect(state?.performance.id).toBe(2);
  });

  it("keeps a performance without end running for three hours", () => {
    const open = item({ timestamp_until: null });

    expect(
      getNextPerformanceCardState(data(open, null), at(START + 10_799))?.phase
    ).toBe("running");
    expect(
      getNextPerformanceCardState(data(open, null), at(START + 10_800))
    ).toBeNull();
  });

  it("has no admission phase without an admission time", () => {
    const noAdmission = item({
      admission_minutes: null,
      hall_admission_minutes: 0,
    });

    expect(
      getNextPerformanceCardState(data(null, noAdmission), at(START - 60))
        ?.phase
    ).toBe("before");
    expect(
      getNextPerformanceCardState(data(null, noAdmission), at(START))?.phase
    ).toBe("running");
  });

  it("shows an upcoming performance up to exactly the day limit", () => {
    const now = START - 40 * DAY;
    const inDays = (days: number) =>
      data(null, item({ timestamp: now + days * DAY }));

    expect(getNextPerformanceCardState(inDays(29), at(now), 30)?.phase).toBe(
      "before"
    );
    expect(getNextPerformanceCardState(inDays(30), at(now), 30)?.phase).toBe(
      "before"
    );
    expect(getNextPerformanceCardState(inDays(31), at(now), 30)).toBeNull();
    expect(getNextPerformanceCardState(inDays(31), at(now))?.phase).toBe(
      "before"
    );
  });

  it("ignores the day limit while a performance is current", () => {
    const farNext = item({ id: 3, timestamp: START + 60 * DAY });

    expect(
      getNextPerformanceCardState(data(first, farNext), at(START), 30)?.phase
    ).toBe("running");
  });

  it("builds a key that changes with phase and performance", () => {
    const keys = [
      START - 4_000,
      START - 3_600,
      START - 1_800,
      START,
      START + 9_000,
    ].map((seconds) =>
      getNextPerformanceCardStateKey(
        getNextPerformanceCardState(data(first, second), at(seconds))
      )
    );

    expect(keys).toEqual([
      "before:1:1",
      "foyer:1:1",
      "hall:1:1",
      "running:1:2",
      "before:2:2",
    ]);
    expect(getNextPerformanceCardStateKey(null)).toBe("none");
  });
});
