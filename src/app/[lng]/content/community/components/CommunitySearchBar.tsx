"use client";
import React, { useEffect, useState } from "react";
import {
  Box,
  TextField,
  Button,
  InputAdornment,
  useMediaQuery,
  useTheme,
  CircularProgress,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import QLSelect from "@/components/ql-select";
import { COLORS } from "@/theme";
import { getAllForumCategories } from "@/utils/community/community";
import { trackSearchInteraction, trackCategoryFilter } from "@/utils/analytics";

interface ForumCategory {
  id: string;
  name: string;
}

interface Props {
  onSearch: (searchText: string, categoryId: string) => void;
}

const CommunitySearchBar: React.FC<Props> = ({ onSearch }) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));

  const [searchText, setSearchText] = useState("");
  const [category, setCategory] = useState("");
  const [categories, setCategories] = useState<ForumCategory[]>([]);
  const [loadingCategories, setLoadingCategories] = useState(true);

  useEffect(() => {
    let canceled = false;
    const fetchCategories = async () => {
      try {
        const data = await getAllForumCategories();
        if (!canceled) setCategories(data || []);
      } catch (error) {
        if (!canceled) console.error("Failed to fetch categories:", error);
      } finally {
        if (!canceled) setLoadingCategories(false);
      }
    };
    fetchCategories();
    return () => {
      canceled = true;
    };
  }, []);

  const handleSearch = () => {
    const selectedCategoryId = category;
    
    // Track search interaction
    if (searchText.trim()) {
      trackSearchInteraction(searchText.trim(), 0, "community"); // results count will be updated by parent
    }
    
    // Track category filter if selected
    if (selectedCategoryId) {
      const selectedCategory = categories.find(cat => cat.id === selectedCategoryId);
      if (selectedCategory) {
        trackCategoryFilter(selectedCategory.name, "community");
      }
    }
    
    onSearch(searchText, selectedCategoryId);
  };

  return (
    <Box
      display="flex"
      flexDirection={isMobile ? "column" : "row"}
      alignItems="center"
      justifyContent="center"
      p={2}
      borderRadius={2}
      sx={{
        backgroundColor: COLORS.GREY[300],
        mt: 4,
        mx: "auto",
        px: isMobile ? 2 : 8,
        py: isMobile ? 3 : 5,
        gap: isMobile ? 2 : 0,
        width: "100%",
      }}
    >
      {/* Search Field */}
      <TextField
        placeholder="Search"
        value={searchText}
        onChange={(e) => setSearchText(e.target.value)}
        variant="outlined"
        fullWidth
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <SearchIcon fontSize="small" />
            </InputAdornment>
          ),
          style: {
            height: 56,
            backgroundColor: "#ffffff",
          },
        }}
        sx={{
          width: isMobile ? "100%" : "556px",
          "& .MuiOutlinedInput-root": {
            "& fieldset": {
              borderTopLeftRadius: isMobile ? "6px" : "6px",
              borderBottomLeftRadius: isMobile ? "6px" : "6px",
              borderTopRightRadius: isMobile ? "6px" : 0,
              borderBottomRightRadius: isMobile ? "6px" : 0,
            },
          },
        }}
      />

      {/* Category Select */}
      <Box sx={{ width: isMobile ? "100%" : "196px" }}>
        {loadingCategories ? (
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              height: "56px",
              backgroundColor: "#ffffff",
              borderRadius: 0,
            }}
          >
            <CircularProgress size={20} />
          </Box>
        ) : (
          <QLSelect
            MuiFieldProps={{
              label: "Category",
              optionArray: categories, // <-- { id, name } OK
              emptyValueLabel: "Choose",
              // nameField: true, // (optional) uncomment if you want to select by name instead of id
              isEmptyDisabled: true, // keeps "Choose" as non-selectable placeholder
              showSearchfield: false,
              optionMinWidth: 160,
            }}
            inputField={{
              value: category, // '' | selected id
              onChange: (e: any) => {
                const v = e?.target?.value ?? e; // MUI Select sends e.target.value
                setCategory(String(v));
              },
              sx: {
                height: "56px",
                borderRadius: 0,
                "& .MuiOutlinedInput-root": {
                  borderRadius: 0,
                  height: "100%",
                },
              },
            }}
          />
        )}
      </Box>

      {/* Submit Button */}
      <Button
        variant="contained"
        onClick={handleSearch}
        size="large"
        fullWidth={isMobile}
        sx={{
          width: isMobile ? "100%" : "268px",
          height: "56px",
          fontWeight: 600,
          fontSize: "16px",
          borderRadius: isMobile ? "6px" : "0 6px 6px 0",
        }}
      >
        Show Results
      </Button>
    </Box>
  );
};

export default CommunitySearchBar;
