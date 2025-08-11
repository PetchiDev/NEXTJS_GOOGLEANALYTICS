"use client";

import { config } from "../../constants";

type FetchGetOptions = {
  url: RequestInfo | URL;
  fetchOptions?: RequestInit;
  authenticated?: boolean;
  token?: string | null;
  baseUrl?: string;
};

export const getClient = async <T>({
  url,
  fetchOptions,
  authenticated = false,
  token,
  baseUrl = config.apiConfig.base_url,
}: FetchGetOptions): Promise<T> => {
  try {
    const headers: HeadersInit = { ...fetchOptions?.headers };
    if (authenticated) {
      if (!token) {
        throw new Error("Authentication token not available");
      }
      Object.assign(headers, { Authorization: `Bearer ${token}` });
    }
    const response = await fetch(`${baseUrl}${url}`, {
      ...fetchOptions,
      headers,
    });
    return (await response.json()) as T;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    throw new Error(error.message || "something went wrong with get fetch");
  }
};

type FetchPostOptions = {
  url: RequestInfo | URL;
  fetchOptions?: RequestInit;
  body?: Record<string, unknown>;
  token?: string | null;
  parseJson?: boolean;
};
export const postClient = async <T>({
  url,
  fetchOptions,
  body,
  token,
  parseJson = false,
}: FetchPostOptions): Promise<T> => {
  try {
    const headers = {
      ...fetchOptions?.headers,
      Authorization: `Bearer ${token}`,
      ...(body ? { "Content-Type": "application/json" } : {}),
    };
    const response = await fetch(`${config.apiConfig.base_url}${url}`, {
      ...fetchOptions,
      method: "POST",
      headers,
      body: body ? JSON.stringify(body) : undefined,
    });

    if (!response.ok) {
      const res = await response.json();
      throw new Error(res?.message ?? "Something went wrong");
    }

    return parseJson
      ? ((await response.json()) as T)
      : (response as unknown as T);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    throw new Error(error.message || "something went wrong with post fetch");
  }
};

export const putClient = async <T>({
  url,
  fetchOptions,
  body,
  token,
}: FetchPostOptions): Promise<T> => {
  try {
    if (!token) {
      throw new Error("Authentication token not available");
    }
    const response = await fetch(`${config.apiConfig.base_url}${url}`, {
      ...fetchOptions,
      method: "PUT",
      headers: {
        ...fetchOptions?.headers,
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(body),
    });
    if (!response.ok) {
      throw new Error(`${response.status}: ${response.statusText}`);
    }
    return response as T;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    throw new Error(error.message || "something went wrong with put fetch");
  }
};

type FetchDeleteOptions = {
  url: RequestInfo | URL;
  fetchOptions?: RequestInit;
  token: string | null;
};

export const deleteClient = async <T>({
  url,
  fetchOptions,
  token,
}: FetchDeleteOptions): Promise<T> => {
  try {
    if (!token) {
      throw new Error("Authentication token not available");
    }
    const response = await fetch(`${config.apiConfig.base_url}${url}`, {
      ...fetchOptions,
      method: "DELETE",
      headers: {
        ...fetchOptions?.headers,
        Authorization: `Bearer ${token}`,
      },
    });
    if (!response.ok) {
      throw new Error(`${response.status}: ${response.statusText}`);
    }
    return response as T;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    throw new Error(
      error.message || "Something went wrong with delete request"
    );
  }
};
export const patchClient = async <T>({
  url,
  fetchOptions,
  body,
  token,
  parseJson = false,
}: FetchPostOptions): Promise<T> => {
  try {
    if (!token) {
      throw new Error("Authentication token not available");
    }
    const response = await fetch(`${config.apiConfig.base_url}${url}`, {
      ...fetchOptions,
      method: "PATCH",
      headers: {
        ...fetchOptions?.headers,
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(body),
    });
    if (!response.ok) {
      const res = await response.json();
      throw new Error(res?.message ?? "Something went wrong");
    }
    if (parseJson) {
      return (await response.json()) as T;
    } else {
      return response as unknown as T;
    }
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    throw new Error(error.message || "something went wrong with put fetch");
  }
};
