/* eslint-disable react-hooks/purity */
import { UserDto } from "@models/user-dto.model";
import {
  Avatar,
  Box,
  Card,
  CardHeader,
  IconButton,
  Menu,
  MenuItem,
} from "@mui/material";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import { useId, useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import { authCardStyles } from "./authCard.styles";
import { useAuthApi } from "@api/hooks/useAuthApi";

export interface ProfileCardProps {
  user: UserDto;
  setSidemenuOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

export const ProfileCard = ({ user, setSidemenuOpen }: ProfileCardProps) => {
  const { t } = useTranslation();
  const { logout } = useAuthApi();

  const name = useMemo(() => {
    if (user.nickname && user.nickname.length > 0) {
      return user.nickname;
    }

    if (user?.first_name) {
      return user.first_name;
    }

    return user.name;
  }, [user]);

  const initial = useMemo(() => {
    if (name && name.length > 0) {
      return name.charAt(0).toUpperCase();
    }

    return "";
  }, [name]);

  const greeting = useMemo(() => {
    const greetings = [
      "Hallo",
      "Grüß dich",
      "Bonjour",
      "Tachchen",
      "Moin",
      "Hej",
    ];

    const rareGreetings = [
      "Hallöchen",
      "Hola",
      "Salve",
      "Ahoj",
      "Olá",
      "Hei",
      "Salam",
      "Namaste",
      "Konnichiwa",
      "Shalom",
      "Merhaba",
    ];

    const hours = new Date().getHours();

    if (hours < 12) {
      greetings.push("Guten Morgen");
      rareGreetings.push("Buongiorno", "Gumo");
    } else if (hours < 18) {
      greetings.push("Guten Tag");
      rareGreetings.push("G'day", "Good afternoon");
    } else {
      greetings.push(
        "Guten Abend",
        "N' Abend",
        "Bonsoir",
        "Bonna sera",
        "Boa noite",
        "Goedenavond",
        "Good evening"
      );
    }

    const rareChance = 0.08;
    const pool = Math.random() < rareChance ? rareGreetings : greetings;
    const choice = pool[Math.floor(Math.random() * pool.length)];

    return /[!?.,]$/.test(choice) ? choice : `${choice},`;
  }, []);

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const id = useId();
  const menuId = id + "-profile-menu";
  const buttonId = id + "-profile-button";

  return (
    <>
      <Card
        className="profile-card"
        variant="elevation"
        elevation={0}
        sx={authCardStyles}
      >
        <CardHeader
          avatar={<Avatar aria-label="recipe">{initial}</Avatar>}
          action={
            <IconButton
              id={buttonId}
              title="Profil Optionen"
              aria-controls={open ? menuId : undefined}
              aria-haspopup="true"
              aria-expanded={open ? "true" : undefined}
              onClick={handleClick}
            >
              <MoreHorizIcon />
            </IconButton>
          }
          title={
            <>
              {greeting}
              <br />
              <Box className="username">{name}!</Box>
            </>
          }
        />
      </Card>

      <Menu
        id={menuId}
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        slotProps={{
          list: {
            "aria-labelledby": buttonId,
          },
        }}
        sx={{ ".MuiList-root": { padding: 0 } }}
      >
        {/* <MenuItem onClick={handleClose}>Mein Account</MenuItem> */}
        <MenuItem
          onClick={() => {
            logout();
            handleClose();
            setSidemenuOpen(false);
          }}
        >
          {t("auth.logout")}
        </MenuItem>
      </Menu>
    </>
  );
};
