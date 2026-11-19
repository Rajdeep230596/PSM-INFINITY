"use client";

import { useGSAP } from "@gsap/react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useEffect, useRef, useState } from "react";

import { EditorialMilestone, activeBeat, type EditorialBeat } from "@/components/home/editorial-milestone";
import { HomeFilmStage } from "@/components/home/home-film-stage";
import { setCinematicChapter } from "@/lib/cinematic-hero";
import { playMutedLoop, prefetchVideo } from "@/lib/deferred-video";
import { HOME_CHAPTER_VIDEO_SECONDS, HOME_SCROLL_SCRUB, HOME_VIDEO, HOME_VIDEO_SMOOTHING, homeChapterStyle } from "@/lib/home-scroll";
import { prefersReducedMotion } from "@/lib/media-capability";
import { bindNavYield } from "@/lib/nav-yield";
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
  const [beat, setBeat] = useState<EditorialBeat | null>(BEATS[0]);
  const videoSrc = HOME_VIDEO.landing;

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
      if (!section || !video || !videoSrc) return;

      const reduceMotion = prefersReducedMotion();

      const trigger = ScrollTrigger.create({
        trigger: section,
        start: "top top",
        end: "bottom bottom",
        scrub: HOME_SCROLL_SCRUB,
        onUpdate: (self) => {
          const next = activeBeat(self.progress, BEATS).beat;
          setBeat((prev) => (next && prev?.id !== next.id ? next : prev));
        },
      });

      let cancelled = false;
      const warmNext = () => {
        if (cancelled) return;
        prefetchVideo(HOME_VIDEO.groundZero);
      };
      video.addEventListener("canplaythrough", warmNext, { once: true });
      const stopWarm = () => video.removeEventListener("canplaythrough", warmNext);

      if (reduceMotion) {
        const stopLoop = playMutedLoop(video);
        return bindNavYield(() => {
          cancelled = true;
          stopWarm();
          stopLoop();
          trigger.kill();
        });
      }

      const detach = attachScrollVideo(video, {
        getProgress: () => trigger.progress,
        smoothing: HOME_VIDEO_SMOOTHING,
        frameRate: 30,
      });

      return bindNavYield(() => {
        cancelled = true;
        stopWarm();
        detach();
        trigger.kill();
      });
    },
    { scope: sectionRef, dependencies: [videoSrc] },
  );

  return (
    <section
      ref={sectionRef}
      id="landing-hero"
      className="home-scrolly-chapter relative w-full bg-black"
      style={homeChapterStyle(HOME_CHAPTER_VIDEO_SECONDS.landing)}
      aria-label="Master landing sequence"
    >
      <HomeFilmStage videoRef={videoRef} src={videoSrc} poster={HOME_VIDEO.landingPoster} posterPriority>
        <EditorialMilestone
          beat={beat}
          beats={BEATS}
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
      </HomeFilmStage>
    </section>
  );
}
