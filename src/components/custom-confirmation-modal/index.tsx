"use client";
import {
  Grid,
  Modal,
  Typography,
  Button,
  CircularProgress,
} from "@mui/material";
import React, { FC, memo } from "react";
import { useTranslation } from "../../i18n";

import { COLORS } from "../../theme";

interface ICustomConfirmationModal {
  open: boolean;
  title: string;
  description?: string;
  onClose: () => void;
  onConfirm: () => void;
  Icon: React.ReactNode;
  translationNS: string;
  isLoading?: boolean;
  confirmText?: string;
  renderContent?: React.ReactNode;
  disableConfirm?: boolean;
  renderContentBelowHeading?: React.ReactNode;
  actionButtons?: React.ReactNode;
}

const CustomConfirmationModal: FC<ICustomConfirmationModal> = ({
  open,
  title,
  description,
  onClose,
  onConfirm,
  Icon,
  translationNS,
  isLoading = false,
  confirmText = "custom_modal.btn.confirm",
  renderContent,
  disableConfirm = false,
  renderContentBelowHeading,
  actionButtons,
}) => {
  const { t } = useTranslation(translationNS);

  return (
    <Modal
      open={open}
      onClose={onClose}
      aria-labelledby="custom-confirmation-modal-title"
      aria-describedby="custom-confirmation-modal-description"
      sx={{
        ".MuiBackdrop-root": {
          background: {
            xs: "rgba(0, 0, 0, 0.60)",
            lg: "rgba(0, 0, 0, 0.60)",
          },
          backdropFilter: "blur(11px)",
        },
      }}
    >
      <Grid
        container
        direction="column"
        alignItems="center"
        rowGap={"20px"}
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: "100%",
          maxWidth: 400,
          bgcolor: "background.paper",
          borderRadius: 3,
          boxShadow: 24,
          p: 3,
        }}
      >
        <Grid item display={"flex"}>
          {Icon}
        </Grid>
        <Grid
          item
          sx={{
            display: "flex",
            flexDirection: "column",
            rowGap: 1,
          }}
        >
          <Typography
            id="custom-confirmation-modal-title"
            variant="body1SemiBold"
            component="h2"
            textAlign="center"
            color={COLORS.GREY[900]}
          >
            {title}
          </Typography>

          {renderContentBelowHeading && renderContentBelowHeading}
          <Typography
            id="custom-confirmation-modal-description"
            variant="h4Regular"
            textAlign="center"
            color={COLORS.GREY[800]}
          >
            {description}
          </Typography>
        </Grid>
        {renderContent && (
          <Grid item container>
            {renderContent}
          </Grid>
        )}
        <Grid item container spacing={1.5} mt={1.5}>
          {actionButtons ?? (
            <>
              <Grid
                item
                xs={12}
                md={6}
                sx={{
                  order: { xs: 2, md: 1 },
                }}
              >
                <Button
                  disabled={isLoading}
                  fullWidth
                  variant="outlined"
                  onClick={onClose}
                  sx={{
                    height: 44,
                    borderRadius: "6px",
                    color: "black",
                    borderColor: COLORS.SECONDARY.BUTTON.BG_BORDER,
                  }}
                >
                  {t("custom_modal.btn.cancel")}
                </Button>
              </Grid>
              <Grid
                item
                xs={12}
                md={6}
                sx={{
                  order: { xs: 1, md: 2 },
                }}
              >
                <Button
                  data-testid="confirm-btn"
                  fullWidth
                  variant="contained"
                  onClick={onConfirm}
                  color="primary"
                  endIcon={
                    isLoading && (
                      <CircularProgress
                        size={20}
                        sx={{ color: COLORS.GREY[400] }}
                      />
                    )
                  }
                  disabled={isLoading || disableConfirm}
                  sx={{ height: 44, borderRadius: "6px" }}
                >
                  {t(confirmText)}
                </Button>
              </Grid>
            </>
          )}
        </Grid>
      </Grid>
    </Modal>
  );
};

export default memo(CustomConfirmationModal);
