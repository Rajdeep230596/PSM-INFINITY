import Link from "next/link";

import { toAbsoluteUrl } from "@/lib/storage/disk";
import { listMedia } from "@/modules/media/repo";

import { MediaDeleteButton } from "../../_components/media-delete-button";

export const dynamic = "force-dynamic";

export default async function AdminMediaPage() {
  const rows = await listMedia().catch(() => []);

  return (
    <main style={{ padding: 32, display: "grid", gap: 24, maxWidth: 960 }}>
      <section>
        <h1>Media</h1>
        <p>
          Upload from an industry, company, or product edit form after the record exists. Files land in{" "}
          <code>/public/assets/uploads/</code> (disk adapter — swappable after the GoDaddy persistence test).
        </p>
        {rows.length === 0 ? <p>No media yet.</p> : null}
        <ul style={{ display: "grid", gap: 12, padding: 0, listStyle: "none" }}>
          {rows.map((row) => {
            const abs = toAbsoluteUrl(row.url);
            return (
              <li
                key={row.id}
                style={{
                  display: "grid",
                  gap: 6,
                  padding: 12,
                  border: "1px solid #333",
                  borderRadius: 6,
                }}
              >
                <div>
                  #{row.id} · {row.owner_type} #{row.owner_id} · {row.kind}
                  {row.original_name ? ` · ${row.original_name}` : ""}
                </div>
                <Link href={abs} target="_blank" rel="noreferrer">
                  {abs}
                </Link>
                {row.kind === "image" ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img src={abs} alt={row.alt || ""} style={{ maxWidth: 220, maxHeight: 140, objectFit: "contain" }} />
                ) : null}
                <MediaDeleteButton id={row.id} />
              </li>
            );
          })}
        </ul>
      </section>
    </main>
  );
}
