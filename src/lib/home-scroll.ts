import { LEVEL_TWO_VIDEO_DURATION, SKYDECK_VIDEO_DURATION } from "@/lib/second-ascent-video";

/** Shared homepage scrollytelling. Video time tracks the scroll position directly. */
export const HOME_SCROLL_SCRUB = true;
export const HOME_VIDEO_SMOOTHING = 1;
/** Extra viewport-heights of scroll per second of mapped video. */
export const HOME_EXTRA_VH_PER_SECOND = 20;

export const HOME_CHAPTER_VIDEO_SECONDS = {
  landing: 10,
  groundZero: 12.634,
  firstAscent: 10,
  events: LEVEL_TWO_VIDEO_DURATION,
  skydeck: SKYDECK_VIDEO_DURATION,
} as const;

export function homeChapterStyle(videoSeconds: number) {
  const extra = Math.max(8, videoSeconds) * HOME_EXTRA_VH_PER_SECOND;
  return { height: `calc(100vh + ${extra}vh)` };
}

export const HOME_VIDEO = {
  landing: "/media/backdrop.mp4?v=22",
  landingPoster: "/media/backdrop-poster.jpg",
  groundZero: "/videos/ground-zero-arrival.mp4?v=11",
  skyTerrace: "/videos/sky-terrace-arrival.mp4?v=7",
} as const;
