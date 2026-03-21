import { Box, ListItem, ListItemButton } from "@mui/material";
import { Link as RouterLink } from "react-router";
import { parseHtml } from "@utils/functions/parseHtml";
import { NavigationItemDto } from "@models/navigation-item-dto.model";
import { useMemo } from "react";

export interface ToolbarNavItemProps {
  item: NavigationItemDto;
}

export const ToolbarNavItem: React.FC<ToolbarNavItemProps> = ({ item }) => {
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
          pathname: item?.page?.url || item.link || "/",
          hash: item.section,
        }}
      >
        <Box component="span" className="nav-item-title">
          {title}
        </Box>
      </ListItemButton>
    </ListItem>
  );
};
