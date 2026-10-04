import { SxProps, Theme } from "@mui/material";
import { SystemStyleObject } from "@mui/system";

const PORTRAIT_WIDTH = 160;
// Horizontal space on each side of the portraits inside a cast column.
const CAST_COLUMN_INSET = 10;
const CAST_COLUMN_WIDTH = PORTRAIT_WIDTH + 2 * CAST_COLUMN_INSET;

/**
 * Left-aligns title, description and actions of a subrole so they start where its first portrait starts.
 * @param theme App theme.
 * @param inset Horizontal inset matching the first portrait.
 * @param insetMd Inset from the `md` breakpoint on.
 * @returns Styles for the subrole element.
 */
const leftAlignedSubroleHeader = (
  theme: Theme,
  inset: string,
  insetMd: string
): SystemStyleObject<Theme> => {
  const padding = {
    paddingLeft: inset,
    paddingRight: inset,

    [theme.breakpoints.up("md")]: {
      paddingLeft: insetMd,
      paddingRight: insetMd,
    },
  };

  return {
    alignItems: "stretch",

    ".subrole-title, .subrole-description": {
      alignItems: "flex-start",
      textAlign: "left",
      ...padding,
    },

    // Content blocks centre paragraphs in a 38em measure; here they start at the left edge with the title.
    ".subrole-description > *": {
      alignSelf: "flex-start",
    },

    ".subrole-actions": {
      justifyContent: "flex-start",
      ...padding,
    },
  };
};

export const projectRoleStyles: SxProps<Theme> = (theme) => ({
  ".season-selection": {
    position: "relative",
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: "32px",
  },

  ".casts-container": {
    // Fixed, left-packed columns one portrait wide, so the dividers line up across all roles; when the columns
    // do not fit, the container scrolls instead of the page. Further portraits of a cast stack below.
    display: "grid",
    gridAutoFlow: "column",
    gridAutoColumns: `${CAST_COLUMN_WIDTH}px`,
    justifyContent: "start",
    overflowX: "auto",
    overscrollBehaviorX: "contain",
    scrollSnapType: "x proximity",
    maxWidth: "100%",
    // The scroll box clips everything outside it; this room keeps the portrait card shadows visible.
    paddingTop: "4px",
    paddingBottom: "8px",
    paddingLeft: "16px",
    paddingRight: "16px",
    // Snapping keeps the side padding visible instead of scrolling it away on load.
    scrollPaddingLeft: "16px",

    [theme.breakpoints.up("md")]: {
      paddingLeft: "48px",
      paddingRight: "48px",
      scrollPaddingLeft: "48px",
    },

    ".project-role-portraits": {
      width: "100%",
    },

    ".portraits-container": {
      paddingLeft: 0,
      paddingRight: 0,
    },

    ".cast": {
      minWidth: 0,
      scrollSnapAlign: "start",

      "&:not(:first-of-type)": {
        borderLeft: `1px solid ${theme.palette.contrast[50]}`,
      },

      ".cast-title": {
        textAlign: "left",
        fontWeight: "bold",
        overflowWrap: "break-word",
        hyphens: "auto",
        paddingLeft: `${CAST_COLUMN_INSET}px`,
        paddingRight: `${CAST_COLUMN_INSET}px`,
      },

      ".portraits-container": {
        paddingLeft: `${CAST_COLUMN_INSET}px`,
        paddingRight: `${CAST_COLUMN_INSET}px`,
      },
    },
  },

  ".subroles-container": {
    display: "flex",
    flexDirection: "column",
    gap: "82px",
  },

  ".project-subrole": {
    position: "relative",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    gap: "16px",

    ".subrole-title": {
      textAlign: "center",
      paddingLeft: "16px",
      paddingRight: "16px",
    },

    ".subrole-description": {
      position: "relative",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      textAlign: "center",
      paddingLeft: "16px",
      paddingRight: "16px",
    },

    // A description reads as a subline of the title, so it sits close to it and the actions follow closely.
    ".subrole-title + .subrole-description": {
      marginTop: "-12px",
    },

    ".subrole-description + .subrole-actions": {
      marginTop: "-8px",
    },

    ".subrole-actions": {
      display: "flex",
      flexDirection: "row",
      justifyContent: "center",
      alignItems: "center",
      gap: "8px",
      flexWrap: "wrap",
    },

    ".project-role-portraits": {
      width: "100%",
    },

    // Groups that just list portraits read from the left edge, so the heading lines up with the first portrait.
    "&.view-type-unknown, &.view-type-as_block": {
      "&:has(> .only-portraits .project-role-portrait)":
        leftAlignedSubroleHeader(theme, "32px", "32px"),
    },

    // Same for roles listed by cast; the inset follows the cast columns. Teasers without portraits stay centered.
    "&.view-type-by_cast:has(> .casts-with-portraits .project-role-portrait)":
      leftAlignedSubroleHeader(
        theme,
        `${16 + CAST_COLUMN_INSET}px`,
        `${48 + CAST_COLUMN_INSET}px`
      ),
  },

  ".group-image": {
    position: "relative",
    width: "600px",
    maxWidth: "100%",
    paddingLeft: "16px",
    paddingRight: "16px",

    "&>*": {
      position: "relative",
      objectFit: "contain",
      width: "100%",
    },

    figcaption: {
      display: "none",
    },
  },

  ".portraits-container": {
    gap: "16px",
    paddingTop: "16px",
    width: "100%",
    paddingLeft: "32px",
    paddingRight: "32px",
    // display: "grid",
    // gridTemplateColumns: "repeat(auto-fill, minmax(160px, 1fr))",
    display: "flex",
    flexWrap: "wrap",
  },

  ".project-role-portrait": {
    display: "flex",
    position: "relative",
    maxWidth: `${PORTRAIT_WIDTH}px`,
    flex: `1 1 ${PORTRAIT_WIDTH}px`,

    ".MuiCardContent-root": {
      display: "flex",
      flexDirection: "column",
      gap: "8px",
    },

    ".MuiCardActionArea-root": {
      display: "flex",
      flexDirection: "column",

      "&>.MuiCardContent-root": {
        flex: "1 1 auto",
      },
    },

    ".portrait-title": {
      textAlign: "center",
      fontSize: "15px",
      lineHeight: "1.2",
    },

    ".portrait-role": {
      textAlign: "center",
      fontSize: "14px",
      lineHeight: "1.2",
    },
  },
});
