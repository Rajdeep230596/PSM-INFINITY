"use client";

import { useGSAP } from "@gsap/react";
import { AnimatePresence, motion } from "framer-motion";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowUpRight, Building2, Calendar } from "lucide-react";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";

import { enquireWhatsApp, openWhatsApp } from "@/lib/constants";
import { useDeferredVideoSource } from "@/lib/deferred-video";
import { attachScrollVideo } from "@/lib/scroll-video";
import { mapToLevelTwo, SECOND_ASCENT_VIDEO_SRC, SKYDECK_HANDOFF_AT } from "@/lib/second-ascent-video";

const EVENT_CTAS = [
  { id: "private-events", label: "Private Events", href: "/second-ascent/private-events", icon: Calendar },
  { id: "corporate-events", label: "Corporate Events", href: "/second-ascent/corporate-events", icon: Building2 },
] as const;

const EVENT_CTA_REVEAL_AT = 6.85 / SKYDECK_HANDOFF_AT;
const EVENT_CTA_HIDE_AT = 11.9 / SKYDECK_HANDOFF_AT;
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
  const videoSrc = useDeferredVideoSource(sectionRef, SECOND_ASCENT_VIDEO_SRC);
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
      const wrap = videoWrapRef.current;
      const video = videoRef.current;
      if (!section || !wrap || !video || !videoSrc) return;

      const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      const coarse = window.matchMedia("(pointer: coarse)").matches;
      const compact = window.matchMedia("(max-width: 700px)").matches;
      const loopFallback = reduceMotion || coarse || compact;

      const pin = ScrollTrigger.create({
        trigger: section,
        start: "top top",
        end: "bottom bottom",
        pin: wrap,
        pinSpacing: true,
        anticipatePin: 1,
        invalidateOnRefresh: true,
      });

      const trigger = ScrollTrigger.create({
        trigger: section,
        start: "top top",
        end: "bottom bottom",
        scrub: 0.55,
        onUpdate: (self) => {
          const next = phaseFromProgress(self.progress);
          setPhase((prev) => (prev === next ? prev : next));
        },
      });

      if (loopFallback) {
        video.loop = true;
        video.muted = true;
        video.playsInline = true;
        const play = video.play();
        if (play && typeof play.then === "function") play.catch(() => {});
        return () => {
          pin.kill();
          trigger.kill();
        };
      }

      const detach = attachScrollVideo(video, {
        getProgress: () => trigger.progress,
        mapProgress: mapToLevelTwo,
        smoothing: 0.2,
        frameRate: 30,
        preload: "auto",
      });

      return () => {
        detach();
        pin.kill();
        trigger.kill();
      };
    },
    { scope: sectionRef, dependencies: [videoSrc] },
  );

  return (
    <section
      ref={sectionRef}
      id="second-ascent"
      className="first-ascent first-ascent-flush relative h-[240vh] bg-[#080808] text-white selection:bg-white/20"
      aria-label="Second Ascent"
    >
      <div ref={videoWrapRef} className="relative z-0 h-screen w-full overflow-hidden bg-[#080808] gpu-layer">
        <video
          ref={videoRef}
          src={videoSrc}
          muted
          playsInline
          preload={videoSrc ? "auto" : "none"}
          className="gpu-media absolute inset-0 h-full w-full object-cover will-change-transform"
        />
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-black/35" />

        <div
          className={`absolute inset-0 z-30 flex items-center justify-center ${
            ctaVisible ? "pointer-events-auto" : "pointer-events-none"
          }`}
        >
          <div className="flex items-center justify-center gap-[48px]">
            {EVENT_CTAS.map((item, index) => {
              const Icon = item.icon;
              return (
                <motion.div
                  key={item.id}
                  className="gpu-surface"
                  initial={false}
                  animate={ctaVisible ? { opacity: 1, y: 0, scale: 1 } : { opacity: 0, y: 28, scale: 0.96 }}
                  transition={{
                    duration: 0.7,
                    delay: ctaVisible ? index * 0.08 : 0,
                    ease: [0.22, 1, 0.36, 1],
                  }}
                >
                  <Link
                    href={item.href}
                    prefetch={true}
                    className="group flex aspect-square w-[min(42vw,14.75rem)] flex-col items-center justify-center gap-4 rounded-[1.5rem] border border-white/15 bg-black/55 px-4 text-center shadow-[0_8px_40px_rgba(0,0,0,0.35)] backdrop-blur-2xl transition-colors duration-300 hover:border-white/25 hover:bg-black/70 md:w-[16.5rem] md:rounded-[1.75rem]"
                  >
                    <Icon
                      size={32}
                      strokeWidth={1.15}
                      className="text-white transition-transform duration-500 group-hover:scale-105"
                    />
                    <span className="max-w-[9rem] text-[13px] font-light tracking-wide text-white md:text-sm">
                      {item.label}
                    </span>
                  </Link>
                </motion.div>
              );
            })}
          </div>
        </div>

        <div
          className={`absolute inset-x-0 bottom-0 z-20 mx-auto w-full max-w-7xl px-8 pb-28 transition-opacity duration-500 md:px-16 md:pb-36 lg:px-20 ${
            revealed ? "pointer-events-none opacity-0" : "opacity-100"
          }`}
        >
          <div className="relative max-w-xl text-left">
            <div className="pointer-events-none absolute -inset-10 -z-10 bg-gradient-to-tr from-black/85 via-black/40 to-transparent blur-3xl" />
            {hideHero ? (
              <>
                <p className="mb-3 block font-mono text-[10px] font-semibold tracking-[0.35em] text-rose-400 uppercase drop-shadow-md md:text-[11px]">
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
                <p className="mb-3 block font-mono text-[10px] font-semibold tracking-[0.35em] text-rose-400 uppercase drop-shadow-md md:text-[11px]">
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
