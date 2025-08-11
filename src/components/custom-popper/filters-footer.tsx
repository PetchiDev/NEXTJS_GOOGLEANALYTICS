import React from "react";
import { Button, Stack, SxProps } from "@mui/material";
import { ResponsiveStyleValue } from "@mui/system";
import { COLORS } from "../../theme";
interface FiltersFooterProps {
  resetText?: string;
  applyText: string;
  onReset?: () => void;
  onClose?: (event: Event | React.SyntheticEvent) => void;
  sx?: SxProps;
  buttonDirection?: "row" | "column" | "row-reverse" | "column-reverse";
  onApply: () => void;
  showCloseButton?: boolean;
  showSecondaryButton?: boolean;
  showMainButton?: boolean;
  disableApply?: boolean;
}

const FiltersFooter = ({
  resetText,
  applyText,
  onReset,
  sx,
  buttonDirection,
  onApply,
  onClose,
  showCloseButton = false,
  showSecondaryButton = true,
  showMainButton = true,
  disableApply,
}: FiltersFooterProps) => {
  const direction: ResponsiveStyleValue<
    "row" | "column" | "row-reverse" | "column-reverse"
  > = buttonDirection ?? { xs: "column", xl: "row" };

  return (
    <Stack
      columnGap={{ xs: "15px", lg: 1.5 }}
      rowGap={0.5}
      direction={direction}
      borderTop={`1px solid ${COLORS.GREY[300]}`}
      position={"sticky"}
      bottom={0}
      bgcolor={COLORS.WHITE}
      borderRadius={"0 0 6px 6px"}
      sx={{ ...sx }}
    >
      {showSecondaryButton && (
        <Button
          data-testid={`${resetText}-btn`}
          onClick={showCloseButton ? onClose : onReset}
          variant="text"
          sx={{
            typography: "bodyMedium",
            height: 44,
            px: 2,
            py: "10px",
            color:
              resetText === "Cancel" ? COLORS.GREY[900] : COLORS.PRIMARY[900],
            border:
              resetText === "Cancel"
                ? `1px solid ${COLORS.SECONDARY.BUTTON.BG_BORDER}`
                : "none",
          }}
        >
          {resetText}
        </Button>
      )}
      {showMainButton && (
        <Button
          data-testid={`${resetText}-btn`}
          onClick={onApply}
          variant="contained"
          sx={{
            typography: "bodySemiBold",
            height: 44,
            px: 2,
            py: "10px",
          }}
          disabled={disableApply}
        >
          {applyText}
        </Button>
      )}
    </Stack>
  );
};

export default FiltersFooter;
