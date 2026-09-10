import Link from "next/link";

import { IndustryForm } from "../../_components/industry-form";
import { listIndustries } from "@/modules/industries/repo";

export const dynamic = "force-dynamic";

export default async function AdminIndustriesPage() {
  const rows = await listIndustries(false).catch(() => []);

  return (
    <main style={{ padding: 32, display: "grid", gap: 32, maxWidth: 960 }}>
      <section>
        <h1>Industries</h1>
        {rows.length === 0 ? <p>No industries yet.</p> : null}
        <ul>
          {rows.map((row) => (
            <li key={row.id}>
              <Link href={`/admin/industries/${row.slug}`}>
                {row.name} ({row.slug}) {row.published ? "" : "— draft"}
              </Link>
            </li>
          ))}
        </ul>
      </section>
      <section>
        <h2>New industry</h2>
        <IndustryForm mode="create" />
      </section>
    </main>
  );
}
