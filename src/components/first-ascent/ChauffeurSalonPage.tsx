"use client";

import { motion } from "framer-motion";
import { Car, Plane, Shield } from "lucide-react";
import Link from "next/link";

import {
  CHAUFFEUR_DOSSIER,
  CHAUFFEUR_FLEET,
  CHAUFFEUR_HERO,
  CHAUFFEUR_LOUNGE,
  CHAUFFEUR_STRIP,
  CHAUFFEUR_TIERS,
} from "@/content/chauffeur";
import { FIRST_ASCENT_LINKS } from "@/content/first-ascent";
import { openWhatsApp } from "@/lib/constants";

const DESK = "On-Demand & Armored Mobility";

const TIER_ICONS = {
  shield: Shield,
  car: Car,
  plane: Plane,
} as const;

function openWhatsAppEnquiry(name: string, desk = DESK) {
  openWhatsApp(
    `Hello PSM Infinity, I would like to enquire about the ${desk} allocation: ${name}.`,
  );
}

export function ChauffeurSalonPage() {
  return (
    <div className="chauffeur-salon first-ascent first-ascent-flush min-h-screen w-full bg-[#070709] text-neutral-100 selection:bg-[#C5A880]/30">
      <section className="relative mx-auto max-w-7xl px-6! pt-32! pb-24!">
        <nav className="mb-10! flex flex-wrap items-center justify-center gap-3" aria-label="First Ascent desks">
          {FIRST_ASCENT_LINKS.map((item) => {
            const active = item.href.endsWith("chauffeur");
            return (
              <Link
                key={item.href}
                href={item.href}
                prefetch={true}
                className={
                  active
                    ? "rounded-full bg-[#C5A880] px-5! py-2! font-mono text-[10px] tracking-[0.22em] text-black uppercase"
                    : "rounded-full border border-white/[0.08] bg-white/[0.02] px-5! py-2! font-mono text-[10px] tracking-[0.22em] text-neutral-400 uppercase transition-colors hover:border-[#C5A880]/40 hover:text-white"
                }
              >
                {item.label}
              </Link>
            );
          })}
        </nav>

        <div className="grid grid-cols-1 items-end gap-6 lg:grid-cols-12 lg:gap-5">
          <motion.aside
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="relative flex min-h-[480px] flex-col items-center justify-center overflow-hidden rounded-t-[140px] border-x-2 border-t-2 border-[#C5A880]/30 bg-gradient-to-b from-white/[0.02] to-transparent p-8! text-center lg:col-span-3 lg:min-h-[580px]"
          >
            <img
              src={CHAUFFEUR_DOSSIER.atmosphere}
              alt=""
              aria-hidden="true"
              className="pointer-events-none absolute inset-0 h-full w-full object-cover opacity-[0.18]"
            />
            <div className="absolute inset-0 bg-gradient-to-b from-[#070709]/40 via-[#070709]/75 to-[#070709]" />
            <div className="relative z-10">
              <p className="mb-4! font-mono text-[10px] tracking-[0.35em] text-[#C5A880] uppercase">
                {CHAUFFEUR_HERO.left.eyebrow}
              </p>
              <h1 className="mb-6! font-serif text-3xl leading-tight tracking-wider text-white uppercase md:text-4xl">
                {CHAUFFEUR_HERO.left.headline[0]}
                <br />
                {CHAUFFEUR_HERO.left.headline[1]}
              </h1>
              <button
                type="button"
                onClick={() => openWhatsAppEnquiry("View Armor Specs")}
                className="rounded-full border border-[#C5A880]/50 px-5! py-2! font-mono text-[10px] tracking-[0.28em] text-[#C5A880] uppercase transition-all duration-300 hover:bg-[#C5A880] hover:text-black"
              >
                {CHAUFFEUR_HERO.left.cta}
              </button>
            </div>
          </motion.aside>

          <motion.article
            initial={{ opacity: 0, y: 32 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.08, ease: [0.22, 1, 0.36, 1] }}
            className="relative flex min-h-[560px] flex-col items-center justify-end overflow-hidden rounded-t-[180px] border-2 border-[#C5A880]/60 p-8! shadow-[0_0_60px_rgba(197,168,128,0.15)] lg:col-span-6 lg:min-h-[660px]"
          >
            <div
              aria-hidden="true"
              className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(197,168,128,0.22),transparent_58%)]"
            />
            <img
              src={CHAUFFEUR_HERO.center.image}
              alt={CHAUFFEUR_HERO.center.imageAlt}
              className="absolute inset-0 h-full w-full object-cover object-[center_70%]"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#070709] via-transparent to-[#070709]/25" />
            <div className="relative z-10 mb-4! flex w-full max-w-sm flex-col items-center">
              <div className="h-3 w-40 rounded-full bg-gradient-to-b from-[#C5A880]/50 to-transparent blur-[2px]" />
              <div className="mt-1! h-2 w-56 rounded-full border border-[#C5A880]/30 bg-[#18181D]" />
              <div className="mt-1! h-1.5 w-72 rounded-full border border-[#C5A880]/20 bg-[#0D0D10]" />
              <p className="mt-4! font-mono text-[10px] tracking-[0.35em] text-[#C5A880] uppercase">
                First Ascent / 04
              </p>
            </div>
          </motion.article>

          <motion.aside
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.12, ease: [0.22, 1, 0.36, 1] }}
            className="flex min-h-[480px] flex-col items-center justify-center rounded-t-[140px] border-x-2 border-t-2 border-[#C5A880]/30 bg-gradient-to-b from-white/[0.02] to-transparent p-8! text-center lg:col-span-3 lg:min-h-[580px]"
          >
            <p className="mb-4! font-mono text-[10px] tracking-[0.35em] text-[#C5A880] uppercase">
              {CHAUFFEUR_HERO.right.eyebrow}
            </p>
            <h2 className="mb-6! font-serif text-3xl leading-tight tracking-wider text-white uppercase md:text-4xl">
              {CHAUFFEUR_HERO.right.headline[0]}
              <br />
              {CHAUFFEUR_HERO.right.headline[1]}
            </h2>
            <button
              type="button"
              onClick={() => openWhatsAppEnquiry("Reserve Convoy")}
              className="rounded-full border border-[#C5A880]/50 px-5! py-2! font-mono text-[10px] tracking-[0.28em] text-[#C5A880] uppercase transition-all duration-300 hover:bg-[#C5A880] hover:text-black"
            >
              {CHAUFFEUR_HERO.right.cta}
            </button>
          </motion.aside>
        </div>
      </section>

      <p className="my-16! border-y border-white/[0.08] py-4! text-center font-mono text-[11px] tracking-[0.35em] text-[#C5A880] uppercase">
        {CHAUFFEUR_STRIP}
      </p>

      <section className="mx-auto mb-28! grid max-w-7xl grid-cols-1 gap-8 px-6! md:grid-cols-3">
        {CHAUFFEUR_FLEET.map((vehicle) => (
          <article
            key={vehicle.id}
            className="group relative flex min-h-[540px] flex-col items-center justify-between rounded-3xl border border-white/[0.08] bg-gradient-to-b from-[#131317] to-[#0A0A0C] p-8! text-center transition-all duration-500 hover:border-[#C5A880]/50"
          >
            <div className="pointer-events-none absolute inset-3" aria-hidden="true">
              <span className="absolute top-0 left-0 h-4 w-4 border-t border-l border-[#C5A880]/50" />
              <span className="absolute top-0 right-0 h-4 w-4 border-t border-r border-[#C5A880]/50" />
              <span className="absolute bottom-0 left-0 h-4 w-4 border-b border-l border-[#C5A880]/50" />
              <span className="absolute right-0 bottom-0 h-4 w-4 border-r border-b border-[#C5A880]/50" />
            </div>
            <div className="absolute top-6 left-6 flex h-8 w-8 items-center justify-center rounded-full border border-[#C5A880] bg-black/60 font-mono text-xs text-[#C5A880] shadow-[0_0_12px_rgba(197,168,128,0.3)]">
              {vehicle.index}
            </div>

            <div className="relative my-6! flex h-[260px] w-full items-center justify-center">
              <div
                aria-hidden="true"
                className="absolute bottom-4 left-1/2 h-28 w-48 -translate-x-1/2 rounded-[100%] bg-[radial-gradient(ellipse_at_center,rgba(197,168,128,0.38),transparent_70%)] blur-md"
              />
              <img
                src={vehicle.image}
                alt={vehicle.imageAlt}
                className="relative z-10 h-full w-full object-contain object-center"
              />
            </div>

            <div className="w-full">
              <p className="mb-2! font-mono text-[10px] tracking-[0.25em] text-neutral-400 uppercase">{vehicle.eyebrow}</p>
              <h3 className="mb-2! font-serif text-2xl tracking-tight text-white">{vehicle.title}</h3>
              <p className="mb-6! font-sans text-xs font-light leading-relaxed text-neutral-400">{vehicle.spec}</p>
              <div className="flex w-full items-center justify-between border-t border-white/[0.08] pt-4!">
                <span className="font-mono text-[10px] tracking-widest text-neutral-400 uppercase">Private Dispatch</span>
                <button
                  type="button"
                  onClick={() => openWhatsAppEnquiry(vehicle.title)}
                  className="rounded-full bg-[#C5A880] px-5! py-2! font-mono text-[10px] font-medium tracking-widest text-black uppercase shadow-[0_2px_15px_rgba(197,168,128,0.25)] transition-all duration-300 hover:bg-white"
                >
                  Enquire
                </button>
              </div>
            </div>
          </article>
        ))}
      </section>

      <section className="mx-auto mb-28! max-w-7xl px-6!">
        <div className="mb-10! flex items-center justify-center gap-6">
          <span className="hidden h-px flex-1 bg-white/[0.08] sm:block" />
          <h2 className="font-serif text-2xl tracking-tight text-white uppercase md:text-3xl">Mobility Tiers.</h2>
          <span className="hidden h-px flex-1 bg-white/[0.08] sm:block" />
        </div>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {CHAUFFEUR_TIERS.map((tier) => {
            const Icon = TIER_ICONS[tier.icon];
            return (
              <button
                key={tier.id}
                type="button"
                onClick={() => openWhatsAppEnquiry(tier.label)}
                className="flex h-[180px] flex-col justify-between rounded-2xl border border-white/[0.06] bg-[#101014] p-6! text-left transition-all hover:border-[#C5A880]/30"
              >
                <span className="flex h-11 w-11 items-center justify-center rounded-full border border-[#C5A880]/40 text-[#C5A880] shadow-[0_0_18px_rgba(197,168,128,0.18)]">
                  <Icon size={18} strokeWidth={1.4} />
                </span>
                <span className="font-serif text-lg tracking-tight text-white">{tier.label}</span>
              </button>
            );
          })}

          <article className="group relative h-[180px] overflow-hidden rounded-2xl border border-[#C5A880]/40">
            <img
              src={CHAUFFEUR_LOUNGE.image}
              alt={CHAUFFEUR_LOUNGE.imageAlt}
              className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
            <span className="absolute top-4 left-4 rounded-full border border-[#C5A880]/70 bg-black/50 px-3! py-1! font-mono text-[10px] tracking-[0.22em] text-[#C5A880] uppercase">
              {CHAUFFEUR_LOUNGE.tag}
            </span>
            <button
              type="button"
              onClick={() => openWhatsAppEnquiry(CHAUFFEUR_LOUNGE.title)}
              className="absolute right-4 bottom-4 rounded-full bg-[#C5A880] px-4! py-1.5! font-mono text-[10px] tracking-widest text-black uppercase transition-colors hover:bg-white"
            >
              Enquire
            </button>
          </article>
        </div>
      </section>

      <section className="mx-auto mb-28! grid max-w-7xl grid-cols-1 items-center gap-8 px-6! lg:grid-cols-12">
        <div className="relative overflow-hidden rounded-3xl border border-white/[0.08] bg-gradient-to-b from-[#18181D] to-[#0D0D10] lg:col-span-4">
          <div
            aria-hidden="true"
            className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(197,168,128,0.22),transparent_55%)]"
          />
          <img
            src={CHAUFFEUR_DOSSIER.mascot.image}
            alt={CHAUFFEUR_DOSSIER.mascot.imageAlt}
            className="relative z-10 h-[420px] w-full object-cover lg:h-[520px]"
          />
          <p className="absolute right-4 bottom-4 z-10 font-mono text-[10px] tracking-[0.25em] text-[#C5A880] uppercase">
            {CHAUFFEUR_DOSSIER.mascot.caption}
          </p>
        </div>

        <div className="flex flex-col gap-4 lg:col-span-4">
          {CHAUFFEUR_DOSSIER.specs.map((spec) => (
            <article key={spec.id} className="overflow-hidden rounded-2xl border border-white/[0.08] bg-[#101014]">
              <div className="aspect-[16/9] overflow-hidden">
                <img src={spec.image} alt={spec.imageAlt} className="h-full w-full object-cover" />
              </div>
              <div className="p-4!">
                <p className="mb-1! font-mono text-[10px] tracking-[0.3em] text-[#C5A880] uppercase">{spec.eyebrow}</p>
                <h3 className="font-serif text-lg tracking-tight text-white">{spec.title}</h3>
                <p className="mt-1! font-sans text-xs font-light text-neutral-400">{spec.meta}</p>
              </div>
            </article>
          ))}
        </div>

        <div className="relative overflow-hidden rounded-3xl border border-white/[0.08] bg-gradient-to-b from-[#18181D] to-[#0D0D10] p-8! lg:col-span-4">
          <img
            src={CHAUFFEUR_DOSSIER.atmosphere}
            alt=""
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 h-full w-full object-cover opacity-[0.08]"
          />
          <div className="relative z-10">
            <p className="mb-2! font-mono text-xs tracking-[0.3em] text-[#C5A880] uppercase">Dispatch Protocol</p>
            <p className="mb-6! font-sans text-xs font-light leading-relaxed text-neutral-400">{CHAUFFEUR_DOSSIER.manifesto}</p>
            <div className="flex flex-col gap-3 sm:flex-row sm:flex-wrap">
              <button
                type="button"
                onClick={() => openWhatsAppEnquiry("Manifest Dispatch")}
                className="rounded-full bg-[#C5A880] px-6! py-2.5! font-mono text-xs font-semibold tracking-wider text-black uppercase transition-all hover:bg-white"
              >
                Manifest Dispatch
              </button>
              <button
                type="button"
                onClick={() => openWhatsAppEnquiry("Convoy Security Brief")}
                className="rounded-full border border-white/20 px-6! py-2.5! font-mono text-xs tracking-wider text-white uppercase transition-all hover:border-[#C5A880]"
              >
                Convoy Security Brief
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
