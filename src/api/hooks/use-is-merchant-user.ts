"use client";

import { useMe } from "./use-me";

export const useIsMerchantUser = () => {
  const { data: user } = useMe({ staleTime: 0, refetchOnMount: true });
  if (!user) return false;

  const userSubscriptions = user?.subscriptions;
  if (userSubscriptions?.length === 0) return false;

  return userSubscriptions?.some(
    (subscription) =>
      (subscription?.["Regular"] !== undefined &&
        subscription?.["Regular"] !== null) ||
      (subscription?.["Alaya"] !== undefined && subscription["Alaya"] !== null)
  );
};
