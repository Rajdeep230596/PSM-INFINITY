"use client";

import { useMemo, useState } from "react";

const CUSTOM = "__CUSTOM__";

const TERRITORIES = [
  { value: "Dubai, UAE", label: "Dubai, UAE" },
  { value: "London, UK", label: "London, UK" },
  { value: "Monaco / Côte d'Azur", label: "Monaco / Côte d'Azur" },
  { value: "Zurich / Alps", label: "Zurich / Alps" },
  { value: "New York", label: "New York" },
  { value: "Tokyo", label: "Tokyo" },
  { value: CUSTOM, label: "+ Bespoke Global Location / Multi-City Route…" },
] as const;

const PROTOCOLS = [
  { value: "Executive Diplomatic", label: "Executive Diplomatic" },
  { value: "Armored Concourse (VR7/VR9/VR10)", label: "Armored Concourse (VR7/VR9/VR10)" },
  { value: "Shadow Convoy", label: "Shadow Convoy" },
  { value: "Private Escort", label: "Private Escort" },
  { value: CUSTOM, label: "+ Tailored Security & Protocol Mandate…" },
] as const;

const WINDOWS = [
  { value: "Immediate Air Priority (24–48h)", label: "Immediate Air Priority (Within 24–48h)" },
  { value: "Scheduled Season / Event", label: "Scheduled Season / Event (Grand Prix, Art Basel)" },
  { value: "Standing Retainer", label: "Standing Retainer" },
  { value: CUSTOM, label: "+ Flexible / Multi-Week Deployment…" },
] as const;

export const DESK_ASSETS: Record<string, { value: string; label: string }[]> = {
  itineraries: [
    { value: "Gulfstream G700", label: "Gulfstream G700" },
    { value: "Bombardier Global 7500", label: "Bombardier Global 7500" },
    { value: "Dassault Falcon 10X", label: "Dassault Falcon 10X" },
    { value: CUSTOM, label: "+ Commission Any Aircraft or Tail Number…" },
  ],
  yachts: [
    { value: "60m+ Superyacht", label: "60m+ Superyacht" },
    { value: "Ice-Class Explorer", label: "Ice-Class Explorer" },
    { value: "High-Speed Day Cruiser", label: "High-Speed Day Cruiser" },
    { value: CUSTOM, label: "+ Source Any Unlisted Vessel…" },
  ],
  villas: [
    { value: "Coastal Sanctuary", label: "Coastal Sanctuary" },
    { value: "Mountain Retreat", label: "Mountain Retreat" },
    { value: "Private Island", label: "Private Island" },
    { value: "Tuscan Estate", label: "Tuscan Estate" },
    { value: CUSTOM, label: "+ Unlisted Compound or Architecture…" },
  ],
  chauffeur: [
    { value: "Rolls-Royce Phantom VIII", label: "Rolls-Royce Phantom VIII" },
    { value: "Mercedes-Maybach S680", label: "Mercedes-Maybach S680" },
    { value: "Armored Range Rover Sentinel", label: "Armored Range Rover Sentinel" },
    { value: CUSTOM, label: "+ Commission Any Vehicle, Yacht, or Asset…" },
  ],
};

const ASSET_PLACEHOLDERS: Record<string, string> = {
  itineraries: "e.g. G650ER tail number, cabin configuration, or dual-aircraft pairing",
  yachts: "e.g. 72m explorer, ice class, or unnamed owner vessel",
  villas: "e.g. unnamed island compound, alpine chalet, or off-market palazzo",
  chauffeur: "Specify exact year, PTS color, interior leather, or armoring standard",
};

type DeskMode = "guided" | "open";

type Props = {
  slug: string;
  cta: string;
  onRequisition: (brief: string) => void;
};

export function BespokeConciergeDesk({ slug, cta, onRequisition }: Props) {
  const assets = DESK_ASSETS[slug] ?? DESK_ASSETS.chauffeur;
  const [mode, setMode] = useState<DeskMode>("guided");

  const [territory, setTerritory] = useState<string>(TERRITORIES[0].value);
  const [customTerritory, setCustomTerritory] = useState("");
  const [protocol, setProtocol] = useState<string>(PROTOCOLS[0].value);
  const [customProtocol, setCustomProtocol] = useState("");
  const [schedule, setSchedule] = useState<string>(WINDOWS[0].value);
  const [customSchedule, setCustomSchedule] = useState("");
  const [asset, setAsset] = useState<string>(assets[0].value);
  const [customAsset, setCustomAsset] = useState("");
  const [openBrief, setOpenBrief] = useState("");

  const brief = useMemo(() => {
    if (mode === "open") {
      return openBrief.trim() || "Open custom brief — specialist to qualify the mandate.";
    }
    const place = territory === CUSTOM ? customTerritory.trim() || "Bespoke global location" : territory;
    const tier = protocol === CUSTOM ? customProtocol.trim() || "Tailored security mandate" : protocol;
    const when = schedule === CUSTOM ? customSchedule.trim() || "Flexible deployment" : schedule;
    const spec = asset === CUSTOM ? customAsset.trim() || "Unlisted asset — to be sourced" : asset;
    return `${place} · ${tier} · ${when} · ${spec}`;
  }, [
    mode,
    openBrief,
    territory,
    customTerritory,
    protocol,
    customProtocol,
    schedule,
    customSchedule,
    asset,
    customAsset,
  ]);

  return (
    <section className="fa-desk">
      <div className="fa-desk-panel">
        <div className="fa-desk-head">
          <div>
            <span className="mb-1 block font-mono text-[10px] tracking-[0.3em] text-amber-300/80 uppercase">
              Global Acquisition Desk
            </span>
            <h3 className="font-serif text-xl font-light text-white">Bespoke Requisition Protocol</h3>
          </div>
          <div className="inline-flex rounded-full border border-white/[0.08] bg-white/[0.04] p-1">
            <button
              type="button"
              onClick={() => setMode("guided")}
              className={
                mode === "guided"
                  ? "rounded-full bg-[#E8D8C8] px-4 py-1.5 text-xs font-medium text-black shadow-sm"
                  : "rounded-full px-4 py-1.5 text-xs font-medium text-neutral-400 transition-colors hover:text-white"
              }
            >
              Guided Parameters
            </button>
            <button
              type="button"
              onClick={() => setMode("open")}
              className={
                mode === "open"
                  ? "rounded-full bg-[#E8D8C8] px-4 py-1.5 text-xs font-medium text-black shadow-sm"
                  : "rounded-full px-4 py-1.5 text-xs font-medium text-neutral-400 transition-colors hover:text-white"
              }
            >
              Open Custom Brief
            </button>
          </div>
        </div>

        {mode === "guided" ? (
          <div className="fa-desk-grid">
            <RequisitionField
              label="Destination / Territory"
              value={territory}
              onChange={setTerritory}
              options={TERRITORIES}
              customValue={customTerritory}
              onCustomChange={setCustomTerritory}
              customPlaceholder="e.g., Private airstrip in Gstaad or remote Grecian archipelago"
            />
            <RequisitionField
              label="Service / Protocol Tier"
              value={protocol}
              onChange={setProtocol}
              options={PROTOCOLS}
              customValue={customProtocol}
              onCustomChange={setCustomProtocol}
              customPlaceholder="e.g., Embassy-grade convoy, dual-language close protection"
            />
            <RequisitionField
              label="Deployment Window"
              value={schedule}
              onChange={setSchedule}
              options={WINDOWS}
              customValue={customSchedule}
              onCustomChange={setCustomSchedule}
              customPlaceholder="e.g., 12–18 October, or standing May–September retainer"
            />
            <RequisitionField
              label="Target Asset / Spec"
              value={asset}
              onChange={setAsset}
              options={assets}
              customValue={customAsset}
              onCustomChange={setCustomAsset}
              customPlaceholder={ASSET_PLACEHOLDERS[slug] ?? ASSET_PLACEHOLDERS.chauffeur}
            />
          </div>
        ) : (
          <div className="w-full space-y-4 text-left">
            <label className="block font-mono text-[10px] tracking-widest text-neutral-400 uppercase">
              Specify Exact Global Requisition (Any Asset, Route, or Architecture)
            </label>
            <textarea
              rows={4}
              value={openBrief}
              onChange={(event) => setOpenBrief(event.target.value)}
              placeholder="Detail your exact requirements: e.g., 'Require two armored Maybachs and tarmac airside greeting in Geneva on October 14th, with chartered helicopter transfer to Courchevel.'"
              className="w-full rounded-2xl border border-white/10 bg-white/[0.02] p-4 text-sm text-white placeholder-neutral-600 outline-none transition-colors focus:border-amber-300/60"
            />
          </div>
        )}

        <div className="fa-desk-cta">
          <button
            type="button"
            onClick={() => onRequisition(brief)}
            className="flex items-center gap-2 rounded-full bg-[#E8D8C8] px-8 py-3.5 text-xs font-semibold text-black shadow-[0_4px_20px_rgba(232,216,200,0.2)] transition-[transform,opacity,color,background-color,border-color,box-shadow] duration-300 hover:bg-white"
          >
            <span>{cta}</span>
            <span className="text-xs">↗</span>
          </button>
        </div>
      </div>
    </section>
  );
}

function RequisitionField({
  label,
  value,
  onChange,
  options,
  customValue,
  onCustomChange,
  customPlaceholder,
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
  options: readonly { value: string; label: string }[];
  customValue: string;
  onCustomChange: (value: string) => void;
  customPlaceholder: string;
}) {
  return (
    <div className="flex min-w-0 flex-col text-left">
      <label className="mb-2 font-mono text-[10px] tracking-widest text-neutral-400 uppercase">{label}</label>
      <select
        value={value}
        onChange={(event) => onChange(event.target.value)}
        className="w-full appearance-none border-0 border-b border-white/20 bg-transparent pb-2 text-sm text-white outline-none transition-colors focus:border-amber-300"
      >
        {options.map((option) => (
          <option
            key={option.value}
            value={option.value}
            className={option.value === CUSTOM ? "bg-[#111114] text-amber-300" : "bg-[#111114]"}
          >
            {option.label}
          </option>
        ))}
      </select>
      {value === CUSTOM ? (
        <input
          type="text"
          value={customValue}
          onChange={(event) => onCustomChange(event.target.value)}
          placeholder={customPlaceholder}
          className="mt-3 border-0 border-b border-amber-400/40 bg-white/[0.03] px-2 py-1.5 text-xs text-white placeholder-neutral-500 outline-none"
        />
      ) : null}
    </div>
  );
}
