import { ProjectPortraitWithRoles } from "@models/project-role/project-portrait-dto.model";
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
  subroles,
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

  const portraitsByCastIds = useMemo(() => {
    const output: Map<number, Map<number, ProjectPortraitWithRoles>> = new Map<
      number,
      Map<number, ProjectPortraitWithRoles>
    >();
    output.set(0, new Map<number, ProjectPortraitWithRoles>()); // Default cast (0)

    if (isValidArray(castIds)) {
      for (const castId of castIds) {
        output.set(castId, new Map<number, ProjectPortraitWithRoles>());
      }
    }

    if (isValidArray(role?.participants) && role.participants.length) {
      for (const participant of role.participants) {
        if (!isValidArray(participant.portrait_ids)) {
          continue;
        }

        if (
          participant.season_ids?.length &&
          (!currentSeasonId ||
            !participant.season_ids.includes(currentSeasonId))
        ) {
          continue;
        }

        if (participant.cast_ids?.length) {
          for (const castId of participant.cast_ids) {
            if (!output.has(castId)) {
              output.set(castId, new Map<number, ProjectPortraitWithRoles>());
            }

            for (const portraitId of participant.portrait_ids) {
              const portrait = projectPortraits[portraitId];

              if (!portrait?.id) {
                continue;
              }

              if (!output.get(castId)?.has(portrait.id)) {
                output
                  .get(castId)
                  ?.set(portrait.id, { ...portrait, projectRoles: [] });
              }

              // output.get(castId)?.get(portrait.id)?.projectRoles.push(role);
            }
          }
        } else {
          // If no cast_ids, add to default cast (0)
          for (const portraitId of participant.portrait_ids) {
            const portrait = projectPortraits[portraitId];

            if (!portrait?.id) {
              continue;
            }

            if (!output.get(0)?.has(portrait.id)) {
              output
                .get(0)
                ?.set(portrait.id, { ...portrait, projectRoles: [] });
            }

            // output.get(0)?.get(portrait.id)?.projectRoles.push(role);
          }
        }
      }
    }

    // Use subroles if currentRole?.view_type === "as_block_with_roles"
    if (isValidArray(subroles)) {
      for (const subrole of subroles) {
        if (
          !isValidArray(subrole?.participants) ||
          !subrole.participants.length
        ) {
          continue;
        }

        for (const participant of subrole.participants) {
          if (!isValidArray(participant.portrait_ids)) {
            continue;
          }

          if (
            participant.season_ids?.length &&
            (!currentSeasonId ||
              !participant.season_ids.includes(currentSeasonId))
          ) {
            continue;
          }

          if (participant.cast_ids?.length) {
            for (const castId of participant.cast_ids) {
              if (!output.has(castId)) {
                output.set(castId, new Map<number, ProjectPortraitWithRoles>());
              }

              for (const portraitId of participant.portrait_ids) {
                const portrait = projectPortraits[portraitId];

                if (!portrait?.id) {
                  continue;
                }

                if (!output.get(castId)?.has(portrait.id)) {
                  output
                    .get(castId)
                    ?.set(portrait.id, { ...portrait, projectRoles: [] });
                }

                output
                  .get(castId)
                  ?.get(portrait.id)
                  ?.projectRoles.push(subrole);
              }
            }
          } else {
            // If no cast_ids, add to default cast (0)
            for (const portraitId of participant.portrait_ids) {
              const portrait = projectPortraits[portraitId];

              if (!portrait?.id) {
                continue;
              }

              if (!output.get(0)?.has(portrait.id)) {
                output
                  .get(0)
                  ?.set(portrait.id, { ...portrait, projectRoles: [] });
              }

              output.get(0)?.get(portrait.id)?.projectRoles.push(subrole);
            }
          }
        }
      }
    }

    return output;
  }, [castIds, role, subroles, currentSeasonId, projectPortraits]);

  const hasOnlyPortraitsWithoutCasts = useMemo(() => {
    if (!isValidObject(portraitsByCastIds)) {
      return false;
    }

    for (const [castId, portraitsMap] of portraitsByCastIds) {
      if (castId === 0) {
        continue;
      }

      if (portraitsMap.size) {
        return false;
      }
    }

    return true;
  }, [portraitsByCastIds]);

  const castsWithPortraits = useMemo(() => {
    if (!isValidObject(portraitsByCastIds)) {
      return undefined;
    }

    const output: { cast?: CastDto; portraits: ProjectPortraitWithRoles[] }[] =
      [];

    for (const [castId, portraitsMap] of portraitsByCastIds) {
      if (castId === 0) {
        output.push({
          portraits: Array.from(portraitsMap.values()),
        });
      } else {
        output.push({
          cast: projectCasts[Number(castId)],
          portraits: Array.from(portraitsMap.values()),
        });
      }
    }

    const placeholderCast = output.find((item) => !item.cast);
    if (placeholderCast?.portraits?.length) {
      for (const [castId] of portraitsByCastIds) {
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
  }, [portraitsByCastIds, projectCasts]);

  const placeholderCast = useMemo(() => {
    return castsWithPortraits?.find((item) => !item.cast);
  }, [castsWithPortraits]);

  const castsWithPortraitsFiltered = useMemo(() => {
    if (!castsWithPortraits) {
      return [];
    }

    return castsWithPortraits.filter((item) => item.cast?.id);
  }, [castsWithPortraits]);

  if (!isValidObject(portraitsByCastIds)) {
    return null;
  }

  if (!castsWithPortraits) {
    return null;
  }

  // TODO Sort portraits by roles

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
