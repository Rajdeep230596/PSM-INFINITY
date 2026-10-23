import type { Metadata } from "next";
import { DM_Sans, Fraunces } from "next/font/google";

import "./admin/admin.css";

const sans = DM_Sans({
  subsets: ["latin"],
  variable: "--font-admin-sans",
  display: "swap",
});

const display = Fraunces({
  subsets: ["latin"],
  variable: "--font-admin-display",
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "PSM Infinity Admin",
    template: "%s — PSM Infinity Admin",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${sans.variable} ${display.variable}`}>
      <body>{children}</body>
    </html>
  );
}
