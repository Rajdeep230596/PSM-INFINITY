"use client";

import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";

export default function AdminLoginPage() {
  const router = useRouter();
  const [error, setError] = useState("");

  const onSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    const response = await fetch("/api/v1/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        email: form.get("email"),
        password: form.get("password"),
      }),
    });
    if (!response.ok) {
      const payload = (await response.json()) as { error?: string };
      setError(payload.error || "Login failed");
      return;
    }
    router.push("/admin");
    router.refresh();
  };

  return (
    <main style={{ maxWidth: 420, margin: "12vh auto", padding: 24 }}>
      <h1>PSM Infinity</h1>
      <p>Owner login</p>
      <form onSubmit={onSubmit} style={{ display: "grid", gap: 12 }}>
        <label>
          Email
          <input name="email" type="email" required style={{ width: "100%", padding: 8 }} />
        </label>
        <label>
          Password
          <input name="password" type="password" required minLength={8} style={{ width: "100%", padding: 8 }} />
        </label>
        <button type="submit">Sign in</button>
        {error ? <p>{error}</p> : null}
      </form>
    </main>
  );
}
