"use client";

import React, { useEffect, useRef, useState } from "react";
import {
  Box,
  TextField,
  Select,
  MenuItem,
  FormControl,
  InputAdornment,
  Switch,
  Typography,
  Stack,
  useTheme,
  useMediaQuery,
  Checkbox,
  Menu,
  ListItemText,
} from "@mui/material";
import RoomOutlinedIcon from "@mui/icons-material/RoomOutlined";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import SearchIcon from "@mui/icons-material/Search";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { format } from "date-fns";
import {
  getAllCategoriesLocations,
  getallcategories,
} from "@/utils/content/content";
import DateRangePicker from "@/components/date-range-picker/DateRangePicker";

type Props = {
  searchText: string;
  onSearchChange: (value: string) => void;
  location: string[];
  startDate: Date | null;
  setStartDate: (val: Date | null) => void;
  endDate: Date | null;
  setEndDate: (val: Date | null) => void;
  onLocationChange: (value: string[]) => void;
  category: string;
  onCategoryChange: (value: string) => void;
  date: string;
  onDateChange: (value: string) => void;
  showFreeOnly: boolean;
  onToggleFree: (value: boolean) => void;
  onClear: () => void;
  categories: string[];
};

const EventFilterBar: React.FC<Props> = ({
  searchText,
  onSearchChange,
  location,
  onLocationChange,
  category,
  onCategoryChange,
  onDateChange,
  showFreeOnly,
  onToggleFree,
  onClear,
  startDate,
  setStartDate,
  endDate,
  setEndDate,
}) => {
  const [isMobile, setIsMobile] = useState(false);
  const [locationData, setLocationData] = useState<
    { id: string | number; name: string }[]
  >([]);
  const [categoriesData, setCategoriesData] = useState<
    { id: string | number; categoryName: string }[]
  >([]);
  const [resetCounter, setResetCounter] = useState(0);

  const handleClear = () => {
    onClear();
    setResetCounter((prev) => prev + 1);
  };

  useEffect(() => {
    if (startDate && endDate) {
      const formatted = `${format(startDate, "dd-MM-yyyy")} to ${format(
        endDate,
        "dd-MM-yyyy"
      )}`;
      onDateChange(formatted);
    } else {
      onDateChange("");
    }
  }, [startDate, endDate, onDateChange]);

  useEffect(() => {
    getAllCategoriesLocations(setLocationData);
    getallcategories((data) => {
      setCategoriesData(
        data?.map((cat: { id: string | number; categoryName: string }) => ({
          id: cat.id,
          categoryName: cat.categoryName,
        })) || []
      );
    });
  }, []);

  const [locationAnchorEl, setLocationAnchorEl] = useState<null | HTMLElement>(
    null
  );
  const [searchLocation, setSearchLocation] = useState("");
  const [filteredLocations, setFilteredLocations] = useState<
    typeof locationData
  >([]);
  const searchRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    setFilteredLocations(
      locationData.filter((loc) =>
        loc.name.toLowerCase().includes(searchLocation.toLowerCase())
      )
    );
  }, [searchLocation, locationData]);

  const toggleLocation = (id: string | number) => {
    if (location.includes(String(id))) {
      onLocationChange(location.filter((l) => l !== String(id)));
    } else {
      onLocationChange([...location, String(id)]);
    }
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <Box
        sx={{
          backgroundColor: "#E9E9E9",
          borderRadius: "12px",
          px: isMobile ? 2 : 5,
          py: isMobile ? 2 : 5,
          display: "flex",
          flexDirection: "column",
          gap: 2,
        }}
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: isMobile ? "column" : "row",
            flexWrap: "wrap",
            gap: isMobile ? 2 : 0,
          }}
        >
          <TextField
            size="small"
            variant="standard"
            placeholder="Search"
            value={searchText}
            onChange={(e) => onSearchChange(e.target.value)}
            inputProps={{
              maxLength: 200,
            }}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon />
                </InputAdornment>
              ),
              disableUnderline: true,
            }}
            sx={{
              backgroundColor: "#fff",
              borderRadius: isMobile ? "8px" : "8px 0 0 8px",
              borderRight: isMobile ? "none" : "2px solid #ccc",
              justifyContent: "center",
              minWidth: isMobile ? "100%" : 200,
              height: "56px",
              flex: 1,
              px: 1.5,
            }}
          />

          {/* Location Dropdown Button */}
          <Box
            onClick={(e) => setLocationAnchorEl(e.currentTarget)}
            sx={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              borderRadius: "8px",
              height: "56px",
              px: 2,
              cursor: "pointer",
              backgroundColor: "#fff",
              minWidth: 160,
              flex: 1,
              borderRight: isMobile ? "none" : "2px solid #ccc",
            }}
          >
            <Typography
              variant="caption"
              sx={{
                color: "#757575",
                fontSize: "12px",
                lineHeight: 1,
                mb: 0.5,
              }}
            >
              Location
            </Typography>
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
              }}
            >
              <Typography
                sx={{
                  fontWeight: 500,
                  whiteSpace: "nowrap",
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                  color: location.length ? "#000" : "#aaa",
                }}
              >
                {location.length
                  ? locationData
                    .filter((l) => location.includes(String(l.id)))
                    .map((l) => l.name)
                    .join(", ")
                  : "Location"}
              </Typography>
              <RoomOutlinedIcon sx={{ color: "#F39224", ml: 1 }} />
            </Box>
          </Box>

          {/* Location Dropdown Menu */}
          <Menu
            anchorEl={locationAnchorEl}
            open={Boolean(locationAnchorEl)}
            onClose={() => {
              setLocationAnchorEl(null);
              setSearchLocation("");
            }}
            MenuListProps={{
              onKeyDown: (e) => {
                if (!["ArrowDown", "ArrowUp", "Enter"].includes(e.key)) {
                  e.stopPropagation();
                }
              },
            }}
            PaperProps={{
              style: {
                width: isMobile ? "100%" : "250px",
                maxHeight: "300px",
                padding: "10px 0",
              },
            }}
          >
            <Box px={2} pb={1} onClick={(e) => e.stopPropagation()}>
              <TextField
                inputRef={searchRef}
                autoFocus
                placeholder="Search"
                variant="standard"
                value={searchLocation}
                onChange={(e) => setSearchLocation(e.target.value)}
                InputProps={{
                  disableUnderline: true,
                  endAdornment: (
                    <InputAdornment position="end">
                      <SearchIcon sx={{ color: "#F39224" }} />
                    </InputAdornment>
                  ),
                }}
                sx={{
                  backgroundColor: "#F7F7F7",
                  borderRadius: "6px",
                  height: "40px",
                  px: 1,
                  width: "100%",
                  "& .MuiInputBase-input": {
                    padding: "10px 8px",
                  },
                }}
              />
            </Box>

            {filteredLocations.map((loc) => (
              <MenuItem key={loc.id} onClick={() => toggleLocation(loc.id)}>
                <Checkbox
                  checked={location.includes(String(loc.id))}
                  sx={{
                    color: "#F39224",
                    "&.Mui-checked": {
                      color: "#F39224",
                    },
                  }}
                />
                <ListItemText primary={loc.name} />
              </MenuItem>
            ))}
          </Menu>

          {/* Category Dropdown */}
          <FormControl
            size="small"
            sx={{
              minWidth: isMobile ? "100%" : 160,
              flex: 1,
              backgroundColor: "#fff",
              borderRadius: "8px",
              height: "56px",
              px: 2,
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              borderRight: isMobile ? "none" : "2px solid #ccc",
            }}
          >
            <Typography
              variant="caption"
              sx={{
                color: "#757575",
                fontSize: "12px",
                lineHeight: 1,
                mb: 0.5,
              }}
            >
              Category
            </Typography>
            <Select
              value={category}
              onChange={(e) => onCategoryChange(e.target.value)}
              IconComponent={ExpandMoreIcon}
              displayEmpty
              variant="standard"
              disableUnderline
              sx={{
                padding: 0,
                fontWeight: 500,
                "& .MuiSelect-select": {
                  padding: 0,
                },
              }}
            >
              <MenuItem value="">Choose</MenuItem>
              {categoriesData.map((cat) => (
                <MenuItem key={cat.id} value={cat.id}>
                  {cat.categoryName}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          {/* Date Range Picker */}
          <DateRangePicker
            setStartDate={(date) => setStartDate(date ? new Date(date) : null)}
            setEndDate={(date) => setEndDate(date ? new Date(date) : null)}
            resetCounter={resetCounter}
            isMobile={isMobile}
          />
        </Box>

        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            flexWrap: "wrap",
            mt: 2,
          }}
        >
          <Stack direction="row" alignItems="center" spacing={1}>
            <Switch
              checked={showFreeOnly}
              onChange={(e) => onToggleFree(e.target.checked)}
              sx={{
                width: 48,
                height: 28,
                padding: 0,
                "& .MuiSwitch-switchBase": {
                  padding: "2px",
                  "&.Mui-checked": {
                    transform: "translateX(20px)",
                    color: "#fff",
                    "& + .MuiSwitch-track": {
                      backgroundColor: "#F39224",
                      opacity: 1,
                    },
                  },
                },
                "& .MuiSwitch-thumb": {
                  width: 24,
                  height: 24,
                  boxShadow: "none",
                },
                "& .MuiSwitch-track": {
                  borderRadius: 14,
                  backgroundColor: "#BDBDBD",
                  opacity: 1,
                },
              }}
            />
            <Typography fontSize={14} fontWeight={500}>
              Show Free Events Only
            </Typography>
          </Stack>

          <Typography
            onClick={handleClear}
            sx={{
              color: "#F39224",
              fontWeight: 500,
              fontSize: 14,
              cursor: "pointer",
              whiteSpace: "nowrap",
              mt: isMobile ? 2 : 0,
            }}
          >
            Clear All
          </Typography>
        </Box>
      </Box>
    </LocalizationProvider>
  );
};

export default EventFilterBar;
