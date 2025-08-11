import React from "react";
import { ListItemButton, Typography } from "@mui/material";
import { CustomLink } from "../../custom-link";

interface CustomListItemProps {
  url: string;
  pageKey: string;

  /* eslint-disable no-unused-vars*/
  toggleDrawer: (
    open: boolean
  ) => (event: React.KeyboardEvent | React.MouseEvent) => void;
  /* eslint-disable no-unused-vars*/

  color: string;
  px: number;
  py: number;
  m: number;
  isExternalLink?: boolean;
}

const CustomListItem = ({
  url,
  pageKey,
  toggleDrawer,
  color,
  isExternalLink = false,
  ...rest
}: Readonly<CustomListItemProps>) => {
  return (
    <CustomLink href={url} isExternalLink={isExternalLink}>
      <ListItemButton
        sx={{ ...rest }}
        onClick={(event) => toggleDrawer(false)(event)}
      >
        <Typography variant="bodyMedium" color={color}>
          {pageKey}
        </Typography>
      </ListItemButton>
    </CustomLink>
  );
};

export default CustomListItem;
