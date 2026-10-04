import { SxProps } from "@mui/material";

/**
 * Until the first content of a page arrives, the footer stays below the first screen: it would otherwise show up
 * under the header and be pushed down by the content. 6vw is how far the footer's top spacer reaches up.
 */
export const awaitingContentStyles = {
  minHeight: "calc(100vh + 6vw)",
};

export const pageStyles: SxProps = {
  position: "relative",
  // The header room (see the layout) is part of this box.
  minHeight: "calc(100vh - 600px + var(--header-offset, 0px))",

  "&.is-awaiting-content": awaitingContentStyles,

  "&.template-project_role, &.template-project_roles_container, &.template-articles_container":
    {
      ".page-title": {
        textAlign: "center",

        "&:last-child": {
          marginBottom: "-8px",
        },
      },
    },

  ".alert": {
    // width: 400,
    mx: "auto",
    marginY: "128px",
  },
};
