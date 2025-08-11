'use client';

import React from 'react';
import { Box, Typography } from '@mui/material';
import Image from 'next/image';
import { VideoItem } from '@/types';
import PlayIcon from "@/icons/common/play_icon";

interface Props {
  video: VideoItem;
  onClick: () => void;
}

const VideoThumbnail: React.FC<Props> = ({ video, onClick }) => {
  return (
    <Box
      display="flex"
      alignItems="center"
      gap={2}
      sx={{ cursor: 'pointer', py: 1 }}
      onClick={onClick}
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
