import { ToastContainer } from "react-toastify";

import { Header } from "./header/Header";
import { Footer } from "./footer/Footer";
import { layoutStyles } from "./layout.styles";
import { useColorTheme } from "@utils/hooks/useColorTheme";
import { useGlobalStore } from "@src/store/global.store";
import { Box } from "@mui/material";
import { Outlet } from "react-router";
import { selectUserHash } from "@src/store/auth/auth.selectors";

export const Layout = () => {
  const theme = useColorTheme();
  const userHash = useGlobalStore(selectUserHash);

  return (
    <>
      <Box sx={layoutStyles} className={`main theme-${theme}`} key={userHash}>
        <Header />

        <Box className="main-content" id="top">
          <Outlet />
          <Footer />
        </Box>
      </Box>

      <ToastContainer theme={theme} />
    </>
  );
};
