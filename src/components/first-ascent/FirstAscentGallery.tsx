"use client";

import { AnimatePresence, motion } from "framer-motion";
import { ArrowUpRight, Calendar, Check, Volume2, VolumeX, X } from "lucide-react";
import { useEffect, useMemo, useRef, useState } from "react";

type AssetCategory = "watches" | "fleet" | "suites" | "estates";

type ShowcaseItem = {
  id: string;
  category: AssetCategory;
  maker: string;
  name: string;
  image: string;
  fallbacks?: string[];
  status: string;
  tags: string[];
};

type CommissionBrief = {
  category: AssetCategory;
  eyebrow: string;
  title: string;
  description: string;
  cta: string;
  placeholder: string;
};

type SourcingIntent = {
  category: AssetCategory;
  reference: string;
  placeholder?: string;
};

const CATEGORIES: { id: AssetCategory; label: string }[] = [
  { id: "watches", label: "Watches" },
  { id: "fleet", label: "Exotic Fleet" },
  { id: "suites", label: "Living Suites" },
  { id: "estates", label: "Estates" },
];

const TIMELINES = ["Air Priority", "Enclosed Sea Freight"] as const;
type Timeline = (typeof TIMELINES)[number];

const LUXURY_IMAGE_FALLBACK =
  "https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=1000&q=85";

const COMMISSIONS: Record<AssetCategory, CommissionBrief> = {
  watches: {
    category: "watches",
    eyebrow: "BESPOKE COMMISSION",
    title: "Any Rare Calibre or Reference",
    description:
      "Have a specific Patek, Rolex, or Richard Mille reference in mind? We source verified, vault-authenticated allocations globally.",
    cta: "Commission Timepiece",
    placeholder: "e.g. Rolex Daytona 126500LN",
  },
  fleet: {
    category: "fleet",
    eyebrow: "CUSTOM ALLOCATION",
    title: "Specific Build or Rare Chassis",
    description:
      "Seeking a bespoke PTS Porsche, rare Ferrari, or hypercar allocation? We manage global negotiation, escrow, and insured air freight.",
    cta: "Commission Vehicle",
    placeholder: "e.g. Porsche Cayenne GTS in Obsidian Black",
  },
  suites: {
    category: "suites",
    eyebrow: "ARCHITECTURAL ATELIER",
    title: "Custom Vault or Private Suite",
    description:
      "Commission custom climate-controlled vaults, biometric dressing suites, and atelier fittings tailored to your space.",
    cta: "Commission Suite",
    placeholder: "e.g. Climate vault with biometric dressing chamber",
  },
  estates: {
    category: "estates",
    eyebrow: "LANDSCAPE CURATION",
    title: "Private Sanctuary Masterplan",
    description:
      "Retain our landscape architects and botanical specialists for estate garden developments and private installations.",
    cta: "Commission Landscape",
    placeholder: "e.g. Japanese courtyard with rare flora, 0.8 acres",
  },
};

const WATCHES: ShowcaseItem[] = [
  {
    id: "patek-grand",
    category: "watches",
    maker: "Patek Philippe",
    name: "Grand Complications",
    image: "https://images.unsplash.com/photo-1539874754764-5a96559165b0?auto=format&fit=crop&w=1400&q=80",
    status: "GLOBAL SOURCING",
    tags: ["Calibre 29-535 PS", "Platinum", "Escrow 9 days"],
  },
  {
    id: "ap-offshore",
    category: "watches",
    maker: "Audemars Piguet",
    name: "Royal Oak Offshore",
    image: "https://images.unsplash.com/photo-1612817159949-195b6eb9e31a?auto=format&fit=crop&w=1400&q=80",
    status: "GLOBAL SOURCING",
    tags: ["Calibre 3126", "Forged carbon", "Escrow 12 days"],
  },
  {
    id: "rolex-daytona",
    category: "watches",
    maker: "Rolex",
    name: "Daytona Cosmograph",
    image: "https://images.unsplash.com/photo-1622434641406-a158123450f9?auto=format&fit=crop&w=1400&q=80",
    status: "GLOBAL SOURCING",
    tags: ["Calibre 4131", "Oystersteel", "Escrow 6 days"],
  },
  {
    id: "rm-67",
    category: "watches",
    maker: "Richard Mille",
    name: "RM 67-02",
    image: "https://images.unsplash.com/photo-1639006570490-79c0c53f1080?auto=format&fit=crop&w=1400&q=80",
    status: "GLOBAL SOURCING",
    tags: ["CRMA7", "Carbon TPT", "Escrow 14 days"],
  },
];

const CARS: ShowcaseItem[] = [
  {
    id: "cayenne-turbo-gt",
    category: "fleet",
    maker: "Porsche",
    name: "Cayenne Turbo GT",
    image: "/assets/1000356071.jpg",
    fallbacks: [
      "/assets/1000356069.jpg",
      "https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=1000&q=85",
    ],
    status: "EXPORT ALLOCATION",
    tags: ["650 hp", "3.3s 0-100", "Deep Blue Metallic"],
  },
  {
    id: "cayenne-gts",
    category: "fleet",
    maker: "Porsche",
    name: "Cayenne GTS",
    image: "/assets/1000356065.jpg",
    fallbacks: [
      "/assets/1000356063.jpg",
      "https://images.unsplash.com/photo-1614162692292-7ac56d7f7f1e?auto=format&fit=crop&w=1000&q=85",
    ],
    status: "AIR FREIGHT READY",
    tags: ["500 hp", "Sport Chrono", "Obsidian Black"],
  },
  {
    id: "cayenne-cockpit",
    category: "fleet",
    maker: "Porsche",
    name: "PCM Sport Plus Cockpit",
    image: "/assets/1000356067.jpg",
    fallbacks: ["https://images.unsplash.com/photo-1580273916550-e323be2ae537?auto=format&fit=crop&w=1000&q=85"],
    status: "BESPOKE CONFIG",
    tags: ["Sport Plus Mode", "Valvetronic", "Air Ride"],
  },
];

const SUITES: ShowcaseItem[] = [
  {
    id: "vitrine-suite",
    category: "suites",
    maker: "Private Living",
    name: "Walk-in Vitrine Suite",
    image: "https://images.unsplash.com/photo-1595428774223-ef52624120d2?auto=format&fit=crop&w=1000&q=85",
    fallbacks: ["https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?auto=format&fit=crop&w=1000&q=85"],
    tags: ["Custom architecture", "White-glove install", "Bespoke joinery"],
    status: "GLOBAL SOURCING",
  },
  {
    id: "couture-vault",
    category: "suites",
    maker: "Private Living",
    name: "Couture Climate Vault",
    image: "https://images.unsplash.com/photo-1616046229478-9901c5536a45?auto=format&fit=crop&w=1000&q=85",
    fallbacks: ["https://images.unsplash.com/photo-1600585154526-990dced4db0d?auto=format&fit=crop&w=1000&q=85"],
    tags: ["Custom architecture", "White-glove install", "Bespoke joinery"],
    status: "GLOBAL SOURCING",
  },
  {
    id: "dressing-chamber",
    category: "suites",
    maker: "Private Living",
    name: "Minimalist Dressing Chamber",
    image: "https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?auto=format&fit=crop&w=1000&q=85",
    fallbacks: ["https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1000&q=85"],
    tags: ["Custom architecture", "White-glove install", "Bespoke joinery"],
    status: "GLOBAL SOURCING",
  },
  {
    id: "lighting-atelier",
    category: "suites",
    maker: "Private Living",
    name: "Bespoke Lighting Atelier",
    image: "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=1000&q=85",
    fallbacks: ["https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?auto=format&fit=crop&w=1000&q=85"],
    tags: ["Custom architecture", "White-glove install", "Bespoke joinery"],
    status: "GLOBAL SOURCING",
  },
];

const ESTATES: ShowcaseItem[] = [
  {
    id: "zen-courtyard",
    category: "estates",
    maker: "Estate Atelier",
    name: "Japanese Zen Courtyard",
    image: "https://images.unsplash.com/photo-1524413840807-0c3cb6fa808d?auto=format&fit=crop&w=1400&q=80",
    tags: ["0.8 acres", "Rare flora", "Landscape architecture"],
    status: "GLOBAL SOURCING",
  },
  {
    id: "botanical-pavilion",
    category: "estates",
    maker: "Estate Atelier",
    name: "Botanical Pavilion",
    image: "https://images.unsplash.com/photo-1416879595882-3373a0480b5b?auto=format&fit=crop&w=1400&q=80",
    tags: ["1.4 acres", "Rare flora", "Landscape architecture"],
    status: "GLOBAL SOURCING",
  },
  {
    id: "water-garden",
    category: "estates",
    maker: "Estate Atelier",
    name: "Sculptural Water Garden",
    image: "https://images.unsplash.com/photo-1433086966358-54859d0ed716?auto=format&fit=crop&w=1400&q=80",
    tags: ["2.1 acres", "Rare flora", "Landscape architecture"],
    status: "GLOBAL SOURCING",
  },
  {
    id: "estate-promenade",
    category: "estates",
    maker: "Estate Atelier",
    name: "Illuminated Promenade",
    image: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=1400&q=80",
    tags: ["3.6 acres", "Rare flora", "Landscape architecture"],
    status: "GLOBAL SOURCING",
  },
];

function phoneValid(value: string) {
  return value.replace(/\D/g, "").length >= 8;
}

function LuxuryImage({
  src,
  fallbacks,
  alt,
}: {
  src: string;
  fallbacks?: string[];
  alt: string;
}) {
  const sources = [src, ...(fallbacks ?? []), LUXURY_IMAGE_FALLBACK].filter(
    (value, index, list) => value && list.indexOf(value) === index,
  );
  const [index, setIndex] = useState(0);
  const imgSrc = sources[Math.min(index, sources.length - 1)];

  return (
    <img
      src={imgSrc}
      alt={alt}
      onError={() => {
        setIndex((current) => (current < sources.length - 1 ? current + 1 : current));
      }}
      className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
    />
  );
}

function StatusBadge({ label }: { label: string }) {
  return (
    <span className="inline-flex items-center gap-1.5 rounded-full border border-rose-500/30 bg-rose-500/15 px-2.5 py-0.5 font-mono text-[9px] font-semibold tracking-wider text-rose-400 uppercase shadow-[0_0_12px_rgba(244,63,94,0.2)]">
      <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-rose-500" />
      {label || "GLOBAL SOURCING"}
    </span>
  );
}

function CommissionCard({
  brief,
  onCommission,
}: {
  brief: CommissionBrief;
  onCommission: (brief: CommissionBrief) => void;
}) {
  return (
    <article className="flex w-[300px] flex-shrink-0 flex-col justify-between rounded-2xl border border-rose-500/30 bg-gradient-to-b from-rose-950/25 via-[#0d0d0f] to-[#0d0d0f] p-6 text-center md:w-[330px]">
      <div className="flex flex-col items-center gap-3">
        <StatusBadge label={brief.eyebrow} />
        <h3 className="text-lg font-light tracking-tight text-white md:text-xl">{brief.title}</h3>
        <p className="text-[12px] leading-relaxed font-light text-neutral-400">{brief.description}</p>
      </div>
      <button
        type="button"
        onClick={() => onCommission(brief)}
        className="fa-dossier-btn mt-6 inline-flex w-full items-center justify-center gap-1.5 rounded-full bg-white py-2.5 text-xs font-semibold !text-black shadow-[0_2px_12px_rgba(255,255,255,0.2)] transition-all hover:bg-neutral-200"
      >
        <span className="font-semibold !text-black">{brief.cta}</span>
        <span className="text-xs font-bold !text-black">↗</span>
      </button>
    </article>
  );
}

function MarqueeCard({
  item,
  onRequest,
}: {
  item: ShowcaseItem;
  onRequest: (item: ShowcaseItem) => void;
}) {
  const [spec1, spec2, spec3] = item.tags;

  return (
    <article className="group flex w-[300px] flex-shrink-0 flex-col overflow-hidden rounded-2xl border border-white/[0.08] bg-[#0d0d0f] transition-all duration-300 hover:border-white/20 md:w-[340px]">
      <div className="relative aspect-[16/10] w-full overflow-hidden bg-neutral-900">
        <LuxuryImage src={item.image} fallbacks={item.fallbacks} alt={`${item.maker} ${item.name}`} />
      </div>

      <div className="flex flex-col items-center justify-between p-5 text-center md:p-6">
        <div className="flex flex-col items-center gap-1.5">
          <span className="text-[9px] font-semibold tracking-[0.22em] text-neutral-400 uppercase">
            {item.maker}
          </span>
          <StatusBadge label={item.status} />
          <h3 className="mt-1 text-base font-light tracking-tight text-white sm:text-lg">{item.name}</h3>
        </div>

        <div className="my-2.5 flex w-full flex-wrap items-center justify-center gap-2 border-y border-white/[0.07] py-2.5 text-[10px] font-light text-neutral-400">
          {spec1 ? <span>{spec1}</span> : null}
          {spec1 && spec2 ? <span className="text-neutral-600">•</span> : null}
          {spec2 ? <span>{spec2}</span> : null}
          {spec2 && spec3 ? <span className="text-neutral-600">•</span> : null}
          {spec3 ? <span>{spec3}</span> : null}
        </div>

        <div className="flex w-full items-center justify-center pt-2">
          <button
            type="button"
            onClick={() => onRequest(item)}
            className="fa-dossier-btn group/btn inline-flex w-full max-w-[200px] items-center justify-center gap-1.5 rounded-full bg-white px-4 py-2.5 text-[11px] font-semibold tracking-tight !text-black shadow-[0_2px_12px_rgba(255,255,255,0.18)] transition-all hover:bg-neutral-200"
          >
            <span className="font-semibold !text-black">Request This Spec</span>
            <span className="text-xs font-bold !text-black transition-transform group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5">
              ↗
            </span>
          </button>
        </div>
      </div>
    </article>
  );
}

function MarqueeRow({
  items,
  commission,
  reverse,
  duration,
  onRequest,
  onCommission,
}: {
  items: ShowcaseItem[];
  commission: CommissionBrief;
  reverse?: boolean;
  duration: string;
  onRequest: (item: ShowcaseItem) => void;
  onCommission: (brief: CommissionBrief) => void;
}) {
  const tracks = ["a", "b"] as const;

  return (
    <div className="relative w-full overflow-hidden">
      <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-24 bg-gradient-to-r from-[#080808] to-transparent md:w-36" />
      <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-24 bg-gradient-to-l from-[#080808] to-transparent md:w-36" />
      <div
        className={`fa-marquee py-6 ${reverse ? "fa-marquee-reverse" : ""}`}
        style={{ animationDuration: duration }}
      >
        {tracks.flatMap((track) => [
          <CommissionCard key={`commission-${track}`} brief={commission} onCommission={onCommission} />,
          ...items.map((item) => (
            <MarqueeCard key={`${item.id}-${track}`} item={item} onRequest={onRequest} />
          )),
        ])}
      </div>
    </div>
  );
}

function SectionHeader({
  eyebrow,
  title,
  cta,
  onCta,
}: {
  eyebrow: string;
  title: string;
  cta: string;
  onCta: () => void;
}) {
  return (
    <div className="mx-auto mb-12 flex w-full max-w-7xl flex-col gap-4 px-6 md:flex-row md:items-end md:justify-between md:px-12">
      <div>
        <span className="mb-3 block text-[10px] font-semibold tracking-[0.3em] text-neutral-500 uppercase">
          {eyebrow}
        </span>
        <h2 className="text-3xl font-light tracking-tight text-white md:text-4xl">{title}</h2>
      </div>
      <a
        href="#inquire"
        onClick={(event) => {
          event.preventDefault();
          onCta();
        }}
        className="inline-flex items-center gap-2 rounded-full border border-white/[0.08] bg-white/[0.02] px-4 py-2 text-xs font-normal text-neutral-400 transition-colors duration-200 hover:border-white/20 hover:text-white"
      >
        <span>{cta}</span>
        <span className="text-[11px]">↗</span>
      </a>
    </div>
  );
}

export function FirstAscentGallery() {
  const heroRef = useRef<HTMLElement>(null);
  const [heroInView, setHeroInView] = useState(true);
  const [muted, setMuted] = useState(true);
  const [deskOpen, setDeskOpen] = useState(false);
  const [transmitted, setTransmitted] = useState(false);

  const [category, setCategory] = useState<AssetCategory>("watches");
  const [reference, setReference] = useState("");
  const [placeholder, setPlaceholder] = useState(COMMISSIONS.watches.placeholder);
  const [country, setCountry] = useState("");
  const [timeline, setTimeline] = useState<Timeline>("Air Priority");
  const [clientName, setClientName] = useState("");
  const [contact, setContact] = useState("");
  const [touched, setTouched] = useState<Record<string, boolean>>({});

  const errors = useMemo(
    () => ({
      reference: reference.trim().length < 3 ? "Describe the asset or reference you want sourced." : "",
      country: country.trim().length < 2 ? "Enter a destination country." : "",
      clientName: clientName.trim().length < 2 ? "Please enter your name." : "",
      contact: phoneValid(contact) ? "" : "Enter a WhatsApp or phone number.",
    }),
    [reference, country, clientName, contact],
  );
  const formValid = !errors.reference && !errors.country && !errors.clientName && !errors.contact;
  const showDock = !deskOpen && !heroInView;

  const openDesk = (intent?: Partial<SourcingIntent>) => {
    const nextCategory = intent?.category ?? "watches";
    setCategory(nextCategory);
    setReference(intent?.reference ?? "");
    setPlaceholder(intent?.placeholder ?? COMMISSIONS[nextCategory].placeholder);
    setTransmitted(false);
    setTouched({});
    setDeskOpen(true);
  };

  const requestSpec = (item: ShowcaseItem) => {
    openDesk({
      category: item.category,
      reference: `${item.maker} ${item.name}${item.tags[2] ? ` in ${item.tags[2]}` : ""}`,
    });
  };

  const requestCommission = (brief: CommissionBrief) => {
    openDesk({
      category: brief.category,
      reference: "",
      placeholder: brief.placeholder,
    });
  };

  useEffect(() => {
    document.documentElement.classList.add("first-ascent-page");
    return () => document.documentElement.classList.remove("first-ascent-page");
  }, []);

  useEffect(() => {
    const node = heroRef.current;
    if (!node) return;
    const observer = new IntersectionObserver(
      ([entry]) => setHeroInView(entry.isIntersecting),
      { threshold: 0.35 },
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    document.body.style.overflow = deskOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [deskOpen]);

  useEffect(() => {
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") setDeskOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  const submitSourcing = (event: React.FormEvent) => {
    event.preventDefault();
    setTouched({ reference: true, country: true, clientName: true, contact: true });
    if (!formValid) return;
    setTransmitted(true);
  };

  return (
    <div className="first-ascent w-full min-h-screen bg-[#080808] pb-36 text-white selection:bg-white/20">
      <section ref={heroRef} className="flex w-full flex-col items-center justify-center pt-8 pb-16">
        <div className="mx-auto flex w-full max-w-7xl justify-center px-4 sm:px-6 lg:px-12">
          <div className="first-ascent-hero-frame relative mx-auto flex aspect-[16/9] max-h-[75vh] w-full items-center justify-center overflow-hidden rounded-3xl border border-white/[0.08] bg-neutral-950 shadow-2xl">
            <video
              src="/videos/first-ascent-galleria.mp4"
              autoPlay
              loop
              muted={muted}
              playsInline
              className="h-full w-full object-cover"
            />
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-black/20" />
            <div className="absolute top-4 left-4 z-10 flex items-center gap-2 rounded-full border border-white/10 bg-black/40 px-3.5 py-1.5 text-[11px] font-medium tracking-wider text-neutral-300 uppercase backdrop-blur-md sm:top-6 sm:left-6">
              <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-emerald-400" />
              VIP Private Pavilion Open
            </div>
            <div className="absolute right-4 bottom-4 z-10 sm:right-6 sm:bottom-6">
              <button
                type="button"
                onClick={() => setMuted((value) => !value)}
                className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-white/10 bg-black/40 text-white/80 backdrop-blur-md"
                aria-label={muted ? "Unmute walkthrough" : "Mute walkthrough"}
              >
                {muted ? <VolumeX size={14} /> : <Volume2 size={14} />}
              </button>
            </div>
          </div>
        </div>
      </section>

      <div className="w-full">
        <section className="w-full border-b border-white/[0.04] py-24 last:border-b-0 md:py-32">
          <SectionHeader
            eyebrow="Timepieces"
            title="Haute Horlogerie"
            cta="Seeking a rare timepiece? We source it globally"
            onCta={() => openDesk({ category: "watches", placeholder: COMMISSIONS.watches.placeholder })}
          />
          <MarqueeRow
            items={WATCHES}
            commission={COMMISSIONS.watches}
            duration="42s"
            onRequest={requestSpec}
            onCommission={requestCommission}
          />
        </section>

        <section className="w-full border-b border-white/[0.04] py-24 last:border-b-0 md:py-32">
          <SectionHeader
            eyebrow="Automobiles"
            title="Exotic Fleet"
            cta="Have a supercar in mind? We source it globally"
            onCta={() => openDesk({ category: "fleet", placeholder: COMMISSIONS.fleet.placeholder })}
          />
          <MarqueeRow
            items={CARS}
            commission={COMMISSIONS.fleet}
            reverse
            duration="48s"
            onRequest={requestSpec}
            onCommission={requestCommission}
          />
        </section>

        <section className="w-full border-b border-white/[0.04] py-24 last:border-b-0 md:py-32">
          <SectionHeader
            eyebrow="Interiors"
            title="Private Living & Wardrobe Suites"
            cta="Envisioning a bespoke suite? We craft it anywhere"
            onCta={() => openDesk({ category: "suites", placeholder: COMMISSIONS.suites.placeholder })}
          />
          <MarqueeRow
            items={SUITES}
            commission={COMMISSIONS.suites}
            duration="44s"
            onRequest={requestSpec}
            onCommission={requestCommission}
          />
        </section>

        <section className="w-full border-b border-white/[0.04] py-24 last:border-b-0 md:py-32">
          <SectionHeader
            eyebrow="Landscape"
            title="Architectural Estates & Gardens"
            cta="Curating a private sanctuary? We design & cultivate"
            onCta={() => openDesk({ category: "estates", placeholder: COMMISSIONS.estates.placeholder })}
          />
          <MarqueeRow
            items={ESTATES}
            commission={COMMISSIONS.estates}
            reverse
            duration="52s"
            onRequest={requestSpec}
            onCommission={requestCommission}
          />
        </section>
      </div>

      <AnimatePresence>
        {showDock ? (
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 8 }}
            className="fixed bottom-6 left-1/2 z-40 flex -translate-x-1/2 items-center gap-3 rounded-full border border-white/10 bg-black/70 px-4 py-2.5 shadow-2xl backdrop-blur-2xl"
          >
            <button
              type="button"
              onClick={() => openDesk()}
              className="fa-dossier-btn flex items-center gap-1 rounded-full bg-white px-4 py-2 text-xs font-medium whitespace-nowrap !text-black transition-colors hover:bg-neutral-200"
            >
              Connect with Private Acquisition Desk
              <ArrowUpRight size={12} />
            </button>
            <button
              type="button"
              onClick={() => openDesk({ category: "fleet" })}
              className="hidden items-center gap-2 text-xs whitespace-nowrap text-neutral-300 sm:inline-flex"
            >
              <Calendar size={13} />
              Commission Any Asset
            </button>
          </motion.div>
        ) : null}
      </AnimatePresence>

      <AnimatePresence>
        {deskOpen ? (
          <motion.div
            className="fixed inset-0 z-[60] flex justify-end"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <button
              type="button"
              aria-label="Close acquisition desk"
              className="absolute inset-0 bg-black/60 backdrop-blur-sm"
              onClick={() => setDeskOpen(false)}
            />
            <motion.aside
              id="inquire"
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", stiffness: 320, damping: 34 }}
              className="relative flex h-full w-full max-w-md flex-col border-l border-white/10 bg-[#080808]/96 p-6 backdrop-blur-2xl"
              role="dialog"
              aria-modal="true"
              aria-labelledby="desk-title"
            >
              <div className="mb-6 flex items-start justify-between gap-4">
                <div>
                  <p className="text-[11px] font-medium tracking-[0.25em] text-rose-400 uppercase">Sourcing concierge</p>
                  <h2 id="desk-title" className="mt-1 text-2xl font-light tracking-tight">
                    Private Acquisition Desk
                  </h2>
                </div>
                <button
                  type="button"
                  onClick={() => setDeskOpen(false)}
                  className="rounded-full border border-white/10 bg-white/[0.05] p-2"
                  aria-label="Close"
                >
                  <X size={16} />
                </button>
              </div>

              {transmitted ? (
                <div className="flex flex-1 flex-col items-center justify-center px-4 text-center">
                  <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-rose-500/15 text-rose-300">
                    <Check size={24} />
                  </div>
                  <p className="text-lg font-light tracking-tight">Dossier transmitted</p>
                  <p className="mt-3 text-sm leading-relaxed text-neutral-400">
                    An acquisition specialist is now assigned to{" "}
                    <span className="text-neutral-200">{reference.trim() || "your brief"}</span>. Expect WhatsApp
                    confirmation shortly.
                  </p>
                  <button
                    type="button"
                    onClick={() => setDeskOpen(false)}
                    className="fa-dossier-btn mt-8 rounded-full bg-white px-5 py-2.5 text-xs font-semibold !text-black"
                  >
                    Return to the pavilion
                  </button>
                </div>
              ) : (
                <form onSubmit={submitSourcing} noValidate className="flex min-h-0 flex-1 flex-col">
                  <div className="flex-1 space-y-5 overflow-y-auto pr-1">
                    <div>
                      <p className="text-[10px] tracking-wider text-neutral-500 uppercase">Asset category</p>
                      <div className="mt-2 grid grid-cols-2 gap-2">
                        {CATEGORIES.map((item) => (
                          <button
                            key={item.id}
                            type="button"
                            onClick={() => {
                              setCategory(item.id);
                              setPlaceholder(COMMISSIONS[item.id].placeholder);
                            }}
                            className={`rounded-full px-3 py-2 text-[11px] ${
                              category === item.id
                                ? "bg-white font-medium text-black"
                                : "border border-white/10 bg-white/[0.04] text-neutral-300"
                            }`}
                          >
                            {item.label}
                          </button>
                        ))}
                      </div>
                    </div>

                    <Field
                      label="Target reference / model"
                      value={reference}
                      onChange={setReference}
                      onBlur={() => setTouched((current) => ({ ...current, reference: true }))}
                      error={touched.reference ? errors.reference : ""}
                      placeholder={placeholder}
                    />

                    <Field
                      label="Destination country"
                      value={country}
                      onChange={setCountry}
                      onBlur={() => setTouched((current) => ({ ...current, country: true }))}
                      error={touched.country ? errors.country : ""}
                      placeholder="e.g. United Arab Emirates"
                    />

                    <div>
                      <p className="text-[10px] tracking-wider text-neutral-500 uppercase">Preferred delivery timeline</p>
                      <div className="mt-2 grid gap-2">
                        {TIMELINES.map((item) => (
                          <button
                            key={item}
                            type="button"
                            onClick={() => setTimeline(item)}
                            className={`rounded-2xl border px-4 py-3 text-left text-sm ${
                              timeline === item
                                ? "border-white/20 bg-white/[0.07]"
                                : "border-white/[0.08] bg-white/[0.02]"
                            }`}
                          >
                            {item}
                          </button>
                        ))}
                      </div>
                    </div>

                    <Field
                      label="Full name"
                      value={clientName}
                      onChange={setClientName}
                      onBlur={() => setTouched((current) => ({ ...current, clientName: true }))}
                      error={touched.clientName ? errors.clientName : ""}
                    />
                    <Field
                      label="WhatsApp / phone"
                      type="tel"
                      value={contact}
                      onChange={setContact}
                      onBlur={() => setTouched((current) => ({ ...current, contact: true }))}
                      error={touched.contact ? errors.contact : ""}
                      placeholder="+971 …"
                    />
                  </div>

                  <button
                    type="submit"
                    className="fa-dossier-btn mt-4 w-full rounded-full bg-white py-2.5 text-xs font-semibold !text-black transition-colors hover:bg-neutral-200"
                  >
                    Transmit Sourcing Dossier
                  </button>
                </form>
              )}
            </motion.aside>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </div>
  );
}

function Field({
  label,
  value,
  onChange,
  onBlur,
  error,
  type = "text",
  placeholder,
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
  onBlur: () => void;
  error: string;
  type?: string;
  placeholder?: string;
}) {
  return (
    <div>
      <label className="text-[10px] tracking-wider text-neutral-500 uppercase">{label}</label>
      <input
        type={type}
        value={value}
        placeholder={placeholder}
        onChange={(event) => onChange(event.target.value)}
        onBlur={onBlur}
        className={`mt-2 w-full rounded-2xl border bg-white/[0.04] px-4 py-3 text-sm outline-none placeholder:text-neutral-600 ${
          error ? "border-red-400/50" : "border-white/[0.08]"
        }`}
      />
      {error ? <p className="mt-1 text-xs text-red-300">{error}</p> : null}
    </div>
  );
}
