import React from "react";

import { useTranslation } from "react-i18next";
import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  Typography,
} from "@mui/material";
import { PageCardDto } from "@models/page/page-card-dto.model";
import { pageCardStyles } from "./pageCard.styles";
import { HeadingLevel } from "@models/utility-types/heading-level.model";
import { LazyPicture } from "@components/lazyPicture/LazyPicture";
import { IonIcon } from "@ionic/react";
import { Link } from "react-router";

export interface PageCardProps {
  card: PageCardDto;
  headingLevel?: HeadingLevel;
  style?: React.CSSProperties;
}

export const PageCard: React.FC<PageCardProps> = ({
  card,
  headingLevel,
  style,
}) => {
  const { t } = useTranslation();

  if (!card?.id) {
    return null;
  }

  const image = card?.main_image;

  return (
    <Card
      className="page-card"
      variant="outlined"
      sx={pageCardStyles}
      style={style}
    >
      <Box className="aspect-ratio ar-2-1">
        <Box className="ar-content">
          {image ? (
            <LazyPicture image={image}></LazyPicture>
          ) : (
            <img
              src="img/mf-bg.jpg"
              alt="Musical-Fabrik Platzhalterbild"
              loading="lazy"
            />
          )}
        </Box>
      </Box>

      {(!!card.title || !!card.intro || !!card.description) && (
        <CardContent className="card-content">
          {card.external_type === "Facebook" ? (
            <Typography
              variant={`h${headingLevel || 2}`}
              gutterBottom
              className="card-title subtle"
              component="div"
            >
              {t("page_card.facebook_title")}
            </Typography>
          ) : (
            !!card.title && (
              <Typography
                variant={`h${headingLevel || 2}`}
                gutterBottom
                dangerouslySetInnerHTML={{ __html: card.title }}
                className="card-title"
                component="div"
              ></Typography>
            )
          )}

          {!!card.intro && (
            <Typography
              variant="body2"
              component="div"
              className="card-intro"
              dangerouslySetInnerHTML={{ __html: card.intro }}
            ></Typography>
          )}

          {!!card.description && (
            <Typography
              variant="body2"
              component="div"
              className="card-description"
              dangerouslySetInnerHTML={{ __html: card.description }}
            ></Typography>
          )}
        </CardContent>
      )}

      <CardActions disableSpacing={true}>
        {card.external_type === "Facebook" ? (
          <Button
            component={Link}
            to={
              card.external_link || "https://de-de.facebook.com/musicalfabrik"
            }
            variant="contained"
            color="contrast"
            target="_blank"
            startIcon={
              <IonIcon aria-hidden="true" icon={"logo-facebook"}></IonIcon>
            }
          >
            {t("page_card.btn_more_on_facebook")}
          </Button>
        ) : (
          <Button
            component={Link}
            to={card.url}
            variant="contained"
            color="contrast"
          >
            {t("page_card.btn_more")}
          </Button>
        )}
      </CardActions>
    </Card>
  );
};
