import { Box, LinearProgress, Sheet, Typography } from "@mui/joy";
import { splashScreenStyles } from "./splashScreen.styles";
import { useEffect, useState } from "react";
import { MfLogo } from "@components/mfLogo/MfLogo";
import { useTranslation } from "react-i18next";

export interface SplashScreenProps {
  visible?: boolean;
}

// Number of currently available loading-messages
const numberOfMessages = 22;

export const SplashScreen = ({ visible }: SplashScreenProps) => {
  const [messageNumber, setMessageNumber] = useState<number>(1);
  const { t } = useTranslation();

  useEffect(() => {
    const timer = setInterval(() => {
      setMessageNumber((prev) => {
        if (prev >= numberOfMessages || prev <= 0) {
          return 1;
        }
        return prev + 1;
      });
    }, 5000);
    return () => {
      if (timer) {
        clearInterval(timer);
      }
    };
  }, []);

  if (!visible) {
    return;
  }

  return (
    <Sheet
      className="splash-screen"
      data-testid="splash-screen"
      sx={splashScreenStyles}
    >
      <Box className="logo-container">
        <MfLogo layout="vertical"></MfLogo>
        <LinearProgress className="progressbar" />
      </Box>

      <Typography className="loading-message">
        {t(`splash.${messageNumber}`)}
      </Typography>
    </Sheet>
  );
};
