import { Palette } from "@mui/material";
import { TypographyOptions } from "@mui/material/styles/createTypography";
import { Noto_Color_Emoji, Public_Sans } from "next/font/google";

export const noto_color_emoji = Noto_Color_Emoji({
  weight: ["400"],
  subsets: ["emoji"],
});

declare module "@mui/material/styles" {
  interface TypographyVariants {
    caption1Regular: React.CSSProperties;
    caption2: React.CSSProperties;
    caption2Regular: React.CSSProperties;
    caption2RegularDescription: React.CSSProperties;
    subTitle1Semibold: React.CSSProperties;
    backButtonMobile: React.CSSProperties;
    h3Regular2: React.CSSProperties;
    subtitle1Medium: React.CSSProperties;
    subTitle1Regular: React.CSSProperties;
    bodyRegular: React.CSSProperties;
    bodyMedium: React.CSSProperties;
    body1SemiBold: React.CSSProperties;
    body1Medium: React.CSSProperties;
    body2Medium: React.CSSProperties;
    body2Regular: React.CSSProperties;
    body2SmallSemibold: React.CSSProperties;
    h4Medium: React.CSSProperties;
    h4Regular: React.CSSProperties;
    h4Regular2: React.CSSProperties;
    h1Semibold: React.CSSProperties;
    h1Medium: React.CSSProperties;
    h2Semibold: React.CSSProperties;
    h1bold: React.CSSProperties;
    textMediumRegular?: React.CSSProperties;
    bodySemiBold: React.CSSProperties;
    title2Medium?: React.CSSProperties;
    title2SemiBold?: React.CSSProperties;
    h2Medium?: React.CSSProperties;
    caption1Semibold?: React.CSSProperties;
    h4Semibold?: React.CSSProperties;
    textMedium?: React.CSSProperties;
    textSemibold?: React.CSSProperties;
    textSemibold1?: React.CSSProperties;
    title1Regular?: React.CSSProperties;
    subtitle2Medium?: React.CSSProperties;
    title3?: React.CSSProperties;
    h3RegularOverviewList?: React.CSSProperties;
    h3MediumOverviewList?: React.CSSProperties;
    caption2Semibold?: React.CSSProperties;
    smallTitle2Medium?: React.CSSProperties;
    mapSearchCardPrice?: React.CSSProperties;
    mapSearchCardTitle?: React.CSSProperties;
    body2SmallMedium?: React.CSSProperties;
    body2SmallRegular?: React.CSSProperties;
    titlesSemibold?: React.CSSProperties;
    numbersSemibold?: React.CSSProperties;
    subTitle14Regular?: React.CSSProperties;
    mobileTitleSemiBold?: React.CSSProperties;
    flagIcon?: React.CSSProperties;
    qicBannerExpiryDate?: React.CSSProperties;
  }

  // allow configuration using `createTheme`
  interface TypographyVariantsOptions {
    caption1Regular?: React.CSSProperties;
    caption2?: React.CSSProperties;
    caption2Regular?: React.CSSProperties;
    caption2RegularDescription?: React.CSSProperties;
    subTitle1Semibold?: React.CSSProperties;
    backButtonMobile?: React.CSSProperties;
    caption1MediumHoldDrag?: React.CSSProperties;
    caption1Medium?: React.CSSProperties;
    caption2Medium?: React.CSSProperties;
    subtitle1Medium?: React.CSSProperties;
    subTitle1Regular?: React.CSSProperties;
    bodyRegular?: React.CSSProperties;
    bodyMedium?: React.CSSProperties;
    body1SemiBold?: React.CSSProperties;
    body1Medium?: React.CSSProperties;
    body2Medium?: React.CSSProperties;
    body2Regular?: React.CSSProperties;
    body2Semibold?: React.CSSProperties;
    body2SmallSemibold?: React.CSSProperties;
    h4Medium?: React.CSSProperties;
    h4Regular2?: React.CSSProperties;
    h4Regular?: React.CSSProperties;
    h1Medium?: React.CSSProperties;
    h1Semibold?: React.CSSProperties;
    h2Semibold?: React.CSSProperties;
    h1bold?: React.CSSProperties;
    h3Regular?: React.CSSProperties;
    h3Regular2?: React.CSSProperties;
    h3Medium?: React.CSSProperties;
    h3SemiBold?: React.CSSProperties;
    textMediumRegular?: React.CSSProperties;
    textSmRegular?: React.CSSProperties;
    bodySemiBold?: React.CSSProperties;
    title2Medium?: React.CSSProperties;
    title2SemiBold?: React.CSSProperties;
    h2Medium?: React.CSSProperties;
    h2MediumSmallHeight?: React.CSSProperties;
    caption1Semibold?: React.CSSProperties;
    h4Semibold?: React.CSSProperties;
    textMedium?: React.CSSProperties;
    textSemibold?: React.CSSProperties;
    textSemibold1?: React.CSSProperties;
    textLgSemibold?: React.CSSProperties;
    title1Regular?: React.CSSProperties;
    footerLinks?: React.CSSProperties;
    subtitle2Medium?: React.CSSProperties;
    title3?: React.CSSProperties;
    h3RegularOverviewList?: React.CSSProperties;
    h3MediumOverviewList?: React.CSSProperties;
    caption2Semibold?: React.CSSProperties;
    smallTitle2Medium?: React.CSSProperties;
    mapSearchCardPrice?: React.CSSProperties;
    mapSearchCardTitle?: React.CSSProperties;
    body2SmallMedium?: React.CSSProperties;
    body2SmallRegular?: React.CSSProperties;
    titlesSemibold?: React.CSSProperties;
    numbersSemibold?: React.CSSProperties;
    subTitle14Regular?: React.CSSProperties;
    mobileTitleSemiBold?: React.CSSProperties;
    flagIcon?: React.CSSProperties;
    subtitle2Regular?: React.CSSProperties;
    textSmSemibold?: React.CSSProperties;
    qicBannerExpiryDate?: React.CSSProperties;
  }
}

// Update the Typography's variant prop options
declare module "@mui/material/Typography" {
  interface TypographyPropsVariantOverrides {
    caption1Regular: true;
    caption2: true;
    caption2Regular: true;
    caption2RegularDescription: true;
    subTitle1Semibold: true;
    backButtonMobile: true;
    caption1MediumHoldDrag: true;
    caption1Medium: true;
    caption2Medium: true;
    subtitle1Medium: true;
    subTitle1Regular: true;
    bodyRegular: true;
    bodyMedium: true;
    body1SemiBold: true;
    body1Medium: true;
    body2Medium: true;
    body2Regular: true;
    body2Semibold: true;
    body2SmallSemibold: true;
    h4Medium: true;
    h4Regular: true;
    h4Regular2: true;
    h1Semibold: true;
    h1Medium: true;
    h3Regular: true;
    h3Regular2: true;
    h3Medium: true;
    h3SemiBold: true;
    h2Semibold: true;
    h1bold: true;
    textMediumRegular: true;
    textSmRegular: true;
    bodySemiBold: true;
    title2Medium: true;
    title2SemiBold: true;
    h2Medium: true;
    h2MediumSmallHeight: true;
    caption1Semibold: true;
    h4Semibold: true;
    textMedium: true;
    textSemibold: true;
    textSemibold1: true;
    textLgSemibold: true;
    title1Regular: true;
    footerLinks: true;
    subtitle2Medium: true;
    title3: true;
    h3RegularOverviewList: true;
    h3MediumOverviewList: true;
    caption2Semibold: true;
    smallTitle2Medium: true;
    mapSearchCardPrice: true;
    mapSearchCardTitle: true;
    body2SmallMedium: true;
    body2SmallRegular: true;
    titlesSemibold: true;
    numbersSemibold: true;
    subTitle14Regular: true;
    mobileTitleSemiBold: true;
    flagIcon: true;
    subtitle2Regular: true;
    textSmSemibold: true;
    qicBannerExpiryDate: true;
  }
}

export const poppins = Public_Sans({
  weight: ["400", "500", "600"],
  subsets: ["latin"],
});

export const TYPOGRAPHY:
  | TypographyOptions
  | ((palette: Palette) => TypographyOptions) = {
  fontFamily: poppins.style.fontFamily,
  caption1Medium: {
    fontSize: "13px",
    fontWeight: 500,
    lineHeight: "22px",
    fontStyle: "normal",
  },
  caption1MediumHoldDrag: {
    fontSize: "13px",
    fontWeight: 500,
    lineHeight: "22px",
  },
  caption1Regular: {
    fontSize: "13px",
    fontStyle: "normal",
    fontWeight: 400,
    lineHeight: "22px",
  },
  caption2Medium: {
    fontSize: "11px",
    fontWeight: 500,
    lineHeight: "12px",
    letterSpacing: "0em",
    //TODO: Remove textAlign properties
    textAlign: "left",
  },
  caption2: {
    fontSize: "11px",
    fontWeight: 500,
    lineHeight: "12px",
    letterSpacing: "0em",
    textAlign: "left",
  },
  caption2Regular: {
    fontSize: "11px",
    fontWeight: 400,
    lineHeight: "12px",
  },
  caption2RegularDescription: {
    fontSize: "11px",
    fontWeight: 400,
    lineHeight: "18px",
  },
  subTitle1Semibold: {
    fontSize: "12px",
    fontWeight: 600,
    lineHeight: "20px",
  },
  backButtonMobile: {
    fontSize: "12px",
    fontWeight: 500,
    lineHeight: "20px",
  },
  subtitle1Medium: {
    fontSize: "12px",
    fontStyle: "normal",
    fontWeight: 500,
    lineHeight: "18px",
    letterSpacing: "0em",
    textAlign: "left",
  },
  subTitle1Regular: {
    fontSize: "12px",
    fontWeight: 400,
    lineHeight: "20px",
  },
  bodyRegular: {
    fontSize: "16px",
    fontWeight: 400,
    lineHeight: "27px",
    letterSpacing: "0em",
  },
  bodyMedium: {
    fontSize: "16px",
    fontWeight: 500,
    lineHeight: "24px",
    letterSpacing: "0em",
  },
  bodySemiBold: {
    fontSize: "16px",
    fontWeight: 600,
    lineHeight: "27px",
    fontStyle: "normal",
  },
  body1SemiBold: {
    fontSize: "18px",
    fontWeight: 600,
    lineHeight: "26px",
  },
  body1Medium: {
    fontSize: "18px",
    fontWeight: 500,
    lineHeight: "26px",
    letterSpacing: "0em",
  },
  body2Medium: {
    fontSize: "14px",
    fontWeight: 500,
    lineHeight: "24px",
    fontStyle: "normal",
    letterSpacing: "0em",
    textAlign: "left",
  },
  body2Regular: {
    fontSize: "14px",
    fontWeight: 400,
    fontStyle: "normal",
    lineHeight: "24px",
    letterSpacing: "0em",
  },
  body2SmallSemibold: {
    fontSize: 14,
    fontWeight: 600,
    lineHeight: "24px",
    letterSpacing: 0,
  },
  h4Medium: {
    fontSize: "14px",
    fontStyle: "normal",
    fontWeight: 500,
    lineHeight: "20px",
  },
  h4Regular: {
    fontSize: "14px",
    fontWeight: 400,
    lineHeight: "24px",
    letterSpacing: "0em",
    textAlign: "left",
  },
  h4Regular2: {
    fontSize: "14px",
    fontWeight: 400,
    lineHeight: "28px",
  },
  h1Medium: {
    fontSize: "25px",
    fontWeight: 500,
    lineHeight: "43px",
    letterSpacing: "0em",
    textAlign: "left",
  },
  h1Semibold: {
    fontSize: "25px",
    fontWeight: 600,
    lineHeight: "26px",
    letterSpacing: "0em",
  },
  h2Semibold: {
    fontSize: "20px",
    fontWeight: 600,
    lineHeight: "34px",
    letterSpacing: "0em",
    textAlign: "left",
  },
  h1bold: {
    fontSize: "30px",
    fontWeight: 600,
    lineHeight: "20px",
    letterSpacing: "0em",
    textAlign: "left",
  },
  h3Regular: {
    fontSize: "15px",
    fontStyle: "normal",
    fontWeight: 400,
    lineHeight: "26px",
    letterSpacing: "0em",
  },
  h3Regular2: {
    fontSize: "15px",
    fontStyle: "normal",
    fontWeight: 500,
    lineHeight: "20px",
    letterSpacing: "0em",
  },
  h3Medium: {
    fontSize: "15px",
    fontStyle: "normal",
    fontWeight: 500,
    lineHeight: "26px",
    letterSpacing: "0em",
  },
  h3SemiBold: {
    fontSize: "15px",
    fontStyle: "normal",
    fontWeight: 600,
    lineHeight: "26px",
    letterSpacing: "0em",
  },

  body2Semibold: {
    fontSize: "14px",
    fontStyle: "normal",
    fontWeight: 600,
    lineHeight: "24px",
  },
  textMediumRegular: {
    fontSize: "16px",
    fontStyle: "normal",
    fontWeight: 400,
    lineHeight: "20px",
  },
  textSmRegular: {
    fontSize: "14px",
    fontStyle: "normal",
    fontWeight: 400,
    lineHeight: "24px",
  },
  textLgSemibold: {
    fontSize: "18px",
    fontStyle: "normal",
    fontWeight: 600,
    lineHeight: "28px",
  },

  title2Medium: {
    fontSize: "31px",
    fontStyle: "normal",
    fontWeight: 500,
    lineHeight: "normal",
  },
  title2SemiBold: {
    fontSize: "31px",
    fontStyle: "normal",
    fontWeight: 600,
    lineHeight: "normal",
  },
  h2Medium: {
    fontSize: "20px",
    fontStyle: "normal",
    fontWeight: 500,
    lineHeight: "34px",
  },
  h2MediumSmallHeight: {
    fontSize: "20px",
    fontStyle: "normal",
    fontWeight: 500,
    lineHeight: "27px",
  },

  caption1Semibold: {
    fontSize: "13px",
    fontStyle: "normal",
    fontWeight: 600,
    lineHeight: "22px",
  },
  h4Semibold: {
    fontSize: "14px",
    fontStyle: "normal",
    fontWeight: 600,
    lineHeight: "24px",
  },
  textMedium: {
    fontSize: "14px",
    fontWeight: 500,
    lineHeight: "20px",
    letterSpacing: "0em",
  },
  textSemibold: {
    fontSize: "14px",
    fontStyle: "normal",
    fontWeight: 600,
    lineHeight: "20px",
  },
  textSemibold1: {
    fontSize: "15px",
    fontStyle: "normal",
    fontWeight: 600,
    lineHeight: "20px",
  },
  title1Regular: {
    fontSize: "39px",
    fontStyle: "normal",
    fontWeight: 400,
    lineHeight: "48px",
  },
  footerLinks: {
    fontSize: "14px",
    fontStyle: "normal",
    fontWeight: 500,
    lineHeight: "26px",
  },
  subtitle2Medium: {
    fontSize: "10px",
    fontStyle: "normal",
    fontWeight: 500,
    lineHeight: "13px",
  },
  title3: {
    fontSize: "28px",
    fontStyle: "normal",
    fontWeight: 600,
    lineHeight: "normal",
  },
  h3RegularOverviewList: {
    fontSize: "14px",
    fontStyle: "normal",
    fontWeight: 400,
    lineHeight: "22px",
  },
  h3MediumOverviewList: {
    fontSize: "14px",
    fontStyle: "normal",
    fontWeight: 500,
    lineHeight: "22px",
  },
  caption2Semibold: {
    fontSize: "11px",
    fontStyle: "normal",
    fontWeight: 600,
    lineHeight: "15px",
  },
  smallTitle2Medium: {
    fontSize: "8px",
    fontStyle: "normal",
    fontWeight: 500,
    lineHeight: "normal",
  },
  mapSearchCardPrice: {
    fontSize: "16px",
    fontStyle: "normal",
    fontWeight: 600,
    lineHeight: "20px",
  },
  mapSearchCardTitle: {
    fontSize: "12px",
    fontStyle: "normal",
    fontWeight: 500,
    lineHeight: "15px",
  },
  body2SmallMedium: {
    fontSize: "14px",
    fontStyle: "normal",
    fontWeight: 500,
    lineHeight: "24px",
  },
  body2SmallRegular: {
    fontSize: "14px",
    fontStyle: "normal",
    fontWeight: 400,
    lineHeight: "24px",
  },
  titlesSemibold: {
    fontSize: "40px",
    fontStyle: "normal",
    fontWeight: 600,
    lineHeight: "normal",
  },
  numbersSemibold: {
    fontSize: "30px",
    fontStyle: "normal",
    fontWeight: 600,
    lineHeight: "26px",
  },
  subTitle14Regular: {
    fontSize: "14px",
    fontStyle: "normal",
    fontWeight: 400,
    lineHeight: "22px",
  },
  mobileTitleSemiBold: {
    fontSize: "30px",
    fontStyle: "normal",
    fontWeight: 600,
    lineHeight: "normal",
  },
  flagIcon: {
    fontFamily: noto_color_emoji.style.fontFamily,
  },
  subtitle2Regular: {
    fontSize: "10px",
    fontStyle: "normal",
    fontWeight: 400,
    lineHeight: "normal",
  },
  textSmSemibold: {
    fontSize: "14px",
    fontStyle: "normal",
    fontWeight: 600,
    lineHeight: "20px",
  },
  qicBannerExpiryDate: {
    fontSize: "8px",
    fontStyle: "normal",
    fontWeight: 400,
    lineHeight: "9px",
  },
};
