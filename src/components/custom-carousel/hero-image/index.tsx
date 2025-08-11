"use client";
import React from "react";
import { Box, Stack, Typography, useMediaQuery } from "@mui/material";
import Image from "next/image";
import { CSSProperties, FC, useMemo } from "react";
import { IBanner, BannerImage } from "../../../types";
import { COLORS, theme } from "../../../theme";
import { CustomLink } from "../../custom-link";

interface HeroImageProps {
  banner: IBanner;
  image: BannerImage;
  showTitle?: boolean;
  onClick: (analytics_slot: string) => void;
}

const HeroImage: FC<HeroImageProps> = ({
  banner: { dimensions },
  image,
  showTitle = false,
  onClick,
}) => {
  const isMobile = useMediaQuery(theme.breakpoints.down("lg"));

  const imageStyles: CSSProperties = useMemo(() => {
    if (image.title) {
      return {
        position: "absolute",
        top: 0,
        left: 0,
        transition: "opacity 0.5s ease-in-out",
      };
    }
    return {};
  }, [image.title]);

  const linkProps = useMemo(() => {
    if (image.href) {
      return {
        component: CustomLink,
        href: image.href,
        isExternalLink: true,
        target: "_blank",
        onClick: () => {
          onClick(image.analytics_slot);
        },
      };
    }
    return {
      onClick: () => {
        onClick(image.analytics_slot);
      },
    };
  }, [onClick, image.analytics_slot, image.href]);

  return (
    <Box
      {...linkProps}
      style={{
        position: "relative",
        overflow: "hidden",
        display: "block",
        width: isMobile ? dimensions.width_mobile : dimensions.width_desktop,
        height: isMobile ? dimensions.height_mobile : dimensions.height_desktop,
      }}
    >
      <Image
        src={isMobile ? image.image_mobile : image.image_desktop}
        alt={image.alt}
        fill
        style={imageStyles}
      />
      {Boolean(showTitle && image.title) && (
        <Stack
          ml={"auto"}
          mr={"auto"}
          position={"absolute"}
          top={"37%"}
          left={"0"}
          right={"0"}
          textAlign={"center"}
          width={{ lg: "590px", xs: "355px" }}
          alignItems={"center"}
        >
          <Typography
            sx={{
              typography: { xs: "body1SemiBold", lg: "title2SemiBold" },
            }}
            color={COLORS.WHITE}
            px={2}
            width={"fit-content"}
          >
            {image.title}
          </Typography>
        </Stack>
      )}
    </Box>
  );
};

export default HeroImage;
