"use client";
import React from "react";
import { Box, Grid, Typography } from "@mui/material";
import EmailSubscribe from "./email-subscribe";
import { useTranslation } from "../../../i18n";
import { CustomLink } from "../../custom-link";
import { COLORS } from "../../../theme";
import { config } from "../../../constants";

interface AdvertAndNewsLetterProps {
  isMapView?: boolean;
}

const AdvertAndNewsLetter = ({
  isMapView = false,
}: AdvertAndNewsLetterProps) => {
  const { t } = useTranslation("footer");

  return (
    <Grid
      item
      xs={12}
      lg={"auto"}
      width={{ lg: isMapView ? "100%" : "fit-content", xl: "fit-content" }}
      textAlign={{ lg: "start", xl: isMapView ? "center" : "start" }}
    >
      <Typography
        component={"p"}
        variant="h3Medium"
        color={COLORS.WHITE}
        mb={"10px"}
      >
        {t("want_to_advertise")}
      </Typography>
      <Typography
        sx={{
          typography: {
            sm: "h2MediumSmallHeight",
            xs: {
              fontSize: "18px",
              fontWeight: 500,
              lineHeight: "27px",
              fontStyle: "normal",
            },
          },
        }}
        color={COLORS.WHITE}
      >
        {t("advertise_page")}
        <CustomLink
          href={`${config.ql_url}/advertise`}
          style={{
            textDecoration: "underline",
            textUnderlineOffset: "4px",
            color: COLORS.SECONDARY[900],
          }}
          isExternalLink={true}
        >
          {t("advertise_page_link")}
        </CustomLink>
      </Typography>
      <Typography
        component={"p"}
        variant="h3Medium"
        mt={{ lg: isMapView ? 3 : 5, xs: 3 }}
        mb={2}
        color={COLORS.WHITE}
      >
        {t("subscribe_newsletter")}
      </Typography>
      <Box width={{ xs: "100%", xl: isMapView ? "100%" : 435 }}>
        <EmailSubscribe subscribe={t("subscribe")} />
      </Box>
    </Grid>
  );
};

export default AdvertAndNewsLetter;
