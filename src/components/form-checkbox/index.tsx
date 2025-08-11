"use client";
import {
  Box,
  Checkbox,
  FormControlLabel,
  FormHelperText,
  Typography,
} from "@mui/material";
import React, { memo, useMemo } from "react";
import { useController } from "react-hook-form";
import CheckBoxIcon from "../../icons/checkbox";
import CheckBoxCheckedIcon from "../../icons/checkbox-checked";
import { FormTypes } from "../../types";
import { useTranslation } from "../../i18n";
import { COLORS } from "../../theme";

const FormCheckbox = ({ control, rules, label, name, disabled }: FormTypes) => {
  const {
    field: { onChange, value, ref },
    fieldState: { error },
  } = useController({
    rules,
    name,
    control,
  });
  const { t } = useTranslation("create-offer");

  const errorView = useMemo(() => {
    if (error) {
      return (
        <FormHelperText>{error ? t(`${error.message}`) : " "}</FormHelperText>
      );
    }
  }, [error, t]);

  return (
    <Box
      marginLeft={"2px"}
      sx={{
        ".MuiButtonBase-root": {
          p: 0,
        },
        ".MuiFormControlLabel-root": {
          ml: 0,
          columnGap: 1.5,
        },
      }}
    >
      <FormControlLabel
        disabled={disabled}
        sx={{ maxHeight: "9px" }}
        ref={ref}
        control={
          <Checkbox
            data-testid={`${label}-checkbox-field`}
            onChange={onChange}
            checked={value ?? false}
            icon={<CheckBoxIcon />}
            checkedIcon={<CheckBoxCheckedIcon />}
          />
        }
        label={
          <Typography
            variant="h3Medium"
            color={
              disabled
                ? COLORS.SECONDARY.BUTTON.BUTTON_DISABLED_TEXT
                : COLORS.GREY[900]
            }
          >
            {t(`${label}`)}
          </Typography>
        }
      />

      {errorView}
    </Box>
  );
};

export default memo(FormCheckbox);
