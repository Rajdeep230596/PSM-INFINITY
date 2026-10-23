"use client";

import { FormEvent, Suspense, useState } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";

function ResetForm() {
  const router = useRouter();
  const params = useSearchParams();
  const token = params.get("token") || "";
  const [error, setError] = useState("");

  const onSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError("");
    const form = new FormData(event.currentTarget);
    const password = String(form.get("password") || "");
    const confirm = String(form.get("confirm") || "");
    if (password !== confirm) {
      setError("Passwords do not match");
      return;
    }
    const response = await fetch("/api/v1/auth/reset-password", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ token, password }),
    });
    if (!response.ok) {
      const payload = (await response.json()) as { error?: string };
      setError(payload.error || "Reset failed");
      return;
    }
    router.push("/admin/login");
  };

  if (!token) {
    return <p>Missing reset token.</p>;
  }

  return (
    <form onSubmit={onSubmit} style={{ display: "grid", gap: 12 }}>
      <label>
        New password
        <input name="password" type="password" required minLength={8} style={{ width: "100%", padding: 8 }} />
      </label>
      <label>
        Confirm password
        <input name="confirm" type="password" required minLength={8} style={{ width: "100%", padding: 8 }} />
      </label>
      <button type="submit">Update password</button>
      {error ? <p>{error}</p> : null}
    </form>
  );
}

export default function ResetPasswordPage() {
  return (
    <main style={{ maxWidth: 420, margin: "12vh auto", padding: 24 }}>
      <h1>Reset password</h1>
      <Suspense fallback={<p>Loading…</p>}>
        <ResetForm />
      </Suspense>
      <p>
        <Link href="/admin/login">Back to login</Link>
      </p>
    </main>
  );
}
