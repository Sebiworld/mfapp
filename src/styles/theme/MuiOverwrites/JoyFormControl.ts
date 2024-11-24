import { Components, Theme } from "@mui/joy";

export const JoyFormControl: Components<Theme> = {
  JoyFormControl: {
    styleOverrides: {
      root: ({ theme }) => ({
        display: "flex",
        flexDirection: "column",
        gap: "6px",

        "&>.MuiFormLabel-root": {
          margin: 0,
          fontWeight: "bold",
        },

        "&>.form-description": {
          fontSize: theme.fontSize.sm,
          marginBottom: '4px'
        },
      }),
    },
  },
};
