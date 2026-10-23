"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import { LogoutButton } from "../_components/logout-button";

const links = [
  { href: "/admin", label: "Dashboard", exact: true },
  { href: "/admin/industries", label: "Industries" },
  { href: "/admin/companies", label: "Companies" },
  { href: "/admin/products", label: "Products" },
  { href: "/admin/media", label: "Media" },
];

export default function AdminConsoleLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  return (
    <div className="admin-shell">
      <aside className="admin-sidebar">
        <div className="admin-brand">
          <strong>PSM Infinity</strong>
          <span>Owner console</span>
        </div>
        <nav className="admin-nav" aria-label="Admin">
          {links.map((link) => {
            const active = link.exact ? pathname === link.href : pathname.startsWith(link.href);
            return (
              <Link key={link.href} href={link.href} className={active ? "is-active" : undefined}>
                {link.label}
              </Link>
            );
          })}
        </nav>
        <div className="admin-sidebar-foot">
          <LogoutButton />
        </div>
      </aside>
      <div className="admin-main">{children}</div>
    </div>
  );
}
