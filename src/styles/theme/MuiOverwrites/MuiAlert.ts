import { Components, Theme } from "@mui/material/styles";

export const MuiAlertOverwrites: Components<Theme> = {
  MuiAlert: {
    styleOverrides: {
      root: {
        width: "450px",
        gap: "16px",

        ".alert-content": {
          ".alert-title": {
            color: "var(--variant-solidColor)",
          },
          p: {
            color: "var(--variant-solidColor)",
          },
        },

        ".alert-footer": {
          display: "flex",
          flexDirection: "row",
          gap: "4px",
          flexWrap: "wrap",
          marginTop: "8px",
        },
      },
    },
  },
};
