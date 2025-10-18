import { ProjectGeneralDataBlock } from "@models/project-dto.model";
import { useTranslation } from "react-i18next";
import { isValidArray } from "@utils/functions/isValidArray";
import { Box, Button, IconButton, Modal, Paper } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { SidebarBoxGeneral } from "./SidebarBoxGeneral";
import { useCallback, useState } from "react";

export interface SidebarBoxGeneralModalProps {
  data?: ProjectGeneralDataBlock[];
}

export const SidebarBoxGeneralModal: React.FC<SidebarBoxGeneralModalProps> = ({
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
        {t("project.general_data")}
      </Button>

      <Modal
        className="sidebar-box-general-modal"
        data-testid="sidebar-box-general-modal"
        open={isOpen}
        onClose={onClose}
      >
        <Paper className="modal-container" variant="outlined">
          <Box className="modal-header">
            <Box className="title">{t("project.general_data")}</Box>

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
            <SidebarBoxGeneral
              data={data}
              showTitle={false}
              onClose={onClose}
            ></SidebarBoxGeneral>
          </Box>
        </Paper>
      </Modal>
    </>
  );
};
