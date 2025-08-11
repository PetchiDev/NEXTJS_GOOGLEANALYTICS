"use client";
import { Box, Modal, useMediaQuery } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import React, { ReactNode, memo } from "react";
import { COLORS, theme } from "../../theme";
import Image, { StaticImageData } from "next/image";

interface CustomModalProps {
  open: boolean;
  customStyles?: boolean;
  customCloseIcon?: StaticImageData;
  handleClose: () => void;
  children: ReactNode;
}
const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  overflowY: "hidden",
  overflowX: "hidden",
  borderRadius: "8px",
};
const styleMobile = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "calc(100% - 32px)", // Subtracting 32px for 16px padding on each side
  padding: "8px", // 8px padding on each side
  backgroundColor: "white", // Adding a background color for visibility
  overflowY: "auto", // Making the modal scrollable if content overflows vertically
  overflowX: "hidden",
  borderRadius: "8px",
};

const closeStyle = {
  display: "flex",
  position: "absolute",
  zindex: 100,
  top: 4,
  right: "2px",
  width: "44px",
  height: "44px",
  padding: "var(--spacing-md, 8px)",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",
  flexShrink: 0,
  cursor: "pointer",
  zIndex: 1500,
};
const CustomModal: React.FC<CustomModalProps> = ({
  open,
  customStyles = false,
  handleClose,
  customCloseIcon,
  children,
}) => {
  const isMobile = useMediaQuery(() => theme.breakpoints.down("md"));
  return (
    <Modal open={open} onClose={handleClose}>
      <Box sx={isMobile ? styleMobile : style}>
        <Box
          onClick={handleClose}
          sx={
            customStyles
              ? {
                  ...closeStyle,
                  background: "none",
                  right: "12px",
                  top: "20px",
                }
              : closeStyle
          }
        >
          {customCloseIcon ? (
            <Image src={customCloseIcon.src} alt="Close" />
          ) : (
            <CloseIcon
              sx={{
                width: 24,
                height: 24,
                color: COLORS.SECONDARY.BUTTON.BUTTON_DISABLED_TEXT,
              }}
            />
          )}
        </Box>
        {children}
      </Box>
    </Modal>
  );
};

export default memo(CustomModal);
