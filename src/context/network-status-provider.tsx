"use client";

import React, { useEffect } from "react";
import { useTranslation } from "../i18n";
import { useAlert } from "./alert-context";

interface NetworkStatusProviderProps {
  children: React.ReactNode;
}

export const NetworkStatusProvider = ({ children }: NetworkStatusProviderProps) => {
  const alertContext = useAlert();
  const { t } = useTranslation("common-err-messages");
  useEffect(() => {
    const handleOffline = () => {
      alertContext(t("failed_network_message"), t("network_failed"), "error");
    };

    window.addEventListener("offline", handleOffline);

    // Cleanup event listeners on component unmount
    return () => {
      window.removeEventListener("offline", handleOffline);
    };
  }, [alertContext, t]);

  return <>{children}</>;
};
