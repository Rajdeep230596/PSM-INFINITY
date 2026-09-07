"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

import { site } from "@/content/site";

function LogoMark() {
  return (
    <svg className="logo-mark" viewBox="0 0 64 64" aria-hidden="true">
      <circle cx="32" cy="32" r="30" fill="#2c1c14" />
      <circle cx="32" cy="32" r="24" fill="none" stroke="#e6d5bc" strokeWidth="1.4" />
      <path
        d="M18 32c0-5.5 4.5-10 10-10 3.8 0 6.6 1.8 10 5.2C41.4 23.8 44.2 22 48 22c5.5 0 10 4.5 10 10s-4.5 10-10 10c-3.8 0-6.6-1.8-10-5.2C34.6 40.2 31.8 42 28 42c-5.5 0-10-4.5-10-10z"
        fill="#a66b45"
      />
    </svg>
  );
}

export function SiteHeader() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header className={scrolled ? "site-header scrolled" : "site-header"}>
      <div className="nav-wrap">
        <Link className="logo" href="/" aria-label={`${site.name} home`}>
          <LogoMark />
          <span className="logo-text">
            <strong>PSM</strong>
            <span>Infinity</span>
          </span>
        </Link>
        <nav>
          <ul className={open ? "nav-links open" : "nav-links"}>
            {site.navigation.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className={pathname === item.href ? "active" : undefined}
                  onClick={() => setOpen(false)}
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
        <Link className="btn btn-primary nav-cta" href="/locations">
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
    </header>
  );
}
