import { Box } from "@mui/joy";
import { Outlet } from "@tanstack/react-router";
import * as React from "react";
import { ToastContainer } from "react-toastify";

import { Header } from "./header/Header";
import { Footer } from "./footer/Footer";
import { layoutStyles } from "./layout.styles";
import { Sidemenu } from "./sidemenu/Sidemenu";
import { useColorTheme } from "@utils/hooks/useColorTheme";
import { useGlobalStore } from "@src/store/global.store";
import { selectUserHash } from "@src/store/auth.store";

export const Layout = () => {
  const theme = useColorTheme();
  const userHash = useGlobalStore(selectUserHash);
  const [sidemenuOpen, setSidemenuOpen] = React.useState(false);

  return (
    <>
      <Box sx={layoutStyles} className={`main theme-${theme}`} key={userHash}>
        <Header setSidemenuOpen={setSidemenuOpen} sidemenuOpen={sidemenuOpen} />
        <Sidemenu
          setSidemenuOpen={setSidemenuOpen}
          sidemenuOpen={sidemenuOpen}
        />

        <Box className="main-content">
          <Outlet />
          <Footer />
        </Box>
      </Box>

      <ToastContainer theme={theme} />
    </>
  );
};
