/**
 * Public Learning Hub — catalogue, flagship course, pricing. Edit copy here.
 *
 * Source of truth: RLRI Learning Hub Proposal (Oct 2026).
 * Preview: npm run dev → http://localhost:3000/africa/learn
 *
 * Pre-sale phase: only the flagship Master Class takes enrolments; the rest
 * are marked "coming-soon" and launch wave by wave. Payments (Paystack /
 * Flutterwave) are NOT wired yet — enrolment is interest capture only.
 */

export const learnMasterClassSlug = "ethical-ai-claude-master-class";

export const learnMeta = {
  kicker: "RLRI Learning Hub",
  title: "Paid courses and certificates that build real skills",
  mission:
    "Short, live, assessed courses on responsible AI and the work African institutions actually do — with live experts, feedback on your own work, and a route to publication through TËBÅTËBÅ InFocus.",
  /** Hard design constraint: most learners are on 3G or feature phones. */
  bandwidthNote:
    "Built for low bandwidth: every session comes with a recording, transcript, PDF notes, audio, and WhatsApp reminders.",
} as const;

/** The three layers of the hub, free → paid. */
export const learnLayers = [
  {
    id: "webinars",
    label: "Free",
    title: "Webinars",
    body: "Free webinars and attendance certificates that bring people in.",
  },
  {
    id: "cohorts",
    label: "Paid · the core",
    title: "Live cohorts",
    body: "Short, live, assessed courses with feedback on each learner’s own work.",
  },
  {
    id: "library",
    label: "Low price",
    title: "Self-paced library",
    body: "Recorded courses at $15–30 for people who can’t join live.",
  },
] as const;

export type LearnWaveId = "wave-1" | "wave-2" | "wave-3";

export const learnWaves: { id: LearnWaveId; label: string; window: string }[] = [
  { id: "wave-1", label: "Wave 1", window: "Months 2–4" },
  { id: "wave-2", label: "Wave 2", window: "Months 4–9" },
  { id: "wave-3", label: "Wave 3", window: "Months 9–18" },
];

export type CourseStatus = "open" | "coming-soon";

export type LearnCourse = {
  id: string;
  title: string;
  buyer: string;
  wave: LearnWaveId;
  status: CourseStatus;
  /** Internal route for courses with a page of their own; null while coming soon. */
  href: string | null;
  flagship?: boolean;
};

export const learnCourses: LearnCourse[] = [
  {
    id: "ethical-ai-master-class",
    title: "Ethical AI – Claude Master Class",
    buyer: "Professionals, NGO and government teams",
    wave: "wave-1",
    status: "open",
    href: `/africa/learn/${learnMasterClassSlug}`,
    flagship: true,
  },
  {
    id: "grant-proposal-writing",
    title: "AI-assisted grant and proposal writing",
    buyer: "NGOs and civil-society groups",
    wave: "wave-2",
    status: "coming-soon",
    href: null,
  },
  {
    id: "policy-brief-writing",
    title: "Policy-brief writing (TËBÅTËBÅ InFocus practicum)",
    buyer: "Researchers, students, government analysts",
    wave: "wave-2",
    status: "coming-soon",
    href: null,
  },
  {
    id: "org-ai-policy-workshop",
    title: "Organisational AI policy workshop (half-day)",
    buyer: "NGO leadership, government units",
    wave: "wave-2",
    status: "coming-soon",
    href: null,
  },
  {
    id: "psychosocial-support",
    title: "Psychosocial support and staff wellbeing (non-clinical)",
    buyer: "Humanitarian and NGO staff",
    wave: "wave-3",
    status: "coming-soon",
    href: null,
  },
  {
    id: "peace-security",
    title: "Peace, security and conflict analysis",
    buyer: "Government, CSOs, researchers",
    wave: "wave-3",
    status: "coming-soon",
    href: null,
  },
  {
    id: "data-me",
    title: "Data analysis and M&E with AI tools",
    buyer: "NGOs, researchers",
    wave: "wave-3",
    status: "coming-soon",
    href: null,
  },
  {
    id: "digital-safety",
    title: "Digital communications and digital safety",
    buyer: "NGOs, youth",
    wave: "wave-3",
    status: "coming-soon",
    href: null,
  },
  {
    id: "health-emergency",
    title: "Health emergency preparedness",
    buyer: "Health workers, ministries",
    wave: "wave-3",
    status: "coming-soon",
    href: null,
  },
];

/* ── Flagship: Ethical AI – Claude Master Class ───────────────────────── */

export const masterClass = {
  slug: learnMasterClassSlug,
  kicker: "Flagship course · Wave 1",
  title: "Ethical AI – Claude Master Class",
  tagline:
    "Four live sessions and a graded capstone — responsible AI for the work African institutions actually do.",
  format: "4 × 2-hour live sessions on Zoom over 2–3 weeks, plus a graded capstone.",
  whyLive:
    "Live cohorts are the right model: self-paced online courses have a median completion of about 12.6% (Jordan, IRRODL), and the strongest African evidence favours blended, supported learning.",
  modules: [
    "AI fluency and Claude basics (Anthropic’s free AI Fluency course as pre-work)",
    "Values and principles: UNESCO Recommendation on the Ethics of AI, OECD AI Principles",
    "The African context: bias, language and the AU Continental AI Strategy",
    "Data protection in practice (Kenya, Nigeria, Ethiopia, South Africa)",
    "Responsible use in policy, security and health work",
    "Capstone: an ethical impact assessment of a workflow the learner actually uses",
  ],
  deliverables: [
    "Session recording",
    "Transcript",
    "PDF notes",
    "Audio version",
    "WhatsApp reminders between sessions",
  ],
  certificate:
    "Learners earn a certificate only by passing the graded capstone. Each certificate states what the learner can do and has a link anyone can verify. Certificates are RLRI’s own and are never presented as endorsed by Anthropic.",
} as const;

/* ── Pricing ──────────────────────────────────────────────────────────── */

export const pricingTierLabels = {
  student: "Student / youth",
  african: "African professional",
  international: "International",
  institution: "Institutional seat",
} as const;

export type PricingRow = {
  course: string;
  student: string;
  african: string;
  international: string;
  institution: string;
};

/** Prices are set in USD and shown in local currency at checkout. */
export const pricingRows: PricingRow[] = [
  {
    course: "Ethical AI – Claude Master Class",
    student: "$60",
    african: "$120",
    international: "$250",
    institution: "$400",
  },
  {
    course: "Grant and proposal writing",
    student: "$45",
    african: "$95",
    international: "$200",
    institution: "$350",
  },
  {
    course: "Policy-brief writing",
    student: "$40",
    african: "$80",
    international: "$150",
    institution: "$300",
  },
  {
    course: "Psychosocial / peace & security / M&E",
    student: "$45",
    african: "$95",
    international: "$200",
    institution: "$350",
  },
];

export const pricingExtras = [
  "Organisational AI policy workshop: $1,500–2,500 per organisation (up to 20 staff)",
  "Self-paced library: $15–30 per course",
  "Sponsor-a-seat: $150 · Team pack of 10 Master Class seats: $3,000",
  "One-to-one feedback on a proposal or brief: +$40–50",
  "Instalments in two payments on anything above $100",
] as const;

export const scholarshipNote =
  "20% of seats in every cohort go to scholarships, funded by sponsor-a-seat and donor money.";
