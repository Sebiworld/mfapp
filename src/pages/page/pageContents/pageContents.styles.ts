import { SxProps, Theme } from "@mui/material";

export const pageContentsStyles: SxProps<Theme> = (theme) => ({
  background: theme.vars.palette.background.default,

  ".page-content": {
    margin: "32px",
    marginBottom: "16px",
    padding: "32px 48px 48px 48px",
    display: "flex",
    flexDirection: "column",
    alignItems: "flex-start",
    gap: "16px",
    borderRadius: "sm",
    boxShadow: "md",
    maxWidth: "1000px",

    [theme.breakpoints.down("sm")]: {
      margin: "16px",
      padding: "16px 24px 24px 24px",
    },

    "&.message": {
      width: 300,
      marginY: "128px",
    },

    ".page-title": {
      marginBottom: "16px",
      lineHeight: "1.05",
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
});
