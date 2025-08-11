"use client";

import { Box, IconButton, InputLabel } from "@mui/material";
import { ChevronDownIcon, ChevronUpIcon } from "lucide-react";
import React, { memo, useCallback, useEffect } from "react";
import { useFormContext, Controller } from "react-hook-form";
import { COLORS } from "../../theme";
import { InputLabelSx } from "../ql-select/ql-select.styles";

type NumberInputProps = {
  isRequired?: boolean;
  text: string;
  disabled?: boolean;
  name: string;
};

const NumberInput: React.FC<NumberInputProps> = ({
  isRequired = false,
  text,
  disabled,
  name,
}) => {
  const { control, setValue, getValues } = useFormContext();

  const increment = useCallback(() => {
    const currentValue = getValues(name);
    if (currentValue === "Choose" || currentValue === "") {
      // Set to 1 when value is "Choose" or empty
      setValue(name, 1, { shouldDirty: true });
    } else {
      setValue(name, Math.max(1, (currentValue || 0) + 1), {
        shouldDirty: true,
      });
    }
  }, [getValues, name, setValue]);

  const decrement = useCallback(() => {
    const currentValue = getValues(name);
    if (currentValue === "Choose" || currentValue === "") {
      // Set to 1 when value is "Choose" or empty
      setValue(name, 1, { shouldDirty: true });
    } else {
      setValue(name, Math.max(1, (currentValue || 1) - 1), {
        shouldDirty: true,
      });
    }
  }, [getValues, name, setValue]);

  useEffect(() => {
    if (disabled) {
      setValue(name, "");
    } else {
      setValue(name, "Choose");
    }
  }, [disabled, name, setValue]);

  return (
    <Box
      sx={{
        background: disabled ? COLORS.GREY[200] : COLORS.WHITE,
        border: `1px solid ${COLORS.SECONDARY.BUTTON.BG_BORDER}`,
        padding: "0 14px",
        width: "147px",
        height: "56px",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        borderRadius: "4px",
        opacity: disabled ? 0.6 : 1,
        "&:hover": {
          border: disabled
            ? `1px solid #c4c4c4`
            : `1px solid ${COLORS.PRIMARY[900]}`,
        },
        input: {
          typography: "h3Regular",
        },
      }}
    >
      <Box>
        <InputLabel
          id="dropdown-label"
          variant="outlined"
          shrink={true}
          sx={{
            ...InputLabelSx,
            color: disabled ? COLORS.GREY.GREYISH_BLUE : COLORS.GREY[700],
            transform: "translate(1px, 2px) scale(0.67)",
            typography: "subtitle1Medium",
          }}
        >
          {text}
          {isRequired && "*"}
        </InputLabel>
        <Controller
          name={name}
          control={control}
          render={({ field: { value, onChange } }) => (
            <input
              data-testid={`${name}-number-field`}
              type="text"
              id={name}
              value={disabled ? "" : value || ""} // Handle empty value when disabled
              placeholder={disabled ? "Choose" : ""} // Show "Choose" placeholder when disabled
              onChange={(e) => {
                const inputValue = e.target.value.trim();
                if (disabled) return;

                // Allow non-numeric input, but ensure the value is numeric or reset to 1 if invalid
                const numericValue = inputValue ? Number(inputValue) : 1;
                if (!isNaN(numericValue) && numericValue >= 1) {
                  onChange(numericValue); // Update value if it's a valid number
                } else {
                  onChange(1); // Set to 1 if invalid
                }
              }}
              style={{
                width: 100,
                height: 20,
                backgroundColor: disabled ? COLORS.GREY[200] : COLORS.WHITE,
                color: value === "Choose" ? COLORS.GREY[700] : COLORS.BLACK,
                border: "none",
                outline: "none",
              }}
              disabled={disabled}
            />
          )}
        />
      </Box>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
        }}
      >
        <IconButton
          onClick={increment}
          disabled={disabled}
          sx={{
            padding: 0,
            cursor: disabled ? "not-allowed" : "pointer",
          }}
        >
          <ChevronUpIcon
            width="20px"
            height="20px"
            color={disabled ? COLORS.GREY[200] : COLORS.GREY.GREYISH_BLUE}
          />
        </IconButton>
        <IconButton
          onClick={decrement}
          disabled={disabled}
          sx={{
            padding: 0,
            cursor: disabled ? "not-allowed" : "pointer",
          }}
        >
          <ChevronDownIcon
            width="20px"
            height="20px"
            color={disabled ? COLORS.GREY[200] : COLORS.GREY.GREYISH_BLUE}
          />
        </IconButton>
      </Box>
    </Box>
  );
};

export default memo(NumberInput);
