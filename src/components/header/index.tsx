"use client";
import React, { useEffect } from "react";
import { Box, Grid } from "@mui/material";
import CustomHeaderDrawer from "./custom-header-drawer";
import RightMenuList from "./custom-header-right-menu/right-menu-list";
import LogoImage from "./logo-image";
import { useToken } from "../../hooks";
import MainHeaderOptions from "./main-header-options";
import { COLORS } from "../../theme";
import { config } from "../../constants";

interface HeaderProps {
  isStretched?: boolean;
}

export { default as Submenu } from "./submenu";

export const Header = ({ isStretched = false }: HeaderProps) => {
  const token = useToken();

  useEffect(() => {
    if (typeof window !== 'undefined') {
      (function (c, l, a, r, i) {
        let t: HTMLScriptElement;
        let y: Element;
        c[a] =
          c[a] ||
          function () {
            // eslint-disable-next-line prefer-rest-params
            (c[a].q = c[a].q || []).push(arguments);
          };
        t = l.createElement(r) as HTMLScriptElement;
        t.async = true;
        t.src =
          `https://www.clarity.ms/tag/${config.microsoft_clarity_project_id}`;
        y = l.getElementsByTagName(r)[0] as Element;
        y.parentNode?.insertBefore(t, y);
      })(
        window,
        document,
        "clarity",
        "script",
        config.microsoft_clarity_project_id
      );
    }
  }, []);

  return (
    <Box
      component={"header"}
      bgcolor={COLORS.PRIMARY[900]}
      id="back-to-top-anchor"
      display={"flex"}
      justifyContent={"center"}
      height={{ xs: 64, lg: 80 }}
    >
      <Box
        sx={{
          boxShadow: "0px 2px 6px 0px rgba(0, 0, 0, 0.10)",
          width: 1,
          display: "flex",
          justifyContent: "center",
          zIndex: 10,
        }}
      >
        <Grid
          container
          alignItems={"center"}
          maxWidth={{ lg: "xl", xxl: isStretched ? "100%" : "xl" }}
          justifyContent={{ lg: "space-evenly", xs: "space-between" }}
          height={"100%"}
          py={{ xs: 1.5, lg: 2 }}
          px={{ xs: 1, lg: 2 }}
        >
          <CustomHeaderDrawer isAuthenticated={!!token} />
          <LogoImage />
          <MainHeaderOptions />
          <Grid item>
            <RightMenuList />
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
};
