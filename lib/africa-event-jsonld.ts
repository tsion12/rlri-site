import type { AfricaWebinarEvent } from "@/lib/africa-events";
import { getEventEndIso } from "@/lib/africa-event-schedule";
import { SITE_URL, absoluteUrl } from "@/lib/site";

const ORGANIZER = {
  "@type": "Organization",
  name: "Real Life Research Institute",
  url: SITE_URL,
} as const;

/** Fallback event image (site logo) — Google recommends an image on Event markup. */
const DEFAULT_EVENT_IMAGE = absoluteUrl("/assets/RLRL-AP-Logo.png");

/** schema.org Event object (without @context, for embedding in a list). */
function buildEvent(event: AfricaWebinarEvent): Record<string, unknown> {
  const url = absoluteUrl(event.href);
  const data: Record<string, unknown> = {
    "@type": "Event",
    name: event.title,
    description: event.summary,
    startDate: event.isoDate,
    endDate: getEventEndIso(event),
    eventAttendanceMode: "https://schema.org/OnlineEventAttendanceMode",
    eventStatus: "https://schema.org/EventScheduled",
    location: {
      "@type": "VirtualLocation",
      url: event.registerHref ?? url,
    },
    organizer: ORGANIZER,
    image: [DEFAULT_EVENT_IMAGE],
    url,
    isAccessibleForFree: true,
  };

  if (event.speakers?.length) {
    data.performer = event.speakers.map((speaker) => ({
      "@type": "Person",
      name: speaker.name,
    }));
  }

  if (event.registerHref) {
    data.offers = {
      "@type": "Offer",
      url: event.registerHref,
      price: "0",
      priceCurrency: "USD",
      availability: "https://schema.org/InStock",
      category: "Free",
    };
  }

  return data;
}

/** Full Event payload for a single event's detail page. */
export function webinarEventJsonLd(event: AfricaWebinarEvent) {
  return { "@context": "https://schema.org", ...buildEvent(event) };
}

/** ItemList of all webinars for the events hub page. */
export function eventsItemListJsonLd(events: AfricaWebinarEvent[]) {
  return {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: "RLRI Africa Webinar Series",
    itemListElement: events.map((event, index) => ({
      "@type": "ListItem",
      position: index + 1,
      url: absoluteUrl(event.href),
      item: buildEvent(event),
    })),
  };
}
