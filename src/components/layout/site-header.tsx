"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useId, useRef, useState } from "react";

import { FIRST_ASCENT_LINKS } from "@/content/first-ascent";
import { GROUND_ZERO_LINKS } from "@/content/ground-zero";
import { SECOND_ASCENT_LINKS } from "@/content/second-ascent";
import { site } from "@/content/site";
import { getWhatsAppUrl } from "@/lib/constants";
import { pathMatches } from "@/lib/path";

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
        <div className="nav-dropdown-panel">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              prefetch={false}
              className={pathMatches(pathname, link.href) ? "active" : undefined}
              onClick={onNavigate}
            >
              {link.label}
            </Link>
          ))}
        </div>
      </div>
    </li>
  );
}

export function SiteHeader() {
  const pathname = usePathname();
  const menuId = useId();
  const [open, setOpen] = useState(false);
  const [hovered, setHovered] = useState<string | null>(null);
  const [scrolled, setScrolled] = useState(false);
  const [navPath, setNavPath] = useState(pathname);
  const menuRef = useRef<HTMLUListElement>(null);
  const toggleRef = useRef<HTMLButtonElement>(null);

  if (pathname !== navPath) {
    setNavPath(pathname);
    setOpen(false);
    setHovered(null);
  }

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
    const focused = document.activeElement;
    if (focused instanceof HTMLElement && focused.closest(".site-header")) {
      focused.blur();
    }
  }, [pathname]);

  useEffect(() => {
    if (!open) return;

    const previousOverflow = document.body.style.overflow;
    const previousHtmlOverflow = document.documentElement.style.overflow;
    document.body.style.overflow = "hidden";
    document.documentElement.style.overflow = "hidden";

    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setOpen(false);
        toggleRef.current?.focus();
        return;
      }
      if (event.key !== "Tab") return;
      const root = menuRef.current;
      if (!root) return;
      const items = Array.from(root.querySelectorAll<HTMLElement>("a, button"));
      if (!items.length) return;
      const first = items[0];
      const last = items[items.length - 1];
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };

    window.addEventListener("keydown", onKey);
    const firstLink = menuRef.current?.querySelector<HTMLElement>("a");
    firstLink?.focus();

    return () => {
      document.body.style.overflow = previousOverflow;
      document.documentElement.style.overflow = previousHtmlOverflow;
      window.removeEventListener("keydown", onKey);
    };
  }, [open]);

  useEffect(() => {
    const onResize = () => {
      if (window.matchMedia("(min-width: 768px)").matches) setOpen(false);
    };
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  const groundZeroActive = pathMatches(pathname, "/ground-zero");
  const firstAscentActive = pathMatches(pathname, "/first-ascent");
  const secondAscentActive = pathMatches(pathname, "/second-ascent");

  return (
    <header className={scrolled ? "site-header scrolled" : "site-header"}>
      {open ? (
        <button type="button" className="nav-overlay" aria-label="Close menu" onClick={() => setOpen(false)} />
      ) : null}
      <div className="nav-wrap">
        <Link className="logo" href="/" prefetch={true} aria-label={`${site.name} home`}>
          <img
            src="/brand/psm-infinity-logo.png"
            alt=""
            className="logo-mark"
            width={129}
            height={77}
            decoding="async"
            fetchPriority="high"
          />
        </Link>
        <nav>
          <ul id={menuId} ref={menuRef} className={open ? "nav-links open" : "nav-links"}>
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
              const active = pathMatches(pathname, item.href);
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
            ref={toggleRef}
            className="menu-toggle"
            type="button"
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            aria-controls={menuId}
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
