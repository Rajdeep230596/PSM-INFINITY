import { getPool } from "@/lib/db";

export type ProductRow = {
  id: number;
  slug: string;
  name: string;
  company_id: number;
  industry_id: number;
  summary: string;
  destination_url: string | null;
  published: number;
};

export async function listProducts(filters: { publishedOnly?: boolean; industryId?: number; companyId?: number }) {
  const pool = getPool();
  const clauses: string[] = [];
  const params: Array<string | number> = [];
  if (filters.publishedOnly) clauses.push("published = 1");
  if (filters.industryId) {
    clauses.push("industry_id = ?");
    params.push(filters.industryId);
  }
  if (filters.companyId) {
    clauses.push("company_id = ?");
    params.push(filters.companyId);
  }
  const where = clauses.length ? `WHERE ${clauses.join(" AND ")}` : "";
  const [rows] = await pool.query(`SELECT * FROM products ${where} ORDER BY name ASC`, params);
  return rows as ProductRow[];
}

export async function getProductBySlug(slug: string) {
  const pool = getPool();
  const [rows] = await pool.query("SELECT * FROM products WHERE slug = ? LIMIT 1", [slug]);
  return (rows as ProductRow[])[0] ?? null;
}
