import { CircularProgress, SxProps, Theme } from "@mui/material";
import React, { FC, memo } from "react";

interface LoaderProps {
  sx?: SxProps<Theme>;
}
const Loader: FC<LoaderProps> = ({ sx }) => {
  return <CircularProgress sx={sx} />;
};

export default memo(Loader);
