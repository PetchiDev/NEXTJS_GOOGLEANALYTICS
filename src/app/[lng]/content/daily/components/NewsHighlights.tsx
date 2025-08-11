"use client";

import React from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { Box, Grid, Typography, Skeleton } from "@mui/material";
import MoreArticles from "@/components/content/daily/MoreArticles";
import EmptyState from "@/components/empty-box";
import LocationIcon from "@/icons/common/location_icon";
import ChatBubbleOutlineIcon from "@mui/icons-material/ChatBubbleOutline";
import VerifiedIcon from "@mui/icons-material/Verified";

interface ContentItem {
  id: string;
  title: string;
  image_url: string;
  description?: string;
  user_name?: string;
  writer_tag?: string;       
  comments_count?: number;   
  event_location?: string;
  event_start?: string;
  event_end?: string;
  slug?: string;
}

interface NewsHighlightsProps {
  dailyData: {
    qln_contents_daily_top_story?: {
      queue_label: string;
      items: ContentItem[];
    };
    qln_contents_daily_event?: {
      queue_label: string;
      items: ContentItem[];
    };
    qln_contents_daily_more_articles?: {
      queue_label: string;
      items: ContentItem[];
    };
  };
  loading: boolean;
}

const NewsHighlights: React.FC<NewsHighlightsProps> = ({ dailyData, loading }) => {
  const router = useRouter();
  const topStory = dailyData?.qln_contents_daily_top_story?.items?.[0];
  const highlightedEvent = dailyData?.qln_contents_daily_event?.items?.[0];
  const moreArticles = dailyData?.qln_contents_daily_more_articles?.items || [];

  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString("en-GB", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });
  };

  return (
    <Box sx={{ maxWidth: "1170px", mx: "auto", py: { xs: 4, md: 2 } }}>
      <Grid container spacing={4} alignItems="stretch">
        <Grid item xs={12} md={9}>
          <Grid container spacing={4} height="100%">
            {loading ? (
              <>
                <Grid item xs={12} md={6}>
                  <Skeleton variant="rectangular" width="100%" height={260} sx={{ borderRadius: 2 }} />
                  <Skeleton variant="text" width="40%" />
                  <Skeleton variant="text" width="80%" />
                  <Skeleton variant="text" width="60%" />
                </Grid>
                <Grid item xs={12} md={6}>
                  <Skeleton variant="rectangular" width="100%" height={260} sx={{ borderRadius: 2 }} />
                  <Skeleton variant="text" width="40%" />
                  <Skeleton variant="text" width="80%" />
                  <Skeleton variant="text" width="60%" />
                </Grid>
              </>
            ) : (
              <>
                {/* Top Story */}
                {topStory ? (
                  <Grid item xs={12} md={6} display="flex">
                    <a
                      href={`/content/daily/${topStory.slug ?? topStory.id}`}
                      style={{ textDecoration: "none", color: "inherit", display: "flex", flex: 1 }}
                    >
                      <Box
                        sx={{
                          border: "1px solid #F0F0F0",
                          borderRadius: "6px",
                          padding: "12px",
                          display: "flex",
                          flexDirection: "column",
                          gap: "12px",
                          width: "100%",
                          height: "100%",
                          transition: "transform 0.3s ease, box-shadow 0.3s ease",
                          cursor: "pointer",
                          "&:hover": {
                            transform: "translateY(-4px)",
                            boxShadow: 3,
                          },
                        }}
                        onClick={() => router.push(`/content/daily/${topStory.slug ?? topStory.id}`)}
                      >
                        {/* Image */}
                        <Box
                          position="relative"
                          width="100%"
                          sx={{
                            aspectRatio: "16/9",
                            minHeight: "200px",
                            borderRadius: "6px",
                            overflow: "hidden",
                          }}
                        >
                          <Image src={topStory.image_url} alt={topStory.title} fill style={{ objectFit: "cover" }} />
                        </Box>

                        {/* Text Content */}
                        <Box>
                          <Typography color="orange" fontWeight="bold">
                            {dailyData?.qln_contents_daily_top_story?.queue_label}
                          </Typography>
                          <Typography
                            variant="h6"
                            fontWeight="bold"
                            sx={{
                              cursor: "pointer",
                              transition: "color 0.3s ease",
                              "&:hover": {
                                color: "#00467F",
                                textDecoration: "underline",
                              },
                            }}
                          >
                            {topStory.title}
                          </Typography>

                          <Box display="flex" alignItems="center" justifyContent="space-between" mt={0.5}>
                            <Box display="flex" alignItems="center" gap={1} flexWrap="wrap">
                              {topStory.user_name && (
                                <Typography variant="body2" color="text.secondary">
                                  {topStory.user_name}
                                </Typography>
                              )}

                              {topStory.writer_tag && (
                                <Box display="inline-flex" alignItems="center" gap={0.5}>
                                  <Typography variant="body2" color="text.secondary">
                                    •
                                  </Typography>
                                  <Typography variant="body2" color="text.secondary">
                                    {topStory.writer_tag}
                                  </Typography>
                                  <VerifiedIcon sx={{ fontSize: 16 }} color="primary" />
                                </Box>
                              )}
                            </Box>

                            <Box display="flex" alignItems="center" gap={0.5}>
                              <ChatBubbleOutlineIcon sx={{ fontSize: 18, color: "text.secondary" }} />
                              <Typography variant="body2" color="text.secondary">
                                {topStory.comments_count ?? 0}
                              </Typography>
                            </Box>
                          </Box>
                        </Box>
                      </Box>
                    </a>
                  </Grid>
                ) : (
                  <Grid item xs={12} md={6}>
                    <EmptyState title="No top story available" subtitle="Please check back later." />
                  </Grid>
                )}

                {/* Highlighted Event */}
                {highlightedEvent ? (
                  <Grid item xs={12} md={6} display="flex">
                    <a
                      href={`/content/events/${highlightedEvent.slug ?? highlightedEvent.id}`}
                      style={{ textDecoration: "none", color: "inherit", display: "flex", flex: 1 }}
                    >
                      <Box
                        sx={{
                          border: "1px solid #F0F0F0",
                          borderRadius: "6px",
                          padding: "12px",
                          display: "flex",
                          flexDirection: "column",
                          gap: "12px",
                          width: "100%",
                          height: "100%",
                          transition: "transform 0.3s ease, box-shadow 0.3s ease",
                          cursor: "pointer",
                          "&:hover": {
                            transform: "translateY(-4px)",
                            boxShadow: 3,
                          },
                        }}
                      >
                        <Box
                          position="relative"
                          width="100%"
                          sx={{ aspectRatio: "16/9", minHeight: "200px", borderRadius: "6px", overflow: "hidden" }}
                        >
                          <Image src={highlightedEvent.image_url} alt={highlightedEvent.title} fill style={{ objectFit: "cover" }} />
                          {highlightedEvent?.event_start && highlightedEvent?.event_end ? (
                            <Box
                              sx={{
                                position: "absolute",
                                bottom: 0,
                                right: 0,
                                backgroundColor: "#0072C6",
                                color: "#FFFFFF",
                                px: 1.5,
                                py: 0.5,
                                borderTopLeftRadius: "6px",
                                fontSize: "12px",
                                fontWeight: 500,
                                whiteSpace: "nowrap",
                                boxShadow: 1,
                                zIndex: 1,
                              }}
                            >
                              {`${formatDate(highlightedEvent.event_start)} to ${formatDate(highlightedEvent.event_end)}`}
                            </Box>
                          ) : null}
                        </Box>

                        <Box>
                          <Typography color="orange" fontWeight="bold">
                            {dailyData?.qln_contents_daily_event?.queue_label}
                          </Typography>
                          <Typography
                            variant="h6"
                            fontWeight="bold"
                            sx={{
                              cursor: "pointer",
                              transition: "color 0.3s ease",
                              "&:hover": {
                                color: "#00467F",
                                textDecoration: "underline",
                              },
                              textTransform: "uppercase",
                            }}
                          >
                            {highlightedEvent.title}
                          </Typography>
                          <Typography variant="body2" color="text.secondary" display="flex" alignItems="center" gap={1}>
                            <LocationIcon />
                            {highlightedEvent.event_location}
                          </Typography>
                        </Box>
                      </Box>
                    </a>
                  </Grid>
                ) : (
                  <Grid item xs={12} md={6}>
                    <EmptyState title="No highlighted event available" subtitle="Please check back later." />
                  </Grid>
                )}
              </>
            )}
          </Grid>
        </Grid>

        {!loading && Object.keys(moreArticles || {}).length === 0 ? (
          <EmptyState title="No more article available" subtitle="Check back soon." />
        ) : (
          <MoreArticles moreArticles={moreArticles} loading={loading} />
        )}
      </Grid>
    </Box>
  );
};

export default NewsHighlights;
