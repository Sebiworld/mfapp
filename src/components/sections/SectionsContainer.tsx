import { FC } from "react";
import { SectionHero } from "./sectionHero/SectionHero";
import { SectionPage } from "./sectionPage/SectionPage";
import { sectionContainerStyles } from "./sectionsContainer.styles";
import { SectionPagesGrid } from "./sectionPagesGrid/SectionPagesGrid";
import { SectionDtoVariant } from "@models/section/section-dto-variant.model";
import { SectionPagesGridDto } from "@models/section/section-pages-grid-dto.model";
import { Box } from "@mui/material";
import { SectionPartnersAndSponsorsDto } from "@models/section/section-partners-and-sponsors-dto.model";
import { SectionPartnersAndSponsors } from "./sectionPartnersAndSponsors/SectionPartnersAndSponsors";
import { SectionArticlesCarouselDto } from "@models/section/section-articles-carousel-dto.model";
import { SectionArticlesCarousel } from "./sectionArticlesCarousel/SectionArticlesCarousel";
import { SectionFormDto } from "@models/section/section-form.model";
import { SectionForm } from "./sectionForm/SectionForm";

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
