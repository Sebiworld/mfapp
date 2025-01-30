import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { ThemeProvider, THEME_ID } from "@mui/material/styles";

import { Layout } from "@core/Layout";
import { SplashScreen } from "@core/splashScreen/SplashScreen";
import { GlobalStylesElement } from "@styles/global/GlobalStylesElement";

import "react-toastify/dist/ReactToastify.css";
import { useGlobalStore } from "./store/global.store";
import {
  selectInitializeApp,
  selectIsInitialized,
} from "./store/initialization.store";
import { useEffect } from "react";
import { useHandleRegistrationConfirm } from "@utils/hooks/useHandleRegistrationConfirm";
import { mfTheme } from "@styles/theme/mfTheme";
import { CssBaseline } from "@mui/material";

export const App = () => {
  const isInitialized = useGlobalStore(selectIsInitialized);
  const initializeApp = useGlobalStore(selectInitializeApp);
  useHandleRegistrationConfirm();

  useEffect(() => {
    if (!initializeApp || typeof initializeApp !== "function") {
      return;
    }

    void initializeApp();
  }, [initializeApp]);

  return (
    <>
      <ThemeProvider theme={{ [THEME_ID]: mfTheme }}>
        <CssBaseline />
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <GlobalStylesElement></GlobalStylesElement>
          <Layout />
          <SplashScreen visible={!isInitialized}></SplashScreen>
        </LocalizationProvider>
      </ThemeProvider>
    </>
  );
};
