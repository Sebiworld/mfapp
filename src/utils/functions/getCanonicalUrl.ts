import { SeoDto } from "@models/utility-types/seo-dto.model";

/**
 * Picks the canonical address of the current page.
 * @param seo Normalized `seo` object (see `getPageSeo`).
 * @returns The API value; without one the current address on the frontend domain, without query or hash and with
 * a trailing slash.
 */
export const getCanonicalUrl = (seo: SeoDto): string => {
  if (seo.canonical) {
    return seo.canonical;
  }

  const path = window.location.pathname;

  return `${window.location.origin}${path.endsWith("/") ? path : `${path}/`}`;
};
