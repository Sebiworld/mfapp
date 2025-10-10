import { Box, ListItem, ListItemButton, ListItemIcon } from "@mui/material";
import { NavigationItemDto } from "@models/navigation-item-dto.model";
import { IonIcon } from "@ionic/react";
import { Link } from "react-router";

export interface MenueItemProps {
  item: NavigationItemDto;
}

export const MenueItem = ({ item }: MenueItemProps) => {
  return (
    <ListItem>
      <ListItemButton
        component={Link}
        to={{ pathname: item?.page?.url || item.link, hash: item.section }}
      >
        {item.ionicon && (
          <ListItemIcon>
            <IonIcon aria-hidden="true" icon={item.ionicon}></IonIcon>
          </ListItemIcon>
        )}
        <Box
          component="span"
          className="nav-item-title"
          dangerouslySetInnerHTML={{
            __html: item.title || item?.page?.title || "",
          }}
        />
      </ListItemButton>
    </ListItem>
  );
};
