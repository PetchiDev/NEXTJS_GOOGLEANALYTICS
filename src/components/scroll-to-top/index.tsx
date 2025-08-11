"use client";
import { Box, Fade, useScrollTrigger } from "@mui/material";
import React, { memo } from "react";
import { ScrollToTopIcon } from "../../icons";

const ScrollToTop = () => {
  const trigger = useScrollTrigger({
    disableHysteresis: true,
    threshold: 100,
  });

  const handleClick = () => {
    const anchor = document.querySelector("#back-to-top-anchor");
    if (anchor) {
      anchor.scrollIntoView({
        behavior: "smooth",
        block: "center",
      });
    }
  };

  return (
    <Fade in={trigger}>
      <Box
        onClick={handleClick}
        sx={{
          position: "fixed",
          zIndex: 3000,
          bottom: {
            lg: "64px",
            md: "2px",
            sm: "2px",
            xs: "2px",
          },
          right: 16,
          cursor: "pointer",
          maxHeight: "40px",
        }}
      >
        <ScrollToTopIcon onClick={handleClick} />
      </Box>
    </Fade>
  );
};

export default memo(ScrollToTop);
