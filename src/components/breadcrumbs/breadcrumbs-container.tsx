import { Container, SxProps } from "@mui/material";
import React, { FC, memo } from "react";

interface BreadcrumbsContainerProps {
  children: React.ReactNode;
  style?: SxProps;
}
const BreadcrumbsContainer: FC<BreadcrumbsContainerProps> = ({
  children,
  style = {},
}) => {
  return (
    <Container
      sx={{
        py: { xs: 1 },
        px: {
          lg: 0,
          xs: 2,
        },
        ...style,
      }}
    >
      {children}
    </Container>
  );
};

export default memo(BreadcrumbsContainer);
