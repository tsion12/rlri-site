import { AfricaEventChokepointsPage } from "@/components/africa/AfricaEventChokepointsPage";
import { JsonLd } from "@/components/JsonLd";
import { eventDetailMetadata } from "@/lib/africa-event-seo";
import { getAfricaWebinarEventByHref } from "@/lib/africa-events";
import { webinarEventJsonLd } from "@/lib/africa-event-jsonld";
import { africaRoutes } from "@/lib/africa-routes";

export const metadata = eventDetailMetadata({
  title: "Chokepoints and Consequences | Events | RLRI Africa Programs",
  description:
    "Webinar on how disruptions in the Strait of Hormuz and Bab el-Mandeb are reshaping the Horn of Africa's economy and security—fuel prices, port revenues, trade routes, and regional security dynamics.",
  path: africaRoutes.eventChokepoints,
});

export default function AfricaEventChokepointsRoute() {
  const event = getAfricaWebinarEventByHref(africaRoutes.eventChokepoints);
  return (
    <>
      {event ? <JsonLd data={webinarEventJsonLd(event)} /> : null}
      <AfricaEventChokepointsPage />
    </>
  );
}
