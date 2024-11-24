import { ModalClose } from "@mui/joy";
import { useState } from "react";
import { StartupModalContentProps } from "../../StartupModal";
import { StartupModalRegistrationForm } from "./components/StartupModalRegistrationForm";
import { StartupModalLoginForm } from "./components/StartupModalLoginForm";

export const StartupModalLogin = ({ closeModal }: StartupModalContentProps) => {
  const [isRegistrationActive, setIsRegistrationActive] =
    useState<boolean>(false);

  return (
    <>
      <ModalClose variant="plain" sx={{ m: 1 }} />

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
