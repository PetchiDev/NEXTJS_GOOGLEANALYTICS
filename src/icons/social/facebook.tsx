import React from "react";
import { SvgIcon } from "@mui/material";
import { COLORS } from "../../theme";
interface LocationIconProps {
  size?: number;
  isMobile?: boolean;
}
const FaceBookIcon = ({ size = 32, isMobile = false }: LocationIconProps) => {
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
            d="M22.7281 20.625L23.4375 16H19V13C19 11.7344 19.6188 10.5 21.6063 10.5H23.625V6.5625C23.625 6.5625 21.7938 6.25 20.0438 6.25C16.3875 6.25 14 8.46563 14 12.475V16H9.9375V20.625H14V31.8062C14.8156 31.9344 15.65 32 16.5 32C17.35 32 18.1844 31.9344 19 31.8062V20.625H22.7281Z"
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
          <g id="Facebook">
            <path
              id="Vector"
              d="M19.9476 16.932L20.3883 14.0583H17.6311V12.1942C17.6311 11.4078 18.0155 10.6408 19.2505 10.6408H20.5049V8.19417C20.5049 8.19417 19.367 8 18.2796 8C16.0078 8 14.5243 9.3767 14.5243 11.868V14.0583H12V16.932H14.5243V23.8796C15.0311 23.9592 15.5495 24 16.0777 24C16.6058 24 17.1243 23.9592 17.6311 23.8796V16.932H19.9476Z"
              fill={COLORS.WHITE}
            />
          </g>
        </svg>
      )}
    </SvgIcon>
  );
};

export default FaceBookIcon;
