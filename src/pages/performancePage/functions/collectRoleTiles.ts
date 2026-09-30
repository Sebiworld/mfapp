import { ProjectPortraitWithRoles } from "@models/project-role/project-portrait-dto.model";
import { ProjectRoleDto } from "@models/project-role/project-role-dto.model";
import { PerformanceRolesDto } from "@models/utility-types/performance-detail-dto.model";
import { RoleNode } from "./buildRoleTree";

export interface RoleTile {
  key: string;
  /** Portrait with the role it is shown for as only entry in `projectRoles`. */
  portrait: ProjectPortraitWithRoles;
}

/**
 * Lists the people of one role, each once, in the order of the participant entries.
 * @param role Role whose participants are read.
 * @param roles Roles, casts and portraits of the performance.
 * @param seasonIds Seasons of the performance; entries limited to other seasons are skipped.
 */
const getRoleTiles = (
  role: ProjectRoleDto,
  roles: PerformanceRolesDto,
  seasonIds: number[]
): RoleTile[] => {
  const tiles: RoleTile[] = [];
  const seen = new Set<number>();

  for (const participant of role.participants ?? []) {
    const limited = participant.season_ids;

    if (limited?.length && !limited.some((id) => seasonIds.includes(id))) {
      continue;
    }

    for (const portraitId of participant.portrait_ids ?? []) {
      const portrait = roles.portraits[portraitId];

      if (portraitId <= 0 || !portrait?.id || seen.has(portrait.id)) {
        continue;
      }

      seen.add(portrait.id);
      tiles.push({
        key: `${role.id}-${portrait.id}`,
        portrait: { ...portrait, projectRoles: [role] },
      });
    }
  }

  return tiles;
};

/**
 * Flattens a group of roles into one tile per person and role.
 * @param node Group or role from `buildRoleTree`.
 * @param roles Roles, casts and portraits of the performance.
 * @param seasonIds Seasons of the performance.
 * @returns Tiles in backend order: own entries first, then subroles, then child nodes.
 */
export const collectRoleTiles = (
  node: RoleNode,
  roles: PerformanceRolesDto,
  seasonIds: number[]
): RoleTile[] => {
  const tiles: RoleTile[] = [];

  if (node.hasEntries) {
    tiles.push(...getRoleTiles(node.role as ProjectRoleDto, roles, seasonIds));
  }

  for (const subrole of node.subroles) {
    tiles.push(...getRoleTiles(subrole, roles, seasonIds));
  }

  for (const child of node.children) {
    tiles.push(...collectRoleTiles(child, roles, seasonIds));
  }

  return tiles;
};
