import { LoadingStatus } from "@models/loading-status.model";
import { ProjectRoleDto } from "@models/project-role/project-role-dto.model";
import { isValidArray } from "@utils/functions/isValidArray";
import { isValidObject } from "@utils/functions/isValidObject";

export const getPortraitIdsTreeForRole = (
  role?: ProjectRoleDto
): Map<number, Map<number, Set<number>>> | undefined => {
  if (!role?.participants?.length) {
    return undefined;
  }

  return role.participants.reduce((acc, participant) => {
    if (!participant.portrait_ids?.length) {
      // Participant has no portraits, so we skip them
      return acc;
    }

    let seasonIds = participant.seasons_ids;
    if (!isValidArray(seasonIds) || !seasonIds.length) {
      seasonIds = [0]; // Default season ID if none are specified
    }

    for (const seasonId of seasonIds) {
      if (!acc.has(seasonId)) {
        acc.set(seasonId, new Map<number, Set<number>>());
      }

      let castIds = participant.cast_ids;
      if (!isValidArray(castIds) || !castIds.length) {
        // If no cast IDs are specified, we use a default cast ID of 0
        castIds = [0];
      }

      for (const castId of castIds) {
        if (!acc?.get(seasonId)?.get(castId)) {
          acc?.get(seasonId)?.set(castId, new Set<number>());
        }

        for (const portraitId of participant.portrait_ids) {
          acc.get(seasonId)?.get(castId)?.add(portraitId);
        }
      }
    }

    return acc;
  }, new Map<number, Map<number, Set<number>>>());
};

export const getPortraitIdsTree = (
  role?: ProjectRoleDto,
  projectRoles?: { [key: number]: LoadingStatus<ProjectRoleDto> },
  maxDepth = -1
): Map<number, Map<number, Set<number>>> | undefined => {
  if (!role) {
    return undefined;
  }

  const portraitIdsTree = getPortraitIdsTreeForRole(role);
  if (
    !isValidObject(projectRoles) ||
    !role?.child_ids?.length ||
    maxDepth === 0
  ) {
    return portraitIdsTree;
  }

  return role?.child_ids
    ?.map((id) => projectRoles[id]?.data)
    .reduce((acc, childRole) => {
      if (!childRole) {
        return acc;
      }

      const childTree = getPortraitIdsTree(
        childRole,
        projectRoles,
        maxDepth - 1
      );
      if (!childTree) {
        return acc;
      }

      for (const [seasonId, castIds] of childTree.entries()) {
        if (!acc.has(seasonId)) {
          acc.set(seasonId, new Map<number, Set<number>>());
        }

        for (const [castId, portraitIds] of castIds) {
          if (!acc.get(seasonId)?.has(castId)) {
            acc.get(seasonId)?.set(castId, new Set<number>());
          }

          for (const portraitId of portraitIds) {
            acc.get(seasonId)?.get(castId)?.add(portraitId);
          }
        }
      }

      return acc;
    }, portraitIdsTree || new Map<number, Map<number, Set<number>>>());
};
