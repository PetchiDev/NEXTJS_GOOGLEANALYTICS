"use client";
import { Box, IconButton } from "@mui/material";
import dynamic from "next/dynamic";
import React, { useState } from "react";
import { AccountIcon } from "../../../icons";
import { COLORS } from "../../../theme";
import { useTranslation } from "../../../i18n";
const ProfileMenu = dynamic(() => import("./profile-menu"));

const ProfileDropdown = () => {
  const [moreMenu, setMoreMenu] = useState<null | HTMLElement>(null);
  const { t } = useTranslation("header");

  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setMoreMenu(event.currentTarget);
  };

  const handleCloseUserMenu = () => {
    setMoreMenu(null);
  };

  return (
    <Box
      sx={{
        flexGrow: 0,
        bgcolor: COLORS.RED,
      }}
    >
      <IconButton
        onClick={handleOpenUserMenu}
        aria-label={t("account_icon")}
        color="inherit"
        sx={{
          color: COLORS.PRIMARY[900],
          backgroundColor: "grey.50",
          borderRadius: 50,
          width: 40,
          height: 40,
          justifyContent: "center",
          alignItems: "center",
          display: {
            xs: "none",
            lg: "flex",
          },
        }}
        edge={false}
      >
        <AccountIcon size={24} />
      </IconButton>

      {!!moreMenu && (
        <ProfileMenu
          moreMenu={moreMenu}
          handleCloseUserMenu={handleCloseUserMenu}
        />
      )}
    </Box>
  );
};
export default ProfileDropdown;
