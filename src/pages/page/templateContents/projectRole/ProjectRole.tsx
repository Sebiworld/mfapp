import { FC, useEffect, useMemo } from "react";
import { useGlobalStore } from "@src/store/global.store";
import { Box, Button, ButtonGroup } from "@mui/material";
import { projectRoleStyles } from "./projectRole.styles";
import {
  selectLoadProjectRoles,
  selectProjectRoles,
  selectProjectSeasons,
} from "@src/store/projectRoles.store";
import { ProjectRolePortraits } from "./components/ProjectRolePortraits";
import { getPortraitIdsTree } from "./functions/getPortraitIdsTree";
import { ProjectSubrole } from "./components/ProjectSubrole";
import { ProjectRoleDto } from "@models/project-role/project-role-dto.model";
import { ProjectSeasonDto } from "@models/project-role/project-season-dto.model";
import { isValidArray } from "@utils/functions/isValidArray";
import { Link, useSearchParams } from "react-router";

interface ProjectRoleProps {
  id?: number;
}

export const ProjectRole: FC<ProjectRoleProps> = ({ id }) => {
  const projectRoles = useGlobalStore(selectProjectRoles);
  const projectSeasons = useGlobalStore(selectProjectSeasons);

  const [searchParams] = useSearchParams();

  const currentRoleLoadingStatus = useMemo(() => {
    if (!id) {
      return undefined;
    }

    return projectRoles[id];
  }, [id, projectRoles]);

  const currentRole = useMemo(() => {
    if (!currentRoleLoadingStatus?.data?.id) {
      return undefined;
    }

    return currentRoleLoadingStatus.data;
  }, [currentRoleLoadingStatus?.data]);

  const subRoles = useMemo((): ProjectRoleDto[] | undefined => {
    if (!currentRole?.child_ids?.length) {
      return undefined;
    }

    return currentRole.child_ids
      .map((id) => projectRoles[id]?.data)
      .filter((subrole) => subrole?.id) as ProjectRoleDto[];
  }, [currentRole?.child_ids, projectRoles]);

  // Portrait Ids Tree for the current role with all subroles
  const portraitIdsTree = useMemo(
    () => getPortraitIdsTree(currentRole, projectRoles),
    [currentRole, projectRoles]
  );

  const isLoading = useMemo(
    () => currentRoleLoadingStatus?.status === "loading",
    [currentRoleLoadingStatus?.status]
  );

  const loadProjectRoles = useGlobalStore(selectLoadProjectRoles);
  useEffect(() => {
    if (!id) {
      return;
    }

    loadProjectRoles(id);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  const currentViewType = useMemo(() => {
    return (currentRole as ProjectRoleDto)?.view_type;
  }, [currentRole]);

  const showSubroles = useMemo(() => {
    if (!currentViewType) {
      return true;
    }

    return [
      "as_block",
      // "as_block_with_roles",
      "subroles_teaser",
      "by_cast",
      "as_cast_block",
    ].includes(currentViewType);
  }, [currentViewType]);

  const seasonIds = useMemo(() => {
    const iterator = portraitIdsTree?.keys();
    if (!iterator) {
      return [];
    }
    return Array.from(iterator);
  }, [portraitIdsTree]);

  const seasons = useMemo(() => {
    return seasonIds.map((id) => {
      const season = projectSeasons[id];

      if (!season?.id) {
        return {
          id,
          name: `season-${id}`,
          title: `Staffel ${id}`,
        } as ProjectSeasonDto;
      }

      return season;
    });
  }, [projectSeasons, seasonIds]);

  const selectedSeasonId = useMemo(() => {
    const searchParam = searchParams?.get("season");
    if (!searchParam) {
      return undefined;
    }

    const numberVal = parseInt(searchParam, 10);
    if (isNaN(numberVal)) {
      return undefined;
    }

    return numberVal;
  }, [searchParams]);

  const currentSeasonId = useMemo(() => {
    if (!isValidArray(seasons) || !seasons.length) {
      return undefined;
    }

    if (seasons.length === 1) {
      return seasons[0]?.id;
    }

    const season = seasons.find((s) => s?.id === selectedSeasonId);
    if (season?.id) {
      return season.id;
    }

    return seasons[0]?.id;
  }, [seasons, selectedSeasonId]);

  const isSeasonSelectable = useMemo(
    () => seasons?.length && seasons.length >= 2,
    [seasons.length]
  );

  // const handleSeasonChange = (
  //   _event: React.SyntheticEvent,
  //   newValue: number
  // ) => {
  //   setSelectedSeasonId(newValue);
  // };

  if (isLoading) {
    return;
  }

  // TODO: Seasons zusammenfassen, wenn sie gleich sind

  return (
    <Box
      className="project-role"
      data-testid="project-role"
      sx={projectRoleStyles}
    >
      {isSeasonSelectable && (
        <Box className="season-selection">
          <ButtonGroup variant="contained">
            {seasons.map((season) => {
              const searchParams = new URLSearchParams({
                season: season.id || "",
              } as Record<string, string>);
              return (
                <Button
                  key={season.id}
                  // color={
                  //   season.id === currentSeasonId
                  //     ? "contrast"
                  //     : "projectPrimary"
                  // }
                  component={Link}
                  to={{ pathname: "..", search: searchParams.toString() }}
                >
                  {season.title}
                </Button>
              );
            })}
          </ButtonGroup>
        </Box>
      )}

      {(currentRole as ProjectRoleDto)?.participants && (
        <ProjectRolePortraits
          role={currentRole as ProjectRoleDto}
          portraitIdsTree={portraitIdsTree}
          subroles={
            currentViewType === "as_block_with_roles" ? subRoles : undefined
          }
          currentSeasonId={currentSeasonId}
        />
      )}

      {!!subRoles?.length && showSubroles && (
        <Box className="subroles-container">
          {subRoles?.map((childRole) => (
            <ProjectSubrole
              key={childRole?.id}
              role={childRole}
              portraitIdsTree={portraitIdsTree}
              currentSeasonId={currentSeasonId}
            />
          ))}
        </Box>
      )}
    </Box>
  );
};
