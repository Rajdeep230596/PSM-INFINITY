"use client";

import { useEffect } from "react";

import { HOME_VIDEO } from "@/lib/home-scroll";
import { isConstrainedNetwork } from "@/lib/media-capability";

export function HomePreload() {
  useEffect(() => {
    if (isConstrainedNetwork()) return;
    if (document.querySelector(`link[data-home-video-preload="${HOME_VIDEO.landing}"]`)) return;
    const link = document.createElement("link");
    link.rel = "preload";
    link.as = "video";
    link.href = HOME_VIDEO.landing;
    link.setAttribute("data-home-video-preload", HOME_VIDEO.landing);
    document.head.append(link);
  }, []);

  return <link rel="preload" href={HOME_VIDEO.landingPoster} as="image" />;
}
