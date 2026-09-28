"use client";

import { siteImageSrc } from "@/components/media/site-image";
import { HOME_VIDEO } from "@/lib/home-scroll";

export function HomePreload() {
  const poster = siteImageSrc(HOME_VIDEO.landingPoster);
  if (!poster) return null;
  return <link rel="preload" href={poster} as="image" type="image/webp" fetchPriority="high" />;
}
