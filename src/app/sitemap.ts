import type { MetadataRoute } from "next";

import { SKYDECK_SPACES } from "@/content/skydeck";
import { site } from "@/content/site";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    "",
    "/ground-zero",
    "/ground-zero/couture",
    "/ground-zero/real-estate",
    "/ground-zero/landscaping",
    "/ground-zero/gardens",
    "/ground-zero/collectibles",
    "/first-ascent",
    "/first-ascent/itineraries",
    "/first-ascent/yachts",
    "/first-ascent/villas",
    "/first-ascent/chauffeur",
    "/second-ascent",
    "/second-ascent/private-events",
    "/second-ascent/corporate-events",
    "/skydeck",
    ...SKYDECK_SPACES.map((space) => `/skydeck/${space.slug}`),
    "/services",
    "/locations",
    "/our-story",
    "/partner",
  ].map((path) => ({
    url: `${site.url}${path}`,
    changeFrequency: "monthly",
    priority: path === "" ? 1 : 0.7,
  }));
}
