import { Components, Theme } from "@mui/material/styles";

export const MuiPickersInputOverwrites: Components<Theme> = {
  MuiChip: {
    styleOverrides: {
      root: {
        color: "red!important",
        borderRadius: "0px",
        borderWidth: "1px",
        borderColor: "#e91e63",
        border: "1px solid",
        backgroundColor: "#880e4f",
      },
    },
  },
};
