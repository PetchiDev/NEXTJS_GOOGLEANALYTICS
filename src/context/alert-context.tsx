"use client";
import { AlertMessage, AlertMessageRef } from "../components";
import { AlertColor } from "@mui/material";

import React, {
  createContext,
  ReactNode,
  useCallback,
  useContext,
  useRef,
  useState,
} from "react";

type AlertContextType = (
  message: string,
  title: string,
  type: AlertColor
) => void;

const AlertContext = createContext<AlertContextType | null>(null);

export const useAlert = () => {
  const context = useContext(AlertContext);

  if (!context) {
    throw new Error("useAlert must be used within an AlertProvider");
  }
  return context;
};

interface AlertProviderProps {
  children: ReactNode;
}

export const AlertProvider: React.FC<AlertProviderProps> = ({ children }) => {
  const alertRef = useRef<AlertMessageRef | null>(null);
  const [shownAlerts, setShownAlerts] = useState(new Set<string>());

  const showAlertMsg = useCallback(
    (message: string, title: string, type: AlertColor) => {
      const alertKey = `${type}-${message}`;

      // Prevent showing duplicate alerts
      if (shownAlerts.has(alertKey)) return;

      // Add alert to the list of shown alerts
      setShownAlerts((prev) => new Set(prev).add(alertKey));

      alertRef.current?.showAlert({
        severity: type,
        message: message,
        title: title,
      });

      // Remove alert from shown alerts after timeout (3s)
      setTimeout(() => {
        setShownAlerts((prev) => {
          const newSet = new Set(prev);
          newSet.delete(alertKey);
          return newSet;
        });
      }, 3000);
    },
    [shownAlerts]
  );

  return (
    <AlertContext.Provider value={showAlertMsg}>
      {children}
      <AlertMessage ref={alertRef} />
    </AlertContext.Provider>
  );
};
