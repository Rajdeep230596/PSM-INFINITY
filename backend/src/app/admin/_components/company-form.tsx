"use client";

import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";

import { readError, slugify } from "./form-styles";
import { MediaUploader } from "./media-uploader";

type CompanyValues = {
  slug: string;
  name: string;
  industry_id: number;
  summary: string;
  positioning: string;
  logo_url: string;
  website_url: string;
  published: boolean;
};

export function CompanyForm({
  mode,
  currentSlug,
  ownerId,
  industries,
  initial,
}: {
  mode: "create" | "edit";
  currentSlug?: string;
  ownerId?: number;
  industries: Array<{ id: number; name: string }>;
  initial?: Partial<CompanyValues>;
}) {
  const router = useRouter();
  const [error, setError] = useState("");
  const [slugTouched, setSlugTouched] = useState(mode === "edit");
  const [logoUrl, setLogoUrl] = useState(initial?.logo_url ?? "");

  const onSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError("");
    const form = new FormData(event.currentTarget);
    const body = {
      name: String(form.get("name") || ""),
      slug: String(form.get("slug") || ""),
      industry_id: Number(form.get("industry_id")),
      summary: String(form.get("summary") || ""),
      positioning: String(form.get("positioning") || "") || null,
      logo_url: logoUrl || null,
      website_url: String(form.get("website_url") || "") || null,
      published: form.get("published") === "on",
    };
    const response = await fetch(mode === "create" ? "/api/v1/companies" : `/api/v1/companies/${currentSlug}`, {
      method: mode === "create" ? "POST" : "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });
    if (!response.ok) {
      setError(await readError(response));
      return;
    }
    if (mode === "create") {
      router.push(`/admin/companies/${body.slug}`);
      router.refresh();
      return;
    }
    router.push("/admin/companies");
    router.refresh();
  };

  const onDelete = async () => {
    if (!currentSlug || !window.confirm("Delete this company?")) return;
    const response = await fetch(`/api/v1/companies/${currentSlug}`, { method: "DELETE" });
    if (!response.ok) {
      setError(await readError(response));
      return;
    }
    router.push("/admin/companies");
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
        <span>Industry</span>
        <select name="industry_id" required defaultValue={initial?.industry_id ?? ""}>
          <option value="" disabled>
            Select industry
          </option>
          {industries.map((industry) => (
            <option key={industry.id} value={industry.id}>
              {industry.name}
            </option>
          ))}
        </select>
      </label>
      <label className="admin-field">
        <span>Summary</span>
        <textarea name="summary" required defaultValue={initial?.summary} rows={3} />
      </label>
      <label className="admin-field">
        <span>Positioning</span>
        <textarea name="positioning" defaultValue={initial?.positioning} rows={3} />
      </label>
      <label className="admin-field">
        <span>Logo URL</span>
        <input name="logo_url" value={logoUrl} onChange={(event) => setLogoUrl(event.target.value)} />
      </label>
      <MediaUploader ownerType="company" ownerId={ownerId} onUploaded={setLogoUrl} label="Upload logo" />
      <label className="admin-field">
        <span>Website URL</span>
        <input name="website_url" defaultValue={initial?.website_url} />
      </label>
      <label className="admin-check">
        <input name="published" type="checkbox" defaultChecked={initial?.published !== false} /> Published
      </label>
      <div className="admin-actions">
        <button type="submit" className="admin-btn">
          {mode === "create" ? "Create company" : "Save changes"}
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
