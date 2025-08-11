
import axios from 'axios';
import { env } from 'next-runtime-env';

// const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;
const BASE_URL = env('NEXT_PUBLIC_API_BASE_URL');

const api = axios.create({
  baseURL: BASE_URL,
  timeout: 10000,
  headers: { 'Content-Type': 'application/json' },
});

export interface EventFilterParams {
  page?: number;
  perPage?: number;
  status?: number;
  search?: string;
  categoryId?: number;
  sortOrder?: string;
  priceSortOrder?: string;
  fromDate?: string;
  toDate?: string;
  filterType?: string;
  locationId?: number[];
  freeOnly?: boolean;
  featuredFirst?: boolean;
}

export interface EventItem {
  id: number;
  title: string;
  eventTitle: string;
  date: string;
  categoryName: string;
    categoryId: number; 
  locationId: number;
  eventDescription: string;
  location: string;
  description?: string;
  imageUrl?: string;
  category?: string;
  price?: number | null;
  isFeatured?: boolean;
  status?: number;
  slug?: string;
  venue?: string;
  startDate?: string;
  endDate?: string;
  latitude?: string;
  longitude?: string;
  redirectionLink?: string;
  publishedDate: string;
  coverImage: string;
  eventType: number;
  eventSchedule: {
    startDate: string;
    endDate: string;
    timeSlotType: number;
    generalTextTime: string | null;
    timeSlots: Array<{
      id: number;
      name: string | null;
    }>;
  };
}

export interface EventDataResponse {
  items: EventItem[];
  totalCount: number;
}

export const getAllEventData = async (
  filters: EventFilterParams = {}
): Promise<EventDataResponse> => {
  try {
    const payload: Partial<EventFilterParams> = {};

    if (filters.page !== undefined) payload.page = filters.page;
    if (filters.perPage !== undefined) payload.perPage = filters.perPage;
    if (filters.status !== undefined) payload.status = filters.status;
    if (filters.search) payload.search = filters.search;
    if (filters.categoryId) payload.categoryId = filters.categoryId;
    if (filters.sortOrder) payload.sortOrder = filters.sortOrder;
    if (filters.fromDate) payload.fromDate = filters.fromDate;
    if (filters.toDate) payload.toDate = filters.toDate;
    if (filters.priceSortOrder) payload.priceSortOrder = filters.priceSortOrder;
    if (filters.filterType) payload.filterType = filters.filterType;
    if (filters.locationId?.length && !filters.locationId.includes(0)) payload.locationId = filters.locationId;
    if (filters.freeOnly !== undefined) payload.freeOnly = filters.freeOnly;

    const response = await api.post('/api/v2/event/getpaginatedevents', payload);
    return response.data || { items: [], totalCount: 0 };
  } catch (err) {
    console.error(' Error in getAllEventData:', err);
    return { items: [], totalCount: 0 };
  }
};
