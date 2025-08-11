import { SvgIcon } from "@mui/material";
import React from "react";

const ScrollToTop = ({ size = 40, ...rest }) => {
  return (
    <SvgIcon style={{ width: size, height: size }} {...rest}>
      <svg
        width="44"
        height="44"
        viewBox="0 0 44 44"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <rect x="2" y="2" width="40" height="40" rx="2" fill="#0A426B" />
        <path
          d="M11 27.5L22 16.5L33 27.5"
          stroke="white"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </SvgIcon>
  );
};

export default React.memo(ScrollToTop);
