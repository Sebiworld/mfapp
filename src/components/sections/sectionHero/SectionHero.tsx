import { SectionSpacer } from "@components/sectionSpacer/SectionSpacer";
import React, { useMemo } from "react";
import { sectionHeroStyles } from "./section-hero.styles";
import { SectionDto } from "@models/section/section-dto.model";
import { LazyPicture } from "@components/lazyPicture/LazyPicture";
import { Box, Typography } from "@mui/material";
import { Alerts } from "@components/alerts/Alerts";
import { ContentBlocks } from "@components/contentBlocks/ContentBlocks";

export interface SectionHeroProps {
  section: SectionDto;
}

export const SectionHero: React.FC<SectionHeroProps> = ({ section }) => {
  const classes = useMemo(() => {
    const output = ["section", `section-${section.type}`, "np"];

    if (section.classes && typeof section.classes === "string") {
      output.push(...section.classes.split(" "));
    }

    return output.join(" ");
  }, [section]);

  const hasTextContent = useMemo(() => {
    return (
      !!section?.alerts ||
      !!(section?.title && !section?.hide_title) ||
      !!section?.contents
    );
  }, [section]);

  return (
    <>
      <Box
        component="section"
        id={section.section_name}
        className={classes}
        sx={sectionHeroStyles}
      >
        {hasTextContent && (
          <Box className="text-contents">
            {section?.alerts && <Alerts alerts={section?.alerts}></Alerts>}

            {section.title && !section.hide_title && (
              <Typography variant="h2" className="section-title">
                {section.title}
              </Typography>
            )}

            <ContentBlocks blocks={section.contents}></ContentBlocks>
          </Box>
        )}

        {section.main_image?.basename && (
          <Box className="hero-image">
            <LazyPicture image={section.main_image}></LazyPicture>
          </Box>
        )}

        <SectionSpacer
          position="bottom"
          logo="auto"
          logoColor="light"
        ></SectionSpacer>
      </Box>
    </>
  );
};
