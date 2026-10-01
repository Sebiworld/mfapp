const BERLIN_TIME_ZONE = "Europe/Berlin";

const berlinFormatter = new Intl.DateTimeFormat("de-DE", {
  timeZone: BERLIN_TIME_ZONE,
  weekday: "long",
  day: "2-digit",
  month: "2-digit",
  year: "numeric",
  hour: "2-digit",
  minute: "2-digit",
  hourCycle: "h23",
});

/**
 * Formats a Unix timestamp as weekday, date and time in Europe/Berlin, independent of the browser time zone.
 * @param seconds Unix timestamp in seconds.
 * @returns Text such as `Samstag, 10.10.2026 - 19:30`.
 */
export const formatBerlinDate = (seconds: number): string => {
  const parts: Record<string, string> = {};

  for (const part of berlinFormatter.formatToParts(seconds * 1000)) {
    parts[part.type] = part.value;
  }

  return `${parts.weekday}, ${parts.day}.${parts.month}.${parts.year} - ${parts.hour}:${parts.minute}`;
};
