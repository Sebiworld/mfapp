import { describe, expect, it } from "vitest";
import { ProjectRoleDto } from "@models/project-role/project-role-dto.model";
import { PerformanceDetailDto } from "@models/utility-types/performance-detail-dto.model";
import { collectFilmstripItems } from "../collectFilmstripItems";

// Cast: the collector reads only the fields set here.
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

const portrait = (id: number, title: string) => ({ id, name: `p${id}`, title });

// Cast: only roles and seasons are read.
const performance = (roles: ProjectRoleDto[]): PerformanceDetailDto =>
  ({
    seasons: [],
    roles: {
      roles: Object.fromEntries(roles.map((entry) => [entry.id, entry])),
      seasons: {},
      casts: {},
      portraits: {
        1: portrait(1, "Anna"),
        2: portrait(2, "Ben"),
        3: portrait(3, "Carla"),
        4: portrait(4, "Dora"),
      },
      child_ids: [],
    },
  }) as unknown as PerformanceDetailDto;

const container = (childIds: number[]): ProjectRoleDto =>
  role({
    id: 1,
    template: { id: 2, name: "project_roles_container", label: "C" },
    participants: undefined,
    child_ids: childIds,
  });

describe("collectFilmstripItems", () => {
  it("lists only groups with cast assignments, including their roles without cast", () => {
    const items = collectFilmstripItems(
      performance([
        container([10, 20, 30]),
        role({ id: 10, title: "Cast", participants: [], child_ids: [11, 12] }),
        role({
          id: 11,
          title: "Annie",
          participants: [{ portrait_ids: [1], cast_ids: [100] }],
        }),
        // Plays in every cast, so it names none; it still belongs to the stage group.
        role({
          id: 12,
          title: "Ensemble",
          participants: [{ portrait_ids: [2] }],
        }),
        role({ id: 20, title: "Orchester", participants: [], child_ids: [21] }),
        role({
          id: 21,
          title: "Violine",
          participants: [{ portrait_ids: [3] }],
        }),
        role({
          id: 30,
          title: "Backstage",
          participants: [{ portrait_ids: [4] }],
        }),
      ])
    );

    expect(items.map((item) => [item.portrait.title, item.roleTitles])).toEqual(
      [
        ["Anna", ["Annie"]],
        ["Ben", ["Ensemble"]],
      ]
    );
  });

  it("recognises a cast group by a cast in a nested group", () => {
    const items = collectFilmstripItems(
      performance([
        container([10]),
        role({ id: 10, title: "Kinder", participants: [], child_ids: [11] }),
        role({ id: 11, title: "Gruppe", participants: [], child_ids: [12] }),
        role({
          id: 12,
          title: "Molly",
          participants: [{ portrait_ids: [1], cast_ids: [100] }],
        }),
      ])
    );

    expect(items.map((item) => item.portrait.title)).toEqual(["Anna"]);
  });

  it("lists a person with several roles once with all role titles", () => {
    const items = collectFilmstripItems(
      performance([
        container([10]),
        role({ id: 10, title: "Cast", participants: [], child_ids: [11, 12] }),
        role({
          id: 11,
          title: "Drake",
          participants: [{ portrait_ids: [1], cast_ids: [100] }],
        }),
        role({
          id: 12,
          title: "Hundefänger",
          participants: [{ portrait_ids: [1], cast_ids: [100] }],
        }),
      ])
    );

    expect(items).toHaveLength(1);
    expect(items[0].roleTitles).toEqual(["Drake", "Hundefänger"]);
  });

  it("returns nothing when no group names a cast", () => {
    expect(
      collectFilmstripItems(
        performance([
          container([20]),
          role({
            id: 20,
            title: "Orchester",
            participants: [{ portrait_ids: [3] }],
          }),
        ])
      )
    ).toEqual([]);
  });
});
