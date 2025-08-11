"use client";
import FavoriteBorderRoundedIcon from "@mui/icons-material/FavoriteBorderRounded";
import { IconButton, Stack } from "@mui/material";
import React, { memo } from "react";
import { CustomLink } from "../../custom-link";
import { DrawerAddIcon, DrawerFavouritesIcon } from "../../../icons";
import { config } from "../../../constants";
import ProfileDropdown from "../profile-dropdown/profile-dropdown";
import { useToken } from "../../../hooks";

const RightMenuList = () => {
  const token = useToken();
  return (
    <Stack
      direction={"row"}
      justifyContent={"flex-end"}
      alignItems={"center"}
      columnGap={{ lg: 1, xs: 0 }}
    >
      <IconButton
        color="inherit"
        sx={{
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
        component={CustomLink}
        href="/favourites-management"
        title="Favourites"
      >
        <FavoriteBorderRoundedIcon
          sx={{
            color: "grey.900",
          }}
        />
      </IconButton>
      {<ProfileDropdown />}
      <>
        <IconButton
          sx={{
            p: 1,
            width: "40px",
            height: "40px",
            display: {
              xs: "flex",
              lg: "none",
            },
          }}
          component={CustomLink}
          href="/favourites-management"
          aria-label="Favourites"
        >
          <DrawerFavouritesIcon width={17} height={18} />
        </IconButton>
        <IconButton
          component={CustomLink}
          href={
            token
              ? (process.env.NEXT_PUBLIC_CREATE_AD_URL ??
                `/${process.env.NEXT_PUBLIC_APP_NAME}/create`)
              : config.create_ad
          }
          isExternalLink={!token}
          sx={{
            p: 0,
            width: "40px",
            height: "40px",
            display: {
              xs: "flex",
              lg: "none",
            },
          }}
          aria-label="Add"
        >
          <DrawerAddIcon />
        </IconButton>
      </>
    </Stack>
  );
};

export default memo(RightMenuList);
