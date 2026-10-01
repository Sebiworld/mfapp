import { FC, useEffect, useState } from "react";
import { Box, Button, CssBaseline, Link, Typography } from "@mui/material";
import { THEME_ID, ThemeProvider } from "@mui/material/styles";
import { useRouteError } from "react-router";
import { useTranslation } from "react-i18next";
import { mfTheme } from "@styles/theme/mfTheme";
import {
  isLoadError,
  reloadOnceForLoadError,
} from "@utils/functions/reloadOnLoadError";
import { errorPageStyles } from "./errorPage.styles";

/**
 * Error page for the root route. Replaces the app shell, so it brings its own theme. A failed code load
 * (new version deployed while the tab was open) reloads the page once; everything else, and a load error
 * that persists, shows a friendly message with a reload button.
 */
export const ErrorPage: FC = () => {
  const { t } = useTranslation();
  const error = useRouteError();
  // Started once per page load; the helper's guard makes a repeated call (strict mode) harmless.
  const [isReloading] = useState(
    () => isLoadError(error) && reloadOnceForLoadError()
  );

  useEffect(() => {
    if (import.meta.env.DEV) {
      console.error(error);
    }
  }, [error]);

  if (isReloading) {
    return null;
  }

  return (
    <ThemeProvider theme={{ [THEME_ID]: mfTheme }} noSsr defaultMode="light">
      <CssBaseline />
      <Box sx={errorPageStyles} data-testid="error-page" role="alert">
        <Typography variant="h4" component="h1">
          {t("load_error.heading")}
        </Typography>
        <Typography variant="body1">{t("load_error.text")}</Typography>
        <Button
          variant="contained"
          onClick={() => window.location.reload()}
          data-testid="error-page-reload"
        >
          {t("load_error.reload")}
        </Button>
        <Link href="/">{t("load_error.home")}</Link>
      </Box>
    </ThemeProvider>
  );
};
