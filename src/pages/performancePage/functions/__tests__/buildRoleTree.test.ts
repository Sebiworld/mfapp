import { describe, expect, it } from "vitest";
import { ProjectRoleDto } from "@models/project-role/project-role-dto.model";
import { PerformanceRolesDto } from "@models/utility-types/performance-detail-dto.model";
import { buildRoleTree } from "../buildRoleTree";

// Cast: only the fields the function reads are set.
const role = (
  fields: Partial<ProjectRoleDto> & { id: number }
): ProjectRoleDto =>
  ({
    name: `r${fields.id}`,
    url: "",
    title: `Role ${fields.id}`,
    template: { id: 1, name: "project_role", label: "Rolle" },
    participants: [],
    child_ids: [],
    ...fields,
  }) as ProjectRoleDto;

const container = (childIds: number[]): ProjectRoleDto =>
  role({
    id: 1,
    template: { id: 2, name: "project_roles_container", label: "Container" },
    participants: undefined,
    child_ids: childIds,
  });

const roles = (list: ProjectRoleDto[]): PerformanceRolesDto["roles"] =>
  Object.fromEntries(list.map((r) => [r.id, r]));

describe("buildRoleTree", () => {
  it("keeps roles with people and drops empty ones, including empty groups", () => {
    const tree = buildRoleTree(
      roles([
        container([10, 20]),
        role({ id: 10, child_ids: [11, 12] }),
        role({ id: 11, participants: [{ portrait_ids: [5], cast_ids: [9] }] }),
        role({ id: 12, participants: [{ portrait_ids: [], cast_ids: [9] }] }),
        role({ id: 20, child_ids: [21] }),
        role({ id: 21, participants: [] }),
      ])
    );

    expect(tree.map((n) => n.role.id)).toEqual([10]);
    expect(tree[0].children.map((n) => n.role.id)).toEqual([11]);
  });

  it("counts open positions as entries", () => {
    const tree = buildRoleTree(
      roles([
        container([10]),
        role({ id: 10, participants: [{ amount_positions_available: 2 }] }),
      ])
    );

    expect(tree).toHaveLength(1);
  });

  it("shows subroles of a block with roles as descriptions of the portraits", () => {
    const tree = buildRoleTree(
      roles([
        container([10]),
        role({ id: 10, view_type: "as_block_with_roles", child_ids: [11, 12] }),
        role({ id: 11, participants: [{ portrait_ids: [5] }] }),
        role({ id: 12 }),
      ])
    );

    expect(tree[0].children).toEqual([]);
    expect(tree[0].subroles.map((r) => r.id)).toEqual([11]);
  });

  it("returns nothing for empty maps, which arrive as arrays", () => {
    expect(
      buildRoleTree([] as unknown as PerformanceRolesDto["roles"])
    ).toEqual([]);
  });

  it("survives cyclic child references", () => {
    const tree = buildRoleTree(
      roles([
        container([10]),
        role({ id: 10, child_ids: [11] }),
        role({
          id: 11,
          child_ids: [10],
          participants: [{ portrait_ids: [5] }],
        }),
      ])
    );

    expect(tree[0].children.map((n) => n.role.id)).toEqual([11]);
  });
});
