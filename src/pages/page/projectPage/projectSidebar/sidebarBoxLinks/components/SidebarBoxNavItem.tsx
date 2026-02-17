import {
  Box,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import { Link as RouterLink } from "react-router";
import { parseHtml } from "@utils/functions/parseHtml";
import { NavigationItemDto } from "@models/navigation-item-dto.model";
import { useMemo } from "react";
import { link } from "ionicons/icons";
import { IonIcon } from "@ionic/react";

export interface SidebarBoxNavItemProps {
  item: NavigationItemDto;
  onClick?: () => void;
}

export const SidebarBoxNavItem: React.FC<SidebarBoxNavItemProps> = ({
  item,
  onClick,
}) => {
  const title = useMemo(() => {
    if (!item.title && !item?.page?.title) {
      return null;
    }

    return parseHtml(item.title || item?.page?.title);
  }, [item.title, item?.page?.title]);

  return (
    <ListItem disablePadding>
      <ListItemButton
        component={RouterLink}
        to={{
          pathname: item?.page?.url || item.link,
          hash: item.section,
        }}
        onClick={onClick}
      >
        <ListItemIcon>
          <IonIcon aria-hidden="true" icon={link}></IonIcon>
        </ListItemIcon>

        <ListItemText>
          <Box component="span" className="nav-item-title">
            {title}
          </Box>
        </ListItemText>
      </ListItemButton>
    </ListItem>
  );
};
