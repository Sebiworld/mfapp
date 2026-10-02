import { CSSProperties } from "react";

/** Number of columns of the grid that form fields are laid out on. */
const GRID_COLUMNS = 12;

/**
 * Turns the column width a form field has in the CMS (percent of the row) into its span on the form grid.
 * @param columnWidth Width in percent; empty, 0 or 100 means the full row.
 * @returns Style with `--column-span`, or `undefined` for a full-width field.
 */
export const getColumnSpanStyle = (
  columnWidth?: number
): CSSProperties | undefined => {
  if (!columnWidth || columnWidth <= 0 || columnWidth >= 100) {
    return undefined;
  }

  const span = Math.min(
    GRID_COLUMNS,
    Math.max(1, Math.round((columnWidth / 100) * GRID_COLUMNS))
  );

  // Cast: custom properties are not part of CSSProperties.
  return { "--column-span": span } as CSSProperties;
};
