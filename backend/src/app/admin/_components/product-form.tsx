"use client";

import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";

import { buttonStyle, fieldStyle, inputStyle, readError, slugify } from "./form-styles";

type ProductValues = {
  slug: string;
  name: string;
  company_id: number;
  summary: string;
  destination_url: string;
  published: boolean;
  specsText: string;
};

function parseSpecs(text: string) {
  return text
    .split("\n")
    .map((line) => line.trim())
    .filter(Boolean)
    .map((line) => {
      const index = line.indexOf(":");
      if (index === -1) return { label: line, value: "" };
      return { label: line.slice(0, index).trim(), value: line.slice(index + 1).trim() };
    })
    .filter((spec) => spec.label && spec.value);
}

export function ProductForm({
  mode,
  currentSlug,
  companies,
  initial,
}: {
  mode: "create" | "edit";
  currentSlug?: string;
  companies: Array<{ id: number; name: string }>;
  initial?: Partial<ProductValues>;
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
      company_id: Number(form.get("company_id")),
      summary: String(form.get("summary") || ""),
      destination_url: String(form.get("destination_url") || "") || null,
      published: form.get("published") === "on",
      specs: parseSpecs(String(form.get("specs") || "")),
    };
    const response = await fetch(mode === "create" ? "/api/v1/products" : `/api/v1/products/${currentSlug}`, {
      method: mode === "create" ? "POST" : "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });
    if (!response.ok) {
      setError(await readError(response));
      return;
    }
    router.push("/admin/products");
    router.refresh();
  };

  const onDelete = async () => {
    if (!currentSlug || !window.confirm("Delete this product?")) return;
    const response = await fetch(`/api/v1/products/${currentSlug}`, { method: "DELETE" });
    if (!response.ok) {
      setError(await readError(response));
      return;
    }
    router.push("/admin/products");
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
        Company
        <select name="company_id" required defaultValue={initial?.company_id ?? ""} style={inputStyle}>
          <option value="" disabled>
            Select company
          </option>
          {companies.map((company) => (
            <option key={company.id} value={company.id}>
              {company.name}
            </option>
          ))}
        </select>
      </label>
      <label style={fieldStyle}>
        Summary
        <textarea name="summary" required defaultValue={initial?.summary} rows={3} style={inputStyle} />
      </label>
      <label style={fieldStyle}>
        Destination URL
        <input name="destination_url" defaultValue={initial?.destination_url} style={inputStyle} />
      </label>
      <label style={fieldStyle}>
        Specs (one per line: Label: Value)
        <textarea name="specs" defaultValue={initial?.specsText} rows={5} style={inputStyle} />
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
