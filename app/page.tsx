import type { Metadata } from "next";
import { AfricaHomeContent } from "@/components/africa/AfricaHomeContent";
import { AfricaPageShell } from "@/components/africa/AfricaPageShell";
import { JsonLd } from "@/components/JsonLd";
import { africaOrganizationJsonLd } from "@/lib/africa-org-jsonld";

export const metadata: Metadata = {
  title: "RLRI Africa Program | Real Life Research Institute",
  description:
    "Pan-African programs for climate resilience, energy access, urban sustainability, and food security.",
};

export default function Home() {
  return (
    <AfricaPageShell>
      <JsonLd data={africaOrganizationJsonLd()} />
      <AfricaHomeContent />
    </AfricaPageShell>
  );
}
