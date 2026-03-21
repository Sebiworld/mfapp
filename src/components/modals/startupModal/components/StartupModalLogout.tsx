import { useTranslation } from "react-i18next";
import { StartupModalContentProps } from "../StartupModal";
import { Box, Button, IconButton } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { useAuthApi } from "@api/hooks/useAuthApi";

export const StartupModalLogout = ({
  closeModal,
}: StartupModalContentProps) => {
  const { t } = useTranslation();
  const { logout } = useAuthApi();

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
