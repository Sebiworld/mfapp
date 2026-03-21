import { Components, Theme } from "@mui/material/styles";

declare module "@mui/material/Chip" {
  interface ChipPropsColorOverrides {
    light: true;
    dark: true;
    contrast: true;
    projectPrimary: true;
  }
}

export const MuiChipOverwrites: Components<Theme> = {
  MuiChip: {
    styleOverrides: {
      root: {
        variants: [
          {
            props: { variant: "outlined", color: "primary" },
            style: {
              // backgroundColor: `rgba(${theme.vars.palette.primary.mainChannel} / 0.12)`,
            },
          },
        ],
      },
    },
  },
};
