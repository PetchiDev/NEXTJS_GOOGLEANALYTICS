import { Box, ListItem, Typography } from "@mui/material";
import Image from "next/image";
import React, { FC, memo, useCallback } from "react";
import { CustomLink } from "../../custom-link";
import { IconProps } from "../../../types";

interface ProfileListItemProps {
  listItemText: string;
  color?: string;
  imagePath?: string | null;
  imageAlt?: string | null;
  href?: string;
  Icon?: FC<IconProps>;
  /* eslint-disable no-unused-vars */
  toggleDrawer: (
    open: boolean
  ) => (event: React.KeyboardEvent | React.MouseEvent) => void;
  mainDrawer: (
    open: boolean
  ) => (event: React.KeyboardEvent | React.MouseEvent) => void;
  onClickCallback?: () => void;
  external?: boolean;
}

const ProfileListItem: React.FC<ProfileListItemProps> = ({
  listItemText,
  //   Icon = null,
  color = "grey.900",
  imagePath = null,
  imageAlt = null,
  href = "/",
  Icon = null,
  toggleDrawer,
  mainDrawer,
  onClickCallback,
  external = false,
}) => {
  const handleItemClick = useCallback(
    (event: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
      onClickCallback?.();
      toggleDrawer(false)(event);
      mainDrawer(false)(event);
    },
    [mainDrawer, onClickCallback, toggleDrawer]
  );

  return (
    <ListItem
      sx={{
        pr: "20px",
        px: 2,
        py: 1.5,
        gap: 1,
      }}
      disableGutters
      onClick={handleItemClick}
      component={CustomLink}
      href={href}
      isExternalLink={external}
    >
      <Box pl={1} pr={1} width={40} display="flex" alignItems="center">
        {imagePath && imageAlt && (
          <Image
            src={imagePath}
            width={24}
            height={24}
            alt={imageAlt}
            unoptimized
          />
        )}
        {Icon && <Icon height={18} width={18} strokeWeight="2.5" />}
      </Box>
      <Typography component={"h3"} color={color} variant="h3Medium">
        {listItemText}
      </Typography>
    </ListItem>
  );
};

export default memo(ProfileListItem);
