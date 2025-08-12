"use client";

import React, { useEffect, useState, useTransition } from "react";
import { Box, Tab, Tabs, Paper, Typography } from "@mui/material";
import { getAllNewsCategoris } from "@/utils/content/content";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { trackCategoryFilter, trackCategoryFilterQL } from "@/utils/analytics";

interface SubCategory {
  id: number;
  subCategoryName: string;
}
interface Category {
  id: number;
  categoryName: string;
  subCategories: SubCategory[];
}
interface Props {
  onCategoryChange: (categoryId: number | null) => void;
  onSubCategoryChange: (subCategoryId: number | null) => void;
}

const CategoryTabsWithSubTabs: React.FC<Props> = ({
  onCategoryChange,
  onSubCategoryChange,
}) => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [selectedCategoryIndex, setSelectedCategoryIndex] = useState(0);
  const [selectedSubCategoryIndex, setSelectedSubCategoryIndex] = useState(0);

  const pathname = usePathname();
  const searchParams = useSearchParams();
  const router = useRouter();
  const [, startTransition] = useTransition();

  const toNum = (v: string | null): number | undefined =>
    v != null && v !== "" ? Number(v) : undefined;

  const updateUrl = (categoryId?: number, subCategoryId?: number) => {
    const params = new URLSearchParams(searchParams.toString());

    if (categoryId !== undefined) params.set("category", String(categoryId));
    else params.delete("category");

    if (subCategoryId !== undefined) params.set("subcategory", String(subCategoryId));
    else params.delete("subcategory");

    startTransition(() => {
      router.replace(`${pathname}?${params.toString()}`, { scroll: false });
    });
  };

  useEffect(() => {
    async function fetchCategories() {
      const data = await getAllNewsCategoris();
      const list: Category[] = Array.isArray(data)
        ? data
        : data?.categories || [];
      setCategories(list);

      const urlCategoryId = toNum(searchParams.get("category"));
      const urlSubCategoryId = toNum(searchParams.get("subcategory"));

      let catIndex = 0;
      if (urlCategoryId !== undefined && list.length) {
        const found = list.findIndex((c) => c.id === urlCategoryId);
        if (found !== -1) catIndex = found;
      }
      setSelectedCategoryIndex(catIndex);

      const selectedCategory = list[catIndex];
      if (!selectedCategory) {
        onCategoryChange(null);
        onSubCategoryChange(null);
        updateUrl(undefined, undefined);
        return;
      }

      onCategoryChange(selectedCategory.id);

      let subIndex = 0;
      if (
        urlSubCategoryId !== undefined &&
        selectedCategory.subCategories?.length
      ) {
        const found = selectedCategory.subCategories.findIndex(
          (s) => s.id === urlSubCategoryId
        );
        if (found !== -1) subIndex = found;
      }
      setSelectedSubCategoryIndex(subIndex);

      const sub = selectedCategory.subCategories?.[subIndex] ?? null;
      onSubCategoryChange(sub ? sub.id : null);
      updateUrl(selectedCategory.id, sub ? sub.id : undefined);
    }

    fetchCategories();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleCategoryChange = (_: unknown, newIndex: number) => {
    setSelectedCategoryIndex(newIndex);
    setSelectedSubCategoryIndex(0);

    const selectedCat = categories[newIndex];
    if (!selectedCat) {
      onCategoryChange(null);
      onSubCategoryChange(null);
      updateUrl(undefined, undefined);
      return;
    }

    // Track category filter to Google Analytics
    trackCategoryFilter(selectedCat.categoryName, "news");
    
    // Track category filter to QL analytics server
    trackCategoryFilterQL(selectedCat.categoryName, "news");

    onCategoryChange(selectedCat.id);

    const firstSub = selectedCat.subCategories?.[0] ?? null;
    onSubCategoryChange(firstSub ? firstSub.id : null);
    updateUrl(selectedCat.id, firstSub ? firstSub.id : undefined);
  };

  const handleSubCategoryChange = (_: unknown, newIndex: number) => {
    setSelectedSubCategoryIndex(newIndex);

    const cat = categories[selectedCategoryIndex];
    const sub = cat?.subCategories?.[newIndex] ?? null;

    // Track subcategory filter to Google Analytics
    if (sub) {
      trackCategoryFilter(`${cat?.categoryName} > ${sub.subCategoryName}`, "news");
    }
    
    // Track subcategory filter to QL analytics server
    if (sub) {
      trackCategoryFilterQL(`${cat?.categoryName} > ${sub.subCategoryName}`, "news");
    }

    onSubCategoryChange(sub ? sub.id : null);
    updateUrl(cat?.id, sub ? sub.id : undefined);
  };

  const selectedSubCategories =
    categories[selectedCategoryIndex]?.subCategories || [];

  return (
    <Box
      sx={{
        width: "100%",
        px: { xs: 1, sm: 2, md: 3 },
        pt: { xs: 2, sm: 3 },
        pb: 1,
        bgcolor: "#F6F7FB",
      }}
    >
      {/* Main Category Tabs */}
      <Box
        display="flex"
        justifyContent={{ xs: "flex-start", md: "center" }}
        mb={{ xs: 1, md: 2 }}
        sx={{
          overflowX: "auto",
          whiteSpace: "nowrap",
          px: { xs: 1, sm: 2 },
        }}
      >
        <Box sx={{ minWidth: "max-content" }}>
          <Paper
            elevation={0}
            sx={{
              borderRadius: "6px",
              display: "inline-flex",
              bgcolor: "white",
              boxShadow: "0px 4px 20px rgba(0,0,0,0.06)",
              px: "16px",
              py: "12px",
              gap: "8px",
            }}
          >
            <Tabs
              value={selectedCategoryIndex}
              onChange={handleCategoryChange}
              variant="scrollable"
              scrollButtons="auto"
              TabIndicatorProps={{ style: { display: "none" } }}
              sx={{
                "& .MuiTabs-flexContainer": {
                  gap: "8px",
                },
                "& .MuiTab-root": {
                  textTransform: "none",
                  fontSize: { xs: 12, sm: 13, md: 14 },
                  fontWeight: 500,
                  color: "#6F6F6F",
                  minWidth: 128,
                  minHeight: 44,
                  px: "16px",
                  py: "12px",
                  borderRadius: "6px",
                  backgroundColor: "transparent",
                  whiteSpace: "nowrap",
                },
                "& .Mui-selected": {
                  backgroundColor: "#FF7A00",
                  color: "#fff !important",
                  fontWeight: 600,
                },
              }}
            >
              {categories.map((cat) => (
                <Tab key={cat.id} label={cat.categoryName} />
              ))}
            </Tabs>
          </Paper>
        </Box>
      </Box>

      {/* Sub Category Tabs */}
      <Box
        sx={{
          width: "100%",
          overflowX: "auto",
          px: { xs: 0, md: 2 },
          display: "flex",
          justifyContent: "center",
          "& .MuiTabs-scrollButtons": {
            color: "#FF7A00",
            "&.Mui-disabled": { opacity: 0.3 },
          },
        }}
      >
        <Box
          sx={{
            width: { xs: "100%", md: 1170 },
            height: 44,
            display: "flex",
            alignItems: "center",
            borderBottom: "1px solid #eee",
          }}
        >
          <Tabs
            value={selectedSubCategoryIndex}
            onChange={handleSubCategoryChange}
            variant="scrollable"
            scrollButtons="auto"
            TabIndicatorProps={{ style: { display: "none" } }}
            sx={{
              width: "100%",
              minHeight: 44,
              "& .MuiTabs-flexContainer": {
                gap: { xs: "8px", md: "8px" },
                display: "flex",
                flexWrap: "nowrap",
                justifyContent: { xs: "flex-start", md: "space-between" },
                minWidth: "max-content",
              },
              "& .MuiTab-root": {
                minHeight: 44,
                p: 0,
                minWidth: "auto",
              },
            }}
          >
            {selectedSubCategories.map((sub, idx) => (
              <Tab
                key={sub.id}
                disableRipple
                label={
                  <Box
                    sx={{
                      px: { xs: 1.5, md: 5 },
                      height: 44,
                      display: "flex",
                      alignItems: "center",
                      bgcolor:
                        selectedSubCategoryIndex === idx ? "#fff" : "transparent",
                      borderBottom:
                        selectedSubCategoryIndex === idx
                          ? "3px solid #FF7A00"
                          : "3px solid transparent",
                      whiteSpace: "nowrap",
                    }}
                  >
                    <Typography
                      fontSize={{ xs: "12px", sm: "13px", md: "14px" }}
                      fontWeight={selectedSubCategoryIndex === idx ? 600 : 500}
                      color={
                        selectedSubCategoryIndex === idx
                          ? "#FF7A00"
                          : "#1A1A1A"
                      }
                      textAlign="center"
                      sx={{ textTransform: "capitalize" }}
                    >
                      {sub.subCategoryName}
                    </Typography>
                  </Box>
                }
                sx={{ minWidth: "auto" }}
              />
            ))}
          </Tabs>
        </Box>
      </Box>
    </Box>
  );
};

export default CategoryTabsWithSubTabs;
