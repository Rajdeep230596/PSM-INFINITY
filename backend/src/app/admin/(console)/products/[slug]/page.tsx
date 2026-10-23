import Link from "next/link";
import { notFound } from "next/navigation";

import { ProductForm } from "../../../_components/product-form";
import { listCompanies } from "@/modules/companies/repo";
import { getProductBySlug, listSpecs } from "@/modules/products/repo";

export const dynamic = "force-dynamic";

export default async function EditProductPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const row = await getProductBySlug(slug);
  if (!row) notFound();
  const [companies, specs] = await Promise.all([listCompanies({}), listSpecs(row.id)]);

  return (
    <div className="admin-grid">
      <Link href="/admin/products" className="admin-back">
        ← Products
      </Link>
      <header className="admin-page-header">
        <div>
          <h1>Edit product</h1>
          <p>
            <code>{row.slug}</code>
          </p>
        </div>
      </header>
      <section className="admin-card">
        <ProductForm
          mode="edit"
          currentSlug={row.slug}
          ownerId={row.id}
          companies={companies.map((company) => ({ id: company.id, name: company.name }))}
          initial={{
            slug: row.slug,
            name: row.name,
            company_id: row.company_id,
            summary: row.summary,
            destination_url: row.destination_url ?? "",
            published: Boolean(row.published),
            specsText: specs.map((spec) => `${spec.label}: ${spec.value}`).join("\n"),
          }}
        />
      </section>
    </div>
  );
}
