'use client';

import React, { useEffect, useRef } from 'react';
import {
  Box,
  Typography,
  Stack,
  Skeleton,
  useTheme,
  useMediaQuery,
} from '@mui/material';
import Image from 'next/image';
import { trackArticleClick, trackMorePostsInteraction, trackArticleImpression, trackArticleImpressionQL, trackMorePostsInteractionQL } from '@/utils/analytics';

interface ContentItem {
  id: string;
  title: string;
  image_url: string;
  slug?: string;
}

interface MoreArticlesProps {
  moreArticles: ContentItem[];
  loading: boolean;
}

const MoreArticles: React.FC<MoreArticlesProps> = ({ moreArticles, loading }) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  // Track article impressions when they become visible
  useEffect(() => {
    if (!moreArticles.length) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && (entry.target as HTMLElement).dataset.articleId) {
            const articleId = (entry.target as HTMLElement).dataset.articleId;
            const article = moreArticles.find(a => a.id === articleId);
            
            if (article) {
              // Track to Google Analytics
              trackArticleImpression(article.id, article.title, "more_articles");
              
              // Track to QL analytics server
              trackArticleImpressionQL(article.id, article.title, "more_articles");
            }
          }
        });
      },
      {
        threshold: 0.3,
        rootMargin: '0px 0px -100px 0px'
      }
    );

    // Observe all article elements
    const articleElements = document.querySelectorAll('[data-article-id]');
    articleElements.forEach(el => observer.observe(el));

    return () => {
      observer.disconnect();
    };
  }, [moreArticles]);

  return (
    <Box
      sx={{
        width: '100%',
        maxWidth: 380,
        mx: { xs: 'auto', md: 0 },
        mt: { xs: 3, md: 0 },
        height: '100%',
      }}
    >
      <Typography
        variant="h6"
        fontWeight="bold"
        sx={{
          borderLeft: '4px solid #00467F',
          pl: 1,
          mb: 2,
          fontSize: { xs: '18px', md: '20px' },
        }}
      >
        More Articles
      </Typography>

      {loading ? (
        <Stack spacing={2}>
          {Array.from({ length: 5 }).map((_, i) => (
            <Box key={i} display="flex" alignItems="center" gap={2}>
              <Box flex={1}>
                <Skeleton variant="text" width="100%" height={20} />
                <Skeleton variant="text" width="80%" height={20} />
              </Box>
              <Skeleton
                variant="rectangular"
                width={80}
                height={60}
                sx={{ borderRadius: 2 }}
              />
            </Box>
          ))}
        </Stack>
      ) : (
        <Stack spacing={1.5}>
          {moreArticles.map((article) => (
            <a
              key={article.id}
              href={`/content/daily/${article.slug ?? article.id}`}
              style={{ textDecoration: 'none', color: 'inherit' }}
              onClick={() => {
                trackArticleClick(article.id, article.title, "more_articles");
                trackMorePostsInteraction("click", "news");
                trackMorePostsInteractionQL("click", "news");
              }}
            >
              <Box
                data-article-id={article.id}
                display="flex"
                flexDirection="row"
                alignItems="flex-start"
                justifyContent="space-between"
                sx={{
                  gap: '12px',
                  borderBottom: '1px solid #E0E0E0',
                  pb: 1,
                }}
              >
                <Typography
                  variant="body2"
                  fontWeight={600}
                  sx={{
                    flex: 1,
                    lineHeight: 1.4,
                    display: '-webkit-box',
                    WebkitLineClamp: 3,
                    WebkitBoxOrient: 'vertical',
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                    cursor: 'pointer',
                    transition: 'color 0.3s ease',
                    fontSize: { xs: '14px', md: '15px' },
                    '&:hover': {
                      color: '#00467F',
                      textDecoration: 'underline',
                    },
                  }}
                >
                  {article.title}
                </Typography>

                <Box
                  position="relative"
                  width={80}
                  height={60}
                  borderRadius={2}
                  overflow="hidden"
                  flexShrink={0}
                >
                  <Image
                    src={article.image_url}
                    alt={article.title}
                    fill
                    style={{ objectFit: 'cover', borderRadius: 8 }}
                  />
                </Box>
              </Box>
            </a>
          ))}
        </Stack>
      )}
    </Box>
  );
};

export default MoreArticles;
