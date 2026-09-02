import type { AfricaProgramKey } from "@/lib/wp";

export type AfricaPolicyBrief = {
  title: string;
  description: string;
  href: string;
  date: string;
  format: string;
  program: AfricaProgramKey;
};

export const CLASSROOM_CONTENT_RISKS_POLICY_BRIEF_HREF =
  "/assets/publications/policy-brief-02-classroom-content-risks-june-2026.pdf";

const AFRICA_POLICY_BRIEFS: AfricaPolicyBrief[] = [
  {
    title:
      "How Prepared Are African Education Systems for Classroom Content Risks? Perspectives from Cameroon, Kenya and Zimbabwe",
    description:
      "Policy Brief 02 from the June 2026 Digital Futures webinar. Field research in Cameroon, Kenya, and Zimbabwe examines the gap between children's digital-rights laws and classroom practice, and sets out school-level rules on consent, recording, takedown, and educator accountability.",
    href: CLASSROOM_CONTENT_RISKS_POLICY_BRIEF_HREF,
    date: "June 2026",
    format: "PDF",
    program: "digital-futures",
  },
  {
    title:
      "IMPROVING WATER AND SANITATION SERVICE DELIVERY IN CAMEROON, ETHIOPIA, KENYA, AND ZIMBABWE: WHAT IS WORKING, WHAT ISN'T, AND WHY?",
    description:
      "Evidence-informed policy brief from RLRI Africa Program. Download the full PDF for findings and recommendations.",
    href: "https://cms-programs.reallifeinstitute.org/wp-content/uploads/2026/04/Policy-Brief-FEBRUARY-1.pdf",
    date: "April 2026",
    format: "PDF",
    program: "health-systems-equity-social-transformation",
  },
];

export function getAfricaPolicyBriefs() {
  return [...AFRICA_POLICY_BRIEFS];
}

export function getPolicyBriefsForProgram(program: AfricaProgramKey) {
  return AFRICA_POLICY_BRIEFS.filter((brief) => brief.program === program);
}
