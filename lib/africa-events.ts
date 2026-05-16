import { africaRoutes } from "@/lib/africa-routes";

export type AfricaSupportMonth = "february" | "march" | "april" | "may";

export type AfricaWebinarEvent = {
  id: string;
  title: string;
  subtitle?: string;
  locationDate: string;
  timezoneLine: string;
  summary: string;
  isoDate: string;
  time: string;
  format: string;
  href: string;
  registerHref: string | null;
  supportMonth: AfricaSupportMonth;
  tags: string[];
  policyBriefHref: string | null;
  recordingHref: string | null;
};

export type AfricaEventHighlight = {
  title: string;
  excerpt: string;
  link: string;
  modified: string;
  eventDateISO: string;
};

const AFRICA_WEBINAR_EVENTS: AfricaWebinarEvent[] = [
  {
    id: "water-sanitation-2025",
    title: "Assuring Sustainable Water Availability and Safe Sanitation Systems in Africa",
    locationDate: "Online webinar | Friday, February 21, 2025",
    timezoneLine: "Pan-African webinar session",
    summary:
      "This Pan-African webinar brought together researchers, policy practitioners, and civil society actors to discuss governance, sustainability, and financing challenges affecting water availability and sanitation systems across Africa.",
    isoDate: "2025-02-21T09:00:00-05:00",
    time: "9:00 AM – 10:30 AM (Ottawa, EST)",
    format: "Pan-African Webinar",
    href: africaRoutes.events,
    registerHref: null,
    supportMonth: "february",
    tags: ["Water & Sanitation", "Governance"],
    policyBriefHref: africaRoutes.policyBriefs,
    recordingHref: "https://www.youtube.com/watch?v=IIorkFDsOZ0",
  },
  {
    id: "legal-protection-women-girls-2026",
    title: "Strengthening Legal Protection Systems for Women and Girls in Sub-Saharan Africa in the Age of AI",
    locationDate: "Online webinar | Friday, March 27, 2026",
    timezoneLine: "Regional session across Africa and North America",
    summary:
      "This webinar explored why progressive legal frameworks across Africa often fail to translate into real justice for women and girls, examining institutional weaknesses, gender-responsive budgeting, survivor support systems, and accountability mechanisms.",
    isoDate: "2026-03-27T09:00:00-04:00",
    time: "9:00 AM – 10:30 AM (Ottawa, EDT)",
    format: "Online Webinar",
    href: africaRoutes.events,
    registerHref: null,
    supportMonth: "march",
    tags: ["Gender Justice", "Legal Frameworks"],
    policyBriefHref: null,
    recordingHref: "https://www.youtube.com/watch?v=ZnAWHbZ5Gsk",
  },
  {
    id: "middle-east-security-digital-infrastructure-2026",
    title: "Tensions in the Middle East: Implications for African Security and Digital Infrastructure",
    locationDate: "Location: Online | Monday, April 27, 2026",
    timezoneLine:
      "Ottawa (EDT): 9:00 am – 10:00 am | South Africa (SAST): 3:00 pm – 4:00 pm | Kenya / Ethiopia (EAT): 4:00 pm – 5:00 pm | Cameroon/Nigeria (WAT): 2:00 pm – 3:00 pm",
    summary:
      "This event brought together scholars, policymakers, and practitioners to examine the economic, security, and political implications of the evolving Middle East crisis for Africa, with special focus on digital infrastructure resilience.",
    isoDate: "2026-04-27T09:00:00-04:00",
    time: "9:00 AM – 10:00 AM (Ottawa, EDT)",
    format: "Online Webinar",
    href: africaRoutes.eventNextWebinar,
    registerHref:
      "https://docs.google.com/forms/d/e/1FAIpQLSfGSPxWyIdYLIXDRPWZs4XezOXcBZ09rV3yxnPze1DXZ3lXxA/viewform?usp=publish-editor",
    supportMonth: "april",
    tags: ["Security", "Digital Infrastructure"],
    policyBriefHref: null,
    recordingHref: "https://youtu.be/tf52SsxgKAs",
  },
  {
    id: "rethinking-climate-adaptation-africa-2026",
    title: "Rethinking Climate Adaptation in Africa",
    subtitle:
      "Evidence from a Sahel Climate–Conflict Synthesis, Disinformation Research, and Local Practice in Sierra Leone",
    locationDate: "Online webinar | Friday, May 29, 2026",
    timezoneLine:
      "Ottawa: 9:00 – 10:30 AM (EDT) | West Africa: 1:00 – 2:30 PM | North Africa: 2:00 – 3:30 PM | Central & Southern Africa: 3:00 – 4:30 PM | East Africa: 4:00 – 5:30 PM",
    summary:
      "Across Africa, climate change is no longer a future risk but a lived reality. This webinar recentres locally grounded adaptation in African climate responses by bringing together three complementary perspectives: evidence from a Sahel-focused climate-conflict-migration synthesis under the BAOBAB initiative; expert insight on climate misinformation and disinformation and their implications for adaptation governance; and lived experience from local practice in high-risk communities in Sierra Leone.",
    isoDate: "2026-05-29T09:00:00-04:00",
    time: "9:00 AM – 10:30 AM (Ottawa, EDT)",
    format: "Online Webinar",
    href: africaRoutes.eventClimateAdaptation,
    registerHref:
      "https://docs.google.com/forms/d/e/1FAIpQLSdgvJw-YcKHoeblL1dUp3JeTuuy0j4oXMT7N1mper6-JIkPsg/viewform?usp=publish-editor",
    supportMonth: "may",
    tags: ["Climate Adaptation", "Information Integrity"],
    policyBriefHref: null,
    recordingHref: null,
  },
];

function toMillis(isoDate: string) {
  return new Date(isoDate).getTime();
}

export function getAfricaWebinarEvents() {
  return [...AFRICA_WEBINAR_EVENTS].sort((a, b) => toMillis(a.isoDate) - toMillis(b.isoDate));
}

export function getCategorizedAfricaEvents(now = new Date()) {
  const nowMs = now.getTime();
  const sorted = getAfricaWebinarEvents();
  const upcoming = sorted.filter((event) => toMillis(event.isoDate) >= nowMs);
  const past = sorted.filter((event) => toMillis(event.isoDate) < nowMs).reverse();
  return { upcoming, past };
}

export function getUpcomingAfricaEventHighlight(now = new Date()): AfricaEventHighlight | null {
  const next = getCategorizedAfricaEvents(now).upcoming[0];
  if (!next) return null;

  return {
    title: next.title,
    excerpt: next.summary,
    link: next.href,
    modified: now.toISOString(),
    eventDateISO: next.isoDate,
  };
}
