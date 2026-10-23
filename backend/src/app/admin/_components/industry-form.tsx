"use client";

import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";

import { readError, slugify } from "./form-styles";
import { MediaUploader } from "./media-uploader";

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
  ownerId,
  initial,
}: {
  mode: "create" | "edit";
  currentSlug?: string;
  ownerId?: number;
  initial?: Partial<IndustryValues>;
}) {
  const router = useRouter();
  const [error, setError] = useState("");
  const [slugTouched, setSlugTouched] = useState(mode === "edit");
  const [heroUrl, setHeroUrl] = useState(initial?.hero_media_url ?? "");

  const onSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError("");
    const form = new FormData(event.currentTarget);
    const body = {
      name: String(form.get("name") || ""),
      slug: String(form.get("slug") || ""),
      summary: String(form.get("summary") || ""),
      description: String(form.get("description") || "") || null,
      hero_media_url: heroUrl || null,
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
    if (mode === "create") {
      router.push(`/admin/industries/${body.slug}`);
      router.refresh();
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
    <form onSubmit={onSubmit} className="admin-form">
      <label className="admin-field">
        <span>Name</span>
        <input
          name="name"
          required
          defaultValue={initial?.name}
          onChange={(event) => {
            if (slugTouched) return;
            const slugInput = event.currentTarget.form?.elements.namedItem("slug");
            if (slugInput instanceof HTMLInputElement) slugInput.value = slugify(event.currentTarget.value);
          }}
        />
      </label>
      <label className="admin-field">
        <span>Slug</span>
        <input name="slug" required defaultValue={initial?.slug} onChange={() => setSlugTouched(true)} />
      </label>
      <label className="admin-field">
        <span>Summary</span>
        <textarea name="summary" required defaultValue={initial?.summary} rows={3} />
      </label>
      <label className="admin-field">
        <span>Description</span>
        <textarea name="description" defaultValue={initial?.description} rows={5} />
      </label>
      <label className="admin-field">
        <span>Hero media URL</span>
        <input name="hero_media_url" value={heroUrl} onChange={(event) => setHeroUrl(event.target.value)} />
      </label>
      <MediaUploader ownerType="industry" ownerId={ownerId} onUploaded={setHeroUrl} label="Upload hero media" />
      <label className="admin-field">
        <span>Sort order</span>
        <input name="sort_order" type="number" defaultValue={initial?.sort_order ?? 0} />
      </label>
      <label className="admin-check">
        <input name="published" type="checkbox" defaultChecked={initial?.published !== false} /> Published
      </label>
      <div className="admin-actions">
        <button type="submit" className="admin-btn">
          {mode === "create" ? "Create industry" : "Save changes"}
        </button>
        {mode === "edit" ? (
          <button type="button" onClick={onDelete} className="admin-btn danger">
            Delete
          </button>
        ) : null}
      </div>
      {error ? <p className="admin-error">{error}</p> : null}
    </form>
  );
}
