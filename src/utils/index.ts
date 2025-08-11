import { PROTECTED_ROUTES } from "../constants";

export {
  getTokenAndCheckExpiry,
  useGetTokenFromCookie,
  handleLogout,
} from "./auth";
export * from "./categories";
export * from "./misc";
export * from "./analytics";

export const removeSearchParams = (
  searchParams: URLSearchParams,
  keysToRetain?: Readonly<Array<string>>
) => {
  const newSearchParams = new URLSearchParams(searchParams.toString()); // Create a new instance
  Array.from(newSearchParams.keys()).forEach((key) => {
    if (!keysToRetain?.includes(key)) {
      newSearchParams.delete(key);
    }
  });
  return newSearchParams;
};

/**
 * Checks if the path requires authentication
 */
export const requiresAuth = (pathname: string): boolean => {
  return PROTECTED_ROUTES.some(
    (path) => pathname.includes(path) || pathname.endsWith(path)
  );
};
