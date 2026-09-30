import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { render, screen, within } from "@testing-library/react";
import { createMemoryRouter, RouterProvider } from "react-router";
import { THEME_ID, ThemeProvider } from "@mui/material/styles";
import { mfTheme } from "@styles/theme/mfTheme";
import { SidebarBoxEvents } from "../SidebarBoxEvents";
import { ProjectEventsData } from "@models/project-dto.model";
import "@utils/i18n/i18n";

// 2026-10-01T12:00:00Z
const NOW = Date.UTC(2026, 9, 1, 12, 0, 0);
const nowSeconds = NOW / 1000;

// 2026-10-10T17:30:00Z = 19:30 in Berlin (CEST)
const FUTURE = Date.UTC(2026, 9, 10, 17, 30, 0) / 1000;

const data = (timestamps: number[]): ProjectEventsData => ({
  performances: timestamps.map((timestamp, index) => ({
    id: 100 + index,
    timestamp,
    casts: [{ id: 1, title: "Cast A" }],
  })),
});

const renderBox = (events: ProjectEventsData): void => {
  const router = createMemoryRouter([
    {
      path: "*",
      element: (
        <ThemeProvider theme={{ [THEME_ID]: mfTheme }}>
          <SidebarBoxEvents data={events} projectUrl="/projekte/annie/" />
        </ThemeProvider>
      ),
    },
  ]);

  render(<RouterProvider router={router} />);
};

describe("SidebarBoxEvents", () => {
  beforeEach(() => {
    vi.useFakeTimers({ toFake: ["Date"] });
    vi.setSystemTime(NOW);
  });

  afterEach(() => {
    vi.useRealTimers();
    vi.unstubAllEnvs();
  });

  it("links every event to its performance page", () => {
    renderBox(data([FUTURE, nowSeconds - 3600]));

    const links = screen
      .getAllByTestId("event-item")
      .filter((el) => el.tagName === "A");

    expect(links.map((el) => el.getAttribute("href"))).toEqual(
      expect.arrayContaining([
        "/projekte/annie/auffuehrungen/100",
        "/projekte/annie/auffuehrungen/101",
      ])
    );
    // Future one in the highlight only, past one in the list.
    expect(links).toHaveLength(2);
  });

  it("shows the next performance with its cast and link", () => {
    renderBox(data([FUTURE + 86400, FUTURE, nowSeconds - 3600]));

    const next = screen.getByTestId("next-performance");

    expect(next).toHaveTextContent("Nächste Aufführung");
    expect(within(next).getByTestId("event-item")).toHaveAttribute(
      "href",
      "/projekte/annie/auffuehrungen/101"
    );
    expect(next).toHaveTextContent("Cast A");
  });

  it("lists the next performance only in the highlight, not in the list", () => {
    renderBox(data([FUTURE + 86400, FUTURE, nowSeconds - 3600]));

    const items = screen.getAllByTestId("event-item");
    const hrefs = items.map((el) => el.getAttribute("href"));

    // Next (101) once in the highlight; the list keeps the later (100) and the past (102).
    expect(hrefs.filter((h) => h?.endsWith("/101"))).toHaveLength(1);
    expect(
      within(screen.getByTestId("next-performance")).getAllByTestId(
        "event-item"
      )
    ).toHaveLength(1);
    expect(hrefs).toEqual(
      expect.arrayContaining([
        "/projekte/annie/auffuehrungen/100",
        "/projekte/annie/auffuehrungen/102",
      ])
    );
    expect(items).toHaveLength(3);
  });

  it("keeps the list unchanged when nothing is upcoming", () => {
    renderBox(data([nowSeconds - 3600, nowSeconds - 86400]));

    expect(screen.getAllByTestId("event-item")).toHaveLength(2);
  });

  it("omits the next performance when nothing is upcoming", () => {
    renderBox(data([nowSeconds - 3600, nowSeconds - 86400]));

    expect(screen.queryByTestId("next-performance")).toBeNull();
    expect(screen.queryByText(/Nächste Aufführung/)).toBeNull();
  });

  it("shows the time in Europe/Berlin regardless of the process time zone", () => {
    vi.stubEnv("TZ", "America/Los_Angeles");

    // Guard: the process zone really differs (17:30Z would be 10:30 there).
    expect(new Date(FUTURE * 1000).getHours()).toBe(10);

    renderBox(data([FUTURE]));

    expect(screen.getByTestId("next-performance")).toHaveTextContent(
      "Samstag, 10.10.2026 - 19:30"
    );
  });
});
