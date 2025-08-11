"use client";

import React, { useEffect, useMemo, useState, useCallback } from "react";
import {
  Box,
  Typography,
  Stack,
  IconButton,
  useTheme,
  useMediaQuery,
  Menu,
  MenuItem,
} from "@mui/material";
import PersonIcon from "@mui/icons-material/Person";
import ThumbUpAltOutlinedIcon from "@mui/icons-material/ThumbUpAltOutlined";
import ChatBubbleOutlineIcon from "@mui/icons-material/ChatBubbleOutline";
import ShareOutlinedIcon from "@mui/icons-material/ShareOutlined";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import Image from "next/image";
import Link from "next/link";
import ReportModal from "@/app/[lng]/content/community/components/ReportModal";
import { getCookie } from "@/utils/community/community";
import api from "@/utils/api";
import { toast } from "react-toastify";
import { AlertMessageRef } from "@/components/alert-message";
import FaceBookIcon from "@/icons/socialMedia/facebook";
import WhatsAppIcon from "@/icons/socialMedia/whatsapp";
import TwitterIcon from "@/icons/socialMedia/twitter";
import LinkedInIcon from "@/icons/socialMedia/linkedin";
import CopyIcon from "@/icons/socialMedia/copyIcon";
import InstagramIcon from "@/icons/socialMedia/instagram";
import TikTokIcon from "@/icons/socialMedia/tiktok";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeSanitize from "rehype-sanitize";
import { 
  trackArticleImpression, 
  trackArticleClick, 
  trackLikeAction, 
  trackShareAction, 
  trackReportAction 
} from "@/utils/analytics";

/* ----------------------------- Helpers ----------------------------- */

// Converts mixed HTML/markdown from the API into clean Markdown
function cleanHtmlToMarkdown(input: string): string {
  if (!input) return "";

  let s = input;

  // Replace <br> → line breaks
  s = s.replace(/<br\s*\/?>/gi, "\n\n");

  // Replace &nbsp; → space
  s = s.replace(/&nbsp;/gi, " ");

  // <p>..</p> → paragraph breaks
  s = s.replace(/<\/p>/gi, "\n\n").replace(/<p[^>]*>/gi, "");

  // <a href="url">text</a> → [text](url)
  s = s.replace(
    /<a\s+[^>]*href="([^"]+)"[^>]*>([\s\S]*?)<\/a>/gi,
    function (_match, url, text) {
      const cleanText = stripAllTags(text).trim() || url;
      return "[" + cleanText + "](" + url + ")";
    }
  );

  // Fix invalid image markdown: ![alt](<a href="URL"...>URL</a>) → ![alt](URL)
  s = s.replace(
    /!\[([^\]]*?)\]\(\s*<a\s+[^>]*href="([^"]+)"[^>]*>[\s\S]*?<\/a>\s*\)/gi,
    function (_match, alt, url) {
      return "![" + alt + "](" + url + ")";
    }
  );

  // Remove any remaining HTML tags
  s = s.replace(/<\/?[^>]+>/g, "");

  // Collapse extra blank lines
  s = s.replace(/\n{3,}/g, "\n\n").trim();

  return s;
}

function stripAllTags(s: string): string {
  return s.replace(/<\/?[^>]+>/g, "");
}

/* ----------------------------- Types ----------------------------- */

interface PostCardProps {
  postId: string;
  userName: string;
  title: string;
  category: string;
  description: string;
  imageUrl?: string;
  likeCount: number;
  CommentCount: number;
  slug: string;
  dateCreated: string;
  onLike?: (postId: string) => void;
  alertRef?: React.RefObject<AlertMessageRef | null>;
}

/* ----------------------------- Component ----------------------------- */

const PostCard: React.FC<PostCardProps> = ({
  postId,
  userName,
  title,
  category,
  description,
  imageUrl,
  likeCount,
  CommentCount,
  slug,
  dateCreated,
  onLike,
  alertRef,
}) => {
  const [localDate, setLocalDate] = useState("");
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [reportModalOpen, setReportModalOpen] = useState(false);
  const [showShareIcons, setShowShareIcons] = useState(false);

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const open = Boolean(anchorEl);

  const safeMarkdown = useMemo(() => cleanHtmlToMarkdown(description), [description]);

  useEffect(() => {
    const formatted = new Date(dateCreated).toLocaleString("en-GB", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
      hour: "numeric",
      minute: "numeric",
    });
    setLocalDate(formatted);
    
    // Track article impression
    trackArticleImpression(postId, title, category);
  }, [dateCreated, postId, title, category]);

  const handleMenuClick = useCallback((event: React.MouseEvent<HTMLElement>) => {
    event.stopPropagation();
    setAnchorEl(event.currentTarget);
  }, []);

  const handleClose = useCallback(() => setAnchorEl(null), []);

  const handleReport = useCallback(() => {
    const token = getCookie("qat");
    if (!token) {
      alertRef?.current?.showAlert({
        title: "Warning",
        message: "Please login to report this post.",
        severity: "warning",
      });
      handleClose();
      return;
    }
    handleClose();
    setReportModalOpen(true);
  }, [alertRef, handleClose]);

  const handleConfirmReport = useCallback(async () => {
    const token = getCookie("qat");
    if (!token) {
      alert("You must be logged in to report a post.");
      setReportModalOpen(false);
      return;
    }

    try {
      await api.post(
        "/api/v2/report/createcommunitypost",
        { postId },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      // Track report action
      trackReportAction(postId, title, "community_post");

      alertRef?.current?.showAlert({
        title: "Success",
        message: "Post reported successfully.",
        severity: "success",
      });
    } catch (error: unknown) {
      console.error("Report failed:", error);
      toast.error("Failed to report. Try again later.");
    } finally {
      setReportModalOpen(false);
    }
  }, [alertRef, postId, title]);

  // Safe base URL for share links (avoids SSR window issues)
  const baseUrl = useMemo(
    () => (typeof window !== "undefined" ? window.location.origin : ""),
    []
  );

  const shareUrl = `${baseUrl}/en/content/community/${slug}`;

  const toggleShare = useCallback(() => {
    setShowShareIcons((prev) => !prev);
  }, []);

  const likeClick = useCallback(
    (e: React.MouseEvent) => {
      e.stopPropagation();
      onLike?.(postId);
      
      // Track like action
      trackLikeAction(postId, title, true);
    },
    [onLike, postId, title]
  );

  const openShare = useCallback((href: string, platform: string) => {
    if (typeof window !== "undefined") {
      window.open(href, "_blank", "noopener,noreferrer");
      
      // Track share action
      trackShareAction(platform, postId, title);
    }
  }, [postId, title]);

  const copyShare = useCallback(() => {
    if (typeof navigator !== "undefined" && navigator.clipboard) {
      navigator.clipboard.writeText(shareUrl).then(() => {
        // Track copy link action
        trackShareAction("copy_link", postId, title);
        
        alertRef?.current?.showAlert({
          title: "Success",
          message: "Post copied successfully.",
          severity: "success",
        });
      });
    }
  }, [alertRef, shareUrl, postId, title]);

  return (
    <Box
      sx={{
        position: "relative",
        backgroundColor: "#ffffff",
        border: "1px solid #e5e5e5",
        borderRadius: "8px",
        mb: 2,
        overflow: "hidden",
        cursor: "default",
        boxShadow: "0 1px 3px rgba(0, 0, 0, 0.08)",
        "&:hover": {
          boxShadow: "0 2px 8px rgba(0, 0, 0, 0.12)",
        }
      }}
    >
      <Box sx={{ position: "relative", zIndex: 2 }}>
        {/* Header with Category and Menu */}
        <Stack
          direction="row"
          justifyContent="space-between"
          alignItems="flex-start"
          px={2}
          pt={2}
          pb={1}
        >
          <Link
            href={`/content/community/${slug}`}
            style={{ textDecoration: "none", color: "inherit" }}
          >
            <Typography
              variant="caption"
              sx={{
                backgroundColor: "#FFF4E6",
                color: "#FF8C00",
                fontSize: "11px",
                px: 1.2,
                py: 0.4,
                borderRadius: "12px",
                fontWeight: 600,
                lineHeight: 1,
                display: "inline-block",
                textTransform: "uppercase",
                letterSpacing: "0.5px",
              }}
            >
              {category}
            </Typography>
          </Link>

          <Box>
            <IconButton 
              aria-label="More options" 
              size="small" 
              onClick={handleMenuClick}
              sx={{ 
                color: "#666",
                "&:hover": { backgroundColor: "#f5f5f5" }
              }}
            >
              <MoreVertIcon fontSize="small" />
            </IconButton>
            <Menu
              anchorEl={anchorEl}
              open={open}
              onClose={handleClose}
              anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
              transformOrigin={{ vertical: "top", horizontal: "right" }}
              PaperProps={{ 
                elevation: 2, 
                sx: { 
                  borderRadius: "6px", 
                  mt: 0.5,
                  minWidth: "120px"
                } 
              }}
            >
              <MenuItem onClick={handleReport} sx={{ fontSize: "14px", py: 1 }}>
                Report
              </MenuItem>
            </Menu>
          </Box>
        </Stack>

        {/* Title */}
        <Link
          href={`/content/community/${slug}`}
          style={{ textDecoration: "none", color: "inherit" }}
          onClick={() => trackArticleClick(postId, title, category)}
        >
          <Typography 
            fontWeight={600} 
            fontSize="15px" 
            sx={{ 
              px: 2, 
              pb: 1.5,
              color: "#1a1a1a",
              lineHeight: 1.3,
              "&:hover": {
                color: "#0066cc"
              }
            }}
          >
            {title}
          </Typography>
        </Link>

        {/* Image */}
        {imageUrl && imageUrl.trim() !== "" && (
          <Link 
            href={`/content/community/${slug}`}
            onClick={() => trackArticleClick(postId, title, category)}
          >
            <Box 
              sx={{ 
                width: "100%", 
                position: "relative", 
                mb: 1.5,
                mx: 2,
                maxWidth: "calc(100% - 32px)",
                borderRadius: "4px",
                overflow: "hidden"
              }}
            >
              <Image
                src={imageUrl}
                alt={title}
                width={933}
                height={768}
                sizes="(max-width:600px) 100vw, 800px"
                style={{ 
                  width: "100%", 
                  height: "auto", 
                  display: "block",
                  borderRadius: "4px"
                }}
              />
            </Box>
          </Link>
        )}

        {/* Description */}
        <Box
          sx={{
            px: 2,
            pb: 1.5,
            typography: "body2",
            "& p": { 
              mb: 1, 
              color: "#333", 
              lineHeight: 1.5, 
              fontSize: "14px",
              "&:last-child": { mb: 0 }
            },
            "& strong": { fontWeight: 600 },
            "& a": { 
              color: "#0066cc", 
              textDecoration: "none",
              "&:hover": { textDecoration: "underline" }
            },
            "& img": { 
              maxWidth: "100%", 
              height: "auto", 
              borderRadius: "4px",
              mt: 1
            },
          }}
        >
          <ReactMarkdown
            remarkPlugins={[remarkGfm]}
            rehypePlugins={[rehypeSanitize]}
            components={{
              a: ({ href, children }) => (
                <a href={href ?? ""} target="_blank" rel="noopener noreferrer">
                  {children}
                </a>
              ),
              img: ({ src = "", alt = "" }) => (
                // eslint-disable-next-line @next/next/no-img-element
                <img src={src} alt={alt} loading="lazy" />
              ),
            }}
          >
            {safeMarkdown}
          </ReactMarkdown>
        </Box>

        {/* Bottom Row - User info and actions */}
        <Stack 
          direction="row" 
          justifyContent="space-between" 
          alignItems="center" 
          px={2} 
          py={1.5}
          sx={{ borderTop: "1px solid #f0f0f0" }}
        >
          {/* User Info */}
          <Stack direction="row" alignItems="center" spacing={1}>
            <Box
              sx={{
                width: 28,
                height: 28,
                borderRadius: "50%",
                backgroundColor: "#e0e0e0",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <PersonIcon sx={{ fontSize: 16, color: "#666" }} />
            </Box>
            <Typography 
              fontWeight={500} 
              fontSize="13px" 
              color="#333"
              sx={{ mr: 1 }}
            >
              {userName}
            </Typography>
            <Typography fontSize="12px" color="#888">
              • {localDate}
            </Typography>
          </Stack>

          {/* Action Buttons */}
          <Stack direction="row" spacing={0.5} alignItems="center">
            {/* Like Button */}
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                gap: 0.3,
                backgroundColor: "#f8f9fa",
                borderRadius: "16px",
                px: 1,
                py: 0.3,
                cursor: "pointer",
                "&:hover": { backgroundColor: "#e9ecef" }
              }}
              onClick={likeClick}
            >
              <IconButton 
                size="small" 
                sx={{ 
                  p: 0.3, 
                  color: "#0066cc",
                  "&:hover": { backgroundColor: "transparent" }
                }}
              >
                <ThumbUpAltOutlinedIcon sx={{ fontSize: 14 }} />
              </IconButton>
              <Typography fontSize="12px" fontWeight={500} color="#0066cc">
                {likeCount}
              </Typography>
            </Box>

            {/* Comments Button */}
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                gap: 0.3,
                backgroundColor: "#f8f9fa",
                borderRadius: "16px",
                px: 1,
                py: 0.3,
                cursor: "pointer",
                "&:hover": { backgroundColor: "#e9ecef" }
              }}
            >
              <IconButton 
                size="small" 
                sx={{ 
                  p: 0.3, 
                  color: "#0066cc",
                  "&:hover": { backgroundColor: "transparent" }
                }}
              >
                <ChatBubbleOutlineIcon sx={{ fontSize: 14 }} />
              </IconButton>
              <Typography fontSize="12px" fontWeight={500} color="#0066cc">
                {CommentCount}
              </Typography>
            </Box>

            {/* Share Button */}
            <Box
              sx={{
                backgroundColor: "#f8f9fa",
                borderRadius: "16px",
                p: 0.3,
                cursor: "pointer",
                "&:hover": { backgroundColor: "#e9ecef" }
              }}
              onClick={toggleShare}
            >
              <IconButton 
                size="small" 
                sx={{ 
                  p: 0.3, 
                  color: "#0066cc",
                  "&:hover": { backgroundColor: "transparent" }
                }}
              >
                <ShareOutlinedIcon sx={{ fontSize: 14 }} />
              </IconButton>
            </Box>
          </Stack>
        </Stack>

        {/* Share Icons */}
        {showShareIcons && baseUrl && (
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              gap: 1,
              px: 2,
              pb: 1.5,
              justifyContent: "flex-end"
            }}
          >
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                gap: 1,
                backgroundColor: "#f8f9fa",
                borderRadius: "20px",
                px: 1.5,
                py: 0.8,
                boxShadow: "0 1px 3px rgba(0, 0, 0, 0.1)"
              }}
            >
              {[
                {
                  href: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`,
                  icon: <FaceBookIcon isMobile={isMobile} />,
                  alt: "Facebook",
                  platform: "facebook",
                },
                {
                  href: `https://www.instagram.com/`,
                  icon: <InstagramIcon isMobile={isMobile} />,
                  alt: "Instagram",
                  platform: "instagram",
                },
                {
                  href: `https://api.whatsapp.com/send?text=${encodeURIComponent(shareUrl)}`,
                  icon: <WhatsAppIcon isMobile={isMobile} />,
                  alt: "WhatsApp",
                  platform: "whatsapp",
                },
                {
                  href: `https://www.tiktok.com/`,
                  icon: <TikTokIcon isMobile={isMobile} />,
                  alt: "TikTok",
                  platform: "tiktok",
                },
                {
                  href: `https://twitter.com/intent/tweet?url=${encodeURIComponent(shareUrl)}`,
                  icon: <TwitterIcon isMobile={isMobile} />,
                  alt: "Twitter",
                  platform: "twitter",
                },
                {
                  href: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(shareUrl)}`,
                  icon: <LinkedInIcon isMobile={isMobile} />,
                  alt: "LinkedIn",
                  platform: "linkedin",
                },
              ].map(({ href, icon, alt, platform }) => (
                <IconButton 
                  key={alt} 
                  onClick={() => openShare(href, platform)} 
                  sx={{ 
                    p: 0.3,
                    "&:hover": { backgroundColor: "rgba(0, 0, 0, 0.04)" }
                  }}
                >
                  {icon}
                </IconButton>
              ))}

              <IconButton 
                onClick={copyShare} 
                sx={{ 
                  p: 0.3,
                  "&:hover": { backgroundColor: "rgba(0, 0, 0, 0.04)" }
                }}
              >
                <CopyIcon isMobile={isMobile} />
              </IconButton>
            </Box>
          </Box>
        )}
      </Box>

      {/* Report Modal */}
      <ReportModal
        open={reportModalOpen}
        onClose={() => setReportModalOpen(false)}
        onConfirm={handleConfirmReport}
      />
    </Box>
  );
};

export default PostCard;