import { useTranslation } from "react-i18next";
import { isValidArray } from "@utils/functions/isValidArray";
import {
  Box,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Typography,
} from "@mui/material";
import { NavigationItemDto } from "@models/navigation-item-dto.model";
import { sidebarBoxLinksStyles } from "./sidebarBoxLinks.styles";
import { IonIcon } from "@ionic/react";
import { link } from "ionicons/icons";
import { Link } from "react-router";

export interface SidebarBoxLinksProps {
  navItems?: NavigationItemDto[];
}

export const SidebarBoxLinks: React.FC<SidebarBoxLinksProps> = ({
  navItems,
}) => {
  const { t } = useTranslation();

  if (!isValidArray(navItems) || !navItems.length) {
    return null;
  }

  return (
    <Box
      className="sidebar-box sidebar-box-general"
      data-testid="sidebar-box-general"
      sx={sidebarBoxLinksStyles}
    >
      <Typography className="box-title" variant="h3">
        {t("project.links")}
      </Typography>

      <List className="nav-list" component="ul">
        {navItems.map((item, index) => (
          <ListItem key={index} disablePadding>
            <ListItemButton
              component={Link}
              to={{
                pathname: item?.page?.url || item.link,
                hash: item.section,
              }}
            >
              <ListItemIcon>
                <IonIcon aria-hidden="true" icon={link}></IonIcon>
              </ListItemIcon>

              <ListItemText>
                <Box
                  component="span"
                  className="nav-item-title"
                  dangerouslySetInnerHTML={{
                    __html: item.title || item?.page?.title || "",
                  }}
                />
              </ListItemText>
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Box>
  );
};
