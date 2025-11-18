import { Components, Theme } from "@mui/material/styles";

declare module "@mui/material/Button" {
  interface ButtonPropsColorOverrides {
    light: true;
    dark: true;
    bg: true;
    contrast: true;
    projectPrimary: true;
  }
}

export const MuiButtonOverwrites: Components<Theme> = {
  MuiButton: {
    styleOverrides: {
      root: {
        fontWeight: "bold",
        textTransform: "none",
        lineHeight: "1.2",

        "&.image-button": {
          padding: 0,
        },

        "&.icon-only": {
          minWidth: "32px",
          width: "32px",
          height: "32px",
          padding: 0,

          "&>.MuiButton-startIcon": {
            margin: 0,
          },
        },
      },
    },
  },

  MuiIconButton: {
    styleOverrides: {
      root: {
        borderRadius: "4px",
      },
    },
  },

  MuiButtonGroup: {
    styleOverrides: {
      root: {
        ".MuiButtonGroup-middleButton, .MuiButtonGroup-firstButton, .MuiButtonGroup-lastButton":
          {
            borderColor: "rgba( 0, 0, 0, 0.4)",
          },
      },
    },
  },
};
