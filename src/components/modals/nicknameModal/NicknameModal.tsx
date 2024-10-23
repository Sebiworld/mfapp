import {
  Box,
  Button,
  Input,
  Modal,
  ModalClose,
  Sheet,
  Typography,
} from "@mui/joy";
import { selectSetNickname, selectSetStartupStep } from "@src/store/auth.store";
import { useGlobalStore } from "@src/store/global.store";
import { FormEventHandler, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { nicknameModalStyles } from "./nicknameModalStyles";
import { toast } from "react-toastify";

interface FormElements extends HTMLFormControlsCollection {
  nickname: HTMLInputElement;
}
interface NicknameFormElement extends HTMLFormElement {
  readonly elements: FormElements;
}

export interface NicknameModalProps {
  open?: boolean;
}

export const NicknameModal = ({ open }: NicknameModalProps) => {
  const [openState, setOpenState] = useState<boolean>(false);
  const setStartupStep = useGlobalStore(selectSetStartupStep);
  const setNickname = useGlobalStore(selectSetNickname);
  const { t } = useTranslation();

  const [nicknameInput, setNicknameInput] = useState("");

  useEffect(() => {
    if (typeof open !== "boolean") {
      return;
    }

    setOpenState(open);
  }, [open, setStartupStep]);

  const handleSubmit: FormEventHandler<NicknameFormElement> = (event) => {
    event.preventDefault();
    console.log("SUBMIT", event.currentTarget.elements?.nickname?.value);
    const nickname = event.currentTarget.elements?.nickname?.value;
    if (!nickname) {
      toast.error("ERROR", {});
      return;
    }
    setNickname(nickname);
    // onSubmitUsername(event.currentTarget.elements.usernameInput.value);
  };

  return (
    <Modal
      aria-labelledby="modal-title"
      aria-describedby="modal-desc"
      open={openState}
      onClose={() => {
        setOpenState(false);
        setStartupStep(undefined);
      }}
      sx={nicknameModalStyles}
    >
      <Sheet className="modal-container" variant="outlined">
        <ModalClose variant="plain" sx={{ m: 1 }} />

        <Box className="modal-content">
          <form onSubmit={handleSubmit}>
            <Typography level="body-lg">
              Aber zuerst...
              <br />
              <strong>Wie heißt du eigentlich?</strong>
            </Typography>

            <Input
              type="text"
              className="nickname-input"
              name="nickname"
              value={nicknameInput}
              onChange={(event) => {
                setNicknameInput(event.target.value);
              }}
            />

            <Button type="submit">Bestätigen</Button>
          </form>
        </Box>
      </Sheet>
    </Modal>
  );
};
