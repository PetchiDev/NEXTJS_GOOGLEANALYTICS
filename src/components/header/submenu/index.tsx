"use client";

import { useTranslation } from "../../../i18n";
import { COLORS } from "../../../theme";
import { CustomLink } from "../../custom-link";
import { Box, Grid, Stack, Typography } from "@mui/material";
import { usePathname, useSearchParams } from "next/navigation";
import React, { FC, memo, useMemo } from "react";
import { menu } from "../menu";

interface SubMenuProps {
  isStretched?: boolean;
}

const SubMenu: FC<SubMenuProps> = ({ isStretched }) => {
  const { t } = useTranslation("header");
  const pathname = usePathname();
  const searchParams = useSearchParams();

  // TODO: submenu can be passed from params i.e. slug
  // TODO: Refactor it to move splitting into useMemo
  const pathParts = pathname.split("/");
  const isFromDashboard = pathParts.includes("dashboard");

  // Get the part of the path after the main menu
  const actualPath = useMemo(
    () => `/${pathParts.slice(2).join("/")}`.replace(/^\//, ""),
    [pathParts]
  );

  // Find which main menu key is currently selected
  const selectedMenu = useMemo(
    () => menu.find((_menuItem) => _menuItem.key === pathParts[2]),
    [pathParts]
  );

  return (
    <Box
      sx={{
        width: 1,
        display: {
          xs: "none",
          lg: "flex",
        },
        justifyContent: "center",
        bgcolor: COLORS.WHITE,
      }}
    >
      <Grid
        container
        py={1}
        px={2}
        maxWidth={{ lg: "xl", xxl: isStretched ? "100%" : "xl" }}
      >
        <Grid item sm={1} md={2} lg={1} xl={3}></Grid>
        <Grid item sm={6} md={8} lg={7} xl={6}>
          <Stack
            direction="row"
            display={{
              xs: "none",
              lg: "flex",
            }}
            justifyContent={"center"}
            alignItems={"center"}
            px={"76px"}
            flexWrap={"wrap"}
            columnGap={7.75}
            py={"11px"}
          >
            {selectedMenu?.submenu?.map((page) => {
              const isSubMenuSelected = actualPath.includes(
                `${selectedMenu.key}/${page.key}`
              );

              return (
                <Box
                  key={page.key}
                  component={CustomLink}
                  href={
                    page.href
                      ? page.href(searchParams, isFromDashboard)
                      : page.url
                  }
                  textAlign={"center"}
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                  className="subtitle1Medium"
                  color={isSubMenuSelected ? COLORS.SECONDARY.MAIN : "grey.700"}
                >
                  {React.cloneElement(
                    page.icon as React.ReactElement<{ color?: string }>,
                    {
                      color: isSubMenuSelected
                        ? COLORS.SECONDARY.MAIN
                        : "#646464",
                    }
                  )}
                  <Typography
                    variant="subtitle1Medium"
                    borderBottom={
                      isSubMenuSelected
                        ? `3px solid ${COLORS.SECONDARY.MAIN}`
                        : "none"
                    }
                    sx={{
                      color: isSubMenuSelected
                        ? COLORS.SECONDARY.MAIN
                        : "grey.700",
                    }}
                  >
                    {t(`${selectedMenu.key}.${page.key}`)}
                  </Typography>
                </Box>
              );
            })}
          </Stack>
        </Grid>
        <Grid item sm={2} md={2} lg={4} xl={3}>
          <Stack
            direction="row"
            display={{
              xs: "none",
              lg: "flex",
            }}
            justifyContent={"right"}
            alignItems={"center"}
            flexWrap={"wrap"}
            columnGap={5}
            py={"11px"}
          >
            {selectedMenu?.rightSubMenu?.map((page, index) => {
              const isSubMenuSelected = actualPath.includes(
                `${selectedMenu.key}/${page.key}`
              );

              return (
                <Box
                  key={page.key}
                  component={CustomLink}
                  href={
                    page.href
                      ? page.href(searchParams, isFromDashboard)
                      : page.url
                  }
                  textAlign={"center"}
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    justifyContent: "center",
                    borderLeft:
                      index === 0 ? `1px ${COLORS.GREY[200]} solid` : undefined,
                    pl: index === 0 ? 3 : undefined,
                  }}
                  className="subtitle1Medium"
                  color={isSubMenuSelected ? "primary.main" : "grey.700"}
                >
                  {React.cloneElement(
                    page.icon as React.ReactElement<{ color?: string }>,
                    {
                      color: isSubMenuSelected
                        ? COLORS.PRIMARY[900]
                        : "#646464",
                    }
                  )}
                  <Typography
                    variant="subtitle1Medium"
                    borderBottom={
                      isSubMenuSelected
                        ? `3px solid ${COLORS.PRIMARY[900]}`
                        : "none"
                    }
                    sx={{
                      color: isSubMenuSelected
                        ? COLORS.PRIMARY[900]
                        : "grey.700",
                    }}
                  >
                    {t(`${page.key}`)}
                  </Typography>
                </Box>
              );
            })}
          </Stack>
        </Grid>
      </Grid>
    </Box>
  );
};

export default memo(SubMenu);
