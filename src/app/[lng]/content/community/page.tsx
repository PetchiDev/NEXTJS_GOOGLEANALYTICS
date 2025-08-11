"use client";

import React, { useEffect, useMemo, useState, Suspense } from "react";
import { Box, Skeleton, useMediaQuery } from "@mui/material";
import BaseLayout from "@/layouts/base-layout";
import dynamic from "next/dynamic";

import BannerCarousel from "@/components/banner/BannerCarousel";
import EmptyState from "@/components/empty-box";
import { getAllBanner } from "@/utils/content/content";
import CommunitySearchBar from "./components/CommunitySearchBar";
import FeedbackForm from '@/components/feedback/FeedbackForm';
import { trackPageView } from "@/utils/analytics";


const Submenu = dynamic(() => import("@/components/header/submenu"));
const CommunityMainPage = dynamic(() => import("./components/CommunityMainPage"));

export default function CommunityPage() {
  const [bannerData, setBannerData] = useState<any[]>([]);
  const [bannerLoading, setBannerLoading] = useState(true);
  const isMobile = useMediaQuery("(max-width:600px)");

  //Fetch banners
  useEffect(() => {
    let canceled = false;
    const fetchBanner = async () => {
      try {
        const data = await getAllBanner(5);
        if (!canceled) setBannerData(data || []);
      } catch (error) {
        if (!canceled) console.error("Failed to fetch banner data:", error);
      } finally {
        if (!canceled) setBannerLoading(false);
      }
    };
    fetchBanner();
    return () => {
      canceled = true;
    };
  }, []);

  // Track page view
  useEffect(() => {
    trackPageView("Community Page", "/content/community");
  }, []);

  //Extract specific banner
  const extractBanner = (
    pageData: any[],
    pageName: string,
    bannerTypeName: string
  ) => {
    const matchedPage = pageData?.find((page) =>
      page.pages?.some((p: { bannerPageName: string }) => p.bannerPageName === pageName)
    );

    const matchedBannerType = matchedPage?.pages
      ?.find((p: { bannerPageName: string }) => p.bannerPageName === pageName)
      ?.bannertypes?.find(
        (bt: { bannerTypeName: string }) => bt.bannerTypeName === bannerTypeName
      );

    if (!matchedBannerType || !matchedBannerType.bannerDetails?.length) return null;

    return {
      images: matchedBannerType.bannerDetails.map((detail: any) => ({
        id: detail.id,
        isDesktop: detail.isDesktopAvailability,
        isMobile: detail.isMobileAvailability,
        image_url: detail.desktopImage,
        image_url_mobile: detail.mobileImage,
        duration: detail.duration,
        link: detail.linkUrl,
        alt: detail.altText,
        analytics_slot: detail.analyticsTrackingId,
      })),
    };
  };

  const dailyHeroBanner = useMemo(
    () => extractBanner(bannerData, "Community", "Hero Banner(multi) (1170 x 250)"),
    [bannerData]
  );

  return (
    <BaseLayout>
      <Suspense fallback={<></>}>
        <Submenu />

        {/*Hero Banner Section */}
        <Box sx={{ maxWidth: "1170px", mx: "auto", width: "100%", pt: 4 }}>
          {bannerLoading ? (
            <Skeleton
              variant="rectangular"
              width="100%"
              height={isMobile ? 200 : 300}
              animation="wave"
              sx={{ borderRadius: 2, mb: 4 }}
            />
          ) : !dailyHeroBanner?.images?.length ? (
            <EmptyState title="No banners available" subtitle="Please check again later." />
          ) : (
            <BannerCarousel
              banners={dailyHeroBanner.images.map((img: any) => ({
                id: img.id,
                image: isMobile ? img.image_url_mobile : img.image_url,
                title: "",
                subtitle: "",
                cta: "",
                href: img.link || "#",
                duration: img.duration,
              }))}
              loading={false}
            />
          )}
          <FeedbackForm />
        </Box>

        <main>
          <CommunityMainPage />
        </main>
      </Suspense>
    </BaseLayout>
  );
}
