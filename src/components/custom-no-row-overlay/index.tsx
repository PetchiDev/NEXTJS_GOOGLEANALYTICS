import { Button, Stack, Typography } from "@mui/material";
import React from "react";
import { RewardsTrophyIcon } from "../../icons";
import { COLORS } from "../../theme";
import { CustomLink } from "../custom-link";

interface CustomNoRowsOverlay {
  title?: string;
  subtitle?: string;
  buttonText?: string;
  marginTop: string;
  marginBottom: string;
  hyperLink?: boolean;
  hyperLinkText?: string;
  icon?: React.ReactNode;
  subtitleColor?: string;
  handleButtonClick?: () => void;
}

const CustomNoRowsOverlay = ({
  title,
  buttonText,
  marginTop = "60px",
  hyperLink = false,
  marginBottom = "0px",
  hyperLinkText,
  icon = <RewardsTrophyIcon />,
  handleButtonClick,
}: Partial<CustomNoRowsOverlay>) => {
  return (
    <Stack
      justifyContent={"center"}
      alignItems={"center"}
      rowGap={"18px"}
      mt={marginTop}
      mb={marginBottom}
      className="no-rows-overlay"
    >
      {icon}
      <Typography
        variant="h3Medium"
        color={COLORS.GREY[900]}
        sx={{
          textAlign: "center",
        }}
      >
        {title}
      </Typography>
      {buttonText && (
        <Button
          data-testid={`${buttonText}-btn`}
          variant="outlined"
          size="sm"
          sx={{
            background: COLORS.WHITE,
            width: "190px",
            height: "40px",
          }}
          onClick={handleButtonClick}
        >
          {buttonText}
        </Button>
      )}
      {hyperLink && (
        <CustomLink href={"/"}>
          <Button
            data-testid="link-btn"
            variant="text"
            size="sm"
            sx={{
              textDecorationLine: "underline",
              marginTop: "40px",
              "&:hover": {
                background: "unset",
                textDecorationLine: "underline",
              },
            }}
          >
            {hyperLinkText}
          </Button>
        </CustomLink>
      )}
    </Stack>
  );
};
export default CustomNoRowsOverlay;
