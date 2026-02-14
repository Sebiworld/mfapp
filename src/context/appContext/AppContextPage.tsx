import { FC, ReactNode, useEffect } from "react";
import { useAppDispatchContext } from "./useAppDispatchContext";
import { initMatomo } from "@certible/use-matomo";
import { useGlobalStore } from "@src/store/global.store";
import { selectCurrentUser } from "@src/store/auth/auth.selectors";
import { useAppContext } from "./useAppContext";
import { Button, Link, Snackbar, Typography } from "@mui/material";
import { initializationStoreActions } from "@src/store/initialization/initialization.actions";

interface AppContextPageProps {
  children?: ReactNode;
}

export const AppContextPage: FC<AppContextPageProps> = ({ children }) => {
  const appDispatchContext = useAppDispatchContext();
  const currentUser = useGlobalStore(selectCurrentUser);
  const appContext = useAppContext();
  const areCookiesAllowed = useGlobalStore((state) => state.areCookiesAllowed);

  useEffect(() => {
    const trackingUrl = import.meta.env.VITE_TRACKING_URL;
    const siteId = import.meta.env.VITE_TRACKING_SITE_ID;

    if (!trackingUrl || !siteId || import.meta.env.DEV) {
      return;
    }

    const matomo = initMatomo({
      host: trackingUrl,
      siteId: siteId,
      requireCookieConsent: true,
    });

    appDispatchContext({ type: "SET_MATOMO_INSTANCE", payload: matomo });
  }, [appDispatchContext]);

  const isMatomoInitialized = !!appContext.matomoInstance;

  useEffect(() => {
    const matomo = appContext.matomoInstance;
    if (!matomo) {
      return;
    }

    if (!currentUser?.id) {
      matomo.setUserId(null);
      return;
    }

    matomo.setUserId(currentUser.id);
  }, [appContext.matomoInstance, currentUser?.id]);

  useEffect(() => {
    const matomo = appContext.matomoInstance;
    if (!matomo) {
      return;
    }

    if (areCookiesAllowed === null) {
      return;
    }

    if (areCookiesAllowed === true) {
      matomo.push(["setCookieConsentGiven"]);
      return;
    }

    if (areCookiesAllowed === false) {
      matomo.push(["forgetCookieConsentGiven"]);
      return;
    }
  }, [appContext.matomoInstance, areCookiesAllowed]);

  return (
    <>
      {children}
      {isMatomoInitialized && (
        <Snackbar
          color="contrast"
          anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
          open={areCookiesAllowed === null}
          message={
            <Typography variant="body1">
              Um unsere Webseite für dich optimal zu gestalten und fortlaufend
              verbessern zu können, verwenden wir Cookies. <br />
              <strong>Ist das in Ordnung für dich?</strong>
            </Typography>
          }
          action={
            <>
              <Button
                variant="contained"
                color="primary"
                onClick={() =>
                  initializationStoreActions.setAreCookiesAllowed(true)
                }
              >
                Ja
              </Button>
              <Button
                variant="contained"
                color="contrast"
                onClick={() =>
                  initializationStoreActions.setAreCookiesAllowed(false)
                }
              >
                Nein
              </Button>
              <span className="spacer"></span>
              <Link href="/datenschutz">mehr zum Datenschutz</Link>
            </>
          }
          slotProps={{
            clickAwayListener: {
              onClickAway: (event) => {
                // Prevent's default 'onClickAway' behavior.
                event.preventDefault();
              },
            },
          }}
        />
      )}
    </>
  );
};
