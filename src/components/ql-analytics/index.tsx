"use client";
import React, { FC, useEffect, useRef } from "react";
import { BannerImage } from "../../types";
import { isEqual } from "lodash";
import compact from 'lodash/compact';
import { useQLAnalytics } from "../../api";
import { QLAnalyticsCallProps } from "../../constants";

type QLAnalyticsProps = Omit<QLAnalyticsCallProps, "token" | "url" | "vertical"> & {
  bannerImages?: BannerImage[];
};

// extract analytics_slot for the banner from banner image object
const bannerSlots = (images:BannerImage[]) => compact(
  images.map((img) => img?.analytics_slot)
)

const QLAnalytics: FC<QLAnalyticsProps> = (props) => {
  const { mutate: callQLAnalytics } = useQLAnalytics();
  const prevPropsRef = useRef<QLAnalyticsProps | null>(null);

  useEffect(() => {
    const newProps = { ...props };
    // Need to sort arrays as they are not equal if they have different order
    if (typeof newProps === "object") {
      // if banner images list is passed
      if (newProps.bannerImages) {
        // get banners analytics_slot from images objects
        newProps.banner = [
          ...(Array.isArray(newProps.banner) ? newProps.banner : newProps.banner ? [newProps.banner] : []),
          ...bannerSlots(newProps.bannerImages)
        ].filter((b): b is string => Boolean(b));
      }
      for (const key in newProps) {
        if (Array.isArray(newProps[key as keyof QLAnalyticsProps])) {
          (newProps[key as keyof QLAnalyticsProps] as string[]) = (
            newProps[key as keyof QLAnalyticsProps] as string[]
          )?.sort();
        }
      }
    }
    if (newProps && !isEqual(prevPropsRef.current, newProps)) {
      callQLAnalytics(newProps);
      prevPropsRef.current = newProps;
    }
  }, [callQLAnalytics, props]);

  return <></>;
};

export default QLAnalytics;
