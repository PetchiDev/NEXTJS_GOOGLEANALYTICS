'use client';

import React from 'react';
import { Box, Typography } from '@mui/material';
import Image from 'next/image';
import { VideoItem } from '@/types';
import PlayIcon from "@/icons/common/play_icon";
import { trackVideoPlay, trackVideoPlayQL } from '@/utils/analytics';

interface Props {
  video: VideoItem;
  onClick: () => void;
}

const VideoThumbnail: React.FC<Props> = ({ video, onClick }) => {
  const handleVideoClick = () => {
    // Track video play to Google Analytics
    trackVideoPlay(video.id, video.title, "news");
    
    // Track video play to QL analytics server
    trackVideoPlayQL(video.id, video.title, "news");
    
    // Call the original onClick
    onClick();
  };

  return (
    <Box
      display="flex"
      alignItems="center"
      gap={2}
      sx={{ cursor: 'pointer', py: 1 }}
      onClick={handleVideoClick}
    >
      {/* Thumbnail Box */}
      <Box
        position="relative"
        width={120}
        height={68}
        borderRadius={1}
        overflow="hidden"
        sx={{ flexShrink: 0 }}
      >
        <Image
          src={video.thumbnail}
          alt={video.title}
          fill
          style={{ objectFit: 'cover' }}
        />
        <Box
          position="absolute"
          top={0}
          left={0}
          width="100%"
          height="100%"
          bgcolor="rgba(0, 0, 0, 0.4)"
          display="flex"
          justifyContent="center"
          alignItems="center"
        >
          <PlayIcon
            color={video.isPlaying ? 'orange' : 'white'}
            style={{ fontSize: 28 }}
          />
        </Box>
      </Box>

      {/* Title */}
      <Typography
        fontWeight={500}
        fontSize={14}
        sx={{
          '&:hover': {
            color: '#00467F',
            textDecoration: 'underline',
          },
        }}
      >
        {video.title}
      </Typography>
    </Box>
  );
};

export default VideoThumbnail;
