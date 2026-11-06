import { AfricaEventNextWebinarPage } from "@/components/africa/AfricaEventNextWebinarPage";
import { JsonLd } from "@/components/JsonLd";
import { eventDetailMetadata } from "@/lib/africa-event-seo";
import { getAfricaWebinarEventByHref } from "@/lib/africa-events";
import { webinarEventJsonLd } from "@/lib/africa-event-jsonld";
import { africaRoutes } from "@/lib/africa-routes";

export const metadata = eventDetailMetadata({
  title:
    "Tensions in the Middle East: Implications for African Security and Digital Infrastructure | Events | RLRI Africa Programs",
  description:
    "Webinar details, speakers, and registration for RLRI Africa Program's event on Middle East tensions and implications for African security and digital infrastructure.",
  path: africaRoutes.eventNextWebinar,
});

export default function AfricaEventNextWebinarRoute() {
  const event = getAfricaWebinarEventByHref(africaRoutes.eventNextWebinar);
  return (
    <>
      {event ? <JsonLd data={webinarEventJsonLd(event)} /> : null}
      <AfricaEventNextWebinarPage />
    </>
  );
}
