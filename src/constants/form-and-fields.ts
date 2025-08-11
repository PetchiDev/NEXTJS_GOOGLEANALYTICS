import { UseControllerProps } from "react-hook-form";

export const enum AD_MODE {
  CREATE = "create",
  EDIT = "edit",
}

export enum IFieldTypes {
  SELECT = "select",
  INPUT = "input",
  RADIO = "radio",
  CHECKBOX = "checkbox",
  PHONE_NUMBER = "phoneNumber",
  EDITOR = "editor",
  FEATURES = "features",
  MAP = "map",
  BLUE_PLATE = "bluePlate",
  UPDATE_CONTACT_INFO = "updateContactInfo",
  LANGUAGES = "languages",
  FILE = "file",
  NUMBER = "number",
}

export const enum LABEL_SUFFIX {
  REQUIRED_FIELD = "*",
}

export const IMAGE_ORDERS = [
  "front_view",
  "second",
  "third",
  "fourth",
  "fifth",
];

// enum for property schema file
export const PROPERTY = {
  PURPOSE: {
    FOR_RENT: 1,
    FOR_SALE: 2,
  },
  CATEGORY: {
    FOR_RENT: {
      RESIDENTIAL: 1,
      COMMERCIAL: 2,
    },
    FOR_SALE: {
      RESIDENTIAL: 3,
      COMMERCIAL: 4,
      INTERNATIONAL: 5,
    },
  },
  TYPE: {
    FOR_RENT: {
      [1]: {
        // Residential
        APARTMENT: 1,
        VILLA: 2,
        HOTEL_STAY: 3,
        SHARED: 4,
      },
      [2]: {
        // Commercial
        RETAIL: 5,
        WAREHOUSE: 6,
        LABOUR_CAMP: 7,
        LAND: 8,
        STORAGE: 9,
        BUILDING_COMPOUND: 10,
        OFFICE: 11,
        COMMERCIAL_SPACE: 12,
      },
    },
    FOR_SALE: {
      [3]: {
        // Residential
        APARTMENT: 14,
        VILLA: 15,
        FULL_BUILDING: 16,
      },
      [4]: {
        // Commercial
        OFFICE_SPACE: 17,
        RETAIL: 18,
        WAREHOUSE: 19,
        LABOUR_CAMP: 20,
        LAND: 21,
        BUSINESS: 22,
        BUILDING_COMPOUND: 23,
        COMMERCIAL_SPACE: 24,
      },
      [5]: {
        // International
        APARTMENT: 25,
        COMMERCIAL_SPACE: 26,
        HOUSE: 27,
        LAND: 28,
      },
    },
  },
};

export const MAX_FILE_SIZE = 30 * 1024 * 1024; // 30MB in bytes

export const ALLOWED_TYPES = [
  "image/jpeg",
  "image/png",
  "image/jpg",
  "image/webp",
  "image/heif",
  "image/heic",
]; // Add other allowed types if needed

const MIN_ALLOWED_IMAGES = 4;
const MAX_ALLOWED_IMAGES = 10;

export const RULES_FOR_IMAGES: UseControllerProps["rules"] = {
  required: "images_required_error",
  validate: (value) => {
    if (!value || value.length < 1) {
      return "images_required_error";
    }
    if (value.length < MIN_ALLOWED_IMAGES) {
      return "images_error";
    }
    if (value.length > MAX_ALLOWED_IMAGES) {
      return "images_range_error";
    }
    if (!value[0].viewpoint || value[0].viewpoint !== "front_view") {
      return "cover_photo_error";
    }
    for (const file of value) {
      if (!ALLOWED_TYPES.includes(file.type)) {
        return "image_type_error";
      }
      if (file.size > MAX_FILE_SIZE) {
        return "image_size_error";
      }
    }
    return true;
  },
};

export const MINIMUM_IMAGES_REQUIRED = 4;
export const MAX_FILE_LIMIT = 10;

export const PROPERTIES_EMAIL = "properties@qatarliving.com";

export enum FIELD_DATA_KEY {
  REAL_ESTATE = "realEstateType",
  UPDATE_CONTACT_INFO = "updateContactInfo",
  APARTMENT_TYPE = "apartmentType",
  FITTINGS = "fitting",
  FURNISHING = "furnishing",
  BEDROOM = "bedroom",
  BATHROOM = "bathroom",
  SQUARE_METERS = "squareMeters",
  KITCHEN = "kitchen",
  PARKING = "parking",
  AC_TYPE = "acType",
  HAS_KAHRAMA = "hasKahramaa",
  HAS_INTERNET = "hasInternet",
  GENDER = "gender",
  RENTAL_PERIOD = "rentalPeriod",
  DEPOSIT = "deposit",
  COMMISSION = "commission",
  COMMISSION_TYPE = "commissionType",
  COMMISSION_VALUE = "commissionValue",
  DOWN_PAYMENT = "downpayment",
  DOWN_PAYMENT_VALUE = "downpaymentValue",
  PRICE_FREQUENCY = "priceFrequency",
  PRICE = "price",
  PRICE_MIN = "priceMin",
  PRICE_MAX = "priceMax",
  FREE_MONTH = "freeMonth",
  TITLE = "title",
  DESCRIPTION = "description",
  FEATURE = "feature",
  CONTACT_MOBILE = "contactMobile",
  CONTACT_WHATSAPP = "contactWhatsapp",
  CONTACT_EMAIL = "contactEmail",
  REFERENCE_NUMBER = "referenceNumber",
  AGENT = "userId",
  SHOW_EXACT_LOCATION = "showExactLocation",
  BLUE_PLATE = "bluePlate",
  ZONE = "zone",
  STREET = "street",
  BUILDING = "building",
  LOCATION = "location",
  PROPERTIES_MAP = "propertiesMap",
  LANGUAGE = "language",
  NATIONALITY = "nationality",
  CITY = "city",
  COUNTRY = "country",
  FIRST_NAME = "firstName",
  LAST_NAME = "lastName",
  PROFILE_PICTURE = "profilePicture",
  USER_NAME = "userName",
  MESSAGE = "message",
  USERNAME_EMAIL_PHONE = "username_email_phone",
  PASSWORD = "password",
  CONFIRM_PASSWORD = "confirmPassword",
  DESIGNATION = "designation",
  LICENSE_NUMBER = "licenseNumber",
  LICENSE_FILE = "licenseFile",
  AGENCY_NAME = "agencyName",
  AGENCY_EMAIL = "agencyEmail",
  AGENCY_LOGO = "agencyLogoUri",
  COMPANY_EMAIL = "companyEmail",
  CR_NUMBER = "crNumber",
  UPLOAD_CR_ATTACHMENT = "crUri",
  ESTABLISHMENT_CARD_CODE = "establishmentCardCode",
  ESTABLISHMENT_CARD_URI = "establishmentCardUri",
  TRADE_LICENSE_NUMBER = "tradeLicenseNumber",
  TRADE_LICENSE_URI = "tradeLicenseUri",
  TAX_CARD_NUMBER = "taxCardNumber",
  TAX_CARD_URI = "taxCardUri",
  APPROVED_MENU_URI = "approvedMenuUri",
  ABOUT_AGENCY = "aboutAgency",
  ADDRESS = "Address",
  AGENT_NAME = "agentName",
  SHORT_BIO = "bio",
  CATEGORIES = "categories",
  FEEDBACK = "feedback",
  DISCOUNT_PERCENTAGE = "discountPercentage",
  VOUCHER_PRICE = "voucherPrice",
  COMMENT = "comment",
  BRANCH_NAME = "name",
}

export enum FIELD_NAMES {
  REAL_ESTATE = "realEstateTypeId",
  APARTMENT_TYPE = "apartmentTypeId",
  FITTINGS = "fittingsId",
  FURNISHING = "furnishingId",
  BEDROOM = "bedroomId",
  BATHROOM = "bathroomId",
  SQUARE_METERS = "squareMeters",
  KITCHEN = "kitchenId",
  PARKING = "parkingId",
  AC_TYPE = "acTypeId",
  HAS_KAHRAMA = "hasKahramaa",
  HAS_INTERNET = "hasInternet",
  GENDER = "genderId",
  RENTAL_PERIOD = "rentalPeriodId",
  DEPOSIT = "depositId",
  COMMISSION = "commissionId",
  COMMISSION_TYPE = "commissionType",
  COMMISSION_PERCENTAGE = "commissionPercentage",
  COMMISSION_CASH = "commissionCash",
  DOWN_PAYMENT = "downpaymentId",
  DOWN_PAYMENT_PERCENTAGE = "downpaymentPercentage",
  DOWN_PAYMENT_CASH = "downpaymentCash",
  PRICE_FREQUENCY = "priceFrequencyId",
  PRICE = "price",
  DISCOUNTED_PRICE = "discounted_price",
  DISCOUNT_PERCENTAGE = "discountPercentage",
  VOUCHER_PRICE = "voucherPrice",
  FREE_MONTH = "freeMonthId",
  TITLE = "title",
  DESCRIPTION = "description",
  TERMS_AND_CONDITIONS = "offerTermsAndConditions",
  FEATURE = "features",
  CONTACT_MOBILE = "contactMobile",
  CONTACT_WHATSAPP = "contactWhatsapp",
  CONTACT_EMAIL = "contactEmail",
  REFERENCE_NUMBER = "referenceNumber",
  AGENT = "userId",
  ZONE = "zoneId",
  STREET = "street",
  BUILDING = "building",
  LOCATION = "locationId",
  SHOW_APPROXIMATE_LOCATION = "approximateLocation",
  IS_MULTI_ITEMS = "isMultiItems",
  REDEMPTION_TYPE = "redemptionType",
  REDEMPTION_LIMIT = "redemptionLimit",
  START_DATE = "startDate",
  END_DATE = "endDate",
  IS_ALAYA_OFFER = "isAlaya",
  LANGUAGE = "language",
  NATIONALITY = "nationality",
  CITY = "cityId",
  COUNTRY = "countryId",
  DESIGNATION = "designation",
  USER_NAME = "userName",
  LICENSE_NUMBER = "licenseNumber",
  LICENSE_FILE = "licenseUri",
  PROFILE_PICTURE = "imageUri",
  FIRST_NAME = "firstName",
  LAST_NAME = "lastName",
  MESSAGE = "message",
  USERNAME_EMAIL_PHONE = "username_email_phone",
  PASSWORD = "password",
  CONFIRM_PASSWORD = "confirmPassword",
  AGENCY_NAME = "agencyName",
  COMPANY_EMAIL = "companyEmail",
  CR_NUMBER = "crNumber",
  UPLOAD_CR_ATTACHMENT = "crUri",
  ESTABLISHMENT_CARD_CODE = "establishmentCardCode",
  ESTABLISHMENT_CARD_URI = "establishmentCardUri",
  TRADE_LICENSE_NUMBER = "tradeLicenseNumber",
  TRADE_LICENSE_URI = "tradeLicenseUri",
  TAX_CARD_NUMBER = "taxCardNumber",
  TAX_CARD_URI = "taxCardUri",
  APPROVED_MENU_URI = "approvedMenuUri",
  ABOUT_AGENCY = "aboutAgency",
  ADDRESS = "Address",
  AGENT_NAME = "agentName",
  SHORT_BIO = "bio",
  AGENT_EMAIL = "agentEmail",
  COMMENT = "comment",
  AGENCY_EMAIL = "agencyEmail",
  AGENCY_LOGO = "agencyLogoUri",
  BRANCH_NAME = "name",
  BRANCH_LOCATION = "location",
}

export const LICENSE_FILE_ALLOWED_TYPES = [
  "image/jpg",
  "image/png",
  "image/pdf",
];
export const PROFILE_PICTURE_ALLOWED_TYPES = [
  "image/jpg",
  "image/png",
  "image/jpeg",
  "image/webp",
];

export const FILE_ALLOWED_TYPES = [
  "image/jpg",
  "image/jpeg",
  "image/png",
  "application/pdf",
];

export const LICENSE_FILE_MAX_FILE_SIZE = 500 * 1024 * 1024; // 500MB in bytes
export const UPLOAD_ATTACHMENT_FILE_MAX_FILE_SIZE = 10 * 1024 * 1024; // 10MB in bytes

export const enum SORT_BY_VALUE {
  DEFAULT_OP = "Default",
  NEW_OFFERS = "New Offers",
  EXPIRY_DATE = "Expiry Date",
}
