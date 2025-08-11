import { SvgIcon } from "@mui/material";
import React from "react";

const SuccessIcon = ({ size = 24, ...rest }) => (
  <SvgIcon style={{ width: size, height: size }} {...rest}>
    <svg
      width="48"
      height="48"
      viewBox="0 0 48 48"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M0 24C0 10.7452 10.7452 0 24 0C37.2548 0 48 10.7452 48 24C48 37.2548 37.2548 48 24 48C10.7452 48 0 37.2548 0 24Z"
        fill="#DCFAE6"
      />
      <path
        d="M19.5 24L22.5 27L28.5 21M34 24C34 29.5228 29.5228 34 24 34C18.4772 34 14 29.5228 14 24C14 18.4772 18.4772 14 24 14C29.5228 14 34 18.4772 34 24Z"
        stroke="#079455"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  </SvgIcon>
);
export default React.memo(SuccessIcon);
