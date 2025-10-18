import { useTranslation } from "react-i18next";
import { isValidArray } from "@utils/functions/isValidArray";
import { sidebarBoxShareStyles } from "./sidebarBoxShare.styles";
import { IconLinkDto } from "@models/utility-types/icon-link-dto.model";
import { Box, Typography } from "@mui/material";

export interface SidebarBoxShareProps {
  data?: IconLinkDto[];
  showTitle?: boolean;
  onClose?: () => void;
}

export const SidebarBoxShare: React.FC<SidebarBoxShareProps> = ({
  data,
  showTitle,
}) => {
  const { t } = useTranslation();

  if (!isValidArray(data) || !data.length) {
    return null;
  }

  return (
    <Box
      className={`sidebar-box sidebar-box-share`}
      data-testid={`sidebar-box-share`}
      sx={sidebarBoxShareStyles}
    >
      {showTitle !== false && (
        <Typography className="box-title" variant="h3">
          {t(`project.share`)}
        </Typography>
      )}

      {/* TODO */}
    </Box>
  );
};
