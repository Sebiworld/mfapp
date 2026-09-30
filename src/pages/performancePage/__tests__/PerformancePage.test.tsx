import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import userEvent from "@testing-library/user-event";
import { render, screen, waitFor, within } from "@testing-library/react";
import { createMemoryRouter, RouterProvider } from "react-router";
import { THEME_ID, ThemeProvider } from "@mui/material/styles";
import { mfTheme } from "@styles/theme/mfTheme";
import { PerformanceDetailDto } from "@models/utility-types/performance-detail-dto.model";
import { ProjectRoleDto } from "@models/project-role/project-role-dto.model";
import { useGlobalStore } from "@src/store/global.store";
import { projectRolesStoreActions } from "@src/store/projectRoles/projectRoles.actions";
import { PerformancePage } from "../PerformancePage";
import "@utils/i18n/i18n";

// Runs before the imports so all date formatters are created under a non-Berlin process zone.
vi.hoisted(() => {
  vi.stubEnv("TZ", "America/Los_Angeles");
});

const loadPerformance = vi.fn();
vi.mock("@api/hooks/usePerformancesApi", () => ({
  usePerformancesApi: () => ({ loadPerformance }),
}));
vi.mock("@src/context/appContext/useAppContext", () => ({
  useAppContext: () => ({}),
}));
vi.mock("@pages/page/Page", () => ({
  Page: () => <div data-testid="generic-page" />,
}));

// 2026-10-10T17:30:00Z = 19:30 in Berlin (CEST)
const START = Date.UTC(2026, 9, 10, 17, 30, 0) / 1000;
const END = START + 9000;

// Cast: the page reads only the fields set here.
const role = (
  fields: Partial<ProjectRoleDto> & { id: number }
): ProjectRoleDto =>
  ({
    name: `r${fields.id}`,
    url: `/r/${fields.id}/`,
    title: `Role ${fields.id}`,
    template: { id: 1, name: "project_role", label: "Rolle" },
    participants: [],
    child_ids: [],
    ...fields,
  }) as ProjectRoleDto;

const portrait = (id: number, title: string) => ({
  id,
  name: `p${id}`,
  title,
  title_separable: title,
});

const performance = (
  fields: Partial<PerformanceDetailDto> = {}
): PerformanceDetailDto => ({
  id: 7,
  title: "Abendvorstellung",
  timestamp: START,
  timestamp_until: END,
  admission_minutes: 60,
  ticket_url: "https://tickets.example/7",
  description: null,
  visitor_info: null,
  event: { id: 3, title: "Premiere" },
  project: { id: 1, title: "Annie", url: "/projekte/annie/" },
  seasons: [],
  casts: [
    { id: 100, title: "Cast A" },
    { id: 101, title: "Cast B" },
  ],
  categories: [],
  location: {
    id: 5,
    title: "Stadthalle",
    address: "<strong>Stadthalle</strong><br />Hauptstraße 1",
    lat: null,
    lng: null,
    directions: null,
    accessibility_info: null,
  },
  roles: {
    roles: [] as unknown as PerformanceDetailDto["roles"]["roles"],
    seasons: [] as unknown as PerformanceDetailDto["roles"]["seasons"],
    casts: [] as unknown as PerformanceDetailDto["roles"]["casts"],
    portraits: [] as unknown as PerformanceDetailDto["roles"]["portraits"],
    child_ids: [],
  },
  hash: "h",
  ...fields,
});

const withDirections = (
  fields: Partial<NonNullable<PerformanceDetailDto["location"]>> = {}
): NonNullable<PerformanceDetailDto["location"]> => ({
  id: 5,
  title: "Stadthalle",
  address: "Hauptstraße 1",
  lat: null,
  lng: null,
  directions: "<h3>Parken</h3><ul><li>Am Sandberg</li></ul>",
  accessibility_info: null,
  ...fields,
});

const rolesFor = (list: ProjectRoleDto[]): PerformanceDetailDto["roles"] => ({
  roles: Object.fromEntries([
    [
      1,
      role({
        id: 1,
        template: { id: 2, name: "project_roles_container", label: "C" },
        participants: undefined,
        child_ids: [10],
      }),
    ],
    [10, role({ id: 10, title: "Group", child_ids: list.map((r) => r.id) })],
    ...list.map((r) => [r.id, r]),
  ]),
  seasons: [] as unknown as PerformanceDetailDto["roles"]["seasons"],
  casts: {
    100: { id: 100, name: "m", title: "Cast A", url: "" },
    101: { id: 101, name: "c", title: "Cast B", url: "" },
  },
  portraits: {
    1: portrait(1, "Anna A"),
    2: portrait(2, "Berta B"),
    3: portrait(3, "Clara C"),
  },
  child_ids: [],
});

const renderPage = (path = "/projekte/annie/auffuehrungen/7") => {
  const router = createMemoryRouter(
    [
      {
        path: "projekte/:projectName/auffuehrungen/:performanceId",
        element: (
          <ThemeProvider
            theme={{ [THEME_ID]: mfTheme }}
            noSsr
            defaultMode="light"
          >
            <PerformancePage />
          </ThemeProvider>
        ),
      },
    ],
    { initialEntries: [path] }
  );

  return render(<RouterProvider router={router} />);
};

const show = async (data: PerformanceDetailDto | Error) => {
  loadPerformance.mockResolvedValue(data);
  renderPage();
  if (data instanceof Error) {
    await screen.findByText("Seite nicht gefunden (404)");
  } else {
    await screen.findByTestId("performance-content");
  }
};

const showWithContainer = async (data: PerformanceDetailDto) => {
  await show(data);

  return { container: document.body };
};

const nowAt = (seconds: number, offsetMs = 0): void => {
  vi.setSystemTime(seconds * 1000 + offsetMs);
};

describe("PerformancePage", () => {
  beforeEach(() => {
    vi.useFakeTimers({ toFake: ["Date"] });
    nowAt(START, -86_400_000);
    projectRolesStoreActions.resetSlice();
  });

  afterEach(() => {
    // @ts-expect-error jsdom provides no matchMedia; restore that state.
    delete window.matchMedia;
    vi.useRealTimers();
  });

  describe("upcoming performance", () => {
    it("shows title, Berlin start, casts, ticket button, admission and duration", async () => {
      await show(performance());

      expect(
        screen.getByRole("heading", { level: 1, name: "Abendvorstellung" })
      ).toBeInTheDocument();
      expect(screen.getByRole("link", { name: "Annie" })).toHaveAttribute(
        "href",
        "/projekte/annie/"
      );
      expect(
        screen.getByText(
          "Samstag, 10.10.2026 - 19:30 Uhr (Dauer ca. 2,5 Stunden)"
        )
      ).toBeInTheDocument();
      expect(screen.getByText("Cast A")).toBeInTheDocument();
      expect(screen.getByTestId("ticket-button")).toHaveAttribute(
        "href",
        "https://tickets.example/7"
      );

      const facts = screen.getByTestId("visit-facts");
      expect(within(facts).getByText("18:30 Uhr")).toBeInTheDocument();
      expect(within(facts).queryByText("Dauer")).not.toBeInTheDocument();
      expect(screen.queryByTestId("past-notice")).not.toBeInTheDocument();
    });

    it("shows Berlin times although the process runs in another time zone", async () => {
      // Proves the zone switch took effect.
      expect(new Date(START * 1000).getHours()).toBe(10);

      await show(performance());

      expect(
        screen.getByText(/^Samstag, 10\.10\.2026 - 19:30 Uhr/)
      ).toBeInTheDocument();
      expect(screen.getByText("18:30 Uhr")).toBeInTheDocument();
    });

    it("omits the ticket button without ticket_url", async () => {
      await show(performance({ ticket_url: null }));

      expect(screen.queryByTestId("ticket-button")).not.toBeInTheDocument();
    });
  });

  describe("without a start", () => {
    it("shows no date, admission or duration, keeps the ticket button and shows no notice", async () => {
      nowAt(END, 86_400_000);
      const { container } = await showWithContainer(
        performance({ timestamp: null })
      );

      expect(container.textContent).not.toContain("1970");
      expect(document.querySelector(".performance-date")).toBeNull();
      expect(screen.queryByTestId("visit-facts")).not.toBeInTheDocument();
      expect(screen.getByTestId("ticket-button")).toBeInTheDocument();
      expect(screen.queryByTestId("past-notice")).not.toBeInTheDocument();
    });

    it("shows no ticket button without ticket_url", async () => {
      await show(performance({ timestamp: null, ticket_url: null }));

      expect(screen.queryByTestId("ticket-button")).not.toBeInTheDocument();
    });
  });

  describe("past performance", () => {
    it("drops the ticket button at the start but shows no notice before the end", async () => {
      nowAt(START);
      await show(performance());

      expect(screen.queryByTestId("ticket-button")).not.toBeInTheDocument();
      expect(screen.queryByTestId("past-notice")).not.toBeInTheDocument();
    });

    it("keeps the ticket button one millisecond before the start", async () => {
      nowAt(START, -1);
      await show(performance());

      expect(screen.getByTestId("ticket-button")).toBeInTheDocument();
    });

    it("shows the notice exactly at the end", async () => {
      nowAt(END);
      await show(performance());

      expect(screen.getByTestId("past-notice")).toHaveTextContent(
        "Diese Aufführung hat bereits stattgefunden"
      );
      expect(screen.queryByTestId("ticket-button")).not.toBeInTheDocument();
    });

    it("shows no notice one millisecond before the end", async () => {
      nowAt(END, -1);
      await show(performance());

      expect(screen.queryByTestId("past-notice")).not.toBeInTheDocument();
    });

    it("uses the start as end when no end is known", async () => {
      nowAt(START);
      await show(performance({ timestamp_until: null }));

      expect(screen.getByTestId("past-notice")).toBeInTheDocument();
    });
  });

  describe("visit information", () => {
    it("leaves out every section without data", async () => {
      await show(
        performance({
          admission_minutes: null,
          timestamp_until: null,
          location: null,
        })
      );

      expect(screen.queryByTestId("performance-visit")).not.toBeInTheDocument();
      expect(screen.queryByText("Zum Besuch")).not.toBeInTheDocument();
      expect(document.body.textContent).not.toContain("null");
    });

    it("renders only the blocks that have data", async () => {
      await show(
        performance({
          admission_minutes: null,
          timestamp_until: null,
          visitor_info: "Bitte pünktlich sein.",
        })
      );

      expect(screen.getByTestId("visit-visitor-info")).toHaveTextContent(
        "Bitte pünktlich sein."
      );
      expect(screen.queryByText("Dauer")).not.toBeInTheDocument();
      expect(screen.queryByText("Einlass")).not.toBeInTheDocument();
      expect(screen.queryByText("Barrierefreiheit")).not.toBeInTheDocument();
      expect(screen.queryByText("Besonderes")).not.toBeInTheDocument();
    });

    it("shows accessibility and special notes as formatted text in the page", async () => {
      await show(
        performance({
          description: "<strong>Sonderhinweis</strong>",
          location: {
            id: 5,
            title: "Stadthalle",
            address: "Hauptstraße 1",
            lat: null,
            lng: null,
            directions: null,
            accessibility_info: "Aufzug vorhanden",
          },
        })
      );

      expect(screen.getByTestId("visit-accessibility")).toHaveTextContent(
        "Aufzug vorhanden"
      );
      expect(screen.getByText("Sonderhinweis").tagName).toBe("STRONG");
    });

    it("keeps directions out of the page flow", async () => {
      await show(performance({ location: withDirections() }));

      expect(screen.queryByTestId("visit-directions")).not.toBeInTheDocument();
      expect(screen.queryByText("Am Sandberg")).not.toBeInTheDocument();
    });
  });

  describe("directions button", () => {
    it("is missing without directions", async () => {
      await show(performance());

      expect(
        screen.queryByRole("button", { name: "Anfahrt und Parken" })
      ).not.toBeInTheDocument();
    });

    it("stands next to the ticket button, outlined instead of primary", async () => {
      await show(performance({ location: withDirections() }));

      const ticket = screen.getByTestId("ticket-button");
      const directions = screen.getByTestId("directions-button");

      expect(ticket.parentElement).toBe(directions.parentElement);
      expect(directions.className).toContain("MuiButton-outlined");
      expect(ticket.className).toContain("MuiButton-contained");
    });

    it("stands alone once tickets are closed", async () => {
      nowAt(START);
      await show(performance({ location: withDirections() }));

      expect(screen.queryByTestId("ticket-button")).not.toBeInTheDocument();
      expect(screen.getByTestId("directions-button")).toBeInTheDocument();
    });

    it("opens the formatted text and closes again", async () => {
      await show(performance({ location: withDirections() }));

      await userEvent.click(screen.getByTestId("directions-button"));

      const text = await screen.findByTestId("visit-directions");
      expect(
        within(text).getByRole("heading", { name: "Parken" })
      ).toBeInTheDocument();
      expect(within(text).getByText("Am Sandberg")).toBeInTheDocument();

      await userEvent.keyboard("{Escape}");
      await waitFor(() =>
        expect(screen.queryByTestId("visit-directions")).not.toBeInTheDocument()
      );
    });

    it("puts route planning into the opened content, only with coordinates", async () => {
      await show(
        performance({ location: withDirections({ lat: 51.84, lng: 8.29 }) })
      );

      expect(
        screen.queryByRole("link", { name: "Route planen" })
      ).not.toBeInTheDocument();

      await userEvent.click(screen.getByTestId("directions-button"));

      expect(
        await screen.findByRole("link", { name: "Route planen" })
      ).toHaveAttribute("href", expect.stringContaining("51.84,8.29"));
    });

    it("offers no route planning without coordinates", async () => {
      await show(performance({ location: withDirections() }));

      await userEvent.click(screen.getByTestId("directions-button"));
      await screen.findByTestId("visit-directions");

      expect(
        screen.queryByRole("link", { name: "Route planen" })
      ).not.toBeInTheDocument();
    });

    it("opens a dialog with a close button on narrow screens", async () => {
      // jsdom has no matchMedia; every query matches, so the narrow layout is used.
      window.matchMedia = ((query: string) => ({
        matches: true,
        media: query,
        addEventListener: vi.fn(),
        removeEventListener: vi.fn(),
        addListener: vi.fn(),
        removeListener: vi.fn(),
      })) as unknown as typeof window.matchMedia;
      await show(performance({ location: withDirections() }));

      await userEvent.click(screen.getByTestId("directions-button"));

      const dialog = await screen.findByRole("dialog");
      await userEvent.click(
        within(dialog).getByRole("button", { name: "Schließen" })
      );
      await waitFor(() =>
        expect(screen.queryByRole("dialog")).not.toBeInTheDocument()
      );
    });
  });

  describe("roles", () => {
    it("shows the portraits of the playing cast and hides empty roles", async () => {
      await show(
        performance({
          roles: rolesFor([
            role({
              id: 11,
              title: "Grace",
              participants: [{ portrait_ids: [1], cast_ids: [100] }],
            }),
            role({
              id: 12,
              title: "Empty Role",
              participants: [{ portrait_ids: [], cast_ids: [100] }],
            }),
          ]),
        })
      );

      const roles = screen.getByTestId("performance-roles");

      expect(within(roles).getByText("Grace")).toBeInTheDocument();
      expect(within(roles).getByText("Anna A")).toBeInTheDocument();
      expect(within(roles).queryByText("Empty Role")).not.toBeInTheDocument();
    });

    it("omits the whole section when no role has people", async () => {
      await show(
        performance({
          roles: rolesFor([
            role({
              id: 11,
              participants: [{ portrait_ids: [], cast_ids: [100] }],
            }),
          ]),
        })
      );

      expect(screen.queryByTestId("performance-roles")).not.toBeInTheDocument();
      expect(screen.queryByText("Darsteller")).not.toBeInTheDocument();
    });

    it("shows one tile per person with name and role name, each person once per role", async () => {
      await show(
        performance({
          roles: rolesFor([
            role({
              id: 11,
              title: "Annie",
              participants: [
                { portrait_ids: [1, 1], cast_ids: [100] },
                { portrait_ids: [1], cast_ids: [100] },
                { portrait_ids: [2], cast_ids: [101] },
                { portrait_ids: [3] },
              ],
            }),
            role({
              id: 12,
              title: "Molly",
              participants: [{ portrait_ids: [1], cast_ids: [100] }],
            }),
          ]),
        })
      );

      const tiles = within(
        screen.getByTestId("performance-tiles")
      ).getAllByTestId("project-role-portrait");

      expect(tiles.map((tile) => tile.textContent)).toEqual([
        "Anna AAnnie",
        "Berta BAnnie",
        "Clara CAnnie",
        "Anna AMolly",
      ]);
    });

    it("renders one grid per group", async () => {
      await show(
        performance({
          roles: rolesFor([
            role({
              id: 11,
              participants: [{ portrait_ids: [1, 2, 3], cast_ids: [100] }],
            }),
          ]),
        })
      );

      expect(screen.getAllByTestId("performance-role-group")).toHaveLength(1);
      expect(
        screen.getByRole("heading", { name: "Group" })
      ).toBeInTheDocument();
    });

    it("leaves out entries limited to another season", async () => {
      await show(
        performance({
          seasons: [{ id: 50, title: "Spielzeit 1" }],
          roles: rolesFor([
            role({
              id: 11,
              participants: [
                { portrait_ids: [1], season_ids: [50] },
                { portrait_ids: [2], season_ids: [60] },
              ],
            }),
          ]),
        })
      );

      expect(screen.getByText("Anna A")).toBeInTheDocument();
      expect(screen.queryByText("Berta B")).not.toBeInTheDocument();
    });

    it("omits a group whose entries all belong to other seasons", async () => {
      await show(
        performance({
          seasons: [{ id: 50, title: "Spielzeit 1" }],
          roles: rolesFor([
            role({
              id: 11,
              participants: [{ portrait_ids: [1], season_ids: [60] }],
            }),
          ]),
        })
      );

      expect(screen.queryByTestId("performance-roles")).not.toBeInTheDocument();
    });
  });

  describe("event label", () => {
    it("shows the event title when it differs from the performance title", async () => {
      await show(performance());

      expect(screen.getByTestId("event-label")).toHaveTextContent("Premiere");
    });

    it("hides the event title when it equals the performance title", async () => {
      await show(performance({ event: { id: 3, title: "abendvorstellung " } }));

      expect(screen.queryByTestId("event-label")).not.toBeInTheDocument();
    });
  });

  describe("errors and routing", () => {
    it("shows the not-found view for performance_not_found", async () => {
      await show(
        Object.assign(new Error("Not Found"), {
          response: { data: { errorcode: "performance_not_found" } },
        })
      );

      expect(
        screen.getByText("Seite nicht gefunden (404)")
      ).toBeInTheDocument();
      expect(
        screen.queryByTestId("performance-content")
      ).not.toBeInTheDocument();
    });

    it("hands non-numeric ids to the generic page renderer", async () => {
      renderPage("/projekte/annie/auffuehrungen/programm");

      expect(await screen.findByTestId("generic-page")).toBeInTheDocument();
      expect(loadPerformance).not.toHaveBeenCalled();
    });
  });

  describe("persisted store", () => {
    it("starts from an old stored state and leaves the project roles untouched", async () => {
      const oldRole = role({ id: 11, title: "Stored Role" });
      localStorage.setItem(
        "mfStore",
        JSON.stringify({
          state: { roles: { 11: { ...oldRole, hash: "stored" } } },
          version: 0,
        })
      );
      await useGlobalStore.persist.rehydrate();

      await show(
        performance({
          roles: rolesFor([
            role({
              id: 11,
              title: "Grace",
              hash: "filtered",
              participants: [{ portrait_ids: [1], cast_ids: [100] }],
            }),
          ]),
        })
      );

      expect(screen.getByText("Anna A")).toBeInTheDocument();

      const stored = useGlobalStore.getState().roles[11];
      expect(stored.hash).toBe("stored");
      expect(stored.title).toBe("Stored Role");
    });
  });
});
