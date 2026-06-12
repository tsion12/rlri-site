import type { Metadata } from "next";
import { AfricaEventTeachingForViewsPage } from "@/components/africa/AfricaEventTeachingForViewsPage";

export const metadata: Metadata = {
  title: "Teaching for Views | Events | RLRI Africa Programs",
  description:
    "Webinar on social media and emerging digital risks in African classrooms—examining the use of students for content creation, children's digital rights, and institutional accountability.",
};

export default function AfricaEventTeachingForViewsRoute() {
  return <AfricaEventTeachingForViewsPage />;
}
