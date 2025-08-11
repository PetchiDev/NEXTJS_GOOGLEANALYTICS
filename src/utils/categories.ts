import { config, MENU_KEYS } from "../constants";
import PropertiesIcon from "../icons/dashboard-management/properties";
import VehicleIcon from "../icons/dashboard-management/vehicles";
import ClassifiedIcon from "../icons/dashboard-management/classified";
import ServiceIcon from "../icons/dashboard-management/service";
import JobsIcon from "../icons/dashboard-management/jobs";
import RewardsIcon from "../icons/dashboard-management/rewards";
import DashboardPropertiesIcon from "../icons/link-management/properties";
import DashboardVehicleIcon from "../icons/link-management/vehicles";
import DashboardClassifiedIcon from "../icons/link-management/classified";
import DashboardServiceIcon from "../icons/link-management/service";
import DashboardJobsIcon from "../icons/link-management/jobs";
import DashboardRewardsIcon from "../icons/link-management/rewards";
interface GetLinkCategoriesProps {
  drupalUid?: string;
  hasSubscription?: boolean;
}

export const getLinkCategories = ({
  drupalUid,
  hasSubscription = false,
}: GetLinkCategoriesProps) => {
  const userBaseUrl = drupalUid
    ? `${config.ql_url}/user/${drupalUid}`
    : config.ql_url;

  const categories = [
    {
      name: "Properties",
      dashboardUrl: `${config.ql_next_properties_url}/${MENU_KEYS.PROPERTIES}/dashboard`,
      icon: PropertiesIcon,
      favoriteUrl: `${config.ql_next_properties_url}/${MENU_KEYS.PROPERTIES}/favourites?focusedTab=Saved+Properties`,
      isExternalLink: true,
      dashboardIcon: DashboardPropertiesIcon,
    },
    {
      name: "Vehicles",
      dashboardUrl: `${config.ql_next_vehicle_url}/${MENU_KEYS.VEHICLES}/dashboard`,
      icon: VehicleIcon,
      favoriteUrl: `${config.ql_next_vehicle_url}/${MENU_KEYS.VEHICLES}/favourites?tab=saved-cars`,
      isExternalLink: true,
      dashboardIcon: DashboardVehicleIcon,
    },
    {
      name: "Classifieds",
      dashboardUrl: `${userBaseUrl}/${MENU_KEYS.CLASSIFIEDS}`,
      icon: ClassifiedIcon,
      favoriteUrl: `${userBaseUrl}${drupalUid ? "/wishlist" : ""}`,
      isExternalLink: true,
      dashboardIcon: DashboardClassifiedIcon,
    },
    {
      name: "Services",
      dashboardUrl: `${userBaseUrl}/${MENU_KEYS.CLASSIFIEDS}`,
      icon: ServiceIcon,
      favoriteUrl: `${userBaseUrl}${drupalUid ? "/wishlist" : ""}`,
      isExternalLink: true,
      dashboardIcon: DashboardServiceIcon,
    },
    {
      name: "Jobs",
      dashboardUrl: `${userBaseUrl}/${MENU_KEYS.JOBS}`,
      icon: JobsIcon,
      favoriteUrl: `${userBaseUrl}${drupalUid ? "/wishlist" : ""}`,
      isExternalLink: true,
      dashboardIcon: DashboardJobsIcon,
    },
  ];

  if (hasSubscription) {
    categories.push({
      name: "Rewards",
      dashboardUrl: `${config.ql_next_rewards_url}/${MENU_KEYS.REWARDS}/dashboard`,
      icon: RewardsIcon,
      favoriteUrl: `${config.ql_next_rewards_url}/${MENU_KEYS.REWARDS}/favourites`,
      isExternalLink: true,
      dashboardIcon: DashboardRewardsIcon,
    });
  } else {
    categories.push({
      name: "Rewards",
      dashboardUrl: `${config.ql_next_rewards_url}/${MENU_KEYS.REWARDS}`,
      icon: RewardsIcon,
      favoriteUrl: `${config.ql_next_rewards_url}/${MENU_KEYS.REWARDS}/favourites`,
      isExternalLink: true,
      dashboardIcon: DashboardRewardsIcon,
    });
  }
  return categories;
};
