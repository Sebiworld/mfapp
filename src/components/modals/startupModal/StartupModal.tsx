import { useGlobalStore } from "@src/store/global.store";
import {
  ReactElement,
  useCallback,
  useLayoutEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { startupModalStyles } from "./startupModalStyles";
import { StartupModalIntro } from "./components/StartupModalIntro";
import { StartupModalNickname } from "./components/StartupModalNickname";
import { StartupModalLogout } from "./components/StartupModalLogout";
import { StartupModalLogin } from "./components/startupModalLogin/StartupModalLogin";
import { Modal, Paper } from "@mui/material";
import { ModalTransition } from "../ModalTransition";
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

/** Which content the modal shows, picked from the store. */
type StartupModalContent = "intro" | "nickname" | "logout" | "login";

/**
 * Picks the content for the current visitor: welcome first, then the nickname, then login or logout.
 * @param didReceiveWelcomeMessage Whether the welcome has been shown.
 * @param nickname Stored nickname.
 * @param isLoggedIn Whether a user is logged in.
 * @returns The content to show.
 */
const getStartupModalContent = (
  didReceiveWelcomeMessage: boolean | undefined,
  nickname: unknown,
  isLoggedIn: boolean
): StartupModalContent => {
  if (!didReceiveWelcomeMessage) {
    return "intro";
  }

  if (!nickname || typeof nickname !== "string") {
    return "nickname";
  }

  if (isLoggedIn) {
    return "logout";
  }

  return "login";
};

/**
 * Welcome, nickname, login or logout dialog of the side menu. It fades out before the parent removes it: the parent
 * is told only once the exit has finished. While it leaves it keeps the content it showed last, so a login that
 * completes on closing does not flash the logout content.
 * @param props.setIsStartupModalOpen Called with `false` once the modal has faded out.
 * @returns The modal.
 */
export const StartupModal = ({
  setIsStartupModalOpen,
}: StartupModalProps): ReactElement => {
  const didReceiveWelcomeMessage = useGlobalStore(
    selectDidReceiveWelcomeMessage
  );
  const nickname = useGlobalStore(selectNickname);
  const isLoggedIn = useGlobalStore(selectIsLoggedIn);

  const liveContent = getStartupModalContent(
    didReceiveWelcomeMessage,
    nickname,
    isLoggedIn
  );

  // Content on screen while the modal is open; frozen as soon as it closes.
  const shownContentRef = useRef<StartupModalContent>(liveContent);
  const [closedContent, setClosedContent] =
    useState<StartupModalContent | null>(null);
  const isOpen = closedContent === null;
  const content = closedContent ?? liveContent;

  useLayoutEffect(() => {
    if (isOpen) {
      shownContentRef.current = liveContent;
    }
  }, [isOpen, liveContent]);

  // Reads the content on screen, not the one of the render that created the callback: a login form closes the modal
  // only after the user has been loaded, when the logout content is already shown.
  const closeModal = useCallback(() => {
    setClosedContent(shownContentRef.current);
  }, []);

  const modalComponent = useMemo(() => {
    switch (content) {
      case "intro":
        return <StartupModalIntro closeModal={closeModal}></StartupModalIntro>;
      case "nickname":
        return (
          <StartupModalNickname closeModal={closeModal}></StartupModalNickname>
        );
      case "logout":
        return (
          <StartupModalLogout closeModal={closeModal}></StartupModalLogout>
        );
      default:
        return <StartupModalLogin closeModal={closeModal}></StartupModalLogin>;
    }
  }, [closeModal, content]);

  return (
    <Modal
      aria-labelledby="modal-title"
      aria-describedby="modal-desc"
      open={isOpen}
      onClose={closeModal}
      closeAfterTransition
      sx={startupModalStyles}
    >
      <ModalTransition
        in={isOpen}
        onExited={() => {
          setIsStartupModalOpen?.(false);
        }}
      >
        <Paper className="modal-container" variant="outlined">
          {modalComponent}
        </Paper>
      </ModalTransition>
    </Modal>
  );
};
