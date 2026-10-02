import { SxProps, Theme } from "@mui/material";

export const sectionPagesGridStyles: SxProps<Theme> = (theme) => ({
  ".actions-container": {
    position: "relative",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },

  // The band above the partners reaches 6vw up into this section; the tiles keep clear of it on wide screens.
  "&.section.tiles-mosaic:not(.np)": {
    paddingBottom: "max(64px, calc(6vw + 8px))",

    [theme.breakpoints.down("md")]: {
      paddingBottom: "42px",
    },
  },

  // An aside adds to the section above it: text on the left, cards on the right, without a gap of its own.
  "&.aside": {
    display: "grid",
    gridTemplateColumns: "repeat(2, minmax(0, 1fr))",
    columnGap: "48px",
    alignItems: "start",

    "&>*": {
      gridColumn: 1,
    },

    ".section-title": {
      width: "auto",
      fontSize: "28px",

      [theme.breakpoints.down("sm")]: {
        fontSize: "24px",
      },
    },

    ".pages-grid": {
      gridColumn: 2,
      gridRow: "1 / span 3",
    },

    [theme.breakpoints.down("md")]: {
      gridTemplateColumns: "minmax(0, 1fr)",

      ".pages-grid": {
        gridColumn: 1,
        gridRow: "auto",
      },
    },
  },

  // Follows its parent section in the same chapter, so it does not need a top padding of its own.
  ".section + &.aside": {
    paddingTop: 0,
  },
});
