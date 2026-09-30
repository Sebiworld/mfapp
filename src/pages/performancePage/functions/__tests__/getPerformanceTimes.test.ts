import { describe, expect, it } from "vitest";
import { i18n } from "@utils/i18n/i18n";
import {
  getAdmissionTimestamp,
  getDurationLabel,
  getDurationMinutes,
  getPerformanceStatus,
} from "../getPerformanceTimes";

const START = 1_790_875_800;

describe("getAdmissionTimestamp", () => {
  it("subtracts the admission minutes from the start", () => {
    expect(
      getAdmissionTimestamp({
        timestamp: START,
        timestamp_until: null,
        admission_minutes: 60,
      })
    ).toBe(START - 3600);
  });

  it("returns null when no admission is set", () => {
    expect(
      getAdmissionTimestamp({
        timestamp: START,
        timestamp_until: null,
        admission_minutes: null,
      })
    ).toBeNull();
  });
});

describe("getDurationMinutes", () => {
  it("needs both times", () => {
    expect(
      getDurationMinutes({
        timestamp: START,
        timestamp_until: START + 9000,
        admission_minutes: null,
      })
    ).toBe(150);
    expect(
      getDurationMinutes({
        timestamp: START,
        timestamp_until: null,
        admission_minutes: null,
      })
    ).toBeNull();
  });

  it("ignores an end that is not after the start", () => {
    expect(
      getDurationMinutes({
        timestamp: START,
        timestamp_until: START,
        admission_minutes: null,
      })
    ).toBeNull();
  });
});

describe("getPerformanceStatus", () => {
  const withEnd = {
    timestamp: START,
    timestamp_until: START + 3600,
    admission_minutes: null,
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
  };

  it("has no admission time or duration", () => {
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
        admission_minutes: null,
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
