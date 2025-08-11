"use client";

import React, { useEffect, useMemo, useRef, useState } from "react";
import {
  Box,
  Typography,
  TextField,
  Button,
  Stack,
  Avatar,
  IconButton,
  CircularProgress,
  Menu,
  MenuItem,
} from "@mui/material";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { jwtDecode } from "jwt-decode";
import axios from "axios";
import { env } from "next-runtime-env";
import CommentIcon from "@/icons/common/comment_icon";
import { AlertMessage, AlertMessageRef } from "@/components/alert-message";
import ThumbsUpIcon from "@/icons/common/thumbsup";
import CheckedThumbsUp from "@/icons/common/checkedthumbsup";
import PaginationControls from "../pagination-control/PaginationControls";

interface CommentBoxProps {
  nid: string; // postId
}

interface DecodedToken {
  user?: {
    uid?: string;
    name?: string;
    qlnext_user_id?: string;
    email?: string;
    image?: string;
  };
}

interface Comment {
  commentId: string;
  userName: string;
  userImageUrl?: string;
  content: string;
  commentedAt: string;
  updatedAt: string;
  likeCount: number;
  subject: string;
  dislikeCount: number;
  isLiked?: boolean;
}

interface ApiPagedResponse {
  comments: Comment[];
  currentPage: number;
  perPage: number;
  totalComments: number;
}

const PAGE_SIZE = 3;

const CommentBox: React.FC<CommentBoxProps> = ({ nid }) => {
  const alertRef = useRef<AlertMessageRef>(null);

  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [comment, setComment] = useState("");
  const [token, setToken] = useState("");
  const [comments, setComments] = useState<Comment[]>([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [totalCount, setTotalCount] = useState(0);

  //  NEW: menu state for Report
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [selectedCommentId, setSelectedCommentId] = useState<string>("");

  const BASE_URL = env("NEXT_PUBLIC_API_BASE_URL");

  useEffect(() => {
    const qatCookie = document.cookie
      .split(";")
      .find((c) => c.trim().startsWith("qat="));
    if (!qatCookie) return;
    const t = decodeURIComponent(qatCookie.split("=")[1]);
    setToken(t);
    try {
      const decoded = jwtDecode<DecodedToken>(t);
      setIsLoggedIn(Boolean(decoded.user));
    } catch {
      setIsLoggedIn(false);
    }
  }, []);

  const fetchComments = async (p = 1) => {
    if (!nid) return;
    setLoading(true);
    try {
      const res = await axios.get<ApiPagedResponse>(
        `${BASE_URL}/api/v2/community/getCommentsByPostId/${nid}?page=${p}&perPage=${PAGE_SIZE}`,
        {
          headers: {
            ...(token ? { Authorization: `Bearer ${token}` } : {}),
            Accept: "application/json",
          },
        }
      );

      const data = res.data;
      setComments(data?.comments ?? []);
      setTotalCount(data?.totalComments ?? 0);
      setPage(data?.currentPage ?? p);
    } catch (err) {
      console.error("Failed to fetch comments:", err);
      setComments([]);
      setTotalCount(0);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    // Only fetch comments if user is logged in
    if (isLoggedIn && token) {
      fetchComments(1);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [nid, token, isLoggedIn]);

  const totalPages = useMemo(
    () => Math.max(1, Math.ceil((totalCount || 0) / PAGE_SIZE)),
    [totalCount]
  );

  const pageList = useMemo(() => {
    const out: (number | "...")[] = [];
    if (totalPages <= 6) {
      for (let i = 1; i <= totalPages; i++) out.push(i);
      return out;
    }
    out.push(1);
    if (page > 3) out.push("...");
    const start = Math.max(2, page - 1);
    const end = Math.min(totalPages - 1, page + 1);
    for (let i = start; i <= end; i++) out.push(i);
    if (page < totalPages - 2) out.push("...");
    out.push(totalPages);
    return out;
  }, [page, totalPages]);

  const handlePost = async () => {
    if (!comment.trim() || !token) return;
    try {
      await axios.post(
        `${BASE_URL}/api/v2/community/addCommentByCategoryId`,
        {
          communityPostId: nid,
          content: comment.trim(),
          isActive: true,
          updatedAt: new Date().toISOString(),
          commentsLikeCount: 0,
          likedUserIds: [],
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );
      setComment("");
      fetchComments(1);
    } catch (e) {
      console.error("Failed to post comment:", e);
    }
  };

  const handleLikeComment = async (commentId: string) => {
    if (!token) return;
    try {
      await axios.post(
        `${BASE_URL}/api/v2/community/likeCommentByUserId`,
        { commentId, communityPostId: nid },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );
      fetchComments(page);
    } catch (e) {
      console.error("Failed to like comment:", e);
    }
  };

  //  NEW: menu handlers
  const handleMenuOpen = (
    event: React.MouseEvent<HTMLElement>,
    commentId: string
  ) => {
    setAnchorEl(event.currentTarget);
    setSelectedCommentId(commentId);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    setSelectedCommentId("");
  };

  //  NEW: this is the function you asked "enga potanum"
  const handleReportComment = async () => {
    if (!token) {
      alert("Please login to report this comment");
      alertRef.current?.showAlert({
        title: "info",
        message: "Please login to report this comment",
        severity: "warning",
      });
      handleMenuClose();
      return;
    }
    if (!nid || !selectedCommentId) {
      handleMenuClose();
      return;
    }

    try {
      await axios.post(
        `${BASE_URL}/api/v2/report/createcommunitycomments`,
        {
          postId: nid, // from props
          commentId: selectedCommentId, // from menu selection
          reportDate: new Date().toISOString(),
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      alertRef.current?.showAlert({
        title: "Success",
        message: "Report Submitted successfully.",
        severity: "success",
      });
    } catch (e) {
      alertRef.current?.showAlert({
        title: "info",
        message: "This post has been reported already.",
        severity: "warning",
      });
    } finally {
      handleMenuClose();
    }
  };

  const shouldShowPostButton = (): boolean =>
    isLoggedIn && comment.trim().length > 0;

  const getLikeButtonStyles = (isLiked: boolean) => {
    const baseStyles = {
      borderRadius: 999,
      px: 1.25,
      py: 0.5,
      gap: 0.5,
      display: "auto",
      textTransform: "none" as const,
      fontSize: "12px",
      fontWeight: 500,
      height: "32px",
      width: "fit-content",
    };

    if (isLiked) {
      return {
        ...baseStyles,
        backgroundColor: "#1976D2",
        borderColor: "#1976D2",
        color: "#FFFFFF",
        "&:hover": {
          backgroundColor: "#1565C0",
          borderColor: "#1565C0",
        },
      };
    }

    return {
      ...baseStyles,
      borderColor: "#E5E7EB",
      backgroundColor: "transparent",
      color: "#6B7280",
      "&:hover": {
        borderColor: "#D1D5DB",
        backgroundColor: "#F9FAFB",
      },
    };
  };
  const renderLikeIcon = (isLiked: boolean) =>
    isLiked ? <CheckedThumbsUp /> : <ThumbsUpIcon />;

  return (
    <Box py={3}>
      <Typography variant="h6" fontWeight={700} mb={1.5}>
        Comments
      </Typography>

      {/* Show login message if not logged in */}
      {!isLoggedIn || !token ? (
        <Box
          sx={{
            border: "1px solid #EAECF0",
            borderRadius: 2,
            p: 3,
            background: "#fff",
            textAlign: "center",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            gap: 1, // icon & text gap
          }}
        >
          <CommentIcon />

          <Typography variant="body1" color="text.secondary" fontWeight={500}>
            You must be logged in to comment
          </Typography>
        </Box>
      ) : (
        /* Show full comment interface if logged in */
        <Box
          sx={{
            border: "1px solid #EAECF0",
            borderRadius: 2,
            p: 2,
            background: "#fff",
          }}
        >
          <Stack direction="row" spacing={1.5} alignItems="flex-start">
            <TextField
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              placeholder="Add a comment"
              fullWidth
              multiline
              minRows={1}
              maxRows={6}
              sx={{
                "& .MuiOutlinedInput-root": {
                  borderRadius: 2,
                  backgroundColor: "#FAFAFA",
                  "& fieldset": {
                    borderColor: "#E5E7EB",
                    borderWidth: "1px",
                  },
                  "&:hover fieldset": {
                    borderColor: "#F97316",
                  },
                  "&.Mui-focused fieldset": {
                    borderColor: "#F97316",
                    borderWidth: "2px",
                  },
                  "& .MuiInputBase-input": {
                    padding: "12px 14px",
                    fontSize: "14px",
                    lineHeight: "1.4",
                  },
                },
              }}
              InputProps={{
                endAdornment: shouldShowPostButton() ? (
                  <Button
                    onClick={handlePost}
                    variant="contained"
                    disableElevation
                    sx={{
                      borderRadius: 1.5,
                      bgcolor: "#F97316",
                      textTransform: "none",
                      ml: 1,
                      mr: 0.5,
                      minWidth: "auto",
                      width: "15%",
                      px: 2,
                      py: 0.75,
                      fontSize: "14px",
                      fontWeight: 500,
                      lineHeight: 1,
                      height: "32px",
                      alignSelf: "flex-end",
                      mb: 0.5,
                      "&:hover": { bgcolor: "#ea6a0c" },
                      "&:active": { bgcolor: "#dc5a02" },
                    }}
                  >
                    Post
                  </Button>
                ) : null,
              }}
            />
          </Stack>

          {/* list */}
          <Box mt={3}>
            {loading ? (
              <Stack alignItems="center" py={3}>
                <CircularProgress size={24} />
              </Stack>
            ) : comments.length === 0 ? (
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  justifyContent: "center",
                  py: 6,
                  px: 3,
                  textAlign: "center",
                  backgroundColor: "#FAFBFC",
                  borderRadius: 2,
                  border: "1px solid #E5E7EB",
                }}
              >
                <Stack spacing={2} alignItems="center">
                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      width: 48,
                      height: 48,
                      borderRadius: "50%",
                      backgroundColor: "#F3F4F6",
                      color: "#9CA3AF",
                    }}
                  >
                    <CommentIcon />
                  </Box>
                  <Stack spacing={1} alignItems="center">
                    <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>
                      Be the first to comment
                    </Typography>
                    <Typography variant="body2" sx={{ color: "#6B7280" }}>
                      Nobody&apos;s responded yet. Add your thoughts!
                    </Typography>
                  </Stack>
                </Stack>
              </Box>
            ) : (
              comments.map((c) => (
                <Box
                  key={c.commentId}
                  sx={{
                    border: "1px solid #EAECF0",
                    borderRadius: 2,
                    p: 2,
                    mb: 1.5,
                    bgcolor: "#fff",
                  }}
                >
                  <Stack direction="row" alignItems="center" spacing={1}>
                    <Avatar
                      src={c.userImageUrl}
                      sx={{ width: 32, height: 32 }}
                    />
                    <Typography fontWeight={700} fontSize={14}>
                      {c.userName}
                    </Typography>
                    <Typography fontSize={12} color="text.secondary">
                      • {new Date(c.commentedAt).toLocaleString()}
                    </Typography>
                    <Box flex={1} />
                    {/*  UPDATED: open menu with selected commentId */}
                    <IconButton
                      size="small"
                      onClick={(e) => handleMenuOpen(e, c.commentId)}
                    >
                      <MoreVertIcon fontSize="small" />
                    </IconButton>
                  </Stack>

                  <Typography mt={1.25} mb={1} fontSize={14} lineHeight={1.6}>
                    {c.content}
                  </Typography>

                  <Stack>
                    <Button
                      onClick={() => handleLikeComment(c.commentId)}
                      size="small"
                      variant={c.isLiked ? "contained" : "outlined"}
                      style={{
                        backgroundColor: "#F4F4FA",
                      }}
                      sx={getLikeButtonStyles(c.isLiked || false)}
                    >
                      {renderLikeIcon(c.isLiked || false)}
                      <Typography
                        fontSize={12}
                        fontWeight={500}
                        color="inherit"
                      >
                        {c.likeCount}
                      </Typography>
                    </Button>
                  </Stack>
                </Box>
              ))
            )}
          </Box>

          {/* pagination bar */}

          <Box display="flex" justifyContent="center" mt={4}>
            <PaginationControls
              currentPage={page}
              totalPages={totalPages}
              rowsPerPage={2}
              onNumPageChange={(newPage) => {
                fetchComments(newPage);
                setPage(newPage);
              }}
              onPageChange={(newPage) => {
                if (newPage < page) {
                  const next = Math.min(totalPages, page - 1);
                  fetchComments(next);
                  setPage(newPage);
                } else {
                  const next = Math.min(totalPages, page + 1);
                  fetchComments(next);
                  setPage(newPage);
                }
              }}
            />
          </Box>

          {/*  NEW: Report menu anchored to MoreVertIcon */}
          <Menu
            anchorEl={anchorEl}
            open={Boolean(anchorEl)}
            onClose={handleMenuClose}
          >
            <MenuItem onClick={handleReportComment}>Report</MenuItem>
          </Menu>
        </Box>
      )}
      <AlertMessage ref={alertRef} />
    </Box>
  );
};

export default CommentBox;
