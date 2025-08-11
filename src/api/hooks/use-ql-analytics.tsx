"use client";
import { useMutation } from "@tanstack/react-query";
import { usePathname, useSearchParams } from "next/navigation";
import { useToken } from "../../hooks";
import { QLAnalyticsCall } from "../api-callers";
import { config, QLAnalyticsCallProps } from "../../constants";

export const useQLAnalytics = () => {
  const token = useToken();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  return useMutation({
    mutationFn: async (props: Omit<QLAnalyticsCallProps, "token" | "url" | "vertical">) => {
      try {
        await QLAnalyticsCall({
          ...props,
          vertical: config.vertical,
          token,
          url: `${pathname}${searchParams.toString() && `?${searchParams.toString()}`}`,
        });
      } catch (err) {
        console.error("Error in QLAnalyticsCall:", err);
      }
    },
  });
};
