"use client";
import { Box, Button, Menu, MenuItem, Typography } from "@mui/material";
import { usePathname } from "next/navigation";
import { DashboardIcon } from "../../../icons";
import saveAdsIcon from "public/images/header/drawer-images/profile-dropdown/favorites.svg";
import logoutIcon from "public/images/header/drawer-images/profile-dropdown/logout.svg";
import manageAdsIcon from "public/images/header/drawer-images/profile-dropdown/manage-ads.svg";
import accountIcon from "public/images/header/drawer-images/profile-dropdown/profile.svg";
import savedSearchesIcon from "public/images/header/drawer-images/profile-dropdown/search-icon.svg";
import React, { FC } from "react";
import CustomMenuItem from "./menu-item";
import NestedCustomMenuItem from "./nested-custom-menu-item";
import { useDecodeToken } from "../../../hooks";
import { API_TAGS, config } from "../../../constants";
import { CustomLink } from "../../custom-link";
import { COLORS, theme } from "../../../theme";
import { useTranslation } from "../../../i18n";
import { getLinkCategories, handleLogout } from "../../../utils";
import useDashboardSummary from "../../../hooks/use-dashboard-summary";
import { queryClient } from "../../../context";

interface ProfileMenuProps {
  moreMenu: null | HTMLElement;
  handleCloseUserMenu: () => void;
}

const ProfileMenu: FC<ProfileMenuProps> = ({
  moreMenu,
  handleCloseUserMenu,
}) => {
  const { name, uid } = useDecodeToken() || {};

  const { t } = useTranslation("header");
  const dashboardSummaryData = queryClient.getQueryData([
    API_TAGS.GET_DASHBOARD_SUMMARY,
    Number(uid),
  ]);

  const { data: dashboardSummary } = useDashboardSummary({
    enabled: !dashboardSummaryData,
    userId: Number(uid),
    enableCache: true,
    enableRetry: false,
  });

  const pageFullUrl = usePathname().split("/").slice(0, 3).join("/");

  return (
    <Menu
      sx={{
        mt: "45px",
        height: "100%",
        "& ul": {
          p: 0,
          borderRadius: "0 0 2px 2px !important",
        },
        "& .MuiMenu-paper": {
          borderTop: "none",
          top: "35px !important",
          width: 224,
        },
        "& .nested-menu-item .MuiTypography-root": {
          fontFamily: theme.typography.fontFamily,
          fontSize: "13px",
          fontWeight: 500,
          lineHeight: "22px",
          fontStyle: "normal",
        },
        "& .nested-menu-item .right-icon-hidden": {
          display: "none",
        },
      }}
      id="profile-menu"
      anchorEl={moreMenu}
      anchorOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      keepMounted
      transformOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      open={Boolean(moreMenu)}
      onClose={handleCloseUserMenu}
    >
      <Box
        sx={{
          borderRight: `1px solid ${COLORS.SECONDARY.FORM_INPUTS.FORM_DROPDOWN_BORDER}`,
          borderBottom: `1px solid ${COLORS.SECONDARY.FORM_INPUTS.FORM_DROPDOWN_BORDER}`,
          borderLeft: `1px solid ${COLORS.SECONDARY.FORM_INPUTS.FORM_DROPDOWN_BORDER}`,
          boxShadow: `0px 4px 6px -2px  ${COLORS.SECONDARY.FORM_INPUTS.FORM_DROPDOWN_BORDER}, 0px 12px 16px -4px  ${COLORS.SECONDARY.FORM_INPUTS.FORM_DROPDOWN_BORDER}`,
          bgcolor: COLORS.WHITE,
          py: 1,
        }}
      >
        {name ? (
          <>
            {name ? (
              <MenuItem sx={{ px: "20px", height: 44 }}>
                <Typography
                  variant="bodySemiBold"
                  color={"grey.900"}
                  sx={{
                    textAlign: "left",
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                    whiteSpace: "nowrap",
                  }}
                >
                  {`${t("hi")} ${name}`}
                </Typography>
              </MenuItem>
            ) : null}

            <CustomLink
              href={`${config.ql_url}/user/${uid}/edit`}
              isExternalLink
            >
              <CustomMenuItem
                menuItemText={t("my_account")}
                imagePath={accountIcon}
                onClick={handleCloseUserMenu}
              />
            </CustomLink>

             <CustomLink
              href={`${config.ql_url}/user/${uid}/wishlist`}
              isExternalLink
            >
              <CustomMenuItem
                menuItemText={`${t("my_saved_ads")}`}
                imagePath={saveAdsIcon}
                imageAlt={`${t("my_saved_ads")}`}
                onClick={handleCloseUserMenu}
              />
            </CustomLink>
              <CustomLink
              href={`${config.ql_url}/user/${uid}/wishlist`}
              isExternalLink
            >
              <CustomMenuItem
                menuItemText={t("my_saved_searches")}
                imagePath={savedSearchesIcon}
                imageAlt={t("dashboard_icon")}
                onClick={handleCloseUserMenu}
              />
            </CustomLink>
            <NestedCustomMenuItem
              menuItemText={t("dashboard")}
              Icon={DashboardIcon}
              onClick={handleCloseUserMenu}
              parentMenuOpen={Boolean(moreMenu)}
              subMenuItems={getLinkCategories({
                hasSubscription:
                  (dashboardSummary?.subscriptions?.length ?? 0) > 0,
                drupalUid: uid,
              })}
            />

            <CustomLink
              href={`${config.ql_url}/user/${uid}/classifieds`}
              isExternalLink
            >
              <CustomMenuItem
                menuItemText={t("manage_my_ads")}
                imagePath={manageAdsIcon}
                imageAlt={t("edit_icon")}
                onClick={handleCloseUserMenu}
              />
            </CustomLink>
            <CustomLink
              href={`${config.ql_logout_url}${pageFullUrl}`}
              isExternalLink={true}
            >
              <CustomMenuItem
                onClick={() => {
                  handleLogout();
                  handleCloseUserMenu();
                }}
                color={COLORS.SECONDARY[900]}
                menuItemText={t("logout")}
                imagePath={logoutIcon}
                showBorder={false}
              />
            </CustomLink>
          </>
        ) : (
          <>
            {/* <CustomLink href={`/favourites-management`}>
              <CustomMenuItem
                menuItemText={t("my_saved_ads")}
                imagePath={saveAdsIcon}
              />
            </CustomLink>
            <CustomLink href={`/favourites-management`}>
              <CustomMenuItem
                menuItemText={t("my_saved_searches")}
                imagePath={savedSearchesIcon}
                imageAlt={t("dashboard_icon")}
                onClick={handleCloseUserMenu}
              />
            </CustomLink>
            <CustomLink href={`${config.ql_url}`} isExternalLink={true}>
              <CustomMenuItem
                menuItemText={t("manage_my_ads")}
                imagePath={manageAdsIcon}
                imageAlt={t("edit_icon")}
              />
            </CustomLink> */}
            <MenuItem
              sx={{ py: 2, flexDirection: "column", gap: 1.4 }}
              disableRipple
            >
              <Button
                data-testid="login-link"
                variant="outlined"
                component={CustomLink}
                href={`${config.ql_login_url}${pageFullUrl}`}
                isExternalLink={true}
              >
                {t("login")}
              </Button>
              <Button
                data-testid="signup-link"
                variant="contained"
                component={CustomLink}
                href={`${config.ql_register_url}${pageFullUrl}`}
                isExternalLink={true}
              >
                {t("sign_up")}
              </Button>
            </MenuItem>
          </>
        )}
      </Box>
    </Menu>
  );
};

export default ProfileMenu;
