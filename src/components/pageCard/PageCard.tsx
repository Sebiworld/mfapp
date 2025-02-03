import React from "react";

import { Link } from "@tanstack/react-router";
import { useTranslation } from "react-i18next";
import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Typography,
} from "@mui/material";
import { MFApi } from "@api/mfApi";
import { PageCardDto } from "@models/page/page-card-dto.model";
import { pageCardStyles } from "./pageCard.styles";
import { HeadingLevel } from "@models/utility-types/heading-level.model";

export interface PageCardProps {
  card: PageCardDto;
  headingLevel?: HeadingLevel;
}

export const PageCard: React.FC<PageCardProps> = ({ card, headingLevel }) => {
  const { t } = useTranslation();

  const image = card.main_image;
  const imageUrl =
    image?.page_id &&
    image?.basename &&
    MFApi.getFileByIdUrl(image?.page_id, {
      file: image.basename,
    });

  return (
    <Card className="page-card" variant="outlined" sx={pageCardStyles}>
      {/* {!!image && (
                <CardOverflow>
                  <AspectRatio>
                    <LazyPicture image={image}></LazyPicture>
                  </AspectRatio>
                </CardOverflow>
              )} */}

      {!!imageUrl && (
        <CardMedia sx={{ height: 140 }} image={imageUrl} title="green iguana" />
      )}

      {(!!card.title || !!card.intro || !!card.description) && (
        <CardContent className="card-content">
          {!!card.title && (
            <Typography
              variant={`h${headingLevel || 2}`}
              gutterBottom
              dangerouslySetInnerHTML={{ __html: card.title }}
              className="card-title"
            ></Typography>
          )}

          {!!card.intro && (
            <Typography variant="body2">
              <Box
                className="card-intro"
                dangerouslySetInnerHTML={{ __html: card.intro }}
              ></Box>
            </Typography>
          )}

          {!!card.description && (
            <Typography variant="body2">
              <Box
                className="card-description"
                dangerouslySetInnerHTML={{ __html: card.description }}
              ></Box>
            </Typography>
          )}
        </CardContent>
      )}

      <CardActions disableSpacing={true}>
        <Button
          component={Link}
          to={card.url}
          variant="contained"
          color="secondary"
        >
          {t("page_card.btn_more")}
        </Button>
      </CardActions>
    </Card>
  );
};
