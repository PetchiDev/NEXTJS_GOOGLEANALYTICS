"use client";
import { SelectProps } from "@mui/material";
import { SelectChangeEvent } from "@mui/material/Select/SelectInput";
import React, { useCallback } from "react";
import { useController, UseControllerProps } from "react-hook-form";
import { useTranslation } from "../../i18n";
import QLSelect from "../ql-select";
import { IMuiSelectFieldProps } from "../../types";

type IFromSelect = {
  name: string;
  control: UseControllerProps["control"];
  rules?: UseControllerProps["rules"];
  dependentChange?: () => void;
  MuiInputFieldProps?: SelectProps<string>;
  MuiFieldProps: IMuiSelectFieldProps;
  showError?: boolean;
  translationFileName?: string;
};
interface FormQLSelectProps extends IFromSelect {
  onChange?: (event: SelectChangeEvent<string>) => void;
  dependentChange?: () => void;
}
const FormQLSelect = ({
  control,
  name,
  rules,
  dependentChange,
  MuiInputFieldProps,
  onChange: customOnChange,
  MuiFieldProps: { fullWidth = true, label = "", ...restFieldProps },
  showError = true,
  translationFileName = "create-offer",
}: Readonly<FormQLSelectProps>) => {
  const {
    field: { ref, onChange, ...inputField },
    fieldState: { error },
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } = useController<any, string>({
    name,
    rules,
    control,
    defaultValue: "",
  });

  const onChangeAction = useCallback(
    (event: SelectChangeEvent<string>) => {
      if (!restFieldProps?.disabled) {
        onChange(event);
        if (dependentChange) dependentChange();
        if (customOnChange) customOnChange(event);
      }
    },
    [customOnChange, dependentChange, onChange, restFieldProps?.disabled]
  );

  const { t } = useTranslation(translationFileName);

  return (
    <QLSelect
      data-testid={`${name}-select-field`}
      ref={ref}
      error={error ? t(`${error?.message}`) : " "}
      inputField={{
        ...MuiInputFieldProps,
        ...inputField,
        onChange: onChangeAction,
      }}
      MuiFieldProps={{ fullWidth, label, ...restFieldProps }}
      showError={showError ? showError : !!error}
    />
  );
};

export default React.memo(FormQLSelect);
