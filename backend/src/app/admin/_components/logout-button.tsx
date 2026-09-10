"use client";

import { useRouter } from "next/navigation";

import { buttonStyle } from "./form-styles";

export function LogoutButton() {
  const router = useRouter();

  const onClick = async () => {
    await fetch("/api/v1/auth/logout", { method: "POST" });
    router.push("/admin/login");
    router.refresh();
  };

  return (
    <button type="button" onClick={onClick} style={buttonStyle}>
      Sign out
    </button>
  );
}
