import { useTranslation } from "react-i18next";
import { isValidArray } from "@utils/functions/isValidArray";

import { Box, Button, Typography } from "@mui/material";
import { sidebarBoxGalleriesStyles } from "./sidebarBoxGalleries.styles";
import { useEffect } from "react";
import { ProjectDetailsDto } from "@models/project-dto.model";

type SidebarBoxGalleriesData = ProjectDetailsDto["images"];

export interface SidebarBoxGalleriesProps {
  data?: SidebarBoxGalleriesData;
  type?: string;
}

export const SidebarBoxGalleries: React.FC<SidebarBoxGalleriesProps> = ({
  data,
}) => {
  const { t } = useTranslation();

  useEffect(() => {
    // For demo purposes, log the project data to the console
    console.log("Image data:", data);
  }, [data]);

  if (!isValidArray(data?.galleries) || !data?.galleries.length) {
    return null;
  }

  return (
    <Box
      className={`sidebar-box sidebar-box-galleries`}
      data-testid={`sidebar-box-galleries`}
      sx={sidebarBoxGalleriesStyles}
    >
      <Typography className="box-title" variant="h3">
        {t(`project.galleries.title`)}
      </Typography>

      {data.galleries.map((item) => (
        <Box key={item.id} className="gallery-item" sx={{ mb: 2 }}>
          TEST
        </Box>
      ))}

      {!!data?.galleries_page_url && (
        <Button
          variant="contained"
          color="secondary"
          href={data.galleries_page_url}
          fullWidth
          size="small"
        >
          {t("project.galleries.more")}
        </Button>
      )}
    </Box>
  );
};
