"use client";
import { useState, useEffect, useMemo, useCallback } from "react";
import { PAGINATION_DEFAULTS, PAGINATION_PARAMS } from "../constants";
import { usePathname, useSearchParams } from "next/navigation";
import { useRouter } from "nextjs-toploader/app";

interface UsePaginationProps<T> {
  rows: T[];
}

export const usePaginationParams = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const page = Number(
    searchParams.get(PAGINATION_PARAMS.CUR_PAGE) ??
      PAGINATION_DEFAULTS.DEFAULT_CUR_PAGE
  );
  const pageSize = Number(
    searchParams.get(PAGINATION_PARAMS.PER_PAGE) ??
      PAGINATION_DEFAULTS.DEFAULT_PER_PAGE
  );

  const removeCurrentPage = useCallback(() => {
    const params = new URLSearchParams(searchParams.toString());
    params.delete(PAGINATION_PARAMS.CUR_PAGE);
    router.replace(pathname + "?" + params.toString(), {
      scroll: false,
    });
  }, [pathname, router, searchParams]);

  const removePerPage = useCallback(() => {
    const params = new URLSearchParams(searchParams.toString());
    params.delete(PAGINATION_PARAMS.PER_PAGE);
    router.replace(pathname + "?" + params.toString(), {
      scroll: false,
    });
  }, [pathname, router, searchParams]);

  const paginationModel = useMemo(
    () => ({
      page,
      pageSize,
    }),
    [page, pageSize]
  );
  return {
    ...paginationModel,
    removeCurrentPage,
    removePerPage,
  };
};

export const usePagination = <T extends object>({
  rows,
}: UsePaginationProps<T>) => {
  const [filteredRows, setFilteredRows] = useState<T[]>(rows);
  const paginationModel = usePaginationParams();

  const totalPages = useMemo(() => {
    return Math.ceil((rows?.length ?? 0) / paginationModel.pageSize);
  }, [rows?.length, paginationModel.pageSize]);

  useEffect(() => {
    if (rows?.length) setFilteredRows(rows);
  }, [rows]);

  const currentRows = useMemo(() => {
    return filteredRows?.slice(
      (paginationModel.page - 1) * paginationModel.pageSize,
      paginationModel.page * paginationModel.pageSize
    );
  }, [paginationModel.pageSize, paginationModel.page, filteredRows]);

  return { currentRows, totalPages, paginationModel };
};
