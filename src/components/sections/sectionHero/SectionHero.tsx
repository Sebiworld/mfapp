import { SectionSpacer } from "@components/sectionSpacer/SectionSpacer";
import React, { CSSProperties, useMemo } from "react";
import { sectionHeroStyles } from "./section-hero.styles";
import { SectionDto } from "@models/section/section-dto.model";
import { LazyPicture } from "@components/lazyPicture/LazyPicture";
import { LazyPictureSize } from "@components/lazyPicture/components/LazyPictureWithoutFallback";
import { Box, Typography } from "@mui/material";
import { Alerts } from "@components/alerts/Alerts";
import { ContentBlocks } from "@components/contentBlocks/ContentBlocks";
import { isValidArray } from "@utils/functions/isValidArray";

/** Hero images span the viewport; one entry per breakpoint, widest first so the first matching media query wins. */
const HERO_IMAGE_SIZES: LazyPictureSize[] = [
  { media: "xl-up", width: 1920 },
  { media: "lg-up", width: 1536 },
  { media: "md-up", width: 1200 },
  { media: "sm-up", width: 900 },
  { width: 600 },
];

/** The hero image is the largest visible element on load, so it must not wait for lazy loading. */
const HERO_IMAGE_PROPS = { loading: "eager", fetchPriority: "high" } as const;

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
    return !!(
      (isValidArray(section?.alerts) && !!section.alerts.length) ||
      (section?.title && !section?.hide_title) ||
      (isValidArray(section?.contents) && !!section.contents.length)
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
        <Box className="image-container">
          {section.main_image?.basename && (
            <Box
              className="hero-image"
              style={
                section.main_image.dimension_ratio > 0
                  ? ({
                      "--hero-ratio": section.main_image.dimension_ratio,
                    } as CSSProperties)
                  : undefined
              }
            >
              <LazyPicture
                image={section.main_image}
                sizes={HERO_IMAGE_SIZES}
                imageProps={HERO_IMAGE_PROPS}
              ></LazyPicture>
            </Box>
          )}

          <SectionSpacer
            position="bottom"
            logo="auto"
            logoColor="light"
          ></SectionSpacer>
        </Box>

        {hasTextContent && (
          <Box className="text-contents-container">
            {section?.alerts && <Alerts alerts={section?.alerts}></Alerts>}

            {section.title && !section.hide_title && (
              <Typography variant="h2" className="section-title">
                {section.title}
              </Typography>
            )}

            <ContentBlocks blocks={section.contents}></ContentBlocks>
          </Box>
        )}
      </Box>
    </>
  );
};
