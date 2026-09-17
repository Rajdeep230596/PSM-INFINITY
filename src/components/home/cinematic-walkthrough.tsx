"use client";

import { useGSAP } from "@gsap/react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useEffect, useRef, useState } from "react";

import { EditorialMilestone, activeBeat, type EditorialBeat } from "@/components/home/editorial-milestone";
import { setCinematicChapter } from "@/lib/cinematic-hero";
import { attachScrollVideo } from "@/lib/scroll-video";

gsap.registerPlugin(useGSAP, ScrollTrigger);

const BEATS: EditorialBeat[] = [
  {
    id: "earth",
    start: 0,
    end: 0.15,
    eyebrow: "GLOBAL REACH",
    headline: ["No Borders.", "No Distance."],
    subtext: "Connecting rare luxury from anywhere on Earth directly to your collection.",
  },
  {
    id: "transit",
    start: 0.2,
    end: 0.4,
    eyebrow: "PRIVATE TRANSIT",
    headline: ["Destination:", "Pure Excellence."],
    subtext: "Bespoke acquisitions tracked, verified, and escorted in real time.",
  },
  {
    id: "estate",
    start: 0.45,
    end: 0.65,
    eyebrow: "THE ESTATE",
    headline: ["Where Curations", "Converge."],
    subtext: "An architectural sanctuary housing the world's most coveted automotive and horological assets.",
  },
  {
    id: "concierge",
    start: 0.7,
    end: 0.85,
    eyebrow: "PRIVATE CONCIERGE",
    headline: ["Welcome to", "PSM Infinity."],
    subtext: "Your discreet global desk for timepieces, exotic chassis, and fine living spaces.",
  },
  {
    id: "ascent",
    start: 0.9,
    end: 1,
    eyebrow: "GROUND ZERO",
    headline: ["The Foundation", "Begins."],
  },
];

export function CinematicWalkthrough() {
  const sectionRef = useRef<HTMLElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const node = sectionRef.current;
    if (!node) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        setCinematicChapter("landing", entry.isIntersecting);
      },
      { threshold: 0.02 },
    );
    observer.observe(node);
    setCinematicChapter("landing", true);
    return () => {
      observer.disconnect();
      setCinematicChapter("landing", false);
    };
  }, []);

  useGSAP(
    () => {
      const section = sectionRef.current;
      const video = videoRef.current;
      if (!section || !video) return;

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
    { scope: sectionRef },
  );

  const { beat } = activeBeat(progress, BEATS);

  return (
    <section
      ref={sectionRef}
      id="landing-hero"
      className="relative h-[450vh] w-full bg-black"
      aria-label="Master landing sequence"
    >
      <div className="sticky top-0 flex h-screen w-full items-center justify-center overflow-hidden bg-black">
        <video
          ref={videoRef}
          muted
          playsInline
          preload="metadata"
          className="h-full w-full object-cover"
        >
          <source src="/media/backdrop.mp4?v=7" type="video/mp4" />
        </video>
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/40" />
        <EditorialMilestone
          beat={beat}
          cta={
            beat?.id === "ascent"
              ? {
                  label: "Continue ↓",
                  onClick: () =>
                    document.getElementById("ground-zero")?.scrollIntoView({ behavior: "smooth", block: "start" }),
                }
              : undefined
          }
        />
      </div>
    </section>
  );
}
