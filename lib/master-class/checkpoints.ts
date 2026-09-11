/**
 * Checkpoint quizzes — one per course, five questions each.
 *
 * `docs/checkpoint-questions.docx` was not in the repo, so these are
 * editable placeholders. Swap prompt / options / answer / explanation anytime.
 * `answer` is the 0-based index of the correct option.
 */
import type { Checkpoint } from "./types";

export const checkpoints: Checkpoint[] = [
  {
    courseId: "claude-account",
    title: "Checkpoint · Account & first steps",
    intro: "A quick pulse check on getting set up without putting RLRI data at risk.",
    questions: [
      {
        id: "ca-1",
        prompt: "Where should you create your Claude account for this class?",
        options: [
          "claude.ai",
          "A random third-party “Claude login” page from a search ad",
          "By sharing a teammate’s password",
          "Only through a browser extension that asks for your inbox",
        ],
        answer: 0,
        explanation:
          "Use Anthropic’s own site, claude.ai. Never enter credentials on look-alike pages, and never share logins.",
      },
      {
        id: "ca-2",
        prompt: "For institute work, which email is the better default?",
        options: [
          "A personal email you also use for shopping and newsletters",
          "A shared office inbox that everyone can open",
          "Your RLRI / work email, so access stays with the institute",
          "A throwaway address you will forget next month",
        ],
        answer: 2,
        explanation:
          "A work email keeps the account tied to your role and makes it easier to recover or retire access if you change seats.",
      },
      {
        id: "ca-3",
        prompt: "Which of these should never go into Claude?",
        options: [
          "A public blog you already published",
          "Passwords, unpublished community data, or identifying field notes without clearance",
          "A draft outline you wrote and are happy to iterate on",
          "A question about how to structure a literature scan",
        ],
        answer: 1,
        explanation:
          "Diligence first: secrets, personal data, and uncleared community material stay out of the chat. When in doubt, ask a colleague before pasting.",
      },
      {
        id: "ca-4",
        prompt: "Claude is built by which organisation?",
        options: [
          "OpenAI",
          "Google",
          "Anthropic",
          "Meta",
        ],
        answer: 2,
        explanation:
          "Claude is Anthropic’s assistant. Knowing the vendor helps you find the right docs, courses, and data-use terms.",
      },
      {
        id: "ca-5",
        prompt: "After you create the account, what is a good first move?",
        options: [
          "Paste an entire unpublished dataset “to see what happens”",
          "Turn off your own judgment and accept every answer",
          "Skim the usage guidance, then try a low-stakes prompt (e.g. outline a public blog)",
          "Invite a vendor to use the same login",
        ],
        answer: 2,
        explanation:
          "Start small and public. Learn the tool on work you could already share, then scale up with the 4Ds.",
      },
    ],
  },
  {
    courseId: "claude-101",
    title: "Checkpoint · Claude 101",
    intro: "How we talk to Claude so the output is actually usable.",
    questions: [
      {
        id: "c101-1",
        prompt: "What is a prompt, in practice?",
        options: [
          "The hidden settings Anthropic uses to train the model",
          "The instructions, context, and examples you give Claude for a task",
          "A legal contract that Claude must sign",
          "A score Claude gives your writing",
        ],
        answer: 1,
        explanation:
          "A prompt is your brief. The clearer the brief, the less you will wrestle with the draft.",
      },
      {
        id: "c101-2",
        prompt: "You need a two-page policy note in RLRI’s calm, evidence-led voice. What should you do first?",
        options: [
          "Type “write a policy note” and hope",
          "Give audience, length, tone, sources you trust, and what to avoid",
          "Paste confidential interview transcripts in full",
          "Ask Claude to invent citations so it looks finished",
        ],
        answer: 1,
        explanation:
          "Description: context, format, and tone up front. Claude cannot guess our house style or our red lines.",
      },
      {
        id: "c101-3",
        prompt: "Claude returns a confident statistic you have never seen. You should:",
        options: [
          "Publish it — confident tone means it is verified",
          "Change the number slightly so it looks original",
          "Treat it as a lead, then verify against a source you trust (or cut it)",
          "Ask Claude to make the number larger for impact",
        ],
        answer: 2,
        explanation:
          "Discernment: fluency is not a footnote. If you cannot source it, it does not ship.",
      },
      {
        id: "c101-4",
        prompt: "Which statement is true?",
        options: [
          "Claude can be fluent and still be wrong",
          "Claude never fabricates names or papers",
          "One good prompt means you never need to iterate",
          "Longer prompts are always better, even if they ramble",
        ],
        answer: 0,
        explanation:
          "Fluency is not truth. Iterate, check, and keep a human on the byline.",
      },
      {
        id: "c101-5",
        prompt: "A useful way to work with Claude on a long task is to:",
        options: [
          "Ask for the entire 40-page report in one shot, once",
          "Break the work into steps, review each step, then continue",
          "Disable your outline and let the model choose the structure",
          "Feed it every email in the office thread “for context”",
        ],
        answer: 1,
        explanation:
          "Chunk the work. Review as you go. That is delegation with a human still holding the map.",
      },
    ],
  },
  {
    courseId: "fluency-foundations",
    title: "Checkpoint · Framework & Foundations",
    intro: "The 4Ds are the spine of this class. Let’s make sure they stick.",
    questions: [
      {
        id: "ff-1",
        prompt: "The 4D fluency framework is:",
        options: [
          "Data, Dashboards, Deployment, DevOps",
          "Delegation, Description, Discernment, Diligence",
          "Draft, Duplicate, Delete, Deploy",
          "Design, Develop, Debug, Deliver",
        ],
        answer: 1,
        explanation:
          "Delegation, Description, Discernment, Diligence — decide, ask, judge, and protect.",
      },
      {
        id: "ff-2",
        prompt: "Delegation, at RLRI, mostly means:",
        options: [
          "Letting Claude send emails under your name with no review",
          "Choosing which parts of a task AI can draft, and which stay human",
          "Outsourcing community consent to the model",
          "Using AI only for slide colours",
        ],
        answer: 1,
        explanation:
          "You still own the call. AI can draft, cluster, or suggest; people decide what is fair, true, and fit to share.",
      },
      {
        id: "ff-3",
        prompt: "Strong Description usually includes:",
        options: [
          "Context, desired format, tone, and constraints",
          "Only the word “please”",
          "A threat that you will switch tools",
          "The entire contents of a private drive",
        ],
        answer: 0,
        explanation:
          "Tell Claude who it is for, how long, how it should sound, and what not to do. Constraints are a gift.",
      },
      {
        id: "ff-4",
        prompt: "Discernment is the habit of:",
        options: [
          "Accepting the first draft to save time",
          "Judging quality, accuracy, and fit before anything leaves your desk",
          "Asking Claude to grade its own honesty and stopping there",
          "Publishing faster than peer organisations",
        ],
        answer: 1,
        explanation:
          "Every output gets a human pass. Trust is earned in review, not in the chat window.",
      },
      {
        id: "ff-5",
        prompt: "Diligence is closest to which practice?",
        options: [
          "Using AI in ways that respect data, people, and our duty of care",
          "Running every personal errand through Claude",
          "Hiding that AI helped, even when a partner asks",
          "Pasting donor bank details to “draft a thank-you”",
        ],
        answer: 0,
        explanation:
          "Diligence is responsible use: privacy, consent, honesty about methods, and care for the communities in our work.",
      },
    ],
  },
  {
    courseId: "fluency-nonprofits",
    title: "Checkpoint · AI Fluency for Nonprofits",
    intro: "Same 4Ds, applied to mission-driven work like ours.",
    questions: [
      {
        id: "np-1",
        prompt: "A field partner shares a story that includes a minor’s full name. You want help shaping a public blog. You should:",
        options: [
          "Paste the original notes so Claude “has the real texture”",
          "Strip identifiers first, follow consent rules, then ask for structural help",
          "Ask Claude to invent a more dramatic version",
          "Publish the raw notes because authenticity matters most",
        ],
        answer: 1,
        explanation:
          "People before prompts. Anonymise, honour consent, then use AI on what is safe to process.",
      },
      {
        id: "np-2",
        prompt: "Claude drafts a paragraph in a community’s “voice.” What is the risk?",
        options: [
          "There is no risk if the grammar is good",
          "It can flatten or invent a voice that is not theirs — humans still hold the relationship",
          "The only risk is that the paragraph is too short",
          "Claude automatically obtained consent by writing it",
        ],
        answer: 1,
        explanation:
          "AI should not replace community voice. Use it to organise or copy-edit, not to speak for people you have not sat with.",
      },
      {
        id: "np-3",
        prompt: "When is a human-in-the-loop non-negotiable?",
        options: [
          "Never — that slows the team down",
          "Only for social-media captions",
          "Whenever the work could affect people’s safety, dignity, funding, or public claims",
          "Only if the CEO is in the thread",
        ],
        answer: 2,
        explanation:
          "High-stakes outputs (policy claims, personal stories, money, safety) always get a named human review.",
      },
      {
        id: "np-4",
        prompt: "A good nonprofit use of Claude is:",
        options: [
          "Generating fake beneficiary quotes for a donor deck",
          "Turning your own bullet points into a first-draft agenda you will edit",
          "Deciding who in a community is “deserving” of support",
          "Auto-replying to trauma disclosures without a person reading them",
        ],
        answer: 1,
        explanation:
          "Let Claude accelerate drafting from material you already stand behind. Do not outsource ethics, quotes, or care.",
      },
      {
        id: "np-5",
        prompt: "How should we talk about AI help in RLRI work?",
        options: [
          "Hide it so the work looks fully handmade",
          "Be able to explain, internally, where AI assisted and where a human decided",
          "Credit Claude as a co-author on every blog",
          "Only mention AI if the output was perfect",
        ],
        answer: 1,
        explanation:
          "We do not need a disclaimer on every paragraph, but we should be honest with ourselves and, when asked, with partners: AI assisted, humans accountable.",
      },
    ],
  },
];

export const questionsArePlaceholders = true;
