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
import { CssBaseline, Typography } from "@mui/material";

import * as ionIcons from "ionicons/icons";
import { addIcons } from "ionicons";
import { ScrollRestoration } from "react-router";
import { useInitialization } from "@api/hooks/useInitialization";
import { selectIsMaintenanceModeActive } from "./store/configuration/configuration.selectors";
import { AppContextPage } from "./context/appContext/AppContextPage";
addIcons(ionIcons);

export const App = () => {
  const isInitialized = useGlobalStore(selectIsInitialized);
  useHandleRegistrationConfirm();

  const isMaintenanceModeActive = useGlobalStore(selectIsMaintenanceModeActive);

  const { initialize } = useInitialization();

  useEffect(() => {
    void initialize();
  }, [initialize]);

  return (
    <>
      <AppContextPage />

      <ThemeProvider theme={{ [THEME_ID]: mfTheme }} noSsr defaultMode="light">
        <CssBaseline />
        <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="de">
          <GlobalStylesElement></GlobalStylesElement>
          <ScrollRestoration />

          {!isMaintenanceModeActive && <Layout />}

          <SplashScreen visible={!isInitialized}></SplashScreen>

          <SplashScreen
            visible={isMaintenanceModeActive}
            showProgressBar={false}
            message={
              <>
                <Typography variant="h6" className="title">
                  Kurze Pause - Wir sind gleich wieder für dich da.
                </Typography>
                <Typography variant="body1">
                  Wir führen gerade wichtige Updates durch. Bitte versuch es in
                  einigen Minuten erneut. (Die Musical-Fabrik Website befindet
                  sich gerade im Wartungsmodus.)
                </Typography>
              </>
            }
          ></SplashScreen>
        </LocalizationProvider>
      </ThemeProvider>
    </>
  );
};
