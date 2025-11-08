import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import "dayjs/locale/de";
import { ThemeProvider, THEME_ID } from "@mui/material/styles";

import { Layout } from "@core/Layout";
import { SplashScreen } from "@core/splashScreen/SplashScreen";
import { GlobalStylesElement } from "@styles/global/GlobalStylesElement";

import "react-toastify/dist/ReactToastify.css";
import { useGlobalStore } from "./store/global.store";
import { selectIsInitialized } from "./store/initialization/initialization.selectors";
import { useEffect } from "react";
import { useHandleRegistrationConfirm } from "@utils/hooks/useHandleRegistrationConfirm";
import { mfTheme } from "@styles/theme/mfTheme";
import { CssBaseline } from "@mui/material";

import * as ionIcons from "ionicons/icons";
import { addIcons } from "ionicons";
import { ScrollRestoration } from "react-router";
import { initializationStoreActions } from "./store/initialization/initialization.actions";
addIcons(ionIcons);

export const App = () => {
  const isInitialized = useGlobalStore(selectIsInitialized);
  useHandleRegistrationConfirm();

  // TODO: Modal mit Konfetti nach Registrierung

  useEffect(() => {
    void initializationStoreActions.initializeApp();
  }, []);

  return (
    <>
      <ThemeProvider theme={{ [THEME_ID]: mfTheme }} noSsr defaultMode="light">
        <CssBaseline />
        <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="de">
          <GlobalStylesElement></GlobalStylesElement>
          <ScrollRestoration />
          <Layout />
          <SplashScreen visible={!isInitialized}></SplashScreen>
        </LocalizationProvider>
      </ThemeProvider>
    </>
  );
};
