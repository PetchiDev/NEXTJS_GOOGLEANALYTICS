'use client';

import React, { useState } from 'react';
import {
  Box,
  IconButton,
  Typography,
  Tooltip,
  Snackbar,
  Alert,
} from '@mui/material';
import ShareIcon from '@mui/icons-material/Share';
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import WhatsAppIcon from '@mui/icons-material/WhatsApp';
import FacebookIcon from '@mui/icons-material/Facebook';
import TwitterIcon from '@mui/icons-material/Twitter';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import {
  trackShareAction,
  trackShareActionQL,
  trackLikeAction,
  trackLikeActionQL,
} from '@/utils/analytics';

interface ArticleInteractionBarProps {
  articleId: string;
  articleTitle: string;
  category: string;
  url?: string;
  initialLiked?: boolean;
}

const ArticleInteractionBar: React.FC<ArticleInteractionBarProps> = ({
  articleId,
  articleTitle,
  category,
  url,
  initialLiked = false,
}) => {
  const [isLiked, setIsLiked] = useState(initialLiked);
  const [showShareMenu, setShowShareMenu] = useState(false);
  const [showSnackbar, setShowSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [snackbarSeverity, setSnackbarSeverity] = useState<'success' | 'error'>('success');

  const currentUrl = url || window.location.href;
  const shareText = `Check out this article: ${articleTitle}`;

  const handleLikeToggle = () => {
    const newLikedState = !isLiked;
    setIsLiked(newLikedState);

    // Track like action to Google Analytics
    trackLikeAction(articleId, articleTitle, newLikedState);
    
    // Track like action to QL analytics server
    trackLikeActionQL(articleId, articleTitle, newLikedState);
  };

  const handleShare = async (platform: string) => {
    let shareUrl = '';
    let success = false;

    try {
      switch (platform) {
        case 'whatsapp':
          shareUrl = `https://wa.me/?text=${encodeURIComponent(shareText + ' ' + currentUrl)}`;
          window.open(shareUrl, '_blank');
          success = true;
          break;

        case 'facebook':
          shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(currentUrl)}&quote=${encodeURIComponent(shareText)}`;
          window.open(shareUrl, '_blank');
          success = true;
          break;

        case 'twitter':
          shareUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(shareText)}&url=${encodeURIComponent(currentUrl)}`;
          window.open(shareUrl, '_blank');
          success = true;
          break;

        case 'copy':
          try {
            await navigator.clipboard.writeText(currentUrl);
            success = true;
            console.log('📋 Copy link successful, triggering analytics...');
          } catch (clipboardError) {
            console.error('❌ Copy link failed:', clipboardError);
            success = false;
          }
          break;

        default:
          success = false;
      }

      if (success) {
        console.log(`📊 Tracking share action for platform: ${platform}`);
        
        // Track share action to Google Analytics
        trackShareAction(platform, articleId, articleTitle);
        console.log('✅ Google Analytics share tracking completed');
        
        // Track share action to QL analytics server
        await trackShareActionQL(platform, articleId, articleTitle);
        console.log('✅ QL Analytics Server share tracking completed');

        setSnackbarMessage(`Successfully shared via ${platform === 'copy' ? 'copying link' : platform}!`);
        setSnackbarSeverity('success');
        setShowSnackbar(true);
      } else {
        console.warn(`⚠️ Share action failed for platform: ${platform}`);
        setSnackbarMessage('Failed to share. Please try again.');
        setSnackbarSeverity('error');
        setShowSnackbar(true);
      }
    } catch (error) {
      console.error('❌ Error in handleShare:', error);
      setSnackbarMessage('Failed to share. Please try again.');
      setSnackbarSeverity('error');
      setShowSnackbar(true);
    }

    setShowShareMenu(false);
  };

  const handleCloseSnackbar = () => {
    setShowSnackbar(false);
  };

  return (
    <>
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          gap: 2,
          py: 2,
          borderTop: '1px solid #E0E0E0',
          borderBottom: '1px solid #E0E0E0',
        }}
      >
        {/* Like Button */}
        <Tooltip title={isLiked ? 'Unlike' : 'Like'}>
          <IconButton
            onClick={handleLikeToggle}
            sx={{
              color: isLiked ? '#FF6B35' : '#666',
              '&:hover': {
                color: isLiked ? '#E55A2B' : '#FF6B35',
              },
            }}
          >
            {isLiked ? <FavoriteIcon /> : <FavoriteBorderIcon />}
          </IconButton>
        </Tooltip>

        {/* Share Button */}
        <Tooltip title="Share">
          <IconButton
            onClick={() => setShowShareMenu(!showShareMenu)}
            sx={{
              color: '#666',
              '&:hover': {
                color: '#FF6B35',
              },
            }}
          >
            <ShareIcon />
          </IconButton>
        </Tooltip>

        {/* Share Menu */}
        {showShareMenu && (
          <Box
            sx={{
              position: 'absolute',
              top: '100%',
              left: 0,
              bgcolor: 'white',
              borderRadius: 2,
              boxShadow: 3,
              p: 2,
              zIndex: 1000,
              display: 'flex',
              gap: 1,
              flexWrap: 'wrap',
              minWidth: 200,
            }}
          >
            <Tooltip title="Share on WhatsApp">
              <IconButton
                onClick={() => handleShare('whatsapp')}
                sx={{
                  color: '#25D366',
                  '&:hover': { bgcolor: '#E8F5E8' },
                }}
              >
                <WhatsAppIcon />
              </IconButton>
            </Tooltip>

            <Tooltip title="Share on Facebook">
              <IconButton
                onClick={() => handleShare('facebook')}
                sx={{
                  color: '#1877F2',
                  '&:hover': { bgcolor: '#E8F2FF' },
                }}
              >
                <FacebookIcon />
              </IconButton>
            </Tooltip>

            <Tooltip title="Share on Twitter">
              <IconButton
                onClick={() => handleShare('twitter')}
                sx={{
                  color: '#1DA1F2',
                  '&:hover': { bgcolor: '#E8F6FF' },
                }}
              >
                <TwitterIcon />
              </IconButton>
            </Tooltip>

            <Tooltip title="Copy Link">
              <IconButton
                onClick={() => handleShare('copy')}
                sx={{
                  color: '#666',
                  '&:hover': { bgcolor: '#F5F5F5' },
                }}
              >
                <ContentCopyIcon />
              </IconButton>
            </Tooltip>
          </Box>
        )}
      </Box>

      {/* Snackbar for feedback */}
      <Snackbar
        open={showSnackbar}
        autoHideDuration={3000}
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert
          onClose={handleCloseSnackbar}
          severity={snackbarSeverity}
          sx={{ width: '100%' }}
        >
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </>
  );
};

export default ArticleInteractionBar;
