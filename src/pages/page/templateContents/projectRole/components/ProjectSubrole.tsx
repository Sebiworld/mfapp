import { ProjectRoleDto } from "@models/project-role/project-role-dto.model";
import { Box, Button, Typography } from "@mui/material";
import { FC, useMemo } from "react";
import { ProjectRolePortraits } from "./ProjectRolePortraits";
import { LazyPicture } from "@components/lazyPicture/LazyPicture";
import { useTranslation } from "react-i18next";
import { getRandomNumberBetween } from "@utils/functions/getRandomNumberBetween";
import { Link } from "react-router";
import { parseHtml } from "@utils/functions/parseHtml";

const placeholderPaths = [
  "/img/portrait-group/portrait-placeholder-group-1.jpg",
  "/img/portrait-group/portrait-placeholder-group-2.jpg",
  "/img/portrait-group/portrait-placeholder-group-3.jpg",
  "/img/portrait-group/portrait-placeholder-group-4.jpg",
];

interface ProjectSubroleProps {
  role?: ProjectRoleDto;
  portraitIdsTree?: Map<number, Map<number, Set<number>>>;
  currentSeasonId?: number;
}

export const ProjectSubrole: FC<ProjectSubroleProps> = ({
  role,
  portraitIdsTree,
  currentSeasonId,
}) => {
  const { t } = useTranslation();

  const placeholderUrl = useMemo(() => {
    const placeholderIndex = getRandomNumberBetween(
      0,
      placeholderPaths.length - 1
    );
    return placeholderPaths[placeholderIndex];
  }, []);

  const teaserArea = useMemo(() => {
    if (role?.view_type === "subroles_teaser") {
      return null;
    }

    return (
      <ProjectRolePortraits
        role={role}
        portraitIdsTree={portraitIdsTree}
        currentSeasonId={currentSeasonId}
      />
    );
  }, [currentSeasonId, portraitIdsTree, role]);

  const title = useMemo(() => {
    if (!role?.title) {
      return null;
    }

    return parseHtml(role.title);
  }, [role]);

  const description = useMemo(() => {
    if (!role?.description) {
      return null;
    }

    return parseHtml(role.description);
  }, [role]);

  return (
    <Box
      data-testid="project-subrole"
      className={`project-subrole view-type-${role?.view_type || "unknown"}`}
    >
      {role?.view_type === "subroles_teaser" && (
        <Box className="group-image">
          <LazyPicture
            image={role.main_image}
            sizes={[
              {
                width: 800,
              },
            ]}
            placeholder={placeholderUrl}
          />
        </Box>
      )}

      {title && (
        <Typography variant="h3" className="subrole-title">
          {title}
        </Typography>
      )}

      {role?.description && (
        <Box className="subrole-description content-block">{description}</Box>
      )}

      {role?.url && (
        <Box className="subrole-actions">
          <Button
            variant="outlined"
            color="contrast"
            size="small"
            component={Link}
            to={role?.url}
          >
            {t("page_card.btn_more")}
          </Button>
        </Box>
      )}

      {teaserArea}
    </Box>
  );
};
