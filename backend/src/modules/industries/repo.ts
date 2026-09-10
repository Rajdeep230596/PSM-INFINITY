import { getPool } from "@/lib/db";

export type IndustryRow = {
  id: number;
  slug: string;
  name: string;
  summary: string;
  description: string | null;
  hero_media_url: string | null;
  sort_order: number;
  published: number;
};

export async function listIndustries(publishedOnly: boolean) {
  const pool = getPool();
  const [rows] = await pool.query(
    publishedOnly
      ? "SELECT * FROM industries WHERE published = 1 ORDER BY sort_order ASC, name ASC"
      : "SELECT * FROM industries ORDER BY sort_order ASC, name ASC",
  );
  return rows as IndustryRow[];
}

export async function getIndustryBySlug(slug: string) {
  const pool = getPool();
  const [rows] = await pool.query("SELECT * FROM industries WHERE slug = ? LIMIT 1", [slug]);
  return (rows as IndustryRow[])[0] ?? null;
}

export async function createIndustry(input: {
  slug: string;
  name: string;
  summary: string;
  description?: string | null;
  hero_media_url?: string | null;
  sort_order?: number;
  published?: boolean;
}) {
  const pool = getPool();
  const [result] = await pool.execute(
    `INSERT INTO industries (slug, name, summary, description, hero_media_url, sort_order, published)
     VALUES (?, ?, ?, ?, ?, ?, ?)`,
    [
      input.slug,
      input.name,
      input.summary,
      input.description ?? null,
      input.hero_media_url ?? null,
      input.sort_order ?? 0,
      input.published === false ? 0 : 1,
    ],
  );
  return (result as { insertId: number }).insertId;
}

export async function updateIndustry(
  id: number,
  input: Partial<{
    slug: string;
    name: string;
    summary: string;
    description: string | null;
    hero_media_url: string | null;
    sort_order: number;
    published: boolean;
  }>,
) {
  const current = await getIndustryById(id);
  if (!current) return null;
  const pool = getPool();
  await pool.execute(
    `UPDATE industries SET slug = ?, name = ?, summary = ?, description = ?, hero_media_url = ?, sort_order = ?, published = ? WHERE id = ?`,
    [
      input.slug ?? current.slug,
      input.name ?? current.name,
      input.summary ?? current.summary,
      input.description === undefined ? current.description : input.description,
      input.hero_media_url === undefined ? current.hero_media_url : input.hero_media_url,
      input.sort_order ?? current.sort_order,
      input.published === undefined ? current.published : input.published ? 1 : 0,
      id,
    ],
  );
  return getIndustryById(id);
}

export async function getIndustryById(id: number) {
  const pool = getPool();
  const [rows] = await pool.query("SELECT * FROM industries WHERE id = ? LIMIT 1", [id]);
  return (rows as IndustryRow[])[0] ?? null;
}

export async function deleteIndustry(id: number) {
  const pool = getPool();
  const [result] = await pool.execute("DELETE FROM industries WHERE id = ?", [id]);
  return (result as { affectedRows: number }).affectedRows > 0;
}
