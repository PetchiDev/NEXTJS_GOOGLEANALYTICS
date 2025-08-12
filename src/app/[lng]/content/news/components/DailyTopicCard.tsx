'use client';

import React, { useRef, useEffect } from 'react';
import { Box, Typography } from '@mui/material';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { trackArticleImpression, trackArticleImpressionQL } from '@/utils/analytics';

export interface DailyTopicItem {
  id: string;
  title: string;
  image_url: string;
  category?: string;
  slug: string;
  node_type: string;
  event_start?: string;
  event_end?: string;
  event_location?: string;
}

interface Props {
  item: DailyTopicItem;
  isLast?: boolean;
}

const DailyTopicCard: React.FC<Props> = ({ item }) => {
  const isVideo = item.node_type === 'video';
  const videoRef = useRef<HTMLIFrameElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);
  const router = useRouter();

  // Track article impression when it becomes visible
  useEffect(() => {
    if (!cardRef.current) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && item.id) {
            // Track to Google Analytics
            trackArticleImpression(item.id, item.title, item.category || item.node_type);
            
            // Track to QL analytics server
            trackArticleImpressionQL(item.id, item.title, item.category || item.node_type);
          }
        });
      },
      {
        threshold: 0.3,
        rootMargin: '0px 0px -100px 0px'
      }
    );

    observer.observe(cardRef.current);

    return () => {
      observer.disconnect();
    };
  }, [item]);

  const getYouTubeEmbedUrl = (url: string, autoplay = true) => {
    const videoId = url.split('v=')[1]?.split('&')[0];
    return `https://www.youtube.com/embed/${videoId}?autoplay=${autoplay ? 1 : 0}&mute=1&enablejsapi=1&modestbranding=1`;
  };

  const handleNavigate = (e: React.MouseEvent) => {
    e.preventDefault();

    if (item.node_type.includes('post') && item.slug) {
      router.push(`/content/news/${item.slug}`);
    } else if (item.node_type.includes('event') && item.slug) {
      router.push(`/content/events/${item.slug}`);
    }
  };

  return (
    <Box
      ref={cardRef}
      display="flex"
      flexWrap={'wrap'}
      flexDirection={'column'}
      gap="2px"
      width="fit-content"
      sx={{ borderRadius: 2, cursor: 'pointer' }}
      onClick={handleNavigate}
    >
      {/* Left Image/Video */}
      <Box
        position="relative"
        width="177.51px"
        height="100px"
        flexShrink={0}
        borderRadius="6px"
        overflow="hidden"
      >
        {isVideo ? (
          <iframe
            ref={videoRef}
            src={getYouTubeEmbedUrl(item.image_url, false)}
            title="YouTube video"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            style={{
              width: '100%',
              height: '100%',
              border: 0,
              borderRadius: '6px',
            }}
          />
        ) : (
          <Image
            src={item.image_url}
            alt={item.title || 'daily topic image'}
            fill
            style={{ objectFit: 'cover', borderRadius: '6px' }}
          />
        )}
      </Box>

      {/* Right Text Description */}
      <Box
        width="157.15px"
        height="104px"
        display="flex"
        flexDirection="column"
        justifyContent="flex-start"
        gap="4px"
      >
        <Typography variant="caption" color="error.main" fontWeight={500}>
          {item.category || (item.node_type?.charAt(0).toUpperCase() + item.node_type?.slice(1))}
        </Typography>

        <Typography
          variant="body2"
          fontWeight={600}
          sx={{
            display: '-webkit-box',
            WebkitLineClamp: 3,
            WebkitBoxOrient: 'vertical',
            overflow: 'hidden',
            fontSize: '14px',
            lineHeight: '20px',
            transition: 'color 0.3s ease',
            '&:hover': {
              color: '#00467F',
              textDecoration: 'underline',
            },
          }}
        >
          {item.title}
        </Typography>

        {item.node_type === 'event' && item.event_start && (
          <Typography variant="caption" color="primary.main" fontSize="12px">
            {new Date(item.event_start).toLocaleDateString(undefined, {
              day: '2-digit',
              month: 'short',
              year: 'numeric',
            })}{' '}
            to{' '}
            {item.event_end &&
              new Date(item.event_end).toLocaleDateString(undefined, {
                day: '2-digit',
                month: 'short',
                year: 'numeric',
              })}
          </Typography>
        )}
      </Box>
    </Box>
  );
};

export default DailyTopicCard;
