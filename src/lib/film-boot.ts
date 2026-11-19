"use client";

import { siteImageSrc } from "@/components/media/site-image";
import { completeBootAsset, completeBootProgress, reportBootBytes, resetBootProgress } from "@/lib/boot-progress";
import { getPrefetchVideo, prefetchVideo } from "@/lib/deferred-video";
import { HOME_VIDEO } from "@/lib/home-scroll";
import { armInlineVideo, isIosDevice } from "@/lib/media-capability";
import { LEVEL_TWO_VIDEO_SRC, SKYDECK_VIDEO_POSTER, SKYDECK_VIDEO_SRC } from "@/lib/second-ascent-video";

export const HOME_FILM_SRC = [
  HOME_VIDEO.landing,
  HOME_VIDEO.groundZero,
  HOME_VIDEO.skyTerrace,
  LEVEL_TWO_VIDEO_SRC,
  SKYDECK_VIDEO_SRC,
] as const;

const HOME_STILLS = [
  siteImageSrc("/brand/psm-infinity-logo.png"),
  siteImageSrc(HOME_VIDEO.landingPoster),
  siteImageSrc(SKYDECK_VIDEO_POSTER),
].filter(Boolean) as string[];

/** Exact public file sizes so the first-load percent has a real denominator. */
const FILM_BYTES: Record<string, number> = {
  [HOME_VIDEO.landing]: 20937722,
  [HOME_VIDEO.groundZero]: 12105447,
  [HOME_VIDEO.skyTerrace]: 4852810,
  [LEVEL_TWO_VIDEO_SRC]: 14715814,
  [SKYDECK_VIDEO_SRC]: 12930013,
};

const STILL_BYTES = 120_000;
const SHELL_ID = "boot-shell";

let bootVideo: HTMLVideoElement | null = null;
const bootWaiters: Array<(video: HTMLVideoElement) => void> = [];
let bootPriming = false;

export function isBootPriming() {
  return bootPriming;
}

export function registerBootVideo(video: HTMLVideoElement) {
  bootVideo = video;
  for (const waiter of bootWaiters.splice(0)) waiter(video);
}

export function beginHomeMediaProgress() {
  resetBootProgress([
    { id: SHELL_ID, bytes: 200_000 },
    ...HOME_STILLS.map((src) => ({ id: src, bytes: STILL_BYTES })),
    ...HOME_FILM_SRC.map((src) => ({ id: src, bytes: FILM_BYTES[src] ?? 8_000_000 })),
  ]);
}

export function markBootShellReady() {
  completeBootAsset(SHELL_ID);
}

function whenBootVideo(ms = 4000) {
  if (bootVideo) return Promise.resolve(bootVideo);
  return new Promise<HTMLVideoElement | null>((resolve) => {
    const timer = window.setTimeout(() => resolve(bootVideo), ms);
    bootWaiters.push((video) => {
      window.clearTimeout(timer);
      resolve(video);
    });
  });
}

function decodeStill(href: string) {
  return new Promise<void>((resolve) => {
    const image = new Image();
    image.onload = () => {
      completeBootAsset(href);
      resolve();
    };
    image.onerror = () => {
      completeBootAsset(href);
      resolve();
    };
    image.src = href;
  });
}

function bufferedSeconds(video: HTMLVideoElement) {
  if (!video.buffered.length) return 0;
  return video.buffered.end(video.buffered.length - 1);
}

function bufferedRatio(video: HTMLVideoElement) {
  const duration = video.duration || 0;
  if (!(duration > 0)) return 0;
  return bufferedSeconds(video) / duration;
}

function filmIsReadyEnough(video: HTMLVideoElement) {
  if (video.readyState >= 4 && bufferedRatio(video) >= 0.5) return true;
  return bufferedRatio(video) >= 0.86;
}

function kickLoad(video: HTMLVideoElement) {
  armInlineVideo(video);
  video.preload = "auto";
  const play = video.play();
  if (play && typeof play.then === "function") play.catch(() => {});
}

function bindVideoProgress(src: string, video: HTMLVideoElement) {
  const expected = FILM_BYTES[src] ?? 8_000_000;
  const report = () => {
    const ratio = bufferedRatio(video);
    if (ratio > 0) reportBootBytes(src, ratio * expected, expected);
  };
  video.addEventListener("progress", report);
  video.addEventListener("loadeddata", report);
  video.addEventListener("canplay", report);
  video.addEventListener("canplaythrough", report);
  report();
  return () => {
    video.removeEventListener("progress", report);
    video.removeEventListener("loadeddata", report);
    video.removeEventListener("canplay", report);
    video.removeEventListener("canplaythrough", report);
  };
}

function waitForFilm(video: HTMLVideoElement, timeoutMs: number, isReady: (video: HTMLVideoElement) => boolean) {
  return new Promise<void>((resolve) => {
    let done = false;
    let timer = 0;
    const finish = () => {
      if (done) return;
      done = true;
      window.clearTimeout(timer);
      video.removeEventListener("loadeddata", check);
      video.removeEventListener("progress", check);
      video.removeEventListener("canplay", check);
      video.removeEventListener("canplaythrough", check);
      resolve();
    };
    const check = () => {
      if (isReady(video)) finish();
    };
    video.addEventListener("loadeddata", check);
    video.addEventListener("progress", check);
    video.addEventListener("canplay", check);
    video.addEventListener("canplaythrough", check);
    timer = window.setTimeout(finish, timeoutMs);
    check();
  });
}

/** Play until the reel has enough frames for scrub, then freeze on frame 0. */
export async function primeVideoElement(video: HTMLVideoElement, timeoutMs = 16000) {
  bootPriming = true;
  const unbind = bindVideoProgress(HOME_VIDEO.landing, video);
  try {
    if (!video.getAttribute("src") && !video.currentSrc) {
      video.src = HOME_VIDEO.landing;
    }
    kickLoad(video);
    await waitForFilm(video, timeoutMs, filmIsReadyEnough);
    video.pause();
    try {
      video.currentTime = 0;
    } catch {
      // iOS can reject a seek until metadata lands.
    }
    if (video.readyState >= 2) video.classList.add("is-ready");
    completeBootAsset(HOME_VIDEO.landing);
  } finally {
    unbind();
    bootPriming = false;
  }
}

async function warmUrl(src: string, timeoutMs: number) {
  prefetchVideo(src, { force: true });
  const video = getPrefetchVideo(src);
  if (!video) {
    completeBootAsset(src);
    return;
  }
  const unbind = bindVideoProgress(src, video);
  try {
    video.src = src;
    video.load();
    kickLoad(video);
    await waitForFilm(video, timeoutMs, (item) => item.readyState >= 2 && (filmIsReadyEnough(item) || bufferedRatio(item) >= 0.7));
    video.pause();
    completeBootAsset(src);
  } finally {
    unbind();
  }
}

let restWarmPromise: Promise<void> | null = null;

export function warmRemainingHomeFilms() {
  if (restWarmPromise) return restWarmPromise;
  const rest = HOME_FILM_SRC.filter((src) => src !== HOME_VIDEO.landing);
  const perFile = isIosDevice() ? 12000 : 9000;
  restWarmPromise = (async () => {
    for (const src of rest) await warmUrl(src, perFile);
  })();
  return restWarmPromise;
}

export async function primeHomeMedia() {
  restWarmPromise = null;
  await Promise.all(HOME_STILLS.map(decodeStill));
  const video = await whenBootVideo();
  const timeout = isIosDevice() ? 16000 : 12000;
  if (video) {
    await primeVideoElement(video, timeout);
  } else {
    await warmUrl(HOME_VIDEO.landing, timeout);
  }
  await warmRemainingHomeFilms();
  completeBootProgress();
}
