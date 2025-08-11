"use client";

import React, { useEffect, useState } from "react";
import { Box, Grid, Skeleton } from "@mui/material";
import PostDetail from "@/components/content/slug-components/PostDetail";
import MoreArticles from "@/components/content/daily/MoreArticles";
import { getPostDetails } from "@/utils/content/content";
import { getDailyPageData } from "@/utils/content/getDailyPageData";
import dynamic from "next/dynamic";
import BaseLayout from "@/layouts/base-layout";
import BannerCarousel from "@/components/banner/BannerCarousel";
import EmptyState from "@/components/empty-box";
import Breadcrumbs from "@/components/breadcrumbs/index";
import { useParams, useRouter } from "next/navigation";

const Submenu = dynamic(() => import("@/components/header/submenu"));

export default function PostPage() {
  const { slug } = useParams() as { slug: string };
  const router = useRouter();

  const [post, setPost] = useState<any>(null);
  const [dailyData, setDailyData] = useState<any>(null);
  const [heroBanner, setHeroBanner] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAll = async () => {
      try {
        const postData = await getPostDetails(slug);
        if (!postData) {
          router.push("/404");
          return;
        }
        setPost(postData);

        const { dailyData, communityPostHeroBanner } = await getDailyPageData();
        setDailyData(dailyData);
        setHeroBanner(communityPostHeroBanner);
      } catch (error) {
        console.error("Error loading post:", error);
        router.push("/404");
      } finally {
        setLoading(false);
      }
    };
    fetchAll();
  }, [slug, router]);

  if (loading) {
    return (
      <BaseLayout>
        <Submenu />
        <Box sx={{ maxWidth: "1170px", mx: "auto", width: "100%" }}>
          <Skeleton variant="rectangular" height={400} />
        </Box>
      </BaseLayout>
    );
  }

  return (
    <BaseLayout>
      <Submenu />
      <Box
        sx={{
          maxWidth: "1170px",
          mx: "auto",
          width: "100%",
        }}
      >
        {/*Banner Carousel */}
        {!heroBanner?.images?.length ? (
          <EmptyState
            title="No banners available"
            subtitle="Please check again later."
          />
        ) : (
          <BannerCarousel
            banners={heroBanner.images.map((img: any) => ({
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

          <Breadcrumbs />

        <Box sx={{ mx: "auto", py: 2 }}>
          <Grid container spacing={4} alignItems="stretch">
            <Grid item xs={12} md={9}>
              <PostDetail
                title={post.title}
                imageUrl={post.coverImageUrl}
                author={post.user_name}
                publishDate={post.published_at}
                content={post.content}
                slug={slug}
                writer_tag={post.writerTag}
              />
            </Grid>

            <MoreArticles
              moreArticles={
                dailyData?.qln_contents_daily_more_articles?.items || []
              }
              loading={false}
            />
          </Grid>
        </Box>
      </Box>
    </BaseLayout>
  );
}
