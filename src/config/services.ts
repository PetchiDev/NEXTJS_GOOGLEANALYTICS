// import DolmenCarpetBanner from "@/views/detail/additional-services/dolmen-carpet-banner";
import { COLORS } from "@/theme/colors";
import { StaticImageData } from "next/image";
import kkkz from "public/images/services/kkkz.webp";
import qclean from "public/images/services/Q-Clean.webp";
import { CSSProperties, ComponentType } from "react";

export const enum ADDITIONAL_SERVICES_ANALYTICS_SLOT { // vertical_location_code unique, used for analytics
  FURNITURE_MOVING = "qlp_detail_mv",
  PEST_CONTROL = "qlp_detail_pest-control",
  CLEANING_SERVICES = "qlp_detail_cleaning-services",
  MAINTENANCE_SERVICES = "qlp_detail_maintenance-services",
  OFFICE_SUPPLIES = "qlp_detail_office-supplies",
  FURNITURE = "qlp_detail_furniture",
  DOLMEN_CARPET = "qlp_detail_dolmen-carpet",
}

type Text = {
  text: string;
  fontWeight: CSSProperties["fontWeight"];
  color: CSSProperties["color"];
};

type Service = {
  iconSrc?: StaticImageData;
  iconAlt?: string;
  buttonLink?: string;
  text1?: Text;
  text2?: Text;
  bannerSlot?: string;
  buttonText?: string;
  isComponent?: boolean;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  component?: ComponentType<any>;
};

const services: Service[] = [
  {
    iconSrc: kkkz,
    iconAlt: "Triple KZ International",
    buttonLink:
      "https://wa.me/97455329359?text=Hi%2C%20I%20saw%20your%20advert%20on%20Qatar%20Living%20Properties%2C%20I%20would%20like%20some%20more%20information.",
    text1: {
      text: "OUTSOURCING, CLEANING, HOSPITALITY.",
      fontWeight: 500,
      color: COLORS.GOOD_FAIR_BLACK,
    },
    text2: {
      text: "KKKZ INTERNATIONAL W.L.L.",
      fontWeight: 700,
      color: COLORS.PRIMARY.MAIN,
    },
    bannerSlot: "qlp_detail_KKKZ",
    buttonText: "Chat now",
  },
  // {
  //   bannerSlot: ADDITIONAL_SERVICES_ANALYTICS_SLOT.DOLMEN_CARPET,
  //   component: DolmenCarpetBanner,
  //   isComponent: true,
  // },
  {
    iconSrc: qclean,
    iconAlt: "Q CLEAN",
    buttonLink:
      "https://wa.me/97455916037?text=Hi%2C%20I%20saw%20your%20advert%20on%20Qatar%20Living%20Properties%2C%20I%20would%20like%20some%20more%20information.",
    text1: {
      text: "كيو كلين",
      fontWeight: 700,
      color: COLORS.PRIMARY.MAIN,
    },
    text2: {
      text: "أفضل شركة تنظيف في قطر، جاهزون لتقديم جميع خدماتنا في مختلف أنحاء الدولة.",
      fontWeight: 500,
      color: COLORS.GOOD_FAIR_BLACK,
    },
    bannerSlot: "qlp_detail_Q-CLEAN",
    buttonText: "تواصل معنا",
  },
];

export default services;
