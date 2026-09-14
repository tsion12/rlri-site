/**
 * Hub copy, 4D cards, journey, and courses — edit here.
 *
 * Preview: npm run dev → http://localhost:3000/internal/ai-master-class
 * Passcode: MASTER_CLASS_PASSCODE in .env.local, or `rlri-learn` if unset.
 * Quizzes: ./checkpoints.ts   Team/offices: ./team.ts
 */
import type { Course, JourneyStageId } from "./types";

export const masterClassMeta = {
  title: "Ethical AI · Claude Master Class",
  kicker: "Internal learning hub",
  mission:
    "Four courses, a short quiz after each one, and a list of what’s still on your plate. Use Claude on real RLRI work — and check every output before it leaves your desk.",
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
    detail: "Why we are doing this, and how to use the hub.",
  },
  {
    id: "foundations",
    title: "Foundations",
    detail: "Create an account, finish Claude 101, and learn the 4Ds.",
  },
  {
    id: "hands-on",
    title: "Hands-on with AI experts",
    detail: "Practice prompts on real drafts, with a human reviewing the output.",
  },
  {
    id: "applied",
    title: "Applied to RLRI",
    detail: "Use Claude on briefs, blogs, and partner work — then check every claim."
  },
];

/** Current cohort stage — update when the team moves on. */
export const currentJourneyStage: JourneyStageId = "foundations";

export const courses: Course[] = [
  {
    id: "claude-account",
    title: "Create a free Claude account",
    duration: "10 min",
    blurb: "Sign up at claude.ai with your work email, then come back and tick this off.",
    href: "https://claude.ai",
    badge: "Account ready",
  },
  {
    id: "claude-101",
    title: "Claude 101",
    duration: "~1 hr",
    blurb: "Watch the intro, try a few prompts, then mark it complete.",
    href: "https://anthropic.skilljar.com",
    badge: "Claude 101",
  },
  {
    id: "fluency-foundations",
    title: "AI Fluency: Framework & Foundations",
    duration: "Self-paced",
    blurb: "Learn the 4Ds, then use them on the next brief you write.",
    href: "https://anthropic.skilljar.com/ai-fluency-framework-foundations",
    badge: "4D fluent",
  },
  {
    id: "fluency-nonprofits",
    title: "AI Fluency for Nonprofits",
    duration: "Self-paced",
    blurb: "How we use AI in nonprofit work without putting people or data at risk.",
    href: "https://anthropic.skilljar.com/ai-fluency-for-nonprofits",
    badge: "Nonprofit fluent",
  },
];
