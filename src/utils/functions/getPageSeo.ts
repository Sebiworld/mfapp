import { SeoDto } from "@models/utility-types/seo-dto.model";

/**
 * Reads the `seo` value of a page, project or performance. Stored responses of older API versions hold `[]` or
 * no `seo`; both count as "nothing set".
 * @param seo The raw `seo` value.
 * @returns A plain object; empty when there is nothing usable.
 */
export const getPageSeo = (seo: unknown): SeoDto => {
  if (!seo || typeof seo !== "object" || Array.isArray(seo)) {
    return {};
  }

  return seo as SeoDto;
};
