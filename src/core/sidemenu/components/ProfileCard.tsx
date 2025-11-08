import { UserDto } from "@models/user-dto.model";
import { Avatar, Box, Card, CardHeader, IconButton } from "@mui/material";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import { useMemo } from "react";
import { profileCardStyles } from "./profileCard.styles";
import { RoleBadge } from "@components/roleBadge/RoleBadge";

export interface ProfileCardProps {
  user: UserDto;
}

export const ProfileCard = ({ user }: ProfileCardProps) => {
  const name = useMemo(() => {
    if (user.nickname && user.nickname.length > 0) {
      return user.nickname;
    }

    if (user?.first_name && user?.last_name) {
      return `${user.first_name} ${user.last_name}`;
    }

    if (user?.first_name) {
      return user.first_name;
    }

    if (user?.last_name) {
      return user.last_name;
    }

    return user.name;
  }, [user]);

  const initial = useMemo(() => {
    if (name && name.length > 0) {
      return name.charAt(0).toUpperCase();
    }

    return "";
  }, [name]);

  const badges = useMemo(() => {
    const roles = user?.roles?.map((role) => (
      <RoleBadge key={role.id} role={role}></RoleBadge>
    ));

    return <Box className="badges-container">{roles}</Box>;
  }, [user]);

  return (
    <Card
      className="profile-card"
      variant="elevation"
      elevation={0}
      sx={profileCardStyles}
    >
      <CardHeader
        avatar={<Avatar aria-label="recipe">{initial}</Avatar>}
        action={
          <IconButton aria-label="settings">
            <MoreHorizIcon />
          </IconButton>
        }
        title={`Hallo ${name}!`}
        subheader={badges}
      />
    </Card>
  );
};
