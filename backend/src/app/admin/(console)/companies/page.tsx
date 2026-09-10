import Link from "next/link";

import { CompanyForm } from "../../_components/company-form";
import { listCompanies } from "@/modules/companies/repo";
import { listIndustries } from "@/modules/industries/repo";

export const dynamic = "force-dynamic";

export default async function AdminCompaniesPage() {
  const [rows, industries] = await Promise.all([
    listCompanies({}).catch(() => []),
    listIndustries(false).catch(() => []),
  ]);

  return (
    <main style={{ padding: 32, display: "grid", gap: 32, maxWidth: 960 }}>
      <section>
        <h1>Companies</h1>
        {industries.length === 0 ? <p>Create an industry before adding companies.</p> : null}
        {rows.length === 0 ? <p>No companies yet.</p> : null}
        <ul>
          {rows.map((row) => (
            <li key={row.id}>
              <Link href={`/admin/companies/${row.slug}`}>
                {row.name} ({row.slug}) {row.published ? "" : "— draft"}
              </Link>
            </li>
          ))}
        </ul>
      </section>
      <section>
        <h2>New company</h2>
        <CompanyForm mode="create" industries={industries.map((row) => ({ id: row.id, name: row.name }))} />
      </section>
    </main>
  );
}
