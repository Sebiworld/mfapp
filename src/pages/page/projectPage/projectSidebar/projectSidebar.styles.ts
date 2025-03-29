import { SxProps } from "@mui/material";
import { mfTheme } from "@styles/theme/mfTheme";

export const projectSidebarStyles: SxProps = {
  padding: "20px 40px",
  display: "flex",
  flexDirection: "column",
  gap: "40px",
  borderRight: `4px solid var(--mf-palette-contrast-900)`,

  ".sidebar-box": {
    "&>.box-title": {
      ...mfTheme.typography.h5,
      paddingBottom: "4px",
      borderBottom: `4px solid var(--mf-palette-contrast-900)`,
      marginBottom: "12px",
      paddingX: "16px",
    },
  },

  // TODO
  // "&.project-sidebar": (theme) => ({
  //   ...theme.applyStyles("dark", {
  //     borderColor: `var(--mf-palette-contrast-600)`,

  //     ".sidebar-box": {
  //       "&>.box-title": {
  //         borderColor: `var(--mf-palette-contrast-600)`,
  //       },
  //     },
  //   }),
  // }),
};
