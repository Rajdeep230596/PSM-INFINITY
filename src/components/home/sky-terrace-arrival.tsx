"use client";

import { useGSAP } from "@gsap/react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Car, Globe, House, Ship } from "lucide-react";
import { useRef, useState } from "react";

import { EditorialMilestone, activeBeat, type EditorialBeat } from "@/components/home/editorial-milestone";
import { HomeFilmStage } from "@/components/home/home-film-stage";
import { AscentCard, AscentCardGrid } from "@/components/media/ascent-card";
import { playMutedLoop, useDeferredVideoSource } from "@/lib/deferred-video";
import { HOME_CHAPTER_VIDEO_SECONDS, HOME_SCROLL_SCRUB, HOME_VIDEO, HOME_VIDEO_SMOOTHING, homeChapterStyle } from "@/lib/home-scroll";
import { prefersReducedMotion } from "@/lib/media-capability";
import { LEVEL_TWO_VIDEO_SRC } from "@/lib/second-ascent-video";
import { bindNavYield } from "@/lib/nav-yield";
import { attachScrollVideo } from "@/lib/scroll-video";

gsap.registerPlugin(useGSAP, ScrollTrigger);

const BEATS: EditorialBeat[] = [
  {
    id: "terrace",
    start: 0,
    end: 0.38,
    eyebrow: "FIRST ASCENT / 01",
    headline: ["Level One:", "Global Mobility."],
    subtext:
      "Intercontinental air charters, private yacht berths, secluded island sanctuaries, and armored tarmac transfers.",
  },
  {
    id: "horizon",
    start: 0.42,
    end: 0.68,
    eyebrow: "EXPEDITION DESK",
    headline: ["The World,", "On Your Horizon."],
    subtext: "Private Aviation · Superyacht Charters · Off-Market Villas · Diplomatic Chauffeur.",
  },
];

const SERVICES = [
  {
    id: "itineraries",
    label: "Global Itineraries",
    icon: Globe,
    href: "/first-ascent/itineraries",
  },
  {
    id: "yachts",
    label: "Yacht Charters",
    icon: Ship,
    href: "/first-ascent/yachts",
  },
  {
    id: "villas",
    label: "Bespoke Villas",
    icon: House,
    href: "/first-ascent/villas",
  },
  {
    id: "chauffeur",
    label: "Chauffeur Fleet",
    icon: Car,
    href: "/first-ascent/chauffeur",
  },
] as const;

export function SkyTerraceArrival() {
  const sectionRef = useRef<HTMLElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const videoSrc = useDeferredVideoSource(sectionRef, HOME_VIDEO.skyTerrace, {
    rootMargin: "40% 0px",
    prefetch: LEVEL_TWO_VIDEO_SRC,
  });
  const [revealed, setRevealed] = useState(false);
  const [beat, setBeat] = useState<EditorialBeat | null>(BEATS[0]);

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
          const isRevealed = self.progress >= 0.72;
          const next = activeBeat(isRevealed ? 1.1 : self.progress, BEATS).beat;
          setRevealed((prev) => (prev === isRevealed ? prev : isRevealed));
          setBeat((prev) => (prev?.id === next?.id ? prev : next));
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
      id="first-ascent-arrival"
      className="home-scrolly-chapter relative bg-black"
      style={homeChapterStyle(HOME_CHAPTER_VIDEO_SECONDS.firstAscent)}
      aria-label="Sky terrace arrival"
    >
      <HomeFilmStage videoRef={videoRef} src={videoSrc}>
        <EditorialMilestone beat={beat} beats={BEATS} />
        <div
          className={`home-overlay absolute inset-0 z-30 mx-auto flex w-full max-w-6xl items-center justify-center px-4 md:px-10 ${
            revealed ? "is-revealed pointer-events-auto" : "pointer-events-none"
          }`}
        >
          <AscentCardGrid>
            {SERVICES.map((service, index) => {
              const Icon = service.icon;
              return (
                <AscentCard
                  key={service.id}
                  href={service.href}
                  index={index + 1}
                  title={service.label}
                  icon={<Icon strokeWidth={1.15} />}
                  revealed={revealed}
                  revealDelay={index * 0.07}
                />
              );
            })}
          </AscentCardGrid>
        </div>
      </HomeFilmStage>
    </section>
  );
}
