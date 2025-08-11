"use client";

import React, { useEffect, useRef, useState } from "react";
import {
  Box,
  Typography,
  useTheme,
  useMediaQuery,
  Link as MuiLink,
  Skeleton,
} from "@mui/material";
import Image, { StaticImageData } from "next/image";
import { trackBannerInteraction } from "@/utils/analytics";

type TakeOverBannerItem = {
  id: string;
  image: string | StaticImageData;
  title: string;
  subtitle: string;
  cta: string;
  href: string;
  duration?: number;
};

type TakeOverBannerCarouselProps = {
  banners: TakeOverBannerItem[];
  loading?: boolean;
};

const TakeOverBannerCarousel: React.FC<TakeOverBannerCarouselProps> = ({
  banners,
  loading,
}) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const [current, setCurrent] = useState(0);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  const activeBanner = banners[current];

  const scheduleNext = () => {
    const duration = activeBanner?.duration || 5;
    if (timerRef.current) clearTimeout(timerRef.current);
    timerRef.current = setTimeout(() => {
      setCurrent((prev) => (prev + 1) % banners.length);
    }, duration * 1000);
  };

  useEffect(() => {
    if (banners.length > 1) {
      scheduleNext();
      return () => {
        if (timerRef.current) clearTimeout(timerRef.current);
      };
    }
  }, [current, banners.length]);

  // Track banner impression when banner changes
  useEffect(() => {
    if (activeBanner) {
      trackBannerInteraction(activeBanner.id, "view", "takeover_banner");
    }
  }, [activeBanner]);

  const showSkeleton = loading || !activeBanner?.image;

  return (
    <Box
      sx={{
        position: "relative",
        width: "100%",
        height: isMobile ? 200 : 200,
        overflow: "hidden",
        direction: "rtl",
        borderRadius: 2,
        cursor: activeBanner?.href ? "pointer" : "default",
        mt: 6,
      }}
      onClick={() => {
        if (activeBanner?.href) {
          trackBannerInteraction(activeBanner.id, "click", "takeover_banner");
          window.open(activeBanner.href, "_blank");
        }
      }}
    >
      {showSkeleton ? (
        <Skeleton
          variant="rectangular"
          width="100%"
          height="100%"
          animation="wave"
        />
      ) : (
        <Image
          src={activeBanner.image}
          alt={activeBanner.title || "Take Over Banner"}
          fill
          style={{ objectFit: "cover" }}
          sizes="100vw"
        />
      )}

      {!showSkeleton && (
        <Box
          sx={{
            position: "absolute",
            top: 0,
            right: 0,
            bottom: 0,
            left: 0,
            p: 4,
            color: "white",
            display: "flex",
            alignItems: "center",
            justifyContent: "flex-end",
            textAlign: "right",
            background: "rgba(0,0,0,0.3)",
          }}
        >
          <Box maxWidth={isMobile ? "90%" : "40%"}>
            <Typography variant={isMobile ? "h6" : "h4"} fontWeight="bold">
              {activeBanner.title}
            </Typography>
            <Typography mt={1} variant="body1">
              {activeBanner.subtitle}
            </Typography>
            {activeBanner.cta && (
              <MuiLink
                underline="hover"
                color="inherit"
                sx={{ mt: 2, display: "inline-block", fontWeight: 600 }}
              >
                {activeBanner.cta}
              </MuiLink>
            )}
          </Box>
        </Box>
      )}
    </Box>
  );
};

export default TakeOverBannerCarousel;
