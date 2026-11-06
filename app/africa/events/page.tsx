import type { Metadata } from "next";
import { AfricaEventsPage } from "@/components/africa/AfricaEventsPage";
import { JsonLd } from "@/components/JsonLd";
import { eventsItemListJsonLd } from "@/lib/africa-event-jsonld";
import { getAfricaWebinarEvents } from "@/lib/africa-events";
import { africaRoutes } from "@/lib/africa-routes";

const EVENTS_DESCRIPTION =
  "Upcoming and past webinars, panels, and forums from the Real Life Research Institute – Africa Programs. Join researchers, policy leaders, and communities tackling Africa's development challenges.";

export const metadata: Metadata = {
  title: "Events | RLRI Africa Programs",
  description: EVENTS_DESCRIPTION,
  keywords: [
    "Africa research webinars",
    "African policy events",
    "climate adaptation webinar",
    "public health Africa",
    "digital rights Africa",
    "Real Life Research Institute",
  ],
  alternates: { canonical: africaRoutes.events },
  openGraph: {
    type: "website",
    url: africaRoutes.events,
    siteName: "Real Life Research Institute — Africa Programs",
    title: "RLRI Africa Webinar Series — Where African research meets policy, live",
    description: EVENTS_DESCRIPTION,
    images: [
      {
        url: "/assets/RLRL-AP-Logo.png",
        width: 1600,
        height: 900,
        alt: "Real Life Research Institute — Africa Programs",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "RLRI Africa Webinar Series",
    description: EVENTS_DESCRIPTION,
    images: ["/assets/RLRL-AP-Logo.png"],
  },
};

export default function EventsPage() {
  const events = getAfricaWebinarEvents();

  return (
    <>
      <JsonLd data={eventsItemListJsonLd(events)} />
      <AfricaEventsPage />
    </>
  );
}
