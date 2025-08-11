
import { env } from "next-runtime-env";

export interface CreatePostPayload {
  title: string;
  category: string;
  categoryId: string;
  description: string;
  imageBase64: string;
  isActive: boolean;
  dateCreated: string;
}

export const getCookie = (name: string): string | null => {
  if (typeof document === "undefined") return null;

  const value = document.cookie
    .split("; ")
    .find((row) => row.startsWith(`${name}=`))
    ?.split("=")[1];

  return value ? decodeURIComponent(value) : null;
};

const BASE_URL = env('NEXT_PUBLIC_API_BASE_URL');

export const createCommunityPost = async (payload: CreatePostPayload) => {
  try {
    const token = getCookie("qat");
    const response = await fetch(
      `${BASE_URL}/api/v2/community/createPost`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          ...(token ? { Authorization: `Bearer ${token}` } : {}), 
        },
        body: JSON.stringify(payload),
      }
    );

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(errorText || "Failed to create community post");
    }

    return await response.json();
  } catch (error) {
    console.error(" Error creating community post:", error);
    throw error;
  }
};

export const getAllForumCategories = async () => {
  try {
    const response = await fetch(
      `${BASE_URL}/api/v2/community/getAllForumCategories`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
        next: { revalidate: 0 },
      }
    );

    if (!response.ok) throw new Error("Failed to fetch categories");

    const result = await response.json();
    return result.forumCategories || [];
  } catch (err) {
    console.error("Error fetching forum categories", err);
    return [];
  }
};
