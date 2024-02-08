import { CssVarsProvider } from '@mui/joy';

import CssBaseline from '@mui/joy/CssBaseline';
import { mfTheme } from './styles/mfTheme';
// import { TanStackRouterDevtools } from '@tanstack/router-devtools';
import { Layout } from '@core/Layout';

export const App = () => {
  return (
    <>
      <CssVarsProvider theme={mfTheme}>
        <CssBaseline />
        <Layout />
      </CssVarsProvider>
      {/* <TanStackRouterDevtools position="bottom-right" /> */}
    </>
  );
};
