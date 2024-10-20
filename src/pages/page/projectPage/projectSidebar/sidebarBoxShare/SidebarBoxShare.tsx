import { Box, Typography } from "@mui/joy";
import { useTranslation } from "react-i18next";
import { isValidArray } from "@utils/functions/isValidArray";
import { sidebarBoxShareStyles } from "./sidebarBoxShare.styles";
import { IconLinkDto } from "@models/utility-types/icon-link-dto.model";

export interface SidebarBoxShareProps {
  data?: IconLinkDto[];
}

export const SidebarBoxShare: React.FC<SidebarBoxShareProps> = ({ data }) => {
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
      <Typography className="box-title" level="h3">
        {t(`project.share`)}
      </Typography>

      {/* TODO */}
    </Box>
  );
};
