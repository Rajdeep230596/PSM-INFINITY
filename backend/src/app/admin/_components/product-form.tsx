"use client";

import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";

import { readError, slugify } from "./form-styles";
import { MediaUploader } from "./media-uploader";

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
  ownerId,
  companies,
  initial,
}: {
  mode: "create" | "edit";
  currentSlug?: string;
  ownerId?: number;
  companies: Array<{ id: number; name: string }>;
  initial?: Partial<ProductValues>;
}) {
  const router = useRouter();
  const [error, setError] = useState("");
  const [slugTouched, setSlugTouched] = useState(mode === "edit");
  const [uploadNote, setUploadNote] = useState("");

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
    if (mode === "create") {
      router.push(`/admin/products/${body.slug}`);
      router.refresh();
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
        <span>Company</span>
        <select name="company_id" required defaultValue={initial?.company_id ?? ""}>
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
      <label className="admin-field">
        <span>Summary</span>
        <textarea name="summary" required defaultValue={initial?.summary} rows={3} />
      </label>
      <label className="admin-field">
        <span>Destination URL</span>
        <input name="destination_url" defaultValue={initial?.destination_url} />
      </label>
      <MediaUploader
        ownerType="product"
        ownerId={ownerId}
        label="Upload product media"
        onUploaded={(url) => setUploadNote(`Uploaded: ${url}`)}
      />
      {uploadNote ? <p className="admin-muted">{uploadNote}</p> : null}
      <label className="admin-field">
        <span>Specs (one per line: Label: Value)</span>
        <textarea name="specs" defaultValue={initial?.specsText} rows={5} />
      </label>
      <label className="admin-check">
        <input name="published" type="checkbox" defaultChecked={initial?.published !== false} /> Published
      </label>
      <div className="admin-actions">
        <button type="submit" className="admin-btn">
          {mode === "create" ? "Create product" : "Save changes"}
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
