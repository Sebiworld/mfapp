// {
//     "type": "page",
//     "id": 2005,
//     "section_name": "das-sind-wir",
//     "title": "Das sind wir",
//     "hide_title": true,
//     "contents": [
//         {
//             "type": "text",
//             "depth": 0,
//             "title": "",
//             "hide_title": 0,
//             "text": "<p>Der Musical-Fabrik e. V. ist ein gemeinnütziger Verein, der generations-, geschlechter-, interessen- und grenzübergreifend über 100 Menschen die Gelegenheit gibt, Ihr Können und Ihr Wollen auszuleben - und das tagtäglich.</p>",
//             "classes": "center"
//         }
//     ]
// }

import { ContentBlocks } from '@components/contentBlocks/ContentBlocks';
import { SectionDto } from '@models/section/section-dto.model';
import { Box, Typography } from '@mui/joy';
import React from 'react';

export interface SectionPageProps {
  section: SectionDto;
}

export const SectionPage: React.FC<SectionPageProps> = ({ section }) => {
  return (
    <Box component="section" id={section.section_name} className="section section-page">
      {section.title && !section.hide_title && <Typography level="h2">{section.title}</Typography>}
      <ContentBlocks blocks={section.contents}></ContentBlocks>
    </Box>
  );
};
