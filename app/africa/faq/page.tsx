import type { Metadata } from "next";
import { AfricaFaqPage } from "@/components/africa/AfricaFaqPage";
import { JsonLd } from "@/components/JsonLd";
import { africaFaqPageJsonLd } from "@/lib/africa-faq";

export const metadata: Metadata = {
  title: "FAQs | RLRI Africa Program – Real Life Research Institute",
  description:
    "Frequently asked questions about the RLRI Africa Program — our work, how to support us, scholarship opportunities, and how to get involved.",
};

export default function FaqPage() {
  return (
    <>
      <JsonLd data={africaFaqPageJsonLd()} />
      <AfricaFaqPage />
    </>
  );
}
