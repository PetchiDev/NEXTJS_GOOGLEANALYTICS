"use client";
import { Grid, SxProps, Theme } from "@mui/material";
import React, { ReactNode, memo, useMemo } from "react";
import Loader from "../loading";
import { useBreakpoints } from "../../hooks";
interface CheckDeviceProps {
  checkIsXs?: boolean;
  checkIsSm?: boolean;
  checkIsMd?: boolean;
  checkIsLg?: boolean;
  checkIsXl?: boolean;
  checkIsXxl?: boolean;
  children: ReactNode;
  height?: number;
  loaderGridSx?: SxProps<Theme>;
  customLoader?: ReactNode; // this will be a custom loader
  hideLoader?: boolean;
}

const CheckDevice = ({
  checkIsXs = true,
  checkIsSm = true,
  checkIsMd = true,
  checkIsLg = true,
  checkIsXl = true,
  checkIsXxl = true,
  children,
  height,
  loaderGridSx,
  customLoader = <Loader />, // this will be a custom/skeleton loader
  hideLoader = false,
}: CheckDeviceProps) => {
  const { isXs, isSm, isMd, isLg, isXl, isXxl, isBreakpointsLoading } =
    useBreakpoints();
  const shouldRender = useMemo(() => {
    // Array of conditions to check
    const conditions = [
      { condition: checkIsXs, value: isXs },
      { condition: checkIsSm, value: isSm },
      { condition: checkIsMd, value: isMd },
      { condition: checkIsLg, value: isLg },
      { condition: checkIsXl, value: isXl },
      { condition: checkIsXxl, value: isXxl },
    ];
    return conditions.some(
      ({ condition, value }) => condition === true && value === true
    );
  }, [
    checkIsLg,
    checkIsMd,
    checkIsSm,
    checkIsXl,
    checkIsXs,
    checkIsXxl,
    isLg,
    isMd,
    isSm,
    isXl,
    isXs,
    isXxl,
  ]);

  if (isBreakpointsLoading) {
    return (
      <>
        {hideLoader ? null : (
          <Grid
            item
            textAlign={"center"}
            mt={1}
            sx={{ height, ...loaderGridSx }}
          >
            {customLoader}
          </Grid>
        )}
      </>
    );
  }

  // Check if any of the conditions are true
  return shouldRender ? children : null;
};

export default memo(CheckDevice);
