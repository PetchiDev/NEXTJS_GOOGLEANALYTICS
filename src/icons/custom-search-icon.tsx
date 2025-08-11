"use client";
import React from "react";
import { createSvgIcon } from "@mui/material";

const CustomSearchIcon = createSvgIcon(
  <svg
    width="20"
    height="21"
    viewBox="0 0 20 21"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    stroke="currentColor"
  >
    <path
      id="Icon"
      d="M19 19.5L15.5001 16M18 10C18 14.6944 14.1944 18.5 9.5 18.5C4.80558 18.5 1 14.6944 1 10C1 5.30558 4.80558 1.5 9.5 1.5C14.1944 1.5 18 5.30558 18 10Z"
      strokeWidth="1.67"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>,
  "CustomSearchIcon"
);

export default CustomSearchIcon;
