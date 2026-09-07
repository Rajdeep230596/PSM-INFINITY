"use client";

import Link from "next/link";
import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import { attachScrollVideo } from "@/lib/scroll-video";

gsap.registerPlugin(useGSAP, ScrollTrigger);

export function HeroScrolly() {
  const sectionRef = useRef<HTMLElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);

  useGSAP(
    () => {
      const section = sectionRef.current;
      const video = videoRef.current;
      if (!section || !video) return;

      const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      const lineNodes = [...section.querySelectorAll<HTMLElement>(".hero-line")];

      const applyVisual = (progress: number) => {
        section.style.setProperty("--hero-scale", (1.08 - progress * 0.08).toFixed(4));
        const posterHold = 0.08;
        const fadeEnd = 0.2;
        let poster = 1;
        let videoOpacity = 0;
        if (progress <= posterHold) {
          poster = 1;
          videoOpacity = 0;
        } else if (progress >= fadeEnd) {
          poster = 0;
          videoOpacity = 1;
        } else {
          const t = (progress - posterHold) / (fadeEnd - posterHold);
          poster = 1 - t;
          videoOpacity = t;
        }
        section.style.setProperty("--hero-poster-opacity", poster.toFixed(3));
        section.style.setProperty("--hero-video-opacity", videoOpacity.toFixed(3));
        section.classList.toggle("is-scrolled", progress > 0.04);
        lineNodes.forEach((line) => {
          const at = Number(line.dataset.at || 0);
          line.classList.toggle("is-in", progress >= at);
        });
      };

      if (reduceMotion) {
        applyVisual(1);
        lineNodes.forEach((line) => line.classList.add("is-in"));
        video.play().catch(() => {});
        return;
      }

      applyVisual(0);

      const trigger = ScrollTrigger.create({
        trigger: section,
        start: "top top",
        end: "bottom bottom",
        scrub: true,
        onUpdate: (self) => applyVisual(self.progress),
      });

      const detach = attachScrollVideo(video, {
        getProgress: () => trigger.progress,
        mapProgress: (progress) => {
          const start = 0.2;
          if (progress <= start) return 0;
          return (progress - start) / (1 - start);
        },
      });

      return () => {
        detach();
        trigger.kill();
      };
    },
    { scope: sectionRef },
  );

  return (
    <section className="hero-scrolly" id="heroScrolly" ref={sectionRef}>
      <div className="hero-sticky">
        <div className="hero-stage">
          <img src="/media/hero-poster.jpeg" alt="PSM Infinity" />
          <video ref={videoRef} muted playsInline preload="auto" poster="/media/hero-poster.jpeg" aria-hidden="true">
            <source src="/media/hero.mp4" type="video/mp4" />
          </video>
        </div>
        <div className="hero-ornament" />
        <div className="hero-inner">
          <p className="hero-line hero-kicker" data-at="0.28">
            Premium visual experiences · Kolkata
          </p>
          <p className="hero-line hero-script" data-at="0.42">
            beyond
            <br />
            the
            <br />
            brief.
          </p>
        </div>
        <div className="hero-foot">
          <p className="hero-line hero-copy" data-at="0.58">
            Personal branding. Corporate identity. Technology, textile, and logistics — composed as one studio.
          </p>
          <div className="hero-line hero-actions" data-at="0.72">
            <Link className="btn btn-light" href="/locations">
              Find the Ballygunge studio
            </Link>
            <Link className="btn btn-outline-light" href="/services">
              See the services
            </Link>
          </div>
        </div>
        <p className="hero-scroll-hint" aria-hidden="true">
          Scroll
        </p>
      </div>
    </section>
  );
}
