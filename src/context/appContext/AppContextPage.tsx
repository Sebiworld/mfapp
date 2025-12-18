import { FC, ReactNode, useEffect } from "react";
import { useAppDispatchContext } from "./useAppDispatchContext";
import { initMatomo } from "@certible/use-matomo";
import { useGlobalStore } from "@src/store/global.store";
import { selectCurrentUser } from "@src/store/auth/auth.selectors";
import { useAppContext } from "./useAppContext";

interface AppContextPageProps {
  children?: ReactNode;
}

export const AppContextPage: FC<AppContextPageProps> = ({ children }) => {
  const appDispatchContext = useAppDispatchContext();
  const currentUser = useGlobalStore(selectCurrentUser);
  const appContext = useAppContext();

  useEffect(() => {
    const trackingUrl = import.meta.env.VITE_TRACKING_URL;
    const siteId = import.meta.env.VITE_TRACKING_SITE_ID;

    if (!trackingUrl || !siteId || import.meta.env.DEV) {
      return;
    }

    const matomo = initMatomo({
      host: trackingUrl,
      siteId: siteId,
    });

    appDispatchContext({ type: "SET_MATOMO_INSTANCE", payload: matomo });
  }, [appDispatchContext]);

  useEffect(() => {
    const matomo = appContext.matomoInstance;
    if (!matomo) {
      return;
    }

    if (!currentUser?.data?.id) {
      matomo.setUserId(null);
      return;
    }

    matomo.setUserId(currentUser.data.id);
  }, [appContext.matomoInstance, currentUser?.data?.id]);

  return <>{children}</>;
};
