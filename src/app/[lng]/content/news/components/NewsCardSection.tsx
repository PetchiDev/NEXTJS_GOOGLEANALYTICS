"use client";

import React from "react";
import { Box, Grid, Typography, Skeleton, Card, CardContent } from "@mui/material";
import Image from "next/image";
import SubscribeCard from "./SubscribeCard";
import EmptyState from "@/components/empty-box";

interface ArticleItem {
  id: string;
  image_url: string;
  title: string;
  category: string;
  slug: string;
  node_type?: string;
}

interface NewsCardSectionProps {
  newsData: {
    length: number;
    items: ArticleItem[];
  };
  loading: boolean;
}

const ArticleSkeletonCard: React.FC = () => (
  <Card
    sx={{
      bgcolor: "#fff",
      borderRadius: 2,
      overflow: "hidden",
      boxShadow: 1,
      height: "100%",
      display: "flex",
      flexDirection: "column",
    }}
    aria-label="loading article"
  >
    <Skeleton variant="rectangular" width="100%" sx={{ aspectRatio: "16/9", minHeight: 160 }} />
    <CardContent>
      <Skeleton width="40%" height={18} sx={{ mb: 1 }} />
      <Skeleton width="100%" height={20} sx={{ mb: 1 }} />
      <Skeleton width="80%" height={20} />
    </CardContent>
  </Card>
);

const SubscribeSkeletonCard: React.FC = () => (
  <Card sx={{ p: 2, borderRadius: 2 }} aria-label="loading subscription">
    <Skeleton variant="text" width="50%" height={28} sx={{ mb: 2 }} />
    <Skeleton variant="rectangular" width="100%" height={48} sx={{ mb: 2 }} />
    <Skeleton variant="rectangular" width="100%" height={120} />
  </Card>
);

const NewsCardSection: React.FC<NewsCardSectionProps> = ({ newsData, loading }) => {
  const items = newsData?.items ?? [];
  const topStories = items.slice(1, 4);

  const isEmpty = !loading && (!topStories || topStories.length === 0);

  return (
    <Box
      sx={{
        maxWidth: "1170px",
        mx: "auto",
        mt: 1,
        px: { xs: 2, sm: 3, md: 0 },
        py: { xs: 2, sm: 3, md: 0 },
      }}
    >
      <Grid container spacing={4}>
        {/* Left: Articles */}
        <Grid item xs={12} md={7}>
          {loading ? (
            <Grid container spacing={3}>
              {Array.from({ length: 3 }).map((_, index) => (
                <Grid item xs={12} sm={6} md={4} key={index}>
                  <ArticleSkeletonCard />
                </Grid>
              ))}
            </Grid>
          ) : isEmpty ? (
            <EmptyState title="No more articles available" subtitle="Please check back later." />
          ) : (
            <Grid container spacing={3}>
              {topStories.map((item) => {
                const routePath = `/content/daily/${item.slug ?? item.id}`;
                return (
                  <Grid item xs={12} sm={6} md={4} key={item.id}>
                    <Box
                      sx={{
                        borderRadius: 2,
                        overflow: "hidden",
                        height: "100%",
                        display: "flex",
                        flexDirection: "column",
                        cursor: "pointer",
                        transition: "transform 0.2s ease-in-out",
                        "&:hover": { transform: "translateY(-4px)" },
                      }}
                      component="a"
                      href={routePath}
                    >
                      <Box position="relative" width="100%" sx={{ aspectRatio: "16/9", minHeight: 160 }}>
                        <Image src={item.image_url} alt={item.title} fill style={{ objectFit: "cover" }} />
                      </Box>
                      <Box px={2} py={2}>
                        <Typography variant="body2" color="orange" fontWeight={600} gutterBottom>
                          {item.category || "News"}
                        </Typography>
                        <Typography
                          variant="subtitle1"
                          fontWeight={600}
                          sx={{
                            display: "-webkit-box",
                            WebkitLineClamp: 2,
                            WebkitBoxOrient: "vertical",
                            overflow: "hidden",
                            textOverflow: "ellipsis",
                            transition: "all 0.2s ease-in-out",
                            "&:hover": { textDecoration: "underline" },
                          }}
                        >
                          {item.title}
                        </Typography>
                      </Box>
                    </Box>
                  </Grid>
                );
              })}
            </Grid>
          )}
        </Grid>

        {/* Right: Subscribe */}
        <Grid item xs={12} md={5}>
          {loading ? <SubscribeSkeletonCard /> : <SubscribeCard />}
        </Grid>
      </Grid>
    </Box>
  );
};

export default NewsCardSection;
