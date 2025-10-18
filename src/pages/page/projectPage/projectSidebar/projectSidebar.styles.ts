import { SxProps, Theme } from "@mui/material";

export const projectSidebarStyles: SxProps<Theme> = (theme: Theme) => ({
  padding: "20px 40px",
  flexDirection: "column",
  gap: "40px",
  borderRight: `4px solid var(--mf-palette-contrast-900)`,
  display: "none",

  "&.mobile": {
    display: "flex",
    flexDirection: "row",
    gap: "4px",
    flexWrap: "wrap",
    padding: 0,
    margin: "16px 32px",
    border: "0 none",
  },

  [theme.breakpoints.up("md")]: {
    display: "flex",

    "&.mobile.mobile": {
      display: "none",
    },
  },

  ".sidebar-box": {
    "&>.box-title": {
      ...theme.typography.h5,
      paddingBottom: "4px",
      borderBottom: `4px solid var(--mf-palette-contrast-900)`,
      marginBottom: "12px",
      paddingX: "16px",
    },
  },
});
