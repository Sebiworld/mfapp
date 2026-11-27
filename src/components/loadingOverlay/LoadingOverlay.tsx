import { useTranslation } from "react-i18next";
import { loadingOverlayStyles } from "./loadingOverlay.styles";
import {
  Box,
  Card,
  CircularProgress,
  LinearProgress,
  Typography,
} from "@mui/material";
import { useEffect, useMemo } from "react";
import { useSplashGone } from "@core/splashScreen/useSplashGone";
import { registerContentPending } from "@core/splashScreen/splashSignal";

interface LoadingOverlayProps {
  overlay?: boolean;
  visible?: boolean;
  onlyProgress?: boolean;
}

export const LoadingOverlay = ({
  overlay,
  visible,
  onlyProgress,
}: LoadingOverlayProps) => {
  const { t } = useTranslation();
  const isSplashGone = useSplashGone();

  const loaderType = useMemo(() => {
    if (onlyProgress) {
      return "is-progress";
    }

    if (overlay === undefined || overlay) {
      return "is-overlay";
    }

    return "is-box";
  }, [onlyProgress, overlay]);

  // A card (not just the progress bar) means there is no content yet: the splash waits for it to end.
  const isFirstLoad = Boolean(visible) && !onlyProgress;

  useEffect(() => {
    if (!isFirstLoad) {
      return;
    }

    return registerContentPending();
  }, [isFirstLoad]);

  if (!visible) {
    return null;
  }

  return (
    <Box
      className={`loading-overlay ${loaderType}${isSplashGone ? "" : " is-waiting"}`}
      data-testid="loading-overlay"
      sx={loadingOverlayStyles}
    >
      {onlyProgress ? (
        <LinearProgress color="projectPrimary" className="linear-progress" />
      ) : (
        <Card className="content-box">
          <CircularProgress className="spinner" />
          <Typography>{t("general.loading")}</Typography>
        </Card>
      )}
    </Box>
  );
};
