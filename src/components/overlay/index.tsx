import { Backdrop } from "@mui/material";
import React, { FC, memo } from "react";

interface OverlayProps {
  open: boolean;
  children?: React.ReactNode;
}
const Overlay: FC<OverlayProps> = ({ open, children }) => {
  return (
    open && (
      <Backdrop
        open={open}
        sx={{
          zIndex: 10000,
          backgroundColor: "rgba(255, 255, 255, 0.40)",
        }}
      >
        {children}
      </Backdrop>
    )
  );
};

export default memo(Overlay);
