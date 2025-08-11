import { getAllDailyLiving, getAllBanner } from './content';
import { extractBanner } from '@/hooks/use-banner';

export async function getDailyPageData() {
  const [dailyDataRaw, bannerDataRaw] = await Promise.all([
    getAllDailyLiving(),
    getAllBanner(5),
  ]);

  const bannerData = bannerDataRaw || [];

  const dailyArticalHeroBanner = extractBanner(
    bannerData,
    "Article",
    "Hero Banner(multi) (1170 x 250)"
  );

  const dailyArticalSideBanner = extractBanner(
    bannerData,
    "Article",
    "Side Banner (300 x 250)"
  );
  const communityPostHeroBanner = extractBanner(
    bannerData,
    "Community Post",
    "Hero Banner(multi) (1170 x 250)"
  );
  const communityPostSideBanner = extractBanner(
    bannerData,
    "Community Post",
    "Side Banner"
  );
  const communitySideBanner = extractBanner(
    bannerData,
    "Community",
    "Side Banner (300 x 250)"
  );

  const eventHeroBanner = extractBanner(
    bannerData,
    "Events",
    "Hero Banner (multi) (1170 x 250)"
  );
  const eventDetailHeroBanner = extractBanner(
    bannerData,
    "Event Detail",
    "Hero Banner (multi) (1170 x 250)"
  );
  const eventDetailSideBanner = extractBanner(
    bannerData,
    "Event Detail",
    "Side Banner (300 x 250)"
  );

  return {
    dailyData: dailyDataRaw?.qln_contents_daily || {},
    featuredArticles: dailyDataRaw?.qln_contents_daily?.qln_contents_daily_featured_events?.items || [],
    dailyArticalHeroBanner,
    dailyArticalSideBanner,
    communityPostHeroBanner,
    communityPostSideBanner,
    communitySideBanner,
    eventHeroBanner,
    eventDetailHeroBanner,
    eventDetailSideBanner,
  };
}
