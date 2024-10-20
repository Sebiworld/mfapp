import { SxProps } from "@mui/joy/styles/types";

export const sidebarBoxEventsStyles: SxProps = {
  ".lists-wrapper": {
    display: "flex",
    flexDirection: "column",
    gap: "32px",
  },

  ".performances-wrapper": {
    display: "flex",
    flexDirection: "column",
    gap: "12px",

    ".description": {
      fontStyle: "italic",
      paddingX: '16px'
    },
  },

  ".performances-container": {
    display: "flex",
    flexDirection: "column",
    gap: "8px",
    maxHeight: "260px",
    overflow: "auto",
  },

  ".performance-card": {
    paddingTop: "8px",
    fontSize: "xs",
  },

  ".date": {
    fontWeight: "xl",
    lineHeight: "1.2",
  },

  ".cast": {
    justifyContent: "center",
    fontSize: "xs",
    // fontWeight: "xl",
    letterSpacing: "1px",
    textTransform: "uppercase",
  },
};
