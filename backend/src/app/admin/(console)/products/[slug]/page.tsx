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
    <main style={{ padding: 32, display: "grid", gap: 16, maxWidth: 960 }}>
      <p>
        <Link href="/admin/products">← Products</Link>
      </p>
      <h1>Edit product</h1>
      <ProductForm
        mode="edit"
        currentSlug={row.slug}
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
    </main>
  );
}
