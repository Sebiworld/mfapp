import { Components, Theme } from "@mui/material/styles";

export const MuiPickersInputOverwrites: Components<Theme> = {
  MuiChip: {
    styleOverrides: {
      root: {
        borderRadius: "2px",
      },
    },
  },
};
