"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

import { site } from "@/content/site";

export function SiteHeader() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  return (
    <header className={scrolled ? "site-header scrolled" : "site-header"}>
      <div className="nav-wrap">
        <Link className="logo" href="/" aria-label={`${site.name} home`}>
          <span className="logo-orb" aria-hidden="true">
            ∞
          </span>
          <span className="logo-text">
            <strong>PSM Infinity</strong>
            <span>Global Atelier</span>
          </span>
        </Link>
        <nav>
          <ul className={open ? "nav-links open" : "nav-links"}>
            {site.navigation.map((item) => {
              const active = pathname === item.href;
              return (
                <li key={item.href}>
                  <Link href={item.href} className={active ? "active" : undefined} onClick={() => setOpen(false)}>
                    {item.label}
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>
        <div className="nav-actions">
          <Link className="nav-cta" href="/locations">
            Get in touch
          </Link>
          <button
            className="menu-toggle"
            type="button"
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            onClick={() => setOpen((value) => !value)}
          >
            <span />
            <span />
            <span />
          </button>
        </div>
      </div>
    </header>
  );
}
