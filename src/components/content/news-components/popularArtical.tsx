'use client';

import React from 'react';
import {
  Box,
  Typography,
  Stack,
  Skeleton,
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

const PopularArtical: React.FC<MoreArticlesProps> = ({ moreArticles, loading }) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  return (
    <Box sx={{ width: '100%', overflow: 'hidden' }}>
      <Typography
        variant="h6"
        fontWeight="bold"
        mb={2}
        sx={{ borderLeft: '4px solid #00467F', pl: 1 }}
      >
        Most Popular Articles
      </Typography>

      {loading ? (
        <Stack spacing={3}>
          {Array.from({ length: 4 }).map((_, i) => (
            <Box
              key={i}
              display="flex"
              flexDirection={isMobile ? 'column' : 'row'}
              alignItems={isMobile ? 'flex-start' : 'center'}
              gap="12px"
              width={isMobile ? '100%' : '658px'}
              height={isMobile ? 'auto' : '100px'}
            >
              <Skeleton
                variant="rectangular"
                width={isMobile ? '100%' : 177.51}
                height={100}
                sx={{ borderRadius: '6px' }}
              />
              <Box width={isMobile ? '100%' : 468.49}>
                <Skeleton variant="text" width="100%" height={20} />
                <Skeleton variant="text" width="80%" height={20} />
              </Box>
            </Box>
          ))}
        </Stack>
      ) : (
        <Stack spacing={2}>
          {moreArticles.map((article) => (
            <a
              key={article.id}
              href={`/content/news/${article.slug ?? article.id}`}
              style={{ textDecoration: 'none', color: 'inherit' }}
            >
              <Box
                display="flex"
                flexDirection={isMobile ? 'column' : 'row'}
                alignItems={isMobile ? 'flex-start' : 'center'}
                gap="12px"
                width={isMobile ? '100%' : '658px'}
                height={isMobile ? 'auto' : '100px'}
              >
                <Box
                  position="relative"
                  width={isMobile ? '100%' : 177.51}
                  height={100}
                  borderRadius="6px"
                  overflow="hidden"
                  flexShrink={0}
                >
                  <Image
                    src={article.image_url}
                    alt={article.title}
                    fill
                    style={{
                      objectFit: 'cover',
                      borderRadius: '6px',
                    }}
                    sizes={isMobile ? '100vw' : '177px'}
                  />
                </Box>

                <Box
                  sx={{
                    width: isMobile ? '100%' : '468.49px',
                    maxWidth: '100%', // ensures it never overflows
                  }}
                >
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
              </Box>
            </a>
          ))}
        </Stack>
      )}
    </Box>
  );
};

export default PopularArtical;
