"use client";

import { useGSAP } from "@gsap/react";
import { AnimatePresence, motion } from "framer-motion";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowUpRight, Building2, Calendar } from "lucide-react";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";

import { HomeFilmStage } from "@/components/home/home-film-stage";
import { AscentCard, AscentCardGrid } from "@/components/media/ascent-card";
import { enquireWhatsApp, openWhatsApp } from "@/lib/constants";
import { playMutedLoop, useDeferredVideoSource } from "@/lib/deferred-video";
import { HOME_CHAPTER_VIDEO_SECONDS, HOME_SCROLL_SCRUB, HOME_VIDEO_SMOOTHING, homeChapterStyle } from "@/lib/home-scroll";
import { prefersReducedMotion } from "@/lib/media-capability";
import { bindNavYield } from "@/lib/nav-yield";
import { attachScrollVideo } from "@/lib/scroll-video";
import { LEVEL_TWO_VIDEO_SRC, SKYDECK_VIDEO_SRC } from "@/lib/second-ascent-video";

const EVENT_CTAS = [
  { id: "private-events", label: "Private Events", href: "/second-ascent/private-events", icon: Calendar },
  { id: "corporate-events", label: "Corporate Events", href: "/second-ascent/corporate-events", icon: Building2 },
] as const;

/** Same scroll beats as the previous Level Two film: cards arrive just before halfway, then clear near the end. */
const EVENT_CTA_REVEAL_AT = 6.85 / 14.2;
const EVENT_CTA_HIDE_AT = 11.9 / 14.2;
const DOCK_AT = 0.12;

type ScrollPhase = "intro" | "dock" | "cta" | "rest";

function phaseFromProgress(progress: number): ScrollPhase {
  if (progress >= EVENT_CTA_HIDE_AT) return "rest";
  if (progress >= EVENT_CTA_REVEAL_AT) return "cta";
  if (progress > DOCK_AT) return "dock";
  return "intro";
}

gsap.registerPlugin(useGSAP, ScrollTrigger);

export function FirstAscentGallery({ hideHero = false }: { hideHero?: boolean }) {
  const sectionRef = useRef<HTMLElement>(null);
  const videoWrapRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const videoSrc = useDeferredVideoSource(sectionRef, LEVEL_TWO_VIDEO_SRC, {
    eager: true,
    prefetch: SKYDECK_VIDEO_SRC,
  });
  const [phase, setPhase] = useState<ScrollPhase>("intro");
  const revealed = phase === "cta" || phase === "rest";
  const ctaVisible = phase === "cta";
  const showDock = !hideHero && phase === "dock";

  useEffect(() => {
    if (hideHero) return;
    document.documentElement.classList.add("first-ascent-page");
    return () => document.documentElement.classList.remove("first-ascent-page");
  }, [hideHero]);

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
          const next = phaseFromProgress(self.progress);
          setPhase((prev) => (prev === next ? prev : next));
        },
      });

      if (reduceMotion) {
        const stopLoop = playMutedLoop(video);
        return bindNavYield(() => {
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
        detach();
        trigger.kill();
      });
    },
    { scope: sectionRef, dependencies: [videoSrc] },
  );

  return (
    <section
      ref={sectionRef}
      id="second-ascent"
      className="home-scrolly-chapter first-ascent first-ascent-flush relative bg-[#080808] text-white selection:bg-white/20"
      style={homeChapterStyle(HOME_CHAPTER_VIDEO_SECONDS.events)}
      aria-label="Second Ascent"
    >
      <HomeFilmStage videoRef={videoRef} wrapRef={videoWrapRef} src={videoSrc}>
        <div
          className={`home-overlay absolute inset-0 z-30 flex items-center justify-center ${
            ctaVisible ? "is-revealed pointer-events-auto" : "pointer-events-none"
          }`}
        >
          <AscentCardGrid>
            {EVENT_CTAS.map((item, index) => {
              const Icon = item.icon;
              return (
                <AscentCard
                  key={item.id}
                  href={item.href}
                  index={index + 1}
                  title={item.label}
                  icon={<Icon strokeWidth={1.15} />}
                  revealed={ctaVisible}
                  revealDelay={index * 0.07}
                />
              );
            })}
          </AscentCardGrid>
        </div>

        <div
          className={`home-copy pointer-events-none absolute inset-0 z-20 flex items-end ${
            revealed ? "opacity-0" : "opacity-100"
          }`}
        >
        <div
          className="home-copy-inner mx-auto w-full max-w-7xl px-8 pb-28 transition-opacity duration-500 md:px-16 md:pb-36 lg:px-20"
        >
          <div className="relative max-w-xl text-left">
            <div className="editorial-wash pointer-events-none absolute -inset-10 -z-10 bg-gradient-to-tr from-black/85 via-black/40 to-transparent blur-3xl" />
            {hideHero ? (
              <>
                <p className="mb-3 block font-mono text-[10px] font-semibold tracking-[0.35em] text-[#C5A880] uppercase drop-shadow-md md:text-[11px]">
                  Event Management
                </p>
                <h2 className="font-serif text-3xl leading-[1.08] font-light tracking-tight text-white drop-shadow-xl sm:text-4xl md:text-6xl">
                  <span className="block">Level Two:</span>
                  <span className="block">Events</span>
                </h2>
                <p className="mt-4 max-w-lg font-sans text-xs leading-relaxed font-light text-neutral-300 drop-shadow-md md:text-sm">
                  Private evenings and corporate gatherings, composed as one visual experience.
                </p>
                <Link
                  href="/second-ascent"
                  prefetch={true}
                  className="mt-8 inline-block text-xs tracking-wide text-neutral-300 transition-colors hover:text-white"
                >
                  Open pavilion ↗
                </Link>
              </>
            ) : (
              <>
                <p className="mb-3 block font-mono text-[10px] font-semibold tracking-[0.35em] text-[#C5A880] uppercase drop-shadow-md md:text-[11px]">
                  Event Management
                </p>
                <h1 className="font-serif text-3xl leading-[1.08] font-light tracking-tight text-white drop-shadow-xl sm:text-4xl md:text-6xl">
                  <span className="block">Level Two:</span>
                  <span className="block">Events</span>
                </h1>
                <p className="mt-4 max-w-lg font-sans text-xs leading-relaxed font-light text-neutral-300 drop-shadow-md md:text-sm">
                  Private evenings and corporate gatherings, composed as one visual experience.
                </p>
              </>
            )}
          </div>
        </div>
        </div>
      </HomeFilmStage>

      <AnimatePresence>
        {showDock ? (
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 8 }}
            className="fixed bottom-6 left-1/2 z-40 flex -translate-x-1/2 items-center gap-3 rounded-full border border-white/10 bg-black/70 px-4 py-2.5 shadow-2xl backdrop-blur-2xl"
          >
            <button
              type="button"
              onClick={() =>
                openWhatsApp(
                  "Hello PSM Infinity Concierge, I would like to inquire about First Ascent private acquisition.",
                )
              }
              className="fa-dossier-btn flex items-center gap-1 rounded-full bg-white px-4 py-2 text-xs font-medium whitespace-nowrap !text-black transition-colors hover:bg-neutral-200"
            >
              Connect with Private Acquisition Desk
              <ArrowUpRight size={12} />
            </button>
            <button
              type="button"
              onClick={() => enquireWhatsApp("Commission Any Asset", "First Ascent")}
              className="hidden items-center gap-2 text-xs whitespace-nowrap text-neutral-300 sm:inline-flex"
            >
              <Calendar size={13} />
              Commission Any Asset
            </button>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </section>
  );
}
