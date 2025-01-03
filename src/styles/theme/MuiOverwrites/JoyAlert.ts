import { Components, Theme } from "@mui/joy";

export const JoyAlertOverwrites: Components<Theme> = {
  JoyAlert: {
    styleOverrides: {
      root: ({ theme }) => ({
        width: "450px",
        gap: "16px",

        ".alert-content": {
          ".alert-title": {
            ...theme.typography["title-lg"],
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
      }),
    },
  },
};
