import { SxProps } from "@mui/joy/styles/types";
import { mfTheme } from "@styles/theme/mfTheme";

export const projectSidebarStyles: SxProps = {
  padding: "20px 40px",
  borderRight: `4px solid ${mfTheme.palette.contrast[500]}`,
  display: "flex",
  flexDirection: "column",
  gap: "40px",

  ".sidebar-box": {
    "&>.box-title": {
      ...mfTheme.typography.h4,
      paddingBottom: "4px",
      borderBottom: `4px solid ${mfTheme.palette.contrast[500]}`,
      marginBottom: "12px",
      paddingX: "16px",
    },
  },
};
