"use client";

import Link from "next/link";
import { useEffect, useId, useRef, useState } from "react";

import { searchCatalogue, type SearchHit } from "@/lib/backend-api";

function flattenHits(payload: Awaited<ReturnType<typeof searchCatalogue>>) {
  const data = payload.data || {};
  return [
    ...(data.industries || []),
    ...(data.companies || []),
    ...(data.products || []),
  ] as SearchHit[];
}

function pathFor(hit: SearchHit) {
  if (hit.type === "industry") return `/catalogue/industries/${hit.slug}`;
  if (hit.type === "company") return `/catalogue/companies/${hit.slug}`;
  return `/catalogue/products/${hit.slug}`;
}

export function SiteSearch() {
  const panelId = useId();
  const inputRef = useRef<HTMLInputElement>(null);
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");
  const [hits, setHits] = useState<SearchHit[]>([]);

  useEffect(() => {
    if (!open) return;
    inputRef.current?.focus();
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  useEffect(() => {
    const q = query.trim();
    if (q.length < 2) {
      setHits([]);
      setError("");
      return;
    }
    let cancelled = false;
    const timer = window.setTimeout(async () => {
      setBusy(true);
      setError("");
      try {
        const payload = await searchCatalogue(q);
        if (cancelled) return;
        if (payload.error) {
          setError(payload.error);
          setHits([]);
        } else {
          setHits(flattenHits(payload));
        }
      } catch {
        if (!cancelled) {
          setError("Search is unavailable. Is the backend running?");
          setHits([]);
        }
      } finally {
        if (!cancelled) setBusy(false);
      }
    }, 280);
    return () => {
      cancelled = true;
      window.clearTimeout(timer);
    };
  }, [query]);

  return (
    <>
      <button
        type="button"
        className="site-search-trigger"
        aria-expanded={open}
        aria-controls={panelId}
        onClick={() => setOpen((value) => !value)}
      >
        <span>Search</span>
        ⌕
      </button>

      {open ? (
        <div id={panelId} className="site-search-overlay" role="dialog" aria-label="Catalogue search">
          <div style={{ display: "flex", justifyContent: "space-between", gap: 12, marginBottom: 10 }}>
            <p className="site-search-meta" style={{ margin: 0 }}>
              Search companies & products
            </p>
            <button type="button" className="site-search-close" onClick={() => setOpen(false)}>
              Close
            </button>
          </div>
          <input
            ref={inputRef}
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Try villa, linen, hospitality…"
            aria-label="Search catalogue"
          />
          <div className="site-search-results">
            {busy ? <p className="site-search-meta">Searching…</p> : null}
            {error ? <p className="site-search-meta">{error}</p> : null}
            {!busy && !error && query.trim().length >= 2 && hits.length === 0 ? (
              <p className="site-search-meta">No matches yet.</p>
            ) : null}
            {hits.map((hit) => (
              <Link
                key={`${hit.type}-${hit.id}`}
                href={pathFor(hit)}
                className="site-search-hit"
                onClick={() => setOpen(false)}
              >
                <strong>{hit.name}</strong>
                <span>
                  {hit.type} · {hit.summary}
                </span>
              </Link>
            ))}
          </div>
        </div>
      ) : null}
    </>
  );
}
