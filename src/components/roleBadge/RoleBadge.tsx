import { RoleDto } from "@models/user-dto.model";
import { Chip } from "@mui/material";

export interface RoleBadgeProps {
  role: RoleDto;
}

export const RoleBadge = ({ role }: RoleBadgeProps) => {
  return (
    <Chip
      label={<span dangerouslySetInnerHTML={{ __html: role.title }}></span>}
      size="small"
      className="role-badge"
    ></Chip>
  );
};
