import { ANALYTIC_TYPE, config, QLAnalyticsCallProps } from "../../constants";
import { getToken } from "../../hooks";
import { DashboardSummary, ErrorResponse, User } from "../../types";
import { getBrowserId, getSessionId, handleLogout } from "../../utils";
import { getClient } from "./client";

export const getLoggedInUserInfo = async (token: string | null) => {
  try {
    const userData: User = await getClient({
      url: "/auth/users/me",
      fetchOptions: {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      },
      authenticated: true,
      token,
      baseUrl: config.apiConfig.base_url_common,
    });
    return userData;
  } catch (error) {
    console.error("Failed to fetch user info:", error);
    handleLogout();
  }
};

export const getDashboardSummary = async () => {
  try {
    const token = getToken();
    if (token) {
      const dashboardSummary: DashboardSummary & ErrorResponse =
        await getClient({
          url: `dashboard/summary`,
          token,
          authenticated: true,
        });
      if (dashboardSummary.error) {
        throw new Error(dashboardSummary.message);
      }
      return dashboardSummary;
    }
  } catch (error) {
    console.error("Failed to fetch dashboard summary:", error);
    throw new Error("Failed to fetch summary");
  }
};

export const QLAnalyticsCall = async ({
  analyticType,
  additionalTag,
  token,
  vertical,
  ...restProps
}: QLAnalyticsCallProps) => {
  try {
    const headers: Record<string, string> = {
      "Content-Type": "application/json",
      "X-Browser-ID": getBrowserId(),
      "X-Session-ID": getSessionId(),
    };

    if (token) {
      headers["Authorization"] = `Bearer ${token}`;
    }
    const queryParams = new URLSearchParams();
    queryParams.append("type", analyticType.toString());
    queryParams.append("vertical", String(vertical));
    let urlSuffix = "";
    if (analyticType === ANALYTIC_TYPE.ACTION_TRACKING) {
      // if we have action tracking, then use action-tracking endpoint
      urlSuffix = "/action-tracking";
    }
    await fetch(
      `${config.apiConfig.base_url_common}/analytics${urlSuffix}?${queryParams.toString()}`,
      {
        method: "POST",
        headers,
        body: JSON.stringify({
          additional_tag: additionalTag,
          ...(restProps || {}),
        }),
      }
    );
  } catch (err) {
    console.error(`This error occurred when calling analytics. Error: ${err}`);
  }
};
