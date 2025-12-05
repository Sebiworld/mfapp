import { SxProps, Theme } from "@mui/material";

export const secretCodePageStyles: SxProps<Theme> = (theme) => ({
  position: "relative",
  display: "flex",
  flexDirection: "column",
  gap: "32px",
  padding: "32px 32px 64px 32px",

  [theme.breakpoints.down("md")]: {
    padding: "32px 24px",
  },

  ".numbers-grid": {
    display: "grid",
    gridTemplateColumns: "repeat(3, 1fr)",
    gap: 2,
    marginBottom: 4,
    maxWidth: "100%",
    width: "800px",
    margin: "0 auto",

    ".MuiButton-root": {
      height: "80px",
      fontSize: "2rem",
    },
  },

  ".selected-numbers": {
    position: "relative",
    marginTop: 4,
    fontSize: "1.5rem",
    fontWeight: "bold",
    maxWidth: "100%",
    width: "800px",
    margin: "0 auto",

    ".code-container": {
      display: "flex",
      gap: "16px",
      marginTop: "16px",
      fontSize: "64px",
      flexWrap: "wrap",
    },

    ".number-item": {
      padding: "16px",
      background: theme.palette.background.paper,
      color: theme.palette.text.primary,
      borderRadius: "8px",
      boxShadow: theme.shadows[2],
      minWidth: "80px",
      textAlign: "center",
    },

    "&.error .number-item": {
      background: theme.palette.error.main,
      color: theme.palette.error.contrastText,
    },

    "&.success .number-item": {
      background: theme.palette.success.main,
      color: theme.palette.success.contrastText,
    },

    ".MuiAlert-root": {
      marginTop: "16px",
      fontWeight: "bold",
      fontSize: "1rem",
    },

    ".loading-overlay": {
      position: "absolute",
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      backgroundColor: "rgba(0, 0, 0, 0.8)",
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
      alignItems: "center",
      borderRadius: "8px",
      gap: "8px",

      ".MuiLinearProgress-root": {
        width: "80%",
      },
    },
  },
});
