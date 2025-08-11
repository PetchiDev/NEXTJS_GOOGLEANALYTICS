"use client";
import React, { memo } from "react";
import { Grid, Stack, Typography } from "@mui/material";
import { TERMS_AND_CONDITIONS_LINKS } from "../footer-links";
import { useTranslation } from "../../../i18n";
import { CustomLink } from "../../custom-link";
import { COLORS } from "../../../theme";
import SocialMediaIcons from "../../social-media-icons";

interface TermsAndConditionsProps {
  isMapView?: boolean;
}

const TermsAndConditions = ({ isMapView = false }: TermsAndConditionsProps) => {
  const { t } = useTranslation("footer");

  return (
    <Grid
      container
      item
      justifyContent={isMapView ? "center" : "space-between"}
      textAlign={isMapView ? "center" : "start"}
      rowGap={3}
    >
      <Grid item xs={12} lg={isMapView ? 12 : "auto"}>
        <Stack
          direction={"row"}
          columnGap={isMapView ? 6 : 5}
          flexWrap={"wrap"}
          rowGap={2}
          width={isMapView ? 1 : "auto"}
          justifyContent={{ xs: "start", xl: isMapView ? "center" : "start" }}
        >
          {TERMS_AND_CONDITIONS_LINKS.map(
            (page: { key: string; url: string }) => (
              <Typography key={page.key} variant="footerLinks">
                <CustomLink
                  href={page.url}
                  isExternalLink={true}
                  style={{
                    textDecoration: "underline",
                    color: COLORS.WHITE,
                    textUnderlineOffset: "3px",
                  }}
                >
                  {t(`${page.key}`)}
                </CustomLink>
              </Typography>
            )
          )}
        </Stack>
        <Typography
          variant="subTitle1Regular"
          mt={3}
          display={{ md: "block", xs: "none" }}
          dangerouslySetInnerHTML={{
            __html: t("copy_right", { year: new Date().getFullYear() }),
          }}
          color={COLORS.WHITE}
        />
      </Grid>
      <Grid item lg={isMapView ? undefined : "auto"} rowGap={1}>
        <Typography component={"p"} variant="h3Medium" color={COLORS.WHITE}>
          {t("stay_connected")}
        </Typography>
        <SocialMediaIcons />
      </Grid>
    </Grid>
  );
};

export default memo(TermsAndConditions);
