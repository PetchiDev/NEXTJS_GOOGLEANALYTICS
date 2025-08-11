"use client";
import { useTranslation } from "@/i18n";
import { COLORS } from "@/theme";
import ArrowBackIosRoundedIcon from "@mui/icons-material/ArrowBackIosRounded";
import { Box, Stack, Typography } from "@mui/material";
import { useRouter } from "nextjs-toploader/app";
import { FC } from "react";

interface GoBackButtonProps {
  fallbackPath: string;
}
const GoBackButton: FC<GoBackButtonProps> = ({ fallbackPath }) => {
  const { t } = useTranslation("detail");
  const router = useRouter();

  const handleBack = () => {
    // Single source of truth for navigation conditions
    const isNewTabNavigation = window.history.length <= 2;
    if (isNewTabNavigation) {
      router.push(fallbackPath);
    } else {
      router.back();
    }
  };
  return (
    <Box component="nav">
      <Typography
        onClick={handleBack}
        height={56}
        color={COLORS.PRIMARY.MAIN}
        variant="caption1Medium"
        component={Stack}
        direction={"row"}
        alignItems={"center"}
        p={1}
        sx={{
          cursor: "pointer",
          display: "inline-flex",
        }}
      >
        <ArrowBackIosRoundedIcon sx={{ mr: "4px", width: 16, height: 16 }} />
        {t("back_to_search")}
      </Typography>
    </Box>
  );
};

export default GoBackButton;
