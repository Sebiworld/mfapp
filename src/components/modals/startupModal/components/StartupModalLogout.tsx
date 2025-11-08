import { useTranslation } from "react-i18next";
import { StartupModalContentProps } from "../StartupModal";
import { Box, Button, IconButton } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { authStoreActions } from "@src/store/auth/auth.actions";

export const StartupModalLogout = ({
  closeModal,
}: StartupModalContentProps) => {
  const { t } = useTranslation();

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
            authStoreActions.logout();
          }}
        >
          {t("auth.logout")}
        </Button>
      </Box>
    </>
  );
};
