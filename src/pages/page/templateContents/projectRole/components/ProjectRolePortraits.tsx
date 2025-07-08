import { ProjectPortraitDto } from "@models/project-role/project-portrait-dto.model";
import { ProjectRoleDto } from "@models/project-role/project-role-dto.model";
import { CastDto } from "@models/utility-types/performance-dto.model";
import { Box, Typography } from "@mui/material";
import { useGlobalStore } from "@src/store/global.store";
import {
  selectProjectCasts,
  selectProjectPortraits,
} from "@src/store/projectRoles.store";
import { isValidArray } from "@utils/functions/isValidArray";
import { isValidObject } from "@utils/functions/isValidObject";
import { uniqBy } from "lodash";
import { FC, useMemo } from "react";
import { ProjectRolePortrait } from "./ProjectRolePortrait";

interface ProjectRolePortraitsProps {
  role?: ProjectRoleDto;
  portraitIdsTree?: Map<number, Map<number, Set<number>>>;
  currentSeasonId?: number;
  subroles?: ProjectRoleDto[];
}

export const ProjectRolePortraits: FC<ProjectRolePortraitsProps> = ({
  role,
  portraitIdsTree,
  currentSeasonId,
  // TODO subroles
}) => {
  const projectCasts = useGlobalStore(selectProjectCasts);
  const projectPortraits = useGlobalStore(selectProjectPortraits);

  const castIds = useMemo(() => {
    if (!portraitIdsTree) {
      return undefined;
    }

    if (currentSeasonId && portraitIdsTree.has(currentSeasonId)) {
      const castIds = portraitIdsTree.get(currentSeasonId)?.keys();

      if (!castIds) {
        return undefined;
      }

      return Array.from(castIds);
    }

    const castIds = portraitIdsTree.get(0)?.keys();

    if (!castIds) {
      return undefined;
    }

    return Array.from(castIds);
  }, [portraitIdsTree, currentSeasonId]);

  const portraitIdsByCastIds = useMemo(() => {
    const output: Map<number, Set<number>> = new Map<number, Set<number>>();
    output.set(0, new Set<number>()); // Default cast (0)

    if (isValidArray(castIds)) {
      for (const castId of castIds) {
        output.set(castId, new Set<number>());
      }
    }

    if (isValidArray(role?.participants) && role.participants.length) {
      for (const participant of role.participants) {
        if (!isValidArray(participant.portrait_ids)) {
          continue;
        }

        if (
          participant.seasons_ids?.length &&
          (!currentSeasonId ||
            !participant.seasons_ids.includes(currentSeasonId))
        ) {
          continue;
        }

        if (participant.cast_ids?.length) {
          for (const castId of participant.cast_ids) {
            if (!output.has(castId)) {
              output.set(castId, new Set<number>());
            }

            for (const portraitId of participant.portrait_ids) {
              output.get(castId)?.add(portraitId);
            }
          }
        } else {
          // If no cast_ids, add to default cast (0)
          for (const portraitId of participant.portrait_ids) {
            output.get(0)?.add(portraitId);
          }
        }
      }
    }

    return output;
  }, [castIds, role?.participants, currentSeasonId]);

  const hasOnlyPortraitsWithoutCasts = useMemo(() => {
    if (!isValidObject(portraitIdsByCastIds)) {
      return false;
    }

    for (const [castId, portraitIds] of portraitIdsByCastIds) {
      if (castId === 0) {
        continue;
      }

      if (portraitIds.size) {
        return false;
      }
    }

    return true;
  }, [portraitIdsByCastIds]);

  const castsWithPortraits = useMemo(() => {
    if (!isValidObject(portraitIdsByCastIds)) {
      return undefined;
    }

    const output: { cast?: CastDto; portraits: ProjectPortraitDto[] }[] = [];

    for (const [castId, portraitIds] of portraitIdsByCastIds) {
      const castPortraits = Array.from(portraitIds)
        .map((portraitId) => projectPortraits[portraitId])
        .filter((p) => isValidObject(p) && !!p.id);

      if (castId === 0) {
        output.push({
          portraits: castPortraits,
        });
      } else {
        output.push({
          cast: projectCasts[Number(castId)],
          portraits: castPortraits,
        });
      }
    }

    const placeholderCast = output.find((item) => !item.cast);
    if (placeholderCast?.portraits?.length) {
      for (const [castId] of portraitIdsByCastIds) {
        if (castId === 0) {
          continue;
        }

        const castIndex = output.findIndex(
          (item) => item.cast?.id === Number(castId)
        );
        if (castIndex < 0) {
          continue;
        }

        output[castIndex].portraits.push(...placeholderCast.portraits);
      }
    }

    for (const item of output) {
      if (!isValidArray(item.portraits) || !item.portraits.length) {
        continue;
      }

      item.portraits = uniqBy(item.portraits, "id");
    }

    return output;
  }, [portraitIdsByCastIds, projectCasts, projectPortraits]);

  const placeholderCast = useMemo(() => {
    return castsWithPortraits?.find((item) => !item.cast);
  }, [castsWithPortraits]);

  const castsWithPortraitsFiltered = useMemo(() => {
    if (!castsWithPortraits) {
      return [];
    }

    return castsWithPortraits.filter((item) => item.cast?.id);
  }, [castsWithPortraits]);

  if (!isValidObject(portraitIdsByCastIds)) {
    return null;
  }

  if (!castsWithPortraits) {
    return null;
  }

  if (hasOnlyPortraitsWithoutCasts) {
    return (
      <Box
        data-testid="project-role-portraits"
        className="project-role-portraits only-portraits"
      >
        <Box className="portraits-container">
          {placeholderCast?.portraits.map((portrait) => (
            <ProjectRolePortrait
              key={portrait.id}
              portrait={portrait}
            ></ProjectRolePortrait>
          ))}
        </Box>
      </Box>
    );
  }

  // Portraits with casts
  return (
    <Box
      data-testid="project-role-portraits"
      className="project-role-portraits casts-with-portraits"
    >
      <Box
        className={`casts-container casts-${castsWithPortraitsFiltered.length || 0}`}
      >
        {castsWithPortraitsFiltered
          .filter((item) => item.cast?.id)
          .map((item) => (
            <Box className="cast" key={item.cast?.id || 0}>
              <Typography className="cast-title">{item.cast?.title}</Typography>

              <Box className="portraits-container">
                {item.portraits.map((portrait) => (
                  <ProjectRolePortrait
                    key={portrait.id}
                    portrait={portrait}
                  ></ProjectRolePortrait>
                ))}
              </Box>
            </Box>
          ))}
      </Box>
    </Box>
  );
};
