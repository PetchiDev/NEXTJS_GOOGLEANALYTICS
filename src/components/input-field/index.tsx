"use client";
import { TFunction } from "i18next";
import React, { memo } from "react";
import FormInputField from "../form-input-field";
import { IFormField } from "../../types";

export interface LabelValue {
  label: string;
  value: string | number;
  colorCode?: string | null;
  makeId?: number;
  modelId?: number;
  group?: string;
}

interface InputFieldProps {
  disabled?: boolean;
  field: IFormField;
  startAdornmant?: boolean;
  t: TFunction<["translation", ...string[]], undefined>;
}
const InputField = ({
  field,
  disabled = false,
  t,
  startAdornmant = false,
}: InputFieldProps) => {
  const { label, labelSuffix, rows, mask, maskChar } =
    field.props.inputProps ?? {};
  const {
    type: inputType,
    adornment,
    charMaxLength,
    showLimitValue,
    shouldParse,
    decimalPointRequired,
    capitalize,
    multiline,
    allowOnlyAlphabets,
  } = field.props.inputTextFieldProps ?? {};
  const FieldName = field.props.name;
  return (
    <FormInputField
      data-testid={`${FieldName}-input-field`}
      name={FieldName}
      placeholder={label ? (t(`${label}`) ?? "") : ""}
      adornment={adornment ? t(`${adornment}`) : ""}
      startAdornment={startAdornmant}
      labelSuffix={labelSuffix ?? ""}
      rows={rows}
      type={inputType}
      charMaxLength={charMaxLength}
      showLimitValue={showLimitValue}
      rules={field.props.rules}
      disabled={disabled}
      shouldParse={shouldParse}
      decimalPointRequired={decimalPointRequired}
      capitalize={capitalize}
      multiline={multiline}
      allowOnlyAlphabets={allowOnlyAlphabets}
      t={t}
      mask={mask ?? ""}
      maskChar={maskChar ?? ""}
    />
  );
};
export default memo(InputField);
