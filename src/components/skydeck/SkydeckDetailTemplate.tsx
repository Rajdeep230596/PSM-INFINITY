import Link from "next/link";

import { SKYDECK_FIND_US_HREF, SKYDECK_SPACES, type SkydeckSpace } from "@/content/skydeck";

export function SkydeckDetailTemplate({ page }: { page: SkydeckSpace }) {
  return (
    <div className="first-ascent first-ascent-flush relative min-h-screen w-full text-neutral-100">
      <img
        src={page.image}
        alt={`${page.tag} — ${page.blurb}`}
        className="absolute inset-0 h-full w-full object-cover object-center"
      />

      <div className="relative z-10 mx-auto flex min-h-screen w-full max-w-7xl flex-col justify-end px-6 pb-16 pt-[calc(var(--header)+32px)] sm:px-8 md:px-16 md:pb-24 lg:px-20">
        <header className="max-w-3xl">
          <p className="mb-3 font-mono text-[11px] tracking-[0.4em] text-amber-300 uppercase">
            Level Three / Skydeck / {page.code}
          </p>
          <h1 className="font-serif text-4xl leading-[1.08] font-light tracking-tight text-white uppercase md:text-6xl lg:text-7xl">
            {page.heading}
          </h1>
          <p className="mt-4 font-mono text-[10px] tracking-[0.28em] text-amber-200 uppercase md:text-[11px]">
            {page.blurb}
          </p>
          <p className="mt-5 max-w-xl font-sans text-sm leading-relaxed font-light text-neutral-100 md:text-base">
            {page.subhead}
          </p>
        </header>
      </div>

      <div className="relative z-10 mx-auto w-full max-w-7xl px-6 pb-20 sm:px-8 md:px-16 lg:px-20">
        <nav className="mb-12 flex flex-wrap items-center gap-2" aria-label="Skydeck rooms">
          {SKYDECK_SPACES.map((item) => {
            const active = item.slug === page.slug;
            return (
              <Link
                key={item.slug}
                href={`/skydeck/${item.slug}`}
                prefetch={true}
                className={
                  active
                    ? "rounded-full bg-[#E8D8C8] px-4 py-2 font-mono text-[10px] tracking-[0.18em] text-black uppercase shadow-sm"
                    : "rounded-full border border-white/25 bg-black/35 px-4 py-2 font-mono text-[10px] tracking-[0.18em] text-white uppercase transition-colors duration-300 hover:border-amber-300/60 hover:text-amber-100"
                }
              >
                {item.tag}
              </Link>
            );
          })}
        </nav>

        <section className="border-y border-white/20 py-12 md:py-16">
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {page.pillars.map((pillar, index) => (
              <div key={pillar.title} className="flex flex-col">
                <span className="mb-3 font-mono text-[9px] tracking-[0.25em] text-amber-300 uppercase">
                  0{index + 1} / Room
                </span>
                <h2 className="mb-2 font-serif text-base font-normal text-white">{pillar.title}</h2>
                <p className="text-xs leading-relaxed font-light text-neutral-200">{pillar.body}</p>
              </div>
            ))}
          </div>
        </section>

        <div className="flex justify-start pt-12 md:justify-center">
          <a
            href={SKYDECK_FIND_US_HREF}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-full bg-[#E8D8C8] px-8 py-3.5 text-xs font-semibold tracking-tight text-black transition-colors hover:bg-white"
          >
            Find us Here ↗
          </a>
        </div>
      </div>
    </div>
  );
}
