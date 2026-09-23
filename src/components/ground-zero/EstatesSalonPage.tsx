"use client";

import {
  BadgeCheck,
  Building2,
  Fence,
  FileSearch,
  Landmark,
  Mountain,
  Plane,
  Sailboat,
  Shield,
  Square,
  TreePalm,
} from "lucide-react";
import { useState, type FormEvent } from "react";

import {
  ESTATES_CATEGORIES,
  ESTATES_COMMISSIONS,
  ESTATES_HERO,
  ESTATES_JOURNAL,
  ESTATES_PILLARS,
  ESTATES_SPOTLIGHTS,
  ESTATES_TRUST,
} from "@/content/estates";
import { enquireWhatsApp, openWhatsApp } from "@/lib/constants";

const CATEGORY_ICONS = {
  alpine: Mountain,
  coastal: Sailboat,
  sky: Building2,
  historic: Landmark,
  equestrian: Fence,
  islands: TreePalm,
  modernist: Square,
} as const;

const TRUST_ICONS = {
  confidentiality: Shield,
  title: BadgeCheck,
  protocol: Landmark,
} as const;

const PILLAR_ICONS = {
  provenance: BadgeCheck,
  discretion: Shield,
  audits: FileSearch,
  transfers: Plane,
} as const;

export function EstatesSalonPage() {
  const [dispatchNote, setDispatchNote] = useState("");

  const openConcierge = (title: string, category = "Real Estate") => {
    enquireWhatsApp(title, category);
  };

  const submitDispatch = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const mandate = String(data.get("mandate") ?? "").trim();
    if (!mandate) return;
    setDispatchNote("Opening WhatsApp with your asset mandate.");
    openWhatsApp(
      `Hello PSM Infinity Concierge, I would like to inquire about the allocation: "${mandate}" in Real Estate.`,
    );
    event.currentTarget.reset();
  };

  return (
    <div className="estates-salon first-ascent first-ascent-flush min-h-screen w-full bg-[#08080A] text-neutral-100">
      <section className="mx-auto grid max-w-7xl grid-cols-1 items-center gap-8 px-6! pt-36! pb-20! sm:px-8! lg:grid-cols-12">
        <div className="lg:col-span-5">
          <h1 className="mb-4! font-serif text-4xl font-light leading-tight tracking-tight text-white md:text-6xl">
            {ESTATES_HERO.heading}
          </h1>
          <p className="mb-8! max-w-md font-sans text-sm font-light text-neutral-400">{ESTATES_HERO.subhead}</p>
          <button
            type="button"
            onClick={() => openConcierge("Request private folio")}
            className="rounded-full bg-[#C5A880] px-8! py-3! text-xs font-semibold tracking-wider text-black uppercase shadow-[0_4px_20px_rgba(197,168,128,0.25)] transition-all hover:bg-white"
          >
            {ESTATES_HERO.cta} ↗
          </button>
          <ul className="mt-8! flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center sm:gap-5">
            {ESTATES_TRUST.map((item) => {
              const Icon = TRUST_ICONS[item.id];
              return (
                <li key={item.id} className="flex items-center gap-2 text-neutral-400">
                  <Icon size={14} className="text-[#C5A880]" strokeWidth={1.5} />
                  <span className="font-mono text-[10px] tracking-[0.18em] uppercase md:text-[11px]">{item.label}</span>
                </li>
              );
            })}
          </ul>
        </div>

        <div className="relative lg:col-span-7">
          <div
            aria-hidden="true"
            className="absolute top-1/2 left-1/2 h-[120%] w-[90%] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(ellipse_at_center,rgba(197,168,128,0.22),transparent_62%)] blur-2xl"
          />
          <div className="relative overflow-hidden rounded-3xl border border-white/[0.08] bg-[#121215] shadow-[0_24px_80px_rgba(0,0,0,0.45)]">
            <img
              src="/assets/estates/hero-lake-como.jpg"
              alt="Lakeside villa with infinity pool overlooking mountains at dusk"
              className="aspect-video w-full object-cover object-center"
            />
            <div
              aria-hidden="true"
              className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#08080A]/35 via-transparent to-transparent"
            />
          </div>
        </div>
      </section>

      <nav
        id="categories"
        aria-label="Estate categories"
        className="mx-auto mb-20! max-w-7xl overflow-x-auto px-6! sm:px-8!"
      >
        <ul className="flex min-w-max items-start justify-center gap-6 py-2! sm:gap-8 lg:gap-10">
          {ESTATES_CATEGORIES.map((category) => {
            const Icon = CATEGORY_ICONS[category.icon];
            return (
              <li key={category.id} className="flex w-[4.75rem] flex-col items-center text-center sm:w-24">
                <a href={`#${category.id}`} className="group flex cursor-pointer flex-col items-center gap-2.5">
                  <span className="flex h-14 w-14 items-center justify-center rounded-full border border-white/10 bg-white/[0.03] transition-all group-hover:border-[#C5A880]/50 group-hover:bg-white/[0.06]">
                    <Icon size={18} className="text-[#C5A880]" strokeWidth={1.4} />
                  </span>
                  <span className="font-mono text-[9px] leading-tight tracking-[0.16em] text-neutral-400 uppercase group-hover:text-[#F5F2EC] sm:text-[10px]">
                    {category.label}
                  </span>
                </a>
              </li>
            );
          })}
        </ul>
      </nav>

      <section className="mx-auto mb-24! grid max-w-7xl grid-cols-1 gap-6 px-6! md:grid-cols-3">
        {ESTATES_SPOTLIGHTS.map((card) => (
          <article
            key={card.id}
            id={card.id}
            className="relative flex h-[360px] scroll-mt-28 flex-col justify-between overflow-hidden rounded-2xl border border-white/[0.08] bg-[#121215] p-7!"
          >
            <div className="relative z-10 max-w-[190px]">
              <span className="mb-3! inline-block rounded-full border border-[#C5A880]/20 bg-white/[0.06] px-2.5! py-0.5! font-mono text-[9px] tracking-widest text-[#C5A880] uppercase">
                {card.tag}
              </span>
              <h2 className="mb-2! font-serif text-xl font-light tracking-tight text-white">{card.title}</h2>
              <p className="mb-4! max-w-[180px] font-sans text-xs font-light leading-relaxed text-neutral-400">
                {card.body}
              </p>
              <button
                type="button"
                onClick={() => openConcierge(card.title)}
                className="flex items-center gap-1.5 self-start border-0 bg-transparent appearance-none font-mono text-[11px] tracking-wider text-[#C5A880] uppercase transition-colors hover:text-white"
              >
                {card.action} ↗
              </button>
            </div>
            <div className="pointer-events-none absolute right-[-6%] bottom-[-8%] h-[78%] w-[58%]">
              <img
                src={card.image}
                alt={card.imageAlt}
                className="h-full w-full rounded-tl-2xl object-cover object-center shadow-[0_18px_40px_rgba(0,0,0,0.55)]"
              />
            </div>
          </article>
        ))}
      </section>

      <section id="allocations" className="scroll-mt-28">
        <div className="mx-auto mb-8! flex max-w-7xl items-end justify-between px-6!">
          <div>
            <p className="mb-2! font-mono text-[10px] tracking-[0.25em] text-[#C5A880] uppercase md:text-[11px]">
              Acquisition Portfolio
            </p>
            <h2 className="font-serif text-2xl font-light tracking-tight text-[#F5F2EC] md:text-3xl">
              Curated residences
            </h2>
          </div>
          <button
            type="button"
            onClick={() => openConcierge("Request the complete residence folio")}
            className="border-0 bg-transparent appearance-none font-mono text-[10px] tracking-[0.22em] text-neutral-400 uppercase transition-colors hover:text-[#C5A880] md:text-[11px]"
          >
            View All Residences ↗
          </button>
        </div>

        <div
          id="equestrian-manors"
          className="mx-auto mb-28! grid max-w-7xl scroll-mt-28 grid-cols-1 gap-6 px-6! sm:grid-cols-2 lg:grid-cols-4"
        >
          {ESTATES_COMMISSIONS.map((item) => (
            <article
              key={item.id}
              id={
                item.category === "coastal-sanctuaries" || item.category === "alpine-chalets"
                  ? item.category
                  : item.id
              }
              className="flex scroll-mt-28 flex-col justify-between rounded-2xl border border-white/[0.06] bg-[#111114] p-4! transition-all duration-300 hover:border-[#C5A880]/30"
            >
              <div>
                <div className="mb-4! aspect-[4/5] overflow-hidden rounded-xl bg-neutral-900">
                  <img src={item.image} alt={item.imageAlt} className="h-full w-full object-cover object-center" />
                </div>
                <p className="mb-1.5! flex items-center gap-1 font-mono text-[10px] text-[#C5A880]">
                  ★★★★★ {item.rating} · {item.classification}
                </p>
                <h3 className="mb-1! font-serif text-sm font-light text-white">{item.title}</h3>
                <p className="mb-4! font-sans text-xs font-light text-neutral-400">{item.spec}</p>
              </div>
              <div className="flex items-center justify-between border-t border-white/[0.06] pt-3!">
                <span className="font-mono text-[10px] tracking-widest text-neutral-400 uppercase">
                  Private Allocation
                </span>
                <button
                  type="button"
                  onClick={() => openConcierge(item.title)}
                  className="rounded-full bg-[#C5A880] px-4! py-1.5! font-mono text-[11px] tracking-wider text-black uppercase transition-all duration-200 hover:bg-white"
                >
                  Enquire
                </button>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section id="private-islands" className="mx-auto mb-28! max-w-7xl scroll-mt-28 px-6!">
        <div className="relative flex min-h-[300px] items-center justify-between overflow-hidden rounded-3xl border border-white/[0.08] p-10! md:p-16!">
          <img
            src="/assets/estates/editorial-peninsula.jpg"
            alt="Aerial peninsula estate with private harbour at sunset"
            className="absolute inset-0 h-full w-full object-cover"
          />
          <div
            aria-hidden="true"
            className="absolute inset-0 bg-gradient-to-r from-black/88 via-[#08080A]/70 to-black/25"
          />
          <div className="relative z-10 max-w-xl">
            <p className="mb-3! font-mono text-[10px] tracking-[0.25em] text-[#C5A880] uppercase md:text-[11px]">
              Off-Market Inventory · Strict Protocol
            </p>
            <h2 className="mb-4! font-serif text-3xl font-light tracking-tight text-white md:text-4xl">
              Architectural Assets Circulated Only in Confidence.
            </h2>
            <button
              type="button"
              onClick={() => openConcierge("Request NDA access")}
              className="rounded-full bg-[#C5A880] px-6! py-3! text-xs font-semibold tracking-wider text-black uppercase transition-all hover:bg-white"
            >
              Request NDA Access ↗
            </button>
          </div>
        </div>
      </section>

      <section id="journal" className="scroll-mt-28">
        <div className="mx-auto mb-8! flex max-w-7xl items-end justify-between px-6!">
          <div>
            <p className="mb-2! font-mono text-[10px] tracking-[0.25em] text-[#C5A880] uppercase md:text-[11px]">
              Editor&apos;s Picks
            </p>
            <h2 className="font-serif text-2xl font-light tracking-tight text-[#F5F2EC] md:text-3xl">
              Curator&apos;s Journal
            </h2>
          </div>
          <button
            type="button"
            onClick={() => openConcierge("Request the complete curator journal")}
            className="border-0 bg-transparent appearance-none font-mono text-[10px] tracking-[0.22em] text-neutral-400 uppercase transition-colors hover:text-[#C5A880] md:text-[11px]"
          >
            See All Monographs ↗
          </button>
        </div>

        <div className="mx-auto mb-24! grid max-w-7xl grid-cols-1 gap-6 px-6! md:grid-cols-3">
          {ESTATES_JOURNAL.map((entry) => (
            <article
              key={entry.id}
              className="relative flex h-[240px] flex-col justify-between overflow-hidden rounded-2xl border border-white/[0.06] bg-[#121215] p-6!"
            >
              <div className="relative z-10 max-w-[58%]">
                <span className="mb-3! inline-block rounded-full border border-[#C5A880]/20 bg-white/[0.06] px-2.5! py-0.5! font-mono text-[9px] tracking-widest text-[#C5A880] uppercase">
                  {entry.tag}
                </span>
                <h3 className="font-serif text-lg font-light tracking-tight text-white">{entry.title}</h3>
              </div>
              <button
                type="button"
                onClick={() => openConcierge(entry.title)}
                className="relative z-10 flex items-center gap-1.5 self-start border-0 bg-transparent appearance-none font-mono text-[11px] tracking-wider text-[#C5A880] uppercase transition-colors hover:text-white"
              >
                {entry.action} ↗
              </button>
              <div className="pointer-events-none absolute right-0 bottom-0 h-[78%] w-[46%]">
                <img
                  src={entry.image}
                  alt={entry.imageAlt}
                  className="h-full w-full object-cover object-center opacity-80"
                />
                <div
                  aria-hidden="true"
                  className="absolute inset-0 bg-gradient-to-l from-transparent via-[#121215]/10 to-[#121215]"
                />
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="mx-auto mb-16! grid max-w-7xl grid-cols-1 gap-8 px-6! sm:grid-cols-2 lg:grid-cols-4">
        {ESTATES_PILLARS.map((pillar) => {
          const Icon = PILLAR_ICONS[pillar.id];
          return (
            <article key={pillar.id} className="flex items-start gap-3">
              <Icon size={18} className="mt-0.5! shrink-0 text-[#C5A880]" strokeWidth={1.4} />
              <div>
                <h3 className="mb-1! font-serif text-sm font-light tracking-tight text-[#F5F2EC]">{pillar.title}</h3>
                <p className="font-sans text-xs font-light leading-relaxed text-neutral-400 md:text-sm">{pillar.body}</p>
              </div>
            </article>
          );
        })}
      </section>

      <section id="dispatch" className="mx-auto mb-24! max-w-7xl px-6!">
        <form
          onSubmit={submitDispatch}
          className="flex flex-col items-center justify-between gap-6 rounded-2xl border border-white/10 bg-[#121215] p-6! sm:flex-row md:p-8!"
        >
          <div className="w-full sm:max-w-md">
            <p className="mb-1! font-mono text-[10px] tracking-[0.25em] text-[#C5A880] uppercase md:text-[11px]">
              Concierge Dispatch
            </p>
            <p className="font-sans text-xs font-light leading-relaxed text-neutral-400 md:text-sm">
              Name the region, jurisdiction, or asset mandate. A private desk will open protocol.
            </p>
            {dispatchNote ? <p className="mt-2! text-xs text-[#C5A880]">{dispatchNote}</p> : null}
          </div>
          <div className="flex w-full flex-col gap-3 sm:w-auto sm:flex-row sm:items-center">
            <label className="sr-only" htmlFor="estates-mandate">
              Target region, jurisdiction, or asset mandate
            </label>
            <input
              id="estates-mandate"
              name="mandate"
              type="text"
              required
              placeholder="Enter target region, jurisdiction, or asset mandate"
              className="w-full rounded-full border border-white/10 bg-[#08080A] px-5! py-3! font-sans text-sm font-light text-[#F5F2EC] outline-none placeholder:text-neutral-500 focus:border-[#C5A880]/50 sm:w-80"
            />
            <button
              type="submit"
              className="rounded-full bg-[#C5A880] px-8! py-3! text-xs font-semibold tracking-wider text-black uppercase transition-all hover:bg-white"
            >
              Submit Requisition
            </button>
          </div>
        </form>
      </section>
    </div>
  );
}
