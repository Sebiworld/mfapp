import { SxProps, Theme } from "@mui/material";

export const pageContentsStyles: SxProps<Theme> = (theme) => ({
  background: theme.vars.palette.background.default,

  // Read by assistive tech, invisible on screen.
  ".visually-hidden": {
    position: "absolute",
    width: "1px",
    height: "1px",
    margin: "-1px",
    padding: 0,
    overflow: "hidden",
    clip: "rect(0 0 0 0)",
    whiteSpace: "nowrap",
    border: 0,
  },

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
