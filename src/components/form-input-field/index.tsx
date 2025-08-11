"use client";
import { TFunction } from "i18next";
import { useController, useFormContext } from "react-hook-form";
import CustomInputFields from "../custom-input-fields";
import { formatNumberWithCommas } from "../../utils/misc";
import React, { memo } from "react";
import { FormTypes } from "../../types";

interface FormTypesInputProps extends FormTypes {
  adornment?: string;
  startAdornment?: boolean;
  disabled?: boolean;
  showLimitValue?: boolean;
  shouldParse?: boolean;
  decimalPointRequired?: boolean;
  capitalize?: boolean;
  charMaxLength?: number;
  multiline?: boolean;
  rows?: number;
  allowOnlyAlphabets?: boolean;
  t: TFunction<["translation", ...string[]], undefined>;
  mask?: string;
  maskChar?: string;
}

const FormInputField = ({
  rules,
  name,
  placeholder,
  labelSuffix = "",
  type = "text",
  showLimitValue = false,
  charMaxLength,
  adornment,
  disabled,
  startAdornment = false,
  shouldParse = false,
  decimalPointRequired = false,
  capitalize = false,
  multiline = false,
  allowOnlyAlphabets = false,
  rows = 1,
  t,
  mask = "",
  maskChar = "",
}: FormTypesInputProps) => {
  const { control } = useFormContext();
  const {
    field: { onChange, value, ref },
    fieldState: { error },
  } = useController({
    rules,
    name,
    control,
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = e.target.value;
    let rawValue = inputValue;
    if (decimalPointRequired) {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const [integerPart, decimalPart] = rawValue.split(".");

      // Allow input only if decimal places are <= 2
      const isValidDecimal = !decimalPart || decimalPart.length <= 2;
      if (isValidDecimal) {
        rawValue = charMaxLength ? rawValue.slice(0, charMaxLength) : rawValue;
        onChange(rawValue);
      }
    } else if (shouldParse) {
      rawValue = inputValue.replace(/[^0-9]/g, ""); // Remove non-numeric characters

      if (charMaxLength) {
        rawValue = rawValue.slice(0, charMaxLength); // Trim to allowed length
      }

      if (rawValue) {
        e.target.value = formatNumberWithCommas(rawValue); // Format display value
      }

      onChange(rawValue);
    } else if (allowOnlyAlphabets) {
      rawValue = inputValue.replace(/[^A-Za-z]/g, ""); // Remove non-alphabetic characters

      if (charMaxLength) {
        rawValue = rawValue.slice(0, charMaxLength); // Trim to allowed length
      }

      onChange(rawValue);
    } else {
      // General case: apply charMaxLength if defined
      rawValue = charMaxLength ? rawValue.slice(0, charMaxLength) : rawValue;
      onChange(capitalize ? rawValue.toUpperCase() : rawValue);
    }
  };

  return (
    <CustomInputFields
      data-testid={`${name}-input-field`}
      disabled={disabled}
      ref={ref}
      type={type}
      placeholder={placeholder ?? ""}
      labelSuffix={labelSuffix}
      adornment={
        showLimitValue ? `${value?.length ?? 0}/${charMaxLength}` : adornment
      }
      startadornment={startAdornment}
      onChange={handleChange}
      value={shouldParse ? formatNumberWithCommas(value ?? "") : (value ?? "")}
      error={error ? t(`${error?.message}`) : " "}
      name={name}
      multiline={multiline}
      rows={rows}
      showError={!!error}
      mask={mask}
      maskChar={maskChar}
    />
  );
};

export default memo(FormInputField);
