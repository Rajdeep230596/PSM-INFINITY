"use client";

import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";

import { buttonStyle, fieldStyle, inputStyle, readError, slugify } from "./form-styles";

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
  industries,
  initial,
}: {
  mode: "create" | "edit";
  currentSlug?: string;
  industries: Array<{ id: number; name: string }>;
  initial?: Partial<CompanyValues>;
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
      industry_id: Number(form.get("industry_id")),
      summary: String(form.get("summary") || ""),
      positioning: String(form.get("positioning") || "") || null,
      logo_url: String(form.get("logo_url") || "") || null,
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
        Industry
        <select name="industry_id" required defaultValue={initial?.industry_id ?? ""} style={inputStyle}>
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
      <label style={fieldStyle}>
        Summary
        <textarea name="summary" required defaultValue={initial?.summary} rows={3} style={inputStyle} />
      </label>
      <label style={fieldStyle}>
        Positioning
        <textarea name="positioning" defaultValue={initial?.positioning} rows={3} style={inputStyle} />
      </label>
      <label style={fieldStyle}>
        Logo URL
        <input name="logo_url" defaultValue={initial?.logo_url} style={inputStyle} />
      </label>
      <label style={fieldStyle}>
        Website URL
        <input name="website_url" defaultValue={initial?.website_url} style={inputStyle} />
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
