import { useMediaQuery } from "@mui/material";
import { useMemo } from "react";
import { theme } from "../theme";

export const useBreakpoints = () => {
  const isXs = useMediaQuery(() => theme.breakpoints.only("xs"));
  const isSm = useMediaQuery(() => theme.breakpoints.only("sm"));
  const isMd = useMediaQuery(() => theme.breakpoints.only("md"));
  const isLg = useMediaQuery(() => theme.breakpoints.only("lg"));
  const isXl = useMediaQuery(() => theme.breakpoints.only("xl"));
  const isXxl = useMediaQuery(() => theme.breakpoints.only("xxl"));
  const isBreakpointsLoading = useMemo(
    () => !isXs && !isSm && !isMd && !isLg && !isXl && !isXxl,
    [isLg, isMd, isSm, isXl, isXs, isXxl]
  );
  return {
    isXs,
    isSm,
    isMd,
    isLg,
    isXl,
    isXxl,
    isBreakpointsLoading,
  };
};
