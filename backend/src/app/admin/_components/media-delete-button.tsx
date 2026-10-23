"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

import { readError } from "./form-styles";

export function MediaDeleteButton({ id }: { id: number }) {
  const router = useRouter();
  const [error, setError] = useState("");

  const onClick = async () => {
    if (!window.confirm("Delete this media file?")) return;
    const response = await fetch(`/api/v1/media/${id}`, { method: "DELETE" });
    if (!response.ok) {
      setError(await readError(response));
      return;
    }
    router.refresh();
  };

  return (
    <div>
      <button type="button" onClick={onClick} className="admin-btn danger">
        Delete
      </button>
      {error ? <p className="admin-error">{error}</p> : null}
    </div>
  );
}
