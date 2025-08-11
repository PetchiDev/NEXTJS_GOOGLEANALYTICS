"use client";
import { useTranslation } from "@/i18n";
import { COLORS } from "@/theme";
import {
  Box,
  Container,
  Grid,
  List,
  ListItem,
  Typography,
} from "@mui/material";
import Image from "next/image";
import Error404 from "public/images/error/404-Error.png";
import { CustomLink } from "@/components/custom-link";

const listItemStyle = {
  display: "list-item",
  listStylePosition: "inside",
  padding: 0,
  pl: 1,
};

const NotFound = () => {
  const { t } = useTranslation("error-messages");
  return (
    <Container sx={{ px: { xs: 2, md: 0 } }}>
      <Grid item container xs={12}>
        <Grid item md={6} mt={6} display={{ xs: "none", md: "flex" }}>
          <Image
            src={Error404}
            width={0}
            height={0}
            alt={t("error_404")}
            unoptimized
            style={{ width: 400, height: 500 }}
          />
        </Grid>
        <Grid item md={6} mt={{ md: 9.875, xs: 5 }} xs={12}>
          <Typography
            variant="title1Regular"
            maxWidth={"466px"}
            pr={{ md: "98px", xs: 0 }}
          >
            {t("page_not_found")}
          </Typography>
          <Box mt={4}>
            <Typography variant="h3Medium" maxWidth={"494px"}>
              {t("incorrect_address")}
            </Typography>
            <br />
            <Typography variant="h3Medium" maxWidth={"494px"}>
              {t("what_you_can_do")}
            </Typography>
            <List
              sx={{
                padding: 0,
                margin: 0,
                listStyle: "disc inside none",
              }}
            >
              <ListItem sx={listItemStyle}>
                <Typography variant="h3Medium" display={"inline"}>
                  {t("visit_our")}{" "}
                  <CustomLink
                    style={{
                      textDecoration: "underline",
                      color: COLORS.PRIMARY[900],
                    }}
                    href={"/"}
                    prefetch={false}
                  >
                    {t("homepage")}
                  </CustomLink>{" "}
                  {t("correct_content")}
                </Typography>
              </ListItem>
              <ListItem sx={listItemStyle}>
                <Typography variant="h3Medium" display={"inline"}>
                  {t("typed_wrong_address")}
                </Typography>
              </ListItem>
            </List>
          </Box>
        </Grid>
      </Grid>
    </Container>
  );
};

export default NotFound;
