import Menu from "@mui/icons-material/Menu";
import { headerStyles } from "./header.styles";
import { MfLogo } from "@components/mfLogo/MfLogo";
import { AppBar, Box, IconButton, List, Toolbar } from "@mui/material";
import React, { useLayoutEffect, useRef } from "react";
import { Sidemenu } from "@core/sidemenu/Sidemenu";
import { useGlobalStore } from "@src/store/global.store";
import { ElevationScroll } from "./components/ElevationScroll";
import { isValidArray } from "@utils/functions/isValidArray";
import { Link } from "react-router";
import { selectMenues } from "@src/store/configuration/configuration.selectors";
import { ToolbarNavItem } from "@components/ToolbarNavItem";
import { useTranslucentHeader } from "./useTranslucentHeader";

/**
 * App header with logo, main navigation and the side menu.
 * It is always fixed, so switching to the translucent variant over a hero does not move the content. On every
 * other page the layout keeps room for it, using the height the header publishes as `--header-height` on its
 * parent element (it depends on the navigation, e.g. taller with the main navigation from `md`).
 * @returns The header and the side menu.
 */
export const Header = () => {
  const [sidemenuOpen, setSidemenuOpen] = React.useState(false);
  const headerRef = useRef<HTMLDivElement>(null);

  // Runs before the first paint, so the content never shows up with a wrong offset.
  useLayoutEffect(() => {
    const header = headerRef.current;
    const shell = header?.parentElement;

    if (!header || !shell) {
      return;
    }

    const publishHeight = () => {
      shell.style.setProperty("--header-height", `${header.offsetHeight}px`);
    };

    publishHeight();

    if (typeof ResizeObserver === "undefined") {
      return;
    }

    const observer = new ResizeObserver(publishHeight);
    observer.observe(header);

    return () => {
      observer.disconnect();
    };
  }, []);

  const loadedMenues = useGlobalStore(selectMenues);
  const primaryNavigation = loadedMenues?.main_navigation;

  const supportsTranslucentHeader = useTranslucentHeader();

  return (
    <>
      <ElevationScroll supportsTranslucentHeader={supportsTranslucentHeader}>
        <AppBar
          ref={headerRef}
          component="header"
          position="fixed"
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

            <Box className="container-middle"></Box>

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
