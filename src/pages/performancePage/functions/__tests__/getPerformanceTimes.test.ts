import { describe, expect, it } from "vitest";
import { i18n } from "@utils/i18n/i18n";
import {
  getAdmissionTimes,
  getAdmissionTimestamp,
  getDurationLabel,
  getDurationMinutes,
  getPerformanceStatus,
} from "../getPerformanceTimes";

const START = 1_790_875_800;

const admission = (
  foyer: number | null,
  hall: number | null
): {
  timestamp: number;
  admission_minutes: number | null;
  hall_admission_minutes: number | null;
} => ({
  timestamp: START,
  admission_minutes: foyer,
  hall_admission_minutes: hall,
});

const times = (
  common: number | null,
  foyer: number | null,
  hall: number | null
): { common: number | null; foyer: number | null; hall: number | null } => ({
  common: common === null ? null : START - common * 60,
  foyer: foyer === null ? null : START - foyer * 60,
  hall: hall === null ? null : START - hall * 60,
});

describe("getAdmissionTimes", () => {
  it("subtracts the minutes of foyer and hall from the start", () => {
    expect(getAdmissionTimes(admission(60, 30))).toEqual(times(null, 60, 30));
  });

  it("has a single admission with only the foyer or only the hall", () => {
    expect(getAdmissionTimes(admission(60, null))).toEqual(
      times(60, null, null)
    );
    expect(getAdmissionTimes(admission(null, 30))).toEqual(
      times(30, null, null)
    );
  });

  it("treats 0 (no admission time) and null (not maintained) alike, per field", () => {
    const none = times(null, null, null);

    expect(getAdmissionTimes(admission(0, 0))).toEqual(none);
    expect(getAdmissionTimes(admission(null, null))).toEqual(none);
    expect(getAdmissionTimes(admission(0, null))).toEqual(none);
    expect(getAdmissionTimes(admission(null, 0))).toEqual(none);
    expect(getAdmissionTimes(admission(60, 0))).toEqual(times(60, null, null));
    expect(getAdmissionTimes(admission(0, 30))).toEqual(times(30, null, null));
  });

  it("merges foyer and hall into one admission when both open at the same time", () => {
    expect(getAdmissionTimes(admission(30, 30))).toEqual(times(30, null, null));
  });

  it("has a single admission from the hall when the hall opens earlier", () => {
    expect(getAdmissionTimes(admission(30, 60))).toEqual(times(60, null, null));
  });
});

describe("getAdmissionTimestamp", () => {
  it("returns the first admission, foyer or hall", () => {
    expect(getAdmissionTimestamp(admission(60, 30))).toBe(START - 3600);
    expect(getAdmissionTimestamp(admission(null, 30))).toBe(START - 1800);
    expect(getAdmissionTimestamp(admission(30, 60))).toBe(START - 3600);
    expect(getAdmissionTimestamp(admission(30, 30))).toBe(START - 1800);
  });

  it("returns null when neither is set", () => {
    expect(getAdmissionTimestamp(admission(null, null))).toBeNull();
    expect(getAdmissionTimestamp(admission(0, 0))).toBeNull();
  });
});

describe("getDurationMinutes", () => {
  it("needs both times", () => {
    expect(
      getDurationMinutes({
        timestamp: START,
        timestamp_until: START + 9000,
      })
    ).toBe(150);
    expect(
      getDurationMinutes({
        timestamp: START,
        timestamp_until: null,
      })
    ).toBeNull();
  });

  it("ignores an end that is not after the start", () => {
    expect(
      getDurationMinutes({
        timestamp: START,
        timestamp_until: START,
      })
    ).toBeNull();
  });
});

describe("getPerformanceStatus", () => {
  const withEnd = {
    timestamp: START,
    timestamp_until: START + 3600,
  };

  it("closes tickets exactly at the start", () => {
    expect(getPerformanceStatus(withEnd, START * 1000 - 1).ticketsClosed).toBe(
      false
    );
    expect(getPerformanceStatus(withEnd, START * 1000).ticketsClosed).toBe(
      true
    );
  });

  it("marks the performance as ended exactly at the end", () => {
    const end = (START + 3600) * 1000;

    expect(getPerformanceStatus(withEnd, end - 1).hasEnded).toBe(false);
    expect(getPerformanceStatus(withEnd, end).hasEnded).toBe(true);
  });

  it("uses the start as end when no end is known", () => {
    const noEnd = { ...withEnd, timestamp_until: null };

    expect(getPerformanceStatus(noEnd, START * 1000 - 1).hasEnded).toBe(false);
    expect(getPerformanceStatus(noEnd, START * 1000).hasEnded).toBe(true);
  });
});

describe("without a start", () => {
  const noStart = {
    timestamp: null,
    timestamp_until: START,
    admission_minutes: 60,
    hall_admission_minutes: 30,
  };

  it("has no admission time or duration", () => {
    expect(getAdmissionTimes(noStart)).toEqual({
      common: null,
      foyer: null,
      hall: null,
    });
    expect(getAdmissionTimestamp(noStart)).toBeNull();
    expect(getDurationMinutes(noStart)).toBeNull();
  });

  it("is neither closed nor ended", () => {
    expect(getPerformanceStatus(noStart, (START + 1) * 1000)).toEqual({
      ticketsClosed: false,
      hasEnded: false,
    });
  });
});

describe("getDurationLabel", () => {
  const label = (minutes: number | null): string | null =>
    getDurationLabel(
      {
        timestamp: START,
        timestamp_until: minutes === null ? null : START + minutes * 60,
      },
      (key, options) => i18n.t(key, options) as string
    );

  it("rounds to half hours with a German decimal comma", () => {
    expect(label(150)).toBe("Dauer ca. 2,5 Stunden");
    expect(label(140)).toBe("Dauer ca. 2,5 Stunden");
    expect(label(130)).toBe("Dauer ca. 2 Stunden");
    expect(label(175)).toBe("Dauer ca. 3 Stunden");
  });

  it("uses the singular for one hour", () => {
    expect(label(60)).toBe("Dauer ca. 1 Stunde");
    expect(label(50)).toBe("Dauer ca. 1 Stunde");
  });

  it("has no label without an end or for a run that rounds to zero", () => {
    expect(label(null)).toBeNull();
    expect(label(10)).toBeNull();
  });
});
