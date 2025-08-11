import React from 'react';

interface CopyIconProps {
  width?: number;
  height?: number;
  color?: string;
  isMobile?: boolean;
}

const CopyIcon: React.FC<CopyIconProps> = ({ 
  width = 24, 
  height = 24, 
  color = "currentColor" 
}) => {
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M16 1H4C3 1 2 2 2 3V17H4V3H16V1ZM19 5H8C7 5 6 6 6 7V21C6 22 7 23 8 23H19C20 23 21 22 21 21V7C21 6 20 5 19 5ZM19 21H8V7H19V21Z"
        fill={color}
      />
    </svg>
  );
};

export default CopyIcon; 