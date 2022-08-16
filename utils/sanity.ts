import { createClient } from "next-sanity";
import imageUrlBuilder from "@sanity/image-url";

export const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || "production",
  apiVersion: "2021-03-25",
  useCdn: true,
  token: process.env.SANITY_TOKEN_KEY,
});

const builder = imageUrlBuilder(client);

export const urlFor = (source: any) => builder.image(source);
