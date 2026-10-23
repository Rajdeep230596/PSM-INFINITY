import { readFileSync } from "fs";
import path from "path";

import { getPool } from "@/lib/db";

export type CatalogueLink = {
  type: "industry" | "company" | "product";
  id: number;
  slug: string;
  name: string;
  summary: string;
  pathHint: string;
};

function pathHint(type: CatalogueLink["type"], slug: string) {
  const templates = {
    industry: process.env.PUBLIC_PATH_INDUSTRY || "/catalogue/industries/{slug}",
    company: process.env.PUBLIC_PATH_COMPANY || "/catalogue/companies/{slug}",
    product: process.env.PUBLIC_PATH_PRODUCT || "/catalogue/products/{slug}",
  };
  return templates[type].replace("{slug}", slug);
}

export function loadCuratedKnowledge() {
  const file = path.join(process.cwd(), "content", "curated-knowledge.json");
  return JSON.parse(readFileSync(file, "utf8")) as Record<string, unknown>;
}

function searchTokens(query: string) {
  const stop = new Set(["the", "and", "for", "with", "need", "looking", "about", "from", "into", "that", "this", "have", "want"]);
  const tokens = query
    .toLowerCase()
    .split(/[^a-z0-9]+/i)
    .map((token) => token.trim())
    .filter((token) => token.length >= 3 && !stop.has(token));
  return [...new Set(tokens)].slice(0, 6);
}

export async function searchCatalogueForChat(query: string, limit = 8): Promise<CatalogueLink[]> {
  const pool = getPool();
  const safeLimit = Math.max(1, Math.min(20, Math.floor(limit)));
  const tokens = searchTokens(query);
  const terms = tokens.length ? tokens : [query.slice(0, 80)];

  const scored = new Map<string, CatalogueLink & { score: number }>();

  for (const term of terms) {
    const like = `%${term}%`;
    const [industries] = await pool.query(
      `SELECT id, slug, name, summary, 'industry' AS type FROM industries
       WHERE published = 1 AND (name LIKE ? OR summary LIKE ? OR IFNULL(description,'') LIKE ?)
       LIMIT ${safeLimit}`,
      [like, like, like],
    );
    const [companies] = await pool.query(
      `SELECT id, slug, name, summary, 'company' AS type FROM companies
       WHERE published = 1 AND (name LIKE ? OR summary LIKE ? OR IFNULL(positioning,'') LIKE ?)
       LIMIT ${safeLimit}`,
      [like, like, like],
    );
    const [products] = await pool.query(
      `SELECT id, slug, name, summary, 'product' AS type FROM products
       WHERE published = 1 AND (name LIKE ? OR summary LIKE ?)
       LIMIT ${safeLimit}`,
      [like, like],
    );

    const rows = [
      ...(industries as Array<{ id: number; slug: string; name: string; summary: string; type: "industry" }>),
      ...(companies as Array<{ id: number; slug: string; name: string; summary: string; type: "company" }>),
      ...(products as Array<{ id: number; slug: string; name: string; summary: string; type: "product" }>),
    ];

    for (const row of rows) {
      const key = `${row.type}:${row.id}`;
      const existing = scored.get(key);
      if (existing) {
        existing.score += 1;
        continue;
      }
      scored.set(key, {
        type: row.type,
        id: row.id,
        slug: row.slug,
        name: row.name,
        summary: row.summary,
        pathHint: pathHint(row.type, row.slug),
        score: 1,
      });
    }
  }

  return [...scored.values()]
    .sort((a, b) => b.score - a.score || a.name.localeCompare(b.name))
    .slice(0, safeLimit)
    .map(({ score: _score, ...link }) => link);
}

export async function snapshotPublishedCatalogue(limitPerType = 12) {
  const pool = getPool();
  const safeLimit = Math.max(1, Math.min(50, Math.floor(limitPerType)));
  const [industries] = await pool.query(
    `SELECT slug, name, summary FROM industries WHERE published = 1 ORDER BY sort_order ASC, name ASC LIMIT ${safeLimit}`,
  );
  const [companies] = await pool.query(
    `SELECT slug, name, summary FROM companies WHERE published = 1 ORDER BY name ASC LIMIT ${safeLimit}`,
  );
  const [products] = await pool.query(
    `SELECT slug, name, summary FROM products WHERE published = 1 ORDER BY name ASC LIMIT ${safeLimit}`,
  );
  return { industries, companies, products };
}

export function buildWhatsAppUrl(summary: string) {
  const number = (process.env.WHATSAPP_E164 || "919007331000").replace(/\D/g, "");
  const text = summary.slice(0, 900);
  return `https://wa.me/${number}?text=${encodeURIComponent(text)}`;
}
