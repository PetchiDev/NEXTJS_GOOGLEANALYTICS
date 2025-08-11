import { config } from "@/constants/common-config";
import { Metadata } from "next";

export type GetMetaData = {
  title?: string;
  description?: string;
  imageUri?: string;
};

const cardObject = (payload: GetMetaData) => {
  const { title, description, imageUri } = payload;
  return {
    siteName: "Qatar Living Content",
    url: `${config.ql_url}/en/content`,
    title: title ?? `Home | Qatar Living Content`,
    description:
      description ??
      `Please change this description to something more relevant.`,
    type: "website",
    images: [
      {
        url: imageUri ?? `${config.files_url}/Facebook/Content_Facebook.jpg`,
        width: 1200,
        height: 630,
        alt: "Qatar Living Content",
      },
    ],
  };
};

export const getMetaData = (payload: GetMetaData): Metadata => {
  const { title, description } = payload;
  return {
    title: title ?? `Home | Qatar Living Content`,
    description:
      description ??
      `Please change this description to something more relevant.`,
    robots: "index,follow",
    openGraph: cardObject(payload),
    twitter: cardObject(payload),
    authors: [{ name: "Qatar Living" }],
    publisher: "Qatar Living",
  };
};

export const trimDescription = (
  title: string,
  maxCharacters: number
): string => {
  let trimmedTitle = title.substring(0, maxCharacters);
  trimmedTitle = trimmedTitle.substring(
    0,
    Math.min(trimmedTitle.length, trimmedTitle.lastIndexOf(" "))
  );
  return trimmedTitle;
};
