"use client";

import { FormEvent, useEffect, useState } from "react";

type ListedFile = { name: string; url: string };

export default function StorageTestPage() {
  const [files, setFiles] = useState<ListedFile[]>([]);
  const [message, setMessage] = useState("");
  const [busy, setBusy] = useState(false);

  const refresh = async () => {
    const response = await fetch("/api/files");
    const data = (await response.json()) as { files: ListedFile[] };
    setFiles(data.files);
  };

  useEffect(() => {
    refresh().catch(() => setMessage("Could not list files."));
  }, []);

  const onSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = event.currentTarget;
    const data = new FormData(form);
    setBusy(true);
    setMessage("");
    try {
      const response = await fetch("/api/upload", { method: "POST", body: data });
      const payload = (await response.json()) as { error?: string; url?: string };
      if (!response.ok) {
        setMessage(payload.error || "Upload failed.");
        return;
      }
      setMessage(`Saved: ${payload.url}`);
      form.reset();
      await refresh();
    } finally {
      setBusy(false);
    }
  };

  return (
    <main>
      <h1>GoDaddy storage test</h1>
      <p>
        Upload an image into <code>/public/assets/uploads/</code>. Then restart the app, then redeploy,
        and check this list again.
      </p>
      <form onSubmit={onSubmit}>
        <input name="file" type="file" accept="image/*" required />
        <button type="submit" disabled={busy}>
          {busy ? "Uploading…" : "Upload"}
        </button>
      </form>
      <p>{message}</p>
      <h2>Files that survived</h2>
      {files.length === 0 ? (
        <p>None yet.</p>
      ) : (
        <ul>
          {files.map((file) => (
            <li key={file.name}>
              <a href={file.url} target="_blank" rel="noreferrer">
                {file.url}
              </a>
            </li>
          ))}
        </ul>
      )}
    </main>
  );
}
