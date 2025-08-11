import { useQuery } from "@tanstack/react-query";
import { API_TAGS, config, MODULE, TIME_IN_MILLISECONDS } from "../constants";
import { getDashboardSummary } from "../api";

interface UseDashboardSummaryProps {
  enabled: boolean;
  userId?: number;
  enableCache?: boolean;
  enableRetry?: boolean;
}

const MAX_RETRIES = 3;

const useDashboardSummary = ({
  enabled,
  userId,
  enableCache = false,
  enableRetry = false,
}: UseDashboardSummaryProps) => {
  const isVehicleModule = config.app_name === MODULE.VEHICLES;
  return useQuery({
    queryKey: [API_TAGS.GET_DASHBOARD_SUMMARY, userId],
    queryFn: () => getDashboardSummary(),
    enabled: enabled && !!userId && !isVehicleModule,
    refetchOnMount: true,
    refetchOnWindowFocus: true,
    refetchOnReconnect: true,
    staleTime: (query) => {
      const { data } = query.state;
      // If userType is undefined, use shorter stale time
      return data?.userType === undefined
        ? TIME_IN_MILLISECONDS["5_SECOND"]
        : TIME_IN_MILLISECONDS["1_MINUTE"];
    },
    refetchInterval: (query) => {
      if (!enableCache) return false;

      const { data, status, errorUpdateCount = 0 } = query.state;
      if ((data?.statusCode === 422 || status === "error") && enableRetry) {
        if (data?.userType === undefined) {
          // Stop refetching if we've already tried MAX_RETRIES times
          if (errorUpdateCount >= MAX_RETRIES) {
            return false;
          }
          return TIME_IN_MILLISECONDS["5_SECOND"];
        }
        return false;
      }
      return false;
    },
  });
};

export default useDashboardSummary;
