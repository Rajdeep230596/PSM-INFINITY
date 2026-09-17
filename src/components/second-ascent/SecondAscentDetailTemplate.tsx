import Link from "next/link";

import type { SecondAscentPageContent } from "@/content/second-ascent";
import { SECOND_ASCENT_LINKS } from "@/content/second-ascent";

export function SecondAscentDetailTemplate({ page }: { page: SecondAscentPageContent }) {
  return (
    <div className="first-ascent first-ascent-editorial min-h-screen w-full bg-[#0A0A0B] text-neutral-100">
      <div className="fa-shell">
        <header className="fa-hero flex flex-col items-center text-center">
          <p className="mb-4 font-mono text-[11px] tracking-[0.4em] text-amber-300/80 uppercase">
            Second Ascent / {page.code}
          </p>
          <h1 className="mx-auto mb-8 max-w-4xl font-serif text-4xl leading-[1.1] font-light tracking-tight text-[#F5F2EC] md:text-6xl">
            {page.heading}
          </h1>
          <p className="fa-lede mx-auto mb-12 max-w-2xl font-sans text-sm leading-relaxed font-light text-neutral-400 md:text-base">
            {page.subhead}
          </p>
          <nav className="flex flex-wrap items-center justify-center gap-3 pt-2" aria-label="Second Ascent desks">
            {SECOND_ASCENT_LINKS.map((item) => {
              const active = item.href.endsWith(page.slug);
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  prefetch={true}
                  className={
                    active
                      ? "rounded-full bg-[#E8D8C8] px-5 py-2 text-xs font-medium text-black shadow-sm"
                      : "rounded-full border border-white/[0.08] bg-white/[0.02] px-5 py-2 text-xs font-light text-neutral-400 transition-all duration-300 hover:border-white/25 hover:text-white"
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

        <div className="flex justify-center py-16">
          <Link
            href="/locations#concierge"
            className="inline-flex items-center gap-2 rounded-full bg-[#E8D8C8] px-8 py-3.5 text-xs font-semibold text-black transition-all hover:bg-white"
          >
            {page.cta} ↗
          </Link>
        </div>
      </div>
    </div>
  );
}
