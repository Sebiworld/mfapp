import { keyframes } from "@emotion/react";
import { Theme } from "@mui/material";
import { SystemStyleObject } from "@mui/system";

// Moves the band by exactly one of its two copies.
const bandRun = keyframes`
  from {
    transform: translateX(0);
  }

  to {
    transform: translateX(-50%);
  }
`;

const REDUCED_MOTION = "@media (prefers-reduced-motion: reduce)";

/**
 * Styles of the filmstrip root; outer spacing is left to the place that shows the strip.
 * @param theme App theme.
 * @returns The sx object for the `.filmstrip` element.
 */
export const performanceFilmstripStyles = (
  theme: Theme
): SystemStyleObject<Theme> => ({
  position: "relative",
  padding: "18px 0",
  overflow: "hidden",
  background: "#151515",

  // Perforation along both edges.
  "&::before, &::after": {
    content: '""',
    position: "absolute",
    left: 0,
    right: 0,
    height: "6px",
    backgroundImage:
      "repeating-linear-gradient(90deg, rgba(255, 255, 255, 0.5) 0 8px, transparent 8px 20px)",
    pointerEvents: "none",
  },

  "&::before": {
    top: "6px",
  },

  "&::after": {
    bottom: "6px",
  },

  ".filmstrip-track": {
    display: "flex",
  },

  "&.is-running .filmstrip-track": {
    width: "max-content",
    animation: `${bandRun} var(--filmstrip-duration) linear infinite`,
  },

  // While the band is browsed with the keyboard it stands still at the shift set inline.
  "&.is-running.is-browsing .filmstrip-track": {
    animation: "none",
    transition: "transform 200ms ease",

    [REDUCED_MOTION]: {
      transition: "none",
    },
  },

  // Paused only through the class: hover sticks after a tap and focus stays on a clicked tile, so both would
  // keep the band standing after the reader has moved on.
  "&.is-paused .filmstrip-track": {
    animationPlayState: "paused",
  },

  // Margins instead of a gap keep both copies exactly equal in width, so the loop has no jump.
  ".filmstrip-slot": {
    display: "block",
    marginRight: "8px",
  },

  "&.is-static .filmstrip-track": {
    flexWrap: "wrap",
    justifyContent: "center",
    gap: "8px",
    padding: "0 16px",
  },

  ".filmstrip-tile": {
    position: "relative",
    display: "block",
    width: "112px",
    padding: 0,
    border: 0,
    overflow: "hidden",
    borderRadius: "3px",
    background: "#2a2a2a",
    color: "#fff",
    cursor: "pointer",
    font: "inherit",
    textAlign: "left",

    [theme.breakpoints.down("sm")]: {
      width: "96px",
    },

    "&:focus-visible": {
      outline: `2px solid ${theme.vars.palette.projectPrimary.main}`,
      outlineOffset: "-2px",
    },
  },

  // Taller than the usual 3:4 portrait: name and role cover the lower part, so the face keeps room above them.
  ".filmstrip-image": {
    display: "block",
    aspectRatio: "2 / 3",

    "img, picture, figure": {
      display: "block",
      width: "100%",
      height: "100%",
      margin: 0,
      objectFit: "cover",
    },
  },

  // Name and role always sit on a dark gradient at the foot of the portrait. Long names wrap, so the block
  // grows upwards; the gradient stops are fixed from its top, so every line stays on the dark part.
  ".filmstrip-caption": {
    position: "absolute",
    left: 0,
    right: 0,
    bottom: 0,
    display: "flex",
    flexDirection: "column",
    padding: "36px 6px 6px",
    background:
      "linear-gradient(transparent, rgba(0, 0, 0, 0.6) 22px, rgba(0, 0, 0, 0.9) 50px)",
    color: "#fff",
    fontSize: "0.75rem",
    lineHeight: 1.25,
    textShadow: "0 1px 2px rgba(0, 0, 0, 0.8)",

    // Wrapped in full like on the role overview; breaking inside a word is only the last resort.
    ".filmstrip-name, .filmstrip-role": {
      display: "block",
      overflowWrap: "break-word",
    },

    ".filmstrip-name": {
      fontWeight: "bold",
    },

    ".filmstrip-role": {
      opacity: 0.9,
    },
  },
});
