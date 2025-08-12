'use client';

import React, { useEffect, useRef } from 'react';
import { Box, Typography, Skeleton } from '@mui/material';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import MoreArticles from './MoreArticles';
import EmptyState from '@/components/empty-box';
import ChatBubbleOutlineIcon from '@mui/icons-material/ChatBubbleOutline';
import VerifiedIcon from '@mui/icons-material/Verified';
import { trackArticleClick, trackArticleImpression, trackArticleImpressionQL } from '@/utils/analytics';
import ArticleInteractionBar from '@/components/content/news-components/ArticleInteractionBar';

interface ContentItem {
  id: string;
  title: string;
  image_url: string;
  description?: string;
  user_name?: string;
  writer_tag?: string;
  comments_count?: number;
  slug?: string;
}

interface NewsHighlightsProps {
  newsData: {
    top_story?: { queue_label: string; items: ContentItem[] };
    more_articles?: { queue_label: string; items: ContentItem[] };
    articles_1?: { queue_label: string; items: ContentItem[] };
    articles_2?: { queue_label: string; items: ContentItem[] };
    most_popular_articles?: { queue_label: string; items: ContentItem[] };
    watch_on_qatar_living?: { queue_label: string; items: ContentItem[] };
  };
  loading: boolean;
}

const NewsHighlights: React.FC<NewsHighlightsProps> = ({ newsData, loading }) => {
  const router = useRouter();
  const topStory = newsData?.top_story?.items?.[0];
  const moreArticles = newsData?.more_articles?.items ?? [];
  const topStoryRef = useRef<HTMLDivElement>(null);

  const isQatarLiving =
    topStory &&
    (topStory.writer_tag === 'Qatar Living' || topStory.user_name === 'Qatar Living');

  // Track article impression when it becomes visible
  useEffect(() => {
    if (!topStory || !topStoryRef.current) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && topStory.id) {
            // Track to Google Analytics
            trackArticleImpression(topStory.id, topStory.title, "featured");
            
            // Track to QL analytics server
            trackArticleImpressionQL(topStory.id, topStory.title, "featured");
          }
        });
      },
      {
        threshold: 0.3,
        rootMargin: '0px 0px -100px 0px'
      }
    );

    observer.observe(topStoryRef.current);

    return () => {
      observer.disconnect();
    };
  }, [topStory]);

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: { xs: 'column', md: 'row' },
        gap: { xs: 3, md: 5 },
        maxWidth: '1170px',
        width: '100%',
        mx: 'auto',
      }}
    >
      {/* LEFT: Top Story */}
      <Box sx={{ flex: 2, width: '100%', maxWidth: { xs: '100%', md: '100%' } }}>
        {loading ? (
          <Box sx={{ width: '100%', height: { xs: 200, sm: 280, md: 400 } }}>
            <Skeleton variant="rectangular" width="100%" height="100%" sx={{ borderRadius: '8px' }} />
          </Box>
        ) : topStory ? (
          <Box
            ref={topStoryRef}
            onClick={() => {
              trackArticleClick(topStory.id, topStory.title, "featured");
              router.push(`/content/news/${topStory.slug ?? topStory.id}`);
            }}
            sx={{
              width: '100%',
              p: { xs: 1.5, sm: 2 },
              border: '1px solid #F0F0F0',
              borderRadius: '8px',
              display: 'flex',
              flexDirection: 'column',
              cursor: 'pointer',
              transition: 'transform 0.3s ease, box-shadow 0.3s ease',
              '&:hover': { transform: 'translateY(-4px)', boxShadow: 3 },
            }}
          >
            <Box
              sx={{
                position: 'relative',
                width: '100%',
                height: { xs: 200, sm: 280, md: 400 },
                borderRadius: '5.57px',
                overflow: 'hidden',
              }}
            >
              <Image src={topStory.image_url} alt={topStory.title} fill style={{ objectFit: 'cover' }} />
            </Box>

            <Box mt={1}>
              <Typography color="orange" fontSize={{ xs: 13, sm: 14 }} fontWeight="bold" mb={0.5}>
                {newsData?.top_story?.queue_label}
              </Typography>

              <Typography
                variant="h6"
                fontSize={{ xs: 16, sm: 18, md: 20 }}
                fontWeight="bold"
                mb={0.5}
                sx={{
                  cursor: 'pointer',
                  transition: 'color 0.3s ease',
                  '&:hover': { color: '#00467F', textDecoration: 'underline' },
                }}
              >
                {topStory.title}
              </Typography>

              {/* Author/brand + comments row */}
              <Box display="flex" alignItems="center" justifyContent="space-between" mt={0.5}>
                <Box display="flex" alignItems="center" gap={1} flexWrap="wrap">
                  {topStory.user_name && (
                    <Typography variant="body2" fontSize={{ xs: 13, sm: 14 }} color="text.secondary">
                      {topStory.user_name}
                    </Typography>
                  )}

                  {topStory.writer_tag && (
                    <Box display="inline-flex" alignItems="center" gap={0.5}>
                      <Typography variant="body2" color="text.secondary">
                        •
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        {topStory.writer_tag || "Qatar Living"}
                      </Typography>
                      <VerifiedIcon sx={{ fontSize: 16 }} color="primary" />
                    </Box>
                  )}
                </Box>

                <Box display="flex" alignItems="center" gap={0.5}>
                  <ChatBubbleOutlineIcon sx={{ fontSize: 18, color: 'text.secondary' }} />
                  <Typography variant="body2" color="text.secondary">
                    {topStory.comments_count ?? 0}
                  </Typography>
                </Box>
              </Box>

              {/* Article Interaction Bar */}
              <ArticleInteractionBar
                articleId={topStory.id}
                articleTitle={topStory.title}
                category="featured"
                url={`/content/news/${topStory.slug ?? topStory.id}`}
              />
            </Box>
          </Box>
        ) : (
          <EmptyState title="No top story available" subtitle="Please check again later." />
        )}
      </Box>

      {/* RIGHT: More Articles */}
      <Box sx={{ flex: 1, width: '100%' }}>
        {loading ? (
          <Skeleton variant="rectangular" width="100%" height={400} sx={{ borderRadius: '8px' }} />
        ) : moreArticles.length > 0 ? (
          <MoreArticles moreArticles={moreArticles} loading={loading} />
        ) : (
          <EmptyState title="No more articles available" subtitle="Please check again later." />
        )}
      </Box>
    </Box>
  );
};

export default NewsHighlights;
