import { LazyPicture } from "@components/lazyPicture/LazyPicture";
import {
  ProjectPortraitDto,
  ProjectPortraitWithRoles,
} from "@models/project-role/project-portrait-dto.model";
import { ProjectRoleDto } from "@models/project-role/project-role-dto.model";
import { Box, Card, CardContent, Typography } from "@mui/material";
import { getRandomNumberBetween } from "@utils/functions/getRandomNumberBetween";
import { isValidArray } from "@utils/functions/isValidArray";
import { FC, Fragment, useMemo } from "react";
import { ProjectRolePortraitActionWrapper } from "./ProjectRolePortraitActionWrapper";

const placeholderPathsMale = [
  "/img/portrait-single/portrait-placeholder-single-1.jpg",
  "/img/portrait-single/portrait-placeholder-single-2.jpg",
  "/img/portrait-single/portrait-placeholder-single-4.jpg",
  "/img/portrait-single/portrait-placeholder-single-13.jpg",
];

const placeholderPathsFemale = [
  "/img/portrait-single/portrait-placeholder-single-3.jpg",
  "/img/portrait-single/portrait-placeholder-single-6.jpg",
  "/img/portrait-single/portrait-placeholder-single-7.jpg",
];

const placeholderPathsRandom = [
  "/img/portrait-single/portrait-placeholder-single-5.jpg",
  "/img/portrait-single/portrait-placeholder-single-8.jpg",
  "/img/portrait-single/portrait-placeholder-single-9.jpg",
  "/img/portrait-single/portrait-placeholder-single-10.jpg",
  "/img/portrait-single/portrait-placeholder-single-11.jpg",
  "/img/portrait-single/portrait-placeholder-single-12.jpg",
];

interface ProjectRolePortraitProps {
  portrait: ProjectPortraitWithRoles | ProjectPortraitDto;
}

export const ProjectRolePortrait: FC<ProjectRolePortraitProps> = ({
  portrait,
}) => {
  const title = useMemo(() => {
    if (!portrait) {
      return "";
    }

    if (portrait.title_separable) {
      return portrait.title_separable.replaceAll("_", "&shy;");
    }

    if (portrait.title) {
      return portrait.title;
    }

    return "";
  }, [portrait]);

  const placeholderUrl = useMemo(() => {
    let placeholderPaths = [];
    if (
      !portrait.portrait_mode ||
      portrait.portrait_mode === "male" ||
      portrait.portrait_mode === "random"
    ) {
      placeholderPaths.push(...placeholderPathsMale);
    }

    if (
      portrait.portrait_mode === "female" ||
      portrait.portrait_mode === "random"
    ) {
      placeholderPaths.push(...placeholderPathsFemale);
    }

    if (portrait.portrait_mode === "random") {
      placeholderPaths.push(...placeholderPathsRandom);
    }

    if (portrait.last_name?.toLowerCase() === "schendel") {
      placeholderPaths = placeholderPathsRandom;
    }

    const placeholderIndex = getRandomNumberBetween(
      0,
      placeholderPaths.length - 1
    );

    return placeholderPaths[placeholderIndex];
  }, [portrait.last_name, portrait.portrait_mode]);

  const projectRoles = useMemo(() => {
    const portraitRoles = (portrait as ProjectPortraitWithRoles)?.projectRoles;
    if (!isValidArray(portraitRoles) || !portraitRoles.length) {
      return [] as ProjectRoleDto[];
    }

    return portraitRoles;
  }, [portrait]);

  return (
    <Card data-testid="project-role-portrait" className="project-role-portrait">
      <ProjectRolePortraitActionWrapper portrait={portrait}>
        <Box className="portrait-image aspect-ratio ar-3-4">
          <LazyPicture
            className="ar-content"
            image={portrait.main_image}
            sizes={[
              {
                width: 200,
              },
            ]}
            placeholder={placeholderUrl}
          ></LazyPicture>
        </Box>

        {/* <LazyPicture
          className="portrait-image"
          image={portrait.main_image}
          sizes={[
            {
              width: 400,
            },
          ]}
          placeholder={placeholderUrl}
        /> */}

        <CardContent>
          <Typography
            className="portrait-title"
            variant="h6"
            dangerouslySetInnerHTML={{ __html: title }}
          ></Typography>

          {projectRoles.map((projectRole) => (
            <Fragment key={projectRole.id}>
              {!!projectRole?.title && (
                <Typography
                  className="portrait-role"
                  dangerouslySetInnerHTML={{ __html: projectRole.title }}
                ></Typography>
              )}
            </Fragment>
          ))}
        </CardContent>
      </ProjectRolePortraitActionWrapper>
    </Card>
  );
};
