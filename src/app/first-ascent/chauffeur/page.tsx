import type { Metadata } from "next";

import { ChauffeurSalonPage } from "@/components/first-ascent/ChauffeurSalonPage";

export const metadata: Metadata = {
  title: "Chauffeur Fleet — First Ascent",
  description:
    "Vetted diplomatic chauffeurs, armored vehicle configurations (VR7/VR9), and synchronized airport convoys.",
};

export default function ChauffeurPage() {
  return <ChauffeurSalonPage />;
}
