import dayjs from "dayjs";
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";
import { ReadonlyURLSearchParams } from "next/navigation";
import {
  Location,
  InternationalLocation,
  ImageTypes,
  ImageOrderWithUri,
  ImageOrderWithoutUri,
} from "../types";
import { config } from "../constants";

interface FileWithPreview {
  id?: string | number;
  uri?: string;
  size: number;
  type: string;
  viewpoint?: string | null;
  name?: string;
}

interface IUpdateSearchParams {
  searchParams: ReadonlyURLSearchParams | URLSearchParams;
  paramVal: string | string[];
  paramName: string | string[];
  pathname: string;
  router: AppRouterInstance;
  scroll?: boolean;
}

interface IUpdateWindowSearchParamsProps {
  searchParams: ReadonlyURLSearchParams | URLSearchParams;
  paramVal: string | string[];
  paramName: string | string[];
  pathname: string;
}

interface ParseLocationDataProps {
  data: Location[] | InternationalLocation[];
}

export interface ImageOrder {
  id?: number;
  viewpoint?: string;
  sortOrder: number;
  uri?: string;
}

interface ResultObject {
  uri: string;
  size: number;
  type: string;
  label: string;
  viewpoint?: string | null;
  id?: number;
}

export const updateSearchParams = ({
  searchParams,
  paramName,
  paramVal,
  pathname,
  router,
  scroll = false,
}: IUpdateSearchParams) => {
  const params = new URLSearchParams(searchParams.toString());
  if (Array.isArray(paramVal) && Array.isArray(paramName)) {
    paramName.forEach((name, index) => {
      if (paramVal[index].length <= 0) {
        params.delete(name);
      } else {
        params.set(name, paramVal[index]);
      }
    });
  } else if (typeof paramName === "string" && typeof paramVal === "string") {
    if (paramVal.length <= 0) {
      params.delete(paramName);
    } else {
      params.set(paramName, paramVal);
    }
  }

  router.replace(pathname + "?" + params.toString(), { scroll });
};

export const updateWindowSearchParams = ({
  searchParams,
  paramName,
  paramVal,
  pathname,
}: IUpdateWindowSearchParamsProps) => {
  const params = new URLSearchParams(searchParams.toString());
  if (Array.isArray(paramVal) && Array.isArray(paramName)) {
    paramName.forEach((name, index) => {
      if (paramVal[index].length <= 0) {
        params.delete(name);
      } else {
        params.set(name, paramVal[index]);
      }
    });
  } else if (typeof paramName === "string" && typeof paramVal === "string") {
    if (paramVal.length <= 0) {
      params.delete(paramName);
    } else {
      params.set(paramName, paramVal);
    }
  }
  window.history.replaceState(null, "", pathname + "?" + params.toString());
};

export const parseLocationData = ({ data }: ParseLocationDataProps) => {
  const groupedData = (data as Location[]).reduce(
    (acc, item) => {
      const cityName = item?.city?.name;
      if (cityName) {
        if (!acc[cityName]) {
          acc[cityName] = [];
        }
        acc[cityName].push(item);
      }
      return acc;
    },
    {} as Record<string, Location[]>
  );
  const parsedData = Object.entries(groupedData).flatMap(
    ([cityName, locations]) => {
      const cityEntry = {
        id: `c=${locations[0]?.city?.id}`,
        name: cityName,
        latitude: locations[0]?.city?.latitude,
        longitude: locations[0]?.city?.longitude,
      };
      const areaEntries = locations.map((item) => ({
        id: `a=${item.id}&c=${item?.city?.id}`,
        name: `${item.name} - ${item?.city?.name}`,
        latitude: item.latitude,
        longitude: item.longitude,
      }));

      return [cityEntry, ...areaEntries];
    }
  );
  return parsedData;
};

export const parseLocationDataForInternational = ({
  data,
}: ParseLocationDataProps) => {
  return (
    (data as InternationalLocation[])
      ?.map((location) => ({
        id: `city=${location.id}&&country=${location.country.id}`, // Generate the ID in the required format
        name: `${location.name} - ${location.country.name}`, // Format without hyphen
        latitude: location.latitude,
        longitude: location.longitude,
      }))
      .filter(Boolean) ?? []
  );
};

const removeComma = (text: string) => {
  return text?.trim()?.split(",")?.join("");
};

export const commaSeparatedString = (text?: string) => {
  if (!text) {
    return;
  }
  return removeComma(text)?.replace(
    /\B(((?<=\d)(?=(\d{3})+(?!\d)))|((?<=[\u0660-\u0669])(?=([\u0660-\u0669]{3})+(?![\u0660-\u0669]))))/g, // It takes care of arabic numeric inputs as well
    ","
  );
};

export const formatNumberWithCommas = (input: string | number) => {
  return String(input).replace(/\B(?=(\d{3})+(?!\d))/g, ",");
};

export const uuid = () => {
  return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, function (c) {
    const r = (Math.random() * 16) | 0,
      v = c == "x" ? r : (r & 0x3) | 0x8;
    return v.toString(16);
  });
};

export const cleanURL = (url?: string) => {
  return url?.replace(/^https?:\/\/[^/]+\/[^/]+\//, "") ?? "";
};

export const calculateEndDate = (duration: string): string => {
  const today = dayjs();
  let endDate: dayjs.Dayjs;

  if (duration.includes("days")) {
    const days = parseInt(duration);
    endDate = today.add(days, "day");
  } else if (duration.includes("months")) {
    const months = parseInt(duration);
    endDate = today.add(months, "month");
  } else {
    return "";
  }
  return endDate.format("DD-MM-YYYY");
};

export function filterImagesWithoutId(images: ImageOrder[]): ImageOrder[] {
  return images.filter((image) => image.id === undefined);
}

export const getImagesOrder = (
  files: ImageTypes[]
): (ImageOrderWithUri | ImageOrderWithoutUri)[] => {
  return files.map((file, index) => {
    const { uri, viewpoint, id } = file;
    const sortOrder = index + 1;

    return id === undefined
      ? ({ id: undefined, viewpoint, sortOrder, uri } as ImageOrderWithUri)
      : ({ id, viewpoint, sortOrder, uri } as ImageOrderWithoutUri);
  });
};

export const settingObjectsForDb = (
  files: FileWithPreview[],
  uniqueDate: number,
  urlPaths?: Record<string, string>[],
  includeId: boolean = false
): ResultObject[] => {
  return files.map((file) => {
    // Find the matching URL path based on the file ID
    const matchingUrlPath = urlPaths?.length
      ? urlPaths?.find((urlPath) => {
          const key = Object.keys(urlPath)[0]; // Get the key (file ID)
          return key === file.id; // Compare with the file ID
        })
      : null;
    const uri = matchingUrlPath
      ? matchingUrlPath[Object.keys(matchingUrlPath)[0]]
      : file?.uri; // Get the URI if a match is found

    const obj: ResultObject = {
      uri: uri ?? "", // Assign the URI
      size: file.size,
      type: file.type,
      label: String(file.id ?? uniqueDate), // Convert to string
      viewpoint: file.viewpoint,
    };

    if (includeId) {
      obj.id = isNaN(Number(file?.id)) ? undefined : Number(file?.id);
    }

    return obj;
  });
};

interface FormatDateProps {
  dateString: string;
  showTime?: boolean;
}

export const formatDate = ({
  dateString,
  showTime = true,
}: FormatDateProps): string => {
  const date = dayjs(dateString);
  const formattedDate = date.format("DD/MM/YY");
  const formattedTime = date.format("h:mm A");
  return showTime ? `${formattedDate} - ${formattedTime}` : `${formattedDate}`;
};

export const formatDates = (date: string | number | Date, format: string): string => {
  if (dayjs(date).isValid()) {
    return dayjs(date).locale("en").format(format);
  }
  return "";
};

export const formatDateWithMonth = (dateString: string): string => {
  if (!dateString) return ""; // Handle falsy values early

  const date = new Date(dateString);
  if (isNaN(date.getTime())) return dateString; // Avoid invalid dates

  return new Intl.DateTimeFormat("en-US", {
    month: "short",
    day: "2-digit",
    year: "numeric",
  }).format(date);
};

export const toSnakeCase = (str: string) =>
  str.toLowerCase().replace(/\s+/g, "_");

interface FileWithName {
  name: string;
  [key: string]: unknown;
}

export const checkFileDuplication = (files: (FileWithName | null | undefined)[]): { hasDuplicates: boolean; duplicates: string[] } => {
  const fileNames = new Map<string, FileWithName>();
  let hasDuplicates = false;
  const duplicates: string[] = [];
  const filteredFiles = files.filter(
    (file): file is FileWithName => file !== null && file !== undefined
  );
  filteredFiles.forEach((file) => {
    if (fileNames.has(file.name)) {
      hasDuplicates = true;
      duplicates.push(file.name);
    } else {
      fileNames.set(file.name, file);
    }
  });
  return { hasDuplicates, duplicates };
};

export const BROWSER_ID_KEY = `qln_browser_id_${config.ql_env || "dev"}`;
export const SESSION_ID_KEY = `qln_session_id_${config.ql_env || "dev"}`;

type CookieOptions = {
  expiryDate?: Date | null;
  path?: string;
  domain?: string;
  secure?: boolean;
  sameSite?: "strict" | "lax" | "none";
};

// ─────────────────────────────────────────────────────────────────────────────
// Generic Cookie Management Functions
// ─────────────────────────────────────────────────────────────────────────────
/**
 * Set a cookie with the given name, value, and options
 */
export const setCookie = (
  name: string,
  value: string,
  options: CookieOptions = {}
): boolean => {
  // Guard for SSR / non-browser environments
  if (typeof document === "undefined") return false;

  try {
    const {
      expiryDate = null,
      path = "/",
      domain: explicitDomain,
      secure = true,
      sameSite = "strict",
    } = options;

    // Determine the domain to use
    let domain = explicitDomain;

    // If no domain was explicitly provided, use config.ql_domain
    if (!domain) {
      // For localhost, don't set a domain at all (allows cross-port access)
      const isLocalhost = typeof window !== "undefined" &&
        (window.location.hostname === "localhost" ||
          window.location.hostname === "127.0.0.1");

      domain = isLocalhost ? "" : (config.ql_domain || "");
    }


    let cookieString = `${name}=${encodeURIComponent(value)}; path=${path}`;

    if (expiryDate) {
      cookieString += `; expires=${expiryDate.toUTCString()}`;
    }

    if (domain) {
      cookieString += `; domain=${domain}`;
    }

    if (secure) {
      cookieString += "; secure";
    }

    cookieString += `; samesite=${sameSite}`;

    document.cookie = cookieString;
    return true;
  } catch (error) {
    console.error("Error setting cookie:", error);
    return false;
  }
};

/**
 * Get a cookie value by name
 */
export const getCookie = (name: string): string | null => {
  // Guard for SSR / non-browser environments
  if (typeof document === "undefined") return null;

  try {
    const cookies = document.cookie.split(";");
    const prefix = `${name}=`;

    for (const cookie of cookies) {
      const trimmedCookie = cookie.trim();
      if (trimmedCookie.startsWith(prefix)) {
        return decodeURIComponent(trimmedCookie.substring(prefix.length));
      }
    }
    return null;
  } catch (error) {
    console.error("Error getting cookie:", error);
    return null;
  }
};

/**
 * Remove a cookie by setting its expiry to the past
 */
export const removeCookie = (
  name: string,
  options: Omit<CookieOptions, "expiryDate"> = {}
): boolean => {
  const pastDate = new Date(0);
  return setCookie(name, "", { ...options, expiryDate: pastDate });
};

// ─────────────────────────────────────────────────────────────────────────────
// Specific ID Management Functions
// ─────────────────────────────────────────────────────────────────────────────
/**
 * Get or create a browser ID that persists across sessions
 * - Stored in cookies to be shared across subdomains
 * - Long-lived (1 year)
 */
export const getBrowserId = (): string => {
  // Guard for SSR / non-browser environments
  if (typeof window === "undefined") return "";

  // Try to get browser ID from cookie
  let browserId = getCookie(BROWSER_ID_KEY);

  // If not found, create a new one
  if (!browserId) {
    browserId = uuid();

    // Set a long-lived cookie (1 year)
    const expiryDate = new Date();
    expiryDate.setFullYear(expiryDate.getFullYear() + 1);

    setCookie(BROWSER_ID_KEY, browserId, { expiryDate });
  }

  return browserId;
};

/**
 * Get or create a session ID
 * - Stored in sessionStorage for tab persistence
 * - Also stored in cookies to be shared across subdomains
 * - Short-lived (10 minutes) but auto-renewed on each call
 */
export const getSessionId = (): string => {
  // Guard for SSR / non-browser environments
  if (typeof window === "undefined") return "";

  try {
    // Try cookie first (for cross-subdomain sharing)
    let sessionId = getCookie(SESSION_ID_KEY);

    // If not in cookie, check sessionStorage (for tab persistence)
    if (!sessionId) {
      sessionId = sessionStorage.getItem(SESSION_ID_KEY);

      // If found in sessionStorage but not cookie, set the cookie
      if (sessionId) {
        const expiryDate = new Date(Date.now() + 10 * 60 * 1000); // 10 minutes
        setCookie(SESSION_ID_KEY, sessionId, { expiryDate });
      }
    }

    // If not found anywhere, create new
    if (!sessionId) {
      sessionId = uuid();

      // Store in both sessionStorage and cookie
      try {
        sessionStorage.setItem(SESSION_ID_KEY, sessionId);
      } catch (err) {
        console.error("Failed to write to sessionStorage:", err);
        // Continue anyway, as cookie will still work
      }

      const expiryDate = new Date(Date.now() + 10 * 60 * 1000); // 10 minutes
      setCookie(SESSION_ID_KEY, sessionId, { expiryDate });
    } else {
      // Renew the cookie's expiry with each call
      const expiryDate = new Date(Date.now() + 10 * 60 * 1000); // 10 minutes
      setCookie(SESSION_ID_KEY, sessionId, { expiryDate });
    }

    return sessionId;
  } catch (error) {
    console.error("Error in getSessionId:", error);

    // Fallback to generating a new ID in case of errors
    return uuid();
  }
};
