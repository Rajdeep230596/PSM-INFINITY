"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

import { FIRST_ASCENT_LINKS } from "@/content/first-ascent";
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

  const firstAscentActive = pathname === "/first-ascent" || pathname.startsWith("/first-ascent/");

  return (
    <header className={scrolled ? "site-header scrolled" : "site-header"}>
      <div className="nav-wrap">
        <Link className="logo" href="/" aria-label={`${site.name} home`}>
          <span className="logo-orb" aria-hidden="true">
            ∞
          </span>
          <span className="logo-text">
            <strong>PSM INFINITY</strong>
            <span>Global Atelier</span>
          </span>
        </Link>
        <nav>
          <ul className={open ? "nav-links open" : "nav-links"}>
            {site.navigation.map((item) => {
              if (item.href === "/first-ascent") {
                return (
                  <li key={item.href} className="nav-item-dropdown">
                    <Link
                      href={item.href}
                      className={firstAscentActive ? "active" : undefined}
                      aria-haspopup="true"
                    >
                      {item.label}
                    </Link>
                    <div className="nav-dropdown">
                      {FIRST_ASCENT_LINKS.map((link) => (
                        <Link
                          key={link.href}
                          href={link.href}
                          className={pathname === link.href ? "active" : undefined}
                          onClick={() => setOpen(false)}
                        >
                          {link.label}
                        </Link>
                      ))}
                    </div>
                  </li>
                );
              }
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
          <Link className="nav-cta" href="/locations#concierge">
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
