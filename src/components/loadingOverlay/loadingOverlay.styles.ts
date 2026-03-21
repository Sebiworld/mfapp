import { SxProps } from "@mui/material";

export const loadingOverlayStyles: SxProps = {
  display: "flex",
  position: "relative",
  justifyContent: "center",
  padding: "32px",

  "&.is-progress": {
    padding: 0,

    ".linear-progress": {
      position: "absolute",
      top: 0,
      left: 0,
      right: 0,
    },
  },

  "&.is-overlay": {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    zIndex: 1000,
    flexDirection: "column",
    justifyContent: "flex-start",
    alignItems: "center",
    backgroundColor: "var(--mf-palette-background-backdrop)",
    WebkitBackdropFilter: "blur(8px)",
    backdropFilter: "blur(8px)",
    padding: "64px 32px",
  },

  ".content-box": {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    width: "500px",
    maxWidth: "100%",
    padding: "16px",
    gap: "16px",

    ".spinner": {
      "--CircularProgress-progressColor":
        "var(--mf-palette-projectPrimary-500)",
    },
  },
};
