"use client";
import { useSearchParams } from "next/navigation";
import { useEffect } from "react";
import { REWARDS_SUBSCRIPTION_TYPE_ID } from "../types";
import useDashboardSummary from "./use-dashboard-summary";
import { useMe } from "../api";

export const useSubscriptionStatus = () => {
  const { data: user } = useMe();
  const searchParams = useSearchParams();
  const isPaymentSuccess = searchParams.get("paymentSuccess") === "true";
  const {
    data: dashboardSummary,
    isLoading,
    isPending,
    refetch,
  } = useDashboardSummary({
    enabled: !!user?.userId,
    userId: user?.userId,
    enableCache: true,
  });

  useEffect(() => {
    if (isPaymentSuccess) {
      // refetch without delay
      refetch();
    }
  }, [isPaymentSuccess, refetch]);

  if (!user?.userId) {
    return {
      dashboardSummary,
      noSubscription: true,
      hasTrial: false,
      hasBasic: false,
      hasBoth: false,
      isLoading: false,
      isPending: false,
    };
  }

  const userSubscriptions = dashboardSummary?.subscriptions || [];

  // No subscription case
  if (userSubscriptions.length === 0) {
    return {
      dashboardSummary,
      noSubscription: true,
      hasTrial: false,
      hasBasic: false,
      hasBoth: false,
      isLoading: false,
      isPending: false,
    };
  }

  const hasTrial = userSubscriptions.some(
    (sub) => sub.subscriptionTypeId === REWARDS_SUBSCRIPTION_TYPE_ID.TRIAL
  );
  const hasBasic = userSubscriptions.some(
    (sub) => sub.subscriptionTypeId === REWARDS_SUBSCRIPTION_TYPE_ID.BASIC
  );

  return {
    hasTrial,
    hasBasic,
    dashboardSummary,
    isLoading,
    isPending,
    noSubscription: false,
    hasBoth: hasTrial && hasBasic,
  };
};
