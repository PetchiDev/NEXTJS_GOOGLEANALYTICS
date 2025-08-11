import React from "react";
import { SvgIcon } from "@mui/material";

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
          // fill="none"
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
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
          // fill="none"
        >
          <path
            fill="#3B5998"
            fillRule="evenodd"
            d="M23.00025,0 L1.0005,0 C0.44775,0 0,0.44775 0,0.99975 L0,23.00025 C0,23.55225 0.44775,24 1.0005,24 L12.75,24 L12.75,15 L9.75,15 L9.75,11.25 L12.75,11.25 L12.75,8.25 C12.75,5.15025 14.71275,3.62475 17.478,3.62475 C18.8025,3.62475 19.941,3.72375 20.2725,3.76725 L20.2725,7.00725 L18.35475,7.008 C16.851,7.008 16.5,7.72275 16.5,8.77125 L16.5,11.25 L20.25,11.25 L19.5,15 L16.5,15 L16.56,24 L23.00025,24 C23.55225,24 24,23.55225 24,23.00025 L24,0.99975 C24,0.44775 23.55225,0 23.00025,0"
          />
        </svg>
      )}
    </SvgIcon>
  );
};

export default FaceBookIcon;
