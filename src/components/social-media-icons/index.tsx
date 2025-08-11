import { Box, Stack } from "@mui/material";
import React, { ReactElement } from "react";
import { CustomLink } from "../custom-link";
import { config } from "../../constants";
import {
  FaceBookIcon,
  InstagramIcon,
  LinkedInIcon,
  TwitterIcon,
  YoutubeIcon,
} from "../../icons";
import TickTokIcon from "../../icons/social/tiktok";
import { COLORS } from "../../theme";

const SocialMediaIconBox = React.memo(function SocialMediaIconBox({
  link,
  icon,
}: {
  link: string;
  icon: ReactElement;
}) {
  return (
    <CustomLink href={link} isExternalLink={true}>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          border: `1px solid ${COLORS.WHITE}`,
          height: 32,
          width: 32,
          borderRadius: 50,
        }}
      >
        {icon}
      </Box>
    </CustomLink>
  );
});

const SocialMediaIcons = ({ isMobile }: { isMobile?: boolean }) => {
  return (
    <Stack columnGap={1} direction={"row"} mt={1}>
      <SocialMediaIconBox
        link={config.socialConfig.facebook}
        icon={<FaceBookIcon isMobile={isMobile} />}
      />
      <SocialMediaIconBox
        link={config.socialConfig.twitter}
        icon={<TwitterIcon isMobile={isMobile} />}
      />
      <SocialMediaIconBox
        link={config.socialConfig.instagram}
        icon={<InstagramIcon isMobile={isMobile} size={isMobile ? 32 : 16} />}
      />
      <SocialMediaIconBox
        link={config.socialConfig.linkedIn}
        icon={<LinkedInIcon isMobile={isMobile} />}
      />
      <SocialMediaIconBox
        link={config.socialConfig.youtube}
        icon={<YoutubeIcon isMobile={isMobile} />}
      />
      <SocialMediaIconBox
        link={config.socialConfig.tikTok}
        icon={<TickTokIcon isMobile={isMobile} />}
      />
    </Stack>
  );
};

export default React.memo(SocialMediaIcons);
