"use client";
import { List } from "@mui/material";
import { usePathname } from "next/navigation";
import dashboardIcon from "public/images/header/drawer-images/profile-dropdown/dashboard.svg";
import saveAdsIcon from "public/images/header/drawer-images/profile-dropdown/favorites.svg";
import logoutIcon from "public/images/header/drawer-images/profile-dropdown/logout.svg";
import manageAdsIcon from "public/images/header/drawer-images/profile-dropdown/manage-ads.svg";
import accountIcon from "public/images/header/drawer-images/profile-dropdown/profile.svg";
import savedSearchesIcon from "public/images/header/drawer-images/profile-dropdown/search-icon.svg";
import React, { memo } from "react";
import NestedProfileListItem from "./nested-profile-item";
import ProfileListItem from "./profile-list-item";
import { API_TAGS, config } from "../../../constants";
import { handleLogout, getLinkCategories } from "../../../utils";
import { COLORS } from "../../../theme";
import { useTranslation } from "../../../i18n";
import { useDecodeToken } from "../../../hooks";
import useDashboardSummary from "../../../hooks/use-dashboard-summary";
import { queryClient } from "../../../context";

interface ProfileDrawerListProps {
  /* eslint-disable no-unused-vars */
  toggleDrawer: (
    open: boolean
  ) => (event: React.KeyboardEvent | React.MouseEvent) => void;
  mainDrawer: (
    open: boolean
  ) => (event: React.KeyboardEvent | React.MouseEvent) => void;
}
const ProfileDrawerList: React.FC<ProfileDrawerListProps> = ({
  toggleDrawer,
  mainDrawer,
}) => {
  const pageFullUrl = usePathname();
  const { t } = useTranslation("header");
  const { uid } = useDecodeToken() || {};

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

  return (
    <List sx={{ m: 0, p: 0 }}>
      <ProfileListItem
        listItemText={t("my_account")}
        imagePath={accountIcon}
        imageAlt={t("account")}
        toggleDrawer={toggleDrawer}
        mainDrawer={mainDrawer}
        href={`${config.ql_url}/user/${uid}/edit`}
        external
      />
      <ProfileListItem
        listItemText={`${t("my_saved_ads")}`}
        imagePath={saveAdsIcon}
        imageAlt={t("my_saved_ads")}
        toggleDrawer={toggleDrawer}
        mainDrawer={mainDrawer}
        href={`/favourites-management`}
      />
      <ProfileListItem
        listItemText={`${t("my_saved_searches")}`}
        imageAlt={t("my_saved_searches")}
        imagePath={savedSearchesIcon}
        toggleDrawer={toggleDrawer}
        mainDrawer={mainDrawer}
        href={`/favourites-management`}
      />
      <NestedProfileListItem
        listItemText={t("dashboard")}
        imagePath={dashboardIcon}
        imageAlt={t("dashboard_icon")}
        toggleDrawer={toggleDrawer}
        mainDrawer={mainDrawer}
        subMenuItems={getLinkCategories({
          drupalUid: uid,
          hasSubscription: (dashboardSummary?.subscriptions?.length ?? 0) > 0,
        })}
      />
      <ProfileListItem
        listItemText={t("manage_my_ads")}
        imagePath={manageAdsIcon}
        imageAlt={t("edit_icon")}
        toggleDrawer={toggleDrawer}
        mainDrawer={mainDrawer}
        href={`${config.ql_url}/user/${uid}/classifieds`}
      />
      <ProfileListItem
        color={COLORS.SECONDARY[900]}
        listItemText={t("logout")}
        imagePath={logoutIcon}
        imageAlt={"logout"}
        toggleDrawer={toggleDrawer}
        mainDrawer={mainDrawer}
        href={`${config.ql_logout_url}${pageFullUrl}`}
        onClickCallback={handleLogout}
        external={true}
      />
    </List>
  );
};

export default memo(ProfileDrawerList);
