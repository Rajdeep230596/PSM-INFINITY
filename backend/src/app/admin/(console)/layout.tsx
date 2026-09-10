import Link from "next/link";

import { LogoutButton } from "../_components/logout-button";

export default function AdminConsoleLayout({ children }: { children: React.ReactNode }) {
  return (
    <div>
      <header
        style={{
          display: "flex",
          gap: 16,
          alignItems: "center",
          padding: "12px 32px",
          borderBottom: "1px solid #333",
        }}
      >
        <strong>PSM Admin</strong>
        <nav style={{ display: "flex", gap: 12, flex: 1 }}>
          <Link href="/admin">Dashboard</Link>
          <Link href="/admin/industries">Industries</Link>
          <Link href="/admin/companies">Companies</Link>
          <Link href="/admin/products">Products</Link>
        </nav>
        <LogoutButton />
      </header>
      {children}
    </div>
  );
}
