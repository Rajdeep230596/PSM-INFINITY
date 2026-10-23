"use client";

import { useState } from "react";

import { readError } from "./form-styles";

export function MediaUploader({
  ownerType,
  ownerId,
  onUploaded,
  label = "Upload media",
}: {
  ownerType: "industry" | "company" | "product";
  ownerId?: number;
  onUploaded: (url: string) => void;
  label?: string;
}) {
  const [error, setError] = useState("");
  const [busy, setBusy] = useState(false);

  if (!ownerId) {
    return <p className="admin-muted">Save the record first, then upload media.</p>;
  }

  const onChange = async (file: File | null) => {
    if (!file) return;
    setBusy(true);
    setError("");
    const form = new FormData();
    form.set("file", file);
    form.set("ownerType", ownerType);
    form.set("ownerId", String(ownerId));
    const response = await fetch("/api/v1/media", { method: "POST", body: form });
    setBusy(false);
    if (!response.ok) {
      setError(await readError(response));
      return;
    }
    const payload = (await response.json()) as { absolute_url?: string; url?: string };
    onUploaded(payload.absolute_url || payload.url || "");
  };

  return (
    <div className="admin-field">
      <span>{label}</span>
      <input
        type="file"
        accept="image/jpeg,image/png,image/webp,image/gif,video/mp4,video/webm"
        disabled={busy}
        onChange={(event) => onChange(event.target.files?.[0] ?? null)}
      />
      {busy ? <p className="admin-muted">Uploading…</p> : null}
      {error ? <p className="admin-error">{error}</p> : null}
    </div>
  );
}
