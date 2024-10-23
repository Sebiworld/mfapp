import { useGlobalStore } from "@src/store/global.store";
import { selectStartupStep } from "@src/store/auth.store";
import { StartupModal } from "@components/modals/startupModal/StartupModal";
import { ReactNode, useMemo } from "react";
import { NicknameModal } from "@components/modals/nicknameModal/NicknameModal";

export interface HandleStartupProps {
  isInitialized?: boolean;
}

export const useHandleStartup = ({
  isInitialized,
}: HandleStartupProps): { modalComponent: ReactNode } => {
  const startupStep = useGlobalStore(selectStartupStep);

  const modalComponent = useMemo(() => {
    if (!isInitialized) {
      return null;
    }

    if (startupStep === "startup") {
      return <StartupModal open={true}></StartupModal>;
    }

    if (startupStep === "nickname") {
      return <NicknameModal open={true}></NicknameModal>;
    }

    return null;
  }, [isInitialized, startupStep]);

  return { modalComponent };
};
