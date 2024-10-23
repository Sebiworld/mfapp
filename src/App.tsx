import { CssVarsProvider } from "@mui/joy";

import CssBaseline from "@mui/joy/CssBaseline";
import { Layout } from "@core/Layout";
import { useInitializeApp } from "@utils/hooks/useInitializeApp";
import { SplashScreen } from "@core/splashScreen/SplashScreen";
import { mfTheme } from "@styles/theme/mfTheme";
import { GlobalStylesElement } from "@styles/global/GlobalStylesElement";
import { useHandleStartup } from "@utils/hooks/useHandleStartup";

import "react-toastify/dist/ReactToastify.css";

export const App = () => {
  const { isInitialized } = useInitializeApp();
  const { modalComponent } = useHandleStartup({ isInitialized });

  return (
    <>
      <CssVarsProvider theme={mfTheme}>
        <CssBaseline />
        <GlobalStylesElement></GlobalStylesElement>
        <Layout />
        <SplashScreen visible={!isInitialized}></SplashScreen>

        {modalComponent}
      </CssVarsProvider>
    </>
  );
};
