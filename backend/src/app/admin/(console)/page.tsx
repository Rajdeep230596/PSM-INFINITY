import Link from "next/link";

import { getAdminEmail } from "@/lib/auth";
import { listCompanies } from "@/modules/companies/repo";
import { listIndustries } from "@/modules/industries/repo";
import { listProducts } from "@/modules/products/repo";

export const dynamic = "force-dynamic";

export default async function AdminHomePage() {
  const email = await getAdminEmail();
  const industries = await listIndustries(false).catch(() => []);
  const companies = await listCompanies({}).catch(() => []);
  const products = await listProducts({}).catch(() => []);

  return (
    <>
      <header className="admin-page-header">
        <div>
          <h1>Dashboard</h1>
          <p>Signed in as {email}. Unpublished rows stay off the public website API.</p>
        </div>
      </header>

      <section className="admin-grid stats">
        <Link href="/admin/industries" className="admin-card admin-stat">
          <span className="label">Industries</span>
          <span className="value">{industries.length}</span>
        </Link>
        <Link href="/admin/companies" className="admin-card admin-stat">
          <span className="label">Companies</span>
          <span className="value">{companies.length}</span>
        </Link>
        <Link href="/admin/products" className="admin-card admin-stat">
          <span className="label">Products</span>
          <span className="value">{products.length}</span>
        </Link>
      </section>
    </>
  );
}
