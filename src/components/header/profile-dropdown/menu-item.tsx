import { COLORS } from "../../../theme";
import { MenuItem, Stack, Typography } from "@mui/material";
import Image from "next/image";
import React, { FC } from "react";
import { IconProps } from "../../../types";

interface CustomMenuItemProps {
  menuItemText: string;
  color?: string;
  imagePath?: string | null;
  imageAlt?: string | null;
  Icon?: FC<IconProps> | null;
  showBorder?: boolean;
  onClick?: () => void;
}

const CustomMenuItem: React.FC<CustomMenuItemProps> = ({
  menuItemText,
  color = "grey.900",
  imagePath = null,
  imageAlt = null,
  Icon = null,
  showBorder = true,
  onClick,
}) => {
  const menuItemStyle = {
    p: 1.5,
    borderBottom: !showBorder
      ? "none"
      : `1px solid ${COLORS.SECONDARY.FORM_INPUTS.FORM_DROPDOWN_BORDER}`,
    height: 44,
  };

  return (
    <MenuItem sx={menuItemStyle} onClick={onClick}>
      <Stack direction={"row"} columnGap={1}>
        {imagePath && (
          <Image
            src={imagePath}
            width={24}
            height={24}
            alt={imageAlt ?? menuItemText}
            unoptimized
          />
        )}
        {Icon && <Icon height={18} width={18} strokeWeight="2" />}

        <Typography color={color} variant="caption1Medium">
          {menuItemText}
        </Typography>
      </Stack>
    </MenuItem>
  );
};

export default CustomMenuItem;
