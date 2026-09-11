import type { MasterClassLearner } from "./types";

export const masterClassLearners: MasterClassLearner[] = [
  {
    id: "ernest",
    name: "Ernest Lequimboh",
    initials: "EL",
    office: "Canada",
    role: "Senior Policy Advisor",
    seedCompletion: 0.75,
  },
  {
    id: "tsion",
    name: "Tsion Mengistu Ademe",
    initials: "TM",
    office: "Ethiopia",
    role: "Research and Data Analyst Fellow",
    seedCompletion: 0.5,
  },
  {
    id: "chris",
    name: "Chris Begealawuh",
    initials: "CB",
    office: "Canada",
    role: "Research Affiliate",
    seedCompletion: 0.62,
  },
  {
    id: "achai",
    name: "Achai Kuol Deng",
    initials: "AK",
    office: "Canada",
    role: "Administrative and Finance Assistant",
    seedCompletion: 0.25,
  },
  {
    id: "richard",
    name: "Richard Nyiawung",
    initials: "RN",
    office: "Canada",
    role: "Research Affiliate",
    seedCompletion: 0.38,
  },
  {
    id: "roselyn",
    name: "Roselyn Ruvimbo Kwaramba",
    initials: "RK",
    office: "Zimbabwe",
    role: "Research Fellow",
    seedCompletion: 0.5,
  },
  {
    id: "wisdom",
    name: "Wisdom Tokame",
    initials: "WT",
    office: "Ghana",
    role: "Research Associate",
    seedCompletion: 0.12,
  },
  {
    id: "nfor",
    name: "Nfor Christelle Mugha",
    initials: "NM",
    office: "Cameroon",
    role: "Project Assistant",
    seedCompletion: 0.25,
  },
];

export const seededShowAndTell: { learnerId: string; text: string }[] = [
  {
    learnerId: "ernest",
    text: "A 4D checklist I now paste at the top of every policy prompt, so Claude knows what must stay human.",
  },
  {
    learnerId: "tsion",
    text: "A briefing-note outline for a Digital Futures blog — structure in minutes, then I rewrite in our voice.",
  },
  {
    learnerId: "wisdom",
    text: "A first-pass summary of a Ghana peacebuilding interview transcript, which I then verified line by line.",
  },
];
