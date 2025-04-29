import { SxProps } from "@mui/material";
import { mfTheme } from "@styles/theme/mfTheme";

export const pageContentsStyles: SxProps = {
  background: mfTheme.vars.palette.background.default,

  ".page-content": {
    mx: "32px",
    my: "32px",
    py: "32px",
    px: "48px",
    display: "flex",
    flexDirection: "column",
    alignItems: "flex-start",
    gap: "16px",
    borderRadius: "sm",
    boxShadow: "md",

    "&.message": {
      width: 300,
      marginY: "128px",
    },

    "&>.page-title": {
      marginBottom: "16px",
    },

    "&>.intro": {
      fontWeight: "bold",
      position: "relative",
      maxWidth: "100%",
      width: "38em",
    },
  },

  ".alert": {
    // width: 400,
    mx: "auto",
    marginY: "128px",
  },
};
