import { Components, Theme } from "@mui/material/styles";

export const MuiCardOverwrites: Components<Theme> = {
  MuiCard: {
    styleOverrides: {
      root: {
        ".card-title": {
          fontSize: "1.3rem",
        },
      },
    },
  },

  MuiCardActions: {
    styleOverrides: {
      root: {
        variants: [
          {
            props: { disableSpacing: true },
            style: {
              padding: "0px",

              "&>*, &>.MuiButton-root": {
                borderRadius: "0",
                // flex: "1 1 auto",
              },
            },
          },
        ],
      },
    },
  },
};
