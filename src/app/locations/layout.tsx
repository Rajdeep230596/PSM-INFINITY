import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Locations",
  description: "Visit PSM Infinity at 29 Palit Street, Ballygunge, Kolkata. Mon–Sat, 10:00 am – 8:00 pm.",
};

export default function LocationsLayout({ children }: { children: React.ReactNode }) {
  return children;
}
