import { SxProps, Theme } from "@mui/material";

const DIM = 0.85;
const DIMMED_TILE = `color-mix(in srgb, var(--mf-palette-light-100) ${DIM * 100}%, black)`;
// 255 minus the dimmed tile (light-100 is rgb(253, 253, 253)), what the inverted logos sit on.
const INVERTED_DIMMED_TILE = "rgb(40, 40, 40)";

export const sectionPartnersAndSponsorsStyles: SxProps<Theme> = (theme) => ({
  "&.section.section": {
    backgroundColor: theme.vars.palette.background.paper,
    gap: "32px",
    paddingBottom: "32px",
  },

  ".section-spacer.position-top": {
    "--background-color": theme.vars.palette.background.paper,
    position: "absolute",
    top: "calc(-1 * 6vw)",
    width: "100%",
  },

  ".section-spacer.position-bottom": {
    position: "absolute",
    bottom: "calc(-1 * 2vw)",
    width: "100%",
  },

  ".introduction": {
    position: "relative",
  },

  ".list-container.list-container": {
    paddingTop: "16px",
    paddingBottom: "16px",
    gap: '16px',

    ".list": {
      position: "relative",
      display: "grid",
      gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))",
      gap: "16px",

      // Two partner logos per row on phones; one full-width square per logo makes the list several screens long.
      [theme.breakpoints.down("sm")]: {
        gridTemplateColumns: "repeat(2, minmax(0, 1fr))",
        gap: "8px",
      },
    },

    ".list-title": {
      ...theme.typography.h5,

      "&::after": {
        content: "':'"
      }
    },

    ".list-item": {
      ".item-wrapper": {
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "16px",
        backgroundColor: "var(--mf-palette-light-100)",

        [theme.breakpoints.down("sm")]: {
          padding: "8px",
        },

        img: {
          width: "100%",
        },
      },
    },

    // The logos are images with a white background baked in; dimmed, the white tiles no longer glare on black.
    // Each logo gets exactly one filter, set on the img itself: nested filters on the tile and its wrapper are
    // composed wrongly by iOS Safari. The tile colour is therefore set directly instead of being filtered.
    "&.partners-list": {
      ".list-item .item-wrapper": {
        ...theme.applyStyles("dark", {
          backgroundColor: DIMMED_TILE,

          img: {
            filter: `brightness(${DIM})`,
          },
        }),
      },
    },

    "&.sponsors-list": {
      ".list": {
        gridTemplateColumns: "repeat(auto-fill, minmax(140px, 1fr))",

        [theme.breakpoints.down("sm")]: {
          gridTemplateColumns: "repeat(3, minmax(0, 1fr))",
        },
      },

      ".list-item .item-wrapper": {
        img: {
          filter: "grayscale(100%)",
        },

        // Grey logos on white turn into light logos on dark tiles (the inverse of the dimmed partner tile).
        ...theme.applyStyles("dark", {
          backgroundColor: INVERTED_DIMMED_TILE,
          borderColor: "rgba(0, 0, 0, 0.12)",

          img: {
            filter: `brightness(${DIM}) grayscale(100%) invert(100%)`,
          },
        }),
      },

      // Touch devices keep the grey logos; hover is sticky there and would leave a logo in colour after a tap.
      "@media (hover: hover)": {
        ".list-item .item-wrapper": {
          transition: "background-color 0.5s, border-color 0.5s",

          img: {
            transition: "filter 0.5s",
          },
        },

        ".list-item:hover .item-wrapper, .list-item:focus-visible .item-wrapper": {
          img: {
            filter: "none",
          },

          ...theme.applyStyles("dark", {
            backgroundColor: DIMMED_TILE,
            borderColor: "rgba(255, 255, 255, 0.12)",

            img: {
              filter: `brightness(${DIM})`,
            },
          }),
        },
      },
    },
  },
});
