'use client';

import React from 'react';
import { Box } from '@mui/material';
import Image from 'next/image';

interface Props {
  thumbnail: string;
  videoUrl: string;
  title: string;
}

const getYouTubeEmbedUrl = (url: string): string => {
  const regExp = /(?:youtube\.com\/watch\?v=|youtu\.be\/)([^&?/]+)/;
  const match = url.match(regExp);
  return match ? `https://www.youtube.com/embed/${match[1]}` : '';
};

const MainVideoPlayer: React.FC<Props> = ({ thumbnail, videoUrl, title }) => {
  const embedUrl = getYouTubeEmbedUrl(videoUrl);

  return (
    <Box
      position="relative"
      borderRadius={2}
      overflow="hidden"
      width="100%"
      height="100%"
    >
      {embedUrl ? (
        <iframe
          src={embedUrl}
          title={title}
          width="100%"
          height="100%"
          frameBorder="0"
          allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          style={{ borderRadius: 8 }}
        />
      ) : (
        <Image
          src={thumbnail}
          alt={title}
          fill
          style={{ objectFit: 'cover', borderRadius: 8 }}
          sizes="(max-width: 768px) 100vw, 1170px"
        />
      )}
    </Box>
  );
};

export default MainVideoPlayer;
