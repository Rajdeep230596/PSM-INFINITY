"use client";

import { useGSAP } from "@gsap/react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useEffect, useRef, useState } from "react";

import { EditorialMilestone, activeBeat, type EditorialBeat } from "@/components/home/editorial-milestone";
import { GroundZeroCard, GROUND_ZERO_CARDS } from "@/components/home/ground-zero-card";
import { setCinematicChapter } from "@/lib/cinematic-hero";
import { useDeferredVideoSource } from "@/lib/deferred-video";
import { attachScrollVideo } from "@/lib/scroll-video";

gsap.registerPlugin(useGSAP, ScrollTrigger);

const BEATS: EditorialBeat[] = [
  {
    id: "gallery",
    start: 0,
    end: 0.38,
    eyebrow: "FOUNDATION TIER / 00",
    headline: ["Ground Floor:", "The Private Atelier."],
    subtext:
      "An expansive duplex sanctuary uniting haute couture styling, prime architectural estates, master landscaping, and rare calibres.",
  },
  {
    id: "domains",
    start: 0.42,
    end: 0.68,
    eyebrow: "CURATED DOMAINS",
    headline: ["Bespoke Living,", "Unconstrained."],
    subtext: "Bespoke Wardrobes · Architectural Portfolios · Botanical Grounds · Exotic Chassis.",
  },
];

export function GroundZeroScrollySection() {
  const sectionRef = useRef<HTMLElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [progress, setProgress] = useState(0);
  const videoSrc = useDeferredVideoSource(sectionRef, "/videos/ground-zero-arrival.mp4");
  const revealed = progress >= 0.72;
  const { beat } = activeBeat(revealed ? 1.1 : progress, BEATS);

  useEffect(() => {
    const node = sectionRef.current;
    if (!node) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        setCinematicChapter("ground-zero", entry.isIntersecting);
      },
      { threshold: 0.02 },
    );
    observer.observe(node);
    return () => {
      observer.disconnect();
      setCinematicChapter("ground-zero", false);
    };
  }, []);

  useGSAP(
    () => {
      const section = sectionRef.current;
      const video = videoRef.current;
      if (!section || !video || !videoSrc) return;

      const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      const coarse = window.matchMedia("(pointer: coarse)").matches;
      const compact = window.matchMedia("(max-width: 700px)").matches;
      const loopFallback = reduceMotion || coarse || compact;

      const trigger = ScrollTrigger.create({
        trigger: section,
        start: "top top",
        end: "bottom bottom",
        scrub: 1.05,
        onUpdate: (self) => setProgress(self.progress),
      });

      if (loopFallback) {
        video.loop = true;
        video.muted = true;
        video.playsInline = true;
        const play = video.play();
        if (play && typeof play.then === "function") play.catch(() => {});
        return () => trigger.kill();
      }

      const detach = attachScrollVideo(video, {
        getProgress: () => trigger.progress,
        smoothing: 0.14,
      });

      return () => {
        detach();
        trigger.kill();
      };
    },
    { scope: sectionRef, dependencies: [videoSrc] },
  );

  return (
    <section
      ref={sectionRef}
      id="ground-zero"
      className="relative h-[350vh] bg-[#0A0A0B]"
      aria-label="Ground Zero arrival"
    >
      <div className="sticky top-0 flex h-screen w-full items-center justify-center overflow-hidden">
        <video
          ref={videoRef}
          src={videoSrc}
          muted
          playsInline
          preload={videoSrc ? "metadata" : "none"}
          className="absolute inset-0 h-full w-full object-cover"
        />
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/75 via-black/25 to-black/40" />

        <EditorialMilestone beat={beat} />

        <div
          className={`gz-card-overlay absolute inset-0 z-30 flex items-center justify-center ${
            revealed ? "pointer-events-auto" : "pointer-events-none"
          }`}
        >
          <div className="gz-card-track no-scrollbar mx-auto w-full max-w-7xl">
            {GROUND_ZERO_CARDS.map((card, index) => (
              <GroundZeroCard key={card.id} card={card} revealed={revealed} index={index} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
