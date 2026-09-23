"use client";

import { useGSAP } from "@gsap/react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";

import { EditorialMilestone, activeBeat, type EditorialBeat } from "@/components/home/editorial-milestone";
import { SkydeckSpaceTags } from "@/components/skydeck/SkydeckSpaceTags";
import { SKYDECK_BACKDROP_FIRST, SKYDECK_BACKDROP_SECOND } from "@/content/skydeck";
import { setCinematicChapter } from "@/lib/cinematic-hero";
import { useDeferredVideoSource } from "@/lib/deferred-video";
import { attachScrollVideo } from "@/lib/scroll-video";
import {
  mapToSkydeck,
  SECOND_ASCENT_VIDEO_SRC,
  SKYDECK_CARDS_HIDE_AT,
  SKYDECK_HANDOFF_AT,
  SKYDECK_LOUNGE_AT,
  SKYDECK_POOL_AT,
  skydeckProgressForTime,
} from "@/lib/second-ascent-video";
import { clearScrollPause, pauseSiteScroll } from "@/lib/site-lenis";

gsap.registerPlugin(useGSAP, ScrollTrigger);

const CARD_REVEAL_AT = skydeckProgressForTime(SKYDECK_LOUNGE_AT);
const CARD_WAVE_AT = skydeckProgressForTime(SKYDECK_POOL_AT);
const CARD_HIDE_AT = skydeckProgressForTime(SKYDECK_CARDS_HIDE_AT);

const CARD_PAUSE_MS = 1000;

type CardPhase = "hidden" | "first" | "second";

function cardPhaseFromProgress(progress: number): CardPhase {
  if (progress < CARD_REVEAL_AT || progress >= CARD_HIDE_AT) return "hidden";
  if (progress >= CARD_WAVE_AT) return "second";
  return "first";
}

const BEATS: EditorialBeat[] = [
  {
    id: "ascent",
    start: 0,
    end: 0.34,
    eyebrow: "THIRD ASCENT / 03",
    headline: ["Level Three:", "Skydeck."],
    subtext: "The private rooftop — terrace, water, and night air held above the city.",
  },
  {
    id: "deck",
    start: 0.38,
    end: 0.78,
    eyebrow: "THE DECK",
    headline: ["Night Water,", "Open Sky."],
    subtext: "Lounge, pool pavilion, and terrace seating composed as one arrival.",
  },
];

export function SkydeckArrival({ hideHero = false }: { hideHero?: boolean }) {
  const sectionRef = useRef<HTMLElement>(null);
  const videoWrapRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const videoSrc = useDeferredVideoSource(sectionRef, SECOND_ASCENT_VIDEO_SRC);
  const hideHeroRef = useRef(hideHero);
  hideHeroRef.current = hideHero;
  const [beat, setBeat] = useState<EditorialBeat | null>(BEATS[0]);
  const [cardPhase, setCardPhase] = useState<CardPhase>("hidden");
  const router = useRouter();

  useEffect(() => {
    const node = sectionRef.current;
    if (!node) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        setCinematicChapter("skydeck", entry.isIntersecting);
      },
      { threshold: 0.02 },
    );
    observer.observe(node);
    return () => {
      observer.disconnect();
      setCinematicChapter("skydeck", false);
    };
  }, []);

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
      const allowCardPause = !hideHeroRef.current && !reduceMotion && !coarse;
      let lastCardPhase: CardPhase = cardPhaseFromProgress(0);

      const pin = ScrollTrigger.create({
        trigger: section,
        start: "top top",
        end: "max",
        pin: wrap,
        pinSpacing: false,
        anticipatePin: 1,
        invalidateOnRefresh: true,
      });

      const trigger = ScrollTrigger.create({
        trigger: section,
        start: "top top",
        end: "bottom bottom",
        scrub: 0.55,
        onUpdate: (self) => {
          const next = activeBeat(self.progress, BEATS).beat;
          setBeat((prev) => (prev?.id === next?.id ? prev : next));
          const nextPhase = cardPhaseFromProgress(self.progress);
          if (
            allowCardPause &&
            self.direction === 1 &&
            ((lastCardPhase === "hidden" && nextPhase === "first") ||
              (lastCardPhase === "first" && nextPhase === "second"))
          ) {
            pauseSiteScroll(CARD_PAUSE_MS);
          }
          lastCardPhase = nextPhase;
          setCardPhase((prev) => (prev === nextPhase ? prev : nextPhase));
        },
      });

      if (loopFallback) {
        video.loop = true;
        video.muted = true;
        video.playsInline = true;
        const startAtHandoff = () => {
          if (video.duration && video.currentTime < SKYDECK_HANDOFF_AT) {
            video.currentTime = SKYDECK_HANDOFF_AT;
          }
        };
        video.addEventListener("loadedmetadata", startAtHandoff, { once: true });
        if (video.readyState >= 1) startAtHandoff();
        const play = video.play();
        if (play && typeof play.then === "function") play.catch(() => {});
        return () => {
          pin.kill();
          trigger.kill();
          clearScrollPause();
        };
      }

      const detach = attachScrollVideo(video, {
        getProgress: () => trigger.progress,
        mapProgress: mapToSkydeck,
        smoothing: 0.2,
        frameRate: 30,
        preload: "auto",
      });

      return () => {
        detach();
        pin.kill();
        trigger.kill();
        clearScrollPause();
      };
    },
    { scope: sectionRef, dependencies: [videoSrc] },
  );

  return (
    <section
      ref={sectionRef}
      id="skydeck"
      className="first-ascent first-ascent-flush relative h-[280vh] bg-[#080808] text-white selection:bg-white/20"
      aria-label="Level Three Skydeck"
    >
      <div ref={videoWrapRef} className="relative z-0 h-screen w-full overflow-hidden bg-[#080808] gpu-layer">
        <video
          ref={videoRef}
          src={videoSrc}
          muted
          playsInline
          preload={videoSrc ? "auto" : "none"}
          onLoadedMetadata={(event) => {
            event.currentTarget.currentTime = SKYDECK_HANDOFF_AT;
          }}
          className="gpu-media absolute inset-0 h-full w-full object-cover will-change-transform"
        />
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-black/35" />
        {!hideHero ? (
          <SkydeckSpaceTags
            visible={cardPhase !== "hidden"}
            spaces={cardPhase === "second" ? SKYDECK_BACKDROP_SECOND : SKYDECK_BACKDROP_FIRST}
          />
        ) : null}
        <EditorialMilestone
          beat={beat}
          cta={
            hideHero
              ? undefined
              : {
                  label: "Reserve the Skydeck",
                  onClick: () => router.push("/locations#concierge"),
                }
          }
        />
      </div>
    </section>
  );
}
