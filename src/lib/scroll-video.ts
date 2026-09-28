"use client";

import { gsap } from "gsap";

type ScrollVideoOptions = {
  getProgress: () => number;
  mapProgress?: (progress: number) => number;
  enabled?: boolean;
  /** 0–1. Lower is silkier; higher tracks the scroll more tightly. */
  smoothing?: number;
  /** Match the source frame rate so we do not seek faster than the video can show. */
  frameRate?: number;
  preload?: HTMLVideoElement["preload"];
};

export function attachScrollVideo(
  video: HTMLVideoElement,
  options: ScrollVideoOptions,
): () => void {
  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  video.muted = true;
  video.defaultMuted = true;
  video.playsInline = true;
  video.loop = false;
  video.preload = options.preload ?? "auto";
  video.disablePictureInPicture = true;
  video.setAttribute("playsinline", "");
  video.setAttribute("webkit-playsinline", "");
  video.setAttribute("muted", "");

  if (reduceMotion || options.enabled === false) {
    video.pause();
    return () => {};
  }

  const smoothing = options.smoothing ?? 0.16;
  const minStep = 1 / (options.frameRate ?? 30);
  let duration = 0;
  let displayed = 0;
  let lastSeekAt = 0;
  let unlocked = false;

  const endTime = () => Math.max(0, duration - minStep);

  const targetFromProgress = () => {
    const raw = Math.min(1, Math.max(0, options.getProgress()));
    const progress = options.mapProgress ? options.mapProgress(raw) : raw;
    if (duration <= 0) return 0;
    return progress >= 0.995 ? endTime() : progress * endTime();
  };

  const applyTime = (time: number) => {
    if (duration <= 0) return;
    const next = Math.min(endTime(), Math.max(0, time));
    if (Math.abs(video.currentTime - next) < minStep) return;
    lastSeekAt = performance.now();
    try {
      if (typeof video.fastSeek === "function") video.fastSeek(next);
      else video.currentTime = next;
    } catch {
      try {
        video.currentTime = next;
      } catch {
        // Safari can throw if a seek lands before the buffer is ready.
      }
    }
  };

  const unlockSeek = () => {
    if (unlocked) return;
    const play = video.play();
    const finish = () => {
      video.pause();
      unlocked = true;
      applyTime(displayed || targetFromProgress());
    };
    if (play && typeof play.then === "function") {
      play.then(finish).catch(() => {});
    } else {
      finish();
    }
  };

  const tick = () => {
    if (duration <= 0 || video.readyState < 1) return;

    const target = targetFromProgress();
    displayed += (target - displayed) * smoothing;
    if (Math.abs(target - displayed) < minStep) displayed = target;

    if (Math.abs(video.currentTime - displayed) < minStep) return;
    if (video.seeking && performance.now() - lastSeekAt < 90) return;
    applyTime(displayed);
  };

  const onMeta = () => {
    duration = video.duration || 0;
    displayed = targetFromProgress();
    if (duration > 0) applyTime(displayed);
  };

  video.addEventListener("loadedmetadata", onMeta);
  if (video.readyState >= 1) onMeta();
  video.addEventListener("loadeddata", unlockSeek, { once: true });
  document.addEventListener("touchstart", unlockSeek, { passive: true });
  document.addEventListener("pointerdown", unlockSeek);
  window.addEventListener("scroll", unlockSeek, { passive: true });
  gsap.ticker.add(tick);
  unlockSeek();

  return () => {
    gsap.ticker.remove(tick);
    video.removeEventListener("loadedmetadata", onMeta);
    document.removeEventListener("touchstart", unlockSeek);
    document.removeEventListener("pointerdown", unlockSeek);
    window.removeEventListener("scroll", unlockSeek);
  };
}
