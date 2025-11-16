import { SxProps } from "@mui/material";
import { mfTheme } from "@styles/theme/mfTheme";

export const sectionContainerStyles: SxProps = {
  ".section": {
    position: "relative",
    display: "flex",
    flexDirection: "column",
    gap: "32px",

    [mfTheme.breakpoints.down("md")]: {
      gap: "16px",
    },

    "&:not(.np)": {
      padding: "64px",

      [mfTheme.breakpoints.down("md")]: {
        padding: "42px 24px",
      },
    },

    ".section-title": {
      position: "relative",
      maxWidth: "100%",
      width: "38em",
      alignSelf: "center",
      fontSize: "48px",

      [mfTheme.breakpoints.down("md")]: {
        fontSize: "32px",
        marginBottom: "4px",
      },

      [mfTheme.breakpoints.down("sm")]: {
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

      [mfTheme.breakpoints.down("md")]: {
        padding: "48px 24px",
      },
    },
  },
};
