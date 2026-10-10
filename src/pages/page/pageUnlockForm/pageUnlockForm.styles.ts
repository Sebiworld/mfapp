import { SxProps, Theme } from "@mui/material";

export const pageUnlockFormStyles: SxProps<Theme> = {
  display: "flex",
  flexDirection: "column",
  alignItems: "flex-start",
  gap: "16px",
  width: "100%",
  maxWidth: "26em",

  ".notice": {
    display: "flex",
    alignItems: "flex-start",
    gap: "8px",
    margin: 0,
  },

  ".notice-icon": {
    flexShrink: 0,
    marginTop: "2px",
    opacity: 0.7,
  },

  ".password-input": {
    width: "100%",
  },

  // Immediate feedback on press; the request itself may take a moment.
  ".submit-button": {
    transition: "transform 160ms cubic-bezier(0.23, 1, 0.32, 1)",

    "&:active": {
      transform: "scale(0.97)",
    },
  },

  "@media (prefers-reduced-motion: reduce)": {
    ".submit-button:active": {
      transform: "none",
    },
  },
};
