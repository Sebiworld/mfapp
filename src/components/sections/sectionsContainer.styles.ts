import { SxProps, Theme } from "@mui/material";

export const sectionContainerStyles: SxProps<Theme> = (theme) => ({
  ".section": {
    position: "relative",
    display: "flex",
    flexDirection: "column",
    gap: "32px",

    [theme.breakpoints.down("md")]: {
      gap: "16px",
    },

    "&:not(.np)": {
      padding: "64px",

      [theme.breakpoints.down("md")]: {
        padding: "42px 24px",
      },
    },

    "&>.alerts-container": {
      paddingTop: 0,
    },

    "&.center": {
      alignItems: "center",
      textAlign: "center",

      "&>.alerts-container": {
        alignItems: "center",
      },
    },

    ".section-title": {
      position: "relative",
      maxWidth: "100%",
      width: "38em",
      alignSelf: "center",
      fontSize: "48px",

      [theme.breakpoints.down("md")]: {
        fontSize: "32px",
        marginBottom: "4px",
      },

      [theme.breakpoints.down("sm")]: {
        fontSize: "24px",
        marginBottom: "0",
      },
    },

    ".sub-section": {
      position: "relative",
      display: "flex",
      flexDirection: "column",
      gap: "32px",
      padding: "64px",

      [theme.breakpoints.down("md")]: {
        padding: "48px 24px",
      },
    },
  },
});
