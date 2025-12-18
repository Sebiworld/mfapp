import { Interpolation } from "@emotion/react";
import { Theme } from "@mui/material";

export const globalContentStyles: Interpolation<Theme>[] = [
  {
    html: {
      scrollBehavior: "smooth",
      scrollPaddingTop: "72px",
    },

    // [theme.breakpoints.down("md")]: {
    //   h1: "2.5rem",
    //   h2: "2rem",
    //   h3: "1.5rem",
    //   h4: "1.5rem",
    //   // h5: "4rem",
    //   // h6: "4rem",
    // },

    ".content-block": {
      position: "relative",
      textAlign: "left",
      maxWidth: "100%",

      "&.center": {
        textAlign: "center",
      },

      "p, h1, h2, h3, h4, h5, h6, ul, ol": {
        position: "relative",
        maxWidth: "100%",
        width: "38em",
        alignSelf: "center",

        "&.center": {
          textAlign: "center",
        },

        "&:not(:not(:last-child) ~ *)": {
          marginTop: 0,
        },

        "&:last-child": {
          marginBottom: 0,
        },
      },

      // [theme.breakpoints.up("md")]: {
      //   h1: "4rem",
      //   h2: "3.5rem",
      //   h3: "3rem",
      //   h4: "2rem",
      //   // h5: "4rem",
      //   // h6: "4rem",
      // },

      dt: {
        display: "block",
        fontWeight: "bold",

        "::after": {
          content: "':'",
        },
      },

      dd: {
        display: "block",
        margin: "0 0 16px 0",
      },

      hr: {
        display: "block",
        width: "100%",
      },

      table: {
        marginLeft: "-12px",
        marginRight: "-12px",
        borderCollapse: "collapse",

        tr: {
          borderBottom: `1px solid var(--mf-palette-contrast-900)`,

          "&:last-child": {
            borderBottom: "0 none",
          },
        },

        td: {
          padding: "6px 12px",
        },
      },

      "&.capital-letter, .capital-letter": {
        marginTop: "32px",
        marginLeft: 0,
        marginRight: 0,
      },

      "p.capital-letter, .capital-letter p:first-of-type, &.capital-letter p:first-of-type":
        {
          "&:first-letter": {
            // fontFamily: mfTheme.vars.font.serif,
            fontSize: "6.2rem",
            float: "left",
            lineHeight: "0.6",
            marginRight: "0.12em",
            marginTop: "-0.1em",
            marginBottom: "0.12em",
          },
        },

      a: {
        color: "inherit",
        transition: "color 0.2s",

        "&:hover, &:focus": {
          color: "var(--mf-palette-primary-500)",
        },
      },

      "a:not(.btn):not(.nav-link):not(.no-underline), .btn-link": {
        textDecorationColor: "var(--mf-palette-primary-500)",
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
        borderRadius: "var(--mf-shape-borderRadius)",
        textDecoration: "none",
        fontFamily: "var(--mf-fontFamily-body)",
        fontWeight: "bold",
        lineHeight: "var(--mf-lineHeight-md)",
        boxShadow: "var(--mf-shadows-2)",
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

        "&.btn-contrast": {
          backgroundColor:
            "var(--variant-solidBg, var(--mf-palette-contrast-solidBg, var(--mf-palette-contrast-500, #0B6BCB)))",
          color: "var(--mf-palette-contrast-solidColor, #000)",

          "&:hover, &:focus": {
            backgroundColor: "var(--mf-palette-contrast-600, #185EA5)",
            color: "var(--mf-palette-contrast-solidColor, #000)",
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

      ".p-4": {
        padding: "16px",
      },

      ".alert-box": {
        ".alert-title": {
          fontSize: "24px",
          fontWeight: "bold",
          marginBottom: "4px",
          marginBlockEnd: "4px",
        },
      },
    },
  },
];
