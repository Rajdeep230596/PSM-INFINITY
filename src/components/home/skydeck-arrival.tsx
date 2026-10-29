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
import { playMutedLoop, useDeferredVideoSource } from "@/lib/deferred-video";
import { HOME_CHAPTER_VIDEO_SECONDS, HOME_SCROLL_SCRUB, HOME_VIDEO_SMOOTHING, homeChapterStyle } from "@/lib/home-scroll";
import { isMotionLite, prefersReducedMotion } from "@/lib/media-capability";
import { bindNavYield } from "@/lib/nav-yield";
import { attachScrollVideo } from "@/lib/scroll-video";
import {
  SKYDECK_CARDS_HIDE_AT,
  SKYDECK_LOUNGE_AT,
  SKYDECK_POOL_AT,
  SKYDECK_VIDEO_MOBILE_SRC,
  SKYDECK_VIDEO_POSTER,
  SKYDECK_VIDEO_SRC,
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
  const [fileSrc, setFileSrc] = useState("");
  useEffect(() => {
    setFileSrc(isMotionLite() ? SKYDECK_VIDEO_MOBILE_SRC : SKYDECK_VIDEO_SRC);
  }, []);
  const videoSrc = useDeferredVideoSource(sectionRef, fileSrc, { eager: Boolean(fileSrc) });
  const hideHeroRef = useRef(hideHero);
  useEffect(() => {
    hideHeroRef.current = hideHero;
  }, [hideHero]);
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
      const video = videoRef.current;
      if (!section || !video || !videoSrc) return;

      const reduceMotion = prefersReducedMotion();
      const lite = isMotionLite();
      const allowCardPause = !hideHeroRef.current && !reduceMotion && !lite;
      let lastCardPhase: CardPhase = cardPhaseFromProgress(0);

      const trigger = ScrollTrigger.create({
        trigger: section,
        start: "top top",
        end: "bottom bottom",
        scrub: lite ? 1.35 : HOME_SCROLL_SCRUB,
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

      if (reduceMotion) {
        const stopLoop = playMutedLoop(video);
        return bindNavYield(() => {
          stopLoop();
          trigger.kill();
          clearScrollPause();
        });
      }

      const detach = attachScrollVideo(video, {
        getProgress: () => trigger.progress,
        smoothing: lite ? 0.28 : HOME_VIDEO_SMOOTHING,
        frameRate: lite ? 10 : 24,
        preload: lite ? "metadata" : "auto",
      });

      return bindNavYield(() => {
        detach();
        trigger.kill();
        clearScrollPause();
      });
    },
    { scope: sectionRef, dependencies: [videoSrc] },
  );

  return (
    <section
      ref={sectionRef}
      id="skydeck"
      className="home-scrolly-chapter first-ascent first-ascent-flush relative bg-[#080808] text-white selection:bg-white/20"
      style={homeChapterStyle(HOME_CHAPTER_VIDEO_SECONDS.skydeck)}
      aria-label="Level Three Skydeck"
    >
      <div ref={videoWrapRef} className="skydeck-stage sticky top-0 z-0 h-screen w-full overflow-hidden bg-[#080808] gpu-layer">
        <video
          ref={videoRef}
          src={videoSrc}
          poster={SKYDECK_VIDEO_POSTER}
          muted
          playsInline
          disablePictureInPicture
          preload={videoSrc ? "metadata" : "none"}
          className="gpu-media absolute inset-0 h-full w-full object-cover"
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