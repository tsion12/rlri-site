import type { Metadata } from "next";
import { AfricaPolicyBriefsPage } from "@/components/africa/AfricaPublicationsSubPages";

export const metadata: Metadata = {
  title: "Policy Briefs | Africa Program – Real Life Research Institute",
  description:
    "Concise, evidence-based policy analyses from the Real Life Research Institute Africa Programs.",
};

export default function PolicyBriefsPage() {
  return <AfricaPolicyBriefsPage />;
}
