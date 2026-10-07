import { describe, expect, it } from "vitest";
import { PerformanceDetailDto } from "@models/utility-types/performance-detail-dto.model";
import { buildPerformanceEvent as buildOrNull } from "../performanceEvent";

const buildPerformanceEvent = (performance: PerformanceDetailDto) => {
  const event = buildOrNull(performance);

  expect(event).not.toBeNull();

  return event as NonNullable<typeof event>;
};

const baseSeo = {
  title:
    "Abendvorstellung am So., 11. Oktober 2026 – Annie | Musical-Fabrik e.V.",
  description: "Verein beschreibt sich.",
  canonical:
    "https://www.musical-fabrik.de/projekte/annie/vorstellungen/11695/",
  image: "https://example.test/annie.jpg",
  noindex: false,
};

const makePerformance = (
  overrides: Partial<PerformanceDetailDto> = {}
): PerformanceDetailDto =>
  ({
    id: 11695,
    title: "Abendvorstellung",
    // 2026-10-11 17:30 UTC = 19:30 CEST
    timestamp: 1791739800,
    timestamp_until: 1791750600,
    ticket_url: "https://tickets.example.test/shop?event=1",
    description: null,
    event: { id: 1, title: "Sonntagsvorstellungen" },
    project: { id: 10363, title: "Annie", url: "/projekte/annie/" },
    location: {
      id: 5015,
      title: "Stadthalle Rheda-Wiedenbrück",
      address:
        "<p><strong>Stadthalle Rheda-Wiedenbrück</strong><br />\nMittelhegge 13<br />\n33378 Rheda-Wiedenbrück</p>",
    },
    seo: baseSeo,
    ...overrides,
  }) as PerformanceDetailDto;

const hasEmptyValue = (value: unknown): boolean => {
  if (value === null || value === "" || value === undefined) {
    return true;
  }
  if (Array.isArray(value)) {
    return value.some(hasEmptyValue);
  }
  if (typeof value === "object") {
    return Object.values(value as object).some(hasEmptyValue);
  }
  return false;
};

describe("buildPerformanceEvent", () => {
  it("builds a complete event", () => {
    const event = buildPerformanceEvent(makePerformance());

    expect(event).toMatchObject({
      "@context": "https://schema.org",
      "@type": "Event",
      name: "Abendvorstellung am So., 11. Oktober 2026 – Annie",
      startDate: "2026-10-11T19:30:00+02:00",
      endDate: "2026-10-11T22:30:00+02:00",
      eventAttendanceMode: "https://schema.org/OfflineEventAttendanceMode",
      eventStatus: "https://schema.org/EventScheduled",
      image: "https://example.test/annie.jpg",
      description: "Verein beschreibt sich.",
      location: {
        "@type": "Place",
        name: "Stadthalle Rheda-Wiedenbrück",
        address: "Mittelhegge 13, 33378 Rheda-Wiedenbrück",
      },
      offers: {
        "@type": "Offer",
        url: "https://tickets.example.test/shop?event=1",
      },
      organizer: {
        "@type": "Organization",
        name: "Musical-Fabrik e.V.",
        url: "https://www.musical-fabrik.de/",
      },
    });
    expect(hasEmptyValue(JSON.parse(JSON.stringify(event)))).toBe(false);
  });

  it("omits endDate without timestamp_until", () => {
    const event = buildPerformanceEvent(
      makePerformance({ timestamp_until: null })
    );

    expect(event).not.toHaveProperty("endDate");
    expect(hasEmptyValue(JSON.parse(JSON.stringify(event)))).toBe(false);
  });

  it("omits offers without ticket_url", () => {
    const event = buildPerformanceEvent(makePerformance({ ticket_url: null }));

    expect(event).not.toHaveProperty("offers");
  });

  it("omits image when seo has none, and survives seo: []", () => {
    const withoutImage = buildPerformanceEvent(
      makePerformance({ seo: { ...baseSeo, image: null } })
    );
    const emptySeo = buildPerformanceEvent(
      makePerformance({ seo: [] as never })
    );

    expect(withoutImage).not.toHaveProperty("image");
    expect(emptySeo).not.toHaveProperty("image");
    expect(emptySeo.name).toBe("Abendvorstellung – Annie");
    expect(hasEmptyValue(JSON.parse(JSON.stringify(emptySeo)))).toBe(false);
  });

  it("prefers the performance description as plain text", () => {
    const event = buildPerformanceEvent(
      makePerformance({ description: "<p>Mit <b>Pause</b> &amp; Programm</p>" })
    );

    expect(event.description).toBe("Mit Pause & Programm");
  });

  it("reduces address HTML to text without the repeated place name", () => {
    const event = buildPerformanceEvent(
      makePerformance({
        location: {
          id: 1,
          title: "Halle",
          address: "<p>Mittelhegge&nbsp;13<br>33378 Ort</p>",
        },
      })
    ) as { location: { address: string } };

    expect(event.location.address).toBe("Mittelhegge 13, 33378 Ort");
  });

  it.each([
    ["only the place name", "<p><strong>Halle</strong></p>"],
    ["empty markup", "<p>&nbsp;</p>"],
    ["null", null],
  ])("returns null when the address is %s", (_label, address) => {
    const event = buildOrNull(
      makePerformance({ location: { id: 1, title: "Halle", address } })
    );

    expect(event).toBeNull();
  });

  it("returns null without a location", () => {
    expect(buildOrNull(makePerformance({ location: null }))).toBeNull();
  });

  it("uses the canonical address as url, with a fallback to the current page", () => {
    const withSeo = buildPerformanceEvent(makePerformance());
    const withoutSeo = buildPerformanceEvent(
      makePerformance({ seo: [] as never })
    );

    expect(withSeo.url).toBe(baseSeo.canonical);
    expect(withoutSeo.url).toBe(`${window.location.origin}/`);
  });

  it("uses the Berlin offset in winter and summer", () => {
    // 2026-01-15 18:00 UTC = 19:00 CET; 2026-07-15 17:00 UTC = 19:00 CEST
    const winter = buildPerformanceEvent(
      makePerformance({ timestamp: 1768500000, timestamp_until: null })
    );
    const summer = buildPerformanceEvent(
      makePerformance({ timestamp: 1784134800, timestamp_until: null })
    );

    expect(winter.startDate).toBe("2026-01-15T19:00:00+01:00");
    expect(summer.startDate).toBe("2026-07-15T19:00:00+02:00");
  });

  it("returns null without a start", () => {
    expect(buildOrNull(makePerformance({ timestamp: null }))).toBeNull();
  });
});
