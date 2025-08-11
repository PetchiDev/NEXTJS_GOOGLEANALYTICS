import {
  MenuProps,
  SxProps,
  Theme,
  inputBaseClasses,
  inputLabelClasses,
  listItemIconClasses,
  listItemTextClasses,
  listSubheaderClasses,
  menuClasses,
  menuItemClasses,
  selectClasses,
  typographyClasses,
} from "@mui/material";
import { COLORS } from "../../theme";

const InputLabelSx: SxProps<Theme> = {
  [`&.${inputLabelClasses.formControl}.${inputLabelClasses.focused}`]: {
    top: 15,
  },
  [`&.${inputLabelClasses.formControl}.${inputLabelClasses.shrink}`]: {
    top: 15,
    [`& .${typographyClasses.root}`]: {
      color: "grey.700",
      [`& .${typographyClasses.root}`]: {
        fontSize: 12,
        color: "grey.700",
      },
    },
    [`&.${inputLabelClasses.focused} .${typographyClasses.root}`]: {
      color: "primary.main",
    },
    [`&.${inputLabelClasses.disabled}`]: {
      color: COLORS.SECONDARY.BUTTON.BUTTON_DISABLED_TEXT,
      [`& .${typographyClasses.root}`]: {
        color: COLORS.SECONDARY.BUTTON.BUTTON_DISABLED_TEXT,
      },
    },
  },
};

const selectSx = (label = true): SxProps<Theme> => ({
  backgroundColor: "background.paper",
  color: "grey.600",
  [`& .${selectClasses.select}`]: {
    ...(label && { paddingTop: "24px", paddingBottom: "6px" }),
    typography: "h3Regular",
  },
  ...(label && {
    [`&.${inputBaseClasses.formControl} .${selectClasses.icon}`]: label && {
      top: 25,
    },
  }),
});

const menuProps: Partial<MenuProps> = {
  PaperProps: {
    style: {
      maxHeight: 48 * 5.3,
      width: 1,
      borderRadius: "6px",
    },
  },
  sx: {
    [`& .${menuClasses.list}`]: {
      "& li": {
        paddingRight: 0,
        paddingLeft: 1,
        marginLeft: 1 / 2,
        marginRight: 1 / 2,
      },
      [`& .${listSubheaderClasses.root}`]: {
        typography: "h3Medium",
        mx: 1,
        my: 0.5,
        backgroundColor: "grey.100",
        borderRadius: 0,
        color: "grey.800",
      },
      [`& .${listItemTextClasses.primary}`]: {
        color: "grey.900",
      },
      [`& .${listItemIconClasses.root}`]: {
        minWidth: 25,
      },
      [`& li, .${listItemTextClasses.primary}`]: {
        typography: "h3Regular",
        lineHeight: "normal",
        borderRadius: 3 / 2,
        [`&.${menuItemClasses.selected}`]: {
          backgroundColor: "grey.150",
          "&:hover": {
            backgroundColor: "grey.100",
          },
        },
      },
    },
  },
};

export { InputLabelSx, menuProps, selectSx };
