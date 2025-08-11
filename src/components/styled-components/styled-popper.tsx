"use client";

import { Popper, styled } from "@mui/material";
import { COLORS } from "../../theme/colors";

export const StyledPopper = styled(Popper)(({ theme }) => ({
  zIndex: 2,
  overflowY: "auto",
  overflowX: "hidden",
  borderRadius: "6px",
  paddingTop: theme.spacing("2px"),
  boxShadow: "0px 2px 6px 0px rgba(0, 0, 0, 0.10) ",
  ".MuiPaper-root": {
    borderRadius: "6px",
    border: `1px solid ${theme.palette.grey[300]}`,
    backgroundColor: COLORS.WHITE,
  },
  "&::-webkit-scrollbar": {
    width: 0,
    height: 0,
  },
  msOverflowStyle: "none",
  scrollbarWidth: "none",

  ".MuiList-root": {
    padding: theme.spacing(1.5),
  },
}));
