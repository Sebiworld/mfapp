import { useState } from "react";
import { StartupModalContentProps } from "../../StartupModal";
import { StartupModalRegistrationForm } from "./components/StartupModalRegistrationForm";
import { StartupModalLoginForm } from "./components/StartupModalLoginForm";
import CloseIcon from "@mui/icons-material/Close";
import { Box, IconButton } from "@mui/material";
import { useGlobalStore } from "@src/store/global.store";
import { selectIsRegistrationActivated } from "@src/store/configuration/configuration.selectors";

export const StartupModalLogin = ({ closeModal }: StartupModalContentProps) => {
  const isRegistrationActivated = useGlobalStore(selectIsRegistrationActivated);
  const [isRegistrationActive, setIsRegistrationActive] =
    useState<boolean>(false);

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

      {isRegistrationActive && isRegistrationActivated ? (
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
