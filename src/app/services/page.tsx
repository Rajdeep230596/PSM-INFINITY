"use client";

import Link from "next/link";
import { useMemo, useState } from "react";

const services = [
  {
    category: "brand",
    tag: "Identity",
    name: "Personal branding",
    copy: "Voice, portrait, and presence for the individual.",
    price: "Atelier",
    image: "https://images.unsplash.com/photo-1558655146-d09347e92766?auto=format&fit=crop&w=400&q=80",
  },
  {
    category: "brand",
    tag: "House",
    name: "Corporate branding",
    copy: "Name, colour, type, and the rules of the house.",
    price: "System",
    image: "https://images.unsplash.com/photo-1542744173-8e7e53415bb0?auto=format&fit=crop&w=400&q=80",
  },
  {
    category: "brand",
    tag: "Language",
    name: "Visual language",
    copy: "Photography, layout, and the way the brand speaks in print.",
    price: "Atelier",
    image: "https://images.unsplash.com/photo-1561070791-2526d30994b5?auto=format&fit=crop&w=400&q=80",
  },
  {
    category: "brand",
    tag: "Campaign",
    name: "Launch & campaign",
    copy: "A season of work: film, print, and the rooms it enters.",
    price: "Season",
    image: "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?auto=format&fit=crop&w=400&q=80",
  },
  {
    category: "tech",
    tag: "Build",
    name: "Technology",
    copy: "Sites and tools that carry the identity through use.",
    price: "Studio",
    image: "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=400&q=80",
  },
  {
    category: "tech",
    tag: "Product",
    name: "Digital product",
    copy: "Interfaces with the same discipline as the mark.",
    price: "Studio",
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=400&q=80",
  },
  {
    category: "matter",
    tag: "Cloth",
    name: "Textile programmes",
    copy: "Material, mill, and finish — branded in the fibre.",
    price: "Supply",
    image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?auto=format&fit=crop&w=400&q=80",
  },
  {
    category: "matter",
    tag: "Route",
    name: "Logistics",
    copy: "Movement, packing, and the last mile as part of the experience.",
    price: "Supply",
    image: "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=400&q=80",
  },
];

const filters = [
  { id: "all", label: "All" },
  { id: "brand", label: "Branding" },
  { id: "tech", label: "Technology" },
  { id: "matter", label: "Textile & logistics" },
];

export default function ServicesPage() {
  const [filter, setFilter] = useState("all");
  const items = useMemo(
    () => services.filter((item) => filter === "all" || item.category === filter),
    [filter],
  );

  return (
    <>
      <section className="page-hero">
        <div className="container">
          <p className="eyebrow">From the studio</p>
          <h1>The services</h1>
          <p className="lede" style={{ margin: "16px auto 0" }}>
            Five practices, one composition. Brand, technology, cloth, and movement — made to hold together.
          </p>
        </div>
      </section>
      <section className="section" style={{ paddingTop: 40 }}>
        <div className="container">
          <div className="filters">
            {filters.map((item) => (
              <button
                key={item.id}
                className={filter === item.id ? "filter-btn active" : "filter-btn"}
                type="button"
                onClick={() => setFilter(item.id)}
              >
                {item.label}
              </button>
            ))}
          </div>
          <div className="menu-list">
            {items.map((item) => (
              <article className="menu-item" key={item.name}>
                <img src={item.image} alt={item.name} />
                <div>
                  <span className="tag">{item.tag}</span>
                  <h3>{item.name}</h3>
                  <p>{item.copy}</p>
                </div>
                <div className="price">{item.price}</div>
              </article>
            ))}
          </div>
          <div style={{ textAlign: "center", marginTop: 40 }}>
            <Link className="btn btn-primary" href="/locations">
              Visit the Ballygunge studio
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
