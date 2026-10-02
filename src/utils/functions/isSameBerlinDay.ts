const berlinDayFormatter = new Intl.DateTimeFormat("en-CA", {
  timeZone: "Europe/Berlin",
  year: "numeric",
  month: "2-digit",
  day: "2-digit",
});

/**
 * Tells whether a moment falls on the same calendar day in Europe/Berlin as a Unix timestamp, independent of the
 * browser time zone.
 * @param seconds Unix timestamp in seconds, e.g. the start of a performance.
 * @param nowMs Moment to compare, in milliseconds.
 * @returns True if both fall on the same Berlin calendar day.
 */
export const isSameBerlinDay = (seconds: number, nowMs: number): boolean =>
  berlinDayFormatter.format(seconds * 1000) ===
  berlinDayFormatter.format(nowMs);
