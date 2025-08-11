'use client';

import React, { useState, useEffect } from 'react';
import { Box, Typography, Stack, IconButton } from '@mui/material';
import Image from 'next/image';
import RoomIcon from '@mui/icons-material/Room';
import ShareIcon from '@mui/icons-material/Share';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import FaceBookIcon from '@/icons/socialMedia/facebook';
import InstagramIcon from '@/icons/socialMedia/instagram';
import TikTokIcon from '@/icons/socialMedia/tiktok';
import WhatsAppIcon from '@/icons/socialMedia/whatsapp';
import TwitterIcon from '@/icons/socialMedia/twitter';
import LinkedInIcon from '@/icons/socialMedia/linkedin';
import CopyIcon from '@/icons/socialMedia/copyIcon';
import { toast } from 'react-toastify';
import { AlertMessageRef } from '@/components/alert-message';
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';

interface TimeSlot {
  dayOfWeek: number;
  textTime: string;
}

interface EventDetailProps {
  title: string;
  imageUrl: string;
  location: string;
  content: string;
  slug: string;
  dateRange: {
    startDate: string;
    endDate: string;
    timeSlotType: number;
    generalTextTime?: string | null;
    timeSlots?: TimeSlot[];
    startTime?: string | null;
    endTime?: string | null;
  };
  timeRange: TimeSlot[];
  alertRef?: React.RefObject<AlertMessageRef | null>;
  price?: string;
}

const getDayName = (dayOfWeek: number): string => {
  const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  return days[(dayOfWeek + 6) % 7];
};

const EventDetail: React.FC<EventDetailProps> = ({
  title,
  imageUrl,
  location,
  content,
  dateRange,
  timeRange,
  slug,
  alertRef,
  price,
}) => {
  const [showShareIcons, setShowShareIcons] = useState(false);
  const [shareUrl, setShareUrl] = useState('');

  useEffect(() => {
    if (typeof window !== 'undefined') {
      setShareUrl(`${window.location.origin}/en/content/events/${slug}`);
    }
  }, [slug]);

  return (
    <Box
      sx={{
        bgcolor: '#fff',
        borderRadius: 3,
        boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
        p: 2,
        mx: 'auto',
      }}
    >
      <Typography variant="h6" fontWeight={700} mb={2}>
        {title}
      </Typography>

      <Box
        sx={{
          position: 'relative',
          width: '100%',
          height: 360,
          borderRadius: 2,
          overflow: 'hidden',
        }}
      >
        <Image src={imageUrl} alt={title} fill style={{ objectFit: 'cover' }} />
      </Box>

      <Stack
        direction="row"
        alignItems="center"
        justifyContent="space-between"
        px={1}
        py={1.5}
        sx={{ borderBottom: '1px solid #eee' }}
      >
        <Stack direction="row" alignItems="center" spacing={1}>
          <RoomIcon fontSize="small" color="primary" />
          <Typography variant="body2" fontWeight={500} color="primary">
            {location}
          </Typography>
        </Stack>
        <Stack direction="row" spacing={1}>
          <Box sx={{ position: 'relative' }}>
            <IconButton
              onClick={() => setShowShareIcons(!showShareIcons)}
              sx={{
                backgroundColor: '#F97316',
                borderRadius: '50%',
                p: 1,
                '&:hover': {
                  backgroundColor: '#fb923c',
                },
              }}
            >
              <ShareIcon sx={{ color: '#fff', fontSize: 20 }} />
            </IconButton>

            {showShareIcons && (
              <Box
                sx={{
                  position: 'absolute',
                  bottom: 'calc(100% + 10px)',
                  right: 0,
                  display: 'flex',
                  alignItems: 'center',
                  gap: 1,
                  px: 1.5,
                  py: 1,
                  backgroundColor: '#fff',
                  borderRadius: '12px',
                  boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.1)',
                  zIndex: 10,
                  '&::after': {
                    content: '""',
                    position: 'absolute',
                    top: '100%',
                    right: 12,
                    width: 0,
                    height: 0,
                    borderLeft: '8px solid transparent',
                    borderRight: '8px solid transparent',
                    borderTop: '8px solid #fff',
                  },
                }}
              >
                {[
                  { href: `https://www.facebook.com/sharer/sharer.php?u=${shareUrl}`, icon: <FaceBookIcon />, alt: 'Facebook' },
                  { href: `https://www.instagram.com/`, icon: <InstagramIcon />, alt: 'Instagram' },
                  { href: `https://www.tiktok.com/`, icon: <TikTokIcon />, alt: 'TikTok' },
                  { href: `https://api.whatsapp.com/send?text=${shareUrl}`, icon: <WhatsAppIcon />, alt: 'WhatsApp' },
                  { href: `https://twitter.com/intent/tweet?url=${shareUrl}&text=${encodeURIComponent(title)}`, icon: <TwitterIcon />, alt: 'Twitter' },
                  { href: `https://www.linkedin.com/sharing/share-offsite/?url=${shareUrl}`, icon: <LinkedInIcon />, alt: 'LinkedIn' },
                ].map(({ href, icon, alt }) => (
                  <IconButton
                    key={alt}
                    onClick={() => {
                      window.open(href, '_blank', 'noopener,noreferrer');
                      setShowShareIcons(false);
                    }}
                    sx={{ p: 0.5 }}
                    aria-label={`Share on ${alt}`}
                  >
                    {icon}
                  </IconButton>
                ))}
                <IconButton
                  onClick={() => {
                    navigator.clipboard.writeText(shareUrl);
                    alertRef?.current?.showAlert?.({
                      title: 'Success',
                      message: 'Post copied successfully.',
                      severity: 'success',
                    }) ?? toast.success('Post copied successfully.');
                    setShowShareIcons(false);
                  }}
                  sx={{ p: 0.5 }}
                >
                  <CopyIcon />
                </IconButton>
              </Box>
            )}
          </Box>
        </Stack>
      </Stack>

      {/* Description - Markdown */}
      <Box
        sx={{
          typography: 'body1',
          overflowWrap: 'anywhere',
          wordBreak: 'break-word',
          '& p': {
            mb: 2,
            color: '#242424',
            lineHeight: 1.75,
            fontSize: '16px',
          },
          '& strong': { fontWeight: 600 },
          '& em': { fontStyle: 'italic' },
          '& a': {
            color: 'primary.main',
            textDecoration: 'underline',
            wordBreak: 'break-all',
          },
          '& pre': {
            whiteSpace: 'pre-wrap',
            wordBreak: 'break-word',
            overflowX: 'auto',
            background: '#f5f5f5',
            p: 2,
            borderRadius: 1,
          },
          '& img': {
            maxWidth: '100%',
            height: 'auto',
          },
          '& table': {
            width: '100%',
            borderCollapse: 'collapse',
          },
          '& th, & td': {
            border: '1px solid #ddd',
            padding: '8px',
            wordBreak: 'break-word',
          },
        }}
      >
        <ReactMarkdown remarkPlugins={[remarkGfm]}>
          {typeof content === 'string' ? content : ''}
        </ReactMarkdown>
      </Box>

      {/* Date & Time Info */}
      <Box mt={3}>
        <Typography variant="body2" fontSize={14} mb={1}>
          <strong>Date:</strong> {dateRange.startDate} – {dateRange.endDate}
        </Typography>

        {dateRange.generalTextTime ? (
          <Typography variant="body2" fontSize={14} mb={1}>
            <strong>Timings:</strong> {dateRange.generalTextTime}
          </Typography>
        ) : dateRange.timeSlotType === 2 && timeRange?.length > 0 ? (
          <Box mb={1}>
            <Typography variant="body2" fontSize={14} fontWeight={600}>
              Timings:
            </Typography>
            <Stack spacing={0.5} pl={1}>
              {timeRange.map((slot, index) => (
                <Typography variant="body2" fontSize={14} key={index}>
                  {getDayName(slot.dayOfWeek)}: {slot.textTime}
                </Typography>
              ))}
            </Stack>
          </Box>
        ) : dateRange.startTime && dateRange.endTime ? (
          <Typography variant="body2" fontSize={14} mb={1}>
            <strong>Timings:</strong> {dateRange.startTime} – {dateRange.endTime}
          </Typography>
        ) : (
          <Typography variant="body2" fontSize={14} mb={1}>
            <strong>Timings:</strong> Not Available
          </Typography>
        )}

        <Typography variant="body2" fontSize={14} mb={1}>
          <strong>Location:</strong> {location}
        </Typography>

        <Typography variant="body2" fontSize={14}>
          <strong>Access:</strong> {price ?? 'Free'}
          {price && <span style={{ marginLeft: 4 }}>QAR</span>}
        </Typography>
      </Box>
    </Box>
  );
};

export default EventDetail;
