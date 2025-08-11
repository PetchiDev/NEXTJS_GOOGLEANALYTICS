import React from "react";
import { SvgIcon } from "@mui/material";

interface LocationIconProps {
  size?: number;
  isMobile?: boolean;
}

const CopyIcon = ({ size = 32, isMobile = false }: LocationIconProps) => {
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
            d="M13.572 24.4402C20.668 24.4402 24.548 18.5602 24.548 13.4642..."
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
          <rect
            x={2.75}
            y={2.75}
            width={26.5}
            height={26.5}
            rx={5.25}
            stroke="#FF7F38"
            strokeWidth={1.5}
          />
          <path
            d="M4.48926 22.7568V22.7594L4.57004 22.9784C4.56076 22.9529 4.53074 22.8754 4.48926 22.7568Z"
            fill="white"
          />
          <g clipPath="url(#clip0)">
            <path
              d="M22.6665 12.6667H14.3332C13.4127 12.6667 12.6665 13.4129 12.6665 14.3334V22.6667C12.6665 23.5872 13.4127 24.3334 14.3332 24.3334H22.6665C23.587 24.3334 24.3332 23.5872 24.3332 22.6667V14.3334C24.3332 13.4129 23.587 12.6667 22.6665 12.6667Z"
              stroke="#FF7F38"
              strokeWidth={1.5}
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M9.33317 19.3334C8.4165 19.3334 7.6665 18.5834 7.6665 17.6667V9.33341C7.6665 8.41675 8.4165 7.66675 9.33317 7.66675H17.6665C18.5832 7.66675 19.3332 8.41675 19.3332 9.33341"
              stroke="#FF7F38"
              strokeWidth={1.5}
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </g>
          <defs>
            <clipPath id="clip0">
              <rect width={20} height={20} fill="white" transform="translate(6 6)" />
            </clipPath>
          </defs>
        </svg>
      )}
    </SvgIcon>
  );
};

export default CopyIcon;
