import { Typography } from "@mui/material";
import { parseHtml } from "@utils/functions/parseHtml";
import { useMemo } from "react";
import { ProjectRoleDto } from "@models/project-role/project-role-dto.model";

export interface ProjectRolePortraitDescriptionItemProps {
  item: ProjectRoleDto;
}

export const ProjectRolePortraitDescriptionItem: React.FC<
  ProjectRolePortraitDescriptionItemProps
> = ({ item }) => {
  const title = useMemo(() => {
    if (!item.title) {
      return null;
    }

    return parseHtml(item.title);
  }, [item.title]);

  if (!item.id || !title) {
    return null;
  }

  return <Typography className="portrait-role">{title}</Typography>;
};
