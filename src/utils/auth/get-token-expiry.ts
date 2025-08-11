import { jwtDecode } from "jwt-decode";

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
