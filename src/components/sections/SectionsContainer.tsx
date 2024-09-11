import { Box } from '@mui/joy';

import { FC } from 'react';
import { SectionHero } from './sectionHero/SectionHero';
import { SectionPage } from './sectionPage/SectionPage';
import { sectionContainerStyles } from './sectionsContainer.styles';
import { SectionPagesGrid } from './sectionPagesGrid/SectionPagesGrid';
import { SectionDtoVariant } from '@models/section/section-dto-variant.model';
import { SectionPagesGridDto } from '@models/section/section-pages-grid-dto.model';

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
        if (section.type === 'hero') {
          return <SectionHero key={section.id} section={section}></SectionHero>;
        } else if (section.type === 'page') {
          return <SectionPage key={section.id} section={section as SectionPagesGridDto}></SectionPage>;
        } else if (section.type === 'pages-grid') {
          return <SectionPagesGrid key={section.id} section={section as SectionPagesGridDto}></SectionPagesGrid>;
        }
        return <SectionPage key={section.id} section={section}></SectionPage>;
      })}
    </Box>
  );
};
