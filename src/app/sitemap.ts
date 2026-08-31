import type { MetadataRoute } from "next";
import { siteUrl } from "@/content/site-content";

export default function sitemap(): MetadataRoute.Sitemap {
  const routes = ["", "/about", "/services", "/testimonials", "/careers", "/contact"];

  return routes.map((route) => ({
    url: `${siteUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: "monthly",
    priority: route === "" ? 1 : 0.8,
  }));
}
