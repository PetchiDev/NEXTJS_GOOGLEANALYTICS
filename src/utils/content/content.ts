import axios from 'axios';
import { env } from 'next-runtime-env';
import { queueMapping } from "./queueMapping";

// const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;
const BASE_URL = env('NEXT_PUBLIC_API_BASE_URL');
 
interface GetAllNewsLivingParams {
  categoryId?: number | string;
  subCategoryId?: number | string;
}

interface GetWatchOnQatarNewsLivingParams {
  categoryId?: number;
  subCategoryId?: number;
}

 
const api = axios.create({
  baseURL: BASE_URL,
  headers: { 'Content-Type': 'application/json' },
});
 
export const getAllDailyLiving = async () => {
  try {
    const response = await api.get('/api/v2/dailyliving/landing');
    return response.data || {};
  } catch (err) {
    console.error(' Error in getAllDailyLiving:', err);
    return {};
  }
};
export const getWatchOnQatarLiving = async () => {
  try {
    const response = await api.get('/api/content/qln_contents_daily/landing');
    return response.data || {};
  } catch (err) {
    console.error(' Error in getWatchOnQatarLiving:', err);
    return {};
  }
};

export const getNewsWatchOnQatarLiving = async ({
  categoryId,
  subCategoryId,
}: GetWatchOnQatarNewsLivingParams = {}) => {
  
  try {
    if (categoryId == null || subCategoryId == null) {
      throw new Error("Both categoryId and subCategoryId are required");
    }

    const queue = queueMapping[categoryId]?.[subCategoryId];
    if (!queue) {
      console.error("Queue not found in mapping:", { categoryId, subCategoryId });
      throw new Error(`Queue not found`);
    }

    const response = await api.get(`/api/content/${queue}/landing`);
    return response.data || {};
  } catch (err) {
    console.error("Error in getNewsWatchOnQatarLiving:", err);
    return {};
  }
};

export const getAllNewsLiving = async ({
  categoryId,
  subCategoryId,
}: GetAllNewsLivingParams = {}) => {
  try {
    const params = new URLSearchParams();
    if (categoryId) params.append('categoryId', String(categoryId));
    if (subCategoryId) params.append('subCategoryId', String(subCategoryId));
 
    const response = await api.get(`/api/v2/news/landing?${params.toString()}`);
    return response.data || {};
  } catch (err) {
    console.error(' Error in getAllNewsLiving:', err);
    return {};
  }
};
 
export const getAllEventCategoris = async () => {
  try {
    const response = await api.get('/api/v2/event/getallcategories');
    return response.data || {};
  } catch (err) {
    console.error(' Error in getAllEventCategoris:', err);
    return {};
  }
};
 
export const getAllNewsCategoris = async () => {
  try {
    const response = await api.get('/api/v2/news/allcategories');
    return response.data || {};
  } catch (err) {
    console.error(' Error in getAllNewsCategoris:', err);
    return {};
  }
};
 
export const getAllCategoriesLocations = async (
  setLocationData: (data: any) => void
): Promise<any> => {
  try {
    const response = await api.get('/api/v2/location/getAllCategoriesLocations');
    const data = response.data || {};
    setLocationData(data?.locations);
    return data;
  } catch (err) {
    console.error(' Error in getAllCategoriesLocations:', err);
    setLocationData([]); 
    return {};
  }
};
 
 
export const getallcategories = async (
  setData: (data: any) => void
): Promise<any> => {
  try {
    const response = await api.get("/api/v2/event/getallcategories");
    const data = response.data || {};
    setData(data);
    return data;
  } catch (err: any) {
    console.error("Error in getallcategories:", {
      status: err?.response?.status,
      statusText: err?.response?.statusText,
      data: err?.response?.data,
      url: err?.config?.url,
      method: err?.config?.method,
    });
    setData([]);
    return {};
  }
};

 
 
export const getPostDetails = async (slug: string) => {
  try {
    const response = await api.get(`/api/v2/news/getbyslug/${encodeURIComponent(slug)}`);
    return response.data || {};
  } catch (err: any) {
    console.error(' Error in getPostDetails:', err?.response?.status, err?.message);
    return null;
  }
};
export const getCommunityDetails = async (slug: string) => {
  try {
    const response = await api.get(`/api/v2/community/getBySlug/${encodeURIComponent(slug)}`);
    return response.data || {};
  } catch (err: any) {
    console.error(' Error in getPostDetails:', err?.response?.status, err?.message);
    return null;
  }
};
 
export const getEventDetails = async (slug: string) => {
  try {
    const response = await api.get(`/api/v2/fo/event/slug/${encodeURIComponent(slug)}`);
    return response.data || {};
  } catch (err: any) {
    console.error(' Error in getEventDetails:', err?.response?.status, err?.message);
    return null;
  }
};
 
export const getAllBanner = async (verticalId: number) => {
  try {
    const response = await api.get('/api/v2/banner/getbyverticalandstatus', {
      params: {
        verticalId,
        status: true,
      },
    });
    return response.data || {};
  } catch (err) {
    console.error(' Error in getAllBanner:', err);
    return {};
  }
};
 