import { SxProps } from "@mui/material";

export const splashScreenStyles: SxProps = {
  position: "fixed",
  top: "0",
  bottom: "0",
  left: "0",
  right: "0",
  display: "flex",
  flexDirection: "column",
  justifyContent: "flex-start",
  alignItems: "center",
  zIndex: 10000,
  gap: "32px",
  padding: "32px",

  ".logo-container": {
    display: "flex",
    flexDirection: "column",
    flex: "0 0 auto",
    width: "200px",
    maxWidth: "100%",
    gap: "8px",
    height: "50vh",
    justifyContent: "flex-end",

    ".progressbar": {
      width: "100%",
      flex: "0 0 auto",
    },
  },

  ".message-container": {
    flex: "1 1 auto",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "flex-start",
    textAlign: "center",
    lineHeight: 1.2,
    width: "400px",
    maxWidth: "100%",

    ".title": {
      lineHeight: 1.2,
      marginBottom: "16px",
    },
  },

  ".loading-message": {
    width: "240px",
    maxWidth: "100%",
  },
};
