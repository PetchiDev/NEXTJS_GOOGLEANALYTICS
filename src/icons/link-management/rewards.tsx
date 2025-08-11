import { SvgIcon } from "@mui/material";
import React from "react";
import { IconProps } from "../../types";
import { COLORS } from "../../theme/colors";

const DashboardRewardsIcon: React.FC<IconProps> = ({
  width = 24,
  height = 24,
  color = COLORS.GREY[700],
}) => {
  return (
    <SvgIcon sx={{ width, height, color }}>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="16"
        height="17"
        viewBox="0 0 16 17"
        fill="none"
      >
        <path
          d="M4.00004 6.50033H3.00004C2.55801 6.50033 2.13409 6.32473 1.82153 6.01217C1.50897 5.69961 1.33337 5.27569 1.33337 4.83366C1.33337 4.39163 1.50897 3.96771 1.82153 3.65515C2.13409 3.34259 2.55801 3.16699 3.00004 3.16699H4.00004"
          stroke="currentColor"
          strokeWidth="1.33333"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M12 6.50033H13C13.442 6.50033 13.866 6.32473 14.1785 6.01217C14.4911 5.69961 14.6667 5.27569 14.6667 4.83366C14.6667 4.39163 14.4911 3.96771 14.1785 3.65515C13.866 3.34259 13.442 3.16699 13 3.16699H12"
          stroke="currentColor"
          strokeWidth="1.33333"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M2.66846 15.167H13.3351"
          stroke="currentColor"
          strokeWidth="1.33333"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M6.66846 10.2734V11.8334C6.66846 12.2001 6.35512 12.4868 6.02179 12.6401C5.23512 13.0001 4.66846 13.9934 4.66846 15.1668"
          stroke="currentColor"
          strokeWidth="1.33333"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M9.33337 10.2734V11.8334C9.33337 12.2001 9.64671 12.4868 9.98004 12.6401C10.7667 13.0001 11.3334 13.9934 11.3334 15.1668"
          stroke="currentColor"
          strokeWidth="1.33333"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M12 1.83301H4V6.49967C4 7.56054 4.42143 8.57796 5.17157 9.3281C5.92172 10.0782 6.93913 10.4997 8 10.4997C9.06087 10.4997 10.0783 10.0782 10.8284 9.3281C11.5786 8.57796 12 7.56054 12 6.49967V1.83301Z"
          stroke="currentColor"
          strokeWidth="1.33333"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </SvgIcon>
  );
};

export default DashboardRewardsIcon;
