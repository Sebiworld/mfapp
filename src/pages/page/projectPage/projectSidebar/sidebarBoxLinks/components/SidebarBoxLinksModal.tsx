import { useTranslation } from "react-i18next";
import { isValidArray } from "@utils/functions/isValidArray";
import { Box, Button, IconButton, Modal, Paper } from "@mui/material";
import { NavigationItemDto } from "@models/navigation-item-dto.model";
import CloseIcon from "@mui/icons-material/Close";
import { useCallback, useState } from "react";
import { SidebarBoxLinks } from "../SidebarBoxLinks";

export interface SidebarBoxLinksModalProps {
  navItems?: NavigationItemDto[];
}

export const SidebarBoxLinksModal: React.FC<SidebarBoxLinksModalProps> = ({
  navItems,
}) => {
  const { t } = useTranslation();
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const onClose = useCallback(() => {
    setIsOpen(false);
  }, []);

  if (!isValidArray(navItems) || !navItems.length) {
    return null;
  }

  return (
    <>
      <Button
        color="projectPrimary"
        variant="contained"
        onClick={() => setIsOpen(true)}
      >
        {t("project.links")}
      </Button>

      <Modal
        className="sidebar-box-links-modal"
        data-testid="sidebar-box-links-modal"
        open={isOpen}
        onClose={onClose}
      >
        <Paper className="modal-container" variant="outlined">
          <Box className="modal-header">
            <Box className="title">{t("project.links")}</Box>

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
            <SidebarBoxLinks
              navItems={navItems}
              showTitle={false}
              onClose={onClose}
            ></SidebarBoxLinks>
          </Box>
        </Paper>
      </Modal>
    </>
  );
};
