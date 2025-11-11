import { SxProps, Theme } from "@mui/material";

export const authCardStyles: SxProps<Theme> = (theme) => ({
  "&.MuiPaper-root.MuiPaper-root": {
    background: theme.vars.palette.background.paper,
  },

  ".MuiCardHeader-title": {
    fontSize: "14px",
    lineHeight: "1.2",

    ".username": {
      fontWeight: "bold",
    },
  },

  ".MuiCardHeader-content": {
    overflow: "hidden",
    padding: "8px",
  },

  ".MuiCardContent-root": {
    padding: "16px",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },

  ".badges-container": {
    display: "flex",
    flexDirection: "row",
    gap: "4px",
    flexWrap: "nowrap",
    overflowX: "auto",
    paddingTop: "4px",
  },
});
