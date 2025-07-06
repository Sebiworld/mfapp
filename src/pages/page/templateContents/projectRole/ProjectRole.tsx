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

    return currentRoleLoadingStatus.data;
  }, [currentRoleLoadingStatus?.data]);

  const subRoles = useMemo(() => {
    if (!currentRole?.child_ids?.length) {
      return undefined;
    }

    return currentRole.child_ids.map((id) => projectRoles[id]?.data);
  }, [currentRole?.child_ids, projectRoles]);

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

  if (isLoading) {
    return;
  }

  return (
    <Box
      className="project-role"
      data-testid="project-role"
      sx={projectRoleStyles}
    >
      <ProjectRolePortraits
        role={currentRole}
        portraitIdsTree={portraitIdsTree}
      />

      {!!subRoles?.length && (
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

      {/* TODO: Children. Portraits per child or group image, if group_type dictates it. */}
    </Box>
  );
};
