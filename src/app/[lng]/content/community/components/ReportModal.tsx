"use client";
import React from "react";
import {
  Box,
  Modal,
  Typography,
  Button,
  Stack,
  Backdrop,
} from "@mui/material";
import WarningAmberRoundedIcon from "@mui/icons-material/WarningAmberRounded";

interface ReportModalProps {
  open: boolean;
  onClose: () => void;
  onConfirm: () => void;
}

const ReportModal: React.FC<ReportModalProps> = ({
  open,
  onClose,
  onConfirm,
}) => {
  return (
    <Modal
      open={open}
      onClose={onClose}
      closeAfterTransition
      BackdropComponent={Backdrop}
      BackdropProps={{
        timeout: 300,
        sx: {
          backdropFilter: "blur(4px)",
          backgroundColor: "rgba(0, 0, 0, 0.2)",
        },
      }}
    >
      <Box
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          bgcolor: "#fff",
          borderRadius: "16px",
          width: 360,
          p: 4,
          outline: "none",
          textAlign: "center",
          boxShadow: 24,
        }}
      >
        {/* Icon */}
        <Box
          sx={{
            bgcolor: "#FFF4E5",
            width: 60,
            height: 60,
            borderRadius: "50%",
            mx: "auto",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            mb: 2,
          }}
        >
          <WarningAmberRoundedIcon sx={{ color: "#F39224", fontSize: 32 }} />
        </Box>

        {/* Heading */}
        <Typography
          variant="h6"
          fontWeight={700}
          color="#22273A"
          mb={1}
        >
          Report Post
        </Typography>

        {/* Message */}
        <Typography
          variant="body2"
          color="#666"
          mb={3}
        >
          Are you sure you want to report this post?
        </Typography>

        {/* Actions */}
        <Stack direction="row" spacing={2} justifyContent="center">
          <Button
            variant="outlined"
            onClick={onClose}
            sx={{
              borderRadius: "8px",
              px: 3,
              fontWeight: 600,
              textTransform: "none",
              color: "#F39224",
              borderColor: "#F39224",
              "&:hover": {
                borderColor: "#da7c1e",
                backgroundColor: "#FFF4E5",
              },
            }}
          >
            Cancel
          </Button>
          <Button
            variant="contained"
            onClick={onConfirm}
            sx={{
              bgcolor: "#F39224",
              color: "#fff",
              px: 3,
              borderRadius: "8px",
              fontWeight: 600,
              textTransform: "none",
              "&:hover": {
                bgcolor: "#da7c1e",
              },
            }}
          >
            Report
          </Button>
        </Stack>
      </Box>
    </Modal>
  );
};

export default ReportModal;
