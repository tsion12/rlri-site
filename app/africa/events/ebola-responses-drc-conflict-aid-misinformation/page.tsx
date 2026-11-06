import { AfricaEventEbolaDrcPage } from "@/components/africa/AfricaEventEbolaDrcPage";
import { JsonLd } from "@/components/JsonLd";
import { eventDetailMetadata } from "@/lib/africa-event-seo";
import { getAfricaWebinarEventByHref } from "@/lib/africa-events";
import { webinarEventJsonLd } from "@/lib/africa-event-jsonld";
import { africaRoutes } from "@/lib/africa-routes";

export const metadata = eventDetailMetadata({
  title: "Ebola Responses in DRC | Events | RLRI Africa Programs",
  description:
    "Webinar on conflict, aid cuts, and misinformation in DRC Ebola responses—and lessons from past outbreaks for stopping transmission at the source.",
  path: africaRoutes.eventEbolaDrc,
});

export default function AfricaEventEbolaDrcRoute() {
  const event = getAfricaWebinarEventByHref(africaRoutes.eventEbolaDrc);
  return (
    <>
      {event ? <JsonLd data={webinarEventJsonLd(event)} /> : null}
      <AfricaEventEbolaDrcPage />
    </>
  );
}
