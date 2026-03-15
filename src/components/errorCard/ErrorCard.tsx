import { ErrorResponseDto } from "@models/error-response-dto.model";
import {
  Alert,
  AlertTitle,
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  Typography,
} from "@mui/material";
import { isError } from "@utils/functions/isError";
import { AxiosError } from "axios";
import { useMemo } from "react";
import { useTranslation } from "react-i18next";
import { Link } from "react-router";
import { errorCardStyles } from "./errorCard.styles";
import { ArrowBack } from "@mui/icons-material";

export interface ErrorCardProps {
  errorResponse: AxiosError<ErrorResponseDto>;
}

export const ErrorCard = ({ errorResponse }: ErrorCardProps) => {
  const { t, i18n } = useTranslation();

  const errorCode = useMemo(() => {
    if (!isError(errorResponse)) {
      return null;
    }

    return (
      errorResponse.response?.data?.errorcode ||
      errorResponse.code ||
      "default_error"
    );
  }, [errorResponse]);

  if (errorCode === "not_found_exception") {
    return (
      <Card sx={errorCardStyles} className="error-card">
        <Box className="card-image aspect-ratio ar-16-9">
          <img
            className="ar-content"
            src="/img/not-found.webp"
            alt={t(`error.${errorCode}.title`)}
          />
        </Box>

        <CardContent>
          <Typography
            gutterBottom
            variant="h5"
            component="div"
            className="card-title"
          >
            {t(`error.${errorCode}.title`)}
          </Typography>

          <Typography variant="body2" sx={{ color: "text.secondary" }}>
            {t(`error.${errorCode}.description`)}
          </Typography>
        </CardContent>

        <CardActions>
          <Button variant="contained" color="contrast" component={Link} to="/" startIcon={<ArrowBack />}>
            {t("general.actions.back-to-home")}
          </Button>
        </CardActions>
      </Card>
    );
  }

  if (i18n.exists(`error.${errorCode}`)) {
    return (
      <Alert
        // startDecorator={<WarningIcon fontSize="large" />}
        sx={errorCardStyles}
        className="error-alert"
        color="error"
      >
        <Box className="alert-content">
          <AlertTitle className="alert-title">
            {t(`error.${errorCode}.title`)}
          </AlertTitle>

          <Typography className="alert-content">
            {t(`error.${errorCode}.description`)}
          </Typography>

          <Box className="alert-footer">
            <Button color="light" component={Link} to="/">
              {t("general.actions.back-to-home")}
            </Button>
          </Box>
        </Box>
      </Alert>
    );
  }

  // Default Error alert
  return (
    <Alert
      // startDecorator={<WarningIcon fontSize="large" />}
      sx={errorCardStyles}
      className="error-alert"
      color="error"
    >
      <Box className="alert-content">
        <AlertTitle className="alert-title">
          {t(`error.default_error.title`)}
        </AlertTitle>

        <Typography className="alert-content">
          {t(`error.default_error.description`)}
        </Typography>

        <Box className="alert-footer">
          <Button color="light" component={Link} to="/">
            {t("general.actions.back-to-home")}
          </Button>
        </Box>
      </Box>
    </Alert>
  );
};
