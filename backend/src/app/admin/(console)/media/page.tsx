import Link from "next/link";

import { toAbsoluteUrl } from "@/lib/storage/disk";
import { listMedia } from "@/modules/media/repo";

import { MediaDeleteButton } from "../../_components/media-delete-button";

export const dynamic = "force-dynamic";

export default async function AdminMediaPage() {
  const rows = await listMedia().catch(() => []);

  return (
    <div className="admin-grid">
      <header className="admin-page-header">
        <div>
          <h1>Media</h1>
          <p>
            Upload from an industry, company, or product edit form. Files are stored under{" "}
            <code>/public/assets/uploads/</code>.
          </p>
        </div>
      </header>

      <section className="admin-card">
        <h2>Library</h2>
        {rows.length === 0 ? <p className="admin-muted">No media yet.</p> : null}
        <div className="admin-media-grid">
          {rows.map((row) => {
            const abs = toAbsoluteUrl(row.url);
            return (
              <article key={row.id} className="admin-media-item">
                <div>
                  #{row.id} · {row.owner_type} #{row.owner_id} · {row.kind}
                  {row.original_name ? ` · ${row.original_name}` : ""}
                </div>
                <Link href={abs} target="_blank" rel="noreferrer">
                  {abs}
                </Link>
                {row.kind === "image" ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img src={abs} alt={row.alt || ""} />
                ) : null}
                <MediaDeleteButton id={row.id} />
              </article>
            );
          })}
        </div>
      </section>
    </div>
  );
}
