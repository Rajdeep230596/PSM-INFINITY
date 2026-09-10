import { getPool } from "@/lib/db";

export type CompanyRow = {
  id: number;
  slug: string;
  name: string;
  industry_id: number;
  summary: string;
  positioning: string | null;
  logo_url: string | null;
  website_url: string | null;
  published: number;
};

export async function listCompanies(filters: { publishedOnly?: boolean; industryId?: number }) {
  const pool = getPool();
  const clauses: string[] = [];
  const params: Array<string | number> = [];
  if (filters.publishedOnly) clauses.push("published = 1");
  if (filters.industryId) {
    clauses.push("industry_id = ?");
    params.push(filters.industryId);
  }
  const where = clauses.length ? `WHERE ${clauses.join(" AND ")}` : "";
  const [rows] = await pool.query(`SELECT * FROM companies ${where} ORDER BY name ASC`, params);
  return rows as CompanyRow[];
}

export async function getCompanyBySlug(slug: string) {
  const pool = getPool();
  const [rows] = await pool.query("SELECT * FROM companies WHERE slug = ? LIMIT 1", [slug]);
  return (rows as CompanyRow[])[0] ?? null;
}

export async function searchCatalogue(query: string) {
  const pool = getPool();
  const like = `%${query}%`;
  const [companies] = await pool.query(
    `SELECT id, slug, name, summary, 'company' AS type FROM companies WHERE published = 1 AND (name LIKE ? OR summary LIKE ?) LIMIT 20`,
    [like, like],
  );
  const [products] = await pool.query(
    `SELECT id, slug, name, summary, 'product' AS type FROM products WHERE published = 1 AND (name LIKE ? OR summary LIKE ?) LIMIT 20`,
    [like, like],
  );
  return { companies, products };
}
