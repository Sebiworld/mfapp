import { CssVarsProvider } from "@mui/joy";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import {
  ThemeProvider as MaterialThemeProvider,
  THEME_ID as MATERIAL_THEME_ID,
} from "@mui/material/styles";

import CssBaseline from "@mui/joy/CssBaseline";
import { Layout } from "@core/Layout";
import { SplashScreen } from "@core/splashScreen/SplashScreen";
import { mfTheme } from "@styles/theme/mfTheme";
import { GlobalStylesElement } from "@styles/global/GlobalStylesElement";

import "react-toastify/dist/ReactToastify.css";
import { useGlobalStore } from "./store/global.store";
import {
  selectInitializeApp,
  selectIsInitialized,
} from "./store/initialization.store";
import { useEffect } from "react";
import { mfMaterialTheme } from "@styles/theme/mfMaterialTheme";
import { useHandleRegistrationConfirm } from "@utils/hooks/useHandleRegistrationConfirm";

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
      <MaterialThemeProvider theme={{ [MATERIAL_THEME_ID]: mfMaterialTheme }}>
        <CssVarsProvider theme={mfTheme}>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <CssBaseline />
            <GlobalStylesElement></GlobalStylesElement>
            <Layout />
            <SplashScreen visible={!isInitialized}></SplashScreen>
          </LocalizationProvider>
        </CssVarsProvider>
      </MaterialThemeProvider>
    </>
  );
};
