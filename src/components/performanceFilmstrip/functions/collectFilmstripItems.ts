import { ProjectPortraitDto } from "@models/project-role/project-portrait-dto.model";
import { PerformanceDetailDto } from "@models/utility-types/performance-detail-dto.model";
import { ProjectRoleDto } from "@models/project-role/project-role-dto.model";
import {
  buildRoleTree,
  RoleNode,
} from "@pages/performancePage/functions/buildRoleTree";
import { collectRoleTiles } from "@pages/performancePage/functions/collectRoleTiles";

export interface FilmstripItem {
  key: string;
  portrait: ProjectPortraitDto;
  /** Titles of all roles the person plays in this performance, in role order. */
  roleTitles: string[];
}

/**
 * Tells whether a role group belongs on stage: stage roles are assigned per cast, so at least one entry in the
 * group names a cast. Orchestra, backstage and creative team are the same for every performance and name none.
 * @param node Top-level group from `buildRoleTree`, with its subroles and child groups.
 * @returns True when any role in the group has an entry with a cast.
 */
export const isCastGroup = (node: RoleNode): boolean => {
  const roles = [node.role as ProjectRoleDto, ...node.subroles];

  if (
    roles.some((role) =>
      (role.participants ?? []).some(
        (participant) => !!participant.cast_ids?.length
      )
    )
  ) {
    return true;
  }

  return node.children.some(isCastGroup);
};

/**
 * Lists every person on stage in a performance once, with all the roles they play, in the order of the roles overview.
 * @param performance Performance whose roles are already reduced to the playing casts.
 * Only groups with cast assignments are used (see `isCastGroup`); within such a group everyone is listed, also
 * roles that play in every cast.
 * @returns One item per portrait; empty when nobody is listed.
 */
export const collectFilmstripItems = (
  performance: PerformanceDetailDto
): FilmstripItem[] => {
  const seasonIds = (performance.seasons ?? []).map((season) => season.id);
  const items: FilmstripItem[] = [];
  const byPortrait = new Map<number, FilmstripItem>();

  const groups = buildRoleTree(performance.roles?.roles ?? {}).filter(
    isCastGroup
  );

  for (const node of groups) {
    for (const tile of collectRoleTiles(node, performance.roles, seasonIds)) {
      const roleTitle = tile.portrait.projectRoles[0]?.title;
      const existing = byPortrait.get(tile.portrait.id);

      if (existing) {
        if (roleTitle && !existing.roleTitles.includes(roleTitle)) {
          existing.roleTitles.push(roleTitle);
        }

        continue;
      }

      const item: FilmstripItem = {
        key: String(tile.portrait.id),
        portrait: tile.portrait,
        roleTitles: roleTitle ? [roleTitle] : [],
      };

      byPortrait.set(tile.portrait.id, item);
      items.push(item);
    }
  }

  return items;
};
