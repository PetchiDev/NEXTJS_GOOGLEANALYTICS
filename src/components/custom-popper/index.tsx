"use client";
import {
  ClickAwayListener,
  Grow,
  MenuList,
  Paper,
  Stack,
  SxProps,
} from "@mui/material";
import React, {
  memo,
  ReactNode,
  SyntheticEvent,
  useLayoutEffect,
  useState,
} from "react";
import { StyledPopper } from "../styled-components";
import FiltersFooter from "./filters-footer";
import { RefCallBack } from "react-hook-form";

interface FilterPopperProps {
  open: boolean;
  anchorRef: React.RefObject<HTMLButtonElement>;
  onClose: (event: Event | SyntheticEvent<Element, Event>) => void;
  onApply: () => void;
  children: ReactNode; // Accept dynamic children for different filter sections
  onReset?: () => void;
  showCloseButton?: boolean;
  applyText?: string;
  resetText?: string;
  showSecondaryButton?: boolean;
  showMainButton?: boolean;
  minWidth?: number;
  sx?: SxProps;
  ref?: RefCallBack;
  disableApply?: boolean;
}

const CustomPopper: React.FC<FilterPopperProps> = ({
  open,
  anchorRef,
  onClose,
  onApply,
  onReset,
  showCloseButton,
  applyText = "",
  resetText = "",
  children,
  showSecondaryButton = true,
  showMainButton = true,
  minWidth,
  sx,
  ref,
  disableApply,
}) => {
  const [popperWidth, setPopperWidth] = useState<number | null>(null);
  useLayoutEffect(() => {
    if (anchorRef.current) {
      setPopperWidth(anchorRef.current.offsetWidth);
    }
  }, [anchorRef, open]);
  return (
    <StyledPopper
      disablePortal={false}
      open={open}
      anchorEl={anchorRef.current}
      role={undefined}
      placement="bottom-start"
      transition
      sx={{
        ...sx,
        minWidth: minWidth ?? 240,
        width: popperWidth ?? "auto",
      }}
      ref={ref}
    >
      {({ TransitionProps, placement }) => (
        <Grow
          {...TransitionProps}
          style={{
            transformOrigin:
              placement === "bottom-start" ? "left top" : "left bottom",
          }}
        >
          <Paper>
            <ClickAwayListener onClickAway={onClose}>
              <MenuList
                autoFocusItem={open}
                id="composition-menu"
                aria-labelledby="composition-button"
                sx={{
                  lg: {
                    maxWidth: 319,
                  },
                  xs: { width: "100%" },
                }}
              >
                <Stack rowGap={1}>
                  {/* Render the passed children here */}
                  {children}
                  {(showSecondaryButton || showMainButton) && (
                    <FiltersFooter
                      resetText={resetText}
                      applyText={applyText}
                      showCloseButton={showCloseButton}
                      onApply={onApply}
                      onClose={onClose}
                      onReset={onReset}
                      buttonDirection="row"
                      sx={{ pt: 1.5 }}
                      showSecondaryButton={showSecondaryButton}
                      showMainButton={showMainButton}
                      disableApply={disableApply}
                    />
                  )}
                </Stack>
              </MenuList>
            </ClickAwayListener>
          </Paper>
        </Grow>
      )}
    </StyledPopper>
  );
};

export default memo(CustomPopper);
