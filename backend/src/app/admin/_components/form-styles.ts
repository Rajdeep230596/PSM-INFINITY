import type { CSSProperties } from "react";

export const fieldStyle: CSSProperties = {
  display: "grid",
  gap: 6,
};

export const inputStyle: CSSProperties = {
  width: "100%",
  padding: 8,
  background: "#1c1c1c",
  color: "#f4f1ea",
  border: "1px solid #3a3a3a",
  borderRadius: 4,
  boxSizing: "border-box",
};

export const buttonStyle: CSSProperties = {
  padding: "8px 14px",
  cursor: "pointer",
};

export function slugify(value: string) {
  return value
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

export async function readError(response: Response) {
  const payload = (await response.json().catch(() => ({}))) as { error?: string };
  return payload.error || `Request failed (${response.status})`;
}
