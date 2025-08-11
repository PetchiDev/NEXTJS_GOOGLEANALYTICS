"use client";
import {
  SxProps,
  Theme,
  inputLabelClasses,
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

export { InputLabelSx };
