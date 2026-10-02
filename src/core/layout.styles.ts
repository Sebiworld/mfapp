import { SxProps, Theme } from "@mui/material";
import { chapterSurfaceVariables } from "@components/sections/sectionsContainer.styles";

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

    ...Object.fromEntries(
      PAGE_END_SURFACES.map((surface) => [
        `&:has(.page-contents > .sections-container:last-child > .chapter:last-child.surface-${surface})`,
        { backgroundColor: `var(--surface-${surface})` },
      ])
    ),
  },
});
