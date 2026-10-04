import { ProjectGeneralDataBlock } from "@models/project-dto.model";
import { ListItemIcon, ListItemText } from "@mui/material";
import { AppIcon } from "@components/appIcon/AppIcon";
import { useMemo } from "react";

export interface SidebarBoxGeneralItemContentProps {
  data: ProjectGeneralDataBlock;
}

export const SidebarBoxGeneralItemContent: React.FC<
  SidebarBoxGeneralItemContentProps
> = ({ data }) => {
  const icon = useMemo(() => {
    if (data.depth <= 0) {
      return "chevron-forward";
    }
    return "arrow-forward";
  }, [data?.depth]);

  return (
    <>
      <ListItemIcon>
        <AppIcon name={icon}></AppIcon>
      </ListItemIcon>

      <ListItemText>{data.label}</ListItemText>
    </>
  );
};
