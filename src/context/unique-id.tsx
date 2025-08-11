"use client";
import { uuid } from "@/utils";
import React, { createContext, ReactNode, useContext } from "react";

// Define a type for the context value
type UniqueIdContextType = string | undefined;

// Create the context
const UniqueIdContext = createContext<UniqueIdContextType>(undefined);

// Custom hook for using the context
export const useUniqueId = (): string => {
  const context = useContext(UniqueIdContext);
  if (context === undefined) {
    throw new Error("useUniqueId must be used within a UniqueIdProvider");
  }
  return context;
};

// Provider component
export const UniqueIdProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const uniqueId = uuid();

  return (
    <UniqueIdContext.Provider value={uniqueId}>
      {children}
    </UniqueIdContext.Provider>
  );
};
