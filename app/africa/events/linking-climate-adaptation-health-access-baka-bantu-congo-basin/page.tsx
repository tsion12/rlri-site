import { AfricaEventCongoBasinHealthPage } from "@/components/africa/AfricaEventCongoBasinHealthPage";
import { JsonLd } from "@/components/JsonLd";
import { eventDetailMetadata } from "@/lib/africa-event-seo";
import { getAfricaWebinarEventByHref } from "@/lib/africa-events";
import { webinarEventJsonLd } from "@/lib/africa-event-jsonld";
import { africaRoutes } from "@/lib/africa-routes";

export const metadata = eventDetailMetadata({
  title:
    "Linking Climate Adaptation and Health Access in the Congo Basin | Events | RLRI Africa Programs",
  description:
    "Online webinar on 27 November 2026 exploring how climate adaptation and health systems can address the compounded vulnerabilities of Baka and Bantu indigenous forest-dependent communities in Eastern Cameroon.",
  path: africaRoutes.eventCongoBasinHealth,
});

export default function AfricaEventCongoBasinHealthRoute() {
  const event = getAfricaWebinarEventByHref(africaRoutes.eventCongoBasinHealth);
  return (
    <>
      {event ? <JsonLd data={webinarEventJsonLd(event)} /> : null}
      <AfricaEventCongoBasinHealthPage />
    </>
  );
}
