import { Interpolation } from "@emotion/react";
import { Theme } from "@mui/material";

export const globalVariablesStyles: Interpolation<Theme>[] = [
  {
    ":root": {
      "--mf-radius-sm": 0,
    },
  },
];
