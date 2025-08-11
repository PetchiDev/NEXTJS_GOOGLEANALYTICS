"use client";
import React from "react";
import { Grid, Stack, Typography } from "@mui/material";
import Image from "next/image";
import mobileAppStore from "public/images/footer/Mobile-appstore-badge.png";
import mobilePlayStore from "public/images/footer/Mobile-playstore-badge.png";
import logoImage from "public/images/logo.webp";
import { useTranslation } from "../../../i18n";
import { CustomLink } from "../../custom-link";
import { config } from "../../../constants";
import { COLORS } from "../../../theme";

interface FooterLogosProps {
  isMapView?: boolean;
}

const FooterLogos = ({ isMapView = false }: FooterLogosProps) => {
  const { t } = useTranslation("footer");
  return (
    <Grid
      item
      container
      xs={12}
      lg={"auto"}
      justifyContent={{ xs: "center", lg: "flex-start" }}
      direction={{ sm: "row", lg: "column" }}
      rowGap={{ lg: isMapView ? 3 : "59px", xs: 3 }}
      columnGap={3}
      alignItems={{ xs: "center", lg: isMapView ? "center" : "flex-start" }}
    >
      <Grid item xs={12} sm={"auto"} width={"fit-content"}>
        <CustomLink href={"/content/daily"}>
          <Image
            src={logoImage}
            width={126}
            height={48}
            alt={t("qatar_living")}
            unoptimized
          />
        </CustomLink>
      </Grid>

      <Grid
        item
        xs={12}
        sm={"auto"}
        width={"fit-content"}
        justifyContent={{ sm: "left", xs: "center" }}
      >
        <Typography
          component={"p"}
          variant="h3Medium"
          color={COLORS.WHITE}
          sx={{
            textAlign: { lg: isMapView ? "center" : "left", xs: "center" },
          }}
        >
          {t("our_mobile_app")}
        </Typography>

        <Stack
          rowGap={2}
          columnGap={2}
          direction={{ lg: isMapView ? "row" : "column", xs: "row" }}
          mt={2}
          justifyContent={"center"}
          alignItems={"center"}
        >
          <CustomLink
            href={config.socialConfig.google_play_app}
            isExternalLink={true}
          >
            <Image
              loading="lazy"
              src={mobilePlayStore}
              width={135}
              height={40}
              alt={t("qatar_living_mobile_app")}
              unoptimized
            />
          </CustomLink>

          <CustomLink
            href={config.socialConfig.app_store_App}
            isExternalLink={true}
          >
            <Image
              loading="lazy"
              src={mobileAppStore}
              width={135}
              height={40}
              alt={t("qatar_living_mobile_app")}
              unoptimized
            />
          </CustomLink>
        </Stack>
      </Grid>
    </Grid>
  );
};

export default FooterLogos;
