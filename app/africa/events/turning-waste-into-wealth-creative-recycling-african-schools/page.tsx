import { AfricaEventWasteToWealthPage } from "@/components/africa/AfricaEventWasteToWealthPage";
import { JsonLd } from "@/components/JsonLd";
import { eventDetailMetadata } from "@/lib/africa-event-seo";
import { getAfricaWebinarEventByHref } from "@/lib/africa-events";
import { webinarEventJsonLd } from "@/lib/africa-event-jsonld";
import { africaRoutes } from "@/lib/africa-routes";

export const metadata = eventDetailMetadata({
  title: "Turning Waste into Wealth | Events | RLRI Africa Programs",
  description:
    "Webinar on how creative recycling and circular-economy initiatives in African schools can turn campus waste into functional infrastructure, teach green-economy entrepreneurial skills, and drive environmental sustainability.",
  path: africaRoutes.eventWasteToWealth,
});

export default function AfricaEventWasteToWealthRoute() {
  const event = getAfricaWebinarEventByHref(africaRoutes.eventWasteToWealth);
  return (
    <>
      {event ? <JsonLd data={webinarEventJsonLd(event)} /> : null}
      <AfricaEventWasteToWealthPage />
    </>
  );
}
