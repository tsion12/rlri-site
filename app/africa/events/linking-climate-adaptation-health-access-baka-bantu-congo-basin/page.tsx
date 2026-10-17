import type { Metadata } from "next";
import { AfricaEventCongoBasinHealthPage } from "@/components/africa/AfricaEventCongoBasinHealthPage";

export const metadata: Metadata = {
  title:
    "Linking Climate Adaptation and Health Access in the Congo Basin | Events | RLRI Africa Programs",
  description:
    "Online webinar on 27 November 2026 exploring how climate adaptation and health systems can address the compounded vulnerabilities of Baka and Bantu indigenous forest-dependent communities in Eastern Cameroon.",
};

export default function AfricaEventCongoBasinHealthRoute() {
  return <AfricaEventCongoBasinHealthPage />;
}
