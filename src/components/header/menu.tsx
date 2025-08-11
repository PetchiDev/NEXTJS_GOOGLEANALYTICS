import React from "react";
import {
  AgencyIcon,
  AgentIcon,
  CommercialIcon,
  InternationalIcon,
  ResidentialIcon,
} from "../../icons";
import { config, MENU_KEYS } from "../../constants";
import { removeSearchParams } from "../../utils";

import Cars from "../../icons/header/vehicles/cars";
import Showrooms from "../../icons/header/vehicles/showrooms";
import CarRental from "../../icons/header/vehicles/car_rental";
import RentalCompanies from "../../icons/header/vehicles/rental_companies";
import Commercial from "../../icons/header/vehicles/commercial";
import Garages from "../../icons/header/vehicles/garages";
import MotorBikes from "../../icons/header/vehicles/motorbikes";
import Boat from "../../icons/header/vehicles/boat";
import Plate from "../../icons/header/vehicles/plate";
import Parts from "../../icons/header/vehicles/parts";

//NEW CONTENT ICONS (replace with actual ones)
import DailyIcon from "../../icons/header/content/daily";
import NewsIcon from "../../icons/header/content/news";
import EventsIcon from "../../icons/header/content/events";
import CommunityIcon from "../../icons/header/content/community";
import ItemIcon from "../../icons/header/classifieds/item";
export const menu: MenuItem[] = [
  {
    key: MENU_KEYS.PROPERTIES,
    url: `${config.ql_next_properties_url}/${MENU_KEYS.PROPERTIES}`,
    submenu: [
      {
        key: MENU_KEYS.residential,
        url: `/${MENU_KEYS.PROPERTIES}/${MENU_KEYS.residential}?purpose=For+Rent`,
        href: (searchParams: URLSearchParams) => {
          const baseUrl = `/${MENU_KEYS.PROPERTIES}/${MENU_KEYS.residential}?purpose=For+Rent`;
          const updatedParams = removeSearchParams(searchParams, []);
          return updatedParams ? `${baseUrl}&${updatedParams}` : baseUrl;
        },
        icon: <ResidentialIcon />,
      },
      {
        key: MENU_KEYS.commercial,
        url: `/${MENU_KEYS.PROPERTIES}/${MENU_KEYS.commercial}?purpose=For+Rent`,
        href: (searchParams: URLSearchParams) => {
          const baseUrl = `/${MENU_KEYS.PROPERTIES}/${MENU_KEYS.commercial}?purpose=For+Rent`;
          const updatedParams = removeSearchParams(searchParams, []);
          return updatedParams ? `${baseUrl}&${updatedParams}` : baseUrl;
        },
        icon: <CommercialIcon />,
      },
      {
        key: MENU_KEYS.international,
        url: `/${MENU_KEYS.PROPERTIES}/${MENU_KEYS.international}?purpose=For+Sale`,
        href: (searchParams: URLSearchParams) => {
          const baseUrl = `/${MENU_KEYS.PROPERTIES}/${MENU_KEYS.international}?purpose=For+Sale`;
          const updatedParams = removeSearchParams(searchParams, []);
          return updatedParams ? `${baseUrl}&${updatedParams}` : baseUrl;
        },
        icon: <InternationalIcon />,
      },
    ],
    rightSubMenu: [
      {
        key: MENU_KEYS.AGENTS,
        url: `/${MENU_KEYS.PROPERTIES}/${MENU_KEYS.AGENTS}`,
        href: () => `/${MENU_KEYS.PROPERTIES}/${MENU_KEYS.AGENTS}`,
        icon: <AgentIcon />,
      },
      {
        key: MENU_KEYS.AGENCIES,
        url: `/${MENU_KEYS.PROPERTIES}/${MENU_KEYS.AGENCIES}`,
        href: () => `/${MENU_KEYS.PROPERTIES}/${MENU_KEYS.AGENCIES}`,
        icon: <AgencyIcon />,
      },
    ],
  },
  {
    key: MENU_KEYS.VEHICLES,
    url: `${config.ql_next_vehicle_url}/${MENU_KEYS.VEHICLES}`,
    submenu: [
      {
        key: MENU_KEYS.CARS,
        url: `/${MENU_KEYS.VEHICLES}/${MENU_KEYS.CARS}`,
        icon: <Cars />,
      },
      {
        key: MENU_KEYS.SHOWROOMS,
        url: `${config.ql_url}/${MENU_KEYS.SHOWROOMS}`,
        icon: <Showrooms />,
      },
      {
        key: MENU_KEYS.CAR_RENTALS,
        url: `${config.ql_url}/${MENU_KEYS.VEHICLES}/${MENU_KEYS.CAR_RENTALS}`,
        icon: <CarRental />,
      },
      {
        key: MENU_KEYS.RENTAL_COMPANIES,
        url: `${config.ql_url}/${MENU_KEYS.RENTAL_COMPANIES}`,
        icon: <RentalCompanies />,
      },
      {
        key: MENU_KEYS.COMMERCIAL_VEHICLE,
        url: `${config.ql_url}/${MENU_KEYS.VEHICLES}/${MENU_KEYS.COMMERCIAL_VEHICLE}`,
        icon: <Commercial />,
      },
      {
        key: MENU_KEYS.GARAGES,
        url: `${config.ql_url}/${MENU_KEYS.VEHICLES}/${MENU_KEYS.GARAGES}`,
        icon: <Garages />,
      },
      {
        key: MENU_KEYS.MOTORBIKE,
        url: `${config.ql_url}/${MENU_KEYS.VEHICLES}/${MENU_KEYS.MOTORBIKE}`,
        icon: <MotorBikes />,
      },
      {
        key: MENU_KEYS.BOAT_YACHTS,
        url: `${config.ql_url}/${MENU_KEYS.VEHICLES}/${MENU_KEYS.BOAT_YACHTS}`,
        icon: <Boat />,
      },
      {
        key: MENU_KEYS.CAR_PLATE_NUMBER,
        url: `${config.ql_url}/${MENU_KEYS.VEHICLES}/${MENU_KEYS.CAR_PLATE_NUMBER}`,
        icon: <Plate />,
      },
      {
        key: MENU_KEYS.CAR_PARTS,
        url: `${config.ql_url}/${MENU_KEYS.VEHICLES}/${MENU_KEYS.CAR_PARTS}`,
        icon: <Parts />,
      },
    ],
  },
  {
  key: MENU_KEYS.CLASSIFIEDS,
  url: `${config.ql_url}/classifieds`,
  submenu: [
    {
      key: MENU_KEYS.CLASSIFIEDS_ITEMS,
      url: `${config.ql_url}/classifieds/items`,
      icon: <ItemIcon />,
    },
    {
      key: MENU_KEYS.CLASSIFIEDS_DEALS,
      url: `${config.ql_url}/classifieds/deals`,
      icon: <ItemIcon />,
    },
    {
      key: MENU_KEYS.CLASSIFIEDS_STORES,
      url: `${config.ql_url}/classifieds/stores`,
      icon: <ItemIcon />,
    },
    {
      key: MENU_KEYS.CLASSIFIEDS_PRELOVED,
      url: `${config.ql_url}/classifieds/preloved`,
      icon: <ItemIcon />,
    },
    {
      key: MENU_KEYS.CLASSIFIEDS_COLLECTIBLES,
      url: `${config.ql_url}/classifieds/collectibles`,
      icon: <ItemIcon />,
    },
  ],
},
  {
    key: MENU_KEYS.SERVICES,
    url: `${config.ql_url}/${MENU_KEYS.SERVICES}`,
    submenu: [],
  },
  {
    key: MENU_KEYS.JOBS,
    url: `${config.ql_url}/${MENU_KEYS.JOBS}`,
    submenu: [],
  },
  {
    key: MENU_KEYS.REWARDS,
    url: `${config.ql_next_rewards_url}/${MENU_KEYS.REWARDS}`,
    submenu: [],
  },
  //VIRTUAL CONTENT ENTRY for submenu rendering
  {
    key: MENU_KEYS.CONTENT,
    url: `/content`,
    submenu: [
      {
        key: MENU_KEYS.DAILY,
        url: `/content/daily`,
        icon: <DailyIcon />,
      },
      {
        key: MENU_KEYS.NEWS,
        url: `/content/news`,
        icon: <NewsIcon />,
      },
      {
        key: MENU_KEYS.EVENTS,
        url: `/content/events`,
        icon: <EventsIcon />,
      },
      {
        key: MENU_KEYS.FORUM,
        url: `/content/community`,
        icon: <CommunityIcon />,
      },
    ],
  },
];

export const more = [
  {
    key: MENU_KEYS.BUSINESS_OR_PLACE,
    url: `${config.ql_url}/${MENU_KEYS.BUSINESS_OR_PLACE}`,
    submenu: [],
  },
  {
    key: MENU_KEYS.ESHOPS,
    url: `${config.ql_url}/${MENU_KEYS.ESHOPS}`,
    submenu: [],
  },
];

export type SubMenuItem = {
  key: MENU_KEYS;
  url: string;
  href?: (searchParams: URLSearchParams, isFromDashboard: boolean) => string;
  icon: React.ReactElement;
};

export type MenuItem = {
  key: MENU_KEYS;
  url: string;
  submenu: SubMenuItem[];
  rightSubMenu?: SubMenuItem[];
};
