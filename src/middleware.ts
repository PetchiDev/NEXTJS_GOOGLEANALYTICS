import { CATEGORY, SEARCH_FILTERS } from "@/constants";
import acceptLanguage from "accept-language";
import { jwtDecode } from "jwt-decode";
import { NextRequest, NextResponse } from "next/server";
import {
  AUTH_TOKEN_NAME,
  config as configuration,
} from "@/constants/common-config";
import {
  cookieName,
  fallbackLng,
  languages
} from "@/i18n/settings";

import { requiresAuth } from "@/utils";
import { isTokenExpired } from "@/utils/auth/get-token-expiry";

acceptLanguage.languages(languages);
interface DecodedToken {
  user: {
    is_admin: boolean;
    [key: string]: string | boolean | number | unknown[];
  };
}
const PROPERTY_PATHS = [
  `properties/${CATEGORY.RESIDENTIAL}`,
  `properties/${CATEGORY.COMMERCIAL}`,
  `properties/${CATEGORY.INTERNATIONAL}`,
];

// Default purpose value
const DEFAULT_PURPOSE = "For Rent";

export const config = {
  // matcher: '/:lng*'
  matcher: [
    "/((?!api|_next/static|_next/image|assets|favicon.ico|sw.js|site.webmanifest).*)",
  ],
};

export const middleware = (req: NextRequest) => {
  const pathname = req.nextUrl.pathname;
  const searchParams = req.nextUrl.searchParams;

  // Early return for sitemap.xml
  if (pathname === "/sitemap.xml" || pathname === "/robots.txt") {
    return NextResponse.next();
  }

  // Redirect root path to /content/daily
  if (pathname === "/") {
    return NextResponse.redirect(new URL("/content/daily", req.url));
  }

  const lng = getLanguage(req);

  // Handle language path redirect
  const languageRedirect = handleLanguageRedirect(req, lng);
  if (languageRedirect) return languageRedirect;

  // Handle purpose parameter for property listings
  const purposeRedirect = handlePurposeParameter(
    pathname,
    searchParams,
    req.url
  );
  if (purposeRedirect) return purposeRedirect;

  // Handle referer cookie
  handleRefererCookie(req);

  // Handle authentication
  if (requiresAuth(pathname)) {
    return handleAuthCheck(req, pathname);
  }

  return NextResponse.next();
};

/**
 * Handles adding purpose parameter to property listings
 */
const handlePurposeParameter = (
  pathname: string,
  searchParams: URLSearchParams,
  baseUrl: string
): NextResponse | null => {
  const isPropertyPath = PROPERTY_PATHS.some((path) => pathname.includes(path));

  if (isPropertyPath && !searchParams.has(SEARCH_FILTERS.PURPOSE)) {
    const params = new URLSearchParams(searchParams);
    params.set(
      SEARCH_FILTERS.PURPOSE,
      pathname.includes(`properties/${CATEGORY.INTERNATIONAL}`)
        ? "For Sale"
        : DEFAULT_PURPOSE
    );
    const urlWithParams = `${pathname}?${params.toString()}`;

    return NextResponse.redirect(new URL(`${urlWithParams}`, baseUrl));
  }
  return null;
};

/**
 * Determines the user's preferred language
 */
const getLanguage = (req: NextRequest): string => {
  let lng: string | null | undefined;

  // Check cookie first
  if (req.cookies.has(cookieName)) {
    lng = acceptLanguage.get(req.cookies.get(cookieName)?.value);
  }

  // Fall back to Accept-Language header
  if (!lng) {
    lng = acceptLanguage.get(req.headers.get("Accept-Language"));
  }

  // Use default language as last resort
  if (!lng) {
    lng = fallbackLng;
  }

  return lng;
};

/**
 * Handles language path redirection if needed
 */
const handleLanguageRedirect = (
  req: NextRequest,
  lng: string
): NextResponse | null => {
  const shouldRedirect =
    !languages.some((loc) => req.nextUrl.pathname.startsWith(`/${loc}`)) &&
    !req.nextUrl.pathname.startsWith("/_next");

  if (shouldRedirect) {
    // Get existing search params
    const searchParams = new URLSearchParams(req.nextUrl.searchParams);

    return NextResponse.redirect(
      new URL(
        `/${lng}${req.nextUrl.pathname}${searchParams.toString() ? `?${searchParams.toString()}` : ""}`,
        req.url
      )
    );
  }

  return null;
};

/**
 * Handles referer cookie setting if needed
 */
const handleRefererCookie = (req: NextRequest): NextResponse | null => {
  // Check if referer exists
  const referer = req.headers.get("referer");
  if (!referer) {
    return null;
  }

  try {
    // Instead of creating a new response, modify the existing cookies
    const lngInReferer = languages.find((lang) => {
      try {
        const refererUrl = new URL(referer);
        return refererUrl.pathname.startsWith(`/${lang}`);
      } catch {
        return false;
      }
    });

    // Return null instead of a response, just store the cookie info
    if (lngInReferer) {
      // Store this information to be used later
      req.cookies.set(cookieName, lngInReferer);
    }
    return null; // Important: Return null to continue the middleware chain
  } catch (error) {
    console.error("Invalid referer URL:", error);
    return null; // Return null on error to continue the middleware chain
  }
};

/**
 * Handles authentication check and redirect if needed
 */
const handleAuthCheck = (req: NextRequest, pathname: string): NextResponse => {
  const token = req.cookies.get(AUTH_TOKEN_NAME)?.value;
  const isExpired = token ? isTokenExpired(token) : true;

  if (token && !isExpired) {
    const decoded: DecodedToken = jwtDecode(token);
    const { is_admin } = decoded.user;
    if (is_admin) {
      return NextResponse.redirect(
        new URL(`${configuration.ql_next_url}?restrictedAccess=true`, req.url)
      );
    } else {
      const response = NextResponse.next();
      response.cookies.set(AUTH_TOKEN_NAME, token, {
        domain: configuration.ql_domain,
      });
      return response;
    }
  }
  return NextResponse.redirect(
    new URL(`${configuration.ql_login_url}${pathname}`, req.url)
  );
};
