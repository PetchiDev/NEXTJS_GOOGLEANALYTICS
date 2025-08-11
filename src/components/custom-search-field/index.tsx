import React, { memo } from "react";
import { InputAdornment, TextField, SxProps } from "@mui/material";
import { CustomSearchIcon } from "../../icons";

interface SearchFieldProps {
  showIcon: boolean;
  setSearchedItems: (value: string) => void;
  fieldStyle?: SxProps;
  value?: string;
}

const CustomSearchField: React.FC<SearchFieldProps> = ({
  showIcon = true,
  setSearchedItems,
  fieldStyle,
  value = "",
}) => {
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const searchedValue = e.target.value.toLowerCase();
    setSearchedItems(searchedValue);
  };
  return (
    <TextField
      data-testid="search-field"
      variant="outlined"
      placeholder="Search"
      size="small"
      sx={{
        "& .mui-1q6at85-MuiInputBase-root-MuiOutlinedInput-root": {
          paddingLeft: "8px",
        },
        width: "100%",
        borderRadius: "4px",
        marginY: "4px",
      }}
      value={value}
      onChange={handleSearchChange}
      InputProps={{
        style: { fontSize: 13, ...(fieldStyle as React.CSSProperties) },
        startAdornment: showIcon && (
          <InputAdornment position="start">
            <CustomSearchIcon
              style={{ fontSize: "20px", color: "grey.GREYISH_BLUE" }}
            />
          </InputAdornment>
        ),
      }}
    />
  );
};

export default memo(CustomSearchField);
