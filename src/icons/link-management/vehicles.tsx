import { COLORS } from "../../theme";
import { SvgIcon } from "@mui/material";
import React from "react";
import { IconProps } from "./properties";

const DashboardVehicleIcon: React.FC<IconProps> = ({
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
          d="M19.4001 17H21.4001C22.0001 17 22.4001 16.6 22.4001 16V13C22.4001 12.1 21.7001 11.3 20.9001 11.1C19.1001 10.6 16.4001 10 16.4001 10C16.4001 10 15.1001 8.6 14.2001 7.7C13.7001 7.3 13.1001 7 12.4001 7H5.40015C4.80015 7 4.30015 7.4 4.00015 7.9L2.60015 10.8C2.46773 11.1862 2.40015 11.5917 2.40015 12V16C2.40015 16.6 2.80015 17 3.40015 17H5.40015"
          stroke="#646464"
          strokeWidth={strokeWeight}
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M7.40015 19C8.50472 19 9.40015 18.1046 9.40015 17C9.40015 15.8954 8.50472 15 7.40015 15C6.29558 15 5.40015 15.8954 5.40015 17C5.40015 18.1046 6.29558 19 7.40015 19Z"
          stroke="#646464"
          strokeWidth={strokeWeight}
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M9.40015 17H15.4001"
          stroke="#646464"
          strokeWidth={strokeWeight}
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M17.4001 19C18.5047 19 19.4001 18.1046 19.4001 17C19.4001 15.8954 18.5047 15 17.4001 15C16.2956 15 15.4001 15.8954 15.4001 17C15.4001 18.1046 16.2956 19 17.4001 19Z"
          stroke="#646464"
          strokeWidth={strokeWeight}
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </SvgIcon>
  );
};

export default DashboardVehicleIcon;
