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
    <main style={{ padding: 32, display: "grid", gap: 16, maxWidth: 960 }}>
      <p>
        <Link href="/admin/industries">← Industries</Link>
      </p>
      <h1>Edit industry</h1>
      <IndustryForm
        mode="edit"
        currentSlug={row.slug}
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
    </main>
  );
}
