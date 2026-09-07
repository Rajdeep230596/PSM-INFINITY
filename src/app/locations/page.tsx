"use client";

import { useMemo, useState } from "react";

import { site } from "@/content/site";

export default function LocationsPage() {
  const [query, setQuery] = useState("");
  const hay = "ballygunge palit street kolkata maddox amritkunj studio";
  const visible = useMemo(() => {
    const q = query.toLowerCase().trim();
    return !q || hay.includes(q) || site.addressLines.join(" ").toLowerCase().includes(q);
  }, [query]);

  return (
    <>
      <section className="page-hero">
        <div className="container">
          <p className="eyebrow">Visit</p>
          <h1>
            Find the studio
            <br />
            in Kolkata
          </h1>
          <p className="lede" style={{ margin: "16px auto 0" }}>
            {site.hours}. Closed Sunday. Call ahead, or walk in from Maddox Square.
          </p>
        </div>
      </section>
      <section className="section" style={{ paddingTop: 40 }}>
        <div className="container locator">
          <div>
            <input
              className="search"
              type="search"
              placeholder="Search Ballygunge, Palit Street…"
              value={query}
              onChange={(event) => setQuery(event.target.value)}
            />
            {visible ? (
              <article className="location-card">
                <h3>Ballygunge studio</h3>
                <p>
                  {site.addressLines[0]}
                  <br />
                  {site.addressLines[1]}
                  <br />
                  {site.addressLines[2]}
                  <br />
                  {site.hours}
                </p>
                <div className="location-actions">
                  <a
                    className="btn btn-primary"
                    href="https://www.google.com/maps/search/29+Palit+Street+Ballygunge+Kolkata"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Directions
                  </a>
                  <a className="btn btn-ghost" href={`tel:${site.phoneTel}`}>
                    Call
                  </a>
                </div>
              </article>
            ) : (
              <p className="lede">No studio matches that search.</p>
            )}
          </div>
          <div className="map-panel">
            <iframe
              title="PSM Infinity Kolkata map"
              src="https://maps.google.com/maps?q=29+Palit+Street+Ballygunge+Kolkata+700019&t=&z=16&ie=UTF8&iwloc=&output=embed"
              loading="lazy"
            />
          </div>
        </div>
      </section>
    </>
  );
}
