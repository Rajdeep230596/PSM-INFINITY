"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

import { FIRST_ASCENT_LINKS } from "@/content/first-ascent";
import { GROUND_ZERO_LINKS } from "@/content/ground-zero";
import { SECOND_ASCENT_LINKS } from "@/content/second-ascent";
import { site } from "@/content/site";
import { getWhatsAppUrl } from "@/lib/constants";

function NavDropdown({
  href,
  label,
  active,
  open,
  links,
  pathname,
  onOpen,
  onClose,
  onNavigate,
}: {
  href: string;
  label: string;
  active: boolean;
  open: boolean;
  links: readonly { href: string; label: string }[];
  pathname: string;
  onOpen: () => void;
  onClose: () => void;
  onNavigate: () => void;
}) {
  return (
    <li
      className={open ? "nav-item-dropdown is-open" : "nav-item-dropdown"}
      onMouseEnter={onOpen}
      onMouseLeave={onClose}
      onFocusCapture={onOpen}
      onBlurCapture={(event) => {
        const next = event.relatedTarget as Node | null;
        if (!next || !event.currentTarget.contains(next)) onClose();
      }}
    >
      <Link href={href} prefetch={true} className={active ? "active" : undefined} aria-haspopup="true" aria-expanded={open}>
        {label}
      </Link>
      <div className="nav-dropdown">
        {links.map((link) => (
          <Link
            key={link.href}
            href={link.href}
            prefetch={true}
            className={pathname === link.href ? "active" : undefined}
            onClick={onNavigate}
          >
            {link.label}
          </Link>
        ))}
      </div>
    </li>
  );
}

export function SiteHeader() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [hovered, setHovered] = useState<string | null>(null);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    let frame = 0;
    const sync = () => {
      frame = 0;
      setScrolled(window.scrollY > 12);
    };
    const onScroll = () => {
      if (frame) return;
      frame = window.requestAnimationFrame(sync);
    };
    sync();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      if (frame) window.cancelAnimationFrame(frame);
    };
  }, []);

  useEffect(() => {
    setOpen(false);
    setHovered(null);
    const focused = document.activeElement;
    if (focused instanceof HTMLElement && focused.closest(".site-header")) {
      focused.blur();
    }
  }, [pathname]);

  const groundZeroActive = pathname === "/ground-zero" || pathname.startsWith("/ground-zero/");
  const firstAscentActive = pathname === "/first-ascent" || pathname.startsWith("/first-ascent/");
  const secondAscentActive = pathname === "/second-ascent" || pathname.startsWith("/second-ascent/");

  return (
    <header className={scrolled ? "site-header scrolled" : "site-header"}>
      <div className="nav-wrap">
        <Link className="logo" href="/" prefetch={true} aria-label={`${site.name} home`}>
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
              if (item.href === "/ground-zero") {
                return (
                  <NavDropdown
                    key={item.href}
                    href={item.href}
                    label={item.label}
                    active={groundZeroActive}
                    open={hovered === "ground-zero"}
                    links={GROUND_ZERO_LINKS}
                    pathname={pathname}
                    onOpen={() => setHovered("ground-zero")}
                    onClose={() => setHovered(null)}
                    onNavigate={() => setOpen(false)}
                  />
                );
              }
              if (item.href === "/first-ascent") {
                return (
                  <NavDropdown
                    key={item.href}
                    href={item.href}
                    label={item.label}
                    active={firstAscentActive}
                    open={hovered === "first-ascent"}
                    links={FIRST_ASCENT_LINKS}
                    pathname={pathname}
                    onOpen={() => setHovered("first-ascent")}
                    onClose={() => setHovered(null)}
                    onNavigate={() => setOpen(false)}
                  />
                );
              }
              if (item.href === "/second-ascent") {
                return (
                  <NavDropdown
                    key={item.href}
                    href={item.href}
                    label={item.label}
                    active={secondAscentActive}
                    open={hovered === "second-ascent"}
                    links={SECOND_ASCENT_LINKS}
                    pathname={pathname}
                    onOpen={() => setHovered("second-ascent")}
                    onClose={() => setHovered(null)}
                    onNavigate={() => setOpen(false)}
                  />
                );
              }
              const active = pathname === item.href;
              return (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    prefetch={true}
                    className={active ? "active" : undefined}
                    onClick={() => setOpen(false)}
                  >
                    {item.label}
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>
        <div className="nav-actions">
          <a
            className="nav-cta"
            href={getWhatsAppUrl("Hello PSM Infinity, I am seeking a confidential inquiry regarding your global services.")}
            target="_blank"
            rel="noopener noreferrer"
          >
            Get in touch
          </a>
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
