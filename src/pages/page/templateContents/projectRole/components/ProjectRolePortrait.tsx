import { LazyPicture } from "@components/lazyPicture/LazyPicture";
import { ProjectPortraitDto } from "@models/project-role/project-portrait-dto.model";
import { Card, CardActionArea, CardContent, Typography } from "@mui/material";
import { FC, useMemo } from "react";

interface ProjectRolePortraitProps {
  portrait: ProjectPortraitDto;
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

    return "";
  }, [portrait]);

  return (
    <Card data-testid="project-role-portrait" className="project-role-portrait">
      <CardActionArea>
        {!!portrait?.main_image && (
          <LazyPicture
            image={portrait.main_image}
            sizes={[
              {
                width: 400,
              },
            ]}
          />
        )}

        <CardContent>
          <Typography
            className="portrait-title"
            variant="h6"
            dangerouslySetInnerHTML={{ __html: title }}
          ></Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
};
