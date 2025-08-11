import React from "react";
import { SvgIcon } from "@mui/material";
import { COLORS } from "../../theme";
interface LocationIconProps {
  size?: number;
  isMobile?: boolean;
}
const TickTokIcon = ({ size = 32, isMobile }: LocationIconProps) => {
  return (
    <SvgIcon style={{ width: size, height: size }}>
      {isMobile ? (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="33"
          height="32"
          viewBox="0 0 33 32"
          fill="none"
        >
          <rect x="0.5" width="32" height="32" rx="16" fill="#A1A1A1" />
          <path
            d="M21.6049 4.7998H17.6589V20.0578C17.6589 21.8758 16.1412 23.3691 14.2525 23.3691C12.3638 23.3691 10.8461 21.8758 10.8461 20.0578C10.8461 18.2723 12.33 16.8114 14.1513 16.7465V12.9158C10.1378 12.9807 6.90002 16.1297 6.90002 20.0578C6.90002 24.0184 10.2053 27.1998 14.2862 27.1998C18.3671 27.1998 21.6723 23.9859 21.6723 20.0578V12.234C23.1563 13.2729 24.9776 13.8897 26.9 13.9221V10.0914C23.9321 9.99401 21.6049 7.65661 21.6049 4.7998Z"
            fill="white"
          />
        </svg>
      ) : (
        <svg
          width={size}
          height={size}
          viewBox="0 0 33 32"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <g id="TikTok">
            <path
              id="Vector"
              d="M19.7639 7H16.6071V19.2064C16.6071 20.6608 15.3929 21.8554 13.882 21.8554C12.371 21.8554 11.1568 20.6608 11.1568 19.2064C11.1568 17.778 12.344 16.6093 13.801 16.5573V13.4928C10.5902 13.5447 8 16.0639 8 19.2064C8 22.3749 10.6442 24.92 13.909 24.92C17.1737 24.92 19.8179 22.3489 19.8179 19.2064V12.9473C21.0051 13.7784 22.462 14.2719 24 14.2979V11.2333C21.6257 11.1554 19.7639 9.28545 19.7639 7Z"
              fill={COLORS.WHITE}
            />
          </g>
        </svg>
      )}
    </SvgIcon>
  );
};

export default TickTokIcon;
