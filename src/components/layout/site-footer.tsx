import Link from "next/link";

import {
  FOOTER_DOMAINS,
  FOOTER_MANIFESTO,
  FOOTER_SOCIALS,
  site,
} from "@/content/site";

export function SiteFooter() {
  const year = new Date().getFullYear();

  return (
    <footer className="site-footer relative overflow-hidden border-t border-white/[0.08] bg-[#08080A] pt-20! pb-12! text-neutral-300">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute top-0 left-1/2 h-24 w-3/4 -translate-x-1/2 bg-gradient-to-b from-[#C5A880]/[0.06] to-transparent blur-3xl"
      />

      <div className="relative z-10 mx-auto max-w-7xl px-6! sm:px-8!">
        <div className="grid grid-cols-1 gap-12 border-b border-white/[0.06] pb-16! lg:grid-cols-12 lg:gap-8">
          <div className="flex flex-col justify-between lg:col-span-5">
            <div>
              <div className="mb-4! flex items-center gap-3">
                <span className="h-px w-6 bg-[#C5A880]" />
                <span className="font-mono text-[10px] tracking-[0.35em] text-[#C5A880] uppercase">
                  {FOOTER_MANIFESTO.eyebrow}
                </span>
              </div>
              <h3 className="font-serif text-2xl leading-snug font-light tracking-tight text-white sm:text-3xl">
                {FOOTER_MANIFESTO.titleLead}{" "}
                <span className="font-sans font-extralight text-neutral-500">—</span>
                <br />
                <span className="font-serif text-neutral-300 italic">{FOOTER_MANIFESTO.titleAccent}</span>
              </h3>
              <p className="mt-2! mb-6! font-serif text-sm text-[#C5A880] italic">{FOOTER_MANIFESTO.tagline}</p>
              {FOOTER_MANIFESTO.paragraphs.map((paragraph, index) => (
                <p
                  key={paragraph}
                  className={`${index === 0 ? "" : "mt-4! "}max-w-md font-sans text-xs font-light leading-relaxed text-neutral-400 sm:text-sm`}
                >
                  {paragraph}
                </p>
              ))}
            </div>

            <div className="mt-8! border-t border-white/[0.06] pt-6!">
              <p className="font-serif text-xs text-neutral-400 italic">{FOOTER_MANIFESTO.signoff}</p>
              <p className="mt-1! font-mono text-xs tracking-wider text-[#C5A880]/80 uppercase">
                {FOOTER_MANIFESTO.pledge}
              </p>
            </div>
          </div>

          <nav className="lg:col-span-3 lg:pl-6!" aria-label="Domains and ascents">
            <span className="mb-6! block font-mono text-[10px] tracking-[0.3em] text-[#C5A880] uppercase">
              Domains & Ascents
            </span>
            <ul className="space-y-3! font-sans text-xs font-light text-neutral-300">
              {FOOTER_DOMAINS.map((item, index) => (
                <li key={item.href} className={index === 5 ? "pt-2!" : undefined}>
                  <Link
                    href={item.href}
                    prefetch={true}
                    className="transition-colors hover:text-[#C5A880]"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div className="flex flex-col justify-between lg:col-span-4">
            <div>
              <span className="mb-6! block font-mono text-[10px] tracking-[0.3em] text-[#C5A880] uppercase">
                Concierge Communications
              </span>

              <div className="space-y-4!">
                <div className="rounded-xl border border-white/[0.06] bg-white/[0.02] p-4! transition-all hover:border-[#C5A880]/30">
                  <span className="mb-1! block font-mono text-[10px] tracking-widest text-neutral-400 uppercase">
                    WhatsApp Business (Priority Desk)
                  </span>
                  <a
                    href={site.whatsappHref}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-between font-mono text-sm text-white transition-colors hover:text-[#C5A880]"
                  >
                    <span>{site.whatsappDisplay}</span>
                    <span className="text-xs" aria-hidden="true">
                      ↗
                    </span>
                  </a>
                </div>

                <div className="rounded-xl border border-white/[0.06] bg-white/[0.02] p-4! transition-all hover:border-[#C5A880]/30">
                  <span className="mb-1! block font-mono text-[10px] tracking-widest text-neutral-400 uppercase">
                    Direct Line (Personal)
                  </span>
                  <a
                    href={`tel:${site.phoneTel}`}
                    className="flex items-center justify-between font-mono text-sm text-white transition-colors hover:text-[#C5A880]"
                  >
                    <span>{site.phoneDisplay}</span>
                    <span className="text-xs" aria-hidden="true">
                      ↗
                    </span>
                  </a>
                </div>

                <div className="rounded-xl border border-white/[0.06] bg-white/[0.02] p-4! transition-all hover:border-[#C5A880]/30">
                  <span className="mb-1! block font-mono text-[10px] tracking-widest text-neutral-400 uppercase">
                    Private Correspondence
                  </span>
                  <div className="mt-2! flex flex-col gap-1.5">
                    <a
                      href={`mailto:${site.email}`}
                      className="font-mono text-xs text-neutral-300 transition-colors hover:text-[#C5A880]"
                    >
                      {site.email}
                    </a>
                    <a
                      href={`mailto:${site.emailIndia}`}
                      className="font-mono text-xs text-neutral-300 transition-colors hover:text-[#C5A880]"
                    >
                      {site.emailIndia}
                    </a>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-4!">
              <a
                href={site.telegramHref}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 font-mono text-xs tracking-wider text-[#C5A880] uppercase transition-colors hover:text-white"
              >
                <span>Telegram Desk: {site.telegramHandle}</span>
                <span aria-hidden="true">↗</span>
              </a>
            </div>
          </div>
        </div>

        <div className="flex flex-col items-center justify-between gap-6 pt-8! md:flex-row">
          <div className="flex flex-wrap items-center justify-center gap-6 font-mono text-xs tracking-wider uppercase">
            {FOOTER_SOCIALS.map((channel) => (
              <a
                key={channel.label}
                href={channel.href}
                target="_blank"
                rel="noopener noreferrer"
                className="text-neutral-400 transition-colors hover:text-[#C5A880]"
              >
                {channel.label}
              </a>
            ))}
          </div>

          <div className="text-center md:text-right">
            <p className="font-mono text-[11px] tracking-widest text-neutral-500 uppercase">
              © {year} PSM INFINITY. All Rights Reserved.
            </p>
            <p className="mt-1! font-mono text-[10px] tracking-wider text-neutral-600">
              Discreet Bespoke Concierge Protocols
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
