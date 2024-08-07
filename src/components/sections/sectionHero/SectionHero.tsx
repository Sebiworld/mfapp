// {
//     "type": "hero",
//     "id": 5359,
//     "section_name": "mf-hero",
//     "title": "Musical-Fabrik Hero",
//     "hide_title": true,
//     "main_image": {
//         "basename": "medicus-ensemble-bg.jpg",
//         "name": "medicus-ensemble-bg.jpg",
//         "description": "",
//         "created": 1580497282,
//         "modified": 1580497282,
//         "filesize": 158629,
//         "filesizeStr": "154,9 kB",
//         "page_id": 5359,
//         "ext": "jpg",
//         "basename_mini": "medicus-ensemble-bg.600x0.jpg",
//         "width": 1920,
//         "height": 820,
//         "dimension_ratio": 2.34
//     },
//     "contents": []
// }

import { SectionSpacer } from '@components/sectionSpacer/SectionSpacer';
import { Box } from '@mui/joy';
import React from 'react';
import { sectionHeroStyles } from './section-hero.styles';
import { SectionDto } from '@models/section/section-dto.model';
import { LazyPicture } from '@components/lazyPicture/LazyPicture';

export interface SectionHeroProps {
  section: SectionDto;
}

export const SectionHero: React.FC<SectionHeroProps> = ({ section }) => {
  return (
    <Box component="section" id={section.section_name} className="section section-hero" sx={sectionHeroStyles}>
      {section.title && !section.hide_title && section.title}

      {section.main_image?.basename && (
        <Box className="hero-image">
          <LazyPicture image={section.main_image}></LazyPicture>
        </Box>
      )}

      <SectionSpacer position="bottom" logo="auto" logoColor="light"></SectionSpacer>
    </Box>
  );
};
