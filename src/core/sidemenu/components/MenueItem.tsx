import { Box, ListItem, ListItemButton, ListItemIcon } from "@mui/material";
import { NavigationItemDto } from "@models/navigation-item-dto.model";
import { AppIcon } from "@components/appIcon/AppIcon";
import { Link } from "react-router";
import { parseHtml } from "@utils/functions/parseHtml";
import { useMemo } from "react";

export interface MenueItemProps {
  item: NavigationItemDto;
  onClick?: () => void;
}

export const MenueItem = ({ item, onClick }: MenueItemProps) => {
  const title = useMemo(() => {
    if (!item.title) {
      return null;
    }

    return parseHtml(item.title);
  }, [item.title]);

  return (
    <ListItem>
      <ListItemButton
        component={Link}
        to={{ pathname: item?.page?.url || item.link, hash: item.section }}
        onClick={onClick}
      >
        {item.ionicon && (
          <ListItemIcon>
            <AppIcon name={item.ionicon}></AppIcon>
          </ListItemIcon>
        )}
        <Box component="span" className="nav-item-title">
          {title}
        </Box>
      </ListItemButton>
    </ListItem>
  );
};
