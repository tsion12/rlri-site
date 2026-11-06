import { AfricaEventTeachingForViewsPage } from "@/components/africa/AfricaEventTeachingForViewsPage";
import { JsonLd } from "@/components/JsonLd";
import { eventDetailMetadata } from "@/lib/africa-event-seo";
import { getAfricaWebinarEventByHref } from "@/lib/africa-events";
import { webinarEventJsonLd } from "@/lib/africa-event-jsonld";
import { africaRoutes } from "@/lib/africa-routes";

export const metadata = eventDetailMetadata({
  title: "Teaching for Views | Events | RLRI Africa Programs",
  description:
    "Webinar on social media and emerging digital risks in African classrooms—examining the use of students for content creation, children's digital rights, and institutional accountability.",
  path: africaRoutes.eventTeachingForViews,
});

export default function AfricaEventTeachingForViewsRoute() {
  const event = getAfricaWebinarEventByHref(africaRoutes.eventTeachingForViews);
  return (
    <>
      {event ? <JsonLd data={webinarEventJsonLd(event)} /> : null}
      <AfricaEventTeachingForViewsPage />
    </>
  );
}
