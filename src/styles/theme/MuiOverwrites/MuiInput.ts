import { Components, Theme } from "@mui/material/styles";

export const MuiInputOverwrites: Components<Theme> = {
  MuiInputBase: {
    styleOverrides: {
      root: {
        paddingRight: "16px",

        "&>Input": {
          paddingLeft: "16px",
          paddingTop: "12px",
          paddingBottom: "12px",
        },
      },
    },
  },

  MuiOutlinedInput: {
    styleOverrides: {
      root: {
        paddingRight: "16px",
      },
    },
  },
};
