"use client";
import { Divider, Grid, IconButton, Stack } from "@mui/material";
import SwipeableDrawer from "@mui/material/SwipeableDrawer";
import React, { memo, useState } from "react";
import DrawerHeader from "./drawer-header";
import MainDrawerList from "./main-drawer-list";
import ProfileDrawerList from "./profile-drawer-list";
import { HamburgerIcon } from "../../../icons";
import SocialMediaIcons from "../../social-media-icons";
import { useTranslation } from "../../../i18n";

const CustomHeaderDrawer: React.FC<{
  isAuthenticated: boolean;
}> = ({ isAuthenticated }) => {
  const { t } = useTranslation("header");
  const [open, setOpen] = useState(false);
  const [showProfileMenu, setShowProfileMenu] = useState(false);

  const toggleDrawer =
    (open: boolean) => (event: React.KeyboardEvent | React.MouseEvent) => {
      if (
        event &&
        event.type === "keydown" &&
        ((event as React.KeyboardEvent).key === "Tab" ||
          (event as React.KeyboardEvent).key === "Shift")
      ) {
        return;
      }

      setOpen(open);
    };

  const toggleProfileDrawer =
    (open: boolean) => (event: React.KeyboardEvent | React.MouseEvent) => {
      if (
        event &&
        event.type === "keydown" &&
        ((event as React.KeyboardEvent).key === "Tab" ||
          (event as React.KeyboardEvent).key === "Shift")
      ) {
        return;
      }
      setShowProfileMenu(open);
    };

  return (
    <Grid item width={"80px"} sx={{ display: { xs: "flex", lg: "none" } }}>
      {open && (
        <SwipeableDrawer
          anchor={"right"}
          open={open}
          onClose={toggleDrawer(false)}
          onOpen={toggleDrawer(true)}
          sx={[
            {
              "& .MuiPaper-root": {
                width: "100%",
                py: 2,
              },
            },
          ]}
        >
          <DrawerHeader
            isAuthenticated={isAuthenticated}
            toggleDrawer={toggleDrawer}
            setShowProfileMenu={setShowProfileMenu}
          />
          <MainDrawerList toggleDrawer={toggleDrawer} />
          <Divider />
          <Stack
            direction={"row"}
            height={96}
            alignContent={"center"}
            justifyContent={"center"}
            gap={2}
            p={4}
          >
            <SocialMediaIcons isMobile={open} />
          </Stack>
        </SwipeableDrawer>
      )}
      <IconButton
        onClick={toggleDrawer(true)}
        aria-label="open drawer"
        sx={{ width: 40, height: 40, p: 1 }}
      >
        <HamburgerIcon width={18} height={12} />
      </IconButton>

      {showProfileMenu && (
        <SwipeableDrawer
          anchor={"right"}
          open={showProfileMenu}
          onClose={toggleProfileDrawer(false)}
          onOpen={toggleProfileDrawer(true)}
          sx={[
            {
              "& .MuiPaper-root": {
                width: "100%",
                py: 2,
              },
            },
          ]}
        >
          <DrawerHeader
            isAuthenticated={isAuthenticated}
            toggleDrawer={toggleProfileDrawer}
            setShowProfileMenu={setShowProfileMenu}
            isProfileDrawer={true}
          />

          <ProfileDrawerList
            toggleDrawer={toggleProfileDrawer}
            mainDrawer={toggleDrawer}
          />
        </SwipeableDrawer>
      )}
    </Grid>
  );
};

export default memo(CustomHeaderDrawer);
