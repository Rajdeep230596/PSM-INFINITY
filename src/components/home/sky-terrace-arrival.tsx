"use client";

import { useGSAP } from "@gsap/react";
import { motion } from "framer-motion";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Car, Globe, House, Ship } from "lucide-react";
import Link from "next/link";
import { useRef, useState } from "react";

import { EditorialMilestone, activeBeat, type EditorialBeat } from "@/components/home/editorial-milestone";
import { markVideoReady, useDeferredVideoSource } from "@/lib/deferred-video";
import { HOME_CHAPTER_VIDEO_SECONDS, HOME_SCROLL_SCRUB, HOME_VIDEO, HOME_VIDEO_SMOOTHING, homeChapterStyle } from "@/lib/home-scroll";
import { prefersReducedMotion } from "@/lib/media-capability";
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
  const videoSrc = useDeferredVideoSource(sectionRef, HOME_VIDEO.skyTerrace, { eager: true });
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
        video.loop = true;
        video.muted = true;
        video.playsInline = true;
        video.disablePictureInPicture = true;
        video.setAttribute("playsinline", "");
        video.setAttribute("webkit-playsinline", "");
        const onReady = () => markVideoReady(video);
        video.addEventListener("canplay", onReady);
        if (video.readyState >= 3) onReady();
        const play = video.play();
        if (play && typeof play.then === "function") play.catch(() => {});
        return bindNavYield(() => {
          video.pause();
          video.removeEventListener("canplay", onReady);
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
      <div className="sticky top-0 flex h-screen w-full items-center justify-center overflow-hidden gpu-layer">
        <video
          ref={videoRef}
          src={videoSrc}
          muted
          playsInline
          disablePictureInPicture
          preload={videoSrc ? "metadata" : "none"}
          className="gpu-media absolute inset-0 h-full w-full object-cover"
        />
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-black/35" />

        <EditorialMilestone beat={beat} />

        <div
          className={`relative z-30 mx-auto flex w-full max-w-6xl items-center justify-center px-6 md:px-10 ${
            revealed ? "pointer-events-auto" : "pointer-events-none"
          }`}
        >
          <div className="grid w-full grid-cols-2 gap-4 md:gap-6 lg:grid-cols-4 lg:gap-8">
            {SERVICES.map((service, index) => {
              const Icon = service.icon;
              return (
                <motion.div
                  key={service.id}
                  className="gpu-surface"
                  initial={false}
                  animate={
                    revealed ? { opacity: 1, y: 0, scale: 1 } : { opacity: 0, y: 28, scale: 0.96 }
                  }
                  transition={{
                    duration: 0.7,
                    delay: revealed ? index * 0.08 : 0,
                    ease: [0.22, 1, 0.36, 1],
                  }}
                >
                  <Link
                    href={service.href}
                    prefetch={true}
                    className="group flex aspect-square flex-col items-center justify-center gap-5 rounded-[1.75rem] border border-white/25 bg-white/12 px-4 text-center shadow-[0_8px_40px_rgba(0,0,0,0.18)] backdrop-blur-2xl transition-colors duration-300 hover:border-white/40 hover:bg-white/18 md:rounded-[2rem]"
                  >
                    <Icon
                      size={36}
                      strokeWidth={1.15}
                      className="text-white transition-transform duration-500 group-hover:scale-105"
                    />
                    <span className="max-w-[9rem] text-[13px] font-light tracking-wide text-white md:text-sm">
                      {service.label}
                    </span>
                  </Link>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
