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
    <main style={{ padding: 32, maxWidth: 960, margin: "0 auto" }}>
      <p>Signed in as {email}</p>
      <h1>Dashboard</h1>
      <ul>
        <li>
          <Link href="/admin/industries">Industries: {industries.length}</Link>
        </li>
        <li>
          <Link href="/admin/companies">Companies: {companies.length}</Link>
        </li>
        <li>
          <Link href="/admin/products">Products: {products.length}</Link>
        </li>
      </ul>
      <p>Unpublished rows stay out of the public API used by the marketing site.</p>
    </main>
  );
}
