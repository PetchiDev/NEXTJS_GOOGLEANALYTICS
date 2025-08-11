"use client";

import { useQuery } from "@tanstack/react-query";
import { API_TAGS, TIME_IN_MILLISECONDS } from "../../constants";
import { useToken } from "../../hooks";
import { getLoggedInUserInfo } from "../api-callers";

export const useMe = ({
  enabled = true,
  refetchOnMount = false,
  refetchOnWindowFocus = false,
  refetchOnReconnect = false,
  staleTime = TIME_IN_MILLISECONDS["5_SECOND"],
} = {}) => {
  const token = useToken();

  return useQuery({
    queryKey: [API_TAGS.GET_LOGGED_IN_USER_INFO, token],
    queryFn: () => getLoggedInUserInfo(token),
    enabled: enabled && !!token,
    refetchOnMount: refetchOnMount, // Prevent refetch on component mount
    refetchOnWindowFocus: refetchOnWindowFocus, // Prevent refetch when window is focused
    refetchOnReconnect: refetchOnReconnect, // Prevent refetch when the browser reconnects
    staleTime: staleTime,
  });
};
