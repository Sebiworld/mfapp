import { ImageDto } from "@models/image-dto.model";
import { PageDto } from "@models/page/page-dto.model";
import { selectConfigurationParams } from "@src/store/configuration/configuration.selectors";
import { useGlobalStore } from "@src/store/global.store";
import { convertHtmlEntities } from "@utils/functions/convertHtmlEntities";
import { trimWords } from "@utils/functions/trimWords";
import { useMemo } from "react";

export interface SeoHeadersProps {
  page: PageDto;
}

{
  /* Meta tags (site header) */
}
export const SeoHeaders: React.FC<SeoHeadersProps> = ({ page }) => {
  const configurationParams = useGlobalStore(selectConfigurationParams);

  const title = useMemo(() => {
    if (page?.seo?.title) {
      return `${convertHtmlEntities(page.seo.title)} | Musical-Fabrik`;
    }

    if (page?.title) {
      return `${convertHtmlEntities(page?.title)} | Musical-Fabrik`;
    }

    return "Musical-Fabrik";
  }, [page]);

  const description = useMemo(() => {
    if (page?.seo?.description) {
      return convertHtmlEntities(page.seo.description);
    }

    const pageIntro = (page as unknown as { intro: string })?.intro;
    if (pageIntro && typeof pageIntro === "string") {
      return trimWords(convertHtmlEntities(pageIntro), 160);
    }

    if (configurationParams?.seo_description) {
      return convertHtmlEntities(configurationParams.seo_description);
    }

    return "";
  }, [page, configurationParams]);

  const imageUrl = useMemo(() => {
    const mainImageUrl = (page as unknown as { main_image?: ImageDto })
      ?.main_image?.http_url;
    if (mainImageUrl && typeof mainImageUrl === "string") {
      return mainImageUrl;
    }

    const globalMainImageUrl = configurationParams?.main_image?.http_url;
    if (globalMainImageUrl && typeof globalMainImageUrl === "string") {
      return globalMainImageUrl;
    }

    return "";
  }, [page, configurationParams]);

  return (
    <>
      {/* Title */}
      <title>{title}</title>
      <meta property="og:title" content={title} />
      <meta name="twitter:title" content={title} />

      {/* Canonical Link */}
      {page?.seo?.canonical && (
        <link rel="canonical" href={page.seo.canonical} />
      )}

      {/* Author */}
      {configurationParams?.author && (
        <meta name="author" content={configurationParams.author} />
      )}

      {/* Site-name */}
      {configurationParams?.site_name && (
        <>
          <meta name="site_name" content={configurationParams.site_name} />
          <meta
            property="og:site_name"
            content={configurationParams.site_name}
          />
          <meta
            name="twitter:site_name"
            content={configurationParams.site_name}
          />
        </>
      )}

      {/* Description */}
      {description && (
        <>
          <meta name="description" content={description} />
          <meta property="og:description" content={description} />
          <meta name="twitter:description" content={description} />
        </>
      )}

      {/* Image */}
      {imageUrl && (
        <>
          <meta name="image" content={imageUrl} />
          <meta property="og:image" content={imageUrl} />
          <meta name="twitter:image" content={imageUrl} />
        </>
      )}

      {/* Other Meta Tags */}
      <meta property="og:type" content="website" />
      <meta property="twitter:card" content="summary" />
      {page?.httpUrl && (
        <>
          <meta property="og:url" content={page.httpUrl} />
          <meta property="twitter:url" content={page.httpUrl} />
        </>
      )}
    </>
  );
};
