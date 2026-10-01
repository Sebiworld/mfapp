import { ProjectPortraitDto } from "@models/project-role/project-portrait-dto.model";

/**
 * Gives the name of a portrait as HTML with its break points. In `title_separable` an "_" marks where a long name
 * may be hyphenated; it becomes a soft hyphen, so the browser only shows a hyphen where it breaks.
 * @param portrait Portrait with `title` and, optionally, `title_separable`.
 * @returns HTML string for `parseHtml`; the plain `title` without a separable title, or "" without both.
 */
export const getSeparableTitle = (
  portrait: Pick<ProjectPortraitDto, "title" | "title_separable">
): string =>
  portrait.title_separable
    ? portrait.title_separable.replaceAll("_", "&shy;")
    : (portrait.title ?? "");
