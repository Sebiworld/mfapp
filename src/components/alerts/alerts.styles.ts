import { SxProps, Theme } from "@mui/material";

export const alertsStyles: SxProps<Theme> = {
  display: "flex",
  flexDirection: "column",
  padding: "20px 32px 0 32px",
  gap: "8px",
  alignItems: "center",

  ".alert-item": {
    "&>.MuiAlert-icon": {
      fontSize: "32px",
      alignItems: "center",
    },

    ".alert-title": {
      fontWeight: "bold",
      fontSize: "16px",
      marginBottom: "4px",
    },

    ".alert-content": {
      fontSize: "16px",

      "&>p:first-of-type": {
        marginTop: 0,
      },

      "&>p:last-child": {
        marginBottom: 0,
      },
    },

    "&.width-full": {
      width: "100%",
    },

    "&.width-600": {
      width: "600px",
    },

    "&.width-800": {
      width: "800px",
    },

    "&.width-1000": {
      width: "1000px",
    },
  },
};
