"use client";

import React, { useEffect, useState } from "react";
import { Box, Grid, Skeleton } from "@mui/material";
import MoreArticles from "@/components/content/community/MoreArticles";
import { getCommunityDetails } from "@/utils/content/content";
import { getDailyPageData } from "@/utils/content/getDailyPageData";
import dynamic from "next/dynamic";
import BaseLayout from "@/layouts/base-layout";
import BannerCarousel from "@/components/banner/BannerCarousel";
import EmptyState from "@/components/empty-box";
import Breadcrumbs from "@/components/breadcrumbs/index";
import { useParams, useRouter } from "next/navigation";
import PostCard from "../components/PostCard";
import SideBannerCarousel from "@/components/banner/SideBanner";
import CommentBox from "@/components/content/community/CommentBox";

const Submenu = dynamic(() => import("@/components/header/submenu"));

export default function PostPage() {
  const { slug } = useParams() as { slug: string };
  const router = useRouter();

  const [post, setPost] = useState<any>(null);
  const [dailyData, setDailyData] = useState<any>(null);
  const [heroBanner, setHeroBanner] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [postBanner, setPostBanner] = useState<any>(null);

  useEffect(() => {
    const fetchAll = async () => {
      try {
        const postData = await getCommunityDetails(slug);
        if (!postData) {
          router.push("/404");
          return;
        }
        setPost(postData);

        const { dailyData, communityPostSideBanner, communityPostHeroBanner } =
          await getDailyPageData();
        setDailyData(dailyData);
        setPostBanner(communityPostSideBanner);
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

  const postId: string = post?.id ?? "";

  if (loading) {
    return (
      <BaseLayout>
        <Submenu />
        <Box sx={{ maxWidth: 1170, mx: "auto", width: "100%" }}>
          <Skeleton variant="rectangular" height={400} />
        </Box>
      </BaseLayout>
    );
  }

  return (
    <BaseLayout>
      <Submenu />
      <Box sx={{ maxWidth: 1170, mx: "auto", width: "100%" }}>
        {!heroBanner?.images?.length ? (
          <EmptyState title="No banners available" subtitle="Please check again later." />
        ) : (
          <BannerCarousel
            banners={heroBanner.images.map((img: any) => ({
              id: img.id,
              image: img.image_url || null,
              title: "",
              subtitle: "",
              cta: "",
              href: img.link || "#",
              duration: img.duration,
            }))}
            loading={false}
          />
        )}

        <Box sx={{ mx: "auto", pt: 4 }}>
          <Breadcrumbs />
        </Box>

        <Box sx={{ mx: "auto", py: 2 }}>
          <Grid container spacing={4} alignItems="stretch">
            <Grid item xs={12} md={9}>
              <PostCard
                title={post.title}
                imageUrl={post.imageUrl || null}
                userName={post.userName}
                dateCreated={post.dateCreated}
                description={post.description}
                category={post.category}
                likeCount={post.likeCount}
                CommentCount={post.CommentCount}
                slug={post.slug}
                postId={post.postId}
              />

              <Box
                sx={{
                  mt: 3,
                  mb: 2,
                  p: 2,
                  bgcolor: "#FFF7E5",
                  border: "1px solid #FFE6B3",
                  borderRadius: 2,
                  fontSize: 14,
                  fontWeight: 500,
                  color: "#DC9400",
                }}
              >
                <strong style={{ marginRight: 4 }}>Disclaimer:</strong>
                Community posts and comments reflect the views of users and are not
                published or endorsed by Qatar Living.
              </Box>

              {/* EXACT UI comments */}
              <CommentBox nid={postId} />
            </Grid>

            <Grid item xs={12} md={3} display="flex" flexDirection="column" gap={2}>
              <MoreArticles moreArticles={post?.moreArticles || []} loading={false} />
              <Box sx={{ mt: 4 }}>
                {!postBanner?.images?.length ? (
                  <EmptyState
                    title="No Side banners available"
                    subtitle="Please check again later."
                  />
                ) : (
                  <SideBannerCarousel
                    banners={postBanner.images.map((img: any) => ({
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
              </Box>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </BaseLayout>
  );
}
