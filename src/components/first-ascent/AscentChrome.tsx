"use client";

import { useEffect } from "react";

export function AscentChrome({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    document.documentElement.classList.add("first-ascent-page");
    return () => document.documentElement.classList.remove("first-ascent-page");
  }, []);
  return children;
}
