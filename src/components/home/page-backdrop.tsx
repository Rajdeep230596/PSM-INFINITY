"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import { useDeferredVideoSource } from "@/lib/deferred-video";
import { attachScrollVideo } from "@/lib/scroll-video";

gsap.registerPlugin(useGSAP, ScrollTrigger);

export function PageBackdrop() {
  const wrapRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const videoSrc = useDeferredVideoSource(wrapRef, "/media/backdrop.mp4?v=7");

  useGSAP(
    () => {
      const wrap = wrapRef.current;
      const video = videoRef.current;
      if (!wrap || !video || !videoSrc) return;

      wrap.style.setProperty("--backdrop-video-opacity", "1");

      const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      if (reduceMotion) {
        video.pause();
        return;
      }

      const region = wrap.closest(".home-cinematic");
      const trigger = ScrollTrigger.create({
        start: 0,
        end: () => {
          if (!region) return Math.max(1, document.documentElement.scrollHeight - window.innerHeight);
          const top = region.getBoundingClientRect().top + window.scrollY;
          return Math.max(1, top + (region as HTMLElement).offsetHeight - window.innerHeight);
        },
        scrub: 1.05,
        onUpdate: (self) => {
          wrap.classList.toggle("is-past", self.progress >= 0.999);
        },
      });

      const detach = attachScrollVideo(video, {
        getProgress: () => trigger.progress,
        smoothing: 0.14,
        frameRate: 30,
      });

      return () => {
        detach();
        trigger.kill();
      };
    },
    { scope: wrapRef, dependencies: [videoSrc] },
  );

  return (
    <div className="page-backdrop" id="pageBackdrop" ref={wrapRef} aria-hidden="true">
      <div className="page-backdrop-media">
        <video ref={videoRef} src={videoSrc} muted playsInline preload={videoSrc ? "auto" : "none"} className="gpu-media" />
        <div className="page-backdrop-wash" />
      </div>
    </div>
  );
}
