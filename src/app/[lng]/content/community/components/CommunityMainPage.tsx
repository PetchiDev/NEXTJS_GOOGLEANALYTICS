"use client";

import React, { useEffect, useRef, useState } from "react";
import { getCookie } from "@/utils/community/community";
import CommunitySearchBar from "@/app/[lng]/content/community/components/CommunitySearchBar";
import PostCard from "@/app/[lng]/content/community/components/PostCard";
import CustomPagination from "@/components/custom-pagination";
import {
  Box,
  Typography,
  Stack,
  Grid,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  IconButton,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import SubscribeNewsletter from "./SubscribeNewsletter";
import { MODULE } from "@/constants";
import { useRouter } from "next/navigation";
import SideBannerCarousel from "@/components/banner/SideBanner";
import { getDailyPageData } from "@/utils/content/getDailyPageData";
import EmptyState from "@/components/empty-box";

import PaginationControls from "@/app/[lng]/content/community/components/PaginationControls";
import { AlertMessage, AlertMessageRef } from "@/components/alert-message";
import { env } from "next-runtime-env";
import CheckIcon from "@mui/icons-material/Check";

interface Post {
  id: string;
  userName: string;
  title: string;
  category: string;
  description: string;
  imageUrl?: string;
  likeCount: number;
  CommentCount: number;
  dateCreated: string;
  slug: string;
}

const rules = [
  "Be Respectful.",
  "This is not an advertisement platform.",
  "All content must be related to Qatar.",
  "Don’t spread misinformation.",
  "Don’t promote violence.",
  "Don’t share people’s private information.",
];

export default function CommunityMainPage() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [total, setTotal] = useState<number>(0);
  const [searchText, setSearchText] = useState("");
  const [categoryId, setCategoryId] = useState("");
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(12);
  const router = useRouter();
  const [sortDirection, setSortDirection] = useState<string>("default");
  const alertRef = useRef<AlertMessageRef | null>(null);

  const BASE_URL = env("NEXT_PUBLIC_API_BASE_URL");

  const handleCreateClick = () => {
    const token = getCookie("qat");

    if (!token) {
      alertRef.current?.showAlert({
        title: "Error",
        message: "Please login to create community post.",
        severity: "error",
      });
      return;
    }
    try {
      router.push("/content/community/community_create");
    } catch (error) {
      alertRef.current?.showAlert({
        title: "Error",
        message: "Failed to route. Please try again",
        severity: "error",
      });
    }
  };
  const [isOpen, setIsOpen] = useState(false);
  const [sideBanner, setSideBanner] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const fetchBanners = async () => {
      try {
        const { communitySideBanner } = await getDailyPageData();
        setSideBanner(communitySideBanner);
      } catch (error) {
        console.error("Error fetching banners:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchBanners();
  }, []);
  const fetchPosts = async (
    search = "",
    categoryId = "",
    page = 1,
    pageSize = 12,
    sortDirection = "default"
  ) => {
    const params = new URLSearchParams();
    if (categoryId) params.append("categoryId", categoryId);
    if (search) params.append("search", search);
    if (sortDirection !== "default")
      params.append("sortDirection", sortDirection);
    params.append("page", page.toString());
    params.append("pageSize", pageSize.toString());

    const BASE_URL = env("NEXT_PUBLIC_API_BASE_URL");

    const url = `${BASE_URL}/api/v2/community/getAllPosts?${params.toString()}`;
    const res = await fetch(url);
    const data = await res.json();
    setPosts(data.items ?? []);
    setTotal(data.total ?? 0);
  };

  useEffect(() => {
    fetchPosts(searchText, categoryId, page, pageSize, sortDirection);
  }, [searchText, categoryId, page, pageSize, sortDirection]);

  const handleSearch = (text: string, categoryId: string) => {
    setSearchText(text);
    setCategoryId(categoryId);
    setPage(1); // Reset to first page on new search
  };

  const handleLikePost = async (postId: string) => {
    const token = getCookie("qat");

    if (!token) {
      alertRef.current?.showAlert({
        title: "Error",
        message: "Failed to route. Please try again",
        severity: "error",
      });
      return;
    }

    try {
      const res = await fetch(
        `${BASE_URL}/api/v2/community/likePostByCategoryId`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ communityPostId: postId }),
        }
      );

      if (!res.ok) {
        const errMsg = await res.text();
        throw new Error(errMsg || "Like failed");
      }

      const result = await res.json();
      // optionally refresh list
      fetchPosts(searchText, categoryId, page, pageSize, sortDirection);
    } catch (error) {
      alert("Failed to like post. Please try again.");
    }
  };

  return (
    <Box sx={{ background: "#F1F3F5", minHeight: "100vh" }}>
      <Box sx={{ maxWidth: "1170px", mx: "auto", px: { xs: 2, md: 4 }, py: 4 }}>
        <CommunitySearchBar onSearch={handleSearch} />

        <Grid container spacing={3} mt={2}>
          <Grid item xs={12} md={8}>
            <Stack
              direction="row"
              alignItems="center"
              justifyContent="space-between"
              mb={3}
            >
              <Stack direction="row" alignItems="center" spacing={1.2}>
                <Typography fontWeight={700} fontSize="18.5px" color="#22273A">
                  Community Posts ({total})
                </Typography>
                <IconButton
                  size="small"
                  onClick={handleCreateClick}
                  sx={{ background: "#F39224", color: "#fff" }}
                >
                  <AddIcon sx={{ fontSize: 22 }} />
                </IconButton>
              </Stack>

             <FormControl size="small" sx={{ minWidth: 160 }}>
      <Box display="flex" alignItems="center">
        <Typography
          variant="body2"
          sx={{ mr: 1, color: "#1C1C1C", fontWeight: 500 }}
        >
          Sort by:
        </Typography>

        <Select
          open={isOpen}
          onOpen={() => setIsOpen(true)}
          onClose={() => setIsOpen(false)}
          value={sortDirection}
          onChange={(e) => {
            setSortDirection(e.target.value);
            setPage(1);
          }}
          size="small"
          displayEmpty
          renderValue={(selected) => {
            if (selected === "default") return "Default";
            if (selected === "desc") return "Date : Recent First";
            if (selected === "asc") return "Date : Oldest First";
            return selected;
          }}
          sx={{
            minWidth: 160,
            height: 36,
            fontSize: "14px",
            backgroundColor: "#fff",
            borderRadius: "8px",
            border: `1px solid ${isOpen ? "#F15A29" : "#D6D6D6"}`, // orange on open
            ".MuiOutlinedInput-notchedOutline": { border: "none" },
            "&:hover": {
              borderColor: isOpen ? "#F15A29" : "#C9CDD2",
            },
            "& .MuiSelect-select": {
              display: "flex",
              alignItems: "center",
              px: 1.5,
              pr: 4, // room for arrow
            },
            "& .MuiSelect-icon": {
              right: 8,
              color: "#1C1C1C",
            },
          }}
          MenuProps={{
            PaperProps: {
              sx: {
                mt: 1,
                borderRadius: "10px",
                boxShadow: "0px 8px 16px rgba(0,0,0,0.08)",
                overflow: "hidden",
              },
            },
            MenuListProps: {
              sx: { py: 0.5 },
            },
          }}
        >
          {[
            { v: "default", t: "Default" },
            { v: "desc", t: "Date : Recent First" },
            { v: "asc", t: "Date : Oldest First" },
          ].map((opt) => (
            <MenuItem
              key={opt.v}
              value={opt.v}
              sx={{
                px: 2,
                py: 1.1,
                display: "block",
              }}
            >
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between", // tick to the right edge
                  gap: 2,
                  width: "100%",
                }}
              >
                <ListItemText primary={opt.t} />
                {sortDirection === opt.v && <CheckIcon fontSize="small" />}
              </Box>
            </MenuItem>
          ))}
        </Select>
      </Box>
    </FormControl>
            </Stack>

            {posts.map((post) => (
              <PostCard
                key={post.id}
                postId={post.id}
                userName={post.userName}
                title={post.title}
                category={post.category}
                description={post.description}
                imageUrl={post.imageUrl}
                likeCount={post.likeCount ?? 0}
                CommentCount={post.CommentCount ?? 0}
                dateCreated={post.dateCreated}
                onLike={handleLikePost}
                alertRef={alertRef}
                slug={post.slug}
              />
            ))}

            {posts.length > 0 && (
              <Box mt={4}>
                <PaginationControls
                  currentPage={page}
                  totalPages={Math.ceil(total / pageSize)}
                  rowsPerPage={pageSize}
                  onPageChange={(newPage) => setPage(newPage)}
                  onRowsPerPageChange={(newSize) => {
                    setPageSize(newSize);
                    setPage(1);
                  }}
                />
              </Box>
            )}
          </Grid>

          {/* Right section: Rules & Guidelines */}
          <Grid item xs={12} md={4}>
            <Box
              sx={{
                backgroundColor: "transparent",
                borderRadius: 2,
                boxShadow: "none",
                p: 0,
                mb: 3,
                width: { xs: "100%", md: "auto" },
              }}
            >
              <Stack direction="row" alignItems="center" spacing={1.2} mb={2}>
                <Box
                  sx={{
                    width: 8,
                    height: 36,
                    background: "#11476b",
                    borderRadius: 1.2,
                    mr: 1,
                  }}
                />
                <Typography
                  fontWeight={700}
                  fontSize="20px"
                  color="#22273A"
                  sx={{ letterSpacing: "0.06em" }}
                >
                  Rules & Guidelines
                </Typography>
              </Stack>

              <Stack spacing={1.2}>
                {rules.map((rule, idx) => (
                  <Stack
                    direction="row"
                    alignItems="center"
                    spacing={1.6}
                    key={rule}
                  >
                    <Box
                      sx={{
                        width: 28,
                        height: 28,
                        borderRadius: "50%",
                        background: "#F39224",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        fontWeight: 700,
                        fontSize: "16px",
                        color: "#fff",
                        flexShrink: 0,
                      }}
                    >
                      {idx + 1}
                    </Box>
                    <Typography
                      component="span"
                      sx={{
                        color: "#575C69",
                        fontSize: "14px",
                        fontWeight: 700,
                        lineHeight: 1.55,
                      }}
                    >
                      {rule}
                    </Typography>
                  </Stack>
                ))}
              </Stack>
            </Box>
            <SubscribeNewsletter />
            {!sideBanner?.images?.length ? (
              <EmptyState
                title="No Side banners available"
                subtitle="Please check again later."
              />
            ) : (
              <SideBannerCarousel
                banners={sideBanner.images.map((img: any) => ({
                  id: img.id,
                  image: img.image_url,
                  title: "",
                  subtitle: "",
                  cta: "",
                  href: img.link || "#",
                  duration: img.duration,
                }))}
                loading={false}
              />
            )}
            <AlertMessage ref={alertRef} />
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
}
