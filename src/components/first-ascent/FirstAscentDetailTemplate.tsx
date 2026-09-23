"use client";

import dynamic from "next/dynamic";
import Link from "next/link";
import { useEffect, useState } from "react";

import type { FirstAscentPageContent } from "@/content/first-ascent";
import { FIRST_ASCENT_LINKS } from "@/content/first-ascent";
import { enquireWhatsApp, openWhatsApp } from "@/lib/constants";

const BespokeConciergeDesk = dynamic(
  () => import("@/components/first-ascent/BespokeConciergeDesk").then((module) => module.BespokeConciergeDesk),
  { ssr: false },
);

export function FirstAscentDetailTemplate({ page }: { page: FirstAscentPageContent }) {
  useEffect(() => {
    document.documentElement.classList.add("first-ascent-page");
    return () => document.documentElement.classList.remove("first-ascent-page");
  }, []);

  const openDesk = (brief?: string) => {
    openWhatsApp(
      brief
        ? `Hello PSM Infinity Concierge, I would like to inquire about the allocation: "${brief}" in First Ascent / ${page.heading}.`
        : `Hello PSM Infinity Concierge, I would like to inquire about First Ascent: ${page.heading}. ${page.cta}.`,
    );
  };

  const gridClass = page.fleet.length > 3 ? "fa-card-grid is-quad" : "fa-card-grid is-trio";

  return (
    <div className="first-ascent first-ascent-editorial min-h-screen w-full bg-[#0A0A0B] text-neutral-100 selection:bg-amber-500/20">
      <div className="fa-shell">
      <header className="fa-hero flex flex-col items-center text-center">
        <div className="mb-6 flex flex-wrap items-center justify-center gap-3">
          <span className="inline-flex items-center gap-1.5 rounded-full border border-rose-500/25 bg-rose-500/10 px-3 py-1 font-mono text-[10px] tracking-widest text-rose-300 uppercase">
            <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-rose-400" />
            Global Allocation Active
          </span>
          <span className="font-mono text-[10px] tracking-[0.3em] text-neutral-500 uppercase">
            First Ascent / {page.code}
          </span>
        </div>
        <h1 className="mx-auto mb-8 max-w-4xl font-serif text-4xl leading-[1.1] font-light tracking-tight text-[#F5F2EC] sm:text-5xl md:text-6xl lg:text-7xl">
          {page.heading}
        </h1>
        <p className="fa-lede mx-auto mb-12 max-w-2xl font-sans text-sm leading-relaxed font-light text-neutral-400 md:text-base">
          {page.subhead}
        </p>
        <nav className="flex flex-wrap items-center justify-center gap-3 pt-2" aria-label="First Ascent desks">
          {FIRST_ASCENT_LINKS.map((item) => {
            const active = item.href.endsWith(page.slug);
            return (
              <Link
                key={item.href}
                href={item.href}
                prefetch={true}
                className={
                  active
                    ? "rounded-full bg-[#E8D8C8] px-5 py-2 text-xs font-medium text-black shadow-sm"
                    : "rounded-full border border-white/[0.08] bg-white/[0.02] px-5 py-2 text-xs font-light text-neutral-400 transition-[transform,opacity,color,background-color,border-color,box-shadow] duration-300 hover:border-white/25 hover:text-white"
                }
              >
                {item.label}
              </Link>
            );
          })}
        </nav>
      </header>

      <section className="fa-pillars">
        <div className="border-y border-white/[0.07] py-12 md:py-16">
          <div className="fa-pillars-grid">
            {page.pillars.map((pillar, index) => (
              <div key={pillar.title} className="flex flex-col">
                <span className="mb-3 font-mono text-[9px] tracking-[0.25em] text-amber-300/70 uppercase">
                  0{index + 1} / Standard
                </span>
                <h2 className="mb-2 font-serif text-base font-normal text-white">{pillar.title}</h2>
                <p className="text-xs leading-relaxed font-light text-neutral-400">{pillar.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <BespokeConciergeDesk slug={page.slug} cta={page.cta} onRequisition={openDesk} />

      <section className="fa-portfolio">
        <div className="mb-10 w-full text-left">
          <span className="mb-2 block font-mono text-[10px] tracking-[0.3em] text-neutral-500 uppercase">
            Acquisition Portfolio
          </span>
          <h2 className="font-serif text-3xl font-light tracking-tight text-white md:text-4xl">Curated Allocations</h2>
        </div>
        <div className={gridClass}>
          {page.fleet.map((asset) => (
            <article
              key={asset.name}
              className="fa-card group overflow-hidden rounded-3xl border border-white/[0.08] bg-[#111113] shadow-xl transition-[transform,opacity,color,background-color,border-color,box-shadow] duration-500 hover:border-amber-400/30"
            >
              <div className="relative aspect-[16/11] w-full overflow-hidden bg-neutral-900">
                <AllocationImage src={asset.image} fallback={asset.fallback} alt={asset.name} />
              </div>
              <div className="flex flex-1 flex-col p-8">
                <div>
                  <div className="mb-4 flex items-center justify-between gap-3">
                    <span className="font-sans text-[10px] tracking-[0.35em] text-[#C5B39A] uppercase">
                      {asset.eyebrow}
                    </span>
                    <span className="rounded-full border border-rose-500/25 bg-rose-500/10 px-2.5 py-0.5 font-mono text-[9px] tracking-wider text-rose-400 uppercase">
                      {asset.status}
                    </span>
                  </div>
                  <h3 className="font-serif text-2xl font-light tracking-tight text-white">{asset.name}</h3>
                  <div className="mt-4 flex items-center justify-between border-y border-white/[0.06] py-3 text-xs font-light text-neutral-400">
                    <span>{asset.spec}</span>
                    <span>{asset.specMeta}</span>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => enquireWhatsApp(asset.name, `First Ascent / ${page.heading}`)}
                  className="fa-card-cta flex items-center justify-center gap-2 rounded-full bg-white px-6 py-3 text-xs font-semibold text-black shadow-md transition-[transform,opacity,color,background-color,border-color,box-shadow] duration-300 hover:bg-neutral-200"
                >
                  <span>Request Allocation</span>
                  <span className="text-xs">↗</span>
                </button>
              </div>
            </article>
          ))}
        </div>
      </section>
      </div>

    </div>
  );
}

function AllocationImage({ src, fallback, alt }: { src: string; fallback: string; alt: string }) {
  const [current, setCurrent] = useState(src);

  useEffect(() => {
    setCurrent(src);
  }, [src]);

  return (
    <img
      src={current}
      alt={alt}
      className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
      onError={() => {
        if (current !== fallback) setCurrent(fallback);
      }}
    />
  );
}
