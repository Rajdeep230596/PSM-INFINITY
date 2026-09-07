"use client";

import { useEffect, useState } from "react";

const practices = [
  {
    name: "Personal branding",
    tag: "Identity",
    price: "Atelier",
    desc: "A portrait of you, built to travel — voice, mark, and presence that hold in a room and on a screen.",
    image:
      "https://images.unsplash.com/photo-1558655146-d09347e92766?auto=format&fit=crop&w=600&h=600&q=80",
  },
  {
    name: "Corporate branding",
    tag: "House",
    price: "System",
    desc: "A house system for the company: name, colour, type, and the quiet rules that keep it coherent.",
    image:
      "https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=600&h=600&q=80",
  },
  {
    name: "Technology",
    tag: "Build",
    price: "Studio",
    desc: "Interfaces and platforms that carry the brand — not as decoration, but as the way the work is done.",
    image: "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=600&h=600&q=80",
  },
  {
    name: "Textile & logistics",
    tag: "Matter",
    price: "Supply",
    desc: "Cloth, movement, and the last mile — material programmes and logistics shaped with the same eye as the mark.",
    image:
      "https://images.unsplash.com/photo-1441986300917-64674bd600d8?auto=format&fit=crop&w=600&h=600&q=80",
  },
];

export function PracticeOrbit() {
  const [index, setIndex] = useState(0);
  const [rotation, setRotation] = useState(0);
  const active = practices[index];

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const timer = window.setInterval(() => {
      setIndex((current) => (current + 1) % practices.length);
      setRotation((current) => current - 90);
    }, 4800);
    return () => window.clearInterval(timer);
  }, []);

  const goTo = (nextIndex: number) => {
    if (nextIndex === index) return;
    const count = practices.length;
    const forward = (nextIndex - index + count) % count;
    const backward = (index - nextIndex + count) % count;
    setRotation((current) => current + (forward <= backward ? forward * -90 : backward * 90));
    setIndex(nextIndex);
  };

  return (
    <section className="section story">
      <div className="container orbit-layout" id="pizzaOrbit">
        <p className="orbit-kicker">
          Choose your
          <br />
          practice
        </p>
        <div className="orbit-row">
          <div className="orbit-side orbit-side-left">
            <span className="tag">{active.tag}</span>
            <h3>{active.name}</h3>
            <p className="orbit-price">{active.price}</p>
          </div>
          <div className="orbit-stage">
            <button className="orbit-nav" type="button" aria-label="Previous practice" onClick={() => goTo((index - 1 + practices.length) % practices.length)}>
              <span />
            </button>
            <div className="orbit-ring" style={{ ["--rot" as string]: `${rotation}deg` }}>
              {practices.map((practice, i) => (
                <button
                  key={practice.name}
                  className={i === index ? "orbit-pizza is-active" : "orbit-pizza"}
                  type="button"
                  style={{ ["--slot" as string]: `${i * 90}deg` }}
                  onClick={() => goTo(i)}
                >
          <img src={practice.image} alt={practice.name} />
                </button>
              ))}
            </div>
            <button className="orbit-nav orbit-nav-next" type="button" aria-label="Next practice" onClick={() => goTo((index + 1) % practices.length)}>
              <span />
            </button>
          </div>
          <div className="orbit-side orbit-side-right">
            <p>{active.desc}</p>
          </div>
        </div>
      </div>
    </section>
  );
}
