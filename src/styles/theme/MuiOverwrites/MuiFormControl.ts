import { Components, Theme } from "@mui/material/styles";

export const MuiFormControlOverwrites: Components<Theme> = {
  MuiFormControl: {
    styleOverrides: {
      root: ({ theme }) => ({
        // display: "flex",
        // flexDirection: "column",
        // gap: "6px",

        "&>.MuiFormLabel-root": {
          margin: 0,
          fontWeight: "bold",
        },

        "&>.form-description": {
          fontSize: theme.typography.body2.fontSize,
          marginBottom: "4px",
        },

        "&:not(.successful)": {
          ".success-marker": {
            display: "none",
          },
        },
      }),
    },
  },
};
