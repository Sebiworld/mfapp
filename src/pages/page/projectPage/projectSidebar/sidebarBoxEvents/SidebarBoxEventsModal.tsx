import { ProjectEventsData } from "@models/project-dto.model";
import { useTranslation } from "react-i18next";
import { isValidArray } from "@utils/functions/isValidArray";
import { useCallback, useState } from "react";
import { Box, Button, IconButton, Modal, Paper } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { SidebarBoxEvents } from "./SidebarBoxEvents";

export interface SidebarBoxEventsModalProps {
  data?: ProjectEventsData;
}

export const SidebarBoxEventsModal: React.FC<SidebarBoxEventsModalProps> = ({
  data,
}) => {
  const { t } = useTranslation();
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const onClose = useCallback(() => {
    setIsOpen(false);
  }, []);

  if (!isValidArray(data?.performances) || !data.performances.length) {
    return null;
  }

  return (
    <>
      <Button
        color="projectPrimary"
        variant="contained"
        onClick={() => setIsOpen(true)}
      >
        {t("project.events.title")}
      </Button>

      <Modal
        className="sidebar-box-events-modal"
        data-testid="sidebar-box-events-modal"
        open={isOpen}
        onClose={onClose}
      >
        <Paper className="modal-container" variant="outlined">
          <Box className="modal-header">
            <Box className="title">{t("project.events.title")}</Box>

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
            <SidebarBoxEvents
              data={data}
              showTitle={false}
              onClose={onClose}
            ></SidebarBoxEvents>
          </Box>
        </Paper>
      </Modal>
    </>
  );
};
