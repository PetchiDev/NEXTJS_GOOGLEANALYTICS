"use client";
import AddIcon from "@mui/icons-material/Add";
import { Button, Grid, Typography } from "@mui/material";
import React, { memo, useMemo } from "react";
import { menu } from "../menu";
import { config } from "../../../constants";
import { useTranslation } from "../../../i18n";
import { CustomLink } from "../../custom-link";
import { COLORS } from "../../../theme";
import { useToken } from "../../../hooks";
import { usePathname } from "next/navigation";

const MainHeaderOptions = () => {
  const { t } = useTranslation("header");
  const token = useToken();

  const path = usePathname();
  const selectedMenu = useMemo(() => {
    // Split the path into parts and remove empty strings
    const parts = path.split("/")?.filter(Boolean); // e.g., "/en/rewards/1/12" -> ["en", "rewards", "1", "12"]
    // Find the first segment that matches a key in menu
    const key = parts.find((part) => menu.some((item) => item.key === part));
    // Find the matching menu item
    return key ? menu.find((item) => item.key === key) : null;
  }, [path]);

  return (
    <Grid
      item
      lg
      flexDirection="row"
      sx={{ display: { xs: "none", lg: "flex" } }}
      justifyContent="center"
      columnGap="32px"
      alignItems="center"
    >
      {menu
        .filter((page) => page.key !== "content")
        .map((page) => (
          <Typography
            component={CustomLink}
            href={page.url}
            isExternalLink
            variant={selectedMenu?.key === page.key ? "h3Medium" : "h4Medium"}
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
            color={
              selectedMenu?.key === page.key
                ? COLORS.SECONDARY.MAIN
                : COLORS.WHITE
            }
            key={page.key}
          >
            {t(`${page.key}`)}
          </Typography>
        ))}
      <Button
        data-testid="create-ad-btn"
        variant="contained"
        startIcon={<AddIcon />}
        sx={{
          ml: 0.5,
          px: "14px",
          py: 1,
          borderRadius: "4px",
          typography: "h4Semibold",
          width: 109,
        }}
        component={CustomLink}
        href={
          token
            ? process.env.NEXT_PUBLIC_CREATE_AD_URL ??
              `/${process.env.NEXT_PUBLIC_APP_NAME}/create`
            : config.create_ad
        }
        isExternalLink={!token}
      >
        {t("Post Ad")}
      </Button>
    </Grid>
  );
};

export default memo(MainHeaderOptions);
