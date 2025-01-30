import Menu from "@mui/icons-material/Menu";
import { headerStyles } from "./header.styles";
import { MfLogo } from "@components/mfLogo/MfLogo";
import { Link, useRouterState } from "@tanstack/react-router";
import {
  AppBar,
  Box,
  IconButton,
  Toolbar,
  useScrollTrigger,
} from "@mui/material";
import React, { ReactElement, useMemo } from "react";
import { Sidemenu } from "@core/sidemenu/Sidemenu";
import { useGlobalStore } from "@src/store/global.store";
import { selectPage } from "@src/store/pages.store";
import { DefaultPageDto } from "@models/page/default-page-dto.model";

export const ElevationScroll = ({
  children,
  supportsTranslucentHeader,
}: {
  children?: ReactElement;
  supportsTranslucentHeader?: boolean;
}) => {
  const trigger = useScrollTrigger({
    disableHysteresis: true,
    threshold: 100,
  });

  if (!supportsTranslucentHeader) {
    return children;
  }

  return children
    ? React.cloneElement(children, {
        // elevation: trigger ? 2 : 0,
        className: trigger ? "elevated" : "translucent",
      })
    : null;
};

export const Header = () => {
  const [sidemenuOpen, setSidemenuOpen] = React.useState(false);

  const router = useRouterState();
  const currentPath = router.location.pathname;
  const loadedPage = useGlobalStore(selectPage(currentPath));
  const page = loadedPage?.data as DefaultPageDto;

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
          // className={`color-${color || "default"}`}
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
