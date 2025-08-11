"use client";
import { Grid } from "@mui/material";
import Image from "next/image";
import logo from "public/images/logo.webp";
import React, { memo } from "react";
import { config } from "../../../constants";
import { useTranslation } from "../../../i18n";
import { CustomLink } from "../../custom-link";

const LogoImage = () => {
  const { t } = useTranslation(["header"]);
  return (
    <>
      <Grid
        component={CustomLink}
        isExternalLink={true}
        href={config.ql_url}
        item
        sx={{ display: { xs: "flex", lg: "none" } }}
      >
        <Image
          src={logo}
          alt={t("Qatar_Living")}
          priority={true}
          width={85}
          height={32}
          unoptimized
        />
      </Grid>
      <Grid
        component={CustomLink}
        isExternalLink={true}
        href="/en/content/daily"
        item
        sx={{ display: { xs: "none", lg: "flex" } }}
      >
        <Image
          src={logo}
          alt={t("Qatar_Living")}
          width={126}
          height={48}
          unoptimized
        />
      </Grid>
    </>
  );
};

export default memo(LogoImage);
