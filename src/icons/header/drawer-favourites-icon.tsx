import { SvgIcon } from "@mui/material";
import React from "react";

const DrawerFavoriteIcon = ({ width = 16.6, height = 15, ...rest }) => {
  return (
    <SvgIcon style={{ width: width, height: height }} {...rest}>
      <svg
        width="19"
        height="18"
        viewBox="0 0 19 18"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M12.7593 1.5C15.6944 1.5 17.6667 4.29375 17.6667 6.9C17.6667 12.1781 9.48148 16.5 9.33333 16.5C9.18519 16.5 1 12.1781 1 6.9C1 4.29375 2.97222 1.5 5.90741 1.5C7.59259 1.5 8.69445 2.35312 9.33333 3.10312C9.97222 2.35312 11.0741 1.5 12.7593 1.5Z"
          stroke="white"
          strokeWidth="1.67"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </SvgIcon>
  );
};

export default React.memo(DrawerFavoriteIcon);
