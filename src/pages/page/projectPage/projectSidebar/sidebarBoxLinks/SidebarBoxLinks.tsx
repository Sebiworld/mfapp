import { useTranslation } from "react-i18next";
import { isValidArray } from "@utils/functions/isValidArray";
import { Box, List, Typography } from "@mui/material";
import { NavigationItemDto } from "@models/navigation-item-dto.model";
import { sidebarBoxLinksStyles } from "./sidebarBoxLinks.styles";
import { SidebarBoxNavItem } from "./components/SidebarBoxNavItem";

export interface SidebarBoxLinksProps {
  navItems?: NavigationItemDto[];
  showTitle?: boolean;
  onClose?: () => void;
}

export const SidebarBoxLinks: React.FC<SidebarBoxLinksProps> = ({
  navItems,
  showTitle,
  onClose,
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
      {showTitle !== false && (
        <Typography className="box-title" variant="h3">
          {t("project.links")}
        </Typography>
      )}

      <List className="nav-list" component="ul">
        {navItems.map((item, index) => (
          <SidebarBoxNavItem key={index} item={item} onClick={onClose} />
        ))}
      </List>
    </Box>
  );
};
