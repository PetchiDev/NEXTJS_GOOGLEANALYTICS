"use client";

import { createTheme } from "@mui/material/styles";
import { BREAKPOINTS } from "./breakpoints";
import { COMPONENTS } from "./components";
import { PALETTE } from "./palette";
import { TYPOGRAPHY } from "./typography";

export * from './colors'
export * from './typography'

export const theme = createTheme({
  typography: TYPOGRAPHY,
  palette: PALETTE,
  components: COMPONENTS,
  breakpoints: BREAKPOINTS,
});
