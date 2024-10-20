import { ProjectGeneralDataBlock } from "@models/project-dto.model";
import { Box, List, ListItem, ListItemDecorator, Typography } from "@mui/joy";
import { useTranslation } from "react-i18next";
import { isValidArray } from "@utils/functions/isValidArray";
import { IonIcon } from "@ionic/react";
import { arrowForward, chevronForward } from "ionicons/icons";
import { sidebarBoxGeneralStyles } from "./sidebarBoxGeneral.styles";

export interface SidebarBoxGeneralProps {
  data?: ProjectGeneralDataBlock[];
}

export const SidebarBoxGeneral: React.FC<SidebarBoxGeneralProps> = ({
  data,
}) => {
  const { t } = useTranslation();

  if (!isValidArray(data) || !data.length) {
    return null;
  }

  return (
    <Box
      className="sidebar-box sidebar-box-general"
      data-testid="sidebar-box-general"
      sx={sidebarBoxGeneralStyles}
    >
      <Typography className="box-title" level="h3">
        {t("project.general_data")}
      </Typography>

      <List component="ul">
        {data.map((item) => {
          let icon = chevronForward;
          if (item.depth >= 1) {
            icon = arrowForward;
          }

          return (
            <ListItem key={item.id} className={`list-item level-${item.depth}`}>
              <ListItemDecorator>
                <IonIcon aria-hidden="true" icon={icon}></IonIcon>
              </ListItemDecorator>

              {item.label}
            </ListItem>
          );
        })}
      </List>
    </Box>
  );
};
