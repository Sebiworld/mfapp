import { Interpolation } from "@emotion/react";
import { Theme } from "@mui/joy";
import { mfTheme } from "@styles/theme/mfTheme";

export const globalContentStyles: Interpolation<Theme>[] = [
  {
    ".content-block": {
      position: "relative",
      display: "flex",
      flexDirection: "column",
      flex: "1 1 auto",
      maxWidth: "100%",
      width: "38em",

      "&.center": {
        textAlign: "center",
      },

      "p, h1, h2, h3, h4, h5, h6": {
        position: "relative",
        maxWidth: "100%",
        width: "38em",
        alignSelf: "center",
      },

      "p.capital-letter, .capital-letter P:first-of-type, &.capital-letter P:first-of-type":
        {
          "&:first-letter": {
            fontFamily: mfTheme.fontFamily.fallback,
            fontSize: "5.5rem",
            float: "left",
            lineHeight: "0.6",
            marginRight: "0.05em",
          },
        },

      a: {
        color: "inherit",
        transition: "color 0.2s",

        "&:hover, &:focus": {
          color: mfTheme.palette.primary[500],
        },
      },

      "a:not(.btn):not(.nav-link):not(.no-underline), .btn-link": {
        textDecorationColor: mfTheme.palette.primary[500],
        textDecorationThickness: "0.125em",
        textUnderlineOffset: "1.5px",
      },

      ".btn": {
        display: "inline-flex",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor:
          "var(--variant-solidBg, var(--mf-palette-primary-solidBg, var(--mf-palette-primary-500, #0B6BCB)))",
        color: "var(--mf-palette-common-white, #FFF)",
        minHeight: "var(--Button-minHeight, 2.25rem)",
        fontSize: "var(--mf-fontSize-sm)",
        paddingBlock: "var(--Button-paddingBlock, 0.375rem)",
        paddingInline: "1rem",
        boxSizing: "border-box",
        borderRadius: "var(--Button-radius, var(--mf-radius-sm))",
        textDecoration: "none",
        fontFamily: "var(--mf-fontFamily-body)",
        fontWeight: "var(--mf-fontWeight-lg)",
        lineHeight: "var(--mf-lineHeight-md)",
        margin: "2px",

        "&:hover, &:focus": {
          backgroundColor: "var(--mf-palette-primary-600, #185EA5)",
          color: "var(--mf-palette-common-white, #FFF)",
        },
      },
    },
  },
];
