import { CssVarsProvider } from '@mui/joy';

import CssBaseline from '@mui/joy/CssBaseline';
import { mfTheme } from './styles/mfTheme';
// import { TanStackRouterDevtools } from '@tanstack/router-devtools';
import { Layout } from '@core/Layout';
import { globalStyles } from '@styles/globalStyles';

export const App = () => {
  return (
    <>
      <CssVarsProvider theme={mfTheme}>
        <CssBaseline />
        {globalStyles}
        <Layout />
      </CssVarsProvider>
      {/* <TanStackRouterDevtools position="bottom-right" /> */}
    </>
  );
};
