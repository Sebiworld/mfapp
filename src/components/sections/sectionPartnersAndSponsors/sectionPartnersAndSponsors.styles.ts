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

        img: {
          width: "100%",
        },
      },
    },

    "&.sponsors-list": {
      ".list": {
        gridTemplateColumns: "repeat(auto-fill, minmax(140px, 1fr))",
      },

      ".list-item": {
        filter: "grayscale(100%)",
        transition: "filter 0.5s",

        "&:hover, &:focus": {
          filter: "none",
        },
      },
    },
  },
});
