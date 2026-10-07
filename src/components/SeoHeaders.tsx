import { ImageDto } from "@models/image-dto.model";
import { ArticlePageDto } from "@models/page/article-page-dto.model";
import { PageDto } from "@models/page/page-dto.model";
import { selectConfigurationParams } from "@src/store/configuration/configuration.selectors";
import { useGlobalStore } from "@src/store/global.store";
import { convertHtmlEntities } from "@utils/functions/convertHtmlEntities";
import { trimWords } from "@utils/functions/trimWords";
import { publisherLdJson, publisherLongLdJson } from "@utils/ldJson/publisher";
import { useEffect, useMemo } from "react";
import { Article, WebPage, WithContext } from "schema-dts";
import { formatISO } from "date-fns";
import { isValidArray } from "@utils/functions/isValidArray";
import { getPageSeo } from "@utils/functions/getPageSeo";
import { getCanonicalUrl } from "@utils/functions/getCanonicalUrl";

const SITE_SUFFIX = "Musical-Fabrik e.V.";
const SITE_TITLE_SUFFIX = ` | ${SITE_SUFFIX}`;

export interface SeoHeadersProps {
  page: PageDto;
}

{
  /* Meta tags (site header) */
}
export const SeoHeaders: React.FC<SeoHeadersProps> = ({ page }) => {
  const configurationParams = useGlobalStore(selectConfigurationParams);

  const seo = useMemo(() => getPageSeo(page?.seo), [page]);

  // The API title is finished (suffix included); only the fallback gets the site suffix.
  const title = useMemo(() => {
    if (seo.title) {
      return convertHtmlEntities(seo.title);
    }

    if (page?.title) {
      return `${convertHtmlEntities(page.title)} | ${SITE_SUFFIX}`;
    }

    return SITE_SUFFIX;
  }, [page, seo]);

  // Title without the site suffix, for structured data that names the page itself.
  const bareTitle = useMemo(() => {
    if (page?.title) {
      return convertHtmlEntities(page.title);
    }

    return title.endsWith(SITE_TITLE_SUFFIX)
      ? title.slice(0, -SITE_TITLE_SUFFIX.length)
      : title;
  }, [page, title]);

  const canonical = useMemo(() => getCanonicalUrl(seo), [seo]);

  const description = useMemo(() => {
    if (seo.description) {
      return convertHtmlEntities(seo.description);
    }

    const pageIntro = (page as unknown as { intro: string })?.intro;
    if (pageIntro && typeof pageIntro === "string") {
      return trimWords(convertHtmlEntities(pageIntro), 160);
    }

    if (configurationParams?.seo_description) {
      return convertHtmlEntities(configurationParams.seo_description);
    }

    return "";
  }, [page, seo, configurationParams]);

  // Without an own image the static preview image of index.html stays.
  const imageUrl = seo.image || "";

  const structuredImageUrl = useMemo(() => {
    const mainImageUrl = (page as unknown as { main_image?: ImageDto })
      ?.main_image?.http_url;

    return imageUrl || (typeof mainImageUrl === "string" ? mainImageUrl : "");
  }, [page, imageUrl]);

  const structuredData = useMemo(() => {
    if (!page?.id) {
      return null;
    }

    if (page.template?.name === "home") {
      const output: WithContext<WebPage> = {
        "@context": "https://schema.org",
        "@type": "WebPage",
        url: canonical,
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
        url: canonical,
        name: `${bareTitle} (eine Produktion der Musical-Fabrik e. V.)`,
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
        url: canonical,
        mainEntityOfPage: {
          "@type": "WebPage",
          "@id": canonical,
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

      if (structuredImageUrl) {
        output.image = structuredImageUrl;
      }

      return output;
    }
  }, [description, page, bareTitle, structuredImageUrl, canonical]);

  // index.html carries static fallbacks for crawlers that do not run scripts.
  // While this component renders its own value for a tag, the static one is
  // taken out so the head never holds two values for the same tag; it comes
  // back when the value goes away (navigation to a page without one, unmount).
  useEffect(() => {
    const replaced = [
      "title",
      "og:title",
      "og:type",
      "og:site_name",
      "twitter:card",
      ...(description ? ["description", "og:description"] : []),
      ...(imageUrl ? ["og:image", "og:image:width", "og:image:height"] : []),
    ];
    if (!configurationParams?.site_name) {
      replaced.splice(replaced.indexOf("og:site_name"), 1);
    }

    const removed: Element[] = [];
    for (const key of replaced) {
      for (const element of document.querySelectorAll(
        `[data-static-seo="${key}"]`
      )) {
        element.remove();
        removed.push(element);
      }
    }

    return () => {
      for (const element of removed) {
        document.head.appendChild(element);
      }
    };
  }, [description, imageUrl, configurationParams?.site_name]);

  return (
    <>
      {/* Title */}
      <title>{title}</title>
      <meta property="og:title" content={title} />
      <meta name="twitter:title" content={title} />

      {/* Canonical Link */}
      <link rel="canonical" href={canonical} />

      {/* Robots */}
      {seo.noindex === true && <meta name="robots" content="noindex" />}

      {/* Author */}
      {configurationParams?.author && (
        <meta name="author" content={configurationParams.author} />
      )}

      {/* Site-name */}
      {configurationParams?.site_name && (
        <>
          <meta
            property="og:site_name"
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
          <meta property="og:image" content={imageUrl} />
          <meta name="twitter:image" content={imageUrl} />
        </>
      )}

      {/* Other Meta Tags */}
      <meta property="og:type" content="website" />
      <meta name="twitter:card" content="summary_large_image" />
      <meta property="og:url" content={canonical} />
      <meta name="twitter:url" content={canonical} />

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
