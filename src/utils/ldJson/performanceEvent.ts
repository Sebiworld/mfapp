import { PerformanceDetailDto } from "@models/utility-types/performance-detail-dto.model";
import { convertHtmlEntities } from "@utils/functions/convertHtmlEntities";
import { getCanonicalUrl } from "@utils/functions/getCanonicalUrl";
import { getPageSeo } from "@utils/functions/getPageSeo";
import type { Event, WithContext } from "schema-dts";

const BERLIN_TIME_ZONE = "Europe/Berlin";
const SITE_TITLE_SUFFIX = " | Musical-Fabrik e.V.";

const berlinParts = new Intl.DateTimeFormat("en-CA", {
  timeZone: BERLIN_TIME_ZONE,
  year: "numeric",
  month: "2-digit",
  day: "2-digit",
  hour: "2-digit",
  minute: "2-digit",
  second: "2-digit",
  hourCycle: "h23",
  timeZoneName: "longOffset",
});

/**
 * Formats a Unix timestamp as ISO 8601 in Europe/Berlin with the offset valid on that day.
 * @param seconds Unix timestamp in seconds.
 * @returns Text such as `2026-10-11T19:30:00+02:00`.
 */
export const toBerlinIso = (seconds: number): string => {
  const parts: Record<string, string> = {};

  for (const part of berlinParts.formatToParts(seconds * 1000)) {
    parts[part.type] = part.value;
  }

  // "GMT+02:00" (or plain "GMT" when the offset is zero).
  const offset = parts.timeZoneName.replace("GMT", "") || "+00:00";

  return `${parts.year}-${parts.month}-${parts.day}T${parts.hour}:${parts.minute}:${parts.second}${offset}`;
};

/**
 * Reduces backend HTML to single-spaced plain text lines.
 * @param html HTML string.
 * @returns One entry per non-empty line.
 */
const htmlToLines = (html: string): string[] =>
  convertHtmlEntities(
    html
      .replace(/<\/(p|div|li|h\d)>|<br\s*\/?>/gi, "\n")
      .replace(/<[^>]*>/g, "")
  )
    .split("\n")
    .map((line) => line.replace(/\s+/g, " ").trim())
    .filter(Boolean);

/**
 * Builds the postal address text of a location without its repeated place name.
 * @param placeName Name of the place.
 * @param addressHtml Address as HTML.
 * @returns Address on one line, or `null` when nothing remains.
 */
const buildAddress = (
  placeName: string,
  addressHtml: string | null | undefined
): string | null => {
  if (!addressHtml) {
    return null;
  }

  const lines = htmlToLines(addressHtml).filter((line) => line !== placeName);

  return lines.length ? lines.join(", ") : null;
};

/**
 * Builds the schema.org Event of a performance for the page head.
 * @param performance The loaded performance.
 * @returns The event; `null` when the performance has no start time or its place has no address. Unset values are left out.
 */
export const buildPerformanceEvent = (
  performance: PerformanceDetailDto
): WithContext<Event> | null => {
  if (performance.timestamp === null || performance.timestamp === undefined) {
    return null;
  }

  const seo = getPageSeo(performance.seo);

  // Without a postal address the event is not valid for search engines, so none is emitted.
  const placeName = performance.location?.title;
  const address = placeName
    ? buildAddress(placeName, performance.location?.address)
    : null;
  if (!placeName || !address) {
    return null;
  }

  const projectTitle = performance.project?.title;
  const heading = performance.title || performance.event?.title || "";
  const fallbackName = [heading, projectTitle].filter(Boolean).join(" – ");

  // The finished seo title names date and project; the site suffix is not part of an event name.
  const seoTitle = seo.title ? convertHtmlEntities(seo.title) : "";
  const name = seoTitle
    ? seoTitle.endsWith(SITE_TITLE_SUFFIX)
      ? seoTitle.slice(0, -SITE_TITLE_SUFFIX.length)
      : seoTitle
    : fallbackName;

  const event: WithContext<Event> = {
    "@context": "https://schema.org",
    "@type": "Event",
    name,
    url: getCanonicalUrl(seo),
    startDate: toBerlinIso(performance.timestamp),
    eventAttendanceMode: "https://schema.org/OfflineEventAttendanceMode",
    eventStatus: "https://schema.org/EventScheduled",
    organizer: {
      "@type": "Organization",
      name: "Musical-Fabrik e.V.",
      url: "https://www.musical-fabrik.de/",
    },
  };

  if (performance.timestamp_until) {
    event.endDate = toBerlinIso(performance.timestamp_until);
  }

  const description =
    (performance.description
      ? htmlToLines(performance.description).join(" ")
      : "") || (seo.description ? convertHtmlEntities(seo.description) : "");
  if (description) {
    event.description = description;
  }

  if (seo.image) {
    event.image = seo.image;
  }

  event.location = { "@type": "Place", name: placeName, address };

  if (performance.ticket_url) {
    event.offers = { "@type": "Offer", url: performance.ticket_url };
  }

  return event;
};
