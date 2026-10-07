/** `seo` object of pages, projects and performances. Older stored responses carry `[]` or no `seo` at all. */
export interface SeoDto {
  /** Finished title including the site suffix. */
  title?: string;
  /** Plain text. */
  description?: string;
  /** Absolute URL. */
  canonical?: string;
  /** Absolute URL of the preview image. */
  image?: string | null;
  noindex?: boolean;
}
