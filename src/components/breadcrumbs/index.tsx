"use client";

import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import { Typography } from "@mui/material";
import Breadcrumbs from "@mui/material/Breadcrumbs";
import startCase from "lodash/startCase";
import includes from "lodash/includes";
import { usePathname } from "next/navigation";
import React, { useMemo } from "react";
import { HomeIcon } from "../../icons";
import { CustomLink } from "../custom-link";
import { languages } from "../../i18n";
import { BreadcrumbEnum } from "../../constants";
import { useIsBasicUser, useIsMerchantUser } from "../../api";

const BreadcrumbsView = () => {
  const pathname = usePathname();
  const isBasic = useIsBasicUser();
  const isMerchant = useIsMerchantUser();

  // Keep original segments for correct hrefs
  const pathArray = useMemo(
    () => pathname.split("/").filter((x) => x && !includes(languages, x)),
    [pathname]
  );

  const breadcrumbArray = useMemo(() => {
    return pathArray.map((path, index) => {
      // SKIP rendering "content"
      if (path.toLowerCase() === "content") return null;

      const href = `/${pathArray.slice(0, index + 1).join("/")}`;
      const last = index === pathArray.length - 1;

      let label = path;
      label =
        label === BreadcrumbEnum.CREATE ? BreadcrumbEnum.CREATE_OFFER : label;
      label =
        label === BreadcrumbEnum.DASHBOARD && isMerchant
          ? BreadcrumbEnum.MERCHANT_DASHBOARD
          : label;
      label =
        label === BreadcrumbEnum.DASHBOARD && isBasic
          ? BreadcrumbEnum.USER_DASHBOARD
          : label;

      const text = startCase(decodeURI(label.replaceAll("-", " ")));

      if (last) {
        return (
          <Typography
            color="primary"
            key={path}
            sx={{ typography: { md: "body2Medium", xs: "caption1Medium" } }}
          >
            {text}
          </Typography>
        );
      }

      if (
        label.toLowerCase().includes("user") ||
        href === "/vehicles/showrooms"
      ) {
        return null;
      }

      return (
        <CustomLink key={path} href={href} prefetch={false}>
          <Typography
            color="grey.GREYISH_BLUE"
            sx={{
              typography: { md: "body2Medium", xs: "caption1Medium" },
              display: "inline-block",
              textDecoration: "none",
              cursor: "pointer",
              "&:hover": { textDecoration: "underline" },
            }}
          >
            {text}
          </Typography>
        </CustomLink>
      );
    });
  }, [isBasic, isMerchant, pathArray]);

  return (
    <Breadcrumbs
      separator={<NavigateNextIcon fontSize="small" />}
      aria-label="breadcrumb"
    >
      <CustomLink href="/content/daily" prefetch={false} aria-label="Home">
        <HomeIcon
          sx={{
            display: "flex",
            alignItems: "center",
            color: "grey.GREYISH_BLUE",
            fontSize: "inherit",
            cursor: "pointer",
            "&:hover": { color: "primary.main" },
          }}
        />
      </CustomLink>
      {breadcrumbArray}
    </Breadcrumbs>
  );
};

export default React.memo(BreadcrumbsView);
