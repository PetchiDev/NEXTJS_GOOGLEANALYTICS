"use client";

import React, { useEffect, useState, useRef } from "react";
import PostCard from "@/app/[lng]/content/community/components/PostCard";
import {
  Box,
  Typography,
  Stack,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
} from "@mui/material";
import { AlertMessage, AlertMessageRef } from "@/components/alert-message";
import { env } from "next-runtime-env";

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

export default function CommunityMainPage() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [total, setTotal] = useState<number>(0);
  const alertRef = useRef<AlertMessageRef | null>(null);

  const BASE_URL = env('NEXT_PUBLIC_API_BASE_URL');

  useEffect(() => {
    fetch(`${BASE_URL}/api/v2/community/getAllPosts`)
      .then((res) => res.json())
      .then((data) => {
        setPosts(data.items ?? []);
        setTotal(data.total ?? 0);
      });
  }, []);

  return (
    <Box px={{ xs: 2, md: 4 }} py={4}>
      <Stack
        direction="row"
        justifyContent="space-between"
        alignItems="center"
        flexWrap="wrap"
        rowGap={2}
        mb={3}
      >
        <Typography variant="h6" fontWeight={600}>
          Community Posts ({total} results)
        </Typography>

        <FormControl size="small" sx={{ minWidth: 120 }}>
          <InputLabel id="sort-by-label">Sort by</InputLabel>
          <Select
            labelId="sort-by-label"
            label="Sort by"
            defaultValue="default"
          >
            <MenuItem value="default">Default</MenuItem>
            <MenuItem value="latest">Latest</MenuItem>
            <MenuItem value="mostLiked">Most Liked</MenuItem>
          </Select>
        </FormControl>
      </Stack>

      {posts.map((post) => (
        <PostCard
          key={post.id}
          userName={post.userName}
          title={post.title}
          category={post.category}
          description={post.description}
          imageUrl={post.imageUrl}
          likeCount={post.likeCount ?? 0}
          CommentCount={post.CommentCount ?? 0}
          dateCreated={post.dateCreated}
          slug={post.slug}
          postId={post.id}
          alertRef={alertRef}
        />
      ))}

      <AlertMessage ref={alertRef} />
    </Box>
  );
}
