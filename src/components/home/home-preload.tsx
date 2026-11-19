"use client";

import { siteImageSrc } from "@/components/media/site-image";
import { HOME_VIDEO } from "@/lib/home-scroll";
import { SKYDECK_VIDEO_POSTER } from "@/lib/second-ascent-video";

export function HomePreload() {
  const poster = siteImageSrc(HOME_VIDEO.landingPoster);
  const skydeckPoster = siteImageSrc(SKYDECK_VIDEO_POSTER);
  return (
    <>
      {poster ? <link rel="preload" href={poster} as="image" type="image/webp" fetchPriority="high" /> : null}
      {skydeckPoster ? <link rel="preload" href={skydeckPoster} as="image" type="image/webp" /> : null}
      <link rel="preload" href={HOME_VIDEO.landing} as="video" type="video/mp4" fetchPriority="high" />
    </>
  );
}
