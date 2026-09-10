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

export async function getProductById(id: number) {
  const pool = getPool();
  const [rows] = await pool.query("SELECT * FROM products WHERE id = ? LIMIT 1", [id]);
  return (rows as ProductRow[])[0] ?? null;
}

export type SpecRow = {
  id: number;
  product_id: number;
  label: string;
  value: string;
  sort_order: number;
};

export async function listSpecs(productId: number) {
  const pool = getPool();
  const [rows] = await pool.query(
    "SELECT * FROM product_specs WHERE product_id = ? ORDER BY sort_order ASC, id ASC",
    [productId],
  );
  return rows as SpecRow[];
}

export async function replaceSpecs(productId: number, specs: Array<{ label: string; value: string }>) {
  const pool = getPool();
  await pool.execute("DELETE FROM product_specs WHERE product_id = ?", [productId]);
  for (let i = 0; i < specs.length; i += 1) {
    const spec = specs[i];
    if (!spec.label.trim() || !spec.value.trim()) continue;
    await pool.execute(
      "INSERT INTO product_specs (product_id, label, value, sort_order) VALUES (?, ?, ?, ?)",
      [productId, spec.label.trim(), spec.value.trim(), i],
    );
  }
}

export async function createProduct(input: {
  slug: string;
  name: string;
  company_id: number;
  industry_id: number;
  summary: string;
  destination_url?: string | null;
  published?: boolean;
  specs?: Array<{ label: string; value: string }>;
}) {
  const pool = getPool();
  const [result] = await pool.execute(
    `INSERT INTO products (slug, name, company_id, industry_id, summary, destination_url, published)
     VALUES (?, ?, ?, ?, ?, ?, ?)`,
    [
      input.slug,
      input.name,
      input.company_id,
      input.industry_id,
      input.summary,
      input.destination_url ?? null,
      input.published === false ? 0 : 1,
    ],
  );
  const id = (result as { insertId: number }).insertId;
  if (input.specs?.length) await replaceSpecs(id, input.specs);
  return id;
}

export async function updateProduct(
  id: number,
  input: Partial<{
    slug: string;
    name: string;
    company_id: number;
    industry_id: number;
    summary: string;
    destination_url: string | null;
    published: boolean;
    specs: Array<{ label: string; value: string }>;
  }>,
) {
  const current = await getProductById(id);
  if (!current) return null;
  const pool = getPool();
  await pool.execute(
    `UPDATE products SET slug = ?, name = ?, company_id = ?, industry_id = ?, summary = ?, destination_url = ?, published = ? WHERE id = ?`,
    [
      input.slug ?? current.slug,
      input.name ?? current.name,
      input.company_id ?? current.company_id,
      input.industry_id ?? current.industry_id,
      input.summary ?? current.summary,
      input.destination_url === undefined ? current.destination_url : input.destination_url,
      input.published === undefined ? current.published : input.published ? 1 : 0,
      id,
    ],
  );
  if (input.specs) await replaceSpecs(id, input.specs);
  return getProductById(id);
}

export async function deleteProduct(id: number) {
  const pool = getPool();
  const [result] = await pool.execute("DELETE FROM products WHERE id = ?", [id]);
  return (result as { affectedRows: number }).affectedRows > 0;
}
