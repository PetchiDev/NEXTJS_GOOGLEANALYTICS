"use client";

import Tab, { tabClasses } from "@mui/material/Tab";
import Tabs, { tabsClasses } from "@mui/material/Tabs";
import { styled } from "@mui/material/styles";
import { COLORS } from "../../theme/colors";

export const StyledTabs = styled(Tabs)(({ theme }) => ({
  [`&.${tabsClasses.root} `]: {
    padding: theme.spacing(1),
    backgroundColor: theme.palette.background.paper,
    boxShadow: theme.shadows[6],
    borderRadius: theme.shape.borderRadius * 1.5,

    "& .Mui-selected": {
      [`.${tabsClasses.indicator}`]: {
        zIndex: -1,
      },
    },

    [`.${tabsClasses.indicator}`]: {
      height: "100%",
      borderRadius: "6px",
      backgroundColor: COLORS.SECONDARY[900],
    },
  },

  [`&.${tabsClasses.flexContainer}`]: {
    zIndex: 0,
  },
}));

export const StyledTab = styled(Tab)(({ theme }) => ({
  [`&.${tabClasses.root}`]: {
    minWidth: "fit-content",
    flex: 1,
    minHeight: 44,
  },
  [`&.${tabClasses.labelIcon}, &.${tabClasses.textColorPrimary}`]: {
    color: COLORS.BLACK,
    ...theme.typography.body2SmallSemibold,
    lineHeight: "normal",
    textTransform: "none",
  },
  [`&.${tabClasses.selected}`]: {
    color: theme.palette.primary.contrastText,
    zIndex: 1,
    borderRadius: theme.shape.borderRadius * 1.5,
  },
}));
