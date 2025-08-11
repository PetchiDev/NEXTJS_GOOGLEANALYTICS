'use client';

import { Box, Typography, Chip } from "@mui/material";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import BusinessIcon from "@mui/icons-material/BusinessCenter";
import SportsIcon from "@mui/icons-material/SportsSoccer";
import LifestyleIcon from "@mui/icons-material/AccessibilityNew";
import RestaurantIcon from "@mui/icons-material/Restaurant";
import ArticleIcon from "@mui/icons-material/Article";
import TravelExploreIcon from "@mui/icons-material/FlightLandOutlined";
import { JSX, useEffect, useMemo, useState } from "react";
import { getAllNewsCategoris } from "@/utils/content/content";
import Link from "next/link";

interface SubCategory {
  id: number;
  subCategoryName: string;
}
interface Category {
  id: number;
  categoryName: string;
  subCategories?: SubCategory[];
}

const normalize = (s: string = "") =>
  s.replace(/\s+/g, " ").trim().toLowerCase();

const getIcon = (name: string): JSX.Element | undefined => {
  switch (normalize(name)) {
    case "news":
      return <ArticleIcon fontSize="small" />;
    case "sports":
      return <SportsIcon fontSize="small" />;
    case "food and dining":
      return <RestaurantIcon fontSize="small" />;
    case "business":
      return <BusinessIcon fontSize="small" />;
    case "lifestyle":
      return <LifestyleIcon fontSize="small" />;
    case "travel & leisure":
    case "travel and leisure":
      return <TravelExploreIcon fontSize="small" />;
    default:
      return undefined;
  }
};

export default function InTheKnow() {
  const [categories, setCategories] = useState<Category[]>([]);

  useEffect(() => {
    (async () => {
      try {
        const res = await getAllNewsCategoris();
        setCategories(Array.isArray(res) ? res : []);
      } catch (error) {
        console.error("Failed to load categories", error);
        setCategories([]);
      }
    })();
  }, []);

  const { displayCategories, lastCategoryFirstTwoSubs } = useMemo(() => {
    if (!categories.length) {
      return { displayCategories: [] as Category[], lastCategoryFirstTwoSubs: [] as SubCategory[] };
    }
    const withoutFirst = categories.slice(1); // skip first category
    const last = categories[categories.length - 1];
    const firstTwoSubs = (last?.subCategories ?? []).slice(0, 2);
    return { displayCategories: withoutFirst, lastCategoryFirstTwoSubs: firstTwoSubs };
  }, [categories]);

  return (
    <Box sx={{ maxWidth: "1170px", mx: "auto", mt: 6 }}>
      <Typography variant="h6" textAlign="center" fontWeight={600} sx={{ mb: 2 }}>
        <Box component="span" color="#FF6A00">IN</Box>{" "}
        <Box component="span" color="#00467F">the Know</Box>
      </Typography>

      <Box
        sx={{
          display: "flex",
          flexWrap: "wrap",
          alignItems: "center",
          gap: "6px",
          justifyContent: "center",
        }}
      >
        {/* Main category chips */}
        {displayCategories.map((cat) => {
          const icon = getIcon(cat.categoryName);
          return (
            <Link key={cat.id} href={`/content/news?category=${cat.id}`} passHref>
              <Chip
                label={cat.categoryName}
                clickable
                {...(icon ? { icon } : {})}
                sx={{
                  padding: "6px 24px",
                  minHeight: "44px",
                  borderRadius: "999px",
                  fontWeight: 600,
                  fontSize: "0.95rem",
                  backgroundColor: "#FFFFFF",
                  color: "#111",
                  border: "1px solid #E0E0E0",
                  boxShadow: "0 2px 6px rgba(0, 0, 0, 0.04)",
                  transition: "all 0.3s ease",
                  "&:hover": {
                    backgroundColor: "#f9f9f9",
                    transform: "translateY(-1px)",
                  },
                }}
              />
            </Link>
          );
        })}

        {/* First two subcategories of last category */}
        {categories.length > 0 &&
          lastCategoryFirstTwoSubs.map((sub) => {
            const last = categories[categories.length - 1];
            const icon = getIcon(sub.subCategoryName);
            return (
              <Link
                key={sub.id}
                href={`/content/news?category=${last.id}?subCategory=${sub.id}`}
                passHref
              >
                <Chip
                  label={sub.subCategoryName}
                  clickable
                  {...(icon ? { icon } : {})}
                  sx={{
                    padding: "6px 24px",
                    minHeight: "44px",
                    borderRadius: "999px",
                    fontWeight: 600,
                    fontSize: "0.95rem",
                    backgroundColor: "#FFFFFF",
                    color: "#111",
                    border: "1px solid #E0E0E0",
                    boxShadow: "0 2px 6px rgba(0, 0, 0, 0.04)",
                    transition: "all 0.3s ease",
                    "&:hover": {
                      backgroundColor: "#f9f9f9",
                      transform: "translateY(-1px)",
                    },
                  }}
                />
              </Link>
            );
          })}

        {/* View all */}
        <Link href="/content/news" passHref>
          <Chip
            label="View all"
            icon={<ArrowForwardIcon />}
            clickable
            sx={{
              padding: "6px 24px",
              minHeight: "44px",
              borderRadius: "999px",
              fontWeight: 600,
              fontSize: "0.95rem",
              backgroundColor: "#00467F",
              color: "#FFFFFF",
              transition: "all 0.3s ease",
              "& .MuiChip-icon": { color: "#FFFFFF", ml: 0.5 },
              "&:hover": { backgroundColor: "#FF7F38", transform: "translateY(-1px)" },
            }}
          />
        </Link>
      </Box>
    </Box>
  );
}
