"use client";

import { useEffect } from "react";

export function AscentChrome({
  children,
  htmlClass,
}: {
  children: React.ReactNode;
  htmlClass?: string;
}) {
  useEffect(() => {
    const classes = ["first-ascent-page", htmlClass].filter(Boolean) as string[];
    document.documentElement.classList.add(...classes);
    return () => document.documentElement.classList.remove(...classes);
  }, [htmlClass]);
  return children;
}
