import { RoleDto } from "@models/user-dto.model";
import { Chip } from "@mui/material";
import { parseHtml } from "@utils/functions/parseHtml";
import { useMemo } from "react";

export interface RoleBadgeProps {
  role: RoleDto;
}

export const RoleBadge = ({ role }: RoleBadgeProps) => {
  const title = useMemo(() => {
    if (!role.title) {
      return null;
    }

    return parseHtml(role.title);
  }, [role.title]);

  return <Chip label={title} size="small" className="role-badge"></Chip>;
};
