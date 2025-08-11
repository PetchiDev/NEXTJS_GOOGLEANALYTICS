"use client";
import {
  ListItemText,
  ListItemTextProps,
  Tooltip,
  TooltipProps,
} from "@mui/material";
import isEqual from "lodash/isEqual";
import React, { useEffect, useRef, useState } from "react";
type IOverflowTip = {
  listItemTextProps?: ListItemTextProps;
  tooltipProps: Omit<TooltipProps, "children">;
};
const OverflowTip = ({
  tooltipProps,
  listItemTextProps,
}: Readonly<IOverflowTip>) => {
  const [isOverflow, setIsOverflow] = useState(false);
  const textElementRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (textElementRef.current) {
      setIsOverflow(
        Boolean(
          textElementRef?.current?.scrollWidth >
            textElementRef?.current?.clientWidth
        )
      );
    }
  }, []);

  return (
    <Tooltip {...tooltipProps} disableHoverListener={!isOverflow}>
      <ListItemText
        {...listItemTextProps}
        sx={{ textTransform: "capitalize" }}
        primaryTypographyProps={{
          ref: textElementRef,
          overflow: "hidden",
          whiteSpace: "nowrap",
          textOverflow: "ellipsis",
          ...listItemTextProps?.primaryTypographyProps,
        }}
      />
    </Tooltip>
  );
};

export default React.memo(OverflowTip, isEqual);
