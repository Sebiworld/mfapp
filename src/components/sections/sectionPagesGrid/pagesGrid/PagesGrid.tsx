import {
  AspectRatio,
  Box,
  Button,
  Card,
  CardContent,
  CardOverflow,
  Typography,
} from "@mui/joy";
import React from "react";
import Masonry from "@mui/lab/Masonry";

import { SectionPagesGridDto } from "@models/section/section-pages-grid-dto.model";
import { LazyPicture } from "@components/lazyPicture/LazyPicture";
import { pagesGridStyles } from "./pagesGrid.styles";
import { Link } from "@tanstack/react-router";
import { useTranslation } from "react-i18next";

export interface PagesGridProps {
  section: SectionPagesGridDto;
}

export const PagesGrid: React.FC<PagesGridProps> = ({ section }) => {
  // useEffect(() => {
  //   console.log("PagesGrid", section);
  // }, [section]);
  const { t } = useTranslation();

  return (
    <Box className="pages-grid" data-testid="pages-grid" sx={pagesGridStyles}>
      <Masonry
        columns={{ xs: 1, sm: 2, md: 3, xl: 4, xxl: 5 }}
        spacing={2}
        columns-md={3}
      >
        {section.cards?.map((card) => {
          const image = card.card_image || card.main_image;
          return (
            <Card key={card.id} className="page-card" variant="outlined">
              {!!image && (
                <CardOverflow>
                  <AspectRatio>
                    <LazyPicture image={image}></LazyPicture>
                  </AspectRatio>
                </CardOverflow>
              )}

              {(!!card.title || !!card.intro || !!card.description) && (
                <CardContent className="card-content">
                  {!!card.title && (
                    <Typography level="title-lg" component="h3">
                      <Box
                        className="card-title"
                        dangerouslySetInnerHTML={{ __html: card.title }}
                      ></Box>
                    </Typography>
                  )}

                  {!!card.intro && (
                    <Typography level="body-sm">
                      <Box
                        className="card-intro"
                        dangerouslySetInnerHTML={{ __html: card.intro }}
                      ></Box>
                    </Typography>
                  )}

                  {!!card.description && (
                    <Typography level="body-sm">
                      <Box
                        className="card-description"
                        dangerouslySetInnerHTML={{ __html: card.description }}
                      ></Box>
                    </Typography>
                  )}
                </CardContent>
              )}

              <CardOverflow>
                <Button
                  variant="solid"
                  color="neutral"
                  // size="lg"
                  component={Link}
                  to={card.url}
                >
                  {t("page_card.btn_more")}
                </Button>
              </CardOverflow>
            </Card>
          );
        })}
      </Masonry>
    </Box>
  );
};
