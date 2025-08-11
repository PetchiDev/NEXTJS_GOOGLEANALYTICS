"use client";

import React from "react";
import {
  Box,
  Grid,
  Typography,
  Skeleton,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import Image from "next/image";
import SubscribeCard from "../components/SubscribeCard";

interface ArticleItem {
  id: string;
  image_url: string;
  title: string;
  category: string;
  slug: string;
  node_type?: string;
}

interface NewsCardSectionProps {
  qln_contents_daily?: {
    qln_contents_daily_top_stories?: {
      queue_label: string;
      items: ArticleItem[];
    };
  };
  loading: boolean;
}

const NewsCardSection: React.FC<NewsCardSectionProps> = ({
  qln_contents_daily,
  loading,
}) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  const topStories =
    qln_contents_daily?.qln_contents_daily_top_stories?.items || [];

  return (
    <Box sx={{ maxWidth: "1170px", mx: "auto", mt: 4, px: 2 }}>
      <Grid container spacing={isMobile ? 2 : 4}>
        <Grid item xs={12} md={9}>
          <Grid
            container
            spacing={isMobile ? 2 : 3}
            direction={isMobile ? "column" : "row"}
          >
            {loading
              ? Array.from({ length: 3 }).map((_, index) => (
                <Grid item xs={12} sm={6} md={4} key={index}>
                  <Box
                    sx={{
                      borderRadius: 2,
                      overflow: "hidden",
                      boxShadow: 1,
                      bgcolor: "#fff",
                      display: "flex",
                      flexDirection: "column",
                      height: "100%",
                    }}
                  >
                    <Skeleton
                      variant="rectangular"
                      sx={{ width: "100%", aspectRatio: "16/9" }}
                    />
                    <Box px={2} py={2}>
                      <Skeleton width="40%" height={20} sx={{ mb: 1 }} />
                      <Skeleton width="100%" height={40} />
                    </Box>
                  </Box>
                </Grid>
              ))
              : topStories.map((item) => {
                const routePath = `/content/daily/${item.slug ?? item.id}`;
                return (
                  <Grid item xs={12} sm={6} md={4} key={item.id}>
                    <Box
                      sx={{
                        borderRadius: 2,
                        overflow: "hidden",
                        bgcolor: "#fff",
                        display: "flex",
                        flexDirection: "column",
                        height: "100%",
                        cursor: "pointer",
                      }}
                    >
                      <a href={routePath} style={{ textDecoration: "none" }}>
                        <Box
                          position="relative"
                          width="100%"
                          sx={{ aspectRatio: "16/9", minHeight: 160 }}
                        >
                          <Image
                            src={item.image_url}
                            alt={item.title}
                            fill
                            style={{
                              objectFit: "cover",
                              borderRadius: "8px",
                            }}
                            sizes="(max-width: 600px) 100vw, 33vw"
                          />
                        </Box>
                        <Box px={1} py={2}>
                          <Typography
                            variant="body2"
                            color="orange"
                            fontWeight={600}
                            gutterBottom
                          >
                            {item.category}
                          </Typography>
                          <Typography
                            variant="subtitle1"
                            fontWeight={600}
                            sx={{
                              display: "-webkit-box",
                              WebkitLineClamp: 3,
                              WebkitBoxOrient: "vertical",
                              overflow: "hidden",
                              textOverflow: "ellipsis",
                              cursor: "pointer",
                              transition: "color 0.3s ease",
                              "&:hover": {
                                color: "#00467F",
                                textDecoration: "underline",
                              },
                            }}
                          >
                            {item.title}
                          </Typography>
                        </Box>
                      </a>
                    </Box>
                  </Grid>
                );
              })}

          </Grid>
        </Grid>

        {!isMobile && (
          <Grid item xs={12} md={3}>
            <SubscribeCard />
          </Grid>
        )}
      </Grid>
    </Box>
  );
};

export default NewsCardSection;
