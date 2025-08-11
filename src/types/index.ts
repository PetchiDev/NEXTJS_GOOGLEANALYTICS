import {
  SelectProps,
  SxProps,
  Theme,
  FormControlProps,
  BoxProps,
  PaperProps,
} from "@mui/material";
import { FC, SyntheticEvent } from "react";
import { Control, UseControllerProps } from "react-hook-form";
import { IFieldTypes, SUBSCRIPTION_STATUS } from "../constants";

export interface IQLSelectOption {
  name: string;
  id: string | number;
  disabled?: boolean;
}

export interface IQLGroupSelectOption {
  groupName: string;
  options: IQLSelectOption[];
}

export interface VideoItem {
  id: string;
  title: string;
  thumbnail: string;
  isPlaying: boolean;
}

export interface IconProps {
  width?: string | number;
  height?: string | number;
  color?: string;
  strokeWeight?: string;
  p?: string | number;
  size?: number;
  mr?: string;
  className?: string;
}

export interface SubMenuItems {
  name: string;
  dashboardUrl: string;
  icon: FC<IconProps>;
  favoriteUrl: string;
  isExternalLink: boolean;
  dashboardIcon: FC<IconProps>;
}

type PropertyFieldIdAndName = {
  id: number;
  name: string;
};

interface Zone {
  id: string;
  name: string;
}

export interface Location {
  id: number;
  name: string;
  country?: {
    id: number;
    name: string;
  };
  city?: {
    longitude: number;
    latitude: number;
    id: number;
    name: string;
  };
  zones?: Zone[];
  latitude: number;
  longitude: number;
}

export interface InternationalLocation {
  id: number;
  name: string;
  country: PropertyFieldIdAndName;
  latitude: number;
  longitude: number;
}

export type FormTypes = {
  control?: Control;
  type?: string;
  name: string;
  placeholder?: string;
  labelSuffix?: string;
  rules?: UseControllerProps["rules"];
  label?: string;
  disabled?: boolean;
  toolbarHidden?: boolean;
  maxHeight?: string;
  borderTopRightRadius?: string;
  borderTopLeftRadius?: string;
  borderBottomLeftRadius?: string;
  borderBottomRightRadius?: string;
  padding?: string;
  charLimit?: number;
  minHeight?: string;
  required?: boolean;
};

export type IMuiSelectFieldProps = {
  label?: string;
  labelSuffix?: string;
  optionArray: Array<IQLSelectOption | IQLGroupSelectOption>;
  emptyValueLabel?: string;
  multiple?: boolean;
  disabled?: boolean;
  isEmptyDisabled?: boolean;
  showSearchfield?: boolean;
  fullWidth?: boolean;
  size?: FormControlProps["size"];
  sx?: SxProps<Theme>;
  showAlltext?: boolean;
  optionMinWidth?: number;
  nameField?: boolean;
  paperProps?: PaperProps;
};

export type IQLSelect = {
  isRequired?: boolean;
  error?: string;
  inputField?: SelectProps<string>;
  MuiFieldProps: IMuiSelectFieldProps;
  showError?: boolean;
  onOpen?: (event: SyntheticEvent<Element, Event>) => void;
};

interface FileTypes {
  label: string;
  size: number;
  type: string;
  uri: string;
}
export interface ImageTypes extends FileTypes {
  viewpoint?: string | null;
  id?: number;
}

interface PropertyItem {
  [key: string]: number | null | undefined; // Each key is a string, and the value is always null
}

export interface Agency {
  agencyId: number;
  agencyName: string;
  agencyLogoUri: string | null;
  contactMobile: string;
  contactWhatsapp: string;
  agencyEmail: string;
  aboutAgency: string | null;
  crNumber: string | null;
  crUri: string | null;
  licenseNumber: string | null;
  licenseUri: string | null;
  isVerified: boolean;
  userId: number;
  createdAt: string;
  updatedAt: string;
}

export interface User {
  userId: number;
  firstName: string;
  lastName: string | null;
  username: string;
  mobile: string;
  email: string;
  createdDate: string;
  status: number;
  drupalUid: number;
  isNewUserCreated: boolean;
  subscriptions?: PropertyItem[];
  whatsapp?: string;
  userType?: number;
  agency?: Agency;
}

export interface ErrorResponse {
  error: string;
  message: string;
  statusCode: number;
}

export interface SubscriptionObj {
  id: number;
  userId: number;
  name: string;
  fee: number;
  status: SUBSCRIPTION_STATUS;
  scope?: string | null;
  d365ItemId?: number | null;
  vertical?: number;
  refreshBudget: number;
  userSubscriptionId?: number;
  subscriptionTypeId: number;
  startDate: string;
  endDate: string;
  duration?: number;
  discountedPrice: number;
}

export interface Subscription {
  adsBudget: number;
  subscriptionAdsBudget: number;
  companyUserId: number;
  userSubscriptionId: number;
  subscriptionName: string;
  subscriptionTypeId: number;
  startDate: string;
  endDate: string;
  exportFileUri: string;
  status: SUBSCRIPTION_STATUS;
  duration?: number;
  vertical?: number;
  refreshBudget: number;
  promoteBudget: number;
  subscriptionOfferBudget?: number;
  subscriptionType: {
    id: number;
    name: string;
  };
}
export interface DashboardSummary {
  redemptionsOffers?: number;
  rewardsPoints?: number;
  pendingRedemptions?: number;
  totalOffers?: number;
  publishedOffers?: number;
  redemptionsOffersLast24Hr?: number;
  featuredOffers?: number;
  agency?: Agency;
  subscriptions: Subscription[];
  isProfileCompleted?: boolean;
  userType?: number;
}

export const enum REWARDS_SUBSCRIPTION_TYPE_ID {
  BASIC = 4,
  REGULAR = 5,
  ALAYA = 6,
  TRIAL = 7,
}

export interface BannerImage {
  analytics_slot: string;
  alt: string;
  image_desktop: string;
  image_mobile: string;
  href?: string;
  width_desktop?: string;
  height_desktop?: string;
  width_mobile?: string;
  height_mobile?: string;
  title?: string;
  duration: number;
  sortOrder?: number;
  isDesktop?: boolean;
  isMobile?: boolean;
}

export interface IBanner {
  display?: BoxProps["display"];
  dimensions: {
    width_desktop: string;
    height_desktop: string;
    width_mobile: string;
    height_mobile: string;
  };
  text?: string;
  rotation?: "sequential" | "random";
  images: BannerImage[];
}

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

export type IBannersResBase = {
  [key in IBannerKey]?: IBanner;
};

export interface ImageOrderWithUri {
  id?: number;
  viewpoint: string;
  sortOrder: number;
  uri: string;
}

export interface ImageOrderWithoutUri {
  id: number;
  viewpoint: string;
  sortOrder: number;
}

export interface LabelValue {
  name: string;
  id: string | number;
  purposeId?: string | number;
  categoryId?: string | number;
  featureGroup?: string;
}

export interface IFormField {
  type: IFieldTypes; // Enum or union type for field types like 'text', 'select', 'number', etc.
  dataKey: string;
  props: {
    name: string;
    placeholder?: string;
    rules?: UseControllerProps["rules"];
    inputProps?: {
      label?: string;
      labelSuffix?: string;
      fullWidth?: boolean;
      disabled?: boolean;
      showSearchfield?: boolean;
      isEmptyDisabled?: boolean;
      rows?: number;
      mask?: string;
      maskChar?: string;
      style?: SxProps;
    };
    inputTextFieldProps?: {
      adornment?: string;
      type?: string;
      shouldParse?: boolean;
      charMaxLength?: number;
      showLimitValue?: boolean;
      decimalPointRequired?: boolean;
      capitalize?: boolean;
      multiline?: boolean;
      allowOnlyAlphabets?: boolean;
      allowAlphaNumeric?: true;
    };
    selectProps?: {
      emptyValueLabel: string;
    };
    optionsProps?: {
      optionArray: (IQLSelectOption | IQLGroupSelectOption)[]; // This will be populated dynamically
    };
    featureOptionsProps?: {
      optionArray: LabelValue[]; // This will be populated dynamically for property features
    };
  };
}
