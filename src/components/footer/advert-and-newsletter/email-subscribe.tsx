"use client";
import React, { useRef, useState } from "react";
import { Box, Button, Stack, Typography } from "@mui/material";
import { COLORS } from "../../../theme";

interface EmailSubscribeProps {
  subscribe: string;
}

const EmailSubscribe: React.FC<EmailSubscribeProps> = ({ subscribe }) => {
  const [error, setError] = useState<string>("");
  const emailRef = useRef<HTMLInputElement>(null);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const email = emailRef.current?.value.trim();

    const emailRegex = /\S+@\S+\.\S+/;
    if (!email) {
      setError("Please enter your email");
      return;
    } else if (!emailRegex.test(email)) {
      setError("Please enter valid email address");
      return;
    }
    setError("");
    window.location.href = `//qatarliving.us9.list-manage.com/subscribe/post?u=3ab0436d22c64716e67a03f64&amp;id=94198fac96&EMAIL=${encodeURIComponent(email)}`;
  };

  return (
    <form
      onSubmit={handleSubmit}
      action="#"
      method="post"
      id="mc-embedded-subscribe-form"
      name="mc-embedded-subscribe-form"
      className="validate"
      target="_blank"
      noValidate={true}
    >
      <Box id="mc_embed_signup_scroll">
        <Stack
          direction={"row"}
          bgcolor={COLORS.WHITE}
          border={
            error !== ""
              ? `1px solid ${"red"}`
              : `1px solid ${COLORS.SECONDARY.BUTTON.BG_BORDER}`
          }
          borderRadius={"6px"}
          width={"100%"}
          p={"10px 4px 10px 10px"}
          columnGap={1}
          boxShadow={"0px 1px 2px 0px rgba(16, 24, 40, 0.05)"}
          height={"48px"}
          alignItems={"center"}
        >
          <Box flexGrow={1} py={"6px"}>
            <input
              ref={emailRef}
              type="email"
              className="b-footer-subscribe--el-input required email"
              id="mce-EMAIL"
              aria-required="true"
              placeholder="Email"
              style={{
                backgroundColor: COLORS.WHITE,
                border: "none",
                height: "28px",
                outline: "none",
                boxShadow: "none",
                width: "100%",
              }}
            />
          </Box>
          <Button
            data-testid="email-subscribe-btn"
            type="submit"
            className="b-footer-subscribe--el-submit"
            name="subscribe"
            id="mc-embedded-subscribe"
            variant="contained"
            sx={{
              maxWidth: { sm: "141px", xs: "120px" },
              height: "40px",
              borderRadius: "4px",
              typography: "bodyMedium",
              boxShadow: "none",
              border: "none",
            }}
          >
            {subscribe}
          </Button>
        </Stack>
        {error && (
          <Typography
            mt={"6px"}
            variant="caption1Regular"
            color={COLORS.ERROR.BUTTON_BG}
          >
            {error}
          </Typography>
        )}
      </Box>
    </form>
  );
};

export default EmailSubscribe;
