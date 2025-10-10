import Menu from "@mui/icons-material/Menu";
import { headerStyles } from "./header.styles";
import { MfLogo } from "@components/mfLogo/MfLogo";
import {
  AppBar,
  Box,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  Toolbar,
} from "@mui/material";
import React, { useMemo } from "react";
import { Sidemenu } from "@core/sidemenu/Sidemenu";
import { useGlobalStore } from "@src/store/global.store";
import { selectPage } from "@src/store/pages.store";
import { DefaultPageDto } from "@models/page/default-page-dto.model";
import { ElevationScroll } from "./components/ElevationScroll";
import { selectMenues } from "@src/store/configuration.store";
import { isValidArray } from "@utils/functions/isValidArray";
import { Link, useLocation } from "react-router";

export const Header = () => {
  const [sidemenuOpen, setSidemenuOpen] = React.useState(false);

  const location = useLocation();
  const currentPath = location.pathname;
  const loadedPage = useGlobalStore(selectPage(currentPath));
  const page = loadedPage?.data as DefaultPageDto;
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
          role="header"
          position={supportsTranslucentHeader ? "fixed" : "sticky"}
          color="dark"
          elevation={0}
          sx={headerStyles}
          enableColorOnDark
        >
          <Toolbar className="toolbar">
            <Box className="container-left">
              <Box component={Link} to="/" className="hide-when-translucent">
                <MfLogo color="dark"></MfLogo>
              </Box>
            </Box>

            <Box component="nav" className="container-middle"></Box>

            <Box component="nav" className="container-right">
              {isValidArray(primaryNavigation) &&
                !!primaryNavigation.length && (
                  <List className="nav-list">
                    {primaryNavigation.map((item, index) => (
                      <ListItem key={index} disablePadding>
                        <ListItemButton
                          component={Link}
                          to={{
                            pathname: item?.page?.url || item.link,
                            hash: item.section,
                          }}
                        >
                          <Box
                            component="span"
                            className="nav-item-title"
                            dangerouslySetInnerHTML={{
                              __html: item.title || item?.page?.title || "",
                            }}
                          />
                        </ListItemButton>
                      </ListItem>
                    ))}
                  </List>
                )}

              {setSidemenuOpen && (
                <IconButton onClick={() => setSidemenuOpen(true)}>
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
