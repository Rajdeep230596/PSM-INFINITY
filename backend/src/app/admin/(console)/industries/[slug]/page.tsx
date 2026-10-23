import Link from "next/link";
import { notFound } from "next/navigation";

import { IndustryForm } from "../../../_components/industry-form";
import { getIndustryBySlug } from "@/modules/industries/repo";

export const dynamic = "force-dynamic";

export default async function EditIndustryPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const row = await getIndustryBySlug(slug);
  if (!row) notFound();

  return (
    <div className="admin-grid">
      <Link href="/admin/industries" className="admin-back">
        ← Industries
      </Link>
      <header className="admin-page-header">
        <div>
          <h1>Edit industry</h1>
          <p>
            <code>{row.slug}</code>
          </p>
        </div>
      </header>
      <section className="admin-card">
        <IndustryForm
          mode="edit"
          currentSlug={row.slug}
          ownerId={row.id}
          initial={{
            slug: row.slug,
            name: row.name,
            summary: row.summary,
            description: row.description ?? "",
            hero_media_url: row.hero_media_url ?? "",
            sort_order: row.sort_order,
            published: Boolean(row.published),
          }}
        />
      </section>
    </div>
  );
}
