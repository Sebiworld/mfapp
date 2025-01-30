import { useGlobalStore } from "@src/store/global.store";
import { useTranslation } from "react-i18next";
import { StartupModalContentProps } from "../StartupModal";
import { selectSetDidReceiveWelcomeMessage } from "@src/store/initialization.store";
import { Box, Button, IconButton, Typography } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

export const StartupModalIntro = ({ closeModal }: StartupModalContentProps) => {
  const { t } = useTranslation();
  const setDidReceiveWelcomeMessage = useGlobalStore(
    selectSetDidReceiveWelcomeMessage
  );

  return (
    <>
      <IconButton onClick={closeModal}>
        <CloseIcon></CloseIcon>
      </IconButton>

      <Box className="modal-content">
        <Typography sx={{ fontSize: "48px", fontWeight: "bold" }}>
          Hallo!
        </Typography>

        <Typography>
          Wir sind die{" "}
          <Typography sx={{ fontWeight: "bold" }}>
            <Typography color="primary">Musical</Typography>-Fabrik
          </Typography>
          !
        </Typography>
        <br />

        <Typography>Herzlich Willkommen in unserer App -</Typography>
        <Typography sx={{ fontWeight: "bold" }}>
          Schön, dass du hier bist!
        </Typography>
      </Box>

      <Box className="modal-footer">
        <Button
          color="primary"
          onClick={() => {
            setDidReceiveWelcomeMessage(true);
          }}
        >
          {t("general.actions.lets-go")}
        </Button>
      </Box>
    </>
  );
};
