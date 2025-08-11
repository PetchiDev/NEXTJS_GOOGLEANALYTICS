import { SvgIcon } from "@mui/material";
import React from "react";
import { COLORS } from "../../theme";

const DrawerAdIcon = ({ width = 24, height = 24, ...rest }) => {
  return (
    <SvgIcon style={{ width: width, height: height }} {...rest}>
      <svg
        width={width}
        height={height}
        viewBox="0 0 29 28"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <circle
          cx="14.333"
          cy="14"
          r="13.3"
          fill={COLORS.SECONDARY.MAIN}
          stroke={COLORS.PRIMARY.MAIN}
          strokeWidth="1.4"
        />
        <path
          d="M14.033 23.2481C13.6463 23.2481 13.333 22.7236 13.333 22.0763V7.17188C13.333 6.52453 13.6463 6 14.033 6C14.4197 6 14.733 6.52453 14.733 7.17188V22.0763C14.733 22.7236 14.4197 23.2481 14.033 23.2481Z"
          fill="white"
        />
        <path
          d="M21.4093 15.4H6.50488C5.85754 15.4 5.33301 15.0867 5.33301 14.7C5.33301 14.3134 5.85754 14 6.50488 14H21.4093C22.0566 14 22.5811 14.3134 22.5811 14.7C22.5811 15.0867 22.0566 15.4 21.4093 15.4Z"
          fill="white"
        />
      </svg>
    </SvgIcon>
  );
};

export default React.memo(DrawerAdIcon);
