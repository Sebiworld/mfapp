import { Box, Button, ModalClose, Typography } from "@mui/joy";
import { useGlobalStore } from "@src/store/global.store";
import { useTranslation } from "react-i18next";
import { StartupModalContentProps } from "../StartupModal";
import { selectSetDidReceiveWelcomeMessage } from "@src/store/initialization.store";

export const StartupModalIntro = ({ closeModal }: StartupModalContentProps) => {
  const { t } = useTranslation();
  const setDidReceiveWelcomeMessage = useGlobalStore(
    selectSetDidReceiveWelcomeMessage
  );

  return (
    <>
      <ModalClose variant="plain" />

      <Box className="modal-content">
        <Typography
          level="body-lg"
          sx={{ fontSize: "48px", fontWeight: "bold" }}
        >
          Hallo!
        </Typography>

        <Typography level="body-lg">
          Wir sind die{" "}
          <Typography sx={{ fontWeight: "bold" }}>
            <Typography color="primary">Musical</Typography>-Fabrik
          </Typography>
          !
        </Typography>
        <br />

        <Typography level="body-lg">
          Herzlich Willkommen in unserer App -
        </Typography>
        <Typography level="body-lg" sx={{ fontWeight: "bold" }}>
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
