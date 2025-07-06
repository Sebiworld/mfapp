import { ProjectRoleDto } from "@models/project-role/project-role-dto.model";
import { Box, Button, Typography } from "@mui/material";
import { FC } from "react";
import { ProjectRolePortraits } from "./ProjectRolePortraits";

interface ProjectSubroleProps {
  role?: ProjectRoleDto;
  portraitIdsTree?: Map<number, Map<number, Set<number>>>;
  currentSeasonId?: number;
}

export const ProjectSubrole: FC<ProjectSubroleProps> = ({
  role,
  portraitIdsTree,
  currentSeasonId,
}) => {
  return (
    <Box data-testid="project-subrole" className="project-subrole">
      {role?.title && (
        <Typography
          variant="h3"
          className="subrole-title"
          dangerouslySetInnerHTML={{ __html: role.title }}
        ></Typography>
      )}

      {role?.description && (
        <Box
          className="subrole-description content-block"
          dangerouslySetInnerHTML={{ __html: role.description }}
        ></Box>
      )}

      {role?.url && (
        <Box className="subrole-actions">
          <Button
            variant="contained"
            color="contrast"
            size="small"
            href={role?.url}
          >
            Rollenbeschreibung
          </Button>
        </Box>
      )}

      <ProjectRolePortraits
        role={role}
        portraitIdsTree={portraitIdsTree}
        currentSeasonId={currentSeasonId}
      />
    </Box>
  );
};
