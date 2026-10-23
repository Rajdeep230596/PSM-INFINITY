import Link from "next/link";

import { ProductForm } from "../../_components/product-form";
import { listCompanies } from "@/modules/companies/repo";
import { listProducts } from "@/modules/products/repo";

export const dynamic = "force-dynamic";

export default async function AdminProductsPage() {
  const [rows, companies] = await Promise.all([
    listProducts({}).catch(() => []),
    listCompanies({}).catch(() => []),
  ]);

  return (
    <div className="admin-grid">
      <header className="admin-page-header">
        <div>
          <h1>Products</h1>
          <p>Discoverable offerings with optional specs and media.</p>
        </div>
      </header>

      <section className="admin-card">
        <h2>Catalogue</h2>
        {companies.length === 0 ? <p className="admin-muted">Create a company before adding products.</p> : null}
        {rows.length === 0 ? <p className="admin-muted">No products yet.</p> : null}
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
                    <Link href={`/admin/products/${row.slug}`}>{row.name}</Link>
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
        <h2>New product</h2>
        <ProductForm mode="create" companies={companies.map((row) => ({ id: row.id, name: row.name }))} />
      </section>
    </div>
  );
}
