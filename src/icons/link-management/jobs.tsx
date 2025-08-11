import { COLORS } from "../../theme";
import { SvgIcon } from "@mui/material";
import React from "react";
import { IconProps } from "./properties";

const DashboardJobsIcon: React.FC<IconProps> = ({
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
          d="M12.2 12H12.2116"
          stroke="#646464"
          strokeWidth={strokeWeight}
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M16.2 6V4C16.2 3.46957 15.9892 2.96086 15.6142 2.58579C15.2391 2.21071 14.7304 2 14.2 2H10.2C9.66952 2 9.16081 2.21071 8.78574 2.58579C8.41067 2.96086 8.19995 3.46957 8.19995 4V6"
          stroke="#646464"
          strokeWidth={strokeWeight}
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M22.2 13C19.2327 14.959 15.7555 16.0033 12.2 16.0033C8.6444 16.0033 5.16716 14.959 2.19995 13"
          stroke="#646464"
          strokeWidth={strokeWeight}
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M20.2 6H4.19995C3.09538 6 2.19995 6.89543 2.19995 8V18C2.19995 19.1046 3.09538 20 4.19995 20H20.2C21.3045 20 22.2 19.1046 22.2 18V8C22.2 6.89543 21.3045 6 20.2 6Z"
          stroke="#646464"
          strokeWidth={strokeWeight}
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </SvgIcon>
  );
};

export default DashboardJobsIcon;
