import React, { useState } from "react";
import { NestedMenuItem } from "mui-nested-menu";
import Image from "next/image";
import CustomMenuItem from "./menu-item";
import { IconProps, SubMenuItems } from "../../../types";
import { useTranslation } from "../../../i18n";
import { COLORS } from "../../../theme";
import { CustomLink } from "../../custom-link";
import { DashboardIcon } from "../../../icons";

interface NestedCustomMenuItemProps {
  menuItemText: string;
  imagePath?: string | null;
  imageAlt?: string | null;
  parentMenuOpen: boolean;
  subMenuItems: SubMenuItems[];
  Icon: React.FC<IconProps>;
  onClick?: () => void;
}

const NestedCustomMenuItem: React.FC<NestedCustomMenuItemProps> = ({
  menuItemText,
  imagePath = null,
  imageAlt = null,
  subMenuItems,
  Icon,
  onClick,
}) => {
  const { t } = useTranslation("header");
  const [open, setOpen] = useState<boolean>(false);

  const handleMouseLeave = (event: React.MouseEvent<HTMLElement>) => {
    const targetRect = event.currentTarget.getBoundingClientRect();
    if (
      event.clientX > targetRect.right || // moving right
      event.clientY < targetRect.top || // moving up
      event.clientY > targetRect.bottom // moving down
    ) {
      setOpen(false);
    }
  };

  return (
    <NestedMenuItem
      onClick={() => setOpen(true)}
      onMouseLeave={handleMouseLeave}
      MenuProps={{
        anchorOrigin: { vertical: "top", horizontal: "left" },
        transformOrigin: { vertical: "top", horizontal: "right" },
        sx: {
          height: "100%",
          "& ul": {
            p: 0,
            borderRadius: "0 0 2px 2px !important",
          },
          "& .MuiMenu-paper": {
            borderTop: "none",
            width: 224,
          },
        },
        onMouseLeave: () => setOpen(false),
      }}
      ContainerProps={{
        className: "nested-menu-item",
      }}
      style={{
        color: open ? COLORS.SECONDARY.MAIN : COLORS.GREY["900"],
        padding: "13px",
        height: 44,
        borderBottom: `1px solid ${COLORS.SECONDARY.FORM_INPUTS.FORM_DROPDOWN_BORDER}`,
      }}
      leftIcon={
        Icon ? (
          <Icon
            width={20}
            height={20}
            color={open ? COLORS.SECONDARY.MAIN : COLORS.GREY["900"]}
          />
        ) : (
          <Image
            src={imagePath ?? ""}
            width={24}
            height={24}
            alt={imageAlt ?? menuItemText}
            unoptimized
          />
        )
      }
      rightIcon={
        <DashboardIcon width={20} height={20} className="right-icon-hidden" />
      }
      label={menuItemText}
      parentMenuOpen={open}
    >
      {subMenuItems.map((subMenuItem, index) => (
        <CustomLink
          key={subMenuItem.name}
          href={subMenuItem.dashboardUrl}
          isExternalLink={subMenuItem.isExternalLink}
        >
          <CustomMenuItem
            menuItemText={t(subMenuItem.name.toLowerCase())}
            Icon={subMenuItem.dashboardIcon}
            onClick={onClick}
            showBorder={index !== subMenuItems.length - 1}
          />
        </CustomLink>
      ))}
    </NestedMenuItem>
  );
};

export default NestedCustomMenuItem;
