"use client";
import React, { useEffect, useRef, useState } from "react";
import dynamic from "next/dynamic";
import {
  createCommunityPost,
  getAllForumCategories,
} from "@/utils/community/community";
import { AlertMessage, AlertMessageRef } from "@/components/alert-message";
import {
  Box,
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Typography,
  Checkbox,
  FormControlLabel,
  Stack,
  CircularProgress,
  IconButton,
} from "@mui/material";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import AddIcon from "@mui/icons-material/Add";
import DeleteIcon from "@mui/icons-material/Delete";
import { EditorState, convertToRaw } from "draft-js";
import draftToHtml from "draftjs-to-html";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import Breadcrumbs from "@/components/breadcrumbs";
const MdEditor = dynamic(
  () => import("react-markdown-editor-lite").then((m) => m.default),
  { ssr: false }
);
import "react-markdown-editor-lite/lib/index.css";

import MarkdownIt from "markdown-it";
const mdParser = new MarkdownIt();
const Editor = dynamic(
  () => import("react-draft-wysiwyg").then((mod) => mod.Editor),
  { ssr: false, loading: () => <p>Loading editor...</p> }
);

interface ForumCategory {
  id: string;
  name: string;
}

export default function CommunityPostForm() {
  const [markdown, setMarkdown] = useState<string>("");
  const [category, setCategory] = useState("");
  const [categories, setCategories] = useState<ForumCategory[]>([]);
  const [loadingCategories, setLoadingCategories] = useState(true);
  const [title, setTitle] = useState("");
  const [photo, setPhoto] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [agree, setAgree] = useState(false);
  const [editorState, setEditorState] = useState(EditorState.createEmpty());
  const alertRef = useRef<AlertMessageRef>(null);

  useEffect(() => {
    let canceled = false;
    const fetchCategories = async () => {
      try {
        const data = await getAllForumCategories();
        if (!canceled) setCategories(data || []);
      } catch (error) {
        console.error("Failed to fetch categories:", error);
      } finally {
        if (!canceled) setLoadingCategories(false);
      }
    };
    fetchCategories();
    return () => {
      canceled = true;
    };
  }, []);

  const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith("image/")) {
      alertRef.current?.showAlert({
        title: "Invalid File",
        message: "Only image files are allowed.",
        severity: "warning",
      });
      return;
    }

    setPhoto(file);
    setPreviewUrl(URL.createObjectURL(file));
  };

  const handleDeletePhoto = () => {
    setPhoto(null);
    setPreviewUrl(null);
  };

  const handlePublish = async () => {
    const selectedCategory = categories.find((cat) => cat.name === category);

    if (!selectedCategory || !title || !markdown.trim()) {
      alertRef.current?.showAlert({
        title: "Missing Fields",
        message: "Please fill title, category, and description.",
        severity: "warning",
      });
      return;
    }

    const convertToBase64 = (file: File): Promise<string> => {
      return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => {
          const base64 = (reader.result as string).split(",")[1];
          resolve(base64);
        };
        reader.onerror = (error) => reject(error);
      });
    };

    try {
      let imageBase64: string | null = null;
      if (photo) {
        imageBase64 = await convertToBase64(photo);
      }

      const payload: any = {
        title,
        category: selectedCategory.name,
        categoryId: selectedCategory.id,
        description: markdown,
        isActive: true,
        dateCreated: new Date().toISOString(),
        ...(imageBase64 ? { imageBase64 } : {}),
      };

      if (imageBase64) {
        payload.imageBase64 = imageBase64;
      }

      await createCommunityPost(payload);

      alertRef.current?.showAlert({
        title: "Success",
        message: "Community post created successfully.",
        severity: "success",
      });

      // Reset form
      setTitle("");
      setMarkdown("");
      setCategory("");
      setPhoto(null);
      setPreviewUrl(null);
      setEditorState(EditorState.createEmpty());
      setAgree(false);
    } catch (err) {
      alertRef.current?.showAlert({
        title: "Error",
        message: "Community post not created. Please try again.",
        severity: "error",
      });
    }
  };

  return (
    <Box sx={{ backgroundColor: "#F1F3F5", minHeight: "100vh", py: 4 }}>
      <Box sx={{ maxWidth: "1170px", margin: "0 auto", px: { xs: 2, md: 4 } }}>
        <Box mb={3}>
          <Breadcrumbs />
        </Box>

        <Box
          sx={{
            maxWidth: 700,
            backgroundColor: "#fff",
            p: 3,
            borderRadius: 2,
            boxShadow: "0px 2px 10px rgba(0, 0, 0, 0.04)",
            margin: "0 auto",
          }}
        >
          <Typography
            variant="h6"
            sx={{ color: "#004B87", fontWeight: 600, mb: 2, fontSize: "18px" }}
          >
            Post Details
          </Typography>

          {/* Category Dropdown */}
          <FormControl
            fullWidth
            margin="normal"
            sx={{
              backgroundColor: "#fff",
              borderRadius: "8px",
              mb: 2,
              "& .MuiInputBase-root": {
                borderRadius: "8px",
                border: "1px solid #D9DCE1",
                backgroundColor: "#fff",
                padding: "10px 0px 0px",
                fontSize: "16px",
              },
              "& .MuiOutlinedInput-notchedOutline": {
                border: "none",
              },
              "& .MuiSelect-icon": {
                color: "#4B5563",
              },
            }}
          >
            <InputLabel
              shrink
              sx={{
                color: "#6B7280",
                fontSize: "13px",
                transform: "translate(14px, 8px) scale(1)",
              }}
            >
              Category
            </InputLabel>
            <Select
              value={category}
              displayEmpty
              onChange={(e) => setCategory(e.target.value)}
              renderValue={(selected) =>
                selected ? (
                  <span style={{ color: "#111827", fontWeight: 500 }}>
                    {selected}
                  </span>
                ) : (
                  <span style={{ color: "#9CA3AF" }}>Choose</span>
                )
              }
              MenuProps={{
                PaperProps: {
                  style: {
                    maxHeight: 250,
                    borderRadius: "8px",
                  },
                },
              }}
            >
              {loadingCategories ? (
                <MenuItem disabled>
                  <CircularProgress size={20} />
                </MenuItem>
              ) : (
                categories.map((cat) => (
                  <MenuItem key={cat.id} value={cat.name}>
                    {cat.name}
                  </MenuItem>
                ))
              )}
            </Select>
          </FormControl>

          {/* Title */}
          <TextField
            fullWidth
            label="Title*"
            variant="outlined"
            margin="normal"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            sx={{ mb: 2 }}
          />

          {/* Description */}
          <Box mt={2} mb={3}>
            <Typography
              variant="subtitle1"
              gutterBottom
              sx={{ color: "#1C1C1C", fontWeight: 600 }}
            >
              Description*
            </Typography>

            <MdEditor
              value={markdown}
              style={{ height: 320, borderRadius: 8, background: "#fff" }}
              renderHTML={(text) => mdParser.render(text)}
              view={{ menu: true, md: true, html: false }}
              onChange={({ text }) => setMarkdown(text)}
              onImageUpload={async (file: File) => {
                // Simple inline support (base64). Swap with your upload API to return a CDN URL.
                const toBase64 = (f: File) =>
                  new Promise<string>((resolve, reject) => {
                    const reader = new FileReader();
                    reader.onload = () => resolve(String(reader.result));
                    reader.onerror = reject;
                    reader.readAsDataURL(f);
                  });
                const dataUrl = await toBase64(file);
                return dataUrl; // editor will insert ![image](dataUrl)
              }}
            />
          </Box>

          {/* Upload Photo */}
          <Box sx={{ mt: 3 }}>
            <Typography
              variant="h6"
              sx={{ fontWeight: 600, color: "#004B87", mb: 1 }}
            >
              Upload a Photo
            </Typography>
            <Box sx={{ display: "flex", alignItems: "center", gap: 1, mb: 2 }}>
              <InfoOutlinedIcon sx={{ fontSize: 20, color: "#666" }} />
              <Typography variant="body2" color="text.secondary">
                Use landscape orientation (horizontal) for optimal photo
                display.
              </Typography>
            </Box>

            {previewUrl && previewUrl.trim() !== "" ? (
              <Box
                sx={{
                  position: "relative",
                  borderRadius: 1,
                  overflow: "hidden",
                  display: "inline-block",
                  width: "100%",
                }}
              >
                <img
                  src={previewUrl}
                  alt="Uploaded Preview"
                  style={{
                    width: "100%",
                    height: "auto",
                    borderRadius: "8px",
                    objectFit: "cover",
                  }}
                />
                <IconButton
                  onClick={handleDeletePhoto}
                  sx={{
                    position: "absolute",
                    top: 8,
                    right: 8,
                    backgroundColor: "#fff",
                    color: "#FF7A00",
                    "&:hover": { backgroundColor: "#f5f5f5" },
                  }}
                >
                  <DeleteIcon />
                </IconButton>
              </Box>
            ) : (
              <label htmlFor="photo-upload" style={{ cursor: "pointer" }}>
                <Box
                  sx={{
                    position: "relative",
                    border: "2px dashed #DADADA",
                    borderRadius: 2,
                    height: 200,
                    backgroundColor: "#FAFAFA",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    textAlign: "center",
                  }}
                >
                  <Typography sx={{ color: "#1C1C1C", fontWeight: 500 }}>
                    Upload
                  </Typography>
                  <AddIcon
                    sx={{
                      position: "absolute",
                      top: 8,
                      right: 8,
                      color: "#FF7A00",
                      fontSize: 20,
                    }}
                  />
                </Box>
                <input
                  accept="image/*"
                  type="file"
                  id="photo-upload"
                  hidden
                  onChange={handlePhotoUpload}
                />
              </label>
            )}
          </Box>

          {/* Terms */}
          <FormControlLabel
            control={
              <Checkbox
                checked={agree}
                onChange={(e) => setAgree(e.target.checked)}
              />
            }
            label={
              <Typography variant="body2">
                I agree to the{" "}
                <Typography component="span" color="#FF7A00" fontWeight={500}>
                  Terms of Use
                </Typography>{" "}
                of community posts on Qatar Living.
              </Typography>
            }
            sx={{ mt: 3 }}
          />

          {/* Buttons */}
          <Stack direction="row" spacing={2} mt={3}>
            <Button variant="outlined" fullWidth>
              Close
            </Button>
            <Button
              variant="contained"
              fullWidth
              disabled={!agree}
              onClick={handlePublish}
              sx={{
                backgroundColor: "#FF7A00",
                color: "#fff",
                "&:hover": {
                  backgroundColor: "#e96c00",
                },
              }}
            >
              Publish
            </Button>
          </Stack>

          <AlertMessage ref={alertRef} />
        </Box>
      </Box>
    </Box>
  );
}
