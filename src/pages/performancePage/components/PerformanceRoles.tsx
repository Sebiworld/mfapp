import { FC, useMemo } from "react";
import { Box, Typography } from "@mui/material";
import { useTranslation } from "react-i18next";
import { PerformanceRolesDto } from "@models/utility-types/performance-detail-dto.model";
import { ProjectRolePortrait } from "@pages/page/templateContents/projectRole/components/ProjectRolePortrait";
import { projectRoleStyles } from "@pages/page/templateContents/projectRole/projectRole.styles";
import { parseHtml } from "@utils/functions/parseHtml";
import { buildRoleTree } from "../functions/buildRoleTree";
import { collectRoleTiles } from "../functions/collectRoleTiles";

interface PerformanceRolesProps {
  roles: PerformanceRolesDto;
  /** Seasons of the performance; entries limited to other seasons are left out. */
  seasonIds: number[];
}

/**
 * Shows the people of a performance as tiles grouped like the roles overview: per group one grid with a tile
 * per person and role (portrait, name, role name), using the roles already reduced to the playing casts.
 * Roles and groups without people are left out; nothing is rendered when nobody is left.
 * @param roles Roles, casts and portraits of the performance.
 * @param seasonIds Seasons of the performance.
 */
export const PerformanceRoles: FC<PerformanceRolesProps> = ({
  roles,
  seasonIds,
}) => {
  const { t } = useTranslation();

  const groups = useMemo(
    () =>
      buildRoleTree(roles.roles)
        .map((node) => ({
          node,
          tiles: collectRoleTiles(node, roles, seasonIds),
        }))
        .filter((group) => group.tiles.length > 0),
    [roles, seasonIds]
  );

  if (!groups.length) {
    return null;
  }

  return (
    <Box
      component="section"
      className="performance-roles project-role"
      data-testid="performance-roles"
      sx={projectRoleStyles}
    >
      <Typography variant="h4" component="h2">
        {t("performance.roles")}
      </Typography>

      {groups.map(({ node, tiles }) => (
        <Box
          className="performance-role-group"
          data-testid="performance-role-group"
          key={node.role.id}
        >
          <Typography variant="h5" component="h3">
            {parseHtml(node.role.title)}
          </Typography>

          <Box className="performance-tiles" data-testid="performance-tiles">
            {tiles.map((tile) => (
              <ProjectRolePortrait key={tile.key} portrait={tile.portrait} />
            ))}
          </Box>
        </Box>
      ))}
    </Box>
  );
};
