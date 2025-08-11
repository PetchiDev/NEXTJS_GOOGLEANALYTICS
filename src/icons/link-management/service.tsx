import { COLORS } from "../../theme";
import { SvgIcon } from "@mui/material";
import React from "react";
import { IconProps } from "./properties";

const DashboardServiceIcon: React.FC<IconProps> = ({
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
          d="M15.3002 6.29998C15.117 6.48691 15.0143 6.73823 15.0143 6.99998C15.0143 7.26173 15.117 7.51305 15.3002 7.69998L16.9002 9.29998C17.0871 9.48321 17.3384 9.58584 17.6002 9.58584C17.8619 9.58584 18.1133 9.48321 18.3002 9.29998L22.0702 5.52998C22.573 6.64117 22.7253 7.87921 22.5067 9.07913C22.288 10.279 21.7089 11.3838 20.8465 12.2463C19.984 13.1087 18.8793 13.6878 17.6793 13.9064C16.4794 14.1251 15.2414 13.9728 14.1302 13.47L7.2202 20.38C6.82237 20.7778 6.28281 21.0013 5.7202 21.0013C5.15759 21.0013 4.61802 20.7778 4.2202 20.38C3.82237 19.9822 3.59888 19.4426 3.59888 18.88C3.59888 18.3174 3.82237 17.7778 4.2202 17.38L11.1302 10.47C10.6274 9.35879 10.4751 8.12075 10.6937 6.92084C10.9124 5.72092 11.4915 4.61614 12.3539 3.7537C13.2164 2.89127 14.3211 2.31215 15.5211 2.09352C16.721 1.8749 17.959 2.02714 19.0702 2.52998L15.3102 6.28998L15.3002 6.29998Z"
          stroke="#646464"
          strokeWidth={strokeWeight}
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </SvgIcon>
  );
};

export default DashboardServiceIcon;
