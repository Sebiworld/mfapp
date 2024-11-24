import { Box, Button, ModalClose } from "@mui/joy";
import { selectLogout } from "@src/store/auth.store";
import { useGlobalStore } from "@src/store/global.store";
import { useTranslation } from "react-i18next";
import { StartupModalContentProps } from "../StartupModal";

export const StartupModalLogout = ({
  closeModal,
}: StartupModalContentProps) => {
  const { t } = useTranslation();
  const logout = useGlobalStore(selectLogout);

  return (
    <>
      <ModalClose variant="plain" sx={{ m: 1 }} />

      <Box className="modal-content">
        <p>
          <strong>Du bist bereits angemeldet!</strong>
          <br />
          Klicke hier, um dich abzumelden.
        </p>

        <Button
          color="danger"
          onClick={() => {
            logout();
          }}
        >
          {t("auth.logout")}
        </Button>
      </Box>
    </>
  );
};
