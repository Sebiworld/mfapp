import {
  ProjectPortraitDto,
  ProjectPortraitWithRoles,
} from "@models/project-role/project-portrait-dto.model";

import { CardActionArea } from "@mui/material";
import { FC } from "react";
import { Link } from "react-router";

interface ProjectRolePortraitActionWrapperProps {
  portrait: ProjectPortraitWithRoles | ProjectPortraitDto;
  children?: React.ReactNode;
}

export const ProjectRolePortraitActionWrapper: FC<
  ProjectRolePortraitActionWrapperProps
> = ({ portrait, children }) => {
  if (!portrait?.url) {
    return <CardActionArea>{children}</CardActionArea>;
  }

  return (
    <CardActionArea component={Link} to={portrait.url}>
      {children}
    </CardActionArea>
  );
};
