import { SxProps } from "@mui/joy/styles/types";

export const contentFormStyles: SxProps = {
  position: "relative",
  display: "grid",
  gap: "16px",
  gridTemplateColumns: "1fr",
  paddingTop: "32px",

  ".form-group": {
    position: "relative",
    display: "grid",
    gap: "16px",
    gridTemplateColumns: "repeat(12, 1fr)",
    alignSelf: "flex-start",

    "&>*": {
      position: "relative",
      // flex: "1 1 auto",
      gridColumn: "span 12",
    },

    "&.root": {
      "&>.form-group": {
        gridColumn: "span 6",
      },
    },

    "p, h1, h2, h3, h4, h5, h6": {
      width: "auto",
      maxWidth: "100%",
    },

    "&>.form-group-label, &>.title-placeholder": {
      position: "relative",
      fontSize: "12px",
      lineHeight: "16px",
      minHeight: "22px",
      display: "flex",
      flexDirection: "row",
      gap: "8px",
      paddingRight: "16px",
      alignItems: "center",
      fontWeight: "lighter",
      marginBottom: "-4px",

      "&>*": {
        flex: "0 0 auto",
      },

      "&>hr": {
        height: "1px",
        flex: "1 1 8px",
        border: "0 none",
        background: "var(--mf-palette-contrast-800)",

        "&:first-of-type": {
          width: "8px",
          flex: "0 0 auto",
        },
      },
    },
  },

  ".form-actions": {
    position: "relative",
    display: "flex",
    flexWrap: "wrap",
    gap: "8px",
    justifyContent: "flex-end",
  },
};
