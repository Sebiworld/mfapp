import { beforeEach, describe, expect, it, vi } from "vitest";
import { render, screen, within } from "@testing-library/react";
import { createMemoryRouter, RouterProvider } from "react-router";
import { THEME_ID, ThemeProvider } from "@mui/material/styles";
import { mfTheme } from "@styles/theme/mfTheme";
import { ProjectRole } from "../ProjectRole";
import { GetProjectRolesResponse } from "@api/axios/projectRolesApi";
import { ProjectRoleDto } from "@models/project-role/project-role-dto.model";
import { ProjectPortraitDto } from "@models/project-role/project-portrait-dto.model";
import { ProjectCastDto } from "@models/project-role/project-cast-dto.model";
import { projectRolesStoreActions } from "@src/store/projectRoles/projectRoles.actions";

vi.mock("@api/hooks/useProjectRolesApi", () => ({
  useProjectRolesApi: () => ({
    loadProjectRoles: vi.fn().mockResolvedValue(true),
  }),
}));

// Cast: the component only reads the fields set here.
const role = (fields: Partial<ProjectRoleDto> & { id: number }) =>
  ({
    name: `role-${fields.id}`,
    url: `/projekte/annie/rollen/${fields.id}/`,
    title: `Role ${fields.id}`,
    participants: [],
    child_ids: [],
    ...fields,
  }) as unknown as ProjectRoleDto;

const portrait = (id: number, title: string): ProjectPortraitDto => ({
  id,
  name: `portrait-${id}`,
  title,
  title_separable: title,
});

const store = (response: GetProjectRolesResponse): void => {
  projectRolesStoreActions.setProjectRoles(0, response);
};

const cast = (id: number, title: string): ProjectCastDto => ({
  id,
  title,
  name: `cast-${id}`,
  url: "",
});

const renderRole = (id: number) => {
  const router = createMemoryRouter(
    [{ path: "*", element: <ProjectRole id={id} /> }],
    { initialEntries: ["/projekte/annie/rollen/x/"] }
  );

  return render(
    <ThemeProvider theme={{ [THEME_ID]: mfTheme }} noSsr defaultMode="light">
      <RouterProvider router={router} />
    </ThemeProvider>
  );
};

const columnTitles = (root: HTMLElement): string[] =>
  Array.from(root.querySelectorAll(".cast-title")).map(
    (el) => el.textContent ?? ""
  );

describe("ProjectRole cast columns", () => {
  beforeEach(() => {
    projectRolesStoreActions.resetSlice();
  });

  it("shows two casts as columns headed by the cast names", async () => {
    store({
      roles: {
        1: role({ id: 1, view_type: "by_cast", child_ids: [2] }),
        2: role({
          id: 2,
          title: "Grace",
          view_type: "by_cast",
          participants: [
            { portrait_ids: [10], cast_ids: [100] },
            { portrait_ids: [11], cast_ids: [101] },
          ],
        }),
      },
      casts: {
        100: cast(100, "Cast A"),
        101: cast(101, "Cast B"),
      },
      portraits: { 10: portrait(10, "Anna A"), 11: portrait(11, "Berta B") },
    });

    renderRole(1);

    const columns = await screen.findByTestId("project-role-cast-columns");

    expect(columnTitles(columns)).toEqual(["Cast A", "Cast B"]);

    const [first, second] = within(columns).getAllByTestId("project-role-cast");

    expect(within(first).getByText("Anna A")).toBeInTheDocument();
    expect(within(second).getByText("Berta B")).toBeInTheDocument();
  });

  it("shows three casts as columns headed by the cast names", async () => {
    store({
      roles: {
        1: role({ id: 1, view_type: "by_cast", child_ids: [2] }),
        2: role({
          id: 2,
          title: "Annie",
          view_type: "by_cast",
          participants: [
            { portrait_ids: [10], cast_ids: [100] },
            { portrait_ids: [11], cast_ids: [101] },
            { portrait_ids: [12], cast_ids: [102] },
          ],
        }),
      },
      casts: {
        100: cast(100, "Cast A"),
        101: cast(101, "Cast B"),
        102: cast(102, "Cast C"),
      },
      portraits: {
        10: portrait(10, "Anna A"),
        11: portrait(11, "Berta B"),
        12: portrait(12, "Clara C"),
      },
    });

    renderRole(1);

    const columns = await screen.findByTestId("project-role-cast-columns");

    expect(columnTitles(columns)).toEqual([
      "Cast A",
      "Cast B",
      "Cast C",
    ]);
    expect(within(columns).getAllByTestId("project-role-cast")).toHaveLength(3);
    expect(columns).toHaveClass("casts-3");
  });

  it("scrolls the columns instead of the page on narrow screens", async () => {
    store({
      roles: {
        1: role({
          id: 1,
          view_type: "by_cast",
          participants: [
            { portrait_ids: [10], cast_ids: [100] },
            { portrait_ids: [11], cast_ids: [101] },
          ],
        }),
      },
      casts: { 100: cast(100, "Cast A"), 101: cast(101, "Cast B") },
      portraits: { 10: portrait(10, "Anna A"), 11: portrait(11, "Berta B") },
    });

    renderRole(1);

    const columns = await screen.findByTestId("project-role-cast-columns");
    const style = getComputedStyle(columns);

    expect(style.overflowX).toBe("auto");
    expect(style.gridAutoFlow).toBe("column");
  });

  it("shows a person once per cast when the role lists them twice", async () => {
    store({
      roles: {
        1: role({
          id: 1,
          view_type: "by_cast",
          participants: [
            { portrait_ids: [10], cast_ids: [100] },
            { portrait_ids: [10], cast_ids: [100] },
            { portrait_ids: [11], cast_ids: [101] },
            // No cast: the person is shown in every cast column.
            { portrait_ids: [10] },
          ],
        }),
      },
      casts: { 100: cast(100, "Cast A"), 101: cast(101, "Cast B") },
      portraits: { 10: portrait(10, "Anna A"), 11: portrait(11, "Berta B") },
    });

    renderRole(1);

    const columns = await screen.findByTestId("project-role-cast-columns");
    const [first, second] = within(columns).getAllByTestId("project-role-cast");

    expect(within(first).getAllByText("Anna A")).toHaveLength(1);
    expect(within(second).getAllByText("Anna A")).toHaveLength(1);
    expect(within(second).getAllByText("Berta B")).toHaveLength(1);
  });

  it("keeps the block page format without cast columns", async () => {
    // Block page: the roles below it carry the portraits, without cast_ids.
    store({
      roles: {
        5: role({
          id: 5,
          title: "Besetzung A",
          view_type: "as_block_with_roles",
          child_ids: [6, 7],
        }),
        6: role({
          id: 6,
          title: "Annie",
          view_type: "as_block_with_roles",
          participants: [{ portrait_ids: [10] }],
        }),
        7: role({
          id: 7,
          title: "Molly",
          view_type: "as_block_with_roles",
          participants: [{ portrait_ids: [11] }],
        }),
      },
      casts: {},
      portraits: { 10: portrait(10, "Anna A"), 11: portrait(11, "Berta B") },
    });

    renderRole(5);

    expect(await screen.findByText("Anna A")).toBeInTheDocument();
    expect(screen.getByText("Berta B")).toBeInTheDocument();
    expect(screen.getAllByTestId("project-role-portrait")).toHaveLength(2);
    expect(screen.queryByTestId("project-role-cast-columns")).toBeNull();
  });
});

describe("ProjectRole cast column layout", () => {
  beforeEach(() => {
    projectRolesStoreActions.resetSlice();
  });

  /** Stores a container role with one by-cast subrole that has a description and portraits in two casts. */
  const storeByCastSubrole = (): void => {
    store({
      roles: {
        1: role({ id: 1, child_ids: [2] }),
        2: role({
          id: 2,
          view_type: "by_cast",
          description: "<p>Ward / Cordell Hull</p>",
          participants: [
            { portrait_ids: [10], cast_ids: [100] },
            { portrait_ids: [11], cast_ids: [101] },
          ],
        }),
      },
      casts: { 100: cast(100, "Cast A"), 101: cast(101, "Cast B") },
      portraits: { 10: portrait(10, "Anna A"), 11: portrait(11, "Berta B") },
    });
  };

  it("leaves room above and below the columns, so the scroll box does not cut off the card shadows", async () => {
    storeByCastSubrole();
    renderRole(1);

    const style = getComputedStyle(
      await screen.findByTestId("project-role-cast-columns")
    );

    expect(parseFloat(style.paddingTop)).toBeGreaterThan(0);
    expect(parseFloat(style.paddingBottom)).toBeGreaterThan(0);
  });

  it("starts the role description at the left edge like the title, not centred in the measure", async () => {
    storeByCastSubrole();
    const { container } = renderRole(1);

    await screen.findByTestId("project-role-cast-columns");
    const paragraph = container.querySelector(".subrole-description p");

    expect(paragraph).not.toBeNull();
    expect(getComputedStyle(paragraph as Element).alignSelf).toBe(
      "flex-start"
    );
  });
});
