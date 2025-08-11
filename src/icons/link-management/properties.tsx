import { SvgIcon } from "@mui/material";
import React from "react";
import { COLORS } from "../../theme";

export interface IconProps {
  width?: string | number;
  height?: string | number;
  color?: string;
  strokeWeight?: string;
  className?: string;
}

const DashboardPropertiesIcon: React.FC<IconProps> = ({
  width = 24,
  height = 24,
  color = COLORS.GREY[700],
  strokeWeight = "1.5",
}) => {
  return (
    <SvgIcon sx={{ width, height, color }}>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="25"
        height="24"
        viewBox="0 0 25 24"
        fill="none"
      >
        <path
          d="M3.80005 9.99997C3.79998 9.70904 3.86338 9.42159 3.98584 9.15768C4.10829 8.89378 4.28685 8.65976 4.50905 8.47197L11.509 2.47297C11.87 2.16788 12.3274 2.00049 12.8 2.00049C13.2727 2.00049 13.7301 2.16788 14.091 2.47297L21.091 8.47197C21.3133 8.65976 21.4918 8.89378 21.6143 9.15768C21.7367 9.42159 21.8001 9.70904 21.8 9.99997V19C21.8 19.5304 21.5893 20.0391 21.2143 20.4142C20.8392 20.7893 20.3305 21 19.8 21H5.80005C5.26962 21 4.76091 20.7893 4.38584 20.4142C4.01076 20.0391 3.80005 19.5304 3.80005 19V9.99997Z"
          stroke="#646464"
          strokeWidth={strokeWeight}
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </SvgIcon>
  );
};

export default DashboardPropertiesIcon;
