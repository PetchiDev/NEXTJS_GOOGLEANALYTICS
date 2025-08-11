"use client";
import { useSubscriptionStatus } from "../../hooks";

export const useIsBasicUser = () => {
  const { hasTrial, hasBasic } = useSubscriptionStatus();
  return hasTrial || hasBasic;
};
