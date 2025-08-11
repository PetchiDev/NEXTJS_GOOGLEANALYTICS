"use client";

import React, { useEffect, useState,useRef } from "react";
import { Box, Grid, Skeleton } from "@mui/material";
import PostDetail from "@/components/content/slug-components/PostDetail";
import MoreArticles from "@/components/content/slug-components/MoreArticlesSidebar";
import CommentBox from "@/components/content/slug-components/CommentBox";
import { getPostDetails } from "@/utils/content/content";
import { getDailyPageData } from "@/utils/content/getDailyPageData";
import dynamic from "next/dynamic";
import BaseLayout from "@/layouts/base-layout";
import BannerCarousel from "@/components/banner/BannerCarousel";
import EmptyState from "@/components/empty-box";
import Breadcrumbs from "@/components/breadcrumbs";
import { useParams } from "next/navigation";
import SideBannerCarousel from "@/components/banner/SideBanner";
const Submenu = dynamic(() => import("@/components/header/submenu"));
import { AlertMessage, AlertMessageRef } from '@/components/alert-message';

interface BannerImage {
  id: string;
  image_url: string;
  link?: string;
  duration?: number;
}

interface PostData {
  id: string;
  title: string;
  coverImageUrl: string;
  authorName: string;
  publishedDate: string;
  content: string;
  writerTag: string;
}

interface DailyDataType {
  qln_contents_daily_more_articles?: {
    items: Array<{
      id: string;
      title: string;
      image_url: string;
      slug: string;
    }>;
  };
}

export default function PostPage() {
  const params = useParams();
  const [slug, setSlug] = useState<string | null>(null);
  const alertRef = useRef<AlertMessageRef>(null);
  const [post, setPost] = useState<PostData | null>(null);
  const [dailyData, setDailyData] = useState<DailyDataType | null>(null);
  const [heroBanner, setHeroBanner] = useState<{ images: BannerImage[] } | null>(null);
  const [sideBanner, setSideBanner] = useState<{ images: BannerImage[] } | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (params?.slug) {
      setSlug(decodeURIComponent(params.slug as string));
    }
  }, [params]);

  useEffect(() => {
    if (!slug) return;

    const fetchData = async () => {
      try {
        const postData = await getPostDetails(slug);
        if (!postData) return;

        const {
          dailyData,
          dailyArticalHeroBanner,
          dailyArticalSideBanner,
        } = await getDailyPageData();

        setPost(postData);
        setDailyData(dailyData);
        setHeroBanner(dailyArticalHeroBanner);
        setSideBanner(dailyArticalSideBanner);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [slug]);

  if (!slug || loading) {
    return (
      <BaseLayout>
        <Box maxWidth="1170px" mx="auto" width="100%" py={4}>
          <Skeleton variant="text" width="60%" height={40} sx={{ mb: 2 }} />
          <Skeleton
            variant="rectangular"
            width="100%"
            height={300}
            sx={{ borderRadius: 2 }}
          />
          <Skeleton variant="text" width="40%" height={24} sx={{ mt: 3 }} />
          <Skeleton variant="text" width="80%" height={20} />
          <Skeleton variant="text" width="90%" height={20} />
        </Box>
      </BaseLayout>
    );
  }

  if (!post) {
    return <EmptyState title="Post Not Found" subtitle="Please check the link or try again." />;
  }

  return (
    <BaseLayout>
      <Submenu />
      <Box maxWidth="1170px" mx="auto" width="100%">
        {!heroBanner?.images?.length ? (
          <EmptyState title="No banners available" subtitle="Please check again later." />
        ) : (
          <BannerCarousel
            banners={heroBanner.images.map((img) => ({
              id: img.id,
              image: img.image_url,
              title: "",
              subtitle: "",
              cta: "",
              href: img.link || "#",
              duration: img.duration,
            }))}
            loading={false}
          />
        )}

        <Box sx={{ pt: 4 }}>
          <Breadcrumbs />
        </Box>

        <Box py={2}>
          <Grid container spacing={4} alignItems="stretch">
            <Grid item xs={12} md={8.5}>
              <PostDetail
                title={post.title}
                imageUrl={post.coverImageUrl}
                author={post.authorName}
                publishDate={post.publishedDate}
                content={post.content}
                slug={slug}
                alertRef={alertRef}
                writer_tag={post.writerTag}
              />
              <AlertMessage ref={alertRef} />
              <CommentBox nid={post.id} />
            </Grid>

            <Grid item xs={12} md={3}>
              <MoreArticles
                moreArticles={
                  dailyData?.qln_contents_daily_more_articles?.items || []
                }
                loading={false}
              />

              {!sideBanner?.images?.length ? (
                <EmptyState
                  title="No Side banners available"
                  subtitle="Please check again later."
                />
              ) : (
                <SideBannerCarousel
                  banners={sideBanner.images.map((img) => ({
                    id: img.id,
                    image: img.image_url,
                    title: "",
                    subtitle: "",
                    cta: "",
                    href: img.link || "#",
                    duration: img.duration,
                  }))}
                  loading={false}
                />
              )}
            </Grid>
          </Grid>
        </Box>
      </Box>
    </BaseLayout>
  );
}
