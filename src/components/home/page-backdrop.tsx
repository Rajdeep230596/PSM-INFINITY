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
      if (!wrap || !video) return;

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
          return Math.max(1, top + region.offsetHeight - window.innerHeight);
        },
        scrub: 1.05,
        onUpdate: (self) => {
          wrap.classList.toggle("is-past", self.progress >= 0.999);
        },
      });

      const detach = attachScrollVideo(video, {
        getProgress: () => trigger.progress,
        smoothing: 0.14,
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
      <div className="page-backdrop-media">
        <video ref={videoRef} muted playsInline preload="auto">
          <source src="/media/backdrop.mp4?v=7" type="video/mp4" />
        </video>
        <div className="page-backdrop-wash" />
      </div>
    </div>
  );
}
