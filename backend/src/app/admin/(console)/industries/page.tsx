import Link from "next/link";

import { IndustryForm } from "../../_components/industry-form";
import { listIndustries } from "@/modules/industries/repo";

export const dynamic = "force-dynamic";

export default async function AdminIndustriesPage() {
  const rows = await listIndustries(false).catch(() => []);

  return (
    <div className="admin-grid">
      <header className="admin-page-header">
        <div>
          <h1>Industries</h1>
          <p>Categories visitors browse on the public site.</p>
        </div>
      </header>

      <section className="admin-card">
        <h2>Catalogue</h2>
        {rows.length === 0 ? <p className="admin-muted">No industries yet.</p> : null}
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
                    <Link href={`/admin/industries/${row.slug}`}>{row.name}</Link>
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
        <h2>New industry</h2>
        <IndustryForm mode="create" />
      </section>
    </div>
  );
}
