"use client";

type ScrollVideoOptions = {
  getProgress: () => number;
  mapProgress?: (progress: number) => number;
  enabled?: boolean;
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
  video.preload = "auto";
  video.disablePictureInPicture = true;

  if (reduceMotion || options.enabled === false) {
    video.pause();
    return () => {};
  }

  let duration = 0;
  let targetTime = 0;
  let seeking = false;
  let queued = false;
  let seekWatch = 0;
  const frameStep = 1 / 24;
  const endTime = () => Math.max(0, duration - frameStep);

  const unlockSeek = () => {
    const play = video.play();
    if (play && typeof play.then === "function") {
      play
        .then(() => {
          video.pause();
          schedule();
        })
        .catch(() => {});
    } else {
      video.pause();
    }
  };

  const seekToTarget = () => {
    if (seeking || duration <= 0) return;
    if (Math.abs(video.currentTime - targetTime) < frameStep) return;
    seeking = true;
    video.pause();
    try {
      if (typeof video.fastSeek === "function") video.fastSeek(targetTime);
      else video.currentTime = targetTime;
    } catch {
      video.currentTime = targetTime;
    }
    window.clearTimeout(seekWatch);
    seekWatch = window.setTimeout(() => {
      seeking = false;
    }, 140);
  };

  const render = () => {
    queued = false;
    const raw = Math.min(1, Math.max(0, options.getProgress()));
    const progress = options.mapProgress ? options.mapProgress(raw) : raw;
    if (duration > 0) {
      targetTime = progress >= 0.995 ? endTime() : progress * endTime();
      seekToTarget();
    }
  };

  const schedule = () => {
    if (queued) return;
    queued = true;
    requestAnimationFrame(render);
  };

  const onMeta = () => {
    duration = video.duration || 0;
    schedule();
  };

  const onSeeked = () => {
    window.clearTimeout(seekWatch);
    seeking = false;
    if (Math.abs(video.currentTime - targetTime) >= frameStep) seekToTarget();
  };

  video.addEventListener("loadedmetadata", onMeta);
  if (video.readyState >= 1) duration = video.duration || 0;
  video.addEventListener("loadeddata", unlockSeek, { once: true });
  document.addEventListener("touchstart", unlockSeek, { once: true, passive: true });
  document.addEventListener("click", unlockSeek, { once: true });
  video.addEventListener("seeked", onSeeked);
  window.addEventListener("scroll", schedule, { passive: true });
  window.addEventListener("resize", schedule);
  schedule();

  return () => {
    window.clearTimeout(seekWatch);
    video.removeEventListener("loadedmetadata", onMeta);
    video.removeEventListener("seeked", onSeeked);
    window.removeEventListener("scroll", schedule);
    window.removeEventListener("resize", schedule);
  };
}
