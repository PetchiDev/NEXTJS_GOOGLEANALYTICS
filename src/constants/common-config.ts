import { env } from "next-runtime-env";
import { VERTICAL_IDS } from "./analytics";

const APP_NAME = process.env.NEXT_PUBLIC_APP_NAME ?? "";
export const APP_PREFIX = APP_NAME.substring(0, 1);

export const AUTH_TOKEN_NAME = "qat";
export const QL_APP_AUTH_TOKEN = `qat-ql${APP_PREFIX}`;

const BASE_URL = env('NEXT_PUBLIC_API_BASE_URL');
const QL_URL = env('NEXT_PUBLIC_QL_URL') ?? "https://test.qatarliving.com";
const QL_NEXT_DOMAIN_SUFFIX = env('NEXT_PUBLIC_QL_NEXT_DOMAIN_SUFFIX') ?? "-dev.qatarliving.com";
const QL_DOMAIN = env('NEXT_PUBLIC_DOMAIN') ?? ".qatarliving.com";

// const QL_URL = process.env.NEXT_PUBLIC_QL_URL ?? "https://test.qatarliving.com";
const QL_ENV = process.env.NEXT_PUBLIC_ENV ?? "dev";
// const QL_NEXT_DOMAIN_SUFFIX =
//   process.env.NEXT_PUBLIC_QL_NEXT_DOMAIN_SUFFIX ?? "-dev.qatarliving.com";
const QL_NEXT_URL =
  process.env.NEXT_PUBLIC_QL_NEXT_URL ??
  `https://ql${APP_PREFIX}${QL_NEXT_DOMAIN_SUFFIX}`;
// const QL_DOMAIN = process.env.NEXT_PUBLIC_DOMAIN ?? ".qatarliving.com";
const QL_FILES_URL =
  process.env.NEXT_PUBLIC_QL_FILES_URL ?? "https://files.qatarliving.com";
const MICROSOFT_CLARITY_PROJECT_ID =
  process.env.NEXT_PUBLIC_MICROSOFT_CLARITY_PROJECT_ID ?? "r55nlllop9";
const MAP_API_KEY = process.env.NEXT_PUBLIC_MAP_API_KEY ?? "";
const DRUPAL_REDIRECT = `/qlnext/ql${APP_PREFIX}`;
export const config = {
  apiConfig: {
    base_url:
      BASE_URL ??
      `https://ql${APP_PREFIX}-bo-${QL_ENV}.qatarliving.com`,
    base_url_common:
      process.env.NEXT_PUBLIC_API_BASE_URL_COMMON ??
      `https://ql-shared-${QL_ENV}.qatarliving.com`,
  },
  images_cdn_url:
    process.env.NEXT_PUBLIC_CDN_BASE_URL ??
    "https://qlrnext-dev-dhcuccfxf3a8fga7.a03.azurefd.net",
  images_cdn_url_common:
    process.env.NEXT_PUBLIC_CDN_BASE_URL_COMMON ??
    "https://qlsnext-dev-decqf9edf6ehfmft.a03.azurefd.net/",
  ql_login_url:
    process.env.NEXT_PUBLIC_QL_LOGIN_URL ??
    `${QL_URL}/user/login?destination=${DRUPAL_REDIRECT}`,
  ql_logout_url:
    process.env.NEXT_PUBLIC_QL_LOGOUT_URL ??
    `${QL_URL}/user/logout?destination=${DRUPAL_REDIRECT}`,
  ql_register_url:
    process.env.NEXT_PUBLIC_QL_REGISTER_URL ??
    `${QL_URL}/user/register?destination=${DRUPAL_REDIRECT}`,
  ql_url: QL_URL,
  ql_env: QL_ENV,
  ql_next_url: QL_NEXT_URL,
  ql_next_vehicle_url: `https://qlv${QL_NEXT_DOMAIN_SUFFIX}`,
  ql_next_properties_url: `https://qlp${QL_NEXT_DOMAIN_SUFFIX}`,
  ql_next_rewards_url: `https://qlr${QL_NEXT_DOMAIN_SUFFIX}`,
  files_url: QL_FILES_URL,
  google_analytics_id: process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS_ID ?? "G-L8G5Y1WPNH",
  socialConfig: {
    facebook: "https://www.facebook.com/QatarLiving",
    twitter: "https://twitter.com/qatarliving",
    instagram: "https://www.instagram.com/qatarliving/",
    instagramProperties: "https://www.instagram.com/qatarlivingproperties/",
    linkedIn: "https://www.linkedin.com/company/qatarliving-com",
    snapChat: "https://www.snapchat.com/add/qatar_living",
    youtube: "https://www.youtube.com/channel/UCcsJRinZg4qYGLRDkFiVHcQ",
    tikTok: "https://www.tiktok.com/@qatarliving",
    google_play_app:
      "https://play.google.com/store/apps/details?id=com.qatarliving.classifieds&hl=en&gl=US",
    app_store_App: "https://apps.apple.com/us/app/qatar-living/id961568535",
  },
  ql_domain: QL_DOMAIN,
  app_name: APP_NAME,
  disable_rewards_subscription:
    process.env.NEXT_PUBLIC_DISABLE_REWARDS_SUBSCRIPTION ?? "false",
  vertical: VERTICAL_IDS[APP_NAME.toLowerCase() as keyof typeof VERTICAL_IDS],
  drupal_redirect: DRUPAL_REDIRECT,
  create_ad:
    process.env.NEXT_PUBLIC_CREATE_AD_URL ??
    `${QL_URL}/user/login?destination=${DRUPAL_REDIRECT}/en/${APP_NAME}/create`,
  location_search_url:
    "https://nominatim.openstreetmap.org/search?format=geojson&limit=5&city=",
  articleThumbUrl: `${QL_URL}/s3/files/styles/image_h_medium_440x248/s3/`,
  supportEmail: "support@qatarliving.com",
  microsoft_clarity_project_id: MICROSOFT_CLARITY_PROJECT_ID,
  map_api_key: MAP_API_KEY,
  search_page_selected_page_size:
    process.env.NEXT_PUBLIC_SEARCH_PAGE_SELECTED_PAGE_SIZE ?? "20",
  search_page_pagination_options: JSON.parse(
    process.env.NEXT_PUBLIC_SEARCH_PAGE_PAGINATION_OPTIONS ?? "[10,20,30]"
  ) as number[],
  dashboard_page_selected_page_size:
    process.env.NEXT_PUBLIC_DASHBOARD_PAGE_SELECTED_PAGE_SIZE ?? "10",
  dashboard_page_pagination_options: JSON.parse(
    process.env.NEXT_PUBLIC_DASHBOARD_PAGE_PAGINATION_OPTIONS ?? "[10,20]"
  ) as number[],
};
