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
    <main style={{ padding: 32, display: "grid", gap: 32, maxWidth: 960 }}>
      <section>
        <h1>Products</h1>
        {companies.length === 0 ? <p>Create a company before adding products.</p> : null}
        {rows.length === 0 ? <p>No products yet.</p> : null}
        <ul>
          {rows.map((row) => (
            <li key={row.id}>
              <Link href={`/admin/products/${row.slug}`}>
                {row.name} ({row.slug}) {row.published ? "" : "— draft"}
              </Link>
            </li>
          ))}
        </ul>
      </section>
      <section>
        <h2>New product</h2>
        <ProductForm mode="create" companies={companies.map((row) => ({ id: row.id, name: row.name }))} />
      </section>
    </main>
  );
}
