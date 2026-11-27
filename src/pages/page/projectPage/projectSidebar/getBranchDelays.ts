/** Duration of the edge drawing down the sidebar; each underline waits until the edge reaches it. */
export const SPINE_MS = 520;

/**
 * Computes when each box title underline branches off the sidebar edge, which draws down at constant speed.
 * @param titleBottoms Bottom of each box title, measured from the top of the sidebar.
 * @param spineHeight Height of the sidebar edge.
 * @param spineMs Duration of the edge drawing.
 * @returns Delay in milliseconds per title, in the same order; all 0 without a measurable edge.
 */
export const getBranchDelays = (
  titleBottoms: number[],
  spineHeight: number,
  spineMs: number = SPINE_MS
): number[] => {
  if (spineHeight <= 0) {
    return titleBottoms.map(() => 0);
  }

  return titleBottoms.map((bottom) =>
    Math.round((bottom / spineHeight) * spineMs)
  );
};
