"use client";

import React, { useEffect, useRef, useState, useCallback } from "react";
import { Box, Skeleton } from "@mui/material";
import Image from "next/image";
import { trackBannerAnalytics, trackBannerInteraction } from "@/utils/analytics";

type SideBannerItem = {
  id: string;
  image: string;
  href: string;
  duration?: number;
  code?: string; // Banner code for analytics
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
  const [viewedBanners, setViewedBanners] = useState<Set<string>>(new Set());
  const activeBanner = banners[current];

  const scheduleNext = useCallback(() => {
    const duration = activeBanner?.duration || 5;
    if (timerRef.current) clearTimeout(timerRef.current);
    timerRef.current = setTimeout(() => {
      setCurrent((prev) => (prev + 1) % banners.length);
    }, duration * 1000);
  }, [activeBanner?.duration, banners.length]);

  // Track banner view when it becomes active
  useEffect(() => {
    if (activeBanner && activeBanner.id) {
      const bannerId = activeBanner.code || `content_news_side_${activeBanner.id}`;
      
      // Track view only once per banner
      if (!viewedBanners.has(bannerId)) {
        setViewedBanners(prev => new Set(prev).add(bannerId));
        
        // Track to Google Analytics
        trackBannerInteraction(bannerId, 'view', 'side_banner');
        
        // Track to QL analytics server
        trackBannerAnalytics(
          bannerId, 
          'view', 
          'side_banner', 
          activeBanner.duration?.toString() || '5'
        );
      }
    }
  }, [current, activeBanner, viewedBanners]);

  useEffect(() => {
    if (banners.length > 1) {
      scheduleNext();
      return () => {
        if (timerRef.current) clearTimeout(timerRef.current);
      };
    }
  }, [current, banners.length, scheduleNext]);

  const handleBannerClick = () => {
    if (activeBanner?.href && activeBanner.id) {
      const bannerId = activeBanner.code || `content_news_side_${activeBanner.id}`;
      
      // Track click to Google Analytics
      trackBannerInteraction(bannerId, 'click', 'side_banner');
      
      // Track click to QL analytics server
      trackBannerAnalytics(
        bannerId, 
        'click', 
        'side_banner', 
        activeBanner.duration?.toString() || '5'
      );
      
      // Open link
      window.open(activeBanner.href, "_blank");
    }
  };

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
      onClick={handleBannerClick}
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
