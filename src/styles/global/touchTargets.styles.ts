import { Interpolation } from "@emotion/react";
import { Theme } from "@mui/material";

/** Edge offset that grows a hit area to at least 44px and never shrinks a larger one. */
const GROW_TO_MIN = "min(0px, calc((100% - 44px) / 2))";

/**
 * On touch screens buttons get an invisible hit area of at least 44 × 44px, so small buttons are easy to tap
 * without looking larger. MUI's ButtonBase is positioned, so the pseudo element extends around it.
 */
export const globalTouchTargetStyles: Interpolation<Theme>[] = [
  {
    "@media (pointer: coarse)": {
      ".MuiButtonBase-root::after": {
        content: '""',
        position: "absolute",
        top: GROW_TO_MIN,
        bottom: GROW_TO_MIN,
        left: GROW_TO_MIN,
        right: GROW_TO_MIN,
      },
    },
  },
];
