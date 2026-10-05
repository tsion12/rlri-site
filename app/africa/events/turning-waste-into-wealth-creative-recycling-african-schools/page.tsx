import type { Metadata } from "next";
import { AfricaEventWasteToWealthPage } from "@/components/africa/AfricaEventWasteToWealthPage";

export const metadata: Metadata = {
  title: "Turning Waste into Wealth | Events | RLRI Africa Programs",
  description:
    "Webinar on how creative recycling and circular-economy initiatives in African schools can turn campus waste into functional infrastructure, teach green-economy entrepreneurial skills, and drive environmental sustainability.",
};

export default function AfricaEventWasteToWealthRoute() {
  return <AfricaEventWasteToWealthPage />;
}
