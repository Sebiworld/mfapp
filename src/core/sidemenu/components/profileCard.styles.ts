import { SxProps, Theme } from "@mui/material";

export const profileCardStyles: SxProps<Theme> = (theme) => ({
  "&.MuiPaper-root": {
    background: theme.vars.palette.background.paper,
  },

  ".MuiCardHeader-content": {
    overflow: "hidden",
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
