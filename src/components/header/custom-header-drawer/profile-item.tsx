import { Box, ListItem, Typography } from "@mui/material";
import Image from "next/image";
import React, { memo } from "react";
import { CustomLink } from "../../custom-link";
import { COLORS } from "../../../theme";

interface ProfileListItemProps {
  listItemText: string;
  Icon?: React.ElementType | null;
  color?: string;
  iconColor?: string;
  imagePath?: string | null;
  imageAlt?: string | null;
  imageWidth?: number;
  imageHeight?: number;
  href?: string;
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
  Icon = null,
  color = "grey.900",
  iconColor = COLORS.SECONDARY.FORM_INPUTS.FORM_ICONS_AND_BREADCRUMBS,
  imagePath = null,
  imageAlt = null,
  imageWidth = 24,
  imageHeight = 24,
  href = "/",
  toggleDrawer,
  mainDrawer,
  onClickCallback,
  external = false,
}) => {
  return (
    <ListItem
      sx={{
        pr: "20px",
        px: 2,
        py: 1.5,
        gap: 1,
      }}
      disableGutters
      onClick={(event) => {
        onClickCallback?.();
        toggleDrawer(false)(event);
        mainDrawer(false)(event);
      }}
      component={CustomLink}
      href={href}
      isExternalLink={external}
    >
      <Box pl={1} pr={1} width={40}>
        {Icon && (
          <Icon
            sx={{
              color: iconColor,
              width: 24,
              height: 24,
            }}
          />
        )}

        {imagePath && imageAlt && (
          <Image
            src={imagePath}
            width={imageWidth}
            height={imageHeight}
            alt={imageAlt}
            unoptimized
          />
        )}
      </Box>

      <Typography component={"h3"} color={color} variant="h3Medium">
        {listItemText}
      </Typography>
    </ListItem>
  );
};

export default memo(ProfileListItem);
