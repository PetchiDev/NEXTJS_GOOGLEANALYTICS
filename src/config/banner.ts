import {
  IBanner as IBaseBanner,
  BannerImage as BaseBannerImage,
} from "@/types";

export type IBanner = IBaseBanner
export type BannerImage = BaseBannerImage

export type IBannerKey =
  | "landing_hero"
  | "search_hero"
  | "search_banner_map_view"
  | "search_banner_list_view"
  | "detail_hero"
  | "detail_side"
  | "detail_top"
  | "detail_bottom"
  | "agencies_hero"
  | "agents_hero";

export type IBannersRes = Record<IBannerKey, IBanner>;

export const banners: IBannersRes = {
  landing_hero: {
    dimensions: {
      width_desktop: "100%", // banner width for desktop
      height_desktop: "250px", // banner height for desktop
      width_mobile: "100%", // banner width for mobile
      height_mobile: "150px", // banner height for mobile
    },
    images: [],
  },
  search_hero: {
    display: { xs: "none", xxl: "block" },
    dimensions: {
      width_desktop: "100%", // banner width for desktop
      height_desktop: "150px", // banner height for desktop
      width_mobile: "100%", // banner width for mobile
      height_mobile: "150px", // banner height for mobile
    },
    images: [],
  },
  search_banner_map_view: {
    display: { xs: "none", lg: "block", xxxl: "none" },
    dimensions: {
      width_desktop: "340px", // banner width for desktop
      height_desktop: "384px", // banner height for desktop
      width_mobile: "340px", // banner width for mobile
      height_mobile: "384px", // banner height for mobile
    },
    images: [],
  },
  search_banner_list_view: {
    display: { xs: "none", lg: "block", xxxl: "none" },
    dimensions: {
      width_desktop: "340px", // banner width for desktop
      height_desktop: "384px", // banner height for desktop
      width_mobile: "340px", // banner width for mobile
      height_mobile: "384px", // banner height for mobile
    },
    images: [],
  },
  detail_hero: {
    dimensions: {
      width_desktop: "100%", // banner width for desktop
      height_desktop: "150px", // banner height for desktop
      width_mobile: "100%", // banner width for mobile
      height_mobile: "150px", // banner height for mobile
    },
    images: [],
  },
  detail_side: {
    display: { xs: "none", lg: "block" },
    dimensions: {
      width_desktop: "300px", // banner width for desktop
      height_desktop: "250px", // banner height for desktop
      width_mobile: "100%", // banner width for mobile
      height_mobile: "150px", // banner height for mobile
    },
    images: [],
  },
  detail_top: {
    display: { xs: "block", md: "none" },
    dimensions: {
      width_mobile: "100%",
      height_mobile: "150px",
      width_desktop: "100%",
      height_desktop: "150px",
    },
    images: [],
  },
  detail_bottom: {
    display: "block",
    dimensions: {
      width_desktop: "970px", // banner width for desktop
      height_desktop: "250px", // banner height for desktop
      width_mobile: "100%", // banner width for mobile
      height_mobile: "150px", // banner height for mobile
    },
    images: [],
  },
  agencies_hero: {
    dimensions: {
      width_desktop: "100%", // banner width for desktop
      height_desktop: "250px", // banner height for desktop
      width_mobile: "100%", // banner width for mobile
      height_mobile: "150px", // banner height for mobile
    },
    images: [],
    text: "Find the right agency to help you find the perfect home.",
  },
  agents_hero: {
    dimensions: {
      width_desktop: "100%", // banner width for desktop
      height_desktop: "250px", // banner height for desktop
      width_mobile: "100%", // banner width for mobile
      height_mobile: "150px", // banner height for mobile
    },
    images: [],
    text: "Find the right agent to help you find the perfect home.",
  },
};
