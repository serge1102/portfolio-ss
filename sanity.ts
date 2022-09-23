import { createClient } from "next-sanity";
import createImageUrlBuilder from "@sanity/image-url";

export const config = {
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || "production",
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!,
  apiVersion: "2021-03-25",
  useCdn: process.env.NODE_ENV === "production", // 本番環境では CDN を使用
};

// Set up the client for fetching data in the getProps page functions
export const sanityClient = createClient(config);

// Sanityから画像を取得するためヘルパー関数
export const urlFor = (source: any) =>
  createImageUrlBuilder(config).image(source);
