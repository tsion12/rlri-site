import type { Metadata } from "next";
import { AfricaEventChokepointsPage } from "@/components/africa/AfricaEventChokepointsPage";

export const metadata: Metadata = {
  title: "Chokepoints and Consequences | Events | RLRI Africa Programs",
  description:
    "Webinar on how disruptions in the Strait of Hormuz and Bab el-Mandeb are reshaping the Horn of Africa's economy and security—fuel prices, port revenues, trade routes, and regional security dynamics.",
};

export default function AfricaEventChokepointsRoute() {
  return <AfricaEventChokepointsPage />;
}
