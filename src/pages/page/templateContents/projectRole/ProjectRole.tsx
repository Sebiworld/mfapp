import { FC, useEffect, useMemo } from "react";
import { useGlobalStore } from "@src/store/global.store";
import { Box } from "@mui/material";
import { projectRoleStyles } from "./projectRole.styles";
import {
  selectLoadProjectRoles,
  selectProjectRoles,
} from "@src/store/projectRoles.store";
import { ProjectRolePortraits } from "./components/ProjectRolePortraits";
import { getPortraitIdsTree } from "./functions/getPortraitIdsTree";
import { ProjectSubrole } from "./components/ProjectSubrole";
import { ProjectRoleDto } from "@models/project-role/project-role-dto.model";

interface ProjectRoleProps {
  id?: number;
}

export const ProjectRole: FC<ProjectRoleProps> = ({ id }) => {
  const projectRoles = useGlobalStore(selectProjectRoles);
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

    console.log("ROLE", currentRoleLoadingStatus.data);
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

  const portraitIdsTree = useMemo(
    () => getPortraitIdsTree(currentRole, projectRoles),
    [currentRole, projectRoles]
  );

  useEffect(() => {
    console.log("portraitIdsTree", portraitIdsTree);
  }, [portraitIdsTree]);

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

  const showSubroles = useMemo(() => {
    if (!currentRole?.view_type) {
      return true;
    }

    return [
      "as_block",
      // "as_block_with_roles",
      "subroles_teaser",
      "by_cast",
      "as_cast_block",
    ].includes(currentRole?.view_type);
  }, [currentRole?.view_type]);

  if (isLoading) {
    return;
  }

  // TODO: Season selection

  return (
    <Box
      className="project-role"
      data-testid="project-role"
      sx={projectRoleStyles}
    >
      {/* On view_type "as_block_with_roles": Show Portraits of subroles with their assigned roles */}
      <ProjectRolePortraits
        role={currentRole}
        portraitIdsTree={portraitIdsTree}
        subroles={
          currentRole?.view_type === "as_block_with_roles"
            ? subRoles
            : undefined
        }
      />

      {!!subRoles?.length && showSubroles && (
        <Box className="subroles-container">
          {subRoles?.map((childRole) => (
            <ProjectSubrole
              key={childRole?.id}
              role={childRole}
              portraitIdsTree={portraitIdsTree}
            />
          ))}
        </Box>
      )}
    </Box>
  );
};
