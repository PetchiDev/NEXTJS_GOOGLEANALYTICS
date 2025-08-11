import { SvgIcon } from "@mui/material";
import React from "react";

const MessageIcon: React.FC = () => {
  return (
    <SvgIcon>
      <svg
        width="20"
        height="20"
        viewBox="0 0 20 20"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <g id="mail">
          <path
            id="Icon"
            d="M18.3307 4.99967C18.3307 4.08301 17.5807 3.33301 16.6641 3.33301H3.33073C2.41406 3.33301 1.66406 4.08301 1.66406 4.99967M18.3307 4.99967V14.9997C18.3307 15.9163 17.5807 16.6663 16.6641 16.6663H3.33073C2.41406 16.6663 1.66406 15.9163 1.66406 14.9997V4.99967M18.3307 4.99967L9.9974 10.833L1.66406 4.99967"
            stroke="#667085"
            strokeWidth="1.66667"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </g>
      </svg>
    </SvgIcon>
  );
};

export default React.memo(MessageIcon);
