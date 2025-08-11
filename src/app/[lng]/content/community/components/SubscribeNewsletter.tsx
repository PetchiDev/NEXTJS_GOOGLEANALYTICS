"use client";
import React, { useRef, useState } from "react";
import {
  Box,
  Button,
  TextField,
  Typography,
} from "@mui/material";
import EmailIcon from "@mui/icons-material/Email";
import { trackNewsletterSubscription } from "@/utils/analytics";

const SubscribeNewsletter = () => {
  const emailRef = useRef<HTMLInputElement>(null);
  const [emailError, setEmailError] = useState("");

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const email = emailRef.current?.value.trim() || "";
    const emailRegex = /\S+@\S+\.\S+/;

    if (!email) {
      setEmailError("Please enter your email");
      return;
    }
    if (!emailRegex.test(email)) {
      setEmailError("Please enter valid email address");
      return;
    }

    setEmailError("");
    
    // Track newsletter subscription attempt
    trackNewsletterSubscription(true, "community");
    
    // Mailchimp redirect
    window.location.href =
      `//qatarliving.us9.list-manage.com/subscribe/post?u=3ab0436d22c64716e67a03f64&id=94198fac96&EMAIL=${encodeURIComponent(email)}`;
  };

  return (
    <Box
      component="form"
      onSubmit={handleSubmit}
      sx={{
        mt: 4,
        p: 3,
        bgcolor: "#fff",
        borderRadius: "10px",
        boxShadow: "0px 2px 8px rgba(0, 0, 0, 0.05)",
        width: "100%",
      }}
    >
      {/* Email icon */}
      <Box
        sx={{
          width: 48,
          height: 48,
          borderRadius: "50%",
          bgcolor: "#E9F1FB",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          mx: "auto",
          mb: 2,
        }}
      >
        <EmailIcon sx={{ color: "#11476b" }} />
      </Box>

      {/* Title */}
      <Typography
        align="center"
        fontWeight={600}
        fontSize="16px"
        color="#000"
        mb={1}
      >
        Get The QL newsletter. Subscribe to receive the top stories you need to
        know right now.
      </Typography>

      {/* Email input */}
      <TextField
        placeholder="Enter your email"
        fullWidth
        size="medium"
        variant="outlined"
        inputRef={emailRef}
        onChange={(e) => {
          if (emailError) {
            const v = e.target.value;
            const emailRegex = /\S+@\S+\.\S+/;
            setEmailError(
              !v.trim()
                ? "Please enter your email"
                : emailRegex.test(v)
                  ? ""
                  : "Please enter valid email address"
            );
          }
        }}
        onBlur={() => {
          const v = emailRef.current?.value || "";
          const emailRegex = /\S+@\S+\.\S+/;
          setEmailError(
            !v.trim()
              ? "Please enter your email"
              : emailRegex.test(v)
                ? ""
                : "Please enter valid email address"
          );
        }}
        error={!!emailError}
        helperText={emailError}
        sx={{
          my: 2,
          "& input": { py: 1.4 },
        }}
        inputProps={{ spellCheck: false }}
      />

      {/* Subscribe button */}
      <Button
        fullWidth
        type="submit"
        variant="contained"
        sx={{
          bgcolor: "#FF7A1A",
          color: "#fff",
          fontWeight: 600,
          textTransform: "none",
          py: 1.3,
          fontSize: "15px",
          "&:hover": { bgcolor: "#e86f14" },
        }}
      >
        Subscribe
      </Button>
    </Box>
  );
};

export default SubscribeNewsletter;
