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
    <div className="admin-grid">
      <header className="admin-page-header">
        <div>
          <h1>Companies</h1>
          <p>Partner companies linked to an industry.</p>
        </div>
      </header>

      <section className="admin-card">
        <h2>Catalogue</h2>
        {industries.length === 0 ? <p className="admin-muted">Create an industry before adding companies.</p> : null}
        {rows.length === 0 ? <p className="admin-muted">No companies yet.</p> : null}
        {rows.length > 0 ? (
          <table className="admin-table">
            <thead>
              <tr>
                <th>Name</th>
                <th>Slug</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {rows.map((row) => (
                <tr key={row.id}>
                  <td>
                    <Link href={`/admin/companies/${row.slug}`}>{row.name}</Link>
                  </td>
                  <td>
                    <code>{row.slug}</code>
                  </td>
                  <td>
                    <span className={row.published ? "admin-badge" : "admin-badge draft"}>
                      {row.published ? "Published" : "Draft"}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : null}
      </section>

      <section className="admin-card">
        <h2>New company</h2>
        <CompanyForm mode="create" industries={industries.map((row) => ({ id: row.id, name: row.name }))} />
      </section>
    </div>
  );
}
