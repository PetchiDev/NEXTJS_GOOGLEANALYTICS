"use client";
import React, {
  createContext,
  ReactNode,
  useContext,
  useMemo,
  useState,
} from "react";

// Define a type for the context value (tuple with urlPaths and setUrlPaths)
type UrlPathsContextType = [
  Map<string, string>, // Map with fileId as key and urlPath as value
  React.Dispatch<React.SetStateAction<Map<string, string>>>,
];

// Create the context with a default value of undefined
const UrlPathsContext = createContext<UrlPathsContextType | undefined>(
  undefined
);

// Custom hook for using the UrlPathsContext
export const useUrlPaths = (): UrlPathsContextType => {
  const context = useContext(UrlPathsContext);
  if (!context) {
    throw new Error("useUrlPaths must be used within a UriPathsProvider");
  }
  return context;
};

// Provider component
export const UriPathsProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [urlPaths, setUrlPaths] = useState<Map<string, string>>(new Map());

  // Memoize the value array to prevent unnecessary re-renders
  const value = useMemo<UrlPathsContextType>(
    () => [urlPaths, setUrlPaths],
    [urlPaths, setUrlPaths]
  );

  return (
    <UrlPathsContext.Provider value={value}>
      {children}
    </UrlPathsContext.Provider>
  );
};
