import { SxProps, Theme } from "@mui/material";
import Box from "@mui/material/Box";
import CircularProgress, {
  CircularProgressProps,
} from "@mui/material/CircularProgress";
import React, { memo } from "react";
import { COLORS } from "../../theme";

interface CircularProgressWithLabelProps extends CircularProgressProps {
  value: number;
  sx?: SxProps<Theme>;
}

interface ProgressLoaderProps {
  progress: number;
  sx?: SxProps<Theme>;
  thickness?: number;
  size?: number;
}

const CircularProgressWithLabel = (props: CircularProgressWithLabelProps) => {
  return (
    <Box sx={{ position: "relative", display: "inline-flex", ...props.sx }}>
      <CircularProgress
        variant="determinate"
        value={100}
        sx={{
          color: COLORS.WHITE,
          position: "absolute",
          left: 0,
        }}
        size={props.size}
        thickness={props.thickness}
      />
      <CircularProgress
        variant="determinate"
        {...props}
        sx={{
          color: "primary.main",
        }}
        size={props.size}
        thickness={props.thickness}
      />
    </Box>
  );
};

const ProgressLoader = ({
  progress,
  thickness = 4,
  size = 40,
  sx,
}: ProgressLoaderProps) => {
  return (
    <CircularProgressWithLabel
      value={progress}
      sx={sx}
      thickness={thickness}
      size={size}
    />
  );
};

export default memo(ProgressLoader);
