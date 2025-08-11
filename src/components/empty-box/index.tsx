'use client';

import React from 'react';
import { Box, Typography } from '@mui/material';
import EmptyIcon from '@/icons/common/empty_icon';

interface EmptyStateProps {
    title: string;
    subtitle?: string;
}

const EmptyState: React.FC<EmptyStateProps> = ({ title, subtitle }) => {
    return (
        <Box
            sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                textAlign: 'center',
                padding: '40px 20px',
                borderRadius: 2,
                maxWidth: 400,
                mx: 'auto',
            }}
        >
            <Box sx={{ width: 60, height: 60, mb: 2 }}>
                <EmptyIcon />
            </Box>
            <Typography variant="subtitle1" fontWeight={500} sx={{ color: 'text.primary', mb: 1 }}>
                {title}
            </Typography>
            {subtitle && (
                <Typography variant="body2" sx={{ color: 'text.secondary', maxWidth: 320 }}>
                    {subtitle}
                </Typography>
            )}
        </Box>
    );
};

export default EmptyState;
