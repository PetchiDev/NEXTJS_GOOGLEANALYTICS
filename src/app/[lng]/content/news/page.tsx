'use client';

import React, { useEffect, useMemo, useState, Suspense } from 'react';
import {
    Box,
    Skeleton,
    useMediaQuery,
    Grid,
} from '@mui/material';
import BaseLayout from '@/layouts/base-layout';
import dynamic from 'next/dynamic';
import TakeOverBannerCarousel from '@/components/banner/TakeOverBannerCarousel';
import BannerCarousel from '@/components/banner/BannerCarousel';
import EmptyState from '@/components/empty-box';
import { getAllNewsLiving, getAllBanner, getNewsWatchOnQatarLiving } from '@/utils/content/content';
import { extractBanner } from '@/hooks/use-banner';
import NewsHighlights from './components/FeaturedArticleCard';
import CategoryTabsWithSubTabs from './components/CategoryTabsWithSubTabs';
import NewsCardSection from './components/NewsCardSection';
import DailyTopic from './components/DailyTopic';
import PopularArtical from '@/components/content/news-components/popularArtical';
const Submenu = dynamic(() => import('@/components/header/submenu'));
import SideBannerCarousel from '@/components/banner/SideBanner';
import FeedbackForm from '@/components/feedback/FeedbackForm';
import WatchSection from "@/components/content/daily/WatchSection";
import { trackPageView } from '@/utils/analytics';

export default function Page() {
    const [newsData, setNewsData] = useState<any>({});
    const [loadingNewsLiving, setLoadingNewsLiving] = useState(true);
    const [bannerData, setBannerData] = useState<any[]>([]);
    const [bannerLoading, setBannerLoading] = useState(true);
    const [selectedCategoryId, setSelectedCategoryId] = useState<number | null>(null);
    const [selectedSubCategoryId, setSelectedSubCategoryId] = useState<number | null>(null);
    const isMobile = useMediaQuery('(max-width:600px)');
    const [drupalData, setDrupalData] = useState<{ news: any } | null>(null);

    useEffect(() => {
        const fetchBanner = async () => {
            try {
                const verticalId = 5;
                const data = await getAllBanner(verticalId);
                setBannerData(data || []);
            } catch (error) {
                console.error('Failed to fetch banner data:', error);
            } finally {
                setBannerLoading(false);
            }
        };
        fetchBanner();
    }, []);

    // Track page view
    useEffect(() => {
        trackPageView("News Page", "/content/news");
    }, []);

    const handleCategory = (id: number | null) => setSelectedCategoryId(id ?? null);
    const handleSub = (id: number | null) => setSelectedSubCategoryId(id ?? null);

    useEffect(() => {
        if (!selectedCategoryId || !selectedSubCategoryId) return;

        let canceled = false;
        setLoadingNewsLiving(true);

        const fetchData = async () => {
            try {
                const [newsResp, watchResp] = await Promise.all([
                    getAllNewsLiving({
                        categoryId: selectedCategoryId,
                        subCategoryId: selectedSubCategoryId
                    }),
                    getNewsWatchOnQatarLiving({
                        categoryId: selectedCategoryId,
                        subCategoryId: selectedSubCategoryId
                    }),
                ]);

                if (!canceled) {
                    setNewsData(newsResp?.news || {});
                    setDrupalData(watchResp || {});
                }
            } catch (error) {
                if (!canceled) {
                    console.error('Failed to fetch data:', error);
                }
            } finally {
                if (!canceled) setLoadingNewsLiving(false);
            }
        };

        fetchData();

        return () => {
            canceled = true;
        };
    }, [selectedCategoryId, selectedSubCategoryId]);

    const newsHeroBanner = useMemo(
        () => extractBanner(bannerData, 'News', 'Hero Banner(multi) (1170 x 250)'),
        [bannerData]
    );

    const takeOverBannerOne = useMemo(
        () => extractBanner(bannerData, 'News', 'Take Over Banner (1170 x 250)'),
        [bannerData]
    );
    const sideBanner = useMemo(
        () => extractBanner(bannerData, 'News', 'Side Banner (300 x 250)'),
        [bannerData]
    );

    const WatchOnQatarLiving = drupalData?.news?.watch_on_qatar_living?.items;

    return (
        <BaseLayout>
            <Suspense fallback={<></>}>
                <Submenu />
                <Box sx={{ width: "100%" }}>
                    {bannerLoading ? (
                        <Skeleton
                            variant="rectangular"
                            width="100%"
                            height={isMobile ? 200 : 250}
                            sx={{ borderRadius: 2, mb: 4 }}
                        />
                    ) : !newsHeroBanner?.images?.length ? (
                        <EmptyState title="No banners available" subtitle="Please check again later." />
                    ) : (
                        <Box sx={{ maxWidth: "1170px", mx: "auto", pt: isMobile ? 2 : 0 }}>
                            <BannerCarousel
                                banners={newsHeroBanner.images.map((img: any) => ({
                                    id: img.id,
                                    image: isMobile ? img.image_url_mobile : img.image_url,
                                    title: '',
                                    subtitle: '',
                                    cta: '',
                                    href: img.link || '#',
                                    duration: img.duration,
                                }))}
                                loading={false}
                            />
                        </Box>
                    )}
                    <CategoryTabsWithSubTabs
                        onCategoryChange={handleCategory}
                        onSubCategoryChange={handleSub}
                    />

                    <Box sx={{ backgroundColor: "#fff", py: 2 }}>
                        <NewsHighlights newsData={newsData} loading={loadingNewsLiving} />
                        <NewsCardSection newsData={newsData?.top_story} loading={loadingNewsLiving} />
                    </Box>
                    <Box sx={{ maxWidth: "1170px", mx: "auto" }}>
                        {bannerLoading ? (
                            <Skeleton
                                variant="rectangular"
                                width="100%"
                                height={isMobile ? 200 : 300}
                                sx={{ borderRadius: 2, mb: 2 }}
                            />
                        ) : !takeOverBannerOne?.images?.length ? (
                            <EmptyState title="No takeover banners" subtitle="Please check again soon." />
                        ) : (
                            <TakeOverBannerCarousel
                                banners={takeOverBannerOne.images.map((img: any) => ({
                                    id: img.id,
                                    image: isMobile ? img.image_url_mobile : img.image_url,
                                    title: '',
                                    subtitle: '',
                                    cta: '',
                                    href: img.link || '#',
                                    duration: img.duration,
                                }))}
                                loading={false}
                            />
                        )}
                    </Box>

                                            {[1].map((num) => {
                            const topic = newsData?.[`articles_${num}`];
                            if (!loadingNewsLiving && !topic?.items?.length) {
                                return null;
                            }
                            return (
                                <DailyTopic
                                    key={num}
                                    title={topic?.queue_label || `Everything ${num}`}
                                    items={topic?.items || []}
                                    loading={loadingNewsLiving}
                                />
                            );
                        })}
                        
                    {!loadingNewsLiving && !WatchOnQatarLiving ? (
                        <EmptyState title="No Watch On Qatar Living" subtitle="Try again later." />
                    ) : (
                        <WatchSection WatchOnQatarLiving={WatchOnQatarLiving} />
                    )}
                    <Box sx={{ backgroundColor: "#fff", pt: isMobile ? 2 : 0, px: isMobile ? 2 : 0 }}>
                        <Box sx={{ maxWidth: "1170px", mx: "auto", mt: 6 }}>
                            <Grid container spacing={4} sx={{ mt: 4 }}>
                                <Grid item xs={12} md={8}>
                                    {!loadingNewsLiving && !newsData?.most_popular_articles?.items?.length ? (
                                        <EmptyState title="No Popular Article available" subtitle="Please check back later." />
                                    ) : (
                                        <PopularArtical
                                            moreArticles={newsData?.most_popular_articles?.items || []}
                                            loading={loadingNewsLiving}
                                        />
                                    )}
                                </Grid>
                                <Grid item xs={12} md={3}>
                                    {!sideBanner?.images?.length ? (
                                        <EmptyState title="No Side banners available" subtitle="Please check again later." />
                                    ) : (
                                        <SideBannerCarousel
                                            banners={sideBanner.images.map((img: any) => ({
                                                id: img.id,
                                                image: img.image_url,
                                                title: '',
                                                subtitle: '',
                                                cta: '',
                                                href: img.link || '#',
                                                duration: img.duration,
                                            }))}
                                            loading={false}
                                        />
                                    )}
                                </Grid>
                            </Grid>
                        </Box>
                        {/* {[1, 2, 3].map((num) => {
                            const topic = newsData?.[`articles_${num}`];
                            if (!loadingNewsLiving && !topic?.items?.length) {
                                return null;
                            }
                            return (
                                <DailyTopic
                                    key={num}
                                    title={topic?.queue_label || `Everything ${num}`}
                                    items={topic?.items || []}
                                    loading={loadingNewsLiving}
                                />
                            );
                        })} */}
                    </Box>
                    <FeedbackForm />
                </Box>
            </Suspense>
        </BaseLayout>
    );
}
