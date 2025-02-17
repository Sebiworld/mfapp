import { ContentBlocks } from "@components/contentBlocks/ContentBlocks";
import { SectionPartnersAndSponsorsDto } from "@models/section/section-partners-and-sponsors-dto.model";
import { Box, Card, Typography } from "@mui/material";
import React from "react";
import { sectionPartnersAndSponsorsStyles } from "./sectionPartnersAndSponsors.styles";
import { LazyPicture } from "@components/lazyPicture/LazyPicture";
import { useTranslation } from "react-i18next";
import { SectionSpacer } from "@components/sectionSpacer/SectionSpacer";

export interface SectionPartnersAndSponsorsProps {
  section: SectionPartnersAndSponsorsDto;
}

export const SectionPartnersAndSponsors: React.FC<
  SectionPartnersAndSponsorsProps
> = ({ section }) => {
  const { t } = useTranslation();

  return (
    <Box
      component="section"
      id={section.section_name}
      className="section section-partners-and-sponsors np"
      sx={sectionPartnersAndSponsorsStyles}
    >
      <SectionSpacer position="top"></SectionSpacer>

      <Box className="introduction">
        <Box className="sub-section">
          {section.title && !section.hide_title && (
            <Typography variant="h2" className="section-title">
              {section.title}
            </Typography>
          )}

          <ContentBlocks blocks={section.contents}></ContentBlocks>
        </Box>
      </Box>

      {!!section.partners?.length && (
        <Box className="list-container partners-list sub-section">
          <Typography variant="h3" className="list-title">
            {t("project.partners")}
          </Typography>

          <Box className="list">
            {section.partners?.map((partner) => {
              return (
                <Box
                  key={partner.id}
                  className="list-item partner aspect-ratio ar-1-1"
                >
                  <Card variant="outlined" className="item-wrapper ar-content">
                    <Box className="item-content">
                      {!!partner?.image && (
                        <LazyPicture image={partner.image}></LazyPicture>
                      )}
                    </Box>
                  </Card>
                </Box>
              );
            })}
          </Box>
        </Box>
      )}

      {!!section.sponsors?.length && (
        <Box className="list-container sponsors-list sub-section">
          <Typography variant="h3" className="list-title">
            {t("project.sponsors")}
          </Typography>

          <Box className="list">
            {section.sponsors?.map((sponsor) => {
              return (
                <Box
                  key={sponsor.id}
                  className="list-item sponsor partner aspect-ratio ar-1-1"
                >
                  <Card variant="outlined" className="item-wrapper ar-content">
                    <Box className="item-content">
                      {!!sponsor?.image && (
                        <LazyPicture image={sponsor.image}></LazyPicture>
                      )}
                    </Box>
                  </Card>
                </Box>
              );
            })}
          </Box>
        </Box>
      )}

      <SectionSpacer position="bottom"></SectionSpacer>
    </Box>
  );
};
