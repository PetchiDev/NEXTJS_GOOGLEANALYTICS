import { Box, ListItem, Typography } from "@mui/material";
import Image from "next/image";
import React, { memo, useState } from "react";
import ProfileListItem from "./profile-list-item";
import { SubMenuItems } from "../../../types";

interface NestedProfileListItemProps {
  listItemText: string;
  imagePath?: string | null;
  imageAlt?: string | null;
  subMenuItems: SubMenuItems[];
  /* eslint-disable no-unused-vars */
  toggleDrawer: (
    open: boolean
  ) => (event: React.KeyboardEvent | React.MouseEvent) => void;
  mainDrawer: (
    open: boolean
  ) => (event: React.KeyboardEvent | React.MouseEvent) => void;
}

const NestedProfileListItem: React.FC<NestedProfileListItemProps> = ({
  listItemText,
  imagePath = null,
  imageAlt = null,
  subMenuItems = [],
  toggleDrawer,
  mainDrawer,
}) => {
  const [displaySubMenu, setDisplaySubMenu] = useState<boolean>(false);
  return (
    <>
      <ListItem
        sx={{
          pr: "20px",
          px: 2,
          py: 1.5,
          gap: 1,
          cursor: "pointer",
        }}
        disableGutters
        onClick={() => setDisplaySubMenu(!displaySubMenu)}
      >
        <Box pl={1} pr={1} width={40}>
          {imagePath && imageAlt && (
            <Image
              src={imagePath}
              width={24}
              height={24}
              alt={imageAlt}
              unoptimized
            />
          )}
        </Box>

        <Typography component={"h3"} color="grey.900" variant="h3Medium">
          {listItemText}
        </Typography>
      </ListItem>
      {displaySubMenu &&
        subMenuItems.map((subMenuItem) => (
          <Box key={subMenuItem.name} sx={{ pl: 4.5 }}>
            <ProfileListItem
              listItemText={subMenuItem.name}
              toggleDrawer={toggleDrawer}
              mainDrawer={mainDrawer}
              href={subMenuItem.dashboardUrl}
              Icon={subMenuItem.icon}
              external={subMenuItem.isExternalLink}
            />
          </Box>
        ))}
    </>
  );
};

export default memo(NestedProfileListItem);
