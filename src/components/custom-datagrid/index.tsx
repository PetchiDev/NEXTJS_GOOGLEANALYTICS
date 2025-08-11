"use client";
import React, { FC, memo } from "react";
import {
  BaseCheckboxPropsOverrides,
  DataGrid,
  GridCallbackDetails,
  GridColDef,
  GridRowClassNameParams,
  GridRowIdGetter,
  GridRowSelectionModel,
  GridSortModel,
} from "@mui/x-data-grid";
import { Box, CheckboxProps } from "@mui/material";
import { DEFAULT_PAGE_SIZE_OPTIONS } from "../../constants";
import { COLORS } from "../../theme";
import CustomPagination from "../custom-pagination";
import { usePaginationParams } from "../../hooks";
import CustomNoRowsOverlay from "../custom-no-row-overlay";

interface CustomDataGridProps<T> {
  rows: T[];
  columns: GridColDef[];
  checkboxSelection?: boolean;
  rowHeight?: number;
  totalPages: number;
  pageNumber?: number;
  rowSelectionModel?: GridRowSelectionModel;
  onRowSelectionModelChange?: (
    newRowSelectionModel: GridRowSelectionModel
  ) => void;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  getRowId?: GridRowIdGetter<any>;
  checkboxComponent?: React.JSXElementConstructor<
    CheckboxProps & BaseCheckboxPropsOverrides
  >;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  getRowClassName?: (params: GridRowClassNameParams<any>) => string;
  sortModel?: GridSortModel;

  onSortModelChange?: (
    model: GridSortModel,
    details: GridCallbackDetails
  ) => void;
}

const Pagination: FC<{
  totalPages: number;
  paginationModel: {
    page: number;
    pageSize: number;
  };
}> = ({ totalPages, paginationModel }) => {
  return (
    <Box minHeight={"fit-content"} width={"100%"} py={{ xs: 0, lg: 2 }}>
      <CustomPagination
        totalPages={totalPages}
        preSelectedPerPage={String(paginationModel.pageSize)}
        paginationOptions={DEFAULT_PAGE_SIZE_OPTIONS}
        translationNS="home"
      />
    </Box>
  );
};

const CustomDataGrid = <T extends object>({
  rows,
  columns,
  checkboxSelection = true,
  rowHeight = 72,
  totalPages,
  pageNumber,
  rowSelectionModel,
  onRowSelectionModelChange,
  getRowId,
  checkboxComponent,
  getRowClassName,
  sortModel,
  onSortModelChange,
}: CustomDataGridProps<T>) => {
  const paginationModel = usePaginationParams();
  if (!rows || rows.length == 0) {
    return <CustomNoRowsOverlay title={"No data found"} />;
  }
  return (
    <DataGrid
      rows={rows}
      columns={columns}
      disableRowSelectionOnClick
      checkboxSelection={checkboxSelection}
      rowHeight={rowHeight}
      hideFooterSelectedRowCount
      pagination
      paginationMode="client"
      pageSizeOptions={DEFAULT_PAGE_SIZE_OPTIONS}
      disableColumnResize
      disableColumnMenu
      getRowHeight={() => "auto"}
      paginationModel={{
        page: pageNumber ?? paginationModel.page,
        pageSize: paginationModel.pageSize,
      }}
      getRowId={getRowId}
      rowSelectionModel={rowSelectionModel}
      onRowSelectionModelChange={onRowSelectionModelChange}
      getRowClassName={getRowClassName}
      sx={{
        "& .MuiDataGrid-columnHeader": {
          backgroundColor: COLORS.GREY[150],
          borderBottom: `1px solid ${COLORS.GREY[200]}`,
        },

        "& .MuiDataGrid-columnHeader:focus": {
          outline: "none",
        },
        "& .MuiDataGrid-columnHeader:focus-within": {
          outline: "none",
        },
        "& .MuiDataGrid-row": {
          borderBottom: `1px solid ${COLORS.GREY[200]}`,
        },
        "& .MuiDataGrid-cell:focus": {
          outline: "none",
        },
        "& .MuiDataGrid-cell:focus-within": {
          outline: "none",
        },
      }}
      slots={{
        pagination: () => (
          <Pagination
            totalPages={totalPages}
            paginationModel={paginationModel}
          />
        ),
        baseCheckbox: checkboxComponent,
      }}
      sortModel={sortModel}
      onSortModelChange={onSortModelChange}
    />
  );
};

export default memo(CustomDataGrid);
