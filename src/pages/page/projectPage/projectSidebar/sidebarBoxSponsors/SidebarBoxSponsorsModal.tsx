import { useTranslation } from "react-i18next";
import { isValidArray } from "@utils/functions/isValidArray";
import { SponsorDto } from "@models/utility-types/sponsor-dto.model";
import CloseIcon from "@mui/icons-material/Close";
import { Box, Button, IconButton, Modal, Paper } from "@mui/material";
import { useCallback, useState } from "react";
import { SidebarBoxSponsors } from "./SidebarBoxSponsors";

export interface SidebarBoxSponsorsModalProps {
  data?: SponsorDto[];
  type?: string;
}

export const SidebarBoxSponsorsModal: React.FC<
  SidebarBoxSponsorsModalProps
> = ({ data, type = "sponsors" }) => {
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
        {t(`project.${type}`)}
      </Button>

      <Modal
        className="sidebar-box-sponsors-modal"
        data-testid="sidebar-box-sponsors-modal"
        open={isOpen}
        onClose={onClose}
      >
        <Paper className="modal-container" variant="outlined">
          <Box className="modal-header">
            <Box className="title">{t(`project.${type}`)}</Box>

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
            <SidebarBoxSponsors
              data={data}
              type={type}
              showTitle={false}
              onClose={onClose}
            ></SidebarBoxSponsors>
          </Box>
        </Paper>
      </Modal>
    </>
  );
};
