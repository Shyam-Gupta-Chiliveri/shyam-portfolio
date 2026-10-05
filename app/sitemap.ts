import type { MetadataRoute } from "next";
import { getSiteUrl } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  return [{ url: getSiteUrl().toString(), lastModified: new Date(), changeFrequency: "monthly", priority: 1 }];
}
