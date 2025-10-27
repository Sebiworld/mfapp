import { SxProps, Theme } from "@mui/material";
import { gridLayoutStyles } from "@styles/utils/gridLayout.styles";

export const contentBlocksStyles: SxProps<Theme> = [
  gridLayoutStyles,
  (theme) => ({
    ".content-block": {
      display: "flex",
      flexDirection: "column",
      maxWidth: "100%",

      "&.content-form": {
        gridColumnEnd: "span 6",

        [theme.breakpoints.up("lg")]: {
          gridColumn: "span 12",
        },
      },

      "&.content-text": {},

      "&.content-collapsible": {
        ".MuiAccordion-root": {
          ".accordion-title": {
            fontWeight: 600,
            fontSize: "1.2rem",
          },

          ".MuiAccordion-heading>.MuiButtonBase-root": {
            background: theme.vars.palette.contrast.main,
            color: theme.vars.palette.contrast.contrastText,
            borderBottom: `1px solid ${theme.vars.palette.contrast.contrastBorder}`,
          },

          ".MuiAccordionSummary-expandIconWrapper ": {
            color: theme.vars.palette.contrast.contrastText,
          },

          ".MuiAccordionDetails-root": {
            paddingTop: "16px",
          },

          "&:last-child": {
            ".MuiAccordion-heading>.MuiButtonBase-root": {
              borderBottom: "0 none",
            },
          },
        },

        "&.capital-letter": {
          ".MuiAccordionDetails-root": {
            paddingTop: "32px",
          },
        },
      },
    },
  }),
];
