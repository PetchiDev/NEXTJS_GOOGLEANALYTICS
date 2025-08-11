"use client";

import { createSyncStoragePersister } from "@tanstack/query-sync-storage-persister";
import { QueryClient } from "@tanstack/react-query";
import { PersistQueryClientProvider } from "@tanstack/react-query-persist-client";
import React, { FC } from "react";
import { APP_PREFIX, TIME_IN_MILLISECONDS } from "../constants";
import { useAlert } from "./alert-context";

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      gcTime: TIME_IN_MILLISECONDS["24_HOURS"],
      refetchInterval: TIME_IN_MILLISECONDS["24_HOURS"],
      throwOnError: true,
    },
  },
});
const persister = createSyncStoragePersister({
  key: `QL${APP_PREFIX}_RQ_OFFLINE_CACHE`,
  storage: typeof window === "undefined" ? undefined : window.localStorage,
});

interface ReactQueryClientProviderProps {
  children: React.ReactNode;
}
export const ReactQueryClientProvider: FC<ReactQueryClientProviderProps> = ({
  children,
}) => {
  const alert = useAlert();
  queryClient.setDefaultOptions({
    mutations: {
      onError: (error) => {
        if (error instanceof Error) {
          alert(error.message, "Error", "error");
        } else {
          alert("An unknown mutation error occurred.", "Error", "error");
        }
      },
    },
  });

  return (
    <PersistQueryClientProvider
      client={queryClient}
      persistOptions={{ persister }}
    >
      {children}
    </PersistQueryClientProvider>
  );
};
