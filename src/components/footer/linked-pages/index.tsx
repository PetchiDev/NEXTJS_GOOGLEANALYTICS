"use client";
import React from "react";
import { Grid, Typography, useMediaQuery } from "@mui/material";
import FooterLogos from "../logos/footer-logos";
import { useTranslation } from "react-i18next";
import { COLORS, theme } from "../../../theme";
import { CustomLink } from "../../custom-link";
import { menu, more } from "../../header/menu";
import { config } from "../../../constants";

interface LinkedPagesProps {
  isMapView?: boolean;
}

const LinkedPages = ({ isMapView = false }: LinkedPagesProps) => {
  const { t } = useTranslation("footer");
  const isXxl = useMediaQuery(() => theme.breakpoints.only("xxl"));
  const isRewardsModule = config.app_name === "rewards";

  return (
    <Grid
      item
      container
      direction={"row"}
      justifyContent={{
        xs: "space-between",
        lg: isMapView ? "space-between" : "flex-start",
      }}
      lg={"auto"}
      width={isMapView ? "100% !important" : "fit-content"}
      alignItems={isMapView ? "flex-start" : "auto"}
      xs={12}
      columnGap={{ lg: 9 }}
    >
      <Grid
        item
        container
        display={"flex"}
        rowGap={2}
        direction={"column"}
        width={"fit-content"}
      >
        <Typography component={"p"} variant="h3Medium" color={COLORS.WHITE}>
          {t("explore")}
        </Typography>
        {menu.map((page: { key: string; url: string }) => (
          <Typography
            component={CustomLink}
            isExternalLink={true}
            href={page.url}
            variant="footerLinks"
            style={{
              textDecoration: "underline",
              textUnderlineOffset: "3px",
            }}
            color={COLORS.WHITE}
            key={page.key}
          >
            {t(page.key)}
          </Typography>
        ))}
        <Typography
          component={CustomLink}
          href={
            isRewardsModule
              ? `/${config.app_name}/merchant-subscription`
              : `/${config.app_name}/subscription`
          }
          variant="h3Medium"
          style={{
            textDecoration: "underline",
            lineHeight: "27px",
            textUnderlineOffset: "3px",
          }}
          color={COLORS.SECONDARY[900]}
        >
          {t("premium_subscriptions")}
        </Typography>
      </Grid>
      <Grid
        item
        container
        width={{ md: "110px", xs: "auto" }}
        display={"flex"}
        rowGap={2}
        direction={"column"}
      >
        <Typography component={"p"} variant="h3Medium" color={COLORS.WHITE}>
          {t("other")}
        </Typography>
        {more.map((page: { key: string; url: string }) => (
          <Typography
            key={page.key}
            component={CustomLink}
            isExternalLink={page.key !== config.app_name}
            href={page.url}
            variant="footerLinks"
            style={{
              textDecoration: "underline",
              textUnderlineOffset: "3px",
            }}
            color={COLORS.WHITE}
          >
            {t(`${page.key}`)}
          </Typography>
        ))}
      </Grid>
      {isMapView && isXxl && <FooterLogos />}
    </Grid>
  );
};

export default LinkedPages;
