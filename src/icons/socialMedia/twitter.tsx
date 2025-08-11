import React from "react";
import { SvgIcon } from "@mui/material";

interface LocationIconProps {
  size?: number;
  isMobile?: boolean;
}

const TwitterIcon = ({ size = 32, isMobile = false }: LocationIconProps) => {
  return (
    <SvgIcon style={{ width: size, height: size }}>
      {isMobile ? (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="33"
          height="32"
          viewBox="0 0 33 32"
        >
          <rect x="0.5" width="32" height="32" rx="16" fill="#A1A1A1" />
          <path
            d="M13.572 24.4402C20.668 24.4402 24.548 18.5602 24.548 13.4642C24.548 13.2962 24.548 13.1282 24.54 12.9682C25.292 12.4242 25.948 11.7442 26.468 10.9682..."
            fill="white"
          />
        </svg>
      ) : (
        <svg
          width={size}
          height={size}
          viewBox="0 0 32 32"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <rect x={2} y={2} width={28} height={28} rx={6} fill="black" />
          <path
            d="M4.48926 22.7568V22.7594L4.57004 22.9784C4.56076 22.9529 4.53074 22.8754 4.48926 22.7568Z"
            fill="#69C9D0"
          />
          <path
            d="M6.86685 6.375L14.0688 16.8746L6.5166 25.625H8.12637L14.7821 17.9135L20.0715 25.625H25.1443L17.6079 14.6386L24.7406 6.375H23.1318L16.8955 13.5997L11.9396 6.375H6.86685Z"
            fill="white"
          />
        </svg>
      )}
    </SvgIcon>
  );
};

export default TwitterIcon;
