'use client';

import React from 'react';
import {
  Box,
  Typography,
  Stack,
  Skeleton,
  Grid,
  useTheme,
  useMediaQuery,
} from '@mui/material';
import Image from 'next/image';

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

  return (
    <>
      <Typography
        variant="h6"
        fontWeight="bold"
        mb={2}
        sx={{ borderLeft: '4px solid #00467F', pl: 1 }}
      >
        More Articles
      </Typography>

      {loading ? (
        <Stack spacing={3}>
          {Array.from({ length: 4 }).map((_, i) => (
            <Box key={i} display="flex" alignItems="center" gap={2}>
              <Skeleton
                variant="rectangular"
                width={64}
                height={48}
                sx={{ borderRadius: 2 }}
              />
              <Box flex={1}>
                <Skeleton variant="text" width="100%" height={20} />
                <Skeleton variant="text" width="80%" height={20} />
              </Box>
            </Box>
          ))}
        </Stack>
      ) : (
        <Stack spacing={2} divider={<Box borderBottom="1px solid #E0E0E0" />}>
          {moreArticles.map((article) => (
            <a
              key={article.id}
              href={`/content/daily/${article.slug ?? article.id}`}
              style={{ textDecoration: 'none', color: 'inherit' }}
            >
              <Box display="flex" alignItems="flex-start" gap={2}>
                 <Box
                  position="relative"
                  width={isMobile ? '100%' : 80}
                  height={isMobile ? 160 : 60}
                  borderRadius={2}
                  overflow="hidden"
                  flexShrink={0}
                >
                  <Image
                    src={article.image_url}
                    alt={article.title}
                    fill
                    style={{ objectFit: 'cover', borderRadius: '8px' }}
                    sizes="64px"
                  />
                </Box>

                <Typography
                  variant="body2"
                  fontWeight={500}
                  sx={{
                    lineHeight: 1.4,
                    display: '-webkit-box',
                    WebkitLineClamp: 3,
                    WebkitBoxOrient: 'vertical',
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                    fontSize: '14px',
                    cursor: 'pointer',
                    transition: 'color 0.3s ease',
                    '&:hover': {
                      color: '#00467F',
                      textDecoration: 'underline',
                    },
                  }}
                >
                  {article.title}
                </Typography>
              </Box>
            </a>
          ))}
        </Stack>
      )}
    </>
  );
};

export default MoreArticles;
