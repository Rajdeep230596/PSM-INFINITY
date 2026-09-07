"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import { attachScrollVideo } from "@/lib/scroll-video";

gsap.registerPlugin(useGSAP, ScrollTrigger);

export function PageBackdrop() {
  const wrapRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);

  useGSAP(
    () => {
      const wrap = wrapRef.current;
      const video = videoRef.current;
      const hero = document.getElementById("heroScrolly");
      if (!wrap || !video) return;

      const applyVisual = (progress: number) => {
        const hold = 0.02;
        const fadeEnd = 0.08;
        let poster = 1;
        let videoOpacity = 0;
        if (progress <= hold) {
          poster = 1;
          videoOpacity = 0;
        } else if (progress >= fadeEnd) {
          poster = 0;
          videoOpacity = 1;
        } else {
          const t = (progress - hold) / (fadeEnd - hold);
          poster = 1 - t;
          videoOpacity = t;
        }
        wrap.style.setProperty("--backdrop-poster-opacity", poster.toFixed(3));
        wrap.style.setProperty("--backdrop-video-opacity", videoOpacity.toFixed(3));
      };

      const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      if (reduceMotion) {
        applyVisual(0);
        video.pause();
        return;
      }

      applyVisual(0);

      const trigger = ScrollTrigger.create({
        start: () => Math.max(0, (hero?.offsetHeight ?? 0) - window.innerHeight),
        end: () => Math.max(1, document.documentElement.scrollHeight - window.innerHeight),
        scrub: true,
        onUpdate: (self) => applyVisual(self.progress),
      });

      const detach = attachScrollVideo(video, {
        getProgress: () => trigger.progress,
      });

      return () => {
        detach();
        trigger.kill();
      };
    },
    { scope: wrapRef },
  );

  return (
    <div className="page-backdrop" id="pageBackdrop" ref={wrapRef} aria-hidden="true">
      <img src="/media/backdrop-poster.png" alt="" />
      <video ref={videoRef} muted playsInline preload="auto" poster="/media/backdrop-poster.png">
        <source src="/media/backdrop.mp4" type="video/mp4" />
      </video>
      <div className="page-backdrop-wash" />
    </div>
  );
}
