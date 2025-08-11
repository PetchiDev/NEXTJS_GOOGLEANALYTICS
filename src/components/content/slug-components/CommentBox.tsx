'use client';

import React, { useEffect, useMemo, useRef, useState } from 'react';
import {
    Box,
    Typography,
    TextField,
    Button,
    Stack,
    Avatar,
    IconButton,
    CircularProgress,
    Snackbar,
    Alert,
} from '@mui/material';
import ThumbUpAltOutlinedIcon from '@mui/icons-material/ThumbUpAltOutlined';
import { jwtDecode } from 'jwt-decode';
import axios from 'axios';
import { env } from 'next-runtime-env';
import { ReadonlyURLSearchParams, useSearchParams } from 'next/navigation';
import PaginationFooter from '@/components/custom-pagination';
import CommentIcon from '@/icons/common/comment_icon'

interface CommentBoxProps {
    nid?: string;
}

interface DecodedTokenUser {
    uid?: string;
    name?: string;
    qlnext_user_id?: string;
    email?: string;
    image?: string;
}
interface DecodedToken {
    user?: DecodedTokenUser;
}

interface Comment {
    commentId: string;
    userName: string;
    userImageUrl?: string;
    subject: string;
    dateCreated: string;
    likeCount: number;
    dislikeCount: number;
}

interface ApiResponse {
    comments: Comment[];
    totalComments: number;
    [key: string]: unknown;
}

const MAX_COMMENT_LENGTH = 500;
const PAGE_SIZE = 10;

const getPageFromParams = (sp: ReadonlyURLSearchParams): number =>
    Number(sp.get('page') ?? sp.get('curPage') ?? 1) || 1;

const CommentBox: React.FC<CommentBoxProps> = ({ nid = '' }) => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [comment, setComment] = useState('');
    const [uid, setUid] = useState('');
    const [userName, setUserName] = useState('');
    const [token, setToken] = useState('');
    const [comments, setComments] = useState<Comment[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');
    const [totalComments, setTotalComments] = useState(0);

    const BASE_URL = env('NEXT_PUBLIC_API_BASE_URL') || '';
    const searchParams = useSearchParams();
    const currentPage = getPageFromParams(searchParams);

    const containerRef = useRef<HTMLDivElement | null>(null);

    const getCookie = (name: string): string | null => {
        const cookies = document.cookie.split(';');
        const cookie = cookies.find((c) => c.trim().startsWith(`${name}=`));
        return cookie ? decodeURIComponent(cookie.split('=')[1]) : null;
    };

    useEffect(() => {
        const qatCookie = getCookie('qat');
        if (!qatCookie) return;

        try {
            const decoded = jwtDecode<DecodedToken>(qatCookie);
            if (decoded.user) {
                const u = decoded.user;
                const extractedUid = u.qlnext_user_id || u.uid || '';
                const extractedName = u.name || '';
                setToken(qatCookie);
                setUid(extractedUid);
                setUserName(extractedName);
                setIsLoggedIn(true);
            }
        } catch (err) {
            console.error('Invalid JWT token', err);
        }
    }, []);

    const fetchComments = async (): Promise<void> => {
        if (!nid || !token) return;

        setIsLoading(true);
        setError('');
        try {
            const url = `${BASE_URL}/api/v2/news/commentsbyArticleid/${nid}?page=${currentPage}&perPage=${PAGE_SIZE}`;
            const res = await axios.get<ApiResponse>(url, {
                headers: {
                    Authorization: `Bearer ${token}`,
                    Accept: 'application/json',
                },
            });

            setComments(res.data.comments || []);
            setTotalComments(res.data.totalComments ?? 0);
        } catch (err) {
            console.error('Failed to fetch comments:', err);
            setError('Failed to load comments. Please try again later.');
            setComments([]);
        } finally {
            setIsLoading(false);
        }
    };

    const handleLike = async (commentId: string): Promise<void> => {
        try {
            await axios.post(
                `${BASE_URL}/api/v2/news/commentslike/${commentId}`,
                {},
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                        Accept: 'application/json',
                    },
                }
            );
            fetchComments();
        } catch (e) {
            console.error('Failed to like comment:', e);
            setError('Failed to like comment. Please try again.');
        }
    };

    const handlePost = async (): Promise<void> => {
        if (!comment.trim() || comment.length > MAX_COMMENT_LENGTH) return;

        const payload = {
            nid,
            uid,
            userName,
            comment,
            parentCommentId: null,
            commentedAt: new Date().toISOString(),
            updatedAt: new Date().toISOString(),
            isActive: true,
        };

        try {
            await axios.post(`${BASE_URL}/api/v2/news/comments`, payload, {
                headers: {
                    Authorization: `Bearer ${token}`,
                    'Content-Type': 'application/json',
                    Accept: 'application/json',
                },
            });

            setComment('');
            fetchComments();
        } catch (e) {
            console.error('Failed to post comment:', e);
            setError('Failed to post comment. Please try again.');
        }
    };

    const paginatedComments = useMemo(() => comments, [comments]);
    const totalPages = Math.ceil((totalComments || 0) / PAGE_SIZE);
    const showPostButton =
        comment.trim().length > 0 && comment.length <= MAX_COMMENT_LENGTH;

    const handleCloseError = () => setError('');

    return (
        <Box py={4} ref={containerRef} id="comments-root">
            <Typography variant="h6" fontWeight={600} mb={2}>
                Comments
            </Typography>

            <Box
                sx={{
                    backgroundColor: '#fff',
                    borderRadius: '12px',
                    border: '1px solid #EAECF0',
                    padding: '24px',
                }}
            >
                {isLoggedIn ? (
                    <>
                        <Box sx={{ position: 'relative', width: '100%', maxWidth: 750 }}>
                            <TextField
                                value={comment}
                                onChange={(e) => setComment(e.target.value)}
                                placeholder={`Add a comment (max ${MAX_COMMENT_LENGTH} chars)`}
                                fullWidth
                                variant="outlined"
                                size="small"
                                sx={{
                                    '& .MuiOutlinedInput-root': {
                                        height: 50,
                                        borderRadius: '6px',
                                        alignItems: 'center',
                                        '& fieldset': { borderColor: '#F97316', borderWidth: '1px' },
                                        '&:hover fieldset': { borderColor: '#F97316' },
                                        '&.Mui-focused fieldset': { borderColor: '#F97316' },
                                    },
                                    '& .MuiOutlinedInput-input': {
                                        padding: '17px 14px',
                                    },
                                    ...(comment.trim()
                                        ? {
                                            '& .MuiOutlinedInput-input': {
                                                paddingRight: '110px',
                                            },
                                        }
                                        : {}),
                                }}
                                inputProps={{ maxLength: MAX_COMMENT_LENGTH }}
                            />

                            {comment.trim() && comment.length <= MAX_COMMENT_LENGTH && (
                                <Button
                                    onClick={handlePost}
                                    variant="contained"
                                    sx={{
                                        position: 'absolute',
                                        right: 10,
                                        top: '50%',
                                        transform: 'translateY(-50%)',
                                        height: 32,
                                        width: 24,
                                        borderRadius: '8px',
                                        backgroundColor: '#F97316',
                                        textTransform: 'none',
                                        fontWeight: 500,
                                        lineHeight: 1,
                                        boxShadow: 'none',
                                        paddingInline: 2,
                                        display: 'flex',
                                        justifyContent: 'space-between',
                                        '&:hover': { backgroundColor: '#ea6a0c', boxShadow: 'none' },
                                    }}
                                >
                                    Post
                                </Button>
                            )}
                        </Box>

                        {/* List */}
                        <Box mt={4}>
                            {isLoading ? (
                                <Box display="flex" justifyContent="center" py={4}>
                                    <CircularProgress />
                                </Box>
                            ) : paginatedComments.length === 0 ? (
                                <Box
                                    display="flex"
                                    flexDirection="column"
                                    alignItems="center"
                                    justifyContent="center"
                                    py={5}
                                >
                                    <Box
                                        sx={{
                                            backgroundColor: "rgba(0, 102, 255, 0.05)", 
                                            borderRadius: "50%",
                                            width: 64,
                                            height: 64,
                                            display: "flex",
                                            alignItems: "center",
                                            justifyContent: "center",
                                            mb: 2,
                                        }}
                                    >
                                        <CommentIcon />
                                    </Box>

                                    {/* Title */}
                                    <Typography
                                        variant="h6"
                                        fontWeight={600}
                                        textAlign="center"
                                        gutterBottom
                                    >
                                        Be the first to comment
                                    </Typography>

                                    {/* Subtitle */}
                                    <Typography
                                        variant="body2"
                                        color="text.secondary"
                                        textAlign="center"
                                        maxWidth={320}
                                    >
                                        Nobody&apos;s responded to this post yet. Add your thoughts and get the
                                        conversation going.
                                    </Typography>
                                </Box>
                            ) : (
                                paginatedComments.map((c) => (
                                    <Box
                                        key={c.commentId}
                                        mt={2}
                                        p={2}
                                        border="1px solid #EAECF0"
                                        borderRadius="12px"
                                        bgcolor="#fff"
                                    >
                                        <Stack direction="row" spacing={1} alignItems="center" mb={1}>
                                            <Avatar src={c.userImageUrl} sx={{ width: 32, height: 32 }} />
                                            <Typography fontWeight={600}>{c.userName}</Typography>
                                            <Typography variant="body2" color="text.secondary">
                                                • {new Date(c.dateCreated).toLocaleString()}
                                            </Typography>
                                        </Stack>
                                        <Typography mb={1}>{c.subject}</Typography>
                                        <Stack direction="row" spacing={2}>
                                            <Stack direction="row" alignItems="center" spacing={0.5}>
                                                <IconButton
                                                    size="small"
                                                    onClick={() => handleLike(c.commentId)}
                                                    aria-label="Like comment"
                                                >
                                                    <ThumbUpAltOutlinedIcon fontSize="small" />
                                                </IconButton>
                                                <Typography variant="body2">{c.likeCount}</Typography>
                                            </Stack>
                                        </Stack>
                                    </Box>
                                ))
                            )}
                        </Box>

                        {totalPages > 1 && (
                            <Box mt={4} display="flex" justifyContent="center">
                                <PaginationFooter
                                    totalPages={totalPages}
                                    translationNS="common"
                                    hideResultsPerPage
                                />
                            </Box>
                        )}
                    </>
                ) : (
                    <Box display="flex" flexDirection="column" alignItems="center" mt={2}>
                        <Typography variant="body1" fontWeight={500}>
                            You must be logged in to comment
                        </Typography>
                    </Box>
                )}

                <Snackbar
                    open={!!error}
                    autoHideDuration={6000}
                    onClose={handleCloseError}
                    anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
                >
                    <Alert onClose={handleCloseError} severity="error" sx={{ width: '100%' }}>
                        {error}
                    </Alert>
                </Snackbar>
            </Box>
        </Box>
    );
};

export default CommentBox;
