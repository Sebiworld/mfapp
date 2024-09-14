import { CssVarsProvider } from "@mui/joy";

import CssBaseline from "@mui/joy/CssBaseline";
import { Layout } from "@core/Layout";
import { useInitializeApp } from "@utils/hooks/useInitializeApp";
import { SplashScreen } from "@core/splashScreen/SplashScreen";
import { mfTheme } from "@styles/theme/mfTheme";
import { GlobalStylesElement } from "@styles/global/GlobalStylesElement";

export const App = () => {
  const { isInitialized } = useInitializeApp();
  return (
    <>
      <CssVarsProvider theme={mfTheme}>
        <CssBaseline />
        {GlobalStylesElement}
        <Layout />
        <SplashScreen visible={!isInitialized}></SplashScreen>
      </CssVarsProvider>
    </>
  );
};
