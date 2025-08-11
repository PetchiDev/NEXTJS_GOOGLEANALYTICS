"use client";
import { useMe } from "@/api/hooks/use-me";
import { useEffect } from "react";

export default function GameballWidget() {
  const { data: userInfo } = useMe();

  useEffect(() => {
    window.GbLoadInit = function (userInfo: { drupalUid: string; username: string; email: string; }) {
      if (window.GbSdk) {
        window.GbSdk.init({
          APIKey: process.env.NEXT_PUBLIC_GAMEBALL_API_KEY,
          lang: "en",
          playerUniqueId: userInfo?.drupalUid || "",
          playerAttributes: userInfo?.drupalUid
            ? {
                displayName: userInfo.username,
                email: userInfo.email,
              }
            : {},
          // openDetail: `details_calendar_${process.env.NEXT_PUBLIC_CAMPAIGNID}`,
          // hideNavigation: true
        });
      }
    };

    // Load the external Gameball script
    const script = document.createElement("script");
    script.src = "https://assets.gameball.co/widget/js/gameball-init.min.js";
    script.async = true;
    script.onload = () => {
      if (window.GbLoadInit) {
        window.GbLoadInit(userInfo);
      }
    };

    document.body.appendChild(script);

    return () => {
      // Cleanup: Remove script and restore fetch function
      document.body.removeChild(script);
    };
  }, [userInfo]);

  return null;
}
