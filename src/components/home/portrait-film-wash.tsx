"use client";

import { useEffect, useRef, type RefObject } from "react";

const PORTRAIT = "(max-width: 1100px) and (orientation: portrait)";

/** Soft, enlarged copy of the current frame. Portrait screens show the sharp film in full on top of this. */
export function PortraitFilmWash({ videoRef }: { videoRef: RefObject<HTMLVideoElement | null> }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const video = videoRef.current;
    if (!canvas || !video) return;
    const context = canvas.getContext("2d", { alpha: false });
    if (!context) return;
    const media = window.matchMedia(PORTRAIT);

    const paint = () => {
      if (!media.matches || video.readyState < 2) return;
      const width = 320;
      const height = 180;
      if (canvas.width !== width) {
        canvas.width = width;
        canvas.height = height;
      }
      context.drawImage(video, 0, 0, width, height);
    };

    video.addEventListener("seeked", paint);
    video.addEventListener("loadeddata", paint);
    media.addEventListener("change", paint);
    paint();
    return () => {
      video.removeEventListener("seeked", paint);
      video.removeEventListener("loadeddata", paint);
      media.removeEventListener("change", paint);
    };
  }, [videoRef]);

  return <canvas ref={canvasRef} className="home-film-wash" aria-hidden="true" />;
}
