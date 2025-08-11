import { TextField, styled, TextFieldProps } from "@mui/material";
import React, { ChangeEvent } from "react";
import { COLORS } from "../../theme";

interface CustomTextFieldStylesProps {
  error?: boolean;
  mask?: string; // Add mask property
  maskChar?: string; // Add maskChar property
}

const commonTextFieldStyles = {
  "& .MuiFilledInput-root": {
    overflow: "hidden",
    borderRadius: 4,
    backgroundColor: COLORS.WHITE,
    border: "1px solid",
    borderColor: COLORS.GREY.MEDIUM,
  },
  "& .MuiInputLabel-root": {
    fontSize: "15px",
    fontStyle: "normal",
    fontWeight: 400,
    lineHeight: "26px",
    letterSpacing: "0em",
    color: COLORS.GREY[700],
  },
  "& .MuiInputLabel-shrink": {
    fontSize: "12px",
    fontWeight: 500,
    lineHeight: "18px",
    letterSpacing: "0em",
    textAlign: "left",
  },
  "& .MuiInputBase-input": {
    paddingBottom: "6px",
    paddingLeft: "14px",
    color: "#242424",
  },
  "& .Mui-disabled": {
    backgroundColor: COLORS.WHITE,
    "& .MuiInputBase-input": {
      opacity: 1,
      WebkitTextFillColor: `${COLORS.SECONDARY.BUTTON.BUTTON_DISABLED_TEXT} !important`,
    },
  },
};

const getCustomizedTextFieldStyles = ({
  error,
}: CustomTextFieldStylesProps) => ({
  ...commonTextFieldStyles,
  ...(error && {
    "& .Mui-error": {
      border: "1px solid",
      borderColor: COLORS.RED[100],
      borderRadius: 4,
    },
  }),
});

const applyMask = (value: string, mask: string, maskChar: string): string => {
  let maskedValue = "";
  let valueIndex = 0;

  for (const char of mask) {
    if (valueIndex >= value.length) break;

    if (char === maskChar) {
      // Replace 'N' with the corresponding digit from the value
      if (/\d/.test(value[valueIndex])) {
        maskedValue += value[valueIndex];
        valueIndex++;
      } else {
        break;
      }
    } else {
      // Add mask characters (e.g., hyphens)
      maskedValue += char;
    }
  }

  return maskedValue;
};

export const CustomizedInputField = styled(
  (props: TextFieldProps & CustomTextFieldStylesProps) => {
    const { mask, maskChar, onChange, ...rest } = props;
    // Custom onChange handler to apply the mask
    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
      const rawValue = e.target.value.replace(/\D/g, ""); // Remove non-digit characters

      // Apply the mask only if a valid mask is provided
      const maskedValue =
        mask && maskChar ? applyMask(rawValue, mask, maskChar) : rawValue;

      // Call the original onChange handler with the masked value
      if (onChange) {
        const event = {
          ...e,
          target: {
            ...e.target,
            value: maskedValue,
          },
        };
        onChange(event as ChangeEvent<HTMLInputElement>);
      }
    };

    return (
      <TextField
        {...rest}
        onChange={mask ? handleChange : onChange} // Use the custom handler only if mask is provided
        variant="filled"
        sx={{
          "& .MuiInputLabel-root.Mui-disabled": {
            color: `${COLORS.SECONDARY.BUTTON.BUTTON_DISABLED_TEXT} !important`,
          },
        }}
      />
    );
  }
)((props: TextFieldProps & CustomTextFieldStylesProps) =>
  getCustomizedTextFieldStyles(props)
);
