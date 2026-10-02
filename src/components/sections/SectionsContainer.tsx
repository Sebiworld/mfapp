import { FC, Fragment, ReactNode } from "react";
import { SectionHero } from "./sectionHero/SectionHero";
import { sectionContainerStyles } from "./sectionsContainer.styles";
import { SectionDtoVariant } from "@models/section/section-dto-variant.model";
import { SectionPagesGridDto } from "@models/section/section-pages-grid-dto.model";
import { Box } from "@mui/material";
import { SectionPartnersAndSponsorsDto } from "@models/section/section-partners-and-sponsors-dto.model";
import { SectionArticlesCarouselDto } from "@models/section/section-articles-carousel-dto.model";
import { SectionFormDto } from "@models/section/section-form.model";
import React from "react";
import { SectionSpacer } from "@components/sectionSpacer/SectionSpacer";

const SectionPage = React.lazy(() =>
  import("./sectionPage/SectionPage").then((module) => ({
    default: module.SectionPage,
  }))
);
const SectionPagesGrid = React.lazy(() =>
  import("./sectionPagesGrid/SectionPagesGrid").then((module) => ({
    default: module.SectionPagesGrid,
  }))
);
const SectionPartnersAndSponsors = React.lazy(() =>
  import("./sectionPartnersAndSponsors/SectionPartnersAndSponsors").then(
    (module) => ({
      default: module.SectionPartnersAndSponsors,
    })
  )
);
const SectionArticlesCarousel = React.lazy(() =>
  import("./sectionArticlesCarousel/SectionArticlesCarousel").then(
    (module) => ({
      default: module.SectionArticlesCarousel,
    })
  )
);
const SectionForm = React.lazy(() =>
  import("./sectionForm/SectionForm").then((module) => ({
    default: module.SectionForm,
  }))
);

/** CMS classes (`spacer-down`, `spacer-tertiary-down`, …) that ask for a stripe band at the top of a section. */
const SECTION_BREAK_CLASS = /^spacer-(?:[a-z]+-)?(?:up|down)$/;

/** Section types that draw their own stripe bands at top and bottom; a band next to them would double it. */
const SELF_BANDED_SECTION_TYPES = ["partners-and-sponsors"];

/** CMS class that turns a chapter into the feature surface. */
const FEATURE_CLASS = "tertiary";

/**
 * Background of a chapter: `page` keeps the page background (first chapter), `default` and `paper` alternate so
 * every band separates two different surfaces, `feature` is the dark textured surface.
 */
type ChapterSurface = "page" | "default" | "paper" | "feature";

/** Run of sections between two stripe bands, sharing one background surface. */
interface Chapter {
  surface: ChapterSurface;
  sections: SectionDtoVariant[];
}

interface SectionsContainerProps {
  sections?: SectionDtoVariant[];
}

/**
 * Tells whether a stripe band separates a section from the one before it.
 * @param section - section that may start with a band
 * @param previous - section rendered directly before it, if any
 * @returns true if a band is drawn before the section
 */
const hasSectionBreak = (
  section: SectionDtoVariant,
  previous?: SectionDtoVariant
): boolean => {
  if (
    SELF_BANDED_SECTION_TYPES.includes(section.type) ||
    (previous && SELF_BANDED_SECTION_TYPES.includes(previous.type))
  ) {
    return false;
  }

  const classes = section.classes?.split(" ") ?? [];

  return classes.some((cssClass) => SECTION_BREAK_CLASS.test(cssClass));
};

/**
 * Picks the surface of a chapter from its first section and the chapter before it.
 * @param section - first section of the chapter
 * @param previous - surface of the chapter before
 * @returns the chapter surface
 */
const pickSurface = (
  section: SectionDtoVariant,
  previous: ChapterSurface
): ChapterSurface => {
  if (section.classes?.split(" ").includes(FEATURE_CLASS)) {
    return "feature";
  }

  return previous === "default" || previous === "page" ? "paper" : "default";
};

/**
 * Splits sections into chapters at every stripe band.
 * @param sections - sections in render order
 * @returns chapters in render order; the first one keeps the page background
 */
const buildChapters = (sections: SectionDtoVariant[]): Chapter[] => {
  const chapters: Chapter[] = [];

  for (const [index, section] of sections.entries()) {
    const current = chapters[chapters.length - 1];

    if (!current) {
      chapters.push({ surface: "page", sections: [section] });
      continue;
    }

    if (hasSectionBreak(section, sections[index - 1])) {
      chapters.push({
        surface: pickSurface(section, current.surface),
        sections: [section],
      });
      continue;
    }

    current.sections.push(section);
  }

  return chapters;
};

/**
 * Picks the renderer for a section by its type.
 * @param section - section to render
 * @returns the rendered section
 */
const renderSection = (section: SectionDtoVariant): ReactNode => {
  if (section.type === "hero") {
    return <SectionHero section={section}></SectionHero>;
  }

  if (section.type === "pages-grid") {
    return (
      <SectionPagesGrid
        section={section as SectionPagesGridDto}
      ></SectionPagesGrid>
    );
  }

  if (section.type === "articles-carousel") {
    return (
      <SectionArticlesCarousel
        section={section as SectionArticlesCarouselDto}
      ></SectionArticlesCarousel>
    );
  }

  if (section.type === "form") {
    return <SectionForm section={section as SectionFormDto}></SectionForm>;
  }

  if (section.type === "partners-and-sponsors") {
    return (
      <SectionPartnersAndSponsors
        section={section as SectionPartnersAndSponsorsDto}
      ></SectionPartnersAndSponsors>
    );
  }

  return <SectionPage section={section}></SectionPage>;
};

export const SectionsContainer: FC<SectionsContainerProps> = ({ sections }) => {
  if (!sections?.length) {
    return undefined;
  }

  return (
    <Box className="sections-container" sx={sectionContainerStyles}>
      {buildChapters(sections).map((chapter, index, chapters) => (
        <Fragment key={chapter.sections[0].id}>
          {index > 0 && (
            <Box
              className={`section-break from-${chapters[index - 1].surface} to-${chapter.surface}`}
              aria-hidden="true"
            >
              <SectionSpacer></SectionSpacer>
            </Box>
          )}

          <Box
            className={`chapter surface-${chapter.surface}`}
            data-surface={chapter.surface}
          >
            {chapter.sections.map((section) => (
              <Fragment key={section.id}>{renderSection(section)}</Fragment>
            ))}
          </Box>
        </Fragment>
      ))}
    </Box>
  );
};
