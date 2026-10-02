import { SxProps, Theme } from "@mui/material";

/** Curtain Black, where the feature surface's gradient ends and the band after it starts. */
const FEATURE_END_COLOR = "#121212";

export const sectionContainerStyles: SxProps<Theme> = (theme) => ({
  // The band pulls into the paddings of both neighbours so it reads as the seam between them, not as a section.
  // It shows the surface it leaves; its wedge cuts in with the surface it opens.
  ".section-break": {
    position: "relative",
    zIndex: 2,
    marginTop: "-32px",
    marginBottom: "-32px",
    backgroundColor: "var(--from-surface)",

    [theme.breakpoints.down("md")]: {
      marginTop: "-18px",
      marginBottom: "-18px",
    },

    ".section-spacer.section-spacer": {
      "--background-color": "var(--to-surface)",
    },

    "&.from-page, &.from-default": {
      "--from-surface": theme.vars.palette.background.default,
    },

    "&.from-paper": {
      "--from-surface": theme.vars.palette.background.paper,
    },

    "&.from-feature": {
      "--from-surface": FEATURE_END_COLOR,
    },

    "&.to-default": {
      "--to-surface": theme.vars.palette.background.default,
    },

    "&.to-paper": {
      "--to-surface": theme.vars.palette.background.paper,
    },

    "&.to-feature": {
      "--to-surface": theme.vars.palette.secondary.main,
    },
  },

  ".chapter": {
    position: "relative",

    "&.surface-default": {
      backgroundColor: theme.vars.palette.background.default,
    },

    "&.surface-paper": {
      backgroundColor: theme.vars.palette.background.paper,
    },

    // Same in both colour schemes: next to true black (dark) and white (light) the slate surface stands out either way.
    "&.surface-feature": {
      // At 170deg the top edge spans width × sin(10deg) ≈ 17.4vw along the gradient; holding the start colour that far
      // keeps the whole edge in the band wedge's colour.
      background: `linear-gradient(170deg, ${theme.vars.palette.secondary.main} 18vw, ${FEATURE_END_COLOR} 65%)`,
      color: theme.vars.palette.common.white,
    },
  },

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
