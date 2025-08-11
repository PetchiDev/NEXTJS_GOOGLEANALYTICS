'use client';

import React from 'react';
import { Box, Skeleton } from '@mui/material';

const SkeletonCard: React.FC = () => {
  return (
    <Box display="flex" gap={2} height="100px" sx={{ borderRadius: 2 }}>
      <Skeleton
        variant="rectangular"
        width={100}
        height={70}
        sx={{ borderRadius: 1, flexShrink: 0 }}
      />
      <Box sx={{ flexGrow: 1 }}>
        <Skeleton variant="text" width="50%" height={18} />
        <Skeleton variant="text" width="100%" height={22} />
        <Skeleton variant="text" width="70%" height={16} />
      </Box>
    </Box>
  );
};

export default SkeletonCard;
