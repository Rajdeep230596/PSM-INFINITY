"use client";

import { useGSAP } from "@gsap/react";
import { AnimatePresence, motion } from "framer-motion";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowUpRight, Building2, Calendar, Check, X } from "lucide-react";
import Link from "next/link";
import { useEffect, useMemo, useRef, useState } from "react";

import { useDeferredVideoSource } from "@/lib/deferred-video";
import { attachScrollVideo } from "@/lib/scroll-video";

const EVENT_CTAS = [
  { id: "private-events", label: "Private Events", href: "/second-ascent/private-events", icon: Calendar },
  { id: "corporate-events", label: "Corporate Events", href: "/second-ascent/corporate-events", icon: Building2 },
] as const;

const EVENT_CTA_REVEAL_AT = 7.5 / 37;
const EVENT_CTA_HIDE_AT = 13.4 / 37;

gsap.registerPlugin(useGSAP, ScrollTrigger);

type AssetCategory = "watches" | "fleet" | "suites" | "estates";

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

const PLACEHOLDERS: Record<AssetCategory, string> = {
  watches: "e.g. Rolex Daytona 126500LN",
  fleet: "e.g. Porsche Cayenne GTS in Obsidian Black",
  suites: "e.g. Climate vault with biometric dressing chamber",
  estates: "e.g. Japanese courtyard with rare flora, 0.8 acres",
};

function phoneValid(value: string) {
  return value.replace(/\D/g, "").length >= 8;
}

export function FirstAscentGallery({ hideHero = false }: { hideHero?: boolean }) {
  const sectionRef = useRef<HTMLElement>(null);
  const videoWrapRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const videoSrc = useDeferredVideoSource(sectionRef, "/videos/second-ascent-backdrop.mp4?v=4");
  const [progress, setProgress] = useState(0);
  const [deskOpen, setDeskOpen] = useState(false);
  const [transmitted, setTransmitted] = useState(false);

  const [category, setCategory] = useState<AssetCategory>("watches");
  const [reference, setReference] = useState("");
  const [placeholder, setPlaceholder] = useState(PLACEHOLDERS.watches);
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
  const revealed = progress >= EVENT_CTA_REVEAL_AT;
  const ctaVisible = progress >= EVENT_CTA_REVEAL_AT && progress < EVENT_CTA_HIDE_AT;
  const showDock = !deskOpen && !hideHero && progress > 0.12 && !revealed;

  const openDesk = (intent?: Partial<SourcingIntent>) => {
    const nextCategory = intent?.category ?? "watches";
    setCategory(nextCategory);
    setReference(intent?.reference ?? "");
    setPlaceholder(intent?.placeholder ?? PLACEHOLDERS[nextCategory]);
    setTransmitted(false);
    setTouched({});
    setDeskOpen(true);
  };

  useEffect(() => {
    if (hideHero) return;
    document.documentElement.classList.add("first-ascent-page");
    return () => document.documentElement.classList.remove("first-ascent-page");
  }, [hideHero]);

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

  useGSAP(
    () => {
      const section = sectionRef.current;
      const wrap = videoWrapRef.current;
      const video = videoRef.current;
      if (!section || !wrap || !video || !videoSrc) return;

      const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      const coarse = window.matchMedia("(pointer: coarse)").matches;
      const compact = window.matchMedia("(max-width: 700px)").matches;
      const loopFallback = reduceMotion || coarse || compact;

      const pin = ScrollTrigger.create({
        trigger: section,
        start: "top top",
        end: "max",
        pin: wrap,
        pinSpacing: false,
        anticipatePin: 1,
        invalidateOnRefresh: true,
      });

      const trigger = ScrollTrigger.create({
        trigger: section,
        start: "top top",
        end: "bottom bottom",
        scrub: 1.05,
        onUpdate: (self) => setProgress(self.progress),
      });

      if (loopFallback) {
        video.loop = true;
        video.muted = true;
        video.playsInline = true;
        const play = video.play();
        if (play && typeof play.then === "function") play.catch(() => {});
        return () => {
          pin.kill();
          trigger.kill();
        };
      }

      const detach = attachScrollVideo(video, {
        getProgress: () => trigger.progress,
        smoothing: 0.14,
      });

      return () => {
        detach();
        pin.kill();
        trigger.kill();
      };
    },
    { scope: sectionRef, dependencies: [videoSrc] },
  );

  const submitSourcing = (event: React.FormEvent) => {
    event.preventDefault();
    setTouched({ reference: true, country: true, clientName: true, contact: true });
    if (!formValid) return;
    setTransmitted(true);
  };

  return (
    <section
      ref={sectionRef}
      id="second-ascent"
      className="first-ascent first-ascent-flush relative h-[350vh] bg-[#080808] text-white selection:bg-white/20"
      aria-label="Second Ascent"
    >
      <div ref={videoWrapRef} className="relative z-0 h-screen w-full overflow-hidden bg-[#080808]">
        <video
          ref={videoRef}
          src={videoSrc}
          muted
          playsInline
          preload={videoSrc ? "metadata" : "none"}
          className="absolute inset-0 h-full w-full object-cover"
        />
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-black/35" />

        <div
          className={`absolute inset-0 z-30 flex items-center justify-center ${
            ctaVisible ? "pointer-events-auto" : "pointer-events-none"
          }`}
        >
          <div className="flex items-center justify-center gap-[48px]">
            {EVENT_CTAS.map((item, index) => {
              const Icon = item.icon;
              return (
                <motion.div
                  key={item.id}
                  initial={false}
                  animate={ctaVisible ? { opacity: 1, y: 0, scale: 1 } : { opacity: 0, y: 28, scale: 0.96 }}
                  transition={{
                    duration: 0.7,
                    delay: ctaVisible ? index * 0.08 : 0,
                    ease: [0.22, 1, 0.36, 1],
                  }}
                >
                  <Link
                    href={item.href}
                    prefetch={true}
                    className="group flex aspect-square w-[min(42vw,14.75rem)] flex-col items-center justify-center gap-4 rounded-[1.5rem] border border-white/15 bg-black/55 px-4 text-center shadow-[0_8px_40px_rgba(0,0,0,0.35)] backdrop-blur-2xl transition-colors duration-300 hover:border-white/25 hover:bg-black/70 md:w-[16.5rem] md:rounded-[1.75rem]"
                  >
                    <Icon
                      size={32}
                      strokeWidth={1.15}
                      className="text-white transition-transform duration-500 group-hover:scale-105"
                    />
                    <span className="max-w-[9rem] text-[13px] font-light tracking-wide text-white md:text-sm">
                      {item.label}
                    </span>
                  </Link>
                </motion.div>
              );
            })}
          </div>
        </div>

        <div
          className={`absolute inset-x-0 bottom-0 z-20 mx-auto w-full max-w-7xl px-8 pb-28 transition-opacity duration-500 md:px-16 md:pb-36 lg:px-20 ${
            revealed ? "pointer-events-none opacity-0" : "opacity-100"
          }`}
        >
          <div className="relative max-w-xl text-left">
            <div className="pointer-events-none absolute -inset-10 -z-10 bg-gradient-to-tr from-black/85 via-black/40 to-transparent blur-3xl" />
            {hideHero ? (
              <>
                <p className="mb-3 block font-mono text-[10px] font-semibold tracking-[0.35em] text-rose-400 uppercase drop-shadow-md md:text-[11px]">
                  Event Management
                </p>
                <h2 className="font-serif text-3xl leading-[1.08] font-light tracking-tight text-white drop-shadow-xl sm:text-4xl md:text-6xl">
                  Level Two
                </h2>
                <p className="mt-4 max-w-lg font-sans text-xs leading-relaxed font-light text-neutral-300 drop-shadow-md md:text-sm">
                  Private evenings and corporate gatherings, composed as one visual experience.
                </p>
                <Link
                  href="/second-ascent"
                  prefetch={true}
                  className="mt-8 inline-block text-xs tracking-wide text-neutral-300 transition-colors hover:text-white"
                >
                  Open pavilion ↗
                </Link>
              </>
            ) : (
              <>
                <p className="mb-3 block font-mono text-[10px] font-semibold tracking-[0.35em] text-rose-400 uppercase drop-shadow-md md:text-[11px]">
                  Event Management
                </p>
                <h1 className="font-serif text-3xl leading-[1.08] font-light tracking-tight text-white drop-shadow-xl sm:text-4xl md:text-6xl">
                  Level Two
                </h1>
                <p className="mt-4 max-w-lg font-sans text-xs leading-relaxed font-light text-neutral-300 drop-shadow-md md:text-sm">
                  Private evenings and corporate gatherings, composed as one visual experience.
                </p>
              </>
            )}
          </div>
        </div>
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
                              setPlaceholder(PLACEHOLDERS[item.id]);
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
    </section>
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
