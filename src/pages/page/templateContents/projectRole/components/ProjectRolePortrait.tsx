import { LazyPicture } from "@components/lazyPicture/LazyPicture";
import { ProjectPortraitDto } from "@models/project-role/project-portrait-dto.model";
import { ProjectRoleDto } from "@models/project-role/project-role-dto.model";
import { Card, CardActionArea, CardContent, Typography } from "@mui/material";
import { getRandomNumberBetween } from "@utils/functions/getRandomNumberBetween";
import { FC, useMemo } from "react";

const placeholderPaths = [
  "/img/portrait-single/portrait-placeholder-single-1.jpg",
  "/img/portrait-single/portrait-placeholder-single-2.jpg",
  "/img/portrait-single/portrait-placeholder-single-3.jpg",
  "/img/portrait-single/portrait-placeholder-single-4.jpg",
  "/img/portrait-single/portrait-placeholder-single-5.jpg",
  "/img/portrait-single/portrait-placeholder-single-6.jpg",
  "/img/portrait-single/portrait-placeholder-single-7.jpg",
  "/img/portrait-single/portrait-placeholder-single-8.jpg",
  "/img/portrait-single/portrait-placeholder-single-9.jpg",
  "/img/portrait-single/portrait-placeholder-single-10.jpg",
  "/img/portrait-single/portrait-placeholder-single-11.jpg",
  "/img/portrait-single/portrait-placeholder-single-12.jpg",
  "/img/portrait-single/portrait-placeholder-single-13.jpg",
];

interface ProjectRolePortraitProps {
  portrait: ProjectPortraitDto;
  projectRole?: ProjectRoleDto;
}

export const ProjectRolePortrait: FC<ProjectRolePortraitProps> = ({
  portrait,
  projectRole,
}) => {
  const title = useMemo(() => {
    if (!portrait) {
      return "";
    }

    if (portrait.title_separable) {
      return portrait.title_separable.replaceAll("_", "&shy;");
    }

    return "";
  }, [portrait]);

  const placeholderUrl = useMemo(() => {
    const placeholderIndex = getRandomNumberBetween(
      0,
      placeholderPaths.length - 1
    );
    return placeholderPaths[placeholderIndex];
  }, []);

  // TODO: Show Placeholder portrait. Add "zu besetzen" amount option to participants list

  return (
    <Card data-testid="project-role-portrait" className="project-role-portrait">
      <CardActionArea>
        <LazyPicture
          className="portrait-image"
          image={portrait.main_image}
          sizes={[
            {
              width: 400,
            },
          ]}
          placeholder={placeholderUrl}
        />

        <CardContent>
          <Typography
            className="portrait-title"
            variant="h6"
            dangerouslySetInnerHTML={{ __html: title }}
          ></Typography>

          {!!projectRole?.title && (
            <Typography
              className="portrait-role"
              dangerouslySetInnerHTML={{ __html: projectRole.title }}
            ></Typography>
          )}
        </CardContent>
      </CardActionArea>
    </Card>
  );
};
