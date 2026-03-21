import { useTranslation } from "react-i18next";
import { loadingOverlayStyles } from "./loadingOverlay.styles";
import {
  Box,
  Card,
  CircularProgress,
  LinearProgress,
  Typography,
} from "@mui/material";
import { useMemo } from "react";

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

  const loaderType = useMemo(() => {
    if (onlyProgress) {
      return "is-progress";
    }

    if (overlay === undefined || overlay) {
      return "is-overlay";
    }

    return "is-box";
  }, [onlyProgress, overlay]);

  if (!visible) {
    return null;
  }

  return (
    <Box
      className={`loading-overlay ${loaderType}`}
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
