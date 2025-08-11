import ExpandLessRoundedIcon from "@mui/icons-material/ExpandLessRounded";
import ExpandMoreRoundedIcon from "@mui/icons-material/ExpandMoreRounded";
import {
  Box,
  FormControl,
  IconButton,
  InputLabel,
  Typography,
} from "@mui/material";
import React, { ForwardedRef, memo, useMemo } from "react";
import { COLORS } from "../../theme";
import { InputLabelSx } from "./drop-down.styles";

interface DropDownProps {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  inputValue?: string | string[] | null;
  error?: string;
  label?: string;
  labelSuffix?: string;
  placeHolder?: string;
  haveOptions?: boolean;
  hideOverflow?: boolean;
  disabled?: boolean;
  agentAgencyPage?: boolean;
}

const hideOverflowStyles = {
  whiteSpace: "nowrap",
  overflow: "hidden",
  textOverflow: "ellipsis",
  maxWidth: "100%",
};

const CustomDropDown = React.forwardRef<HTMLButtonElement, DropDownProps>(
  (
    {
      open,
      setOpen,
      inputValue = "",
      error = "",
      label = "",
      labelSuffix = "",
      placeHolder = "",
      haveOptions = false,
      hideOverflow = false,
      disabled,
      agentAgencyPage = false,
    }: DropDownProps,
    ref: ForwardedRef<HTMLButtonElement>
  ) => {
    const handleOpen = () => {
      if (disabled) return;
      setOpen(!open);
    };

    const titleView = useMemo(() => {
      if (label) {
        return (
          <InputLabel
            id="dropdown-label"
            variant="outlined"
            shrink={true}
            sx={{ ...InputLabelSx }}
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

    return (
      <FormControl
        id={"form-control"}
        fullWidth
        error={Boolean(error?.trim())}
        onClick={handleOpen}
        sx={{
          cursor: haveOptions ? "pointer" : "auto",
          height: agentAgencyPage ? "100%" : undefined,
        }}
      >
        {titleView}
        <Box
          ref={ref}
          sx={{
            display: "flex",
            alignItems: "center",
            position: "relative",
            backgroundColor: disabled
              ? "rgba(0, 0, 0, 0.12)"
              : "background.paper",
            borderWidth: open ? (agentAgencyPage ? "1px" : "2px") : "1px",
            borderColor: open ? "primary.main" : "rgba(0, 0, 0, 0.12)",
            height: "100%",
            padding: "0px 8px 6px 12px",
            borderRadius: agentAgencyPage ? "6px" : "4px",
            "&:hover": {
              backgroundColor: disabled
                ? "rgba(0, 0, 0, 0.12)"
                : "background.paper",
              border: disabled
                ? `1px solid rgba(0, 0, 0, 0.12)`
                : `1px solid ${COLORS.PRIMARY.MAIN}`,
            },
          }}
        >
          <Typography
            variant="h3Regular"
            marginTop={"20px"}
            sx={{
              marginRight: "8px",
              color: agentAgencyPage
                ? inputValue
                  ? COLORS.GREY[900]
                  : COLORS.GREY[700]
                : haveOptions
                  ? "black"
                  : COLORS.GREY[700],
              ...(hideOverflow && hideOverflowStyles),
            }}
          >
            {inputValue || placeHolder}
          </Typography>
          <IconButton
            onClick={handleOpen}
            disableRipple
            sx={{
              transform: "none",
              padding: "0px",
              marginTop: "21px",
              marginLeft: "auto",
              "&:hover": { backgroundColor: "transparent" },
              ".MuiSvgIcon-root ": {
                fill: haveOptions
                  ? COLORS.GREY.GREYISH_BLUE
                  : COLORS.SECONDARY.BUTTON.BUTTON_DISABLED_TEXT,
              },
            }}
            disabled={disabled}
          >
            {open ? <ExpandLessRoundedIcon /> : <ExpandMoreRoundedIcon />}
          </IconButton>
        </Box>
      </FormControl>
    );
  }
);

CustomDropDown.displayName = "CustomDropDown";

export default memo(CustomDropDown);
