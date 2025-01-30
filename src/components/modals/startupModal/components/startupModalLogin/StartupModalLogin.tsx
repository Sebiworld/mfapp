import { useState } from "react";
import { StartupModalContentProps } from "../../StartupModal";
import { StartupModalRegistrationForm } from "./components/StartupModalRegistrationForm";
import { StartupModalLoginForm } from "./components/StartupModalLoginForm";
import CloseIcon from "@mui/icons-material/Close";
import { IconButton } from "@mui/material";

export const StartupModalLogin = ({ closeModal }: StartupModalContentProps) => {
  const [isRegistrationActive, setIsRegistrationActive] =
    useState<boolean>(false);

  return (
    <>
      <IconButton onClick={closeModal}>
        <CloseIcon></CloseIcon>
      </IconButton>

      {isRegistrationActive ? (
        <StartupModalRegistrationForm
          closeModal={closeModal}
          setIsRegistrationActive={setIsRegistrationActive}
        ></StartupModalRegistrationForm>
      ) : (
        <StartupModalLoginForm
          closeModal={closeModal}
          setIsRegistrationActive={setIsRegistrationActive}
        ></StartupModalLoginForm>
      )}
    </>
  );
};
