"use client";

import type { ReactNode } from "react";

import { AscentCard } from "@/components/media/ascent-card";

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

function BotanicalFountainIcon() {
  return (
    <svg className={iconClass} viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M24 42c-9 0-16-7.2-16-16C8 17 24 4 24 4s16 13 16 22c0 8.8-7 16-16 16z" />
      <circle cx="24" cy="24" r="6" />
      <path d="M24 18.5V30M18.5 24H29.5" />
      <path d="M24 4v5" />
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
    id: "couture",
    eyebrow: "Atelier",
    title: "Haute Couture & Wardrobes",
    description: "Private salon appointments, archive runway acquisitions, and bespoke designer wardrobe curations.",
    href: "/ground-zero/couture",
    actionLabel: "Enter Atelier",
    icon: <CoutureGownIcon />,
  },
  {
    id: "real-estate",
    eyebrow: "Sanctuary",
    title: "Real Estate Portfolios",
    description: "Prime architectural estates, private duplexes, and off-market prime residential holdings globally.",
    href: "/ground-zero/real-estate",
    actionLabel: "View Portfolios",
    icon: <PavilionIcon />,
  },
  {
    id: "gardens",
    eyebrow: "Botanical",
    title: "Private Botanical Gardens",
    description: "Manicured grand emerald lawns, private sculpted groves, water sanctuaries, and curated flora.",
    href: "/ground-zero/gardens",
    actionLabel: "Explore Gardens",
    icon: <BotanicalFountainIcon />,
  },
  {
    id: "collectibles",
    eyebrow: "Calibre & Chassis",
    title: "Curated Collectibles",
    description: "Ultra-rare horological masterworks paired with bespoke hypercars and limited coachbuilt chassis.",
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
    <AscentCard
      rich
      href={card.href}
      index={index + 1}
      title={card.title}
      eyebrow={card.eyebrow}
      description={card.description}
      action={card.actionLabel}
      icon={card.icon}
      revealed={revealed}
      revealDelay={index * 0.07}
    />
  );
}
