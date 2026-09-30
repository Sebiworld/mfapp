import { ProjectPortraitWithRoles } from "@models/project-role/project-portrait-dto.model";
import { CastDto } from "@models/utility-types/performance-dto.model";
import { Box, Typography } from "@mui/material";
import { FC } from "react";
import { ProjectRolePortrait } from "./ProjectRolePortrait";

export interface ProjectRoleCastColumn {
  cast: CastDto;
  portraits: ProjectPortraitWithRoles[];
}

interface ProjectRoleCastColumnsProps {
  columns: ProjectRoleCastColumn[];
}

/**
 * Shows one equally wide column per cast, headed by the cast name. Works for any number of columns;
 * on narrow screens the columns stay side by side and the container scrolls horizontally.
 * @param columns Casts with the portraits to show below each cast name.
 */
export const ProjectRoleCastColumns: FC<ProjectRoleCastColumnsProps> = ({
  columns,
}) => {
  return (
    <Box
      data-testid="project-role-cast-columns"
      className={`casts-container casts-${columns.length}`}
    >
      {columns.map((column) => (
        <Box
          className="cast"
          data-testid="project-role-cast"
          key={column.cast.id}
        >
          <Typography className="cast-title">{column.cast.title}</Typography>

          <Box className="portraits-container">
            {column.portraits.map((portrait) => (
              <ProjectRolePortrait
                key={portrait.id}
                portrait={portrait}
              ></ProjectRolePortrait>
            ))}
          </Box>
        </Box>
      ))}
    </Box>
  );
};
