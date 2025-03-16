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
      <Box className="modal-header">
        <Box className="title"></Box>
        <Box className="actions">
          <IconButton onClick={closeModal}>
            <CloseIcon></CloseIcon>
          </IconButton>
        </Box>
      </Box>

      <Box className="modal-content">
        <Box className="texts" sx={{ paddingBottom: "24px" }}>
          <Typography sx={{ fontSize: "48px", fontWeight: "bold" }}>
            Hallo!
          </Typography>
          <Typography>Wir sind die Musical-Fabrik.</Typography>
          <Typography>Herzlich Willkommen in unserer App -</Typography>
          <Typography sx={{ fontWeight: "bold" }}>
            Schön, dass du hier bist!
          </Typography>
        </Box>
      </Box>

      <Box className="modal-footer">
        <Button
          color="primary"
          variant="contained"
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
