"use client";
import { CustomLink } from "../../custom-link";
import CloseRoundedIcon from "@mui/icons-material/CloseRounded";
import KeyboardArrowLeftIcon from "@mui/icons-material/KeyboardArrowLeft";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";
import {
  Button,
  Divider,
  Grid,
  IconButton,
  Stack,
  Typography,
} from "@mui/material";
import Image from "next/image";
import { usePathname } from "next/navigation";
import logoDrawer from "public/images/header/drawer-images/logo-drawer.png";
import React, { Dispatch, SetStateAction, memo } from "react";
import { config } from "../../../constants";
import { useDecodeToken } from "../../../hooks";
import { AccountIcon } from "../../../icons";
import { useTranslation } from "../../../i18n";
import { COLORS } from "../../../theme";

interface DrawerHeaderProps {
  /* eslint-disable no-unused-vars */
  toggleDrawer: (
    open: boolean
  ) => (event: React.KeyboardEvent | React.MouseEvent) => void;
  isAuthenticated: boolean;
  setShowProfileMenu: Dispatch<SetStateAction<boolean>>;
  isProfileDrawer?: boolean;
}

const DrawerHeader: React.FC<DrawerHeaderProps> = ({
  toggleDrawer,
  isAuthenticated,
  setShowProfileMenu,
  isProfileDrawer = false,
}) => {
  const { t } = useTranslation("header");
  const pageFullUrl = usePathname();
  const { name, email } = useDecodeToken() || {};
  return (
    <>
      <Stack flexDirection={"row"} px={2} justifyContent={"space-between"}>
        <Image
          src={logoDrawer}
          width={40}
          height={40}
          alt={t("Qatar_Living")}
          unoptimized
        />
        <IconButton onClick={(e) => toggleDrawer(false)(e)}>
          <CloseRoundedIcon />
        </IconButton>
      </Stack>
      {isAuthenticated === false ? (
        <>
          <Stack flexDirection={"row"} p={2} gap={2} height={72}>
            <Button
              data-testid="signup-btn"
              variant="contained"
              href={`${config.ql_register_url}${pageFullUrl}`}
            >
              {t("sign_up")}
            </Button>
            <Button
              data-testid="login-btn"
              variant="outlined"
              href={`${config.ql_login_url}${pageFullUrl}`}
              component={CustomLink}
              isExternalLink={true}
            >
              {t("login")}
            </Button>
          </Stack>
          <Divider />
        </>
      ) : (
        <Grid py={2}>
          <Grid
            item
            container
            direction="row"
            alignItems="center"
            px={2}
            width="100%"
            justifyContent="space-between"
            wrap="nowrap"
          >
            <Stack direction="row" gap={1.5} alignItems="center" flexGrow={1}>
              <AccountIcon />
              {name || email ? (
                <Stack direction="column">
                  <Typography
                    component="p"
                    variant="textSemibold"
                    color={COLORS.PRIMARY[900]}
                  >
                    {name}
                  </Typography>
                  {email ? (
                    <Typography
                      component="p"
                      variant="h4Regular"
                      sx={{
                        whiteSpace: "normal",
                        wordBreak: "break-word",
                      }}
                    >
                      {email}
                    </Typography>
                  ) : null}
                </Stack>
              ) : null}
            </Stack>
            {isProfileDrawer ? (
              <IconButton
                onClick={() => {
                  setShowProfileMenu(false);
                }}
              >
                <KeyboardArrowLeftIcon />
              </IconButton>
            ) : (
              <IconButton
                onClick={() => {
                  setShowProfileMenu(true);
                }}
              >
                <KeyboardArrowRightIcon />
              </IconButton>
            )}
          </Grid>
        </Grid>
      )}
    </>
  );
};

export default memo(DrawerHeader);
