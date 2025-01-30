import { useTranslation } from "react-i18next";
import { loadingOverlayStyles } from "./loadingOverlay.styles";
import { Box, Card, CircularProgress, Typography } from "@mui/material";

interface LoadingOverlayProps {
  overlay?: boolean;
}

export const LoadingOverlay = ({ overlay }: LoadingOverlayProps) => {
  const { t } = useTranslation();

  return (
    <Box
      className={`loading-overlay ${overlay === undefined || overlay ? "is-overlay" : ""}`}
      data-testid="loading-overlay"
      sx={loadingOverlayStyles}
    >
      <Card className="content-box">
        <CircularProgress className="spinner" />
        <Typography>{t("general.loading")}</Typography>
      </Card>
    </Box>
  );
};
