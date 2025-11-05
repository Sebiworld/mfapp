import { SxProps, Theme } from "@mui/material";

export const footerStyles: SxProps<Theme> = (theme) => ({
  position: "relative",
  marginTop: "64px",

  ".mf-logo": {
    width: "200px",
    maxWidth: "100%",
    margin: "24px auto",
  },

  ".section-spacer.section-spacer": {
    "--background-color": theme.vars.palette.background.paper,
    position: "absolute",
    top: "calc(-1 * 6vw)",
    width: "100%",
  },

  ".footer": {
    padding: "64px 32px 16px 32px",
    textAlign: "center",
    backgroundImage: "none",

    "&>p": {
      marginLeft: "auto",
      marginRight: "auto",
    },
  },

  ".greeting": {
    fontSize: "7vw",
    width: "6em",
    fontWeight: "bold",
    marginBottom: "32px",
  },

  ".mobile-reach-out": {
    position: "relative",
    display: "block",
    marginTop: "64px",

    ".social-actions": {
      position: "relative",
      display: "flex",
      flexDirection: "row",
      justifyContent: "center",
      flexWrap: "wrap",
      gap: "4px",
      transition: "all 0.4s ease-in",
      marginTop: "8px",

      ".btn": {
        zIndex: "100",
        margin: 0,

        "&.icon-button": {
          "--padding-top": "4px",
          "--padding-bottom": "4px",
          "--padding-left": "4px",
          "--padding-right": "4px",
          "--padding-start": 0,
          "--padding-end": 0,
          height: "40px",
          width: "40px",
        },
      },
    },
  },

  ".reach-out-wrapper": {
    position: "relative",
    display: "none",
    justifyContent: "flex-end",
    padding: "32px 64px 0 64px",

    [theme.breakpoints.up("md")]: {
      display: "flex",
    },

    "&>svg": {
      position: "relative",
      display: "block",
      width: "80%",
      maxWidth: "100%",

      ".arrow": {
        fill: "var(--dark)",
        fillOpacity: "0.8",
      },

      ".here": {
        display: "block",
        fontSize: "8px",
        fontWeight: "bold",
        fill: "var(--dark)",
      },
    },
  },

  ".from-container": {
    position: "relative",
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-end",
    gap: "0.4em",
    overflow: "visible",
    marginTop: "64px",
    padding: "0 48px",

    [theme.breakpoints.down("md")]: {
      justifyContent: "center",
      padding: 0,
    },
  },

  hr: {
    marginTop: "8px",
    marginLeft: "32px",
    marginRight: "32px",
    marginBottom: "8px",

    [theme.breakpoints.down("md")]: {
      marginLeft: 0,
      marginRight: 0,
    },
  },

  ".bottom-wrapper": {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    flexWrap: "wrap",
    gap: "8px",
    padding: "0 48px 0 32px",
    fontSize: theme.typography.body2.fontSize,

    [theme.breakpoints.down("md")]: {
      flexDirection: "column",
      padding: 0,
      alignItems: "flex-start",
    },
  },

  ".tertiary-navigation": {
    display: "flex",
    flexDirection: "row",
    // marginTop: "64px",
    flexWrap: "wrap",
    // width: "100%",
    justifyContent: "flex-start",
    // gap: '8px',
    padding: 0,

    "&>li": {
      width: "auto",
    },

    ".MuiListItemButton-root": {
      justifyContent: "center",
      fontSize: theme.typography.body2.fontSize,
    },
  },

  ".copyright": {
    display: "block",

    [theme.breakpoints.down("md")]: {
      paddingLeft: "16px",
      paddingRight: "16px",
    },
  },
});
