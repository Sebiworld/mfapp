interface HeadlineSource {
  title?: string | null;
  event?: { title?: string | null } | null;
}

/**
 * Lists the parts of the line below the project title: the category (event) first, then the performance title.
 * Missing parts are left out, and a name that is both category and title (ignoring case) appears once.
 * @param performance Performance with its title and event.
 * @returns HTML strings to be joined with " · "; empty when neither is set.
 */
export const getPerformanceHeadline = (
  performance: HeadlineSource
): string[] => {
  const parts = [
    performance.event?.title?.trim() ?? "",
    performance.title?.trim() ?? "",
  ];

  return parts.filter(
    (part, index) =>
      !!part &&
      parts.findIndex((other) => other.toLowerCase() === part.toLowerCase()) ===
        index
  );
};
