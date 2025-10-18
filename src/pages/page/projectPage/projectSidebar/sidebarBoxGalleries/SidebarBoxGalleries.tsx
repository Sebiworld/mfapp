import { useTranslation } from "react-i18next";
import { isValidArray } from "@utils/functions/isValidArray";

import { Box, Button, Typography } from "@mui/material";
import { sidebarBoxGalleriesStyles } from "./sidebarBoxGalleries.styles";
import { useMemo } from "react";
import { ProjectDetailsDto } from "@models/project-dto.model";
import { ImageDto } from "@models/image-dto.model";
import { ContentGallerySlider } from "@components/contentBlocks/variants/contentGallery/galleryTypes/contentGallerySlider/ContentGallerySlider";

type SidebarBoxGalleriesData = ProjectDetailsDto["images"];

export interface SidebarBoxGalleriesProps {
  data?: SidebarBoxGalleriesData;
  type?: string;
  showTitle?: boolean;
  onClose?: () => void;
}

export const SidebarBoxGalleries: React.FC<SidebarBoxGalleriesProps> = ({
  data,
  showTitle,
  onClose,
}) => {
  const { t } = useTranslation();

  const gallery = useMemo(
    () =>
      data?.galleries.filter(
        (item) => isValidArray(item.images) && item.images.length
      )?.[0],
    [data?.galleries]
  );

  if (!isValidArray(data?.galleries) || !data?.galleries.length) {
    return null;
  }

  return (
    <Box
      className={`sidebar-box sidebar-box-galleries`}
      data-testid={`sidebar-box-galleries`}
      sx={sidebarBoxGalleriesStyles}
    >
      {showTitle !== false && (
        <Typography className="box-title" variant="h3">
          {t(`project.galleries.title`)}
        </Typography>
      )}

      {gallery && (
        <Box className="gallery-container aspect-ratio ar-8-5">
          <Box className="gallery ar-content ">
            <ContentGallerySlider
              images={gallery.images as ImageDto[]}
              detailLink={gallery.url}
              onClose={onClose}
            />
          </Box>
        </Box>
      )}

      {!!data?.galleries_page_url && (
        <Button
          variant="contained"
          color="secondary"
          href={data.galleries_page_url}
          fullWidth
          size="small"
          onClick={onClose}
        >
          {t("project.galleries.more")}
        </Button>
      )}
    </Box>
  );
};
