import { SxProps, Theme } from "@mui/material";

const MORPH_TRANSITION =
  "transform 500ms var(--mf-spring), opacity 200ms var(--mf-ease-out)";

/**
 * Styles of the sun that turns into a moon: rays draw in, the core grows and a masked disc slides over it to leave a
 * crescent.
 */
export const themeToggleIconStyles: SxProps<Theme> = {
  overflow: "visible",

  ".core, .bite, .rays": {
    transformBox: "fill-box",
    transformOrigin: "center",
  },

  ".core": {
    fill: "currentColor",
    transition: "transform 500ms var(--mf-spring)",
  },

  // Black in the mask hides the core, so the crescent stays see-through on every surface.
  ".bite": {
    fill: "#000",
    transform: "translate(9px, -9px) scale(0.4)",
    opacity: 0,
    transition: MORPH_TRANSITION,
  },

  ".rays": {
    stroke: "currentColor",
    strokeWidth: 2,
    strokeLinecap: "round",
    transition: MORPH_TRANSITION,
  },

  "&.is-dark": {
    ".core": {
      transform: "scale(1.6)",
    },

    ".bite": {
      transform: "none",
      opacity: 1,
    },

    ".rays": {
      transform: "rotate(90deg) scale(0.3)",
      opacity: 0,
    },
  },

  "@media (prefers-reduced-motion: reduce)": {
    ".core, .bite, .rays": {
      transition: "opacity 150ms var(--mf-ease-out)",
    },
  },
};
