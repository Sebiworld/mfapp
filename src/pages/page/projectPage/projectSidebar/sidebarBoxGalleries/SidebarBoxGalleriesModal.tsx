import { useTranslation } from "react-i18next";
import { isValidArray } from "@utils/functions/isValidArray";

import { Box, Button, IconButton, Modal, Paper } from "@mui/material";
import { useCallback, useState } from "react";
import { ProjectDetailsDto } from "@models/project-dto.model";
import CloseIcon from "@mui/icons-material/Close";
import { SidebarBoxGalleries } from "./SidebarBoxGalleries";

type SidebarBoxGalleriesData = ProjectDetailsDto["images"];

export interface SidebarBoxGalleriesModalProps {
  data?: SidebarBoxGalleriesData;
  type?: string;
}

export const SidebarBoxGalleriesModal: React.FC<
  SidebarBoxGalleriesModalProps
> = ({ data, type }) => {
  const { t } = useTranslation();

  const [isOpen, setIsOpen] = useState<boolean>(false);

  const onClose = useCallback(() => {
    setIsOpen(false);
  }, []);

  if (!isValidArray(data?.galleries) || !data?.galleries.length) {
    return null;
  }

  return (
    <>
      <Button
        color="projectPrimary"
        variant="contained"
        onClick={() => setIsOpen(true)}
      >
        {t("project.galleries.title")}
      </Button>

      <Modal
        className="sidebar-box-galleries-modal"
        data-testid="sidebar-box-galleries-modal"
        open={isOpen}
        onClose={onClose}
      >
        <Paper className="modal-container" variant="outlined">
          <Box className="modal-header">
            <Box className="title">{t("project.galleries.title")}</Box>

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
            <SidebarBoxGalleries
              data={data}
              showTitle={false}
              onClose={onClose}
              type={type}
            ></SidebarBoxGalleries>
          </Box>
        </Paper>
      </Modal>
    </>
  );
};
