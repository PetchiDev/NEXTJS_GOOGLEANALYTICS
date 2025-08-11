import { ErrorResponse } from "../types";

export * from "./config";
export * from "./properties";
export * from "./pagination";
export * from "./api";
export * from "./form-and-fields";
export * from "./analytics";
export * from './metadata'

export const FOOTER_ID = "qatar-living-footer";

export enum FAQ_CATEGORIES {
  "AGENT_OR_BROKER" = "agent_or_broker",
  "INTERESTED_IN_LISTING" = "interestered_in_listing",
  "LOOKING_FOR_PROPERTIES" = "looking_for_properties",
}

export const FAQ_DATA_KEYS = [
  {
    id: "faq1",
    questionKey: "question1",
    answerKey: "answer1",
    categories: [
      FAQ_CATEGORIES.AGENT_OR_BROKER,
      FAQ_CATEGORIES.INTERESTED_IN_LISTING,
    ],
  },
  {
    id: "faq2",
    questionKey: "question2",
    answerKey: "answer2",
    categories: [
      FAQ_CATEGORIES.AGENT_OR_BROKER,
      FAQ_CATEGORIES.INTERESTED_IN_LISTING,
    ],
  },
  {
    id: "faq4",
    questionKey: "question4",
    answerKey: "answer4",
    categories: [FAQ_CATEGORIES.INTERESTED_IN_LISTING],
  },
  {
    id: "faq5",
    questionKey: "question5",
    answerKey: "answer5",
    categories: [
      FAQ_CATEGORIES.AGENT_OR_BROKER,
      FAQ_CATEGORIES.INTERESTED_IN_LISTING,
    ],
  },
  {
    id: "faq6",
    questionKey: "question6",
    answerKey: "answer6",
    categories: [FAQ_CATEGORIES.AGENT_OR_BROKER],
  },
  {
    id: "faq7",
    questionKey: "question7",
    answerKey: "answer7",
    categories: [FAQ_CATEGORIES.AGENT_OR_BROKER],
  },
  {
    id: "faq8",
    questionKey: "question8",
    answerKey: "answer8",
    categories: [FAQ_CATEGORIES.AGENT_OR_BROKER],
  },
  {
    id: "faq9",
    questionKey: "question9",
    answerKey: "answer9",
    categories: [FAQ_CATEGORIES.AGENT_OR_BROKER],
  },
  {
    id: "faq10",
    questionKey: "question10",
    answerKey: "answer10",
    categories: [
      FAQ_CATEGORIES.AGENT_OR_BROKER,
      FAQ_CATEGORIES.INTERESTED_IN_LISTING,
    ],
  },
  {
    id: "faq11",
    questionKey: "question11",
    answerKey: "answer11",
    categories: [
      FAQ_CATEGORIES.AGENT_OR_BROKER,
      FAQ_CATEGORIES.INTERESTED_IN_LISTING,
    ],
  },
  {
    id: "faq12",
    questionKey: "question12",
    answerKey: "answer12",
    categories: [
      FAQ_CATEGORIES.AGENT_OR_BROKER,
      FAQ_CATEGORIES.INTERESTED_IN_LISTING,
    ],
  },
  {
    id: "faq13",
    questionKey: "question13",
    answerKey: "answer13",
    categories: [
      FAQ_CATEGORIES.AGENT_OR_BROKER,
      FAQ_CATEGORIES.INTERESTED_IN_LISTING,
    ],
  },
  {
    id: "faq14",
    questionKey: "question14",
    answerKey: "answer14",
    categories: [
      FAQ_CATEGORIES.AGENT_OR_BROKER,
      FAQ_CATEGORIES.INTERESTED_IN_LISTING,
    ],
  },
  {
    id: "faq17",
    questionKey: "question17",
    answerKey: "answer17",
    categories: [FAQ_CATEGORIES.AGENT_OR_BROKER],
  },
  {
    id: "faq18",
    questionKey: "question18",
    answerKey: "answer18",
    categories: [FAQ_CATEGORIES.AGENT_OR_BROKER],
  },
  {
    id: "faq19",
    questionKey: "question19",
    answerKey: "answer19",
    categories: [
      FAQ_CATEGORIES.AGENT_OR_BROKER,
      FAQ_CATEGORIES.INTERESTED_IN_LISTING,
    ],
  },
  {
    id: "faq20",
    questionKey: "question20",
    answerKey: "answer20",
    categories: [FAQ_CATEGORIES.AGENT_OR_BROKER],
  },
  {
    id: "faq21",
    questionKey: "question21",
    answerKey: "answer21",
    categories: [FAQ_CATEGORIES.AGENT_OR_BROKER],
  },
  {
    id: "faq22",
    questionKey: "question22",
    answerKey: "answer22",
    categories: [
      FAQ_CATEGORIES.AGENT_OR_BROKER,
      FAQ_CATEGORIES.INTERESTED_IN_LISTING,
    ],
  },
  {
    id: "faq23",
    questionKey: "question23",
    answerKey: "answer23",
    categories: [FAQ_CATEGORIES.AGENT_OR_BROKER],
  },
  {
    id: "faq24",
    questionKey: "question24",
    answerKey: "answer24",
    categories: [FAQ_CATEGORIES.AGENT_OR_BROKER],
  },
  {
    id: "faq25",
    questionKey: "question25",
    answerKey: "answer25",
    categories: [FAQ_CATEGORIES.LOOKING_FOR_PROPERTIES],
  },
  {
    id: "faq26",
    questionKey: "question26",
    answerKey: "answer26",
    categories: [FAQ_CATEGORIES.LOOKING_FOR_PROPERTIES],
  },
  {
    id: "faq27",
    questionKey: "question27",
    answerKey: "answer27",
    categories: [FAQ_CATEGORIES.LOOKING_FOR_PROPERTIES],
  },
  {
    id: "faq28",
    questionKey: "question28",
    answerKey: "answer28",
    categories: [FAQ_CATEGORIES.LOOKING_FOR_PROPERTIES],
  },
  {
    id: "faq29",
    questionKey: "question29",
    answerKey: "answer29",
    categories: [FAQ_CATEGORIES.LOOKING_FOR_PROPERTIES],
  },
  {
    id: "faq30",
    questionKey: "question30",
    answerKey: "answer30",
    categories: [FAQ_CATEGORIES.LOOKING_FOR_PROPERTIES],
  },
  {
    id: "faq31",
    questionKey: "question31",
    answerKey: "answer31",
    categories: [FAQ_CATEGORIES.LOOKING_FOR_PROPERTIES],
  },
  {
    id: "faq32",
    questionKey: "question32",
    answerKey: "answer32",
    categories: [FAQ_CATEGORIES.LOOKING_FOR_PROPERTIES],
  },
  {
    id: "faq33",
    questionKey: "question33",
    answerKey: "answer33",
    categories: [FAQ_CATEGORIES.LOOKING_FOR_PROPERTIES],
  },
  {
    id: "faq34",
    questionKey: "question34",
    answerKey: "answer34",
    categories: [FAQ_CATEGORIES.LOOKING_FOR_PROPERTIES],
  },
  {
    id: "faq35",
    questionKey: "question35",
    answerKey: "answer35",
    categories: [FAQ_CATEGORIES.LOOKING_FOR_PROPERTIES],
  },
  {
    id: "faq36",
    questionKey: "question36",
    answerKey: "answer36",
    categories: [FAQ_CATEGORIES.LOOKING_FOR_PROPERTIES],
  },

  {
    id: "faq37",
    questionKey: "question37",
    answerKey: "answer37",
    categories: [FAQ_CATEGORIES.LOOKING_FOR_PROPERTIES],
  },
  {
    id: "faq38",
    questionKey: "question38",
    answerKey: "answer38",
    categories: [FAQ_CATEGORIES.LOOKING_FOR_PROPERTIES],
  },
  {
    id: "faq39",
    questionKey: "question39",
    answerKey: "answer39",
    categories: [FAQ_CATEGORIES.LOOKING_FOR_PROPERTIES],
  },
  {
    id: "faq40",
    questionKey: "question40",
    answerKey: "answer40",
    categories: [FAQ_CATEGORIES.LOOKING_FOR_PROPERTIES],
  },
  {
    id: "faq41",
    questionKey: "question41",
    answerKey: "answer41",
    categories: [FAQ_CATEGORIES.LOOKING_FOR_PROPERTIES],
  },
  {
    id: "faq42",
    questionKey: "question42",
    answerKey: "answer42",
    categories: [FAQ_CATEGORIES.LOOKING_FOR_PROPERTIES],
  },
];

export {
  PROPERTIES_CATEGORIES as CATEGORY,
  PROPERTIES_SEARCH_FILTERS as SEARCH_FILTERS,
} from "./common-constants";

export const enum MENU_KEYS {
  CONTENT ="content",
  DAILY = "daily",
  PROPERTIES = `properties`,
  VEHICLES = `vehicles`,
  commercial = "commercial",
  international = "international",
  residential = "residential",
  CLASSIFIEDS = `classifieds`,
  SERVICES = `services`,
  JOBS = `jobs`,
  NEWS = `news`,
  EVENTS = `events`,
FORUM = "community",
  BUSINESS_OR_PLACE = `business-or-place`,
  ESHOPS = `eshops`,
  AGENTS = `agents`,
  AGENCIES = `agencies`,
  REWARDS = `rewards`,
  CARS = `cars`,
  SHOWROOMS = `showrooms`,
  CAR_RENTALS = `car-rentals`,
  RENTAL_COMPANIES = `rental-companies`,
  COMMERCIAL_VEHICLE = `commercial-vehicle`,
  GARAGES = `garages`,
  MOTORBIKE = `motorbike`,
  BOAT_YACHTS = `boat-yachts`,
  CAR_PLATE_NUMBER = `car-plate-number`,
  CAR_PARTS = `car-parts-accessories`,
  CLASSIFIEDS_ITEMS = "items",
  CLASSIFIEDS_DEALS = "deals",
  CLASSIFIEDS_STORES = "stores",
  CLASSIFIEDS_PRELOVED = "preloved",
  CLASSIFIEDS_COLLECTIBLES = "collectibles",
}

export const TIME_IN_MILLISECONDS = {
  "24_HOURS": 1000 * 60 * 60 * 24,
  "30_MINUTES": 1000 * 60 * 60 * 0.5,
  "600_MILLISECONDS": 600,
  "1_SECOND": 1000,
  "5_SECOND": 5 * 1000,
  "1_MINUTE": 1000 * 60,
};

export const FAVOURITES_TABS = {
  saved_properties: "Saved Properties",
  saved_searches: "Saved Searches",
  favourites: "Favourites",
};

export enum FAVOURITES_ACTIVE_TABS {
  FOCUSED_TAB_KEY = "focusedTab",
}

export const PROTECTED_ROUTES = [
  "/properties/dashboard",
  "/properties/create",
  "/payment",
  "/favourites",
  "/subscription",
  "/edit",
  "/favourites-management",
];

export const COMMON_GRADIENT_COLOR =
  "linear-gradient(87deg, #0A426B 2.27%, #35B7EF 97.56%)";

export const enum FOOTER_DEFAULT_HEIGHTS_WITH_MARGINS {
  xs = 1056,
  md = 978,
  lg = 522,
}

export const isErrorResponseObj = (obj: unknown): obj is ErrorResponse => {
  return Boolean(
    obj && typeof obj === "object" && "statusCode" in obj && "message" in obj
  );
};

export const enum DATE_FORMATS {
  YEAR_MONTH_DAY = "YYYY-MM-DD",
}

export enum SUBSCRIPTION_STATUS {
  ACTIVE = 1,
  FAILED = 0,
  PENDING = 2,
  EXPIRED = 3,
  CANCELLED = 4,
  ON_HOLD = 5,
  READY = 6,
  PENDING_ACTIVATION = 7,
}
