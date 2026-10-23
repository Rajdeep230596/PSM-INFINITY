import { getPool } from "@/lib/db";

export type MediaOwnerType = "industry" | "company" | "product";

export type MediaRow = {
  id: number;
  owner_type: MediaOwnerType;
  owner_id: number;
  url: string;
  original_name: string | null;
  mime_type: string | null;
  file_size: number | null;
  alt: string;
  kind: "image" | "video";
  created_at: Date;
};

export async function listMedia(filters: { ownerType?: MediaOwnerType; ownerId?: number } = {}) {
  const pool = getPool();
  const clauses: string[] = [];
  const params: Array<string | number> = [];
  if (filters.ownerType) {
    clauses.push("owner_type = ?");
    params.push(filters.ownerType);
  }
  if (filters.ownerId) {
    clauses.push("owner_id = ?");
    params.push(filters.ownerId);
  }
  const where = clauses.length ? `WHERE ${clauses.join(" AND ")}` : "";
  const [rows] = await pool.query(`SELECT * FROM media ${where} ORDER BY id DESC`, params);
  return rows as MediaRow[];
}

export async function getMediaById(id: number) {
  const pool = getPool();
  const [rows] = await pool.query("SELECT * FROM media WHERE id = ? LIMIT 1", [id]);
  return (rows as MediaRow[])[0] ?? null;
}

export async function createMedia(input: {
  owner_type: MediaOwnerType;
  owner_id: number;
  url: string;
  original_name?: string | null;
  mime_type?: string | null;
  file_size?: number | null;
  alt?: string;
  kind?: "image" | "video";
}) {
  const pool = getPool();
  const [result] = await pool.execute(
    `INSERT INTO media (owner_type, owner_id, url, original_name, mime_type, file_size, alt, kind)
     VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
    [
      input.owner_type,
      input.owner_id,
      input.url,
      input.original_name ?? null,
      input.mime_type ?? null,
      input.file_size ?? null,
      input.alt ?? "",
      input.kind ?? "image",
    ],
  );
  return (result as { insertId: number }).insertId;
}

export async function deleteMedia(id: number) {
  const pool = getPool();
  const [result] = await pool.execute("DELETE FROM media WHERE id = ?", [id]);
  return (result as { affectedRows: number }).affectedRows > 0;
}
