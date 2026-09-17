"use client";

import { useGSAP } from "@gsap/react";
import { motion } from "framer-motion";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Car, Globe, House, Ship } from "lucide-react";
import Link from "next/link";
import { useRef, useState } from "react";

import { EditorialMilestone, activeBeat, type EditorialBeat } from "@/components/home/editorial-milestone";
import { useDeferredVideoSource } from "@/lib/deferred-video";
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
  const [progress, setProgress] = useState(0);
  const videoSrc = useDeferredVideoSource(sectionRef, "/videos/sky-terrace-arrival.mp4");
  const revealed = progress >= 0.72;
  const { beat } = activeBeat(revealed ? 1.1 : progress, BEATS);

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
      id="first-ascent-arrival"
      className="relative h-[350vh] bg-black"
      aria-label="Sky terrace arrival"
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
