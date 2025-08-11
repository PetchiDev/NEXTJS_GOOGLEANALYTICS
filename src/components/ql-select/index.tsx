"use client";
import CheckIcon from "@mui/icons-material/Check";
import ExpandMoreRoundedIcon from "@mui/icons-material/ExpandMoreRounded";
import {
  FormControl,
  FormHelperText,
  InputLabel,
  ListItemIcon,
  ListSubheader,
  MenuItem,
  TextField,
  Typography,
} from "@mui/material";
import Select from "@mui/material/Select";
import find from "lodash/find";
import flatMap from "lodash/flatMap";
import has from "lodash/has";
import React, { forwardRef, useCallback, useMemo, useState } from "react";
import OverflowTip from "../overflow-tip/overflow-tip";
import { InputLabelSx, menuProps, selectSx } from "./ql-select.styles";
import { COLORS } from "../../theme";
import {
  IMuiSelectFieldProps,
  IQLGroupSelectOption,
  IQLSelect,
  IQLSelectOption,
} from "../../types";

const defaultMuiFieldProps: IMuiSelectFieldProps = {
  label: "",
  labelSuffix: "",
  optionArray: [],
  emptyValueLabel: "",
  fullWidth: true,
  multiple: false,
  disabled: false,
  isEmptyDisabled: true,
  showSearchfield: false,
  optionMinWidth: undefined,
  nameField: false,
};

const QLSelect = forwardRef<unknown, IQLSelect>(
  (
    {
      isRequired = false,
      error = "",
      inputField,
      MuiFieldProps = defaultMuiFieldProps,
      showError,
    },
    ref
  ) => {
    const {
      label = "",
      labelSuffix = "",
      emptyValueLabel = "",
      size = "medium",
      fullWidth = true,
      disabled = false,
      isEmptyDisabled = true,
      optionArray = [],
      multiple = false,
      showSearchfield = false,
      optionMinWidth,
      nameField = false,
      paperProps,
    } = MuiFieldProps;
    const [searchQuery, setSearchQuery] = useState("");
    const [open, setOpen] = useState(inputField?.open || false);

    const filteredOptions = useMemo(() => {
      if (!searchQuery) {
        return optionArray;
      }
      return optionArray.filter(
        (option: IQLSelectOption | IQLGroupSelectOption) => {
          // Check if `option` is a group or individual option and apply search accordingly
          if ("groupName" in option) {
            // If it's a group, filter options within the group
            const filteredGroupOptions = option.options.filter(
              (opt: IQLSelectOption) =>
                opt.name.toLowerCase().includes(searchQuery.toLowerCase())
            );
            // If no group options match, exclude the group
            if (filteredGroupOptions.length === 0) {
              return false;
            }
            // Return the group with filtered options
            return { ...option, options: filteredGroupOptions };
          }
          // Otherwise, search for individual option
          return option.name.toLowerCase().includes(searchQuery.toLowerCase());
        }
      );
    }, [searchQuery, optionArray]);

    const groupOptionArray = useMemo(() => {
      if (has(filteredOptions, ["0", "groupName"])) {
        return flatMap(filteredOptions, "options") as IQLSelectOption[];
      }
    }, [filteredOptions]);

    const renderValue = useCallback(
      (selected: string | number): React.ReactNode => {
        if (selected == "") {
          return emptyValueLabel;
        }
        let flatArray = optionArray as IQLSelectOption[];
        if (groupOptionArray?.length) {
          flatArray = groupOptionArray;
        }
        return find<IQLSelectOption>(flatArray, (option) =>
          nameField
            ? option?.name?.toString() === selected?.toString()
            : option?.id?.toString() === selected?.toString()
        )?.name;
      },
      [emptyValueLabel, groupOptionArray, nameField, optionArray]
    );

    const titleView = useMemo(() => {
      if (label) {
        return (
          <InputLabel
            id="multiple-name-label"
            variant="outlined"
            shrink={true}
            sx={InputLabelSx}
          >
            <Typography variant="subtitle1Medium">
              {label}
              {labelSuffix && (
                <Typography variant="subtitle1Medium">{labelSuffix}</Typography>
              )}
            </Typography>
          </InputLabel>
        );
      }
    }, [label, labelSuffix]);

    const errorView = useMemo(() => {
      if (error) {
        return <FormHelperText sx={{ fontSize: 10 }}>{error}</FormHelperText>;
      }
    }, [error]);
    const renderMenuList = useCallback(
      (menuList: IQLSelectOption[]) => {
        return menuList?.map((option, index) => (
          <MenuItem
            key={`${option.id}-${index}`}
            value={nameField ? option.name : option.id}
            disabled={option?.disabled}
            sx={{
              display: "flex",
              justifyContent: "space-between",
            }}
          >
            <OverflowTip
              tooltipProps={{
                title: option.name,
                disableInteractive: true,
              }}
              listItemTextProps={{
                primary: option.name,
              }}
            />
            <ListItemIcon>
              {inputField?.value === (nameField ? option.name : option.id) && (
                <CheckIcon fontSize="small" />
              )}
            </ListItemIcon>
          </MenuItem>
        ));
      },
      [inputField?.value, nameField]
    );

    // Type Guard to check if an option is a group
    const isGroupOption = (
      option:
        | IQLSelectOption
        | { options: IQLSelectOption[]; groupName: string }
    ): option is { options: IQLSelectOption[]; groupName: string } => {
      return (option as { groupName: string }).groupName !== undefined;
    };

    const renderMenuGroup = useMemo(() => {
      if (filteredOptions.length) {
        // Check if the first element is a group
        if (isGroupOption(filteredOptions[0])) {
          // If there are groups, render each group
          return filteredOptions.map((group, index) =>
            isGroupOption(group) ? (
              <React.Fragment key={`${group.groupName}-${index}`}>
                <ListSubheader>{group.groupName}</ListSubheader>
                {renderMenuList(group.options)}
              </React.Fragment>
            ) : null
          );
        }
        // If no groups, just render the options
        return renderMenuList(filteredOptions as IQLSelectOption[]);
      }
      return null;
    }, [filteredOptions, renderMenuList]);
    const handleKeyDown = (event: React.KeyboardEvent<HTMLDivElement>) => {
      // Stop event propagation to ensure no undesired behavior
      event.stopPropagation();
      event.nativeEvent.stopImmediatePropagation();
    };

    const handleOpen = () => {
      setOpen(true);
    };

    const handleClose = () => {
      setOpen(false);
    };

    return (
      <FormControl
        error={Boolean(error?.trim())}
        fullWidth={fullWidth}
        disabled={disabled}
        size={size}
      >
        {titleView}
        <Select
          data-testid="multi-select-field"
          {...inputField}
          displayEmpty
          labelId="multiple-name-label"
          inputRef={ref}
          disabled={disabled}
          required={isRequired}
          multiple={multiple}
          IconComponent={ExpandMoreRoundedIcon}
          renderValue={renderValue}
          sx={[
            { textTransform: "capitalize" },
            selectSx(Boolean(label)),
            ...(Array.isArray(inputField?.sx)
              ? (inputField?.sx ?? {})
              : [inputField?.sx]),
            {
              typography: "h3Regular",
              color: inputField?.value === "" ? "grey.700" : "grey.900",
              ".MuiSvgIcon-root ": {
                fill: disabled
                  ? COLORS.SECONDARY.BUTTON.BUTTON_DISABLED_TEXT
                  : COLORS.GREY.GREYISH_BLUE,
              },
              ".Mui-disabled": {
                opacity: 1, // Override default opacity
                WebkitTextFillColor: disabled
                  ? `${COLORS.SECONDARY.BUTTON.BUTTON_DISABLED_TEXT} !important`
                  : "inherit",
              },
              fieldset: {
                border: `1px solid ${COLORS.SECONDARY.BUTTON.BG_BORDER}`,
              },
            },
          ]}
          MenuProps={{
            ...menuProps,
            sx: {
              ...menuProps.sx,
              "& li, .MuiListItemText-root": {
                minWidth: optionMinWidth || "auto",
              },
            },
            anchorOrigin: {
              vertical: "bottom",
              horizontal: "left",
            },
            transformOrigin: {
              vertical: "top",
              horizontal: "left",
            },
            autoFocus: !showSearchfield,
            PaperProps: {
              ...menuProps.PaperProps,
              style: {
                ...menuProps.PaperProps?.style,
                ...paperProps?.style,
              },
              onMouseLeave: handleClose,
              className: "scrollbar-custom",
            },
          }}
          open={open}
          onClose={handleClose}
          onOpen={(event) => {
            inputField?.onOpen?.(event);
            handleOpen();
          }}
          inputProps={{
            "aria-label": "Select",
          }}
        >
          {showSearchfield && (
            <ListSubheader
              sx={{
                padding: "8px 16px !important",
                bgcolor: "white !important",
                margin: "0px !important",
              }}
            >
              <TextField
                data-testid="search-select-field"
                size="small"
                placeholder="Search"
                fullWidth
                autoFocus
                onKeyDown={handleKeyDown}
                onChange={(e) => setSearchQuery(e.target.value)}
                InputProps={{
                  sx: {
                    "& input": {
                      fontWeight: 400, // Set font weight
                      fontSize: "15px", // Set font size
                      lineHeight: "26px ", // Set line height
                      color: COLORS.GREY["900"],
                      padding: "10px 14px !important",
                    },
                  },
                }}
                sx={{
                  "& input::placeholder": {
                    color: COLORS.GREY[700],
                    fontWeight: 400, // Set font weight
                    fontSize: "15px", // Set font size
                    lineHeight: "26px", // Set line height
                    opacity: 1,
                  },
                }}
              />
            </ListSubheader>
          )}

          {emptyValueLabel && !showSearchfield && (
            <MenuItem
              disabled={isEmptyDisabled}
              value=""
              sx={{ color: "grey.700" }}
            >
              <em>{emptyValueLabel}</em>
            </MenuItem>
          )}
          {renderMenuGroup}
        </Select>
        {showError ? errorView : null}
      </FormControl>
    );
  }
);

QLSelect.displayName = "QLSelect";
export default React.memo(QLSelect);
