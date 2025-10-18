import { FC } from "react";
import { SectionHero } from "./sectionHero/SectionHero";
import { sectionContainerStyles } from "./sectionsContainer.styles";
import { SectionDtoVariant } from "@models/section/section-dto-variant.model";
import { SectionPagesGridDto } from "@models/section/section-pages-grid-dto.model";
import { Box } from "@mui/material";
import { SectionPartnersAndSponsorsDto } from "@models/section/section-partners-and-sponsors-dto.model";
import { SectionArticlesCarouselDto } from "@models/section/section-articles-carousel-dto.model";
import { SectionFormDto } from "@models/section/section-form.model";
import React from "react";

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

interface SectionsContainerProps {
  sections?: SectionDtoVariant[];
}

export const SectionsContainer: FC<SectionsContainerProps> = ({ sections }) => {
  if (!sections?.length) {
    return undefined;
  }

  return (
    <Box className="sections-container" sx={sectionContainerStyles}>
      {sections?.map((section) => {
        if (section.type === "hero") {
          return <SectionHero key={section.id} section={section}></SectionHero>;
        } else if (section.type === "page") {
          return (
            <SectionPage
              key={section.id}
              section={section as SectionPagesGridDto}
            ></SectionPage>
          );
        } else if (section.type === "pages-grid") {
          return (
            <SectionPagesGrid
              key={section.id}
              section={section as SectionPagesGridDto}
            ></SectionPagesGrid>
          );
        } else if (section.type === "articles-carousel") {
          return (
            <SectionArticlesCarousel
              key={section.id}
              section={section as SectionArticlesCarouselDto}
            ></SectionArticlesCarousel>
          );
        } else if (section.type === "form") {
          return (
            <SectionForm
              key={section.id}
              section={section as SectionFormDto}
            ></SectionForm>
          );
        } else if (section.type === "partners-and-sponsors") {
          return (
            <SectionPartnersAndSponsors
              key={section.id}
              section={section as SectionPartnersAndSponsorsDto}
            ></SectionPartnersAndSponsors>
          );
        }

        return <SectionPage key={section.id} section={section}></SectionPage>;
      })}
    </Box>
  );
};
