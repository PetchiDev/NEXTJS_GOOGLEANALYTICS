import { SvgIcon } from "@mui/material";
import React from "react";

const HamburgerIcon = ({ width = 18, height = 12, ...rest }) => {
  return (
    <SvgIcon style={{ width: width, height: height }} {...rest}>
      <svg
        width="20"
        height="14"
        viewBox="0 0 20 14"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M1 7H19M1 1H19M1 13H19"
          stroke="white"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </SvgIcon>
  );
};

export default React.memo(HamburgerIcon);
