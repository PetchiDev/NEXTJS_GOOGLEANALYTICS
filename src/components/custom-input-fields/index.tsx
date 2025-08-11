"use client";
import {
  FormControl,
  FormHelperText,
  InputAdornment,
  Typography,
} from "@mui/material";
import React, { HTMLInputTypeAttribute, forwardRef, useMemo } from "react";
import { CustomizedInputField } from "./customized-input-field";
import { MessageIcon } from "../../icons";
import { COLORS } from "../../theme";

interface CustomInputFieldProps {
  placeholder: string;
  labelSuffix?: string;
  type?: HTMLInputTypeAttribute;
  value: string | number;
  size?: "small" | "medium";
  adornmentPosition?: "start" | "end";
  adornment?: string;
  startadornment?: boolean;
  name?: string;
  error?: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  maxLength?: number;
  disabled?: boolean;
  showError?: boolean;
  multiline: boolean;
  rows: number;
  mask?: string;
  maskChar?: string;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const CustomInputField = forwardRef<any, CustomInputFieldProps>(
  (
    {
      placeholder = "Input",
      labelSuffix = "",
      type = "text",
      value,
      size = "medium",
      adornmentPosition = "end",
      adornment = "",
      maxLength,
      error = "",
      showError = true,
      startadornment = false,
      disabled,
      onChange,
      ...rest
    },
    ref
  ) => {
    const errorView = useMemo(() => {
      if (error) {
        return <FormHelperText sx={{ fontSize: 10 }}>{error}</FormHelperText>;
      }
    }, [error]);

    return (
      <FormControl error={Boolean(error?.trim())} fullWidth>
        <CustomizedInputField
          sx={{
            "input::-webkit-outer-spin-button, input::-webkit-inner-spin-button":
              {
                WebkitAppearance: "none",
                margin: 0,
              },
            "& .MuiInputBase-inputMultiline": {
              p: 0,
            },
          }}
          style={{ marginBottom: 0, marginTop: 0 }}
          disabled={disabled}
          inputRef={ref}
          label={`${placeholder}${labelSuffix}`}
          size={size}
          fullWidth
          value={value}
          margin="normal"
          type={type}
          inputProps={{
            maxLength: maxLength ?? undefined,
          }}
          InputProps={{
            disableUnderline: true,
            sx: {
              color: COLORS.GREY[900],
              "input::placeholder": {
                color: COLORS.GREY[700],
                opacity: 1,
              },
            },

            endAdornment: adornment ? (
              <InputAdornment position={adornmentPosition}>
                <Typography variant="h3Regular" color={COLORS.GREY[700]}>
                  {adornment}
                </Typography>
              </InputAdornment>
            ) : null,
            startAdornment: startadornment ? (
              <InputAdornment
                position="start"
                sx={{
                  margin: 0, // Remove all margin
                  marginTop: "0 !important", // Force remove any margin-top
                }}
              >
                <MessageIcon />
              </InputAdornment>
            ) : null,
          }}
          onChange={onChange}
          {...rest}
        />
        {showError ? errorView : null}
      </FormControl>
    );
  }
);

CustomInputField.displayName = "CustomInputField";
export default React.memo(CustomInputField);
