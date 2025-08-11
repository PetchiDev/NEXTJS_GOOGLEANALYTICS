import { Components, Theme } from "@mui/material";
import { COLORS } from "./colors";

declare module "@mui/material/Button" {
  interface ButtonPropsVariantOverrides {
    outlinedSecondary: true;
  }
  interface ButtonPropsSizeOverrides {
    xs: true;
    sm: true;
    md: true;
    lg: true;
    xl: true;
    xxl: true;
  }
}

declare module "@mui/material/Chip" {
  interface ChipPropsVariantOverrides {
    greatDeal: true;
    goodDeal: true;
    fairDeal: true;
    filterChip: true;
    showHideChip: true;
    cardChip: true;
    locationFilterChip: true;
  }
}

export const COMPONENTS: Components<Omit<Theme, "components">> | undefined = {
  MuiTypography: {
    defaultProps: {
      variantMapping: {
        h1Semibold: "h1",
        title2Medium: "h1",
        h1Medium: "h1",
        h2Medium: "h2",
        h3Medium: "h3",
        h3Regular: "h3",
        body1Medium: "p",
        body2Medium: "p",
      },
    },
  },
  MuiRadio: {
    defaultProps: {
      sx: {
        color: COLORS.GREY.MEDIUM,
      },
    },
  },
  MuiCheckbox: {
    defaultProps: {
      sx: {
        color: COLORS.GREY.MEDIUM,
        "&.Mui-checked": {
          color: COLORS.PRIMARY.MAIN,
        },
      },
    },
  },
  MuiContainer: {
    defaultProps: {
      maxWidth: "xl",
      disableGutters: true,
    },
  },
  MuiPaper: {
    defaultProps: {
      sx: {
        borderRadius: 0.75,
        border: `1px solid ${COLORS.GREY[200]}`,
        boxShadow: "0px 2px 8px 0px #0000000A",
      },
    },
  },
  MuiButton: {
    styleOverrides: {
      root: {
        fontWeight: 600,
        borderRadius: "6px",
        width: "100%",
        textTransform: "capitalize",
        boxShadow: "none",
      },
      outlinedSecondary: {
        backgroundColor: COLORS.WHITE,
        border: "1px solid",
        borderColor: COLORS.SECONDARY.BUTTON.BG_BORDER,
        color: COLORS.GREY.DARK,
      },
      contained: {
        borderRadius: "4px",
        backgroundColor: COLORS.SECONDARY.MAIN,
        "&:hover": {
          backgroundColor: COLORS.SECONDARY.BUTTON.BTN_HOVER,
          boxShadow: "none",
        },
        "&:focus": {
          background: COLORS.SECONDARY.BUTTON.BTN_HOVER,
          boxShadow:
            "0px 1px 2px 0px rgba(16, 24, 40, 0.05), 0px 0px 0px 4px rgba(146, 42, 99, 0.08)",
        },
      },
      outlined: {
        padding: "4px 16px",
        borderRadius: "6px",
        color: COLORS.SECONDARY.MAIN,
        borderColor: COLORS.SECONDARY.MAIN,
        "&:hover": {
          border: `1px solid ${COLORS.SECONDARY.BUTTON.BTN_HOVER}`,
          boxShadow: "0px 1px 2px 0px rgba(16, 24, 40, 0.05)",
        },
        "&:focus": {
          border: `1px solid ${COLORS.SECONDARY.BUTTON.BTN_HOVER}`,
          boxShadow:
            "0px 1px 2px 0px rgba(16, 24, 40, 0.05), 0px 0px 0px 4px rgba(146, 42, 99, 0.04)",
        },
      },
      text: {
        color: COLORS.SECONDARY.MAIN,
      },
    },
    variants: [
      {
        props: { size: "xs" },
        style: { padding: "6px 10px" },
      },
      {
        props: { size: "sm" },
        style: { padding: "8px 12px" },
      },
      {
        props: { size: "md" },
        style: { padding: "10px 14px" },
      },
      {
        props: { size: "lg" },
        style: { padding: "12px 16px" },
      },
      {
        props: { size: "xl" },
        style: { padding: "14px 18px" },
      },
      {
        props: { size: "xxl" },
        style: { padding: "16px 22px" },
      },
    ],
  },
  MuiTabs: {
    styleOverrides: {
      root: {
        ".Mui-selected": {
          bgcolor: COLORS.WHITE,
          color: COLORS.SECONDARY[900],
        },
        ".MuiTabs-indicator": {
          backgroundColor: COLORS.SECONDARY[900],
        },
      },
    },
  },
  MuiChip: {
    styleOverrides: {
      root: {
        borderRadius: "3.5px",
        fontWeight: 500,
        padding: "6px 6px",
        fontSize: "11px",
      },
    },
    variants: [
      {
        props: { variant: "greatDeal" },
        style: {
          color: COLORS.WHITE,
          backgroundColor: COLORS.GREAT_DEAL,
          border: "none",
        },
      },
      {
        props: { variant: "goodDeal" },
        style: {
          backgroundColor: COLORS.GOOD_DEAL,
          border: "none",
        },
      },
      {
        props: { variant: "fairDeal" },
        style: { backgroundColor: COLORS.FAIR_DEAL, border: "none" },
      },
      {
        props: { variant: "filterChip" },
        style: {
          height: "28px",
          padding: "3px 8px",
          backgroundColor: COLORS.GREY.LIGHT,
          border: "1px solid",
          borderColor: COLORS.SECONDARY.BUTTON.BG_BORDER,
          borderRadius: "6px",
          color: COLORS.GREY[800],
        },
      },
      {
        props: { variant: "showHideChip" },
        style: {
          bgcolor: COLORS.WHITE,
          borderRadius: "6px",
          border: `1px solid ${COLORS.SECONDARY.BUTTON.BG_BORDER}`,
          p: 0,
        },
      },
      {
        props: { variant: "cardChip" },
        style: {
          borderRadius: "3.122px",
          padding: "6px",
          color: COLORS.PRIMARY.MAIN,
          backgroundColor: COLORS.WHITE,
          border: "1px solid",
          borderColor: COLORS.SECONDARY.FORM_INPUTS.CHIP_BORDER,
        },
      },
      {
        props: { variant: "locationFilterChip" },
        style: {
          display: "flex",
          borderRadius: "2px",
          color: COLORS.GREY[800],
          backgroundColor: COLORS.GREY[50],
          border: "1px solid",
          borderColor: COLORS.SECONDARY.BUTTON.BG_BORDER,
          padding: "2px 4px 2px 9px",
          height: 24,
          fontSize: "13px",
          fontStyle: "normal",
          fontWeight: 500,
          lineHeight: "26px",
        },
      },
    ],
  },
  MuiPagination: {
    styleOverrides: {
      root: {
        "& .MuiPaginationItem-root": {
          color: COLORS.SECONDARY.FORM_INPUTS.FORM_ICONS_AND_BREADCRUMBS,
          height: 40,
          width: 40,
        },
        "& .MuiPaginationItem-root.Mui-selected": {
          backgroundColor: COLORS.WHITE,
          color: COLORS.GREY[900],
        },
      },
    },
  },
  MuiFormHelperText: {
    defaultProps: {
      variant: "outlined",
      sx: {
        fontSize: 12,
        color: COLORS.RED[100],
        marginY: 0,
        padding: "2px 0px",
        lineHeight: 1,
      },
    },
  },
  MuiFab: {
    styleOverrides: {
      root: {
        width: "40px",
        height: "40px",
        padding: "4px",
        borderRadius: "2px",
        backgroundColor: COLORS.PRIMARY.MAIN,
        "&:hover": {
          backgroundColor: COLORS.PRIMARY.MAIN,
        },
        color: COLORS.WHITE,
      },
    },
  },

  MuiToggleButton: {
    styleOverrides: {
      root: {
        textTransform: "none",
        transition: "background-color 0.3s ease, color 0.3s ease",
        "&.Mui-selected": {
          backgroundColor: COLORS.PRIMARY.MAIN + " !important",
          border: "none",
          color: COLORS.WHITE + " !important",
        },
        "&:not(.Mui-selected)": {
          borderColor: COLORS.SECONDARY.BUTTON.BG_BORDER + " !important",
          backgroundColor: COLORS.WHITE + " !important",
          color: COLORS.PRIMARY.MAIN + " !important",
        },
      },
    },
  },
  MuiDrawer: {
    styleOverrides: {
      root: {
        display: "flex",
        flexDirection: "column",
      },
      paper: {
        borderRadius: "8px 8px 0px 0px",
        paddingTop: 16,
      },
    },
  },
  MuiPopper: {
    styleOverrides: {
      root: {
        width: "auto",
      },
    },
  },
  MuiAutocomplete: {
    styleOverrides: {
      root: {
        borderRadius: "4px",
        flex: 2,
        backgroundColor: COLORS.WHITE,
        border: "none",
        "& .MuiFormControl-root": {
          borderRadius: "4px",
          boxShadow: "0px 1px 2px 0px rgba(16, 24, 40, 0.05)",
          border: "none",
          height: "100%",
        },
        "& .MuiInputBase-root": {
          height: "100%",
          border: "none",
          padding: "7px 14px",
        },
        "& .MuiInputBase-input": {
          padding: "0 !important",
        },
      },
    },
  },
  MuiTooltip: {
    styleOverrides: {
      tooltip: {
        padding: "8px",
        typography: "caption1Regular",
        borderRadius: "4px",
        opacity: 0.99,
        backgroundColor: COLORS.GREY[800],
        boxShadow: "0px 2px 8px 0px rgba(0, 0, 0, 0.04)",
      },
    },
  },
  MuiFormControl: {
    styleOverrides: {
      root: {
        "& .MuiOutlinedInput-root": {
          "&:not(.Mui-disabled):hover .MuiOutlinedInput-notchedOutline": {
            borderColor: COLORS.PRIMARY[900],
          },
        },
      },
    },
  },
  MuiTextField: {
    styleOverrides: {
      root: {
        "&:not(.Mui-disabled):hover": {
          borderColor: `${COLORS.PRIMARY[900]} !important`,
        },
      },
    },
  },
  MuiOutlinedInput: {
    styleOverrides: {
      root: {
        "&:not(.Mui-disabled):hover": {
          borderColor: `${COLORS.PRIMARY[900]} !important`,
        },
      },
    },
  },
};
