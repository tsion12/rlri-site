/**
 * Hub copy, 4D cards, journey, and courses — edit here.
 *
 * Preview: npm run dev → http://localhost:3000/internal/ai-master-class
 * Passcode: MASTER_CLASS_PASSCODE in .env.local (required in production). Local fallback: `rlri-learn`.
 * Quizzes: ./checkpoints.ts   Team/offices: ./team.ts
 */
import type { Course, JourneyStageId } from "./types";

export const masterClassMeta = {
  title: "Ethical AI · Claude Master Class",
  kicker: "Internal learning hub",
  mission:
    "Learn to work with Claude the RLRI way — clearly, carefully, and in service of the communities we partner with.",
  passMark: 0.8,
} as const;

export const framework4d = [
  {
    id: "delegation",
    letter: "D1",
    title: "Delegation",
    prompt: "What stays human?",
    body: "Decide what to hand to AI and what stays with us — judgment, relationships, and accountability never leave the room.",
  },
  {
    id: "description",
    letter: "D2",
    title: "Description",
    prompt: "Ask with care.",
    body: "Give Claude the context, format, and tone it needs. A clear brief is a kindness to your future self — and to the reader.",
  },
  {
    id: "discernment",
    letter: "D3",
    title: "Discernment",
    prompt: "Trust nothing blindly.",
    body: "Judge every output. Check facts, names, and numbers. If it would not go in a brief with your name on it, send it back.",
  },
  {
    id: "diligence",
    letter: "D4",
    title: "Diligence",
    prompt: "Protect people and data.",
    body: "Use AI responsibly with our research, partners, and communities. No sensitive data, no shortcuts around consent.",
  },
] as const;

export const journeyStages: {
  id: JourneyStageId;
  title: string;
  detail: string;
}[] = [
  {
    id: "kickoff",
    title: "Kickoff",
    detail: "Why this class, why now, and how we will learn together.",
  },
  {
    id: "foundations",
    title: "Foundations",
    detail: "Accounts, Claude 101, and the 4D fluency frame.",
  },
  {
    id: "hands-on",
    title: "Hands-on with AI experts",
    detail: "Practice with guidance — prompts, review, and real drafts.",
  },
  {
    id: "applied",
    title: "Applied to RLRI",
    detail: "Bring it into briefs, blogs, fieldwork notes, and partner work.",
  },
];

/** Current cohort stage — update when the team moves on. */
export const currentJourneyStage: JourneyStageId = "foundations";

export const courses: Course[] = [
  {
    id: "claude-account",
    title: "Create a free Claude account",
    duration: "10 min",
    blurb: "Get set up so you can practice alongside the rest of the cohort.",
    href: "https://claude.ai",
    badge: "Account ready",
  },
  {
    id: "claude-101",
    title: "Claude 101",
    duration: "~1 hr",
    blurb: "A friendly tour of chatting, iterating, and getting useful work out of Claude.",
    href: "https://anthropic.skilljar.com",
    badge: "Claude 101",
  },
  {
    id: "fluency-foundations",
    title: "AI Fluency: Framework & Foundations",
    duration: "Self-paced",
    blurb: "The 4Ds — Delegation, Description, Discernment, Diligence — as a daily habit.",
    href: "https://anthropic.skilljar.com/ai-fluency-framework-foundations",
    badge: "4D fluent",
  },
  {
    id: "fluency-nonprofits",
    title: "AI Fluency for Nonprofits",
    duration: "Self-paced",
    blurb: "How mission-driven teams use AI without losing voice, care, or accountability.",
    href: "https://anthropic.skilljar.com/ai-fluency-for-nonprofits",
    badge: "Nonprofit fluent",
  },
];
