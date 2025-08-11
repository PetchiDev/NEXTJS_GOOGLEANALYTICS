'use client';

import React, { useState, useEffect } from 'react';
import { Box, Typography, Stack, Link as MuiLink } from '@mui/material';
import VideoThumbnail from './VideoThumbnail';
import MainVideoPlayer from './MainVideoPlayer';

interface VideoItem {
  nid: string;
  title: string;
  image_url: string;
  video_url: string;
}
interface Props {
  video: {
    id: string;
    title: string;
    thumbnail: string;
    isPlaying: boolean;
  };
  onClick: () => void;
}
interface WatchSectionProps {
  WatchOnQatarLiving?: VideoItem[];
}

const WatchSection: React.FC<WatchSectionProps> = ({ WatchOnQatarLiving = [] }) => {
  const [selectedVideoId, setSelectedVideoId] = useState<string | null>(null);

  const selectedVideo = WatchOnQatarLiving.find((v) => v.nid === selectedVideoId) || WatchOnQatarLiving[0];

  useEffect(() => {
    if (WatchOnQatarLiving.length > 0 && !selectedVideoId) {
      setSelectedVideoId(WatchOnQatarLiving[0].nid);
    }
  }, [WatchOnQatarLiving, selectedVideoId]);

  if (!WatchOnQatarLiving.length) return null;

  return (
    <Box
      display="flex"
      gap="24px"
      mt={6}
      sx={{
        flexWrap: 'wrap',
        justifyContent: 'space-between',
        maxWidth: "1170px",
        mx: "auto",
      }}
    >
      <Box
        sx={{
          width: 380,
          height: 436,
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
        }}
      >
        <Typography
          variant="h6"
          fontWeight="bold"
          mb={2}
          color="#003459"
          sx={{ borderLeft: '4px solid #003459', pl: 1 }}
        >
          Watch on Qatar Living
        </Typography>

        <Stack spacing={2} sx={{ flexGrow: 1, overflowY: 'auto' }}>
          {WatchOnQatarLiving.map((video) => (
            <VideoThumbnail
              key={video.nid}
              video={{
                id: video.nid,
                title: video.title,
                thumbnail: video.image_url,
                isPlaying: video.nid === selectedVideoId,
              }}
              onClick={() => setSelectedVideoId(video.nid)}
            />
          ))}
        </Stack>

        <MuiLink
          href="https://www.youtube.com/@QatarLivingOfficial"
          underline="hover"
          sx={{ mt: 2, alignSelf: 'flex-start', color: '#F39224', fontWeight: 500 }}
        >
          View all videos &rarr;
        </MuiLink>
      </Box>

      <Box
        sx={{
          width: 762,
          height: 440,
          borderRadius: 2,
          border: '1px solid #eee',
          p: 1.5,
          boxSizing: 'border-box',
        }}
      >
        {selectedVideo && (
          <MainVideoPlayer
            thumbnail={selectedVideo.image_url}
            videoUrl={selectedVideo.video_url}
            title={selectedVideo.title}
          />
        )}
      </Box>
    </Box>

  );
};

export default WatchSection;
