import { SxProps } from "@mui/material";

export const sidebarBoxEventsStyles: SxProps = {
  ".lists-wrapper": {
    display: "flex",
    flexDirection: "column",
    gap: "32px",
  },

  ".events-section": {
    display: "flex",
    flexDirection: "column",
    gap: "12px",

    "&>.description": {
      fontStyle: "italic",
      paddingX: "16px",
    },
  },

  ".events-container": {
    display: "flex",
    flexDirection: "column",
    gap: "24px",
    maxHeight: "260px",
    overflow: "auto",
  },

  ".event-item": {
    overflow: "visible",
    paddingLeft: "16px",
    // paddingRight: '16px',

    // ".MuiCardContent-root": {
    //   paddingTop: "8px",
    //   paddingBottom: "8px",
    //   fontSize: "13px",
    // },
  },

  ".seasons-container": {
    // opacity: 0.5,
    fontSize: "14px",
    marginLeft: "-8px",
    // marginRight: "-8px",

    ".season": {
      borderRadius: "0px",
    },
  },

  ".event-title": {
    fontWeight: "bold",
    fontSize: "14px",
  },

  ".date": {
    fontWeight: "bold",
    fontSize: "14px",
    marginTop: "2px",
  },

  ".casts-container": {
    display: "flex",
    gap: "4px",
    flexWrap: "wrap",
    textTransform: "uppercase",
    marginTop: "2px",
    marginLeft: "-8px",
    // marginRight: "-8px",
    fontSize: "13px",

    ".cast": {
      fontSize: "12px",
    },
  },
};
