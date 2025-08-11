// NOTE: please avoid any server based API calls

// "use server";

// import { banners, IBannersRes } from "@/config";
// import { IBannerKey, BannerImage } from "@/types";
// import { config } from "../../constants";
// import { getTokenAndCheckExpiry } from "../../utils";

// type FetchGetOptions = {
//   url: RequestInfo | URL;
//   fetchOptions?: RequestInit;
//   authenticated?: boolean;
// };

// export type FetchResult<T> = {
//   result: Response extends { ok: true } ? T : undefined;
//   error: Error | undefined;
//   isCompleted: boolean;
// };

// export const getServer = async <T>({
//   url,
//   fetchOptions,
//   authenticated = false,
// }: FetchGetOptions): Promise<T> => {
//   try {
//     const headers: HeadersInit = { ...fetchOptions?.headers };

//     if (authenticated) {
//       const token = await getTokenAndCheckExpiry();
//       if (!token) {
//         throw new Error("Authentication token not available");
//       }
//       Object.assign(headers, { Authorization: `Bearer ${token}` });
//     }
//     const response = await fetch(`${config.apiConfig.base_url}${url}`, {
//       ...fetchOptions,
//       headers,
//     });

//     if (!response.ok) {
//       throw new Error(`HTTP error ${response.status}: ${response.statusText}`);
//     }
//     return (await response.json()) as T;
//   } catch (error: any) {
//     throw new Error(error.message || "something went wrong with get fetch");
//   }
// };

// type FetchPostOptions = {
//   url: RequestInfo | URL;
//   fetchOptions?: RequestInit;
//   body?: Record<string, any>;
// };

// export const postServer = async <T>({
//   url,
//   fetchOptions,
//   body,
// }: FetchPostOptions): Promise<T> => {
//   try {
//     const token = await getTokenAndCheckExpiry();
//     if (!token) {
//       throw new Error("Authentication token not available");
//     }
//     const response = await fetch(`${config.apiConfig.base_url}${url}`, {
//       ...fetchOptions,
//       method: "POST",
//       headers: {
//         ...fetchOptions?.headers,
//         Authorization: `Bearer ${token}`,
//       },
//       body: JSON.stringify(body),
//     });
//     if (!response.ok) {
//       throw new Error(`${response.status}: ${response.statusText}`);
//     }
//     return response as T;
//   } catch (error: any) {
//     throw new Error(error.message || "something went wrong with post fetch");
//   }
// };

// export const putServer = async <T>({
//   url,
//   fetchOptions,
//   body,
// }: FetchPostOptions): Promise<T> => {
//   try {
//     const token = await getTokenAndCheckExpiry();
//     if (!token) {
//       throw new Error("Authentication token not available");
//     }

//     const response = await fetch(`${config.apiConfig.base_url}${url}`, {
//       ...fetchOptions,
//       method: "PUT",
//       headers: {
//         ...fetchOptions?.headers,
//         Authorization: `Bearer ${token}`,
//       },
//       body: JSON.stringify(body),
//     });
//     if (!response.ok) {
//       throw new Error(`${response.status}: ${response.statusText}`);
//     }
//     return response as T;
//   } catch (error: any) {
//     throw new Error(error.message || "something went wrong with put fetch");
//   }
// };

// type FetchDeleteOptions = {
//   url: RequestInfo | URL;
//   fetchOptions?: RequestInit;
// };

// export const deleteServer = async <T>({
//   url,
//   fetchOptions,
// }: FetchDeleteOptions): Promise<T> => {
//   try {
//     const token = await getTokenAndCheckExpiry();
//     if (!token) {
//       throw new Error("Authentication token not available");
//     }

//     const response = await fetch(`${config.apiConfig.base_url}${url}`, {
//       ...fetchOptions,
//       method: "DELETE",
//       headers: {
//         ...fetchOptions?.headers,
//         Authorization: `Bearer ${token}`,
//       },
//     });
//     if (!response.ok) {
//       throw new Error(`${response.status}: ${response.statusText}`);
//     }
//     return response as T;
//   } catch (error: any) {
//     throw new Error(
//       error.message || "Something went wrong with delete request"
//     );
//   }
// };

// export async function getBanners() {
//   const response = await fetch(
//     `${config.images_cdn_url_common}banners/${config.ql_env}/Properties_banners.json`,
//     {
//       next: {
//         revalidate: 30, // Revalidate every 30 seconds
//       },
//     }
//   );

//   if (!response.ok) {
//     return banners;
//   }

//   const bannersData = (await response.json()) as IBannersRes;
//   // We have to assign default with empty images to avoid any crash
//   if (typeof bannersData === "object") {
//     Object.keys(banners)
//       .map((key) => key as IBannerKey)
//       .forEach((key) => {
//         if (!bannersData[key] && banners[key]) {
//           bannersData[key] = banners[key];
//         }
//       });
//   }
//   (Object.keys(bannersData) as IBannerKey[]).forEach((key) => {
//     const bannerData = banners[key];
//     if (bannerData) {
//       bannersData[key] = {
//         ...bannerData,
//         ...(bannersData[key] || {}),
//         images: (bannersData[key]?.images || [])
//           .map((image) => {
//             return {
//               title: bannerData.text,
//               ...image,
//             } as BannerImage;
//           })
//           .sort((a, b) => {
//             // Sort by sortOrder if it exists
//             if (a.sortOrder !== undefined && b.sortOrder !== undefined) {
//               return a.sortOrder - b.sortOrder;
//             }
//             // If sortOrder is missing on either item, put items with sortOrder first
//             if (a.sortOrder !== undefined) return -1;
//             if (b.sortOrder !== undefined) return 1;
//             // If neither has sortOrder, maintain original order
//             return 0;
//           }),
//       };
//     }
//   });
//   return bannersData;
// }
