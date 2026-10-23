import Link from "next/link";
import { notFound } from "next/navigation";

import { CompanyForm } from "../../../_components/company-form";
import { getCompanyBySlug } from "@/modules/companies/repo";
import { listIndustries } from "@/modules/industries/repo";

export const dynamic = "force-dynamic";

export default async function EditCompanyPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const row = await getCompanyBySlug(slug);
  if (!row) notFound();
  const industries = await listIndustries(false);

  return (
    <div className="admin-grid">
      <Link href="/admin/companies" className="admin-back">
        ← Companies
      </Link>
      <header className="admin-page-header">
        <div>
          <h1>Edit company</h1>
          <p>
            <code>{row.slug}</code>
          </p>
        </div>
      </header>
      <section className="admin-card">
        <CompanyForm
          mode="edit"
          currentSlug={row.slug}
          ownerId={row.id}
          industries={industries.map((industry) => ({ id: industry.id, name: industry.name }))}
          initial={{
            slug: row.slug,
            name: row.name,
            industry_id: row.industry_id,
            summary: row.summary,
            positioning: row.positioning ?? "",
            logo_url: row.logo_url ?? "",
            website_url: row.website_url ?? "",
            published: Boolean(row.published),
          }}
        />
      </section>
    </div>
  );
}
