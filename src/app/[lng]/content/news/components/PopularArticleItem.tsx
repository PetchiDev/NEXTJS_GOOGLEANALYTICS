import React from "react";
import { Box, Typography } from "@mui/material";
import Image from "next/image";

interface PopularArticleItemProps {
  image: string;
  title: string;
}

const PopularArticleItem: React.FC<PopularArticleItemProps> = ({ image, title }) => {
  return (
    <Box display="flex" gap={2}>
      <Box
        sx={{
          width: 100,
          height: 70,
          position: "relative",
          flexShrink: 0,
          borderRadius: 1,
          overflow: "hidden",
        }}
      >
        <Image
          src={image}
          alt={title}
          fill
          style={{ objectFit: "cover" }}
          sizes="(max-width: 768px) 100vw, 100px"
        />
      </Box>
      <Typography variant="subtitle1" fontWeight={500}>
        {title}
      </Typography>
    </Box>
  );
};

export default PopularArticleItem;
