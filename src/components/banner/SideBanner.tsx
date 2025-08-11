"use client";

import React, { useEffect, useRef, useState } from "react";
import { Box, Skeleton } from "@mui/material";
import Image from "next/image";

type SideBannerItem = {
  id: string;
  image: string;
  href: string;
  duration?: number;
};

type SideBannerCarouselProps = {
  banners: SideBannerItem[];
  loading?: boolean;
};

const SideBannerCarousel: React.FC<SideBannerCarouselProps> = ({
  banners,
  loading,
}) => {
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

  const showSkeleton = loading || !activeBanner?.image;

  return (
    <Box
      sx={{
        width: 340,
        height: 402,
        borderRadius: 1,
        overflow: "hidden",
        mx: "auto",
        mt: 4,
        cursor: activeBanner?.href ? "pointer" : "default",
      }}
      onClick={() => {
        if (activeBanner?.href) {
          window.open(activeBanner.href, "_blank");
        }
      }}
    >
      {showSkeleton ? (
        <Skeleton variant="rectangular" width={340} height={402} />
      ) : (
        <Image
          src={activeBanner.image}
          alt="side-banner"
          width={340}
          height={402}
          style={{ objectFit: "cover" }}
        />
      )}
    </Box>
  );
};

export default SideBannerCarousel;
