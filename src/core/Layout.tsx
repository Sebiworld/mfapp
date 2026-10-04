import { ToastContainer } from "react-toastify";

import { Header } from "./header/Header";
import { Footer } from "./footer/Footer";
import { layoutStyles } from "./layout.styles";
import { useColorTheme } from "@utils/hooks/useColorTheme";
import { useGlobalStore } from "@src/store/global.store";
import { Box } from "@mui/material";
import { Outlet } from "react-router";
import { selectSessionVersion } from "@src/store/initialization/initialization.selectors";
import { TranslucentHeaderContext } from "./header/useTranslucentHeader";
import { useMemo, useState } from "react";

/**
 * App shell with header, page content and footer.
 * Header (menu and login dialogs) and page content start over when the session changes (login, logout, ended
 * session): their component state may hold data or dialogs of the previous account. Setting the user of the
 * same session, e.g. on the first visit, keeps them.
 * The fixed header covers the top of the content; below a translucent header (the shown page starts with a hero,
 * see `useShowPageBelowHeader`) the content starts right at the top, otherwise the layout keeps room for it.
 * @returns The layout around the current route.
 */
export const Layout = () => {
  const theme = useColorTheme();
  const sessionVersion = useGlobalStore(selectSessionVersion);
  const [isHeaderTranslucent, setHeaderTranslucent] = useState(false);
  const translucentHeader = useMemo(
    () => ({
      isTranslucent: isHeaderTranslucent,
      setTranslucent: setHeaderTranslucent,
    }),
    [isHeaderTranslucent]
  );

  return (
    <TranslucentHeaderContext.Provider value={translucentHeader}>
      <Box sx={layoutStyles} className={`main theme-${theme}`}>
        <Header key={`header-${sessionVersion}`} />

        <Box
          className={`main-content${isHeaderTranslucent ? " below-translucent-header" : ""}`}
          id="top"
        >
          <Outlet key={`content-${sessionVersion}`} />
          <Footer />
        </Box>
      </Box>

      <ToastContainer theme={theme} />
    </TranslucentHeaderContext.Provider>
  );
};
