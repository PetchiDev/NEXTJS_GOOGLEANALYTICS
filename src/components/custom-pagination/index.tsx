"use client";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import {
  Button,
  Grid,
  IconButton,
  Pagination,
  SelectChangeEvent,
  Stack,
  Typography,
} from "@mui/material";
import { usePathname, useSearchParams } from "next/navigation";
import { useRouter } from "nextjs-toploader/app";
import React, {
  FC,
  MouseEventHandler,
  PropsWithChildren,
  ReactNode,
  memo,
  useCallback,
  useEffect,
  useLayoutEffect,
  useMemo,
  useState,
} from "react";
import Overlay from "../overlay";
import { updateSearchParams, updateWindowSearchParams } from "../../utils/misc";
import { COLORS } from "../../theme";
import {
  DEFAULT_PER_PAGE,
  MODULE,
  PAGINATION_DEFAULTS,
  PAGINATION_PARAMS,
} from "../../constants";
import { useTranslation } from "../../i18n";
import QLSelect from "../ql-select";
import { trackPageView } from "../../utils/analytics";

interface PrevNextButtonProps extends PropsWithChildren {
  startIcon?: ReactNode;
  endIcon?: ReactNode;
  disabled?: boolean;
  onClick?: MouseEventHandler<HTMLButtonElement>;
}
const PrevNextButton: FC<PrevNextButtonProps> = memo(
  ({ children, startIcon, endIcon, disabled = false, onClick }) => {
    return (
      <Button
        data-testid={`${children}-btn`}
        variant="outlinedSecondary"
        size="sm"
        sx={{
          borderRadius: 1,
          color: COLORS.SECONDARY.FORM_INPUTS.FORM_ICONS_AND_BREADCRUMBS,
          width: "unset",
        }}
        startIcon={startIcon}
        endIcon={endIcon}
        disabled={disabled}
        onClick={onClick}
      >
        {children}
      </Button>
    );
  }
);

PrevNextButton.displayName = "PrevNextButton";
interface CustomPaginationProps {
  totalPages: number;
  preSelectedPerPage?: string;
  paginationOptions?: number[];
  translationNS: string;
  isMapView?: boolean;
  utilizeWindowParams?: boolean;
  hideResultsPerPage?: boolean;
  module?: MODULE;
}

const CustomPagination: FC<CustomPaginationProps> = ({
  totalPages,
  preSelectedPerPage,
  paginationOptions = [10, 20],
  translationNS,
  isMapView,
  utilizeWindowParams = false,
  hideResultsPerPage = false,
  module = MODULE.REWARDS,
}) => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [selectedPerPage, setSelectedPerPage] = useState<string>(
    preSelectedPerPage ?? String(DEFAULT_PER_PAGE)
  );
  const [loading, setLoading] = useState<boolean>(false);
  const curpage = Number(
    searchParams.get(PAGINATION_PARAMS.CUR_PAGE) ??
      PAGINATION_DEFAULTS.DEFAULT_CUR_PAGE
  );
  const [currentPage, setCurrentPage] = useState(Number(curpage));
  const { t } = useTranslation(translationNS);
  const options = useMemo(() => {
    return paginationOptions?.map((value) => {
      return {
        id: value.toString(),
        name: `${value} ${t("results_per_page")}`,
      };
    });
  }, [paginationOptions, t]);
  useLayoutEffect(() => {
    //if perpage option from url is listed in our perpage options
    if (
      options.map((opt) => opt.id).includes(searchParams.get("perpage") || "")
    ) {
      setSelectedPerPage(
        searchParams.get("perpage") ??
          preSelectedPerPage ??
          String(PAGINATION_DEFAULTS.DEFAULT_PER_PAGE)
      );
    }
  }, [searchParams, t, pathname, router, preSelectedPerPage, options]);

  const handlePerPageSelect = useCallback(
    (event: SelectChangeEvent<string>) => {
      setLoading(true);
      const params = new URLSearchParams(searchParams.toString());
      params.set(PAGINATION_PARAMS.PER_PAGE, event.target.value);
      params.delete(PAGINATION_PARAMS.CUR_PAGE);
      setSelectedPerPage(event.target.value);
      router.replace(pathname + "?" + params.toString(), {
        scroll: false,
      });
      trackPageView("Pagination Size Change", undefined);
    },
    [module, pathname, router, searchParams]
  );
  useEffect(() => {
    setLoading(false);
  }, [searchParams]);

  return (
    <>
      {loading && <Overlay open={loading} />}
      <Grid
        container
        rowSpacing={{ md: isMapView ? 0 : 2, xs: 0 }}
        component={"section"}
        pt={isMapView ? 2 : 0}
      >
        {!isMapView && (
          <Grid
            item
            md={2}
            px={0}
            display={{ md: "flex", xs: "none" }}
            height={"fit-content"}
          >
            <PrevNextButton
              startIcon={
                <ArrowBackIcon
                  sx={{
                    width: 20,
                    height: 20,
                  }}
                />
              }
              disabled={curpage <= 1}
              onClick={() => {
                if (currentPage !== currentPage - 1) {
                  setCurrentPage(currentPage - 1);
                  setLoading(true);
                  if (utilizeWindowParams) {
                    updateWindowSearchParams({
                      paramName: PAGINATION_PARAMS.CUR_PAGE,
                      paramVal: String(Number(curpage) - 1),
                      pathname,
                      searchParams,
                    });
                  } else
                    updateSearchParams({
                      paramName: PAGINATION_PARAMS.CUR_PAGE,
                      paramVal: String(Number(curpage) - 1),
                      pathname,
                      router,
                      searchParams,
                      scroll: false,
                    });
                }
                trackPageView("Pagination Navigation", undefined);
              }}
            >
              {t("previous")}
            </PrevNextButton>
          </Grid>
        )}

        <Grid
          item
          xs={1.5}
          lg={"auto"}
          display={{ md: isMapView ? "flex" : "none", xs: "flex" }}
          alignItems={"center"}
          justifyContent={"start"}
        >
          <IconButton
            disabled={curpage <= 1}
            onClick={() => {
              setLoading(true);
              if (utilizeWindowParams) {
                updateWindowSearchParams({
                  paramName: PAGINATION_PARAMS.CUR_PAGE,
                  paramVal: String(Number(curpage) - 1),
                  pathname,
                  searchParams,
                });
              } else {
                updateSearchParams({
                  paramName: PAGINATION_PARAMS.CUR_PAGE,
                  paramVal: String(Number(curpage) - 1),
                  pathname,
                  router,
                  searchParams,
                  scroll: false,
                });
              }
              trackPageView("Pagination Navigation", undefined);
            }}
            aria-label="Previous"
            sx={{
              height: 36,
              borderRadius: "6px !important",
              bgcolor: COLORS.WHITE,
              color: COLORS.SECONDARY.FORM_INPUTS.FORM_ICONS_AND_BREADCRUMBS,
              border: `1px solid ${COLORS.SECONDARY.BUTTON.BG_BORDER}`,
            }}
          >
            <ArrowBackIcon
              sx={{
                width: 20,
                height: 20,
              }}
            />
          </IconButton>
        </Grid>

        {!isMapView && (
          <Grid
            item
            display={{ md: "flex", xs: "none" }}
            md={8}
            container
            alignItems={"center"}
            justifyContent={"center"}
          >
            <Stack>
              <Pagination
                shape="rounded"
                count={totalPages}
                hideNextButton
                hidePrevButton
                onChange={(event, page) => {
                  if (currentPage !== page) {
                    setCurrentPage(page);
                    setLoading(true);
                    if (utilizeWindowParams) {
                      updateWindowSearchParams({
                        paramName: PAGINATION_PARAMS.CUR_PAGE,
                        paramVal: String(page),
                        pathname,
                        searchParams,
                      });
                    } else
                      updateSearchParams({
                        paramName: PAGINATION_PARAMS.CUR_PAGE,
                        paramVal: String(page),
                        pathname,
                        router,
                        searchParams,
                        scroll: false,
                      });
                    trackPageView("Pagination Navigation", undefined);
                  }
                }}
                page={Number(curpage)}
                sx={{
                  mb: 2,
                  "& .MuiPaginationItem-ellipsis": {
                    display: "flex",
                    alignItems: "center",
                  },
                  "& .MuiPagination-ul": {
                    justifyContent: "center",
                  },
                }}
              />
              {!hideResultsPerPage && (
                <QLSelect
                  data-testid="results-per-page-field"
                  showError={false}
                  inputField={{
                    size: "small",
                    value: selectedPerPage,
                    onChange: handlePerPageSelect,
                  }}
                  MuiFieldProps={{
                    optionArray: options,
                    fullWidth: true,
                  }}
                />
              )}
            </Stack>
          </Grid>
        )}

        <Grid
          item
          xs={isMapView ? true : 9}
          display={{ xs: "flex", md: isMapView ? "flex" : "none" }}
          container={isMapView}
          alignItems={"center"}
          justifyContent={"center"}
        >
          <Typography
            variant="textMedium"
            fontWeight={400}
            color={COLORS.SECONDARY.FORM_INPUTS.FORM_ICONS_AND_BREADCRUMBS}
          >
            {t("page") + " "}
            <span style={{ color: COLORS.GREY[800], fontWeight: 500 }}>
              {curpage}
            </span>{" "}
            {t("of") + " "}
            <span style={{ color: COLORS.GREY[800], fontWeight: 500 }}>
              {totalPages}
            </span>
          </Typography>
        </Grid>
        {!isMapView && (
          <Grid
            item
            md={2}
            px={0}
            display={{ md: "flex", xs: "none" }}
            sx={{ justifyContent: "flex-end" }}
            height={"fit-content"}
          >
            <PrevNextButton
              endIcon={
                <ArrowForwardIcon
                  sx={{
                    width: 20,
                    height: 20,
                  }}
                />
              }
              disabled={curpage >= totalPages}
              onClick={() => {
                if (currentPage !== currentPage + 1) {
                  setCurrentPage(currentPage + 1);
                  setLoading(true);
                  if (utilizeWindowParams) {
                    updateWindowSearchParams({
                      paramName: PAGINATION_PARAMS.CUR_PAGE,
                      paramVal: String(Number(curpage) + 1),
                      pathname,
                      searchParams,
                    });
                  } else {
                    updateSearchParams({
                      paramName: PAGINATION_PARAMS.CUR_PAGE,
                      paramVal: String(Number(curpage) + 1),
                      pathname,
                      router,
                      searchParams,
                      scroll: false,
                    });
                  }
                  trackPageView("Pagination Navigation", undefined);
                }
              }}
            >
              {t("next")}
            </PrevNextButton>
          </Grid>
        )}

        <Grid
          item
          xs={1.5}
          lg={"auto"}
          display={{ md: isMapView ? "flex" : "none", xs: "flex" }}
          alignItems={"center"}
          justifyContent={"end"}
        >
          <IconButton
            disabled={curpage >= totalPages}
            onClick={() => {
              setLoading(true);
              if (utilizeWindowParams) {
                updateWindowSearchParams({
                  paramName: PAGINATION_PARAMS.CUR_PAGE,
                  paramVal: String(Number(curpage) + 1),
                  pathname,
                  searchParams,
                });
              } else {
                updateSearchParams({
                  paramName: PAGINATION_PARAMS.CUR_PAGE,
                  paramVal: String(Number(curpage) + 1),
                  pathname,
                  router,
                  searchParams,
                  scroll: false,
                });
              }
              trackPageView("Pagination Navigation", undefined);
            }}
            sx={{
              height: 36,
              borderRadius: "6px !important",
              bgcolor: COLORS.WHITE,
              color: COLORS.SECONDARY.FORM_INPUTS.FORM_ICONS_AND_BREADCRUMBS,
              border: `1px solid ${COLORS.SECONDARY.BUTTON.BG_BORDER}`,
            }}
            aria-label="Next"
          >
            <ArrowForwardIcon
              sx={{
                width: 20,
                height: 20,
              }}
            />
          </IconButton>
        </Grid>
      </Grid>
      {!hideResultsPerPage && (
        <Grid
          container
          display={{ xs: "flex", md: isMapView ? "flex" : "none" }}
          justifyContent={"center"}
          mt={2}
        >
          <Grid
            item
            xs={isMapView ? "auto" : 9}
            minWidth={isMapView ? 271 : "auto"}
            sx={{
              "& .MuiSelect-select": {
                p: "10px 14px !important",
                typography: "h3Medium",
                color: "grey.600",
              },
            }}
          >
            <QLSelect
              data-testid="results-per-page-field"
              showError={false}
              inputField={{
                size: "small",
                value: selectedPerPage,
                onChange: handlePerPageSelect,
              }}
              MuiFieldProps={{
                optionArray: options,
                fullWidth: true,
              }}
            />
          </Grid>
        </Grid>
      )}
    </>
  );
};

export default memo(CustomPagination);
