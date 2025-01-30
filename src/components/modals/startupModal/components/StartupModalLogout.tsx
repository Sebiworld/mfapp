import { selectLogout } from "@src/store/auth.store";
import { useGlobalStore } from "@src/store/global.store";
import { useTranslation } from "react-i18next";
import { StartupModalContentProps } from "../StartupModal";
import { Box, Button, IconButton } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

export const StartupModalLogout = ({
  closeModal,
}: StartupModalContentProps) => {
  const { t } = useTranslation();
  const logout = useGlobalStore(selectLogout);

  return (
    <>
      <IconButton onClick={closeModal}>
        <CloseIcon></CloseIcon>
      </IconButton>

      <Box className="modal-content">
        <p>
          <strong>Du bist bereits angemeldet!</strong>
          <br />
          Klicke hier, um dich abzumelden.
        </p>

        <Button
          color="error"
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
