import { jwtDecode } from "jwt-decode";
import { useMemo } from "react";
import { AUTH_TOKEN_NAME } from "../constants";

export const isTokenExpired = (token: string) => {
  try {
    const decodedToken = jwtDecode(token);
    const expirationTime = decodedToken.exp;
    // Check if the token is expired
    const currentTimestamp = Math.floor(Date.now() / 1000);
    if (expirationTime && expirationTime < currentTimestamp) {
      return true;
    } else {
      return false;
    }
  } catch (error) {
    console.error("Error decoding token:", error);
    return false;
  }
};

export const useToken = () => {
  return useMemo(() => {
    return getToken();
  }, []);
};

export const getToken = () => {
  if (typeof window !== "undefined" && typeof document !== "undefined") {
    const cookies = document.cookie.split(";");
    for (const _cookie of cookies) {
      const cookie = _cookie.trim();
      // Check if this cookie contains the name we're looking for
      if (cookie.startsWith(AUTH_TOKEN_NAME + "=")) {
        const token = cookie.substring(AUTH_TOKEN_NAME.length + 1);
        return isTokenExpired(token) ? null : token;
      }
    }
  }

  return null;
};
