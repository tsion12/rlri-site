import { africaRoutes } from "@/lib/africa-routes";
import { categorizeAfricaEvents, getEventEndIso } from "@/lib/africa-event-schedule";

export type WebinarProgramOrdinal = "01" | "02" | "03" | "04" | "05";

export type AfricaWebinarEvent = {
  id: string;
  title: string;
  subtitle?: string;
  locationDate: string;
  timezoneLine: string;
  summary: string;
  isoDate: string;
  /** Webinar length in minutes; used for live window and moving events to past. */
  durationMinutes: number;
  time: string;
  format: string;
  href: string;
  registerHref: string | null;
  supportProgram: WebinarProgramOrdinal;
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
  eventEndISO: string;
  registerHref: string | null;
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
    durationMinutes: 90,
    time: "9:00 AM – 10:30 AM (Ottawa, EST)",
    format: "Pan-African Webinar",
    href: africaRoutes.events,
    registerHref: null,
    supportProgram: "05",
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
    durationMinutes: 90,
    time: "9:00 AM – 10:30 AM (Ottawa, EDT)",
    format: "Online Webinar",
    href: africaRoutes.events,
    registerHref: null,
    supportProgram: "02",
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
    durationMinutes: 60,
    time: "9:00 AM – 10:00 AM (Ottawa, EDT)",
    format: "Online Webinar",
    href: africaRoutes.eventNextWebinar,
    registerHref:
      "https://docs.google.com/forms/d/e/1FAIpQLSfGSPxWyIdYLIXDRPWZs4XezOXcBZ09rV3yxnPze1DXZ3lXxA/viewform?usp=publish-editor",
    supportProgram: "04",
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
    durationMinutes: 90,
    time: "9:00 AM – 10:30 AM (Ottawa, EDT)",
    format: "Online Webinar",
    href: africaRoutes.eventClimateAdaptation,
    registerHref:
      "https://docs.google.com/forms/d/e/1FAIpQLSdgvJw-YcKHoeblL1dUp3JeTuuy0j4oXMT7N1mper6-JIkPsg/viewform?usp=publish-editor",
    supportProgram: "03",
    tags: ["Climate Adaptation", "Information Integrity"],
    policyBriefHref: null,
    recordingHref: "https://youtu.be/Vqeuq92azaQ",
  },
  {
    id: "ebola-drc-responses-2026",
    title:
      "How Conflict, Aid Cuts, and Misinformation are Redefining Ebola Responses in DRC",
    subtitle: "What Past Outbreaks Should Have Already Taught Us",
    locationDate: "Online webinar | Friday, June 12, 2026",
    timezoneLine:
      "Ottawa: 8:30 – 10:00 AM (EDT) | West Africa: 1:30 – 3:00 PM | Central & Southern Africa: 2:30 – 4:00 PM | East Africa: 3:30 – 5:00 PM",
    summary:
      "Nearly five decades after Ebola was first identified in Yambuku, DRC, the country faces its 17th outbreak—driven by misinformation, conflict, and aid cuts. This webinar asks why Ebola persists despite decades of response experience and what must change to stop outbreaks at their source.",
    isoDate: "2026-06-12T08:30:00-04:00",
    durationMinutes: 90,
    time: "8:30 AM – 10:00 AM (Ottawa, EDT)",
    format: "Online Webinar",
    href: africaRoutes.eventEbolaDrc,
    registerHref: "https://forms.gle/1bn8g7Tu2ZQGcMm36",
    supportProgram: "05",
    tags: ["Public Health", "DRC", "Conflict & Governance"],
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
  return categorizeAfricaEvents(getAfricaWebinarEvents(), now.getTime());
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
    eventEndISO: getEventEndIso(next),
    registerHref: next.registerHref,
  };
}
