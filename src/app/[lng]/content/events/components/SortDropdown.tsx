import React, { useState } from "react";
import {
  FormControl,
  MenuItem,
  Select,
  Typography,
  Box,
  ListItemText,
  SelectChangeEvent,
} from "@mui/material";
import CheckIcon from "@mui/icons-material/Check";

interface SortDropdownProps {
  value: string;
  onChange: (value: string) => void;
}

const SortDropdown: React.FC<SortDropdownProps> = ({ value, onChange }) => {
  const [open, setOpen] = useState(false);

  const labelMap: Record<string, string> = {
    default: "Default",
    desc: "Price: High to Low",
    asc: "Price: Low to High",
  };

  return (
    <Box sx={{ display: "flex", alignItems: "center", bgcolor: "#F6F7FB", p: 2 }}>
      <Typography sx={{ fontSize: 16, fontWeight: 400, mr: 2, color: "#242729" }}>
        Sort by:
      </Typography>

      <FormControl
        size="small"
        sx={{
          minWidth: 160,
          bgcolor: "#fff",
          borderRadius: 2,
        }}
      >
        <Select
          open={open}
          onOpen={() => setOpen(true)}
          onClose={() => setOpen(false)}
          value={value || "default"}
          onChange={(e: SelectChangeEvent) => onChange(e.target.value as string)}
          renderValue={(selected) => labelMap[selected as string] ?? (selected as string)}
          sx={{
            fontWeight: 500,
            fontSize: 18,
            color: "#242729",
            height: 48,
            borderRadius: 2,
            "& .MuiOutlinedInput-notchedOutline": {
              borderColor: open ? "#F39224" : "#E3E6E8", // orange when open
            },
            "&:hover .MuiOutlinedInput-notchedOutline": {
              borderColor: "#F39224",
            },
            "& .MuiSelect-select": { px: 1.5, pr: 4 },
            "& .MuiSelect-icon": { right: 8 },
          }}
          MenuProps={{
            PaperProps: {
              sx: {
                mt: 1,
                borderRadius: 1,
                boxShadow: "0px 8px 16px rgba(0,0,0,0.08)",
              },
            },
            MenuListProps: { sx: { py: 0.5 } },
          }}
        >
          {[
            { v: "default", t: "Default" },
            { v: "desc", t: "Price: High to Low" },
            { v: "asc", t: "Price: Low to High" },
          ].map((opt) => (
            <MenuItem key={opt.v} value={opt.v} sx={{ px: 2, py: 1.1 }}>
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between", 
                  width: "100%",
                }}
              >
                <ListItemText primary={opt.t} />
                {value === opt.v && <CheckIcon fontSize="small" />}
              </Box>
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </Box>
  );
};

export default SortDropdown;
