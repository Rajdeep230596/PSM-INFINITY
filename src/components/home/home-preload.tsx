"use client";

import { HOME_VIDEO } from "@/lib/home-scroll";

export function HomePreload() {
  return <link rel="preload" href={HOME_VIDEO.landingPoster} as="image" />;
}
