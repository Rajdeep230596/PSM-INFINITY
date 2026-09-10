import { getPool } from "@/lib/db";
import { conflict } from "@/lib/route-errors";

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

export async function getCompanyById(id: number) {
  const pool = getPool();
  const [rows] = await pool.query("SELECT * FROM companies WHERE id = ? LIMIT 1", [id]);
  return (rows as CompanyRow[])[0] ?? null;
}

export async function createCompany(input: {
  slug: string;
  name: string;
  industry_id: number;
  summary: string;
  positioning?: string | null;
  logo_url?: string | null;
  website_url?: string | null;
  published?: boolean;
}) {
  const pool = getPool();
  const [result] = await pool.execute(
    `INSERT INTO companies (slug, name, industry_id, summary, positioning, logo_url, website_url, published)
     VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
    [
      input.slug,
      input.name,
      input.industry_id,
      input.summary,
      input.positioning ?? null,
      input.logo_url ?? null,
      input.website_url ?? null,
      input.published === false ? 0 : 1,
    ],
  );
  return (result as { insertId: number }).insertId;
}

export async function updateCompany(
  id: number,
  input: Partial<{
    slug: string;
    name: string;
    industry_id: number;
    summary: string;
    positioning: string | null;
    logo_url: string | null;
    website_url: string | null;
    published: boolean;
  }>,
) {
  const current = await getCompanyById(id);
  if (!current) return null;
  const pool = getPool();
  await pool.execute(
    `UPDATE companies SET slug = ?, name = ?, industry_id = ?, summary = ?, positioning = ?, logo_url = ?, website_url = ?, published = ? WHERE id = ?`,
    [
      input.slug ?? current.slug,
      input.name ?? current.name,
      input.industry_id ?? current.industry_id,
      input.summary ?? current.summary,
      input.positioning === undefined ? current.positioning : input.positioning,
      input.logo_url === undefined ? current.logo_url : input.logo_url,
      input.website_url === undefined ? current.website_url : input.website_url,
      input.published === undefined ? current.published : input.published ? 1 : 0,
      id,
    ],
  );
  return getCompanyById(id);
}

export async function deleteCompany(id: number) {
  const pool = getPool();
  const [countRows] = await pool.query("SELECT COUNT(*) AS n FROM products WHERE company_id = ?", [id]);
  const n = Number((countRows as Array<{ n: number }>)[0]?.n || 0);
  if (n > 0) conflict("Delete products for this company first");
  const [result] = await pool.execute("DELETE FROM companies WHERE id = ?", [id]);
  return (result as { affectedRows: number }).affectedRows > 0;
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
