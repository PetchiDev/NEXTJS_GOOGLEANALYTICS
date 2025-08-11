'use client';

import React, { useState, useEffect } from 'react';
import { Box, Typography, Stack, IconButton } from '@mui/material';
import Image from 'next/image';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import ShareIcon from '@mui/icons-material/Share';
import ChatBubbleOutlineIcon from '@mui/icons-material/ChatBubbleOutline';
import FaceBookIcon from '@/icons/socialMedia/facebook';
import InstagramIcon from '@/icons/socialMedia/instagram';
import TikTokIcon from '@/icons/socialMedia/tiktok';
import WhatsAppIcon from '@/icons/socialMedia/whatsapp';
import TwitterIcon from '@/icons/socialMedia/twitter';
import LinkedInIcon from '@/icons/socialMedia/linkedin';
import CopyIcon from '@/icons/socialMedia/copyIcon';
import { toast } from 'react-toastify';
import { AlertMessageRef } from '@/components/alert-message';
import rehypeRaw from "rehype-raw";
import VerifiedIcon from "@mui/icons-material/Verified";

interface PostDetailProps {
  title: string;
  imageUrl: string;
  author: string;
  publishDate: string;
  content: string;
  slug: string;
  alertRef?: React.RefObject<AlertMessageRef | null>;
  writer_tag: string;
}

const PostDetail: React.FC<PostDetailProps> = ({
  title,
  imageUrl,
  author,
  publishDate,
  content,
  alertRef,
  slug,
  writer_tag,
}) => {
  const [showShareIcons, setShowShareIcons] = useState(false);
  const [shareUrl, setShareUrl] = useState('');

  const formatDateTime = (dateString: string): string => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('en-US', {
      timeZoneName: 'short',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: 'numeric',
      minute: '2-digit',
      hour12: true,
    }).format(date);
  };

  useEffect(() => {
    if (typeof window !== 'undefined') {
      setShareUrl(`${window.location.origin}/en/content/events/${slug}`);
    }
  }, [slug]);

  return (
    <Box
      sx={{
        bgcolor: '#fff',
        borderRadius: '12px',
        p: 3,
        boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.05)',
      }}
    >
      <Typography
        variant="h5"
        fontWeight={700}
        fontSize={{ xs: '20px', sm: '24px' }}
        lineHeight={1.4}
        gutterBottom
        sx={{ mb: 2 }}
      >
        {title}
      </Typography>

      <Box
        sx={{
          width: '100%',
          height: { xs: 220, sm: 320, md: 400 },
          position: 'relative',
          borderRadius: '12px',
          overflow: 'hidden',
          mb: 2,
        }}
      >
        <Image
          src={imageUrl}
          alt={title}
          fill
          style={{ objectFit: 'cover' }}
          sizes="(max-width: 768px) 100vw, 768px"
        />
      </Box>

      <Stack
        direction="row"
        justifyContent="space-between"
        alignItems="center"
        sx={{ mb: 2 }}
      >
        <Stack direction="column" spacing={0.5}>
          <Typography variant="body2" fontWeight={500} sx={{ color: '#101828' }}>
            {author}
          </Typography>
          {writer_tag && (
            <Box display="inline-flex" alignItems="center" gap={0.5}>
              <Typography variant="body2" color="text.secondary">
                •
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {writer_tag}
              </Typography>
              <VerifiedIcon sx={{ fontSize: 16 }} color="primary" />
            </Box>
          )}
          <Typography variant="body2" sx={{ color: '#667085' }}>
            {formatDateTime(publishDate)}
          </Typography>
        </Stack>

        <Stack direction="row" spacing={1}>
          <Box sx={{ position: 'relative' }}>
            <Box
              sx={{
                display: 'inline-flex',
                borderRadius: '50%',
                padding: 1,
                backgroundColor: showShareIcons ? '#F97316' : 'transparent',
                '&:hover': {
                  backgroundColor: '#F97316',
                  '& .share-icon': {
                    color: '#FFFFFF',
                  },
                },
              }}
              onClick={() => setShowShareIcons(!showShareIcons)}
            >
              <ShareIcon
                className="share-icon"
                sx={{
                  fontSize: 20,
                  color: showShareIcons ? '#FFFFFF' : '#F97316',
                  transition: 'color 0.2s',
                }}
              />
            </Box>

            {showShareIcons && (
              <Box
                sx={{
                  position: 'absolute',
                  top: '100%',
                  right: 0,
                  mt: 1,
                  display: 'flex',
                  alignItems: 'center',
                  gap: 1.5,
                  px: 2,
                  py: 1.5,
                  backgroundColor: '#fff',
                  borderRadius: '12px',
                  boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.1)',
                  zIndex: 10,
                  '&::before': {
                    content: '""',
                    position: 'absolute',
                    bottom: '100%',
                    right: 12,
                    width: 0,
                    height: 0,
                    borderLeft: '8px solid transparent',
                    borderRight: '8px solid transparent',
                    borderBottom: '8px solid #fff',
                  },
                }}
              >
                {[
                  {
                    href: `https://www.facebook.com/sharer/sharer.php?u=${shareUrl}`,
                    icon: <FaceBookIcon />,
                    alt: 'Facebook',
                  },
                  {
                    href: `https://www.instagram.com/`,
                    icon: <InstagramIcon />,
                    alt: 'Instagram',
                  },
                  {
                    href: `https://www.tiktok.com/`,
                    icon: <TikTokIcon />,
                    alt: 'TikTok',
                  },
                  {
                    href: `https://api.whatsapp.com/send?text=${shareUrl}`,
                    icon: <WhatsAppIcon />,
                    alt: 'WhatsApp',
                  },
                  {
                    href: `https://twitter.com/intent/tweet?url=${shareUrl}&text=${encodeURIComponent(title)}`,
                    icon: <TwitterIcon />,
                    alt: 'Twitter',
                  },
                  {
                    href: `https://www.linkedin.com/sharing/share-offsite/?url=${shareUrl}`,
                    icon: <LinkedInIcon />,
                    alt: 'LinkedIn',
                  },
                ].map(({ href, icon, alt }) => (
                  <IconButton
                    key={alt}
                    onClick={() => {
                      window.open(href, '_blank', 'noopener,noreferrer');
                      setShowShareIcons(false);
                    }}
                    sx={{ p: 0, '&:hover': { transform: 'scale(1.1)' } }}
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
                  sx={{ p: 0 }}
                >
                  <CopyIcon />
                </IconButton>
              </Box>
            )}
          </Box>

          <Stack direction="row" alignItems="center" spacing={0.5}>
            <IconButton>
              <ChatBubbleOutlineIcon sx={{ fontSize: 20, color: '#667085' }} />
            </IconButton>
            <Typography variant="body2" color="text.secondary" fontSize="14px">
              0
            </Typography>
          </Stack>
        </Stack>
      </Stack>

      <Box
        sx={{
          mt: '24px',
          fontSize: '14px',
          fontWeight: 600,
          color: 'var(--color-text-heading)',
          lineHeight: 1.6,
          overflowWrap: 'anywhere',
          wordBreak: 'break-word',
          fontFamily: `'Public Sans', sans-serif`,
          '& p': {
            mb: '2rem',
          },
          '& strong': { fontWeight: 'bold' },
          '& em': { fontStyle: 'italic' },
          '& del': { textDecoration: 'line-through' },
          '& img': {
            maxWidth: '100%',
            height: 'auto',
            display: 'block',
            m: '1rem auto',
            borderRadius: '8px',
          },
          '& a': {
            color: '#00426D !important',
            textDecoration: 'underline !important',
            wordBreak: 'break-word',
          },
          '& iframe': {
            height: 'revert-layer',
            maxWidth: '100%',
            border: 'none',
            display: 'block',
            margin: '0 auto',
          },
          '& pre': {
            whiteSpace: 'pre-wrap',
            wordBreak: 'break-word',
            overflowX: 'auto',
            p: 2,
            borderRadius: 1,
          },
        }}
      >
        <ReactMarkdown remarkPlugins={[remarkGfm]} rehypePlugins={[rehypeRaw]}>
          {content}
        </ReactMarkdown>
      </Box>
    </Box >
  );
};

export default PostDetail;
