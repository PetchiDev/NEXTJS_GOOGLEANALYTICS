"use client";
import React, { memo } from "react";
import { Box, Stack, SxProps, Typography } from "@mui/material";
import { useRouter } from "next/navigation";
import { COLORS } from "../../theme";
import BackIcon from "../../icons/back";

interface BackNavigationProps {
  pageUrl?: string;
  text: string;
  containerSx?: SxProps;
}

const BackNavigation = ({
  text,
  pageUrl,
  containerSx,
}: BackNavigationProps) => {
  const router = useRouter();
  return (
    <Box component={"nav"}>
      <Typography
        color={COLORS.PRIMARY.MAIN}
        variant="caption1Medium"
        component={Stack}
        direction={"row"}
        alignItems={"center"}
        onClick={() => {
          const isNewTabNavigation = window.history.length <= 3;
          if (pageUrl) {
            router.replace(pageUrl);
            return;
          }
          if (isNewTabNavigation) {
            router.replace("/");
            return;
          }
          router.back();
        }}
        sx={{
          cursor: "pointer",
          ...containerSx,
        }}
      >
        <BackIcon />
        {text}
      </Typography>
    </Box>
  );
};

export default memo(BackNavigation);
