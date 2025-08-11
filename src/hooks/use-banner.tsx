  export const extractBanner = (
    pageData: unknown[],
    pageName: string,
    bannerTypeName: string
  ) => {
    const matchedPage = pageData?.find((page: any) =>
      page.pages?.some((p: { bannerPageName: string }) => p.bannerPageName === pageName)
    );

    const matchedBannerType = (matchedPage as any)?.pages
      ?.find((p: { bannerPageName: string }) => p.bannerPageName === pageName)
      ?.bannertypes?.find(
        (bt: { bannerTypeName: string }) => bt.bannerTypeName === bannerTypeName
      );

    if (!matchedBannerType || !matchedBannerType.bannerDetails?.length) return null;

    return {
      rotation: "sequential" as const,
      dimensions: {
        width_desktop: "1170px",
        height_desktop: "250px",
        width_mobile: "100%",
        height_mobile: "250px",
      },
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
