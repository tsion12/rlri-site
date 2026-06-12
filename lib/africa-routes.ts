/**
 * Internal Next.js routes for the Africa Program section.
 * Use these instead of linking to wordpress (reallifeinstitute.org or africa-programs subdomain).
 */
export const africaRoutes = {
  home: "/",
  about: "/africa/about",
  aboutPolicies: "/africa/about#policies",
  team: "/africa/team",
  /** Volunteering information (standalone page; do not use /team#volunteers). */
  volunteers: "/africa/volunteers",
  career: "/africa/career",
  events: "/africa/events",
  eventNextWebinar: "/africa/events/tensions-middle-east-security-digital-infrastructure",
  eventClimateAdaptation: "/africa/events/rethinking-climate-adaptation-in-africa",
  eventEbolaDrc: "/africa/events/ebola-responses-drc-conflict-aid-misinformation",
  eventTeachingForViews: "/africa/events/teaching-for-views-social-media-african-classrooms",
  programs: "/africa/programs",
  publications: "/africa/publications",
  blogs: "/africa/publications/blogs",
  stories: "/africa/publications/stories",
  policyBriefs: "/africa/publications/policy-briefs",
  /** Blogs and policy briefs filtered by program slug/key. */
  programPublications: (program: string) =>
    `/africa/publications/by-program?program=${encodeURIComponent(program)}`,
  faq: "/africa/faq",
  donate: "/africa/donate",
  /** Gallery / media hub (publications & stories). */
  media: "/africa/publications",
  getInvolved: "/africa/donate",
  /** Main institute marketing home (this app’s root). */
  institute: "/",
  /** Canadian / global institute program (main RLRI site). */
  canadianProgram: "https://reallifeinstitute.org",
} as const;

/**
 * Inboxes for program coordination, applications, and HR.
 * - `jobsHr`: resumes, job and structured volunteer applications.
 * - `hrSupport`: general HR questions and support.
 */
export const africaEmails = {
  programsCoord: "programs_coord@reallifeinstitute.org",
  jobsHr: "jobs_hr@reallifeinstitute.org",
  hrSupport: "hr.support@reallifeinstitute.org",
} as const;

export function programsAnchor(programOrdinal: string) {
  return `${africaRoutes.programs}#${programOrdinal}`;
}
