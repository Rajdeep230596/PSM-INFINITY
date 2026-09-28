"use client";

import { markVideoReady, seekIfBuffered, timeIsBuffered } from "@/lib/deferred-video";

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
  video.preload = options.preload ?? "metadata";
  video.disablePictureInPicture = true;
  video.setAttribute("playsinline", "");
  video.setAttribute("webkit-playsinline", "");
  video.setAttribute("muted", "");

  if (reduceMotion || options.enabled === false) {
    video.pause();
    if (video.readyState >= 2) markVideoReady(video);
    else video.addEventListener("loadeddata", () => markVideoReady(video), { once: true });
    return () => {};
  }

  const smoothing = options.smoothing ?? 0.16;
  const minStep = 1 / (options.frameRate ?? 30);
  const frameMs = 1000 / (options.frameRate ?? 30);
  let duration = 0;
  let displayed = 0;
  let raf = 0;
  let lastPaint = 0;
  let unlocked = false;

  const endTime = () => Math.max(0, duration - minStep);

  const targetFromProgress = () => {
    const raw = Math.min(1, Math.max(0, options.getProgress()));
    const progress = options.mapProgress ? options.mapProgress(raw) : raw;
    if (duration <= 0) return 0;
    return progress >= 0.995 ? endTime() : progress * endTime();
  };

  const revealIfPainted = () => {
    if (video.readyState < 2 || duration <= 0) return;
    const target = targetFromProgress();
    if (timeIsBuffered(video, target) && Math.abs(video.currentTime - target) < 0.45) {
      markVideoReady(video);
    }
  };

  const unlockSeek = () => {
    if (unlocked) return;
    const play = video.play();
    const finish = () => {
      video.pause();
      unlocked = true;
    };
    if (play && typeof play.then === "function") {
      play.then(finish).catch(() => {});
    } else {
      finish();
    }
  };

  const tick = () => {
    if (duration <= 0 || video.readyState < 2) return;

    const target = targetFromProgress();
    displayed += (target - displayed) * smoothing;
    if (Math.abs(target - displayed) < minStep) displayed = target;

    if (seekIfBuffered(video, displayed)) {
      markVideoReady(video);
    }
  };

  const loop = (now: number) => {
    raf = window.requestAnimationFrame(loop);
    if (now - lastPaint < frameMs) return;
    lastPaint = now;
    tick();
  };

  const onMeta = () => {
    duration = video.duration || 0;
    displayed = targetFromProgress();
    seekIfBuffered(video, displayed);
    revealIfPainted();
  };

  video.addEventListener("loadedmetadata", onMeta);
  video.addEventListener("loadeddata", revealIfPainted);
  video.addEventListener("canplay", revealIfPainted);
  video.addEventListener("progress", tick);
  if (video.readyState >= 1) onMeta();
  video.addEventListener("loadeddata", unlockSeek, { once: true });
  document.addEventListener("touchstart", unlockSeek, { passive: true });
  document.addEventListener("pointerdown", unlockSeek);
  window.addEventListener("scroll", unlockSeek, { passive: true });
  raf = window.requestAnimationFrame(loop);
  unlockSeek();

  return () => {
    window.cancelAnimationFrame(raf);
    video.removeEventListener("loadedmetadata", onMeta);
    video.removeEventListener("loadeddata", revealIfPainted);
    video.removeEventListener("canplay", revealIfPainted);
    video.removeEventListener("progress", tick);
    video.removeEventListener("loadeddata", unlockSeek);
    document.removeEventListener("touchstart", unlockSeek);
    document.removeEventListener("pointerdown", unlockSeek);
    window.removeEventListener("scroll", unlockSeek);
  };
}
