import { createTheme } from "@mui/material";
import type {} from "@mui/x-date-pickers/themeAugmentation";

export const mfMaterialTheme = createTheme({
  cssVariables: false,
  components: {
    MuiChip: {
      styleOverrides: {
        root: ({ theme }) => ({
          variants: [
            {
              props: { variant: "outlined", color: "primary" },
              style: {
                backgroundColor: `rgba(${theme.vars.palette.primary.mainChannel} / 0.12)`,
              },
            },
          ],
        }),
      },
    },
    MuiPickersInput: {
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
  },
});
