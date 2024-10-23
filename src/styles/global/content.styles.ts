import { Interpolation } from "@emotion/react";
import { Theme } from "@mui/joy";
import { mfTheme } from "@styles/theme/mfTheme";

export const globalContentStyles: Interpolation<Theme>[] = [
  {
    ".content-block": {
      position: "relative",
      // display: "flex",
      // flexDirection: "column",
      // flex: "1 1 auto",
      maxWidth: "100%",
      width: "38em",
      textAlign: "left",

      "&.center": {
        textAlign: "center",
      },

      "p, h1, h2, h3, h4, h5, h6": {
        position: "relative",
        maxWidth: "100%",
        width: "38em",
        alignSelf: "center",
      },

      hr: {
        display: "block",
        width: "100%",
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
        backgroundColor:
          "var(--variant-solidBg, var(--mf-palette-primary-solidBg, var(--mf-palette-primary-500, #0B6BCB)))",
        color: "var(--mf-palette-primary-solidColor, #FFF)",

        "&:hover, &:focus": {
          backgroundColor: "var(--mf-palette-primary-600, #185EA5)",
          color: "var(--mf-palette-primary-solidColor, #FFF)",
        },

        "&.btn-primary": {
          backgroundColor:
            "var(--variant-solidBg, var(--mf-palette-primary-solidBg, var(--mf-palette-primary-500, #0B6BCB)))",
          color: "var(--mf-palette-primary-solidColor, #FFF)",

          "&:hover, &:focus": {
            backgroundColor: "var(--mf-palette-primary-600, #185EA5)",
            color: "var(--mf-palette-primary-solidColor, #FFF)",
          },
        },

        "&.btn-danger": {
          backgroundColor:
            "var(--variant-solidBg, var(--mf-palette-danger-solidBg, var(--mf-palette-danger-500, #ef4444)))",
          color: "var(--mf-palette-danger-solidColor, #FFF)",

          "&:hover, &:focus": {
            backgroundColor: "var(--mf-palette-danger-600, #dc2626)",
            color: "var(--mf-palette-danger-solidColor, #FFF)",
          },
        },

        "&.btn-success": {
          backgroundColor:
            "var(--variant-solidBg, var(--mf-palette-success-solidBg, var(--mf-palette-success-500, #22c55e)))",
          color: "var(--mf-palette-success-solidColor, #FFF)",

          "&:hover, &:focus": {
            backgroundColor: "var(--mf-palette-success-600, #16a34a)",
            color: "var(--mf-palette-success-solidColor, #FFF)",
          },
        },

        "&.btn-warning": {
          backgroundColor:
            "var(--variant-solidBg, var(--mf-palette-warning-solidBg, var(--mf-palette-warning-500, #eab308)))",
          color: "var(--mf-palette-warning-solidColor, #000)",

          "&:hover, &:focus": {
            backgroundColor: "var(--mf-palette-warning-600, #ca8a04)",
            color: "var(--mf-palette-warning-solidColor, #000)",
          },
        },

        "&.btn-neutral": {
          backgroundColor:
            "var(--variant-solidBg, var(--mf-palette-neutral-solidBg, var(--mf-palette-neutral-500, #636B74)))",
          color: "var(--mf-palette-neutral-solidColor, #FFF)",

          "&:hover, &:focus": {
            backgroundColor: "var(--mf-palette-neutral-600, #555E68)",
            color: "var(--mf-palette-neutral-solidColor, #FFF)",
          },
        },

        "&.btn-info": {
          backgroundColor:
            "var(--variant-solidBg, var(--mf-palette-info-solidBg, var(--mf-palette-info-500, #0B6BCB)))",
          color: "var(--mf-palette-info-solidColor, #FFF)",

          "&:hover, &:focus": {
            backgroundColor: "var(--mf-palette-info-600, #185EA5)",
            color: "var(--mf-palette-info-solidColor, #FFF)",
          },
        },

        "&.btn-dark": {
          backgroundColor:
            "var(--variant-solidBg, var(--mf-palette-dark-solidBg, var(--mf-palette-dark-500, #0B6BCB)))",
          color: "var(--mf-palette-dark-solidColor, #FFF)",

          "&:hover, &:focus": {
            backgroundColor: "var(--mf-palette-dark-600, #185EA5)",
            color: "var(--mf-palette-dark-solidColor, #FFF)",
          },
        },

        "&.btn-light": {
          backgroundColor:
            "var(--variant-solidBg, var(--mf-palette-light-solidBg, var(--mf-palette-light-500, #0B6BCB)))",
          color: "var(--mf-palette-light-solidColor, #000)",

          "&:hover, &:focus": {
            backgroundColor: "var(--mf-palette-light-600, #185EA5)",
            color: "var(--mf-palette-light-solidColor, #000)",
          },
        },

        "&.btn-project-primary": {
          backgroundColor:
            "var(--variant-solidBg, var(--mf-palette-projectPrimary-solidBg, var(--mf-palette-projectPrimary-500, #0B6BCB)))",
          color: "var(--mf-palette-projectPrimary-solidColor, #FFF)",

          "&:hover, &:focus": {
            backgroundColor: "var(--mf-palette-projectPrimary-600, #185EA5)",
            color: "var(--mf-palette-projectPrimary-solidColor, #FFF)",
          },
        },
      },
    },
  },
];
