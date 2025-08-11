import { banners } from "@/config/banner";
import { Container, Skeleton } from "@mui/material";
import dynamic from "next/dynamic";
import { ReactNode } from "react";
import BaseLayout from "../base-layout";

const Submenu = dynamic(
  () => import("@/components/header/submenu")
);
const CustomCarousel = dynamic(
  () => import("@/components/custom-carousel"),
  {
    ssr: false,
    loading: () => (
      <Skeleton
        sx={{
          height: {
            xs: banners.detail_hero.dimensions.height_mobile,
            md: banners.detail_hero.dimensions.height_desktop,
          },
          width: {
            xs: banners.detail_hero.dimensions.width_mobile,
            md: banners.detail_hero.dimensions.width_desktop,
          },
        }}
        variant="rectangular"
      />
    ),
  }
);

interface LayoutProps {
  children: ReactNode;
}

const DetailLayout = async ({ children }: Readonly<LayoutProps>) => {
  return (
    <BaseLayout showScrollToTop={false}>
      <Submenu />
      <Container
        sx={{
          px: { xs: 0, lg: 2 },
        }}
        component={"main"}
      >
        <CustomCarousel banner={banners.detail_hero} />
        {children}
      </Container>
    </BaseLayout>
  );
};

export default DetailLayout;
