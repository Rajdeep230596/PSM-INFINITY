import type { MetadataRoute } from "next";

import { site } from "@/content/site";

export default function sitemap(): MetadataRoute.Sitemap {
  return ["", "/first-ascent", "/first-ascent/itineraries", "/first-ascent/yachts", "/first-ascent/villas", "/first-ascent/chauffeur", "/second-ascent", "/services", "/locations", "/our-story", "/partner"].map((path) => ({
    url: `${site.url}${path}`,
    changeFrequency: "monthly",
    priority: path === "" ? 1 : 0.7,
  }));
}
