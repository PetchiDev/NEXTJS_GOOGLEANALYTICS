"use client";
import React, { memo } from "react";
import { Divider, List } from "@mui/material";
import { menu, MenuItem } from "../menu";
import CustomListItem from "./custom-list-item";
import { useTranslation } from "../../../i18n";
import { COLORS } from "../../../theme";
import { config } from "../../../constants";

interface MainDrawerListProps {
  /* eslint-disable no-unused-vars */
  toggleDrawer: (
    open: boolean
  ) => (event: React.KeyboardEvent | React.MouseEvent) => void;
}

const MainDrawerList = ({ toggleDrawer }: Readonly<MainDrawerListProps>) => {
  const { t } = useTranslation("header");
  return (
    <>
      {menu.map((page: MenuItem) => (
        <List key={page.key} sx={{ m: 0 }}>
          <CustomListItem
            pageKey={t(page.key)}
            url={page.url}
            toggleDrawer={toggleDrawer}
            color={COLORS.SECONDARY[900]}
            px={2}
            m={0}
            py={0}
          />
          {page.key === config.app_name && page.submenu && (
            <>
              <List sx={{ pl: 2, m: 0 }}>
                {page.submenu.map(
                  (category: {
                    key: string;
                    url: string;
                    href?: (
                      searchParams: URLSearchParams,
                      isFromDashboard: boolean
                    ) => string;
                  }) => (
                    <CustomListItem
                      key={category.key}
                      pageKey={t(`${page.key}.${category.key}`)}
                      url={
                        category.href
                          ? category.href(new URLSearchParams(), false)
                          : category.url
                      }
                      toggleDrawer={toggleDrawer}
                      color={"grey.700"}
                      py={1.5}
                      px={2}
                      m={0}
                    />
                  )
                )}
              </List>
              <Divider />
              {page.rightSubMenu && (
                <List sx={{ pl: 2, m: 0 }}>
                  {page.rightSubMenu.map(
                    (category: { key: string; url: string }) => (
                      <CustomListItem
                        key={category.key}
                        pageKey={t(`${category.key}`)}
                        url={category.url}
                        toggleDrawer={toggleDrawer}
                        color={"grey.700"}
                        py={1.5}
                        px={2}
                        m={0}
                      />
                    )
                  )}
                </List>
              )}
            </>
          )}
        </List>
      ))}
    </>
  );
};

export default memo(MainDrawerList);
