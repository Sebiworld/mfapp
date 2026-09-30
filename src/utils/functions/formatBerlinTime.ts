const berlinTimeFormatter = new Intl.DateTimeFormat("de-DE", {
  timeZone: "Europe/Berlin",
  hour: "2-digit",
  minute: "2-digit",
  hourCycle: "h23",
});

/**
 * Formats a Unix timestamp as clock time in Europe/Berlin, independent of the browser time zone.
 * @param seconds Unix timestamp in seconds.
 * @returns Text such as `19:30`.
 */
export const formatBerlinTime = (seconds: number): string =>
  berlinTimeFormatter.format(seconds * 1000);
