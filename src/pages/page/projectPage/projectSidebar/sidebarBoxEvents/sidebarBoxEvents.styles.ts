import { SxProps } from "@mui/material";

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
      paddingX: "16px",
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
    overflow: "visible",

    ".MuiCardContent-root": {
      paddingTop: "8px",
      paddingBottom: "8px",
      fontSize: "13px",
    },
  },

  ".season": {
    opacity: 0.5,
    fontSize: "14px",
  },

  ".date": {
    fontWeight: "bold",
    fontSize: "14px",
  },

  ".casts-container": {
    display: "flex",
    gap: "4px",
    flexWrap: "wrap",
    textTransform: "uppercase",
    marginTop: "4px",
    marginLeft: "-8px",
    marginRight: "-8px",
    fontSize: "13px",

    ".cast": {
      fontSize: "14px",
    },
  },
};
