import { AfricaEventClimateAdaptationPage } from "@/components/africa/AfricaEventClimateAdaptationPage";
import { JsonLd } from "@/components/JsonLd";
import { eventDetailMetadata } from "@/lib/africa-event-seo";
import { getAfricaWebinarEventByHref } from "@/lib/africa-events";
import { webinarEventJsonLd } from "@/lib/africa-event-jsonld";
import { africaRoutes } from "@/lib/africa-routes";

export const metadata = eventDetailMetadata({
  title: "Rethinking Climate Adaptation in Africa | Events | RLRI Africa Programs",
  description:
    "Webinar details for RLRI Africa Programs: locally grounded climate adaptation in Africa, with evidence from the Sahel, insights on information integrity, and local practice from Sierra Leone.",
  path: africaRoutes.eventClimateAdaptation,
});

export default function AfricaEventClimateAdaptationRoute() {
  const event = getAfricaWebinarEventByHref(africaRoutes.eventClimateAdaptation);
  return (
    <>
      {event ? <JsonLd data={webinarEventJsonLd(event)} /> : null}
      <AfricaEventClimateAdaptationPage />
    </>
  );
}
