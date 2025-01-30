import { SxProps } from "@mui/material";
import { mfTheme } from "@styles/theme/mfTheme";

export const pageContentsStyles: SxProps = {
  background: mfTheme.vars.palette.background.default,

  ".page-content": {
    mx: 4,
    my: 4,
    py: 4,
    px: 4,
    display: "flex",
    flexDirection: "column",
    alignItems: "flex-start",
    gap: 2,
    borderRadius: "sm",
    boxShadow: "md",

    "&.message": {
      width: 300,
      marginY: "128px",
    },
  },

  ".alert": {
    // width: 400,
    mx: "auto",
    marginY: "128px",
  },
};
