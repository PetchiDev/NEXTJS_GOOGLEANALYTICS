import React, { memo } from "react";
import { Modal, Typography, Button, Grid } from "@mui/material";
import { CheckmarkIcon } from "../../icons";
import { COLORS } from "../../theme";
import { useTranslation } from "../../i18n";

interface CustomSuccessModal {
  open: boolean;
  title: string;
  description: string;
  onClose: () => void;
  translationNS: string;
  icon?: React.ReactNode;
  closeText?: string;
}

const CustomSuccessModal: React.FC<CustomSuccessModal> = ({
  open,
  title,
  description,
  onClose,
  translationNS,
  icon,
  closeText = "living_rewards.btn.close",
}) => {
  const { t } = useTranslation(translationNS);
  return (
    <Modal
      open={open}
      onClose={onClose}
      aria-labelledby="success-modal-title"
      aria-describedby="success-modal-description"
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
        rowGap={"20px"}
      >
        <Grid item display={"flex"}>
          {icon ? icon : <CheckmarkIcon width={48} height={48} />}
        </Grid>
        <Grid
          item
          sx={{
            textAlign: "center",
            display: "flex",
            flexDirection: "column",
            rowGap: 1,
          }}
        >
          <Typography
            id="success-modal-title"
            variant="body1SemiBold"
            color={COLORS.GREY[900]}
            textAlign="center"
          >
            {title}
          </Typography>
          <Typography
            id="success-modal-description"
            variant="h4Regular"
            color={COLORS.GREY[800]}
            textAlign="center"
          >
            {description}
          </Typography>
        </Grid>
        <Grid item sx={{ width: "100%", mt: 1.5 }}>
          <Button
            fullWidth
            data-testid="close-btn"
            variant="contained"
            onClick={onClose}
            sx={{
              padding: "10px 16px",
              height: 48,
              borderRadius: "6px",
            }}
          >
            {t(closeText)}
          </Button>
        </Grid>
      </Grid>
    </Modal>
  );
};

export default memo(CustomSuccessModal);
