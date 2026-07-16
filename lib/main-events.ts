import type { TranslationKey } from "@/lib/i18n/messages/en";
import { mainRoutes } from "@/lib/main-routes";

export type MainInstituteEventTiming = "upcoming" | "past";

export type MainInstituteEvent = {
  id: string;
  timing: MainInstituteEventTiming;
  sortDate: string;
  /** Filename inside `public/assets/main-gallery/` (not necessarily part of the home gallery). */
  image: string;
  titleKey: TranslationKey;
  summaryKey: TranslationKey;
  whenKey: TranslationKey;
  whereKey: TranslationKey;
  programKey: TranslationKey;
  tagKeys: TranslationKey[];
  href?: string;
};

/** Only the Unity Run appears as a photo card in the past-events section. */
export const MAIN_PAST_GATHERING: MainInstituteEvent = {
  id: "love-unity-run",
  timing: "past",
  sortDate: "2025-08-23",
  image: "WhatsApp Image 2025-08-23 at 19.07.50 (1).jpeg",
  titleKey: "pages.events.items.loveUnityRun.title",
  summaryKey: "pages.events.items.loveUnityRun.summary",
  whenKey: "pages.events.items.loveUnityRun.when",
  whereKey: "pages.events.items.loveUnityRun.where",
  programKey: "pages.events.items.loveUnityRun.program",
  tagKeys: ["pages.events.tags.community", "pages.events.tags.sport"],
  href: `${mainRoutes.home}#main-events-gallery`,
};

export const MAIN_INSTITUTE_UPCOMING_EVENTS: MainInstituteEvent[] = [
  {
    id: "arctic-security-conference-2026",
    timing: "upcoming",
    sortDate: "2026-08-26",
    image: "Rethinking Arctic Security from Iqaluit-conference.jpeg",
    titleKey: "pages.events.items.arcticConference.title",
    summaryKey: "pages.events.items.arcticConference.summary",
    whenKey: "pages.events.items.arcticConference.when",
    whereKey: "pages.events.items.arcticConference.where",
    programKey: "pages.events.items.arcticConference.program",
    tagKeys: ["pages.events.tags.arcticSecurity", "pages.events.tags.community"],
    href: mainRoutes.conference,
  },
  {
    id: "unity-race-2026",
    timing: "upcoming",
    sortDate: "2026-07-01",
    image: "Iqaluit Unity Race.jpeg",
    titleKey: "pages.events.items.unityRace.title",
    summaryKey: "pages.events.items.unityRace.summary",
    whenKey: "pages.events.items.unityRace.when",
    whereKey: "pages.events.items.unityRace.where",
    programKey: "pages.events.items.unityRace.program",
    tagKeys: ["pages.events.tags.community", "pages.events.tags.arcticSecurity"],
    href: mainRoutes.arcticSecurity,
  },
  {
    id: "community-soccer-2026",
    timing: "upcoming",
    sortDate: "2026-06-15",
    image: "Community Soccer initiative.jpeg",
    titleKey: "pages.events.items.communitySoccer.title",
    summaryKey: "pages.events.items.communitySoccer.summary",
    whenKey: "pages.events.items.communitySoccer.when",
    whereKey: "pages.events.items.communitySoccer.where",
    programKey: "pages.events.items.communitySoccer.program",
    tagKeys: ["pages.events.tags.youth", "pages.events.tags.community"],
    href: mainRoutes.arcticSecurity,
  },
  {
    id: "summer-celebrations-2026",
    timing: "upcoming",
    sortDate: "2026-06-01",
    image: "Celebrate Canada pictures 3.jpeg",
    titleKey: "pages.events.items.summerCelebrations.title",
    summaryKey: "pages.events.items.summerCelebrations.summary",
    whenKey: "pages.events.items.summerCelebrations.when",
    whereKey: "pages.events.items.summerCelebrations.where",
    programKey: "pages.events.items.summerCelebrations.program",
    tagKeys: ["pages.events.tags.volunteer", "pages.events.tags.community"],
    href: mainRoutes.volunteer,
  },
];

export function getMainInstituteUpcomingEvents() {
  return [...MAIN_INSTITUTE_UPCOMING_EVENTS].sort((a, b) => a.sortDate.localeCompare(b.sortDate));
}

export const MULTICULTURALISM_DAY_FLYER = "/assets/main-events/multiculturalism-day-2026-flyer.png";

export const MULTICULTURALISM_GALLERY_BASE = "/assets/main-gallery/multi-culturism";

export const MULTICULTURALISM_GALLERY_FILES = [
  "WhatsApp Image 2026-06-27 at 19.51.26.jpeg",
  "WhatsApp Image 2026-06-27 at 19.51.26 (1).jpeg",
  "WhatsApp Image 2026-06-27 at 19.51.26 (2).jpeg",
  "WhatsApp Image 2026-06-27 at 19.51.27.jpeg",
  "WhatsApp Image 2026-06-27 at 19.51.27 (1).jpeg",
  "WhatsApp Image 2026-06-28 at 06.31.45.jpeg",
  "WhatsApp Image 2026-06-28 at 06.31.47.jpeg",
  "WhatsApp Image 2026-06-28 at 06.31.48.jpeg",
  "WhatsApp Image 2026-06-28 at 06.32.39.jpeg",
  "WhatsApp Image 2026-06-28 at 06.32.43.jpeg",
  "WhatsApp Image 2026-06-28 at 06.32.44.jpeg",
  "WhatsApp Image 2026-06-28 at 06.32.48.jpeg",
  "WhatsApp Image 2026-06-28 at 06.32.50.jpeg",
  "WhatsApp Image 2026-06-28 at 06.32.52.jpeg",
  "WhatsApp Image 2026-06-28 at 06.32.55.jpeg",
  "WhatsApp Image 2026-06-28 at 06.33.03.jpeg",
  "WhatsApp Image 2026-06-28 at 06.33.05.jpeg",
  "WhatsApp Image 2026-06-28 at 06.33.09.jpeg",
  "WhatsApp Image 2026-06-28 at 06.33.12.jpeg",
  "WhatsApp Image 2026-06-28 at 06.33.20.jpeg",
] as const;

export function multiculturalismGallerySrc(file: string) {
  return `${MULTICULTURALISM_GALLERY_BASE}/${encodeURIComponent(file)}`;
}

export const MULTICULTURALISM_GALLERY_IMAGES = MULTICULTURALISM_GALLERY_FILES.map(
  (file, index) => ({
    id: `multiculturalism-${index}`,
    src: multiculturalismGallerySrc(file),
  }),
);

/** Spread of event photos for the hero carousel — diverse moments across the day. */
const EVENTS_HERO_INDICES = [0, 1, 3, 5, 7, 9, 11, 13, 15, 17, 18, 19] as const;

export const EVENTS_HERO_IMAGES = EVENTS_HERO_INDICES.map((index) => MULTICULTURALISM_GALLERY_IMAGES[index]);

export const EVENTS_HERO_INTERVAL_MS = 2800;

export const MULTICULTURALISM_DAY_AGENDA = [
  { activityKey: "pages.events.recent.multiculturalismDay.agenda.protocol", start: "1:30 PM", end: "2:00 PM" },
  { activityKey: "pages.events.recent.multiculturalismDay.agenda.food", start: "2:00 PM", end: "4:00 PM" },
  { activityKey: "pages.events.recent.multiculturalismDay.agenda.family", start: "3:00 PM", end: "4:00 PM" },
  { activityKey: "pages.events.recent.multiculturalismDay.agenda.shows", start: "4:00 PM", end: "6:00 PM" },
  { activityKey: "pages.events.recent.multiculturalismDay.agenda.dance", start: "6:00 PM", end: "7:00 PM" },
  { activityKey: "pages.events.recent.multiculturalismDay.agenda.teardown", start: "7:00 PM", end: "8:00 PM" },
] as const;

export const MULTICULTURALISM_DAY_PROTOCOL = [
  "pages.events.recent.multiculturalismDay.protocol.landAcknowledgement",
  "pages.events.recent.multiculturalismDay.protocol.unityToast",
  "pages.events.recent.multiculturalismDay.protocol.groupPhoto",
] as const;

export const MULTICULTURALISM_DAY_PROGRAM = [
  "pages.events.recent.multiculturalismDay.program.tasting",
  "pages.events.recent.multiculturalismDay.program.meal",
  "pages.events.recent.multiculturalismDay.program.performances",
] as const;

export const MULTICULTURALISM_DAY_NOTES = [
  "pages.events.recent.multiculturalismDay.notes.regalia",
  "pages.events.recent.multiculturalismDay.notes.freeEntry",
  "pages.events.recent.multiculturalismDay.notes.takeaways",
] as const;
