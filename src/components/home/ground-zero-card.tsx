"use client";

import { motion } from "framer-motion";
import type { ReactNode } from "react";
import Link from "next/link";

const iconClass = "h-12 w-12";

function CoutureGownIcon() {
  return (
    <svg className={iconClass} viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M19 7c0-2.2 2-4.2 5-4.2S29 4.8 29 7" />
      <path d="M19 7h10" />
      <path d="M21 7v8.5L15 22l4.5 18.5h9L33 22l-6-6.5V7" />
      <path d="M16.2 21.5c3.8 2.2 11.8 2.2 15.6 0" />
      <path d="M20 30c2.4 3.6 5.6 3.6 8 0" />
    </svg>
  );
}

function PavilionIcon() {
  return (
    <svg className={iconClass} viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M8 20h32" />
      <path d="M10 20 24 10l14 10" />
      <path d="M10 20v16M38 20v16" />
      <path d="M6 36h36" />
      <path d="M12 36v5h24v-5" />
      <path d="M18 20v16M24 20v16M30 20v16" />
      <path d="M21 28h6v8h-6z" />
    </svg>
  );
}

function CypressTerraceIcon() {
  return (
    <svg className={iconClass} viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M18 40V16" />
      <path d="M18 8c-4 3.2-6.5 8.2-6.5 13.2 0 4.4 2.6 7.6 6.5 9.8 3.9-2.2 6.5-5.4 6.5-9.8C24.5 16.2 22 11.2 18 8z" />
      <path d="M6 40h36" />
      <path d="M28 40V27h14v13" />
      <path d="M28 33.5h14" />
    </svg>
  );
}

function CalibreChassisIcon() {
  return (
    <svg className={iconClass} viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <circle cx="17" cy="16" r="9" />
      <circle cx="17" cy="16" r="1.6" />
      <path d="M17 9.5V16l4.2 2.2" />
      <path d="M17 8.2v1.4M25.2 16h-1.4M17 23.8v-1.4M8.8 16h1.4" />
      <path d="M13.5 6.4h7M13.5 25.6h7" />
      <path d="M22 33h18.5l2.8 5.4H20.2L22 33z" />
      <path d="M25.5 33l2.8-5h8.4l2.8 5" />
      <circle cx="26.2" cy="39.2" r="1.5" />
      <circle cx="38.4" cy="39.2" r="1.5" />
    </svg>
  );
}

export type GroundZeroCardData = {
  id: string;
  eyebrow: string;
  title: string;
  description: string;
  href: string;
  actionLabel: string;
  icon: ReactNode;
};

export const GROUND_ZERO_CARDS: GroundZeroCardData[] = [
  {
    id: "shopping",
    eyebrow: "01 / Atelier",
    title: "Personal Haute Couture",
    description: "Private salon appointments, archive runway acquisitions, and bespoke wardrobe styling.",
    href: "/ground-zero/shopping",
    actionLabel: "Enter Atelier",
    icon: <CoutureGownIcon />,
  },
  {
    id: "real-estate",
    eyebrow: "02 / Sanctuary",
    title: "Real Estate Portfolios",
    description: "Prime architectural estates, private duplexes, and off-market residential holdings.",
    href: "/ground-zero/real-estate",
    actionLabel: "View Portfolios",
    icon: <PavilionIcon />,
  },
  {
    id: "landscaping",
    eyebrow: "03 / Botanical",
    title: "Landscaping Masterplans",
    description: "Curated estate grounds, botanical gardens, and seamless indoor-outdoor living.",
    href: "/ground-zero/landscaping",
    actionLabel: "Commission Grounds",
    icon: <CypressTerraceIcon />,
  },
  {
    id: "collectibles",
    eyebrow: "04 / Calibre & Chassis",
    title: "Curated Collectibles",
    description: "Grand complication timepieces paired with bespoke hypercars and rare automotive chassis.",
    href: "/ground-zero/collectibles",
    actionLabel: "Acquire Calibre & Fleet",
    icon: <CalibreChassisIcon />,
  },
];

export function GroundZeroCard({
  card,
  revealed,
  index,
}: {
  card: GroundZeroCardData;
  revealed: boolean;
  index: number;
}) {
  return (
    <motion.div
      initial={false}
      animate={revealed ? { opacity: 1, y: 0 } : { opacity: 0, y: 35 }}
      transition={{
        duration: 0.7,
        delay: revealed ? index * 0.12 : 0,
        ease: [0.16, 1, 0.3, 1],
      }}
      className="gz-card-slide"
    >
      <Link href={card.href} prefetch={true} className="group block h-full w-full select-none focus:outline-none">
        <article className="gz-card-face relative flex w-full flex-col items-center justify-between overflow-hidden rounded-[2rem] border border-white/[0.08] bg-[#0B0B0E]/60 px-6 pt-10 pb-7 text-center shadow-[0_12px_40px_rgba(0,0,0,0.6),inset_0_1px_1px_rgba(255,255,255,0.12)] backdrop-blur-3xl transition-all duration-700 ease-out hover:border-amber-300/40 hover:bg-[#111116]/80 hover:shadow-[0_20px_50px_rgba(232,216,200,0.15),inset_0_0_20px_rgba(232,216,200,0.08)] sm:px-7">
          <div className="pointer-events-none absolute inset-x-0 top-0 h-44 rounded-t-[2rem] bg-gradient-to-b from-amber-500/[0.06] via-transparent to-transparent" />

          <div className="relative z-10 flex flex-col items-center">
            <div className="flex h-24 w-24 items-center justify-center rounded-3xl border border-amber-300/20 bg-white/[0.03] text-amber-200/90 shadow-[0_0_24px_rgba(232,216,200,0.1)] transition-all duration-500 group-hover:scale-105 group-hover:border-amber-300/50 group-hover:text-amber-100 group-hover:shadow-[0_0_32px_rgba(232,216,200,0.22)] sm:h-28 sm:w-28">
              {card.icon}
            </div>
            <span className="mt-7 block font-mono text-[10px] tracking-[0.32em] text-amber-300/75 uppercase">
              {card.eyebrow}
            </span>
          </div>

          <div className="relative z-10 my-auto py-3">
            <h3 className="font-serif text-xl leading-snug font-light tracking-tight text-white transition-colors group-hover:text-[#F7F2EC] sm:text-2xl">
              {card.title}
            </h3>
            <p className="mx-auto mt-3 max-w-[230px] text-xs leading-relaxed font-light text-neutral-400 transition-colors group-hover:text-neutral-300 sm:text-sm">
              {card.description}
            </p>
          </div>

          <div className="relative z-10 mt-auto flex w-full items-center justify-center border-t border-white/[0.08] pt-4">
            <span className="inline-flex items-center justify-center gap-2.5 rounded-full border border-white/[0.12] bg-white/[0.05] px-5 py-2 text-neutral-200 shadow-sm transition-all duration-300 group-hover:border-amber-300/40 group-hover:bg-[#E8D8C8] group-hover:text-black sm:px-6">
              <span className="text-center font-mono text-[10px] font-medium tracking-[0.16em] whitespace-nowrap uppercase sm:text-[11px] sm:tracking-[0.2em]">
                {card.actionLabel}
              </span>
              <span className="text-xs transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5">↗</span>
            </span>
          </div>
        </article>
      </Link>
    </motion.div>
  );
}
