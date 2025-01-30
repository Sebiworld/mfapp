import { selectSetNickname } from "@src/store/auth.store";
import { useGlobalStore } from "@src/store/global.store";
import { FormEventHandler, useState } from "react";
import { useTranslation } from "react-i18next";
import { toast } from "react-toastify";
import { StartupModalContentProps } from "../StartupModal";
import CloseIcon from "@mui/icons-material/Close";
import { Box, Button, IconButton, Input, Typography } from "@mui/material";

interface FormElements extends HTMLFormControlsCollection {
  nickname: HTMLInputElement;
}
interface NicknameFormElement extends HTMLFormElement {
  readonly elements: FormElements;
}

export const StartupModalNickname = ({
  closeModal,
}: StartupModalContentProps) => {
  const setNickname = useGlobalStore(selectSetNickname);
  const { t } = useTranslation();

  const [nicknameInput, setNicknameInput] = useState("");

  const handleSubmit: FormEventHandler<NicknameFormElement> = (event) => {
    event.preventDefault();
    const nickname = event.currentTarget.elements?.nickname?.value;
    if (!nickname) {
      toast.error(t("startup.error-no-nickname"), {});
      return;
    }
    setNickname(nickname);
    toast.success(t("startup.nickname-success", { name: nickname }));
  };

  return (
    <>
      <IconButton onClick={closeModal}>
        <CloseIcon></CloseIcon>
      </IconButton>

      <Box className="modal-content">
        <form onSubmit={handleSubmit}>
          <Typography>
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

          <Button type="submit" disabled={!nicknameInput?.length}>
            {t("general.actions.confirm")}
          </Button>
        </form>
      </Box>
    </>
  );
};
