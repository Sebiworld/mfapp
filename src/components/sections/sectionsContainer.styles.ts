import { SxProps, Theme } from "@mui/material";
import { SystemStyleObject } from "@mui/system";

/** Curtain Black, where the secondary surface's gradient ends and the band after it starts. */
const SECONDARY_END_COLOR = "#121212";

/** Chapter surfaces with a flat colour; each has a `--surface-<name>` variable on the container. */
const FLAT_SURFACES = ["page", "default", "paper", "secondary-light"];

/**
 * Defines one CSS variable per chapter surface (`--surface-<name>`), for every element that paints one.
 * @param theme App theme.
 * @returns The variable definitions, including the dark colour scheme.
 */
export const chapterSurfaceVariables = (
  theme: Theme
): SystemStyleObject<Theme> => ({
  "--surface-page": theme.vars.palette.background.default,
  "--surface-default": theme.vars.palette.background.default,
  "--surface-paper": theme.vars.palette.background.paper,
  "--surface-secondary-light": "var(--mf-palette-secondary-50)",
  // Where the band enters the secondary gradient it meets the start colour, where it leaves it the end colour.
  "--surface-secondary-start": theme.vars.palette.secondary.main,
  "--surface-secondary-end": SECONDARY_END_COLOR,

  ...theme.applyStyles("dark", {
    "--surface-secondary-light": "var(--mf-palette-secondary-900)",
  }),
});

export const sectionContainerStyles: SxProps<Theme> = (theme) => ({
  // One colour per surface, shared by the chapters and the bands between them.
  ...chapterSurfaceVariables(theme),

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

    "&.band-secondary .section-spacer.section-spacer": {
      "--main-color": theme.vars.palette.secondary.main,
    },

    ...Object.fromEntries(
      FLAT_SURFACES.flatMap((surface) => [
        [`&.from-${surface}`, { "--from-surface": `var(--surface-${surface})` }],
        [`&.to-${surface}`, { "--to-surface": `var(--surface-${surface})` }],
      ])
    ),

    "&.from-secondary": {
      "--from-surface": "var(--surface-secondary-end)",
    },

    "&.to-secondary": {
      "--to-surface": "var(--surface-secondary-start)",
    },
  },

  // A section that draws its own bottom band (partners) may close a chapter without a section break; its band then
  // takes colour and wedge from the next chapter and lies above that chapter's surface where the two overlap.
  ".chapter:has(+ .chapter) .section-spacer.position-bottom": {
    zIndex: 1,
  },

  ".chapter:has(+ .chapter.band-secondary) .section-spacer.position-bottom": {
    "--main-color": theme.vars.palette.secondary.main,
  },

  ...Object.fromEntries(
    FLAT_SURFACES.map((surface) => [
      `.chapter:has(+ .chapter.surface-${surface}) .section-spacer.position-bottom`,
      { "--background-color": `var(--surface-${surface})` },
    ])
  ),

  ".chapter:has(+ .chapter.surface-secondary) .section-spacer.position-bottom": {
    "--background-color": "var(--surface-secondary-start)",
  },

  ".chapter": {
    position: "relative",

    ...Object.fromEntries(
      FLAT_SURFACES.filter((surface) => surface !== "page").map((surface) => [
        `&.surface-${surface}`,
        { backgroundColor: `var(--surface-${surface})` },
      ])
    ),

    // Same in both colour schemes: next to true black (dark) and white (light) the slate surface stands out either way.
    "&.surface-secondary": {
      // At 170deg the top edge spans width × sin(10deg) ≈ 17.4vw along the gradient; holding the start colour that far
      // keeps the whole edge in the band wedge's colour.
      background:
        "linear-gradient(170deg, var(--surface-secondary-start) 18vw, var(--surface-secondary-end) 65%)",
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
