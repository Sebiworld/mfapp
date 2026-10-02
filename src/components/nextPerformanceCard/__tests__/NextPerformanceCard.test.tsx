import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { act, fireEvent, render, screen, within } from "@testing-library/react";
import { createMemoryRouter, RouterProvider } from "react-router";
import { THEME_ID, ThemeProvider } from "@mui/material/styles";
import { mfTheme } from "@styles/theme/mfTheme";
import {
  NextPerformanceItemDto,
  NextPerformancesDto,
} from "@models/utility-types/next-performances-dto.model";
import { PerformanceDetailDto } from "@models/utility-types/performance-detail-dto.model";
import { ProjectRoleDto } from "@models/project-role/project-role-dto.model";
import { useGlobalStore } from "@src/store/global.store";
import { NextPerformanceCard } from "../NextPerformanceCard";
import { nextPerformanceCardStyles } from "../nextPerformanceCard.styles";
import "@utils/i18n/i18n";

// Runs before the imports so all date formatters are created under a non-Berlin process zone.
vi.hoisted(() => {
  vi.stubEnv("TZ", "America/Los_Angeles");
});

const loadNextPerformances = vi.fn();
const loadPerformance = vi.fn();
vi.mock("@api/hooks/usePerformancesApi", () => ({
  usePerformancesApi: () => ({ loadNextPerformances, loadPerformance }),
}));

// Counts how often a portrait is rendered, to show that the clock does not repaint the band.
const portraitRenders = vi.hoisted(() => ({ count: 0 }));
vi.mock("@components/lazyPicture/LazyPicture", () => ({
  LazyPicture: () => {
    portraitRenders.count += 1;

    return <span />;
  },
}));

// 2026-10-01T17:30:00Z = 19:30 in Berlin (CEST)
const START = 1_790_875_800;
const DAY = 86_400;

const item = (
  fields: Partial<NextPerformanceItemDto> = {}
): NextPerformanceItemDto => ({
  id: 11,
  title: "Abendvorstellung",
  timestamp: START,
  timestamp_until: START + 9_000,
  admission_minutes: 60,
  hall_admission_minutes: 30,
  ticket_url: "https://tickets.example/11",
  event: { id: 9, title: "Premiere" },
  project: { id: 5, title: "Annie", url: "/projekte/annie/" },
  casts: [{ id: 100, title: "Cast A" }],
  ...fields,
});

const FIRST = item();
const SECOND = item({
  id: 12,
  title: "Nachmittagsvorstellung",
  timestamp: START + DAY,
  timestamp_until: null,
  admission_minutes: null,
  hall_admission_minutes: null,
  ticket_url: null,
});

/** Answers like the backend: current from the first admission until the end, next is the earliest later one. */
const serverAnswer = (
  performances: NextPerformanceItemDto[]
): NextPerformancesDto => {
  const now = Date.now() / 1000;
  const current =
    performances.find((performance) => {
      const minutes = Math.max(
        performance.admission_minutes ?? 0,
        performance.hall_admission_minutes ?? 0
      );
      const opens = performance.timestamp - minutes * 60;
      const end = performance.timestamp_until ?? performance.timestamp + 10_800;

      return opens <= now && now < end;
    }) ?? null;
  const next =
    performances.find(
      (performance) => performance !== current && performance.timestamp > now
    ) ?? null;

  return { current, next, hash: `${current?.id}-${next?.id}` };
};

const role = (
  fields: Partial<ProjectRoleDto> & { id: number }
): ProjectRoleDto =>
  // Cast: the filmstrip reads only the fields set here.
  ({
    name: `r${fields.id}`,
    url: `/r/${fields.id}/`,
    title: `Role ${fields.id}`,
    template: { id: 1, name: "project_role", label: "Rolle" },
    participants: [],
    child_ids: [],
    ...fields,
  }) as ProjectRoleDto;

const detail = (): PerformanceDetailDto =>
  // Cast: the filmstrip reads only roles and seasons.
  ({
    id: 11,
    seasons: [],
    roles: {
      roles: {
        1: role({
          id: 1,
          template: { id: 2, name: "project_roles_container", label: "C" },
          participants: undefined,
          child_ids: [10, 20],
        }),
        10: role({
          id: 10,
          title: "Annie",
          participants: [{ portrait_ids: [1, 2], cast_ids: [100] }],
        } as Partial<ProjectRoleDto> & { id: number }),
        // Same for every performance: no cast, so not part of the filmstrip.
        20: role({
          id: 20,
          title: "Orchester",
          participants: [{ portrait_ids: [3] }],
        } as Partial<ProjectRoleDto> & { id: number }),
      },
      seasons: {},
      casts: {},
      portraits: {
        1: { id: 1, name: "a", title: "Anna A" },
        2: { id: 2, name: "b", title: "Berta B" },
        3: { id: 3, name: "c", title: "Clara C" },
      },
      child_ids: [],
    },
  }) as unknown as PerformanceDetailDto;

const setReducedMotion = (reduce: boolean): void => {
  Object.defineProperty(window, "matchMedia", {
    configurable: true,
    writable: true,
    value: (query: string) => ({
      matches: reduce && query.includes("prefers-reduced-motion: reduce"),
      media: query,
      onchange: null,
      addListener: () => undefined,
      removeListener: () => undefined,
      addEventListener: () => undefined,
      removeEventListener: () => undefined,
      dispatchEvent: () => false,
    }),
  });
};

const flush = async (ms = 0): Promise<void> => {
  await act(async () => {
    await vi.advanceTimersByTimeAsync(ms);
  });
};

const renderCard = async (
  props: Parameters<typeof NextPerformanceCard>[0] = { projectId: 5 }
): Promise<{ unmount: () => void }> => {
  const router = createMemoryRouter(
    [
      {
        path: "*",
        element: (
          <ThemeProvider
            theme={{ [THEME_ID]: mfTheme }}
            noSsr
            defaultMode="light"
          >
            <NextPerformanceCard {...props} />
          </ThemeProvider>
        ),
      },
    ],
    { initialEntries: ["/"] }
  );

  const { unmount } = render(<RouterProvider router={router} />);
  await flush();

  return { unmount };
};

const tabbable = (root: HTMLElement): HTMLElement[] =>
  Array.from(
    root.querySelectorAll<HTMLElement>("a[href], button, [tabindex]")
  ).filter((element) => element.tabIndex >= 0);

const card = (): HTMLElement => screen.getByTestId("next-performance-card");

const unit = (name: string, root: HTMLElement = card()): string =>
  within(root).getByTestId(`countdown-${name}`).textContent ?? "";

describe("NextPerformanceCard", () => {
  beforeEach(() => {
    vi.useFakeTimers();
    setReducedMotion(false);
    portraitRenders.count = 0;
    useGlobalStore.setState({ projects: {} });
    loadNextPerformances.mockImplementation(async () =>
      serverAnswer([FIRST, SECOND])
    );
    loadPerformance.mockResolvedValue(detail());
  });

  afterEach(() => {
    // @ts-expect-error jsdom provides no matchMedia; restore that state.
    delete window.matchMedia;
    vi.unstubAllGlobals();
    vi.useRealTimers();
  });

  it("shows nothing when there is neither a current nor a next performance", async () => {
    vi.setSystemTime(START * 1000);
    loadNextPerformances.mockResolvedValue({
      current: null,
      next: null,
      hash: "h",
    });

    await renderCard();

    expect(loadNextPerformances).toHaveBeenCalledWith(5, undefined);
    expect(screen.queryByTestId("next-performance-card")).toBeNull();
  });

  it("shows nothing when loading fails", async () => {
    vi.setSystemTime(START * 1000);
    loadNextPerformances.mockResolvedValue(new Error("offline"));

    await renderCard();

    expect(screen.queryByTestId("next-performance-card")).toBeNull();
  });

  it("retries a failed load when the browser comes back online", async () => {
    vi.setSystemTime(START * 1000);
    loadNextPerformances.mockResolvedValueOnce(new Error("offline"));

    await renderCard();

    expect(screen.queryByTestId("next-performance-card")).toBeNull();
    expect(loadNextPerformances).toHaveBeenCalledTimes(1);

    await act(async () => {
      window.dispatchEvent(new Event("online"));
    });
    await flush();

    expect(loadNextPerformances).toHaveBeenCalledTimes(2);
    expect(screen.getByTestId("next-performance-card")).toBeInTheDocument();
  });

  it("retries a failed load once after the delay, and not again", async () => {
    vi.setSystemTime(START * 1000);
    loadNextPerformances.mockResolvedValue(new Error("offline"));

    await renderCard();
    expect(loadNextPerformances).toHaveBeenCalledTimes(1);

    await flush(14_000);
    expect(loadNextPerformances).toHaveBeenCalledTimes(1);

    await flush(1_000);
    expect(loadNextPerformances).toHaveBeenCalledTimes(2);

    await flush(60_000);
    expect(loadNextPerformances).toHaveBeenCalledTimes(2);

    loadNextPerformances.mockImplementation(async () =>
      serverAnswer([FIRST, SECOND])
    );
    await act(async () => {
      window.dispatchEvent(new Event("online"));
    });
    await flush();

    expect(screen.getByTestId("next-performance-card")).toBeInTheDocument();
  });

  it("stops retrying when unmounted", async () => {
    vi.setSystemTime(START * 1000);
    loadNextPerformances.mockResolvedValueOnce(new Error("offline"));

    const { unmount } = await renderCard();

    unmount();
    await act(async () => {
      window.dispatchEvent(new Event("online"));
    });
    await flush(60_000);

    expect(loadNextPerformances).toHaveBeenCalledTimes(1);
  });

  it("counts down to the next performance with admission, casts and links", async () => {
    vi.setSystemTime((START - 2 * DAY - 3 * 3_600 - 4 * 60 - 5) * 1000);

    await renderCard();

    expect(card()).toHaveAttribute("data-phase", "before");
    expect(screen.getByTestId("next-performance-status")).toHaveTextContent(
      "Nächste Vorstellung"
    );
    expect(screen.getByRole("heading", { level: 2 })).toHaveTextContent(
      "Abendvorstellung"
    );
    expect(card()).toHaveTextContent("Premiere");
    expect(card()).toHaveTextContent(/Donnerstag, 01\.10\.2026 - 19:30\sUhr/);
    expect(screen.getByTestId("next-performance-admission")).toHaveTextContent(
      /^Einlass ins Foyer ab\s18:30\sUhr · Saal ab\s19:00\sUhr$/
    );
    expect(card()).toHaveTextContent("Cast A");
    expect(unit("days")).toBe("02");
    expect(unit("hours")).toBe("03");
    expect(unit("minutes")).toBe("04");
    expect(unit("seconds")).toBe("05");
    expect(screen.getByTestId("countdown-large")).toBeInTheDocument();
    expect(screen.getByTestId("next-performance-link")).toHaveAttribute(
      "href",
      "/projekte/annie/vorstellungen/11"
    );
    expect(screen.getByTestId("next-performance-link")).toHaveTextContent(
      "Infos zur Vorstellung"
    );
    expect(screen.getByTestId("next-performance-tickets")).toHaveAttribute(
      "href",
      "https://tickets.example/11"
    );
    expect(screen.queryByTestId("filmstrip")).toBeNull();
    expect(loadPerformance).not.toHaveBeenCalled();

    await flush(1000);

    expect(unit("seconds")).toBe("04");
  });

  it("keeps date, admission and casts together in reading order, so small screens can put date and casts in one line", async () => {
    vi.setSystemTime((START - DAY) * 1000);

    await renderCard();

    const meta = screen.getByTestId("next-performance-meta");
    const parts = Array.from(meta.children).map(
      (child) => child.textContent ?? ""
    );

    expect(parts).toHaveLength(3);
    expect(parts[0]).toMatch(/Donnerstag, 01\.10\.2026 - 19:30\sUhr/);
    expect(parts[1]).toMatch(
      /^Einlass ins Foyer ab\s18:30\sUhr · Saal ab\s19:00\sUhr$/
    );
    expect(parts[2]).toBe("Cast A");
  });

  it("goes from foyer to hall to running to the next date without reloading the page", async () => {
    vi.setSystemTime((START - 45 * 60) * 1000);

    await renderCard();

    expect(card()).toHaveAttribute("data-phase", "foyer");
    expect(screen.getByTestId("next-performance-status")).toHaveTextContent(
      /^Einlass ins Foyer$/
    );
    expect(screen.getByTestId("next-performance-admission")).toHaveTextContent(
      /^Saal ab\s19:00\sUhr$/
    );
    expect(screen.getByTestId("countdown-small")).toHaveAccessibleName(
      "Beginn in 0 Stunden 45 Minuten"
    );
    expect(screen.getAllByTestId("filmstrip-tile").length).toBeGreaterThan(0);
    expect(loadPerformance).toHaveBeenCalledWith(11);
    expect(loadNextPerformances).toHaveBeenCalledTimes(1);

    // One second before the hall opens nothing changes yet.
    vi.setSystemTime((START - 30 * 60 - 2) * 1000);
    await flush(1000);

    expect(card()).toHaveAttribute("data-phase", "foyer");
    expect(loadNextPerformances).toHaveBeenCalledTimes(1);

    await flush(1000);

    expect(card()).toHaveAttribute("data-phase", "hall");
    expect(screen.getByTestId("next-performance-status")).toHaveTextContent(
      /^Einlass in den Saal$/
    );
    expect(screen.queryByTestId("next-performance-admission")).toBeNull();
    expect(screen.getByTestId("countdown-small")).toBeInTheDocument();
    expect(unit("minutes")).toBe("30");
    expect(within(card()).getByTestId("filmstrip")).toBeInTheDocument();
    expect(screen.getByTestId("next-performance-tickets")).toBeInTheDocument();
    expect(loadNextPerformances).toHaveBeenCalledTimes(2);

    // The clock keeps ticking without further requests while the phase stays.
    await flush(5000);
    expect(loadNextPerformances).toHaveBeenCalledTimes(2);

    vi.setSystemTime((START - 2) * 1000);
    await flush(1000);

    expect(card()).toHaveAttribute("data-phase", "hall");
    expect(loadNextPerformances).toHaveBeenCalledTimes(2);

    await flush(1000);

    expect(card()).toHaveAttribute("data-phase", "running");
    expect(screen.getByTestId("next-performance-status")).toHaveTextContent(
      "Die Vorstellung läuft gerade"
    );
    expect(screen.queryByTestId("next-performance-admission")).toBeNull();
    expect(screen.queryByTestId("next-performance-tickets")).toBeNull();
    expect(within(card()).getByTestId("filmstrip")).toBeInTheDocument();
    // The small countdown now points to the following performance.
    expect(screen.getByTestId("countdown-small")).toHaveAccessibleName(
      "Nächste Vorstellung in 1 Tag 0 Stunden 0 Minuten"
    );
    expect(unit("days")).toBe("01");
    expect(unit("hours")).toBe("00");
    expect(loadNextPerformances).toHaveBeenCalledTimes(3);
    expect(loadNextPerformances).toHaveBeenLastCalledWith(5, "11-12");

    await flush(5000);
    expect(loadNextPerformances).toHaveBeenCalledTimes(3);

    vi.setSystemTime((START + 9_000 - 1) * 1000);
    await flush(1000);

    expect(card()).toHaveAttribute("data-phase", "before");
    expect(screen.getByRole("heading", { level: 2 })).toHaveTextContent(
      "Nachmittagsvorstellung"
    );
    expect(screen.getByTestId("countdown-large")).toBeInTheDocument();
    expect(screen.queryByTestId("next-performance-admission")).toBeNull();
    expect(screen.queryByTestId("next-performance-tickets")).toBeNull();
    expect(screen.queryByTestId("filmstrip")).toBeNull();
    expect(screen.getByTestId("next-performance-link")).toHaveAttribute(
      "href",
      "/projekte/annie/vorstellungen/12"
    );
    expect(loadNextPerformances).toHaveBeenCalledTimes(4);
  });

  it("reloads once per phase when the server answers an unchanged hash with 204", async () => {
    loadNextPerformances.mockImplementation(
      async (_projectId: number, hash?: string) => {
        const answer = serverAnswer([FIRST, SECOND]);

        return hash === answer.hash ? true : answer;
      }
    );
    vi.setSystemTime((START - 30 * 60 - 1) * 1000);

    await renderCard();

    expect(card()).toHaveAttribute("data-phase", "foyer");
    expect(loadNextPerformances).toHaveBeenCalledTimes(1);

    await flush(1000);

    expect(card()).toHaveAttribute("data-phase", "hall");
    expect(loadNextPerformances).toHaveBeenCalledTimes(2);
    expect(loadNextPerformances).toHaveBeenLastCalledWith(5, "11-12");

    await flush(10_000);

    expect(card()).toHaveAttribute("data-phase", "hall");
    expect(loadNextPerformances).toHaveBeenCalledTimes(2);
  });

  it("shows one admission when foyer and hall open at the same time", async () => {
    loadNextPerformances.mockImplementation(async () =>
      serverAnswer([
        item({ admission_minutes: 30, hall_admission_minutes: 30 }),
      ])
    );
    vi.setSystemTime((START - 30 * 60 - 1) * 1000);

    await renderCard();

    expect(card()).toHaveAttribute("data-phase", "before");
    expect(screen.getByTestId("next-performance-admission")).toHaveTextContent(
      /^Einlass ab\s19:00\sUhr$/
    );

    await flush(1000);

    expect(card()).toHaveAttribute("data-phase", "admission");
    expect(screen.getByTestId("next-performance-status")).toHaveTextContent(
      /^Einlass läuft$/
    );
    expect(screen.queryByTestId("next-performance-admission")).toBeNull();
    expect(screen.getByTestId("countdown-small")).toBeInTheDocument();
    expect(within(card()).getByTestId("filmstrip")).toBeInTheDocument();
    expect(loadNextPerformances).toHaveBeenCalledTimes(2);

    vi.setSystemTime((START - 1) * 1000);
    await flush(1000);

    expect(card()).toHaveAttribute("data-phase", "running");
    expect(loadNextPerformances).toHaveBeenCalledTimes(3);
  });

  it.each([
    ["only the foyer is set", { hall_admission_minutes: null }, 60, "18:30"],
    ["only the hall is set", { admission_minutes: null }, 30, "19:00"],
    [
      "the hall is 0 and the foyer 60",
      { admission_minutes: 60, hall_admission_minutes: 0 },
      60,
      "18:30",
    ],
    [
      "the foyer is 0 and the hall 30",
      { admission_minutes: 0, hall_admission_minutes: 30 },
      30,
      "19:00",
    ],
    [
      "the hall opens earlier than the foyer",
      { admission_minutes: 30, hall_admission_minutes: 45 },
      45,
      "18:45",
    ],
  ] as const)(
    "shows one neutral admission when %s",
    async (_case, fields, minutes, time) => {
      loadNextPerformances.mockImplementation(async () =>
        serverAnswer([item(fields)])
      );
      vi.setSystemTime((START - minutes * 60 - 1) * 1000);

      await renderCard();

      expect(card()).toHaveAttribute("data-phase", "before");
      expect(
        screen.getByTestId("next-performance-admission")
      ).toHaveTextContent(new RegExp(`^Einlass ab\\s${time}\\sUhr$`));
      expect(screen.queryByTestId("filmstrip")).toBeNull();

      await flush(1000);

      expect(card()).toHaveAttribute("data-phase", "admission");
      expect(screen.getByTestId("next-performance-status")).toHaveTextContent(
        /^Einlass läuft$/
      );
      expect(screen.queryByTestId("next-performance-admission")).toBeNull();
      expect(screen.getByTestId("countdown-small")).toBeInTheDocument();
      expect(within(card()).getByTestId("filmstrip")).toBeInTheDocument();
    }
  );

  it("skips the admission phase without an admission time", async () => {
    loadNextPerformances.mockImplementation(async () => serverAnswer([SECOND]));
    vi.setSystemTime((SECOND.timestamp - 60) * 1000);

    await renderCard();

    expect(card()).toHaveAttribute("data-phase", "before");
    expect(screen.queryByTestId("next-performance-admission")).toBeNull();

    vi.setSystemTime((SECOND.timestamp - 1) * 1000);
    await flush(1000);

    expect(card()).toHaveAttribute("data-phase", "running");
  });

  it("hides the card when the performance is over and nothing follows", async () => {
    loadNextPerformances.mockImplementation(async () => serverAnswer([FIRST]));
    vi.setSystemTime((START + 9_000 - 2) * 1000);

    await renderCard();

    expect(card()).toHaveAttribute("data-phase", "running");
    expect(screen.queryByTestId("countdown-small")).toBeNull();

    await flush(2000);

    expect(screen.queryByTestId("next-performance-card")).toBeNull();
    expect(loadNextPerformances).toHaveBeenCalledTimes(2);
  });

  describe("on the home page (30 days ahead, all projects)", () => {
    const showIn = async (days: number): Promise<void> => {
      vi.setSystemTime((START - days * DAY) * 1000);
      await renderCard({ showProject: true, maxDaysAhead: 30 });
    };

    it("shows the card for a performance 29 days ahead, with the project", async () => {
      await showIn(29);

      expect(loadNextPerformances).toHaveBeenCalledWith(undefined, undefined);
      expect(unit("days")).toBe("29");
      expect(screen.getByRole("link", { name: "Annie" })).toHaveAttribute(
        "href",
        "/projekte/annie/"
      );
    });

    it("shows the card for a performance exactly 30 days ahead", async () => {
      await showIn(30);

      expect(unit("days")).toBe("30");
    });

    it("shows no card for a performance 31 days ahead", async () => {
      await showIn(31);

      expect(screen.queryByTestId("next-performance-card")).toBeNull();
    });
  });

  it("runs the filmstrip as a band with a hidden copy that closes the loop", async () => {
    vi.setSystemTime(START * 1000);

    await renderCard();

    const filmstrip = screen.getByTestId("filmstrip");

    expect(filmstrip).toHaveClass("is-running");
    expect(filmstrip).not.toHaveClass("is-static");
    // Two people repeated to 8 slots, twice.
    expect(within(filmstrip).getAllByTestId("filmstrip-tile")).toHaveLength(16);
    // Each person is reachable once; everything else is hidden from assistive technology.
    expect(
      within(filmstrip)
        .getAllByRole("button")
        .map((tile) => tile.textContent)
    ).toEqual(["Anna AAnnie", "Berta BAnnie"]);
  });

  it("shows the cast as a static grid with reduced motion", async () => {
    setReducedMotion(true);
    vi.setSystemTime(START * 1000);

    await renderCard();

    const filmstrip = screen.getByTestId("filmstrip");

    expect(filmstrip).toHaveClass("is-static");
    expect(filmstrip).not.toHaveClass("is-running");
    expect(within(filmstrip).getAllByTestId("filmstrip-tile")).toHaveLength(2);
  });

  it("pauses the band while the card is off screen", async () => {
    let report: ((entries: { isIntersecting: boolean }[]) => void) | undefined;
    vi.stubGlobal(
      "IntersectionObserver",
      class {
        constructor(callback: typeof report) {
          report = callback;
        }

        observe(): void {}

        disconnect(): void {}
      }
    );
    vi.setSystemTime(START * 1000);

    await renderCard();

    expect(screen.getByTestId("filmstrip")).not.toHaveClass("is-paused");
    expect(report).toBeDefined();

    act(() => report?.([{ isIntersecting: false }]));

    expect(screen.getByTestId("filmstrip")).toHaveClass("is-paused");

    act(() => report?.([{ isIntersecting: true }]));

    expect(screen.getByTestId("filmstrip")).not.toHaveClass("is-paused");
  });

  it("shows name and role of a tapped portrait and pauses the band", async () => {
    vi.setSystemTime(START * 1000);

    await renderCard();

    const [anna] = within(screen.getByTestId("filmstrip")).getAllByRole(
      "button"
    );

    act(() => anna.click());

    expect(anna).toHaveAttribute("aria-pressed", "true");
    expect(anna).toHaveClass("is-active");
    expect(screen.getByTestId("filmstrip")).toHaveClass("is-paused");
  });

  it("does not repaint the band while the clock ticks", async () => {
    vi.setSystemTime(START * 1000);

    await renderCard();

    const rendered = portraitRenders.count;

    expect(rendered).toBeGreaterThan(0);

    await flush(5000);

    expect(unit("seconds")).not.toBe("");
    expect(portraitRenders.count).toBe(rendered);
  });

  describe("keyboard use of the filmstrip", () => {
    const runningWithCast = async (): Promise<HTMLElement[]> => {
      vi.setSystemTime(START * 1000);
      await renderCard();

      return within(screen.getByTestId("filmstrip")).getAllByRole("button");
    };

    it("is a single tab stop in front of the actions", async () => {
      const [anna, berta] = await runningWithCast();

      expect(tabbable(card())).toEqual([
        anna,
        screen.getByTestId("next-performance-link"),
      ]);
      expect(berta).toHaveAttribute("tabindex", "-1");
    });

    it("keeps the tab stop in the static grid too", async () => {
      setReducedMotion(true);
      const [anna] = await runningWithCast();

      expect(tabbable(card())).toEqual([
        anna,
        screen.getByTestId("next-performance-link"),
      ]);
    });

    it("moves between the tiles with the arrow keys, Home and End", async () => {
      const [anna, berta] = await runningWithCast();
      const filmstrip = screen.getByTestId("filmstrip");

      act(() => anna.focus());
      expect(anna).toHaveFocus();

      fireEvent.keyDown(anna, { key: "ArrowRight" });
      expect(berta).toHaveFocus();
      expect(berta).toHaveAttribute("tabindex", "0");
      expect(anna).toHaveAttribute("tabindex", "-1");

      fireEvent.keyDown(berta, { key: "ArrowRight" });
      expect(berta).toHaveFocus();

      fireEvent.keyDown(berta, { key: "ArrowLeft" });
      expect(anna).toHaveFocus();

      fireEvent.keyDown(anna, { key: "End" });
      expect(berta).toHaveFocus();

      fireEvent.keyDown(berta, { key: "Home" });
      expect(anna).toHaveFocus();

      // The last focused tile stays the tab stop when the strip is entered again.
      fireEvent.keyDown(anna, { key: "ArrowRight" });
      act(() => berta.blur());
      expect(tabbable(filmstrip)).toEqual([berta]);
    });

    it("shows name and role of the focused tile and pauses the band until focus leaves", async () => {
      const [anna, berta] = await runningWithCast();
      const filmstrip = screen.getByTestId("filmstrip");

      act(() => anna.focus());
      fireEvent.keyDown(anna, { key: "ArrowRight" });

      expect(berta).toHaveClass("is-focused");
      expect(anna).not.toHaveClass("is-focused");
      expect(filmstrip).toHaveClass("is-paused");

      act(() => berta.blur());

      expect(berta).not.toHaveClass("is-focused");
      expect(filmstrip).not.toHaveClass("is-paused");
    });

    it("shifts a focused tile that lies outside the strip into view and back when focus leaves", async () => {
      const [anna, berta] = await runningWithCast();
      const filmstrip = screen.getByTestId("filmstrip");
      const track = filmstrip.querySelector<HTMLElement>(".filmstrip-track");

      // The strip is 300 px wide and the tiles 112 px; the second tile starts at 400 px, right of the strip.
      vi.spyOn(HTMLElement.prototype, "clientWidth", "get").mockReturnValue(
        300
      );
      vi.spyOn(HTMLElement.prototype, "offsetWidth", "get").mockReturnValue(
        112
      );
      vi.spyOn(HTMLElement.prototype, "offsetLeft", "get").mockImplementation(
        function (this: HTMLElement) {
          return this.contains(berta) && this !== filmstrip ? 400 : 10;
        }
      );

      act(() => anna.focus());
      expect(track?.style.transform).toBe("translateX(0px)");

      fireEvent.keyDown(anna, { key: "ArrowRight" });
      expect(berta).toHaveFocus();
      expect(filmstrip).toHaveClass("is-browsing");
      expect(track?.style.transform).toBe("translateX(-212px)");

      act(() => berta.blur());
      expect(filmstrip).not.toHaveClass("is-browsing");
      expect(track?.style.transform).toBe("");

      vi.restoreAllMocks();
    });

    it("continues the band where the keyboard left it instead of starting over", async () => {
      const [anna, berta] = await runningWithCast();
      const filmstrip = screen.getByTestId("filmstrip");
      const track = filmstrip.querySelector<HTMLElement>(".filmstrip-track");

      // Band of 800 px (one copy 400 px), strip 300 px, tiles 112 px; the second tile starts at 400 px.
      vi.spyOn(HTMLElement.prototype, "clientWidth", "get").mockReturnValue(
        300
      );
      vi.spyOn(HTMLElement.prototype, "offsetWidth", "get").mockImplementation(
        function (this: HTMLElement) {
          return this.classList.contains("filmstrip-track") ? 800 : 112;
        }
      );
      vi.spyOn(HTMLElement.prototype, "offsetLeft", "get").mockImplementation(
        function (this: HTMLElement) {
          return this.contains(berta) && this !== filmstrip ? 400 : 10;
        }
      );

      act(() => anna.focus());
      fireEvent.keyDown(anna, { key: "ArrowRight" });
      expect(track?.style.transform).toBe("translateX(-212px)");

      act(() => berta.blur());

      // 212 of 400 px into a cycle of 8 tiles x 3 s = 24 s.
      expect(parseFloat(track?.style.animationDelay ?? "")).toBeCloseTo(
        -(212 / 400) * 24,
        5
      );

      vi.restoreAllMocks();
    });
  });

  it("shows no admission time when both admissions are 0 minutes", async () => {
    loadNextPerformances.mockImplementation(async () =>
      serverAnswer([item({ admission_minutes: 0, hall_admission_minutes: 0 })])
    );
    vi.setSystemTime((START - 3_600) * 1000);

    await renderCard();

    expect(card()).toHaveAttribute("data-phase", "before");
    expect(screen.queryByTestId("next-performance-admission")).toBeNull();
  });

  it("checks for changed dates once when the tab becomes visible again", async () => {
    vi.setSystemTime((START - DAY) * 1000);

    await renderCard();

    expect(loadNextPerformances).toHaveBeenCalledTimes(1);

    const setVisibility = (state: "hidden" | "visible"): void => {
      Object.defineProperty(document, "visibilityState", {
        configurable: true,
        get: () => state,
      });
      document.dispatchEvent(new Event("visibilitychange"));
    };

    await act(async () => {
      setVisibility("hidden");
    });
    expect(loadNextPerformances).toHaveBeenCalledTimes(1);

    await act(async () => {
      setVisibility("visible");
    });

    expect(loadNextPerformances).toHaveBeenCalledTimes(2);
    expect(loadNextPerformances).toHaveBeenLastCalledWith(5, "undefined-11");

    // @ts-expect-error restores the jsdom default.
    delete document.visibilityState;
  });

  describe("releasing the band after a tap or click", () => {
    it("runs again after a press outside the strip", async () => {
      vi.setSystemTime(START * 1000);
      await renderCard();

      const filmstrip = screen.getByTestId("filmstrip");
      const [anna] = within(filmstrip).getAllByRole("button");

      act(() => anna.click());
      expect(filmstrip).toHaveClass("is-paused");

      fireEvent.pointerDown(document.body);

      expect(filmstrip).not.toHaveClass("is-paused");
      expect(anna).toHaveAttribute("aria-pressed", "false");
    });

    it("stays paused while the press lands inside the strip", async () => {
      vi.setSystemTime(START * 1000);
      await renderCard();

      const filmstrip = screen.getByTestId("filmstrip");
      const [anna] = within(filmstrip).getAllByRole("button");

      act(() => anna.click());
      fireEvent.pointerDown(filmstrip);

      expect(filmstrip).toHaveClass("is-paused");
    });

    it("runs again when a clicked portrait loses focus", async () => {
      vi.setSystemTime(START * 1000);
      await renderCard();

      const filmstrip = screen.getByTestId("filmstrip");
      const [anna] = within(filmstrip).getAllByRole("button");

      act(() => anna.focus());
      act(() => anna.click());
      expect(filmstrip).toHaveClass("is-paused");

      act(() => anna.blur());

      expect(filmstrip).not.toHaveClass("is-paused");
    });

    /** Presses a tile the way a mouse, trackpad or finger does: pointer down, focus, click. */
    const press = (tile: HTMLElement): void => {
      fireEvent.pointerDown(tile);
      act(() => tile.focus());
      act(() => tile.click());
    };

    it("runs again when the pressed tile is pressed again, although it keeps focus", async () => {
      vi.setSystemTime(START * 1000);
      await renderCard();

      const filmstrip = screen.getByTestId("filmstrip");
      const [anna] = within(filmstrip).getAllByRole("button");

      press(anna);
      expect(filmstrip).toHaveClass("is-paused");

      press(anna);

      expect(anna).toHaveFocus();
      expect(filmstrip).not.toHaveClass("is-paused");
    });

    it("does not start keyboard browsing when a tile gets focus from a press", async () => {
      vi.setSystemTime(START * 1000);
      await renderCard();

      const filmstrip = screen.getByTestId("filmstrip");
      const track = filmstrip.querySelector<HTMLElement>(".filmstrip-track");
      const [anna] = within(filmstrip).getAllByRole("button");

      press(anna);

      expect(filmstrip).not.toHaveClass("is-browsing");
      expect(anna).not.toHaveClass("is-focused");
      expect(track?.style.transform).toBe("");
    });

    it("browses with the keyboard after a press once a key is used", async () => {
      vi.setSystemTime(START * 1000);
      await renderCard();

      const filmstrip = screen.getByTestId("filmstrip");
      const [anna, berta] = within(filmstrip).getAllByRole("button");

      press(anna);
      fireEvent.keyDown(anna, { key: "ArrowRight" });

      expect(berta).toHaveFocus();
      expect(berta).toHaveClass("is-focused");
      expect(filmstrip).toHaveClass("is-browsing");
    });

    it("ends keyboard browsing on a press, so pressing the same tile twice runs the band again", async () => {
      vi.setSystemTime(START * 1000);
      await renderCard();

      const filmstrip = screen.getByTestId("filmstrip");
      const [anna] = within(filmstrip).getAllByRole("button");

      fireEvent.keyDown(document.body, { key: "Tab" });
      act(() => anna.focus());
      expect(anna).toHaveClass("is-focused");
      expect(filmstrip).toHaveClass("is-paused");

      press(anna);
      expect(anna).not.toHaveClass("is-focused");
      expect(filmstrip).not.toHaveClass("is-browsing");
      expect(filmstrip).toHaveClass("is-paused");

      press(anna);

      expect(anna).toHaveFocus();
      expect(filmstrip).not.toHaveClass("is-paused");
    });
  });

  describe("name and role on the portraits", () => {
    it("are shown without hover or focus", async () => {
      vi.setSystemTime(START * 1000);
      await renderCard();

      const [anna] = within(screen.getByTestId("filmstrip")).getAllByRole(
        "button"
      );
      const caption = anna.querySelector<HTMLElement>(".filmstrip-caption");

      expect(caption).toHaveTextContent("Anna A");
      expect(caption).toHaveTextContent("Annie");
      expect(getComputedStyle(caption as HTMLElement).opacity).not.toBe("0");
    });

    it("show long names in full and break them where the name allows it", async () => {
      const performance = detail();
      // Cast: only the portrait fields used by the filmstrip are set.
      (
        performance.roles.portraits as unknown as Record<
          number,
          Record<string, string | number>
        >
      )[1] = {
        id: 1,
        name: "a",
        title: "Maximiliane Musterfrau-Beispielhausen",
        title_separable: "Maximiliane Musterfrau-Beispiel_hausen",
      };
      loadPerformance.mockResolvedValue(performance);
      vi.setSystemTime(START * 1000);
      await renderCard();

      const [maximiliane] = within(
        screen.getByTestId("filmstrip")
      ).getAllByRole("button");
      const name = maximiliane.querySelector<HTMLElement>(".filmstrip-name");
      const role = maximiliane.querySelector<HTMLElement>(".filmstrip-role");

      expect(name?.textContent).toBe("Maximiliane Musterfrau-Beispiel­hausen");

      for (const line of [name, role]) {
        const style = getComputedStyle(line as HTMLElement);

        expect(style.whiteSpace).not.toBe("nowrap");
        expect(style.textOverflow).not.toBe("ellipsis");
      }
    });
  });

  describe("heading of the card", () => {
    const withTitles = (title: string | null, eventTitle: string): void => {
      const performance = item({
        title: title as string,
        event: { id: 9, title: eventTitle },
      });

      loadNextPerformances.mockImplementation(async () =>
        serverAnswer([performance])
      );
    };

    it("puts category and title in one line as the title of the project page card", async () => {
      vi.setSystemTime((START - DAY) * 1000);
      await renderCard();

      expect(screen.getByRole("heading", { level: 2 })).toHaveTextContent(
        /^Premiere · Abendvorstellung$/
      );
      expect(card().querySelector(".event-label")).toBeNull();
    });

    it("leads with the project and puts the line below it on the home page", async () => {
      vi.setSystemTime((START - DAY) * 1000);
      await renderCard({ showProject: true });

      const heading = screen.getByRole("heading", { level: 2 });

      expect(heading).toHaveTextContent(/^Annie$/);
      expect(within(heading).getByRole("link")).toHaveAttribute(
        "href",
        "/projekte/annie/"
      );
      expect(card().querySelector(".card-subtitle")).toHaveTextContent(
        /^Premiere · Abendvorstellung$/
      );
    });

    it("shows only the category when the title is missing", async () => {
      withTitles("", "Premiere");
      vi.setSystemTime((START - DAY) * 1000);
      await renderCard();

      expect(screen.getByRole("heading", { level: 2 })).toHaveTextContent(
        /^Premiere$/
      );
    });

    it("shows only the title when the category is missing", async () => {
      withTitles("Abendvorstellung", "");
      vi.setSystemTime((START - DAY) * 1000);
      await renderCard();

      expect(screen.getByRole("heading", { level: 2 })).toHaveTextContent(
        /^Abendvorstellung$/
      );
    });

    it("keeps the date at most as large as the line below the project on small screens", () => {
      // Cast: the sx object is only read here as a plain tree of selectors.
      const styles = nextPerformanceCardStyles(mfTheme) as unknown as Record<
        string,
        Record<string, Record<string, unknown>>
      >;
      const small = mfTheme.breakpoints.down("sm");

      expect(styles[".card-info"][".card-subtitle"][small]).toEqual({
        fontSize: "1rem",
      });
      expect(styles[".card-info"][".card-date"][small]).toEqual({
        fontSize: "1rem",
        fontWeight: 400,
      });
    });

    it("shows a name that is both category and title once", async () => {
      withTitles("premiere", "Premiere");
      vi.setSystemTime((START - DAY) * 1000);
      await renderCard();

      expect(screen.getByRole("heading", { level: 2 })).toHaveTextContent(
        /^Premiere$/
      );
    });
  });

  describe("colour and width on the home page", () => {
    const setProjectColor = (): void => {
      // Cast: the card reads only `theme_vars` of the project.
      useGlobalStore.setState({
        projects: {
          5: {
            id: 5,
            theme_vars: [
              { name: "main", value: "#123456" },
              { name: "500", value: "#123456" },
            ],
          },
        },
      } as unknown as Partial<ReturnType<typeof useGlobalStore.getState>>);
    };

    it("wears the colour of the project of the performance", async () => {
      setProjectColor();
      vi.setSystemTime((START - DAY) * 1000);

      await renderCard({ showProject: true, centered: true });

      expect(
        getComputedStyle(card()).getPropertyValue(
          "--mf-palette-projectPrimary-main"
        )
      ).toBe("#123456");
    });

    it("keeps the usual look without a project colour", async () => {
      vi.setSystemTime((START - DAY) * 1000);

      await renderCard({ showProject: true, centered: true });

      expect(
        getComputedStyle(card()).getPropertyValue(
          "--mf-palette-projectPrimary-main"
        )
      ).not.toBe("#123456");
    });

    it("leaves the colour to the project page on the project page itself", async () => {
      setProjectColor();
      vi.setSystemTime((START - DAY) * 1000);

      await renderCard({ projectId: 5 });

      expect(
        getComputedStyle(card()).getPropertyValue(
          "--mf-palette-projectPrimary-main"
        )
      ).not.toBe("#123456");
    });

    it("is at most 800 px wide when centered", async () => {
      vi.setSystemTime((START - DAY) * 1000);

      await renderCard({ showProject: true, centered: true });

      expect(getComputedStyle(card()).maxWidth).toBe("800px");
    });
  });
});

describe("NextPerformanceCard as a strip", () => {
  beforeEach(() => {
    vi.useFakeTimers();
    setReducedMotion(false);
    useGlobalStore.setState({ projects: {} });
    loadNextPerformances.mockImplementation(async () =>
      serverAnswer([FIRST, SECOND])
    );
    loadPerformance.mockResolvedValue(detail());
  });

  afterEach(() => {
    // @ts-expect-error jsdom provides no matchMedia; restore that state.
    delete window.matchMedia;
    vi.unstubAllGlobals();
    vi.useRealTimers();
  });

  it("puts the actions before the filmstrip, so they sit beside the info and the tab order follows", async () => {
    vi.setSystemTime(START * 1000);
    await renderCard({ projectId: 5, strip: true });

    const [anna] = within(screen.getByTestId("filmstrip")).getAllByRole(
      "button"
    );

    expect(tabbable(card())).toEqual([
      screen.getByTestId("next-performance-link"),
      anna,
    ]);
  });

  it("marks the card as a strip only when asked to", async () => {
    vi.setSystemTime((START - DAY) * 1000);
    const { unmount } = await renderCard({ showProject: true, strip: true });

    expect(card()).toHaveClass("is-strip");
    unmount();

    await renderCard({ showProject: true });

    expect(card()).not.toHaveClass("is-strip");
  });

  it("puts the info beside countdown and actions on medium screens, with status and filmstrip across", () => {
    // Cast: the sx object is only read here as a plain tree of selectors.
    const styles = nextPerformanceCardStyles(mfTheme) as unknown as Record<
      string,
      Record<string, Record<string, Record<string, unknown>>>
    >;
    const strip = styles["&.is-strip"][mfTheme.breakpoints.up("md")];

    expect(strip).toMatchObject({
      display: "grid",
      gridTemplateColumns: "minmax(0, 1fr) auto",
    });
    expect(strip[".card-body"]).toMatchObject({ display: "contents" });
    expect(strip[".card-status"]).toMatchObject({ gridColumn: "1 / -1" });
    expect(strip[".filmstrip"]).toMatchObject({ gridColumn: "1 / -1" });
    expect(strip[".card-info"]).toMatchObject({ gridRow: "2 / span 2" });
    expect(strip[".countdown"]).toMatchObject({ gridColumn: "2" });
    expect(strip[".card-actions"]).toMatchObject({ gridColumn: "2" });
  });

  it("puts info, countdown and actions in one row on large screens", () => {
    // Cast: the sx object is only read here as a plain tree of selectors.
    const styles = nextPerformanceCardStyles(mfTheme) as unknown as Record<
      string,
      Record<string, Record<string, Record<string, unknown>>>
    >;
    const strip = styles["&.is-strip"][mfTheme.breakpoints.up("lg")];

    expect(strip).toMatchObject({
      gridTemplateColumns: "minmax(0, 1fr) auto auto",
    });
    expect(strip[".card-info"]).toMatchObject({ gridRow: "auto" });
    expect(strip[".countdown"]).toMatchObject({ gridColumn: "auto" });
    expect(strip[".card-actions"]).toMatchObject({
      gridColumn: "3",
      flexDirection: "column",
    });
  });
});
