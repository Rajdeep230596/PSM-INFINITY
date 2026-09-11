"use client";

import { useGSAP } from "@gsap/react";
import { AnimatePresence, motion } from "framer-motion";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useEffect, useRef, useState } from "react";

import { attachScrollVideo } from "@/lib/scroll-video";

gsap.registerPlugin(useGSAP, ScrollTrigger);

type Beat = {
  id: string;
  start: number;
  end: number;
  eyebrow: string;
  headline: string[];
  subtext?: string;
  cta?: string;
};

const BEATS: Beat[] = [
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
    eyebrow: "FIRST ASCENT",
    headline: ["Explore the", "Collections."],
    cta: "Enter the Pavilion ↓",
  },
];

function beatVisibility(progress: number, start: number, end: number) {
  if (progress < start || progress > end) return 0;
  const t = (progress - start) / Math.max(0.001, end - start);
  if (t < 0.18) return t / 0.18;
  if (t > 0.82) return (1 - t) / 0.18;
  return 1;
}

function activeBeat(progress: number) {
  let current: Beat | null = null;
  let visibility = 0;
  for (const beat of BEATS) {
    const next = beatVisibility(progress, beat.start, beat.end);
    if (next >= visibility) {
      visibility = next;
      current = beat;
    }
  }
  if (visibility <= 0.02) return { beat: null as Beat | null, visibility: 0 };
  return { beat: current, visibility };
}

export function CinematicWalkthrough() {
  const sectionRef = useRef<HTMLElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const node = sectionRef.current;
    if (!node) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        document.documentElement.classList.toggle("cinematic-hero-active", entry.isIntersecting);
      },
      { threshold: 0.02 },
    );
    observer.observe(node);
    document.documentElement.classList.add("cinematic-hero-active");
    return () => {
      observer.disconnect();
      document.documentElement.classList.remove("cinematic-hero-active");
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

  const { beat } = activeBeat(progress);

  const enterPavilion = () => {
    document.getElementById("collections")?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <section ref={sectionRef} className="relative h-[450vh] w-full bg-black" aria-label="Cinematic walkthrough">
      <div className="sticky top-0 flex h-screen w-full items-center justify-center overflow-hidden bg-black">
        <video
          ref={videoRef}
          muted
          playsInline
          preload="auto"
          className="h-full w-full object-cover"
        >
          <source src="/media/backdrop.mp4?v=7" type="video/mp4" />
        </video>
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/40" />

        <div className="pointer-events-none absolute inset-0 z-20 flex items-center">
          <div className="mx-auto w-full max-w-7xl px-8 md:px-16 lg:px-20">
            <div className="relative max-w-xl text-left">
              <div className="pointer-events-none absolute -inset-10 -z-10 bg-gradient-to-tr from-black/85 via-black/40 to-transparent blur-3xl" />
              <AnimatePresence mode="wait">
                {beat ? (
                  <motion.div
                    key={beat.id}
                    initial={{ opacity: 0, y: 16 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -12, transition: { duration: 0.4, ease: "easeIn" } }}
                    transition={{ duration: 0.6, ease: "easeOut" }}
                  >
                    <span className="mb-3 block font-mono text-[10px] font-semibold tracking-[0.35em] text-rose-400 uppercase drop-shadow-[0_0_8px_rgba(244,63,94,0.4)] md:text-[11px]">
                      {beat.eyebrow}
                    </span>
                    <h2 className="text-3xl leading-[1.1] font-light tracking-tight text-white drop-shadow-[0_4px_20px_rgba(0,0,0,0.9)] sm:text-4xl md:text-5xl [font-family:var(--font-display)]">
                      {beat.headline.map((line) => (
                        <span key={line} className="block">
                          {line}
                        </span>
                      ))}
                    </h2>
                    {beat.subtext ? (
                      <p className="mt-4 max-w-lg text-xs leading-relaxed font-light text-neutral-300 drop-shadow-[0_2px_12px_rgba(0,0,0,0.85)] sm:text-sm md:text-base">
                        {beat.subtext}
                      </p>
                    ) : null}
                    {beat.cta ? (
                      <button
                        type="button"
                        onClick={enterPavilion}
                        className="pointer-events-auto mt-8 rounded-full bg-white px-5 py-2.5 text-xs font-semibold tracking-tight text-black shadow-[0_2px_16px_rgba(255,255,255,0.18)] transition-colors hover:bg-neutral-200"
                      >
                        {beat.cta}
                      </button>
                    ) : null}
                  </motion.div>
                ) : null}
              </AnimatePresence>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
