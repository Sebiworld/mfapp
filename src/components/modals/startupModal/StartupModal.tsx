import { useGlobalStore } from "@src/store/global.store";
import { useCallback, useEffect, useMemo, useState } from "react";
import { startupModalStyles } from "./startupModalStyles";
import { StartupModalIntro } from "./components/StartupModalIntro";
import { StartupModalNickname } from "./components/StartupModalNickname";
import { StartupModalLogout } from "./components/StartupModalLogout";
import { StartupModalLogin } from "./components/startupModalLogin/StartupModalLogin";
import { Modal, Paper } from "@mui/material";
import { selectDidReceiveWelcomeMessage } from "@src/store/initialization/initialization.selectors";
import {
  selectIsLoggedIn,
  selectNickname,
} from "@src/store/auth/auth.selectors";

export interface StartupModalProps {
  setIsStartupModalOpen?: React.Dispatch<React.SetStateAction<boolean>>;
}

export interface StartupModalContentProps {
  closeModal?: () => void;
}

export const StartupModal = ({ setIsStartupModalOpen }: StartupModalProps) => {
  const [openState, setOpenState] = useState<boolean>(true);

  const didReceiveWelcomeMessage = useGlobalStore(
    selectDidReceiveWelcomeMessage
  );
  const nickname = useGlobalStore(selectNickname);
  const isLoggedIn = useGlobalStore(selectIsLoggedIn);

  const closeModal = useCallback(() => {
    setOpenState(false);
  }, []);

  useEffect(() => {
    if (!setIsStartupModalOpen || typeof setIsStartupModalOpen !== "function") {
      return;
    }
    setIsStartupModalOpen(openState);
  }, [openState, setIsStartupModalOpen]);

  const modalComponent = useMemo(() => {
    if (!didReceiveWelcomeMessage) {
      return <StartupModalIntro closeModal={closeModal}></StartupModalIntro>;
    }

    if (!nickname || typeof nickname !== "string") {
      return (
        <StartupModalNickname closeModal={closeModal}></StartupModalNickname>
      );
    }

    if (isLoggedIn) {
      return <StartupModalLogout closeModal={closeModal}></StartupModalLogout>;
    }

    return <StartupModalLogin closeModal={closeModal}></StartupModalLogin>;
  }, [closeModal, didReceiveWelcomeMessage, isLoggedIn, nickname]);

  return (
    <Modal
      aria-labelledby="modal-title"
      aria-describedby="modal-desc"
      open={openState}
      onClose={() => {
        setOpenState(false);
      }}
      sx={startupModalStyles}
    >
      <Paper className="modal-container" variant="outlined">
        {modalComponent}
      </Paper>
    </Modal>
  );
};
