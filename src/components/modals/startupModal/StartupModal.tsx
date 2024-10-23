import { Box, Button, Modal, ModalClose, Sheet, Typography } from "@mui/joy";
import { selectSetStartupStep } from "@src/store/auth.store";
import { useGlobalStore } from "@src/store/global.store";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { startupModalStyles } from "./startupModalStyles";

export interface StartupModalProps {
  open?: boolean;
}

export const StartupModal = ({ open }: StartupModalProps) => {
  const [openState, setOpenState] = useState<boolean>(false);
  const setStartupStep = useGlobalStore(selectSetStartupStep);
  const { t } = useTranslation();

  useEffect(() => {
    if (typeof open !== "boolean") {
      return;
    }

    setOpenState(open);
  }, [open, setStartupStep]);

  return (
    <Modal
      aria-labelledby="modal-title"
      aria-describedby="modal-desc"
      open={openState}
      onClose={() => {
        setOpenState(false);
        setStartupStep(undefined);
      }}
      sx={startupModalStyles}
    >
      <Sheet className="modal-container" variant="outlined">
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
              setStartupStep("nickname");
            }}
          >
            {t("startup.go")}
          </Button>
        </Box>
      </Sheet>
    </Modal>
  );
};
