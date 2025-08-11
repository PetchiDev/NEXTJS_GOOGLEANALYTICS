"use client";

import React, { useEffect, useRef, useState, useCallback } from "react";
import {
  Box,
  Typography,
  useTheme,
  useMediaQuery,
  Link as MuiLink,
  Skeleton,
} from "@mui/material";
import Image, { StaticImageData } from "next/image";
import { trackBannerAnalytics, trackBannerInteraction } from "@/utils/analytics";

type TakeOverBannerItem = {
  id: string;
  image: string | StaticImageData;
  title: string;
  subtitle: string;
  cta: string;
  href: string;
  duration?: number;
  code?: string; // Banner code for analytics
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
  const [viewedBanners, setViewedBanners] = useState<Set<string>>(new Set());
  const bannerRef = useRef<HTMLDivElement>(null);

  const activeBanner = banners[current];

  const scheduleNext = useCallback(() => {
    const duration = activeBanner?.duration || 5;
    if (timerRef.current) clearTimeout(timerRef.current);
    timerRef.current = setTimeout(() => {
      setCurrent((prev) => (prev + 1) % banners.length);
    }, duration * 1000);
  }, [activeBanner?.duration, banners.length]);

  // Track banner view when it becomes visible on screen (including scroll up/down)
  useEffect(() => {
    if (!bannerRef.current || !activeBanner) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && activeBanner.id) {
            const bannerId = activeBanner.code || `content_news_takeover_${activeBanner.id}`;
            
            // Track view every time banner becomes visible (including scroll up/down)
            // This ensures analytics triggers when user scrolls down and then back up
            setViewedBanners(prev => new Set(prev).add(bannerId));
            
            // Track to Google Analytics
            trackBannerInteraction(bannerId, 'view', 'takeover_banner');
            
            // Track to QL analytics server
            trackBannerAnalytics(
              bannerId, 
              'view', 
              'takeover_banner', 
              activeBanner.duration?.toString() || '5'
            );
          }
        });
      },
      { 
        threshold: 0.3, // 30% of banner must be visible (more sensitive)
        rootMargin: '0px 0px -100px 0px' // Trigger when banner is 100px from bottom
      }
    );

    observer.observe(bannerRef.current);

    return () => {
      observer.disconnect();
    };
  }, [current, activeBanner]);

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
      const bannerId = activeBanner.code || `content_news_takeover_${activeBanner.id}`;
      
      // Track click to Google Analytics
      trackBannerInteraction(bannerId, 'click', 'takeover_banner');
      
      // Track click to QL analytics server
      trackBannerAnalytics(
        bannerId, 
        'click', 
        'takeover_banner', 
        activeBanner.duration?.toString() || '5'
      );
      
      // Open link
      window.open(activeBanner.href, "_blank");
    }
  };

  const showSkeleton = loading || !activeBanner?.image;

  return (
    <Box
      ref={bannerRef}
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
      onClick={handleBannerClick}
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
