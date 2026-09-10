"use client";

import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";

import { buttonStyle, fieldStyle, inputStyle, readError, slugify } from "./form-styles";

type IndustryValues = {
  slug: string;
  name: string;
  summary: string;
  description: string;
  hero_media_url: string;
  sort_order: number;
  published: boolean;
};

export function IndustryForm({
  mode,
  currentSlug,
  initial,
}: {
  mode: "create" | "edit";
  currentSlug?: string;
  initial?: Partial<IndustryValues>;
}) {
  const router = useRouter();
  const [error, setError] = useState("");
  const [slugTouched, setSlugTouched] = useState(mode === "edit");

  const onSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError("");
    const form = new FormData(event.currentTarget);
    const body = {
      name: String(form.get("name") || ""),
      slug: String(form.get("slug") || ""),
      summary: String(form.get("summary") || ""),
      description: String(form.get("description") || "") || null,
      hero_media_url: String(form.get("hero_media_url") || "") || null,
      sort_order: Number(form.get("sort_order") || 0),
      published: form.get("published") === "on",
    };
    const response = await fetch(mode === "create" ? "/api/v1/industries" : `/api/v1/industries/${currentSlug}`, {
      method: mode === "create" ? "POST" : "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });
    if (!response.ok) {
      setError(await readError(response));
      return;
    }
    router.push("/admin/industries");
    router.refresh();
  };

  const onDelete = async () => {
    if (!currentSlug || !window.confirm("Delete this industry?")) return;
    const response = await fetch(`/api/v1/industries/${currentSlug}`, { method: "DELETE" });
    if (!response.ok) {
      setError(await readError(response));
      return;
    }
    router.push("/admin/industries");
    router.refresh();
  };

  return (
    <form onSubmit={onSubmit} style={{ display: "grid", gap: 12, maxWidth: 640 }}>
      <label style={fieldStyle}>
        Name
        <input
          name="name"
          required
          defaultValue={initial?.name}
          style={inputStyle}
          onChange={(event) => {
            if (slugTouched) return;
            const slugInput = event.currentTarget.form?.elements.namedItem("slug");
            if (slugInput instanceof HTMLInputElement) slugInput.value = slugify(event.currentTarget.value);
          }}
        />
      </label>
      <label style={fieldStyle}>
        Slug
        <input
          name="slug"
          required
          defaultValue={initial?.slug}
          style={inputStyle}
          onChange={() => setSlugTouched(true)}
        />
      </label>
      <label style={fieldStyle}>
        Summary
        <textarea name="summary" required defaultValue={initial?.summary} rows={3} style={inputStyle} />
      </label>
      <label style={fieldStyle}>
        Description
        <textarea name="description" defaultValue={initial?.description} rows={5} style={inputStyle} />
      </label>
      <label style={fieldStyle}>
        Hero media URL
        <input name="hero_media_url" defaultValue={initial?.hero_media_url} style={inputStyle} />
      </label>
      <label style={fieldStyle}>
        Sort order
        <input name="sort_order" type="number" defaultValue={initial?.sort_order ?? 0} style={inputStyle} />
      </label>
      <label>
        <input name="published" type="checkbox" defaultChecked={initial?.published !== false} /> Published
      </label>
      <div style={{ display: "flex", gap: 8 }}>
        <button type="submit" style={buttonStyle}>
          {mode === "create" ? "Create" : "Save"}
        </button>
        {mode === "edit" ? (
          <button type="button" onClick={onDelete} style={buttonStyle}>
            Delete
          </button>
        ) : null}
      </div>
      {error ? <p>{error}</p> : null}
    </form>
  );
}
