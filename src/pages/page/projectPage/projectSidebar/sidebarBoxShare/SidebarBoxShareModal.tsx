import { useTranslation } from "react-i18next";
import { isValidArray } from "@utils/functions/isValidArray";
import { IconLinkDto } from "@models/utility-types/icon-link-dto.model";
import { Box, Button, IconButton, Modal, Paper } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { useCallback, useState } from "react";
import { SidebarBoxShare } from "./SidebarBoxShare";

export interface SidebarBoxShareModalProps {
  data?: IconLinkDto[];
}

export const SidebarBoxShareModal: React.FC<SidebarBoxShareModalProps> = ({
  data,
}) => {
  const { t } = useTranslation();
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const onClose = useCallback(() => {
    setIsOpen(false);
  }, []);

  if (!isValidArray(data) || !data.length) {
    return null;
  }

  return (
    <>
      <Button
        color="projectPrimary"
        variant="contained"
        onClick={() => setIsOpen(true)}
      >
        {t("project.share")}
      </Button>

      <Modal
        className="sidebar-box-share-modal"
        data-testid="sidebar-box-share-modal"
        open={isOpen}
        onClose={onClose}
      >
        <Paper className="modal-container" variant="outlined">
          <Box className="modal-header">
            <Box className="title">{t("project.share")}</Box>

            <Box className="actions">
              <IconButton
                title={t("general.actions.close")}
                onClick={onClose}
                className="close-button"
              >
                <CloseIcon />
              </IconButton>
            </Box>
          </Box>

          <Box className="modal-content">
            <SidebarBoxShare
              data={data}
              showTitle={false}
              onClose={onClose}
            ></SidebarBoxShare>
          </Box>
        </Paper>
      </Modal>
    </>
  );
};
