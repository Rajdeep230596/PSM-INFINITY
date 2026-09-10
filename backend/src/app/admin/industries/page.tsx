import { listIndustries } from "@/modules/industries/repo";

export const dynamic = "force-dynamic";

export default async function AdminIndustriesPage() {
  const rows = await listIndustries(false).catch(() => []);

  return (
    <main style={{ padding: 32 }}>
      <h1>Industries</h1>
      <p>Create/update via POST /api/v1/industries while signed in. UI forms come next.</p>
      <ul>
        {rows.map((row) => (
          <li key={row.id}>
            {row.name} ({row.slug}) {row.published ? "" : "— draft"}
          </li>
        ))}
      </ul>
    </main>
  );
}
