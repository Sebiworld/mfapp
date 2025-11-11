import { UserDto } from "@models/user-dto.model";
import { ProfileCard } from "./ProfileCard";

export interface AuthCardProps {
  user?: UserDto;
  setSidemenuOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

export const AuthCard = ({ user, setSidemenuOpen }: AuthCardProps) => {
  if (user?.isLoggedIn) {
    return <ProfileCard user={user} setSidemenuOpen={setSidemenuOpen} />;
  }

  return null;
};
