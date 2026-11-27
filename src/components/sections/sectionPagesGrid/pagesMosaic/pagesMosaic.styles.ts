import { SxProps, Theme } from "@mui/material";

/**
 * Soft white light for the tile spotlight.
 * @param x Horizontal centre of the light, as a CSS length or custom property.
 * @param y Vertical centre of the light, as a CSS length or custom property.
 * @returns The `background` value of the light layer.
 */
const spotlightBackground = (x: string, y: string): string =>
  `radial-gradient(circle at ${x} ${y}, rgba(255, 255, 255, 0.45), transparent 45%)`;

// The tiles are the only children and all links, so the `-of-type` selectors count them like `-child` ones would;
// emotion flags the `-child` forms as unsafe for server rendering.
export const pagesMosaicStyles: SxProps<Theme> = (theme) => ({
  // Six tracks: three tiles per row, and a last row of one or two tiles can still fill the width.
  display: "grid",
  gridTemplateColumns: "repeat(6, minmax(0, 1fr))",
  gap: "8px",

  [theme.breakpoints.down("md")]: {
    gridTemplateColumns: "repeat(2, minmax(0, 1fr))",

    // An odd last tile spans both columns.
    ".mosaic-tile:last-of-type:nth-of-type(odd)": {
      gridColumn: "span 2",
      aspectRatio: "8 / 3",
    },
  },

  ".mosaic-tile": {
    position: "relative",
    display: "block",
    gridColumn: "span 2",
    aspectRatio: "4 / 3",
    overflow: "hidden",
    backgroundColor: theme.vars.palette.common.black,
    textDecoration: "none",

    [theme.breakpoints.down("md")]: {
      gridColumn: "span 1",
    },

    // Poster accent on hover and focus: the title bar takes the brand colour.
    "&:hover .tile-title, &:focus-visible .tile-title": {
      backgroundColor: theme.vars.palette.primary.main,
      color: theme.vars.palette.primary.contrastText,
    },

    // The global focus ring would sit outside the tile and be cut by its neighbours.
    "&:focus-visible": {
      outlineOffset: "-4px",
    },

    // Spotlight between photo and title bar; `usePointerSpotlight` moves it with the mouse.
    "&::after": {
      content: '""',
      position: "absolute",
      inset: 0,
      zIndex: 1,
      pointerEvents: "none",
      background: spotlightBackground(
        "var(--spot-x, 50%)",
        "var(--spot-y, 50%)"
      ),
      mixBlendMode: "soft-light",
      opacity: 0,
      transition: "opacity 300ms var(--mf-ease-out)",
    },

    // Keyboard focus has no pointer position: the light stands in the middle.
    "&:focus-visible::after": {
      background: spotlightBackground("50%", "50%"),
      opacity: 1,
    },

    // Touch has no hover; a tap would leave the light and the zoom stuck on the tile.
    "@media (hover: hover) and (pointer: fine)": {
      "&:hover::after": {
        opacity: 1,
        transitionDuration: "200ms",
      },

      "&:hover .tile-image": {
        transform: "scale(1.03)",
        transition: "transform 450ms var(--mf-spring)",
      },
    },

    // Reduced motion: no zoom and a light that does not follow the mouse, only the fade stays.
    "@media (prefers-reduced-motion: reduce)": {
      "&::after, &:focus-visible::after": {
        background: spotlightBackground("50%", "50%"),
      },

      ".tile-image, &:hover .tile-image": {
        transform: "none",
        transition: "none",
      },
    },
  },

  [theme.breakpoints.up("md")]: {
    // A last row of one tile spans the full width, a last row of two shares it.
    ".mosaic-tile:last-of-type:nth-of-type(3n + 1)": {
      gridColumn: "span 6",
      aspectRatio: "4 / 1",
    },

    ".mosaic-tile:last-of-type:nth-of-type(3n + 2), .mosaic-tile:nth-last-of-type(2):nth-of-type(3n + 1)":
      {
        gridColumn: "span 3",
        aspectRatio: "2 / 1",
      },
  },

  ".tile-image": {
    position: "absolute",
    inset: 0,
    margin: 0,
    transition: "transform 300ms var(--mf-ease-out)",

    "img, picture": {
      display: "block",
      width: "100%",
      height: "100%",
      objectFit: "cover",
    },
  },

  // Black bar in the bottom left corner, so the title reads on any photo; it lies above the spotlight.
  ".tile-title": {
    position: "absolute",
    zIndex: 2,
    left: 0,
    bottom: 0,
    maxWidth: "100%",
    padding: "10px 16px",
    backgroundColor: theme.vars.palette.common.black,
    color: theme.vars.palette.common.white,
    fontWeight: 800,
    fontSize: "1.5rem",
    lineHeight: 1.1,
    overflowWrap: "break-word",
    hyphens: "auto",
    transition: "background-color 0.2s, color 0.2s",

    [theme.breakpoints.down("md")]: {
      padding: "6px 10px",
      fontSize: "1rem",
    },
  },
});
