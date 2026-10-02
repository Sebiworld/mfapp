import { SxProps, Theme } from "@mui/material";

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

    "img, picture": {
      display: "block",
      width: "100%",
      height: "100%",
      objectFit: "cover",
    },
  },

  // Black bar in the bottom left corner, so the title reads on any photo.
  ".tile-title": {
    position: "absolute",
    zIndex: 1,
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
