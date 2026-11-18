"use client";

export function isCompactViewport() {
  return window.matchMedia("(max-width: 700px)").matches;
}

export function isCoarsePointer() {
  return window.matchMedia("(pointer: coarse)").matches;
}

export function prefersReducedMotion() {
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

/** True on Save-Data or slow cellular — skip extra media work. Phones still prefetch the next reel. */
export function isConstrainedNetwork() {
  const connection = (navigator as Navigator & { connection?: { saveData?: boolean; effectiveType?: string } })
    .connection;
  if (!connection) return false;
  if (connection.saveData) return true;
  return connection.effectiveType === "slow-2g" || connection.effectiveType === "2g";
}

export function shouldLoopScrollVideo() {
  return prefersReducedMotion();
}

/** iPhone, iPod, and iPad (including iPadOS desktop UA). */
export function isIosDevice() {
  const ua = navigator.userAgent || "";
  if (/iPhone|iPod/i.test(ua)) return true;
  if (/iPad/i.test(ua)) return true;
  return navigator.platform === "MacIntel" && navigator.maxTouchPoints > 1;
}

/** Phones and tablets — fewer compositor effects and seeks. Same 1080p files. */
export function isMotionLite() {
  return isCompactViewport() || isCoarsePointer() || isIosDevice();
}

export function armInlineVideo(video: HTMLVideoElement) {
  video.muted = true;
  video.defaultMuted = true;
  video.playsInline = true;
  video.disablePictureInPicture = true;
  video.setAttribute("playsinline", "true");
  video.setAttribute("webkit-playsinline", "true");
  video.setAttribute("muted", "");
  video.setAttribute("x-webkit-airplay", "deny");
  const remote = video as HTMLVideoElement & { disableRemotePlayback?: boolean };
  if (typeof remote.disableRemotePlayback === "boolean") remote.disableRemotePlayback = true;
}

const FILM_SOURCE_W = 1920;
const FILM_SOURCE_H = 1080;

/**
 * Safari paints <video> in CSS points. On 3x iPhone that looks soft unless the
 * element is laid out in device pixels and scaled back down.
 */
export function armFilmSharpness(video: HTMLVideoElement) {
  const frame = video.closest(".home-film-frame") as HTMLElement | null;
  if (!frame) return () => {};

  const apply = () => {
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const w = Math.max(1, frame.clientWidth);
    const h = Math.max(1, frame.clientHeight);
    const scale = Math.max(1, Math.min(dpr, FILM_SOURCE_W / w, FILM_SOURCE_H / h));
    frame.style.setProperty("--film-dpr", String(Number(scale.toFixed(3))));
  };

  apply();
  const ro = typeof ResizeObserver !== "undefined" ? new ResizeObserver(apply) : null;
  ro?.observe(frame);
  window.addEventListener("orientationchange", apply);
  return () => {
    ro?.disconnect();
    window.removeEventListener("orientationchange", apply);
  };
}
