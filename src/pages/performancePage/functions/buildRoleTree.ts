import {
  ProjectRoleDto,
  ProjectRolesContainerDto,
} from "@models/project-role/project-role-dto.model";
import { PerformanceRolesDto } from "@models/utility-types/performance-detail-dto.model";
import { isValidObject } from "@utils/functions/isValidObject";

type RoleEntry = ProjectRoleDto | ProjectRolesContainerDto;

export interface RoleNode {
  role: RoleEntry;
  /** Child nodes that get their own block. Empty for roles shown with their subroles. */
  children: RoleNode[];
  /** Subroles that are shown as description of the portraits of `role`. */
  subroles: ProjectRoleDto[];
  /** True when `role` itself lists people (or open positions). */
  hasEntries: boolean;
}

/**
 * Tells whether a role lists at least one person or open position.
 * @param role Role or container.
 * @returns True when a participant carries portraits or available positions.
 */
export const hasRoleEntries = (role: RoleEntry): boolean => {
  const participants = (role as ProjectRoleDto).participants;

  if (!Array.isArray(participants)) {
    return false;
  }

  return participants.some(
    (participant) =>
      !!participant.portrait_ids?.length ||
      !!participant.amount_positions_available
  );
};

const buildNode = (
  role: RoleEntry,
  roles: PerformanceRolesDto["roles"],
  visited: Set<number>
): RoleNode | undefined => {
  if (visited.has(role.id)) {
    return undefined;
  }

  const path = new Set(visited).add(role.id);
  const childRoles: RoleEntry[] = [];

  for (const childId of role.child_ids ?? []) {
    const child = roles[childId];

    if (child?.id) {
      childRoles.push(child);
    }
  }

  const hasEntries = hasRoleEntries(role);

  if ((role as ProjectRoleDto).view_type === "as_block_with_roles") {
    const subroles = childRoles.filter((child) =>
      hasRoleEntries(child)
    ) as ProjectRoleDto[];

    if (!hasEntries && !subroles.length) {
      return undefined;
    }

    return { role, children: [], subroles, hasEntries };
  }

  const children: RoleNode[] = [];

  for (const child of childRoles) {
    const node = buildNode(child, roles, path);

    if (node) {
      children.push(node);
    }
  }

  if (!hasEntries && !children.length) {
    return undefined;
  }

  return { role, children, subroles: [], hasEntries };
};

/**
 * Turns the role map of a performance into the groups and roles to show, dropping everything without people.
 * @param roles Role map of the performance; empty maps arrive as arrays.
 * @returns One node per child of the roles container, in backend order.
 */
export const buildRoleTree = (
  roles: PerformanceRolesDto["roles"]
): RoleNode[] => {
  if (!isValidObject(roles)) {
    return [];
  }

  const container = Object.values(roles).find(
    (role) => role?.template?.name === "project_roles_container"
  );

  if (!container) {
    return [];
  }

  const nodes: RoleNode[] = [];

  for (const childId of container.child_ids ?? []) {
    const child = roles[childId];

    if (!child?.id) {
      continue;
    }

    const node = buildNode(child, roles, new Set([container.id]));

    if (node) {
      nodes.push(node);
    }
  }

  return nodes;
};
