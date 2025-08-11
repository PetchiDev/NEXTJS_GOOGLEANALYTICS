export const VEHICLES_VERTICAL_ID = 1;
export const PROPERTIES_VERTICAL_ID = 2;
export const REWARDS_VERTICAL_ID = 11;

export interface ActionTrackingProps {
  previousView?: string;
  newView?: string;
  action?: string;
}

export interface QLAnalyticsCallProps extends ActionTrackingProps {
  analyticType: ANALYTIC_TYPE;
  adId?: Array<number | undefined> | number;
  filters?: object;
  additionalTag?: object;
  banner?: string[] | string;
  token?: string | null;
  number?: string;
  lead?: ANALYTICS_LEAD;
  url?: string;
  impressions?: number[];
  view?: number;
  vertical: number;
}

export const enum ANALYTIC_TYPE {
  FILTERS_SEARCH = 5,
  BANNER_CLICK = 6,
  VIEW_BANNER_IMPRESSION = 7,
  LEAD = 8,
  ACTION_TRACKING = 9,
}

export const enum SECTION_ID {
  DEALS_OF_THE_DAY = "deals-of-the-day",
  EXPLORE_BY_CATEGORY = "explore-by-category",
}

export const enum MODULE {
  REWARDS = "rewards",
  PROPERTIES = "properties",
  VEHICLES = "vehicles",
}

export const enum ANALYTICS_LEAD {
  CALL_REVEAL = "call_reveal",
  WHATSAPP_REVEAL = "whatsapp_reveal",
  CALL_CLICK = "call_click",
  WHATSAPP_CLICK = "whatsapp_click",
  SMS_REVEAL = "sms_reveal",
  SMS_CLICK = "sms_click",
  SHARED_CLICK = "shared_click",
  FAVORITE_CLICK = "favorite_click",
  MORTGAGE_FIELDS_UPDATE = "mortgage_fields_update",
  MORTGAGE_VIEW = "mortgage_view",
  STATIC_MAP_CLICK = "static_map_click",
}

export enum VERTICAL {
  VEHICLES = VEHICLES_VERTICAL_ID,
  PROPERTIES = PROPERTIES_VERTICAL_ID,
  REWARDS = REWARDS_VERTICAL_ID,
}

export const VERTICAL_IDS = Object.freeze({
  vehicles: VEHICLES_VERTICAL_ID,
  properties: PROPERTIES_VERTICAL_ID,
  rewards: REWARDS_VERTICAL_ID,
});
