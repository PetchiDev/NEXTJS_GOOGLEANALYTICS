"use client";
import React, { memo } from "react";
import {
  Container,
  Divider,
  Grid,
  Typography,
  useMediaQuery,
} from "@mui/material";
import AdvertAndNewsLetter from "./advert-and-newsletter";
import LinkedPages from "./linked-pages";
import FooterLogos from "./logos/footer-logos";
import TermsAndConditions from "./terms-and-conditions";
import { useTranslation } from "../../i18n";
import { COLORS, theme } from "../../theme";
import { FOOTER_ID } from "../../constants";

interface FooterProps {
  isMapView?: boolean;
}

const Footer = ({ isMapView = false }: FooterProps) => {
  const { t } = useTranslation("footer");
  const isLg = useMediaQuery(theme.breakpoints.up("lg"));
  const isXl = useMediaQuery(theme.breakpoints.up("xl"));

  return (
    <Grid
      container
      bgcolor={COLORS.PRIMARY[900]}
      direction={"column"}
      mt={{ md: 7.5, xs: 5 }}
      width={"100%"}
      sx={{ flexShrink: 0 }}
      component={"footer"}
      id={FOOTER_ID}
    >
      <Container
        sx={{
          pt: { xs: 5, xl: isMapView ? 4 : 5 },
          pb: 2,
          pl: { xs: 2, md: 7.5, lg: 2 },
          pr: { xs: 2, md: 7.5, lg: 2 },
        }}
      >
        <Grid
          item
          container
          direction={"row"}
          justifyContent={"space-between"}
          pb={isMapView ? 0 : 3}
          rowGap={4}
        >
          <LinkedPages isMapView={isMapView} />
          {!isMapView && (
            <>
              <AdvertAndNewsLetter />
              <FooterLogos />
            </>
          )}
        </Grid>
        {isMapView && (
          <Grid
            container
            sx={{ mt: { lg: 4, xl: 5 }, pb: 3 }}
            justifyContent={"center"}
            rowSpacing={4}
          >
            <AdvertAndNewsLetter isMapView={isMapView} />
            {isLg && !isXl && <FooterLogos isMapView />}
          </Grid>
        )}
        <Divider />
        <Grid item container py={2}>
          <TermsAndConditions isMapView={isMapView} />
          <Typography
            variant="subTitle1Regular"
            sx={{ height: "auto", marginTop: 3, color: COLORS.WHITE }}
            dangerouslySetInnerHTML={{
              __html: t("copy_right", { year: new Date().getFullYear() }),
            }}
            display={{ md: "none", xs: "block" }}
          />
        </Grid>
      </Container>
    </Grid>
  );
};

export default memo(Footer);
