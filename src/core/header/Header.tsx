import Menu from "@mui/icons-material/Menu";
import { headerStyles } from "./header.styles";
import { MfLogo } from "@components/mfLogo/MfLogo";
import { AppBar, Box, IconButton, List, Toolbar } from "@mui/material";
import React, { useMemo } from "react";
import { Sidemenu } from "@core/sidemenu/Sidemenu";
import { useGlobalStore } from "@src/store/global.store";
import { DefaultPageDto } from "@models/page/default-page-dto.model";
import { ElevationScroll } from "./components/ElevationScroll";
import { isValidArray } from "@utils/functions/isValidArray";
import { Link, useLocation } from "react-router";
import { selectPage } from "@src/store/pages/pages.selectors";
import { selectMenues } from "@src/store/configuration/configuration.selectors";
import { ToolbarNavItem } from "@components/ToolbarNavItem";

export const Header = () => {
  const [sidemenuOpen, setSidemenuOpen] = React.useState(false);

  const location = useLocation();
  const currentPath = location.pathname;
  const loadedPage = useGlobalStore(selectPage(currentPath));
  const page = loadedPage as DefaultPageDto;
  const loadedMenues = useGlobalStore(selectMenues);
  const primaryNavigation = loadedMenues?.main_navigation;

  const supportsTranslucentHeader = useMemo(() => {
    return page?.sections?.[0]?.type === "hero";
  }, [page?.sections]);

  return (
    <>
      <ElevationScroll supportsTranslucentHeader={supportsTranslucentHeader}>
        <AppBar
          component="header"
          position={supportsTranslucentHeader ? "fixed" : "sticky"}
          color="dark"
          elevation={0}
          sx={headerStyles}
          enableColorOnDark
        >
          <Toolbar className="toolbar">
            <Box className="container-left">
              <Box
                component={Link}
                to="/"
                className="logo hide-when-translucent"
                title="Zur Startseite"
              >
                <MfLogo color="dark"></MfLogo>
              </Box>
            </Box>

            <Box component="nav" className="container-middle"></Box>

            <Box component="nav" className="container-right">
              {isValidArray(primaryNavigation) &&
                !!primaryNavigation.length && (
                  <List className="nav-list">
                    {primaryNavigation.map((item, index) => (
                      <ToolbarNavItem key={index} item={item} />
                    ))}
                  </List>
                )}

              {setSidemenuOpen && (
                <IconButton
                  title="Menü öffnen"
                  onClick={() => setSidemenuOpen(true)}
                >
                  <Menu />
                </IconButton>
              )}
            </Box>
          </Toolbar>
        </AppBar>
      </ElevationScroll>

      <Sidemenu setSidemenuOpen={setSidemenuOpen} sidemenuOpen={sidemenuOpen} />
    </>
  );
};
