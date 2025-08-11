import React, { memo } from "react";
import { Skeleton } from "@mui/material";
import BreadcrumbsContainer from "./breadcrumbs-container";

const BreadcrumbsSkeleton = () => {
  return (
    <BreadcrumbsContainer>
      <Skeleton sx={{ typography: "body2Medium" }} width={230} />
    </BreadcrumbsContainer>
  );
};

export default memo(BreadcrumbsSkeleton);
