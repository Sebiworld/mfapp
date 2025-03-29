import { ProjectGeneralDataBlock } from "@models/project-dto.model";
import { ListItemIcon, ListItemText } from "@mui/material";
import { IonIcon } from "@ionic/react";
import { arrowForward, chevronForward } from "ionicons/icons";
import { useMemo } from "react";

export interface SidebarBoxGeneralItemContentProps {
  data: ProjectGeneralDataBlock;
}

export const SidebarBoxGeneralItemContent: React.FC<
  SidebarBoxGeneralItemContentProps
> = ({ data }) => {
  const icon = useMemo(() => {
    if (data.depth <= 0) {
      return chevronForward;
    }
    return arrowForward;
  }, [data?.depth]);

  return (
    <>
      <ListItemIcon>
        <IonIcon aria-hidden="true" icon={icon}></IonIcon>
      </ListItemIcon>

      <ListItemText>{data.label}</ListItemText>
    </>
  );
};
