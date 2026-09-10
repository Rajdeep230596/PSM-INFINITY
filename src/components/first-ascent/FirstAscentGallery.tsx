"use client";

import { AnimatePresence, motion } from "framer-motion";
import {
  ArrowUpRight,
  Calendar,
  Check,
  MessageCircle,
  Video,
  Volume2,
  VolumeX,
  X,
} from "lucide-react";
import { useEffect, useMemo, useRef, useState } from "react";

type Channel = "whatsapp" | "zoom" | "galleria";

type ShowcaseItem = {
  id: string;
  maker: string;
  name: string;
  image: string;
  fallbacks?: string[];
  status: string;
  tags: string[];
};

const WATCHES: ShowcaseItem[] = [
  {
    id: "patek-grand",
    maker: "Patek Philippe",
    name: "Grand Complications",
    image: "https://images.unsplash.com/photo-1539874754764-5a96559165b0?auto=format&fit=crop&w=1400&q=80",
    status: "VAULT ESCROW",
    tags: ["Calibre 29-535 PS", "Platinum", "Escrow 9 days"],
  },
  {
    id: "ap-offshore",
    maker: "Audemars Piguet",
    name: "Royal Oak Offshore",
    image: "https://images.unsplash.com/photo-1612817159949-195b6eb9e31a?auto=format&fit=crop&w=1400&q=80",
    status: "PRIVATE LIST",
    tags: ["Calibre 3126", "Forged carbon", "Escrow 12 days"],
  },
  {
    id: "rolex-daytona",
    maker: "Rolex",
    name: "Daytona Cosmograph",
    image: "https://images.unsplash.com/photo-1622434641406-a158123450f9?auto=format&fit=crop&w=1400&q=80",
    status: "READY",
    tags: ["Calibre 4131", "Oystersteel", "Escrow 6 days"],
  },
  {
    id: "rm-67",
    maker: "Richard Mille",
    name: "RM 67-02",
    image: "https://images.unsplash.com/photo-1639006570490-79c0c53f1080?auto=format&fit=crop&w=1400&q=80",
    status: "ALLOCATION",
    tags: ["CRMA7", "Carbon TPT", "Escrow 14 days"],
  },
];

const CARS: ShowcaseItem[] = [
  {
    id: "cayenne-turbo-gt",
    maker: "Porsche",
    name: "Cayenne Turbo GT",
    image: "/assets/1000356071.jpg",
    fallbacks: [
      "/assets/1000356069.jpg",
      "https://images.unsplash.com/photo-1606664515524-ed2f786a0fe6?auto=format&fit=crop&w=1400&q=80",
    ],
    status: "EXPORT READY",
    tags: ["650 hp", "3.3s 0-100", "Deep Blue Metallic"],
  },
  {
    id: "cayenne-gts",
    maker: "Porsche",
    name: "Cayenne GTS",
    image: "/assets/1000356065.jpg",
    fallbacks: [
      "/assets/1000356063.jpg",
      "https://images.unsplash.com/photo-1611821064430-0d40291d0f0b?auto=format&fit=crop&w=1400&q=80",
    ],
    status: "SHOWROOM SPEC",
    tags: ["500 hp", "Sport Chrono", "Obsidian Black"],
  },
  {
    id: "cayenne-cockpit",
    maker: "Porsche",
    name: "Cockpit & Telemetry",
    image: "/assets/1000356067.jpg",
    fallbacks: ["https://images.unsplash.com/photo-1553440569-bcc63803a83d?auto=format&fit=crop&w=1400&q=80"],
    status: "BESPOKE BUILD",
    tags: ["Sport Plus Mode", "Valvetronic", "Air Ride"],
  },
  {
    id: "ferrari-296",
    maker: "Ferrari",
    name: "296 GTB",
    image: "https://images.unsplash.com/photo-1583121274602-3e2820c69888?auto=format&fit=crop&w=1400&q=80",
    status: "PRIVATE LIST",
    tags: ["818 hp", "2.9s 0-100", "Allocation"],
  },
  {
    id: "aston-dbs",
    maker: "Aston Martin",
    name: "DBS",
    image: "https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?auto=format&fit=crop&w=1400&q=80",
    status: "LAST CHASSIS",
    tags: ["715 hp", "3.4s 0-100", "Air freight"],
  },
];

const SUITES: ShowcaseItem[] = [
  {
    id: "vitrine-suite",
    maker: "Private Living",
    name: "Walk-in Vitrine Suite",
    image: "https://images.unsplash.com/photo-1595428774223-ef52624120d2?auto=format&fit=crop&w=1400&q=80",
    tags: ["Custom architecture", "White-glove install", "Bespoke joinery"],
    status: "COMMISSION",
  },
  {
    id: "couture-vault",
    maker: "Private Living",
    name: "Couture Climate Vault",
    image: "https://images.unsplash.com/photo-1558997519-83ea7952bd9c?auto=format&fit=crop&w=1400&q=80",
    tags: ["Custom architecture", "White-glove install", "Bespoke joinery"],
    status: "LOOKBOOK",
  },
  {
    id: "dressing-chamber",
    maker: "Private Living",
    name: "Minimalist Dressing Chamber",
    image: "https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?auto=format&fit=crop&w=1400&q=80",
    tags: ["Custom architecture", "White-glove install", "Bespoke joinery"],
    status: "MADE TO ORDER",
  },
  {
    id: "lighting-atelier",
    maker: "Private Living",
    name: "Bespoke Lighting Atelier",
    image: "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=1400&q=80",
    tags: ["Custom architecture", "White-glove install", "Bespoke joinery"],
    status: "ATELIER",
  },
];

const ESTATES: ShowcaseItem[] = [
  {
    id: "zen-courtyard",
    maker: "Estate Atelier",
    name: "Japanese Zen Courtyard",
    image: "https://images.unsplash.com/photo-1524413840807-0c3cb6fa808d?auto=format&fit=crop&w=1400&q=80",
    tags: ["0.8 acres", "Rare flora", "Landscape architecture"],
    status: "SITE READY",
  },
  {
    id: "botanical-pavilion",
    maker: "Estate Atelier",
    name: "Botanical Pavilion",
    image: "https://images.unsplash.com/photo-1416879595882-3373a0480b5b?auto=format&fit=crop&w=1400&q=80",
    tags: ["1.4 acres", "Rare flora", "Landscape architecture"],
    status: "DESIGNED",
  },
  {
    id: "water-garden",
    maker: "Estate Atelier",
    name: "Sculptural Water Garden",
    image: "https://images.unsplash.com/photo-1433086966358-54859d0ed716?auto=format&fit=crop&w=1400&q=80",
    tags: ["2.1 acres", "Rare flora", "Landscape architecture"],
    status: "CURATED",
  },
  {
    id: "estate-promenade",
    maker: "Estate Atelier",
    name: "Illuminated Promenade",
    image: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=1400&q=80",
    tags: ["3.6 acres", "Rare flora", "Landscape architecture"],
    status: "ESTATE",
  },
];

const ALL_ITEMS = [...WATCHES, ...CARS, ...SUITES, ...ESTATES];

const TIME_SLOTS = ["10:00", "11:30", "14:00", "16:00", "18:30"];

const CHANNELS: { id: Channel; label: string; hint: string; icon: typeof MessageCircle }[] = [
  { id: "whatsapp", label: "WhatsApp Priority", hint: "Concierge in minutes", icon: MessageCircle },
  { id: "zoom", label: "Private Zoom", hint: "Encrypted video desk", icon: Video },
  { id: "galleria", label: "In-Galleria Visit", hint: "Kolkata pavilion", icon: Calendar },
];

function todayIso() {
  return new Date().toISOString().slice(0, 10);
}

function emailValid(value: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}

function statusBadgeClass(status: string) {
  const value = status.toLowerCase();
  if (value.includes("escrow") || value.includes("vault")) {
    return "bg-amber-500/15 text-amber-300 border-amber-500/30 shadow-[0_0_12px_rgba(245,158,11,0.15)]";
  }
  if (value.includes("ready") || value.includes("stock") || value.includes("showroom")) {
    return "bg-emerald-500/15 text-emerald-300 border-emerald-500/30 shadow-[0_0_12px_rgba(16,185,129,0.15)]";
  }
  return "bg-white/10 text-neutral-200 border-white/20 shadow-sm";
}

function ProductImage({ src, fallbacks, alt }: { src: string; fallbacks?: string[]; alt: string }) {
  const sources = [src, ...(fallbacks ?? [])];
  const [index, setIndex] = useState(0);
  const [failed, setFailed] = useState(false);
  const current = sources[index];

  if (failed || !current) {
    return (
      <div
        className="absolute inset-0 bg-gradient-to-br from-neutral-800 via-[#0f0f11] to-black"
        aria-hidden="true"
      />
    );
  }

  return (
    <img
      src={current}
      alt={alt}
      onError={() => {
        if (index < sources.length - 1) {
          setIndex(index + 1);
          return;
        }
        setFailed(true);
      }}
      className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
    />
  );
}

function MarqueeCard({
  item,
  onView,
}: {
  item: ShowcaseItem;
  onView: (id: string) => void;
}) {
  const [spec1, spec2, spec3] = item.tags;

  return (
    <article className="group flex min-h-[480px] w-[360px] flex-shrink-0 flex-col overflow-hidden rounded-2xl border border-white/[0.08] bg-[#0d0d0f] transition-all duration-300 hover:border-white/20 md:w-[410px]">
      <div className="relative aspect-[16/11] w-full overflow-hidden bg-neutral-900">
        <ProductImage src={item.image} fallbacks={item.fallbacks} alt={`${item.maker} ${item.name}`} />
      </div>

      <div className="flex flex-1 flex-col items-center p-6 text-center md:p-7">
        <div className="flex flex-col items-center gap-2">
          <span className="text-[10px] font-semibold tracking-[0.25em] text-neutral-400 uppercase">
            {item.maker}
          </span>
          <span
            className={`rounded-full border px-3 py-0.5 text-[9px] font-mono font-medium tracking-wider uppercase whitespace-nowrap backdrop-blur-md ${statusBadgeClass(item.status)}`}
          >
            {item.status}
          </span>
          <h3 className="mt-1 text-xl font-light tracking-tight text-white">{item.name}</h3>
        </div>

        <div className="my-4 flex w-full flex-wrap items-center justify-center gap-2.5 border-y border-white/[0.08] py-3.5 text-[11px] font-light text-neutral-400">
          {spec1 ? <span>{spec1}</span> : null}
          {spec1 && spec2 ? <span className="text-neutral-600">•</span> : null}
          {spec2 ? <span>{spec2}</span> : null}
          {spec2 && spec3 ? <span className="text-neutral-600">•</span> : null}
          {spec3 ? <span>{spec3}</span> : null}
        </div>

        <div className="flex w-full flex-1 items-center justify-center py-5">
          <button
            type="button"
            onClick={() => onView(item.id)}
            className="group/btn inline-flex w-full max-w-[220px] items-center justify-center gap-2 rounded-full bg-white px-6 py-2.5 text-xs font-semibold tracking-tight text-black shadow-[0_2px_14px_rgba(255,255,255,0.15)] transition-all duration-300 hover:bg-neutral-200 hover:shadow-[0_4px_20px_rgba(255,255,255,0.22)]"
          >
            <span>View Dossier</span>
            <ArrowUpRight
              size={13}
              strokeWidth={2.25}
              className="transition-transform duration-300 group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5"
            />
          </button>
        </div>
      </div>
    </article>
  );
}

function MarqueeRow({
  items,
  reverse,
  duration,
  onView,
}: {
  items: ShowcaseItem[];
  reverse?: boolean;
  duration: string;
  onView: (id: string) => void;
}) {
  const loop = [...items, ...items];

  return (
    <div className="relative w-full overflow-hidden">
      <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-24 bg-gradient-to-r from-[#080808] to-transparent md:w-36" />
      <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-24 bg-gradient-to-l from-[#080808] to-transparent md:w-36" />
      <div
        className={`fa-marquee py-4 ${reverse ? "fa-marquee-reverse" : ""}`}
        style={{ animationDuration: duration }}
      >
        {loop.map((item, index) => (
          <MarqueeCard key={`${item.id}-${index}`} item={item} onView={onView} />
        ))}
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
    <div className="mx-auto mb-10 flex w-full max-w-7xl flex-col gap-4 px-6 md:flex-row md:items-end md:justify-between md:px-12">
      <div>
        <p className="mb-2 block text-[11px] font-semibold tracking-[0.28em] text-neutral-500 uppercase">{eyebrow}</p>
        <h2 className="text-3xl font-light tracking-tight text-neutral-100 md:text-4xl">{title}</h2>
      </div>
      <button
        type="button"
        onClick={onCta}
        className="group inline-flex items-center gap-2 rounded-full border border-white/[0.06] bg-white/[0.02] px-3 py-1.5 text-xs font-normal text-neutral-400 transition-colors duration-200 hover:border-white/20 hover:text-white"
      >
        {cta}
        <ArrowUpRight size={13} className="transition-transform group-hover:translate-x-0.5" />
      </button>
    </div>
  );
}

export function FirstAscentGallery() {
  const heroRef = useRef<HTMLElement>(null);
  const [heroInView, setHeroInView] = useState(true);
  const [muted, setMuted] = useState(true);
  const [dossier, setDossier] = useState<string[]>([]);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [bookingOpen, setBookingOpen] = useState(false);
  const [dossierSent, setDossierSent] = useState(false);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [date, setDate] = useState("");
  const [slot, setSlot] = useState("");
  const [channel, setChannel] = useState<Channel>("whatsapp");
  const [touched, setTouched] = useState<Record<string, boolean>>({});
  const [bookingConfirmed, setBookingConfirmed] = useState(false);

  const selectedItems = useMemo(
    () => ALL_ITEMS.filter((item) => dossier.includes(item.id)),
    [dossier],
  );

  const errors = {
    name: name.trim().length < 2 ? "Please enter your full name." : "",
    email: emailValid(email) ? "" : "Enter a valid email address.",
    date: !date || date < todayIso() ? "Choose a future date." : "",
    slot: slot ? "" : "Select a time slot.",
  };
  const bookingValid = !errors.name && !errors.email && !errors.date && !errors.slot;
  const overlayOpen = drawerOpen || bookingOpen;
  const showDock = !overlayOpen && !heroInView;

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
    document.body.style.overflow = overlayOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [overlayOpen]);

  useEffect(() => {
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setDrawerOpen(false);
        setBookingOpen(false);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  const viewDossier = (id: string) => {
    setDossier((current) => (current.includes(id) ? current : [...current, id]));
    setDossierSent(false);
    setDrawerOpen(true);
  };

  const submitBooking = (event: React.FormEvent) => {
    event.preventDefault();
    setTouched({ name: true, email: true, date: true, slot: true });
    if (!bookingValid) return;
    setBookingConfirmed(true);
  };

  return (
    <div className="first-ascent w-full min-h-screen bg-[#080808] pb-36 text-white selection:bg-white/20">
      <section
        ref={heroRef}
        className="flex w-full flex-col items-center justify-center pt-8 pb-16"
      >
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
        <section className="py-20 md:py-28">
          <SectionHeader
            eyebrow="Timepieces"
            title="Haute Horlogerie"
            cta="Seeking a rare timepiece? We source it globally"
            onCta={() => setBookingOpen(true)}
          />
          <MarqueeRow items={WATCHES} duration="42s" onView={viewDossier} />
        </section>

        <section className="py-20 md:py-28">
          <SectionHeader
            eyebrow="Automobiles"
            title="Exotic Fleet"
            cta="Have a supercar in mind? We source it globally"
            onCta={() => setBookingOpen(true)}
          />
          <MarqueeRow items={CARS} reverse duration="48s" onView={viewDossier} />
        </section>

        <section className="py-20 md:py-28">
          <SectionHeader
            eyebrow="Interiors"
            title="Private Living & Wardrobe Suites"
            cta="Envisioning a bespoke suite? We craft it anywhere"
            onCta={() => setBookingOpen(true)}
          />
          <MarqueeRow items={SUITES} duration="44s" onView={viewDossier} />
        </section>

        <section className="py-20 md:py-28">
          <SectionHeader
            eyebrow="Landscape"
            title="Architectural Estates & Gardens"
            cta="Curating a private sanctuary? We design & cultivate"
            onCta={() => setBookingOpen(true)}
          />
          <MarqueeRow items={ESTATES} reverse duration="52s" onView={viewDossier} />
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
              onClick={() => setBookingOpen(true)}
              className="flex items-center gap-1 rounded-full bg-white px-4 py-2 text-xs font-medium whitespace-nowrap text-black transition-colors hover:bg-neutral-200"
            >
              Connect with Private Acquisition Desk
              <ArrowUpRight size={12} />
            </button>
            <button
              type="button"
              onClick={() => {
                setChannel("galleria");
                setBookingOpen(true);
              }}
              className="hidden items-center gap-2 text-xs whitespace-nowrap text-neutral-300 sm:inline-flex"
            >
              <Calendar size={13} />
              Schedule Walkthrough
            </button>
          </motion.div>
        ) : null}
      </AnimatePresence>

      <AnimatePresence>
        {drawerOpen ? (
          <motion.div
            className="fixed inset-0 z-[60] flex justify-end"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <button
              type="button"
              aria-label="Close dossier"
              className="absolute inset-0 bg-black/60 backdrop-blur-sm"
              onClick={() => setDrawerOpen(false)}
            />
            <motion.aside
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", stiffness: 320, damping: 34 }}
              className="relative flex h-full w-full max-w-md flex-col border-l border-white/10 bg-[#080808]/96 p-6 backdrop-blur-2xl"
              role="dialog"
              aria-modal="true"
              aria-labelledby="dossier-title"
            >
              <div className="mb-6 flex items-start justify-between gap-4">
                <div>
                  <p className="text-[11px] font-medium tracking-[0.25em] text-neutral-400 uppercase">Allocation</p>
                  <h2 id="dossier-title" className="mt-1 text-2xl font-light tracking-tight">
                    Curation Dossier
                  </h2>
                </div>
                <button
                  type="button"
                  onClick={() => setDrawerOpen(false)}
                  className="rounded-full border border-white/10 bg-white/[0.05] p-2"
                  aria-label="Close"
                >
                  <X size={16} />
                </button>
              </div>
              <div className="flex-1 space-y-3 overflow-y-auto pr-1">
                {selectedItems.length === 0 ? (
                  <p className="rounded-2xl border border-dashed border-white/10 px-4 py-8 text-center text-sm text-neutral-500">
                    Select a piece from the galleries to compose your allocation.
                  </p>
                ) : (
                  selectedItems.map((item) => (
                    <div key={item.id} className="flex gap-3 rounded-2xl border border-white/[0.08] bg-white/[0.02] p-3">
                      <div className="relative h-16 w-16 shrink-0 overflow-hidden rounded-xl bg-neutral-950">
                        <ProductImage src={item.image} fallbacks={item.fallbacks} alt="" />
                      </div>
                      <div className="min-w-0 flex-1">
                        <p className="truncate text-sm tracking-tight">
                          {item.maker} {item.name}
                        </p>
                        <p className="text-[11px] text-neutral-500">{item.tags[0]}</p>
                      </div>
                      <button
                        type="button"
                        onClick={() => setDossier((current) => current.filter((id) => id !== item.id))}
                        className="text-white/40"
                        aria-label="Remove"
                      >
                        <X size={14} />
                      </button>
                    </div>
                  ))
                )}
              </div>
              {dossierSent ? (
                <p className="mt-4 flex items-center gap-2 rounded-2xl bg-emerald-400/10 px-4 py-3 text-sm text-emerald-200">
                  <Check size={16} /> Dossier sent to the acquisition desk.
                </p>
              ) : (
                <button
                  type="button"
                  onClick={() => {
                    if (!selectedItems.length) return;
                    setDossierSent(true);
                  }}
                  className="mt-4 w-full rounded-full bg-white py-2.5 text-xs font-medium text-black transition-colors hover:bg-neutral-200"
                >
                  Submit allocation dossier
                </button>
              )}
            </motion.aside>
          </motion.div>
        ) : null}
      </AnimatePresence>

      <AnimatePresence>
        {bookingOpen ? (
          <motion.div
            className="fixed inset-0 z-[60] flex items-center justify-center px-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <button
              type="button"
              aria-label="Close booking"
              className="absolute inset-0 bg-black/60 backdrop-blur-sm"
              onClick={() => setBookingOpen(false)}
            />
            <motion.div
              initial={{ opacity: 0, y: 24, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 14, scale: 0.98 }}
              transition={{ type: "spring", stiffness: 320, damping: 28 }}
              className="relative w-full max-w-lg rounded-2xl border border-white/[0.08] bg-[#080808]/90 p-6 backdrop-blur-2xl sm:p-8"
              role="dialog"
              aria-modal="true"
              aria-labelledby="booking-title"
            >
              <button
                type="button"
                onClick={() => setBookingOpen(false)}
                className="absolute right-4 top-4 rounded-full border border-white/10 bg-white/[0.05] p-2"
                aria-label="Close"
              >
                <X size={16} />
              </button>
              {bookingConfirmed ? (
                <div className="py-8 text-center">
                  <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-emerald-400/15 text-emerald-300">
                    <Check size={24} />
                  </div>
                  <h2 id="booking-title" className="text-2xl font-light tracking-tight">
                    Walkthrough reserved
                  </h2>
                  <p className="mt-3 text-sm text-neutral-400">
                    {date} at {slot}. Your concierge will confirm via{" "}
                    {CHANNELS.find((item) => item.id === channel)?.label}.
                  </p>
                  <button
                    type="button"
                    onClick={() => setBookingOpen(false)}
                    className="mt-8 rounded-full bg-white px-5 py-2.5 text-xs font-medium text-black"
                  >
                    Return to the pavilion
                  </button>
                </div>
              ) : (
                <form onSubmit={submitBooking} noValidate>
                  <p className="text-[11px] font-medium tracking-[0.25em] text-neutral-400 uppercase">
                    Private acquisition
                  </p>
                  <h2 id="booking-title" className="mt-2 text-2xl font-light tracking-tight">
                    Book a private viewing
                  </h2>
                  <div className="mt-6 grid gap-4">
                    <Field
                      label="Full name"
                      value={name}
                      onChange={setName}
                      onBlur={() => setTouched((current) => ({ ...current, name: true }))}
                      error={touched.name ? errors.name : ""}
                    />
                    <Field
                      label="Email"
                      type="email"
                      value={email}
                      onChange={setEmail}
                      onBlur={() => setTouched((current) => ({ ...current, email: true }))}
                      error={touched.email ? errors.email : ""}
                    />
                    <div>
                      <label className="text-[10px] tracking-wider uppercase text-neutral-500">Date</label>
                      <input
                        type="date"
                        min={todayIso()}
                        value={date}
                        onChange={(event) => setDate(event.target.value)}
                        onBlur={() => setTouched((current) => ({ ...current, date: true }))}
                        className={`mt-2 w-full rounded-2xl border bg-white/[0.04] px-4 py-3 text-sm outline-none ${
                          touched.date && errors.date ? "border-red-400/50" : "border-white/[0.08]"
                        }`}
                      />
                      {touched.date && errors.date ? (
                        <p className="mt-1 text-xs text-red-300">{errors.date}</p>
                      ) : null}
                    </div>
                    <div>
                      <p className="text-[10px] tracking-wider uppercase text-neutral-500">Time slot</p>
                      <div className="mt-2 flex flex-wrap gap-2">
                        {TIME_SLOTS.map((item) => (
                          <button
                            key={item}
                            type="button"
                            onClick={() => {
                              setSlot(item);
                              setTouched((current) => ({ ...current, slot: true }));
                            }}
                            className={`h-9 rounded-full px-3 text-xs whitespace-nowrap ${
                              slot === item
                                ? "bg-white font-medium text-black"
                                : "border border-white/10 bg-white/[0.05] text-neutral-300"
                            }`}
                          >
                            {item}
                          </button>
                        ))}
                      </div>
                      {touched.slot && errors.slot ? (
                        <p className="mt-1 text-xs text-red-300">{errors.slot}</p>
                      ) : null}
                    </div>
                    <div>
                      <p className="text-[10px] tracking-wider uppercase text-neutral-500">Concierge channel</p>
                      <div className="mt-2 grid gap-2">
                        {CHANNELS.map((item) => {
                          const Icon = item.icon;
                          const active = channel === item.id;
                          return (
                            <button
                              key={item.id}
                              type="button"
                              onClick={() => setChannel(item.id)}
                              className={`flex items-center gap-3 rounded-2xl border px-4 py-3 text-left ${
                                active ? "border-white/20 bg-white/[0.07]" : "border-white/[0.08] bg-white/[0.02]"
                              }`}
                            >
                              <Icon size={16} className="text-white/70" />
                              <span>
                                <span className="block text-sm tracking-tight">{item.label}</span>
                                <span className="text-[11px] text-neutral-500">{item.hint}</span>
                              </span>
                            </button>
                          );
                        })}
                      </div>
                    </div>
                  </div>
                  <button
                    type="submit"
                    className="mt-6 w-full rounded-full bg-white py-2.5 text-xs font-medium text-black transition-colors hover:bg-neutral-200"
                  >
                    Confirm private walkthrough
                  </button>
                </form>
              )}
            </motion.div>
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
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
  onBlur: () => void;
  error: string;
  type?: string;
}) {
  return (
    <div>
      <label className="text-[10px] tracking-wider uppercase text-neutral-500">{label}</label>
      <input
        type={type}
        value={value}
        onChange={(event) => onChange(event.target.value)}
        onBlur={onBlur}
        className={`mt-2 w-full rounded-2xl border bg-white/[0.04] px-4 py-3 text-sm outline-none ${
          error ? "border-red-400/50" : "border-white/[0.08]"
        }`}
      />
      {error ? <p className="mt-1 text-xs text-red-300">{error}</p> : null}
    </div>
  );
}
