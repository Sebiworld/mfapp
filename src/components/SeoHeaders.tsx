import { ImageDto } from "@models/image-dto.model";
import { ArticlePageDto } from "@models/page/article-page-dto.model";
import { PageDto } from "@models/page/page-dto.model";
import { selectConfigurationParams } from "@src/store/configuration/configuration.selectors";
import { useGlobalStore } from "@src/store/global.store";
import { convertHtmlEntities } from "@utils/functions/convertHtmlEntities";
import { trimWords } from "@utils/functions/trimWords";
import { publisherLdJson, publisherLongLdJson } from "@utils/ldJson/publisher";
import { useMemo } from "react";
import { Article, WebPage, WithContext } from "schema-dts";
import { formatISO } from "date-fns";
import { isValidArray } from "@utils/functions/isValidArray";

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

  const structuredData = useMemo(() => {
    if (!page?.id) {
      return null;
    }

    if (page.template?.name === "home") {
      const output: WithContext<WebPage> = {
        "@context": "https://schema.org",
        "@type": "WebPage",
        url: page.httpUrl,
        name: "Musical-Fabrik e. V.",
        description: description,
        publisher: publisherLdJson,
      };
      return output;
    }

    if (page.template?.name === "project") {
      const output: WithContext<WebPage> = {
        "@context": "https://schema.org",
        "@type": "WebPage",
        url: page.httpUrl,
        name: `${title} (eine Produktion der Musical-Fabrik e. V.)`,
        description: description,
        publisher: publisherLdJson,
      };

      return output;
    }

    if (page.template?.name === "article") {
      const articlePage = page as ArticlePageDto;

      const output: WithContext<Article> = {
        "@context": "https://schema.org",
        "@type": "Article",
        headline: articlePage.title,
        datePublished: formatISO(articlePage.datetime_from * 1000),
        dateModified: formatISO(articlePage.modified * 1000),
        description: articlePage.intro,
        publisher: publisherLdJson,
        url: page.httpUrl,
        mainEntityOfPage: {
          "@type": "WebPage",
          "@id": "https://google.com/article",
        },
      };

      if (isValidArray(articlePage.authors) && articlePage.authors.length) {
        output.author = articlePage.authors.map((author) => {
          let name: string = "";
          if (typeof author === "string") {
            name = author;
          } else if (author.first_name || author.last_name) {
            name =
              `${author.first_name ?? ""} ${author.last_name ?? ""}`.trim();
          } else if (author.nickname) {
            name = author.nickname;
          }

          return {
            "@type": "Person",
            name: name,
            // TODO: add author url if available
          };
        });
      } else {
        output.author = {
          "@type": "Organization",
          name: "Musical-Fabrik e. V.",
        };
      }

      if (imageUrl) {
        output.image = imageUrl;
      }

      return output;
    }
  }, [description, page, title, imageUrl]);

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

      {!!structuredData && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(structuredData).replace(/</g, "\\u003c"),
          }}
        />
      )}

      {page?.template?.name === "home" && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(publisherLongLdJson).replace(
              /</g,
              "\\u003c"
            ),
          }}
        />
      )}
    </>
  );
};
