import { SxProps, Theme } from "@mui/material";

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

        // The logos are images with a white background baked in; dimmed, the white tiles no longer glare on black.
        ...theme.applyStyles("dark", {
          filter: "brightness(0.85)",
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

      ".list-item": {
        filter: "grayscale(100%)",
        transition: "filter 0.5s",

        "&:hover, &:focus": {
          filter: "none",
        },

        // Grey logos on white turn into light logos on dark tiles; hover and focus still show the original.
        ...theme.applyStyles("dark", {
          filter: "grayscale(100%) invert(100%)",

          "&:hover, &:focus": {
            filter: "none",
          },
        }),
      },
    },
  },
});
