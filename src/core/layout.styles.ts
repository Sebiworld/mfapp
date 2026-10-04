import { SxProps, Theme } from "@mui/material";
import { chapterSurfaceVariables } from "@components/sections/sectionsContainer.styles";
import { HEADER_MIN_HEIGHT } from "./header/header.styles";

/**
 * Light chapter surfaces a page may end with. Breadcrumbs and the footer band sit below the last chapter and
 * continue its surface; the dark secondary surface is left out, as the grey breadcrumbs would not read on it.
 */
const PAGE_END_SURFACES = ["paper", "secondary-light"];

export const layoutStyles: SxProps<Theme> = (theme) => ({
  position: "relative",
  display: "block",
  minHeight: "100vh",

  ".main-content": {
    position: "relative",
    overflow: "auto",
    flex: "1 1 100px",
    ...chapterSurfaceVariables(theme),

    // Room for the fixed header (its height is set by the header itself). It sits on the route's own element, not
    // above it: that element keeps its place when a loaded page turns out to start with a hero, so nothing visible
    // moves. A transparent border instead of padding keeps positioned children and child margins where they were
    // with the header in the flow.
    "--header-offset": `var(--header-height, ${HEADER_MIN_HEIGHT})`,

    "&.below-translucent-header": {
      "--header-offset": "0px",
    },

    // The first child, written without ":first-child", which emotion reports as unsafe for server rendering.
    "&>:not(* + *):not(.footer-wrapper)": {
      borderTopWidth: "var(--header-offset)",
      borderTopStyle: "solid",
      borderTopColor: "transparent",
    },

    ...Object.fromEntries(
      PAGE_END_SURFACES.map((surface) => [
        `&:has(.page-contents > .sections-container:last-child > .chapter:last-child.surface-${surface})`,
        { backgroundColor: `var(--surface-${surface})` },
      ])
    ),
  },
});
