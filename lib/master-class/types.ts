export const MASTER_CLASS_OFFICES = [
  "Ethiopia",
  "Zimbabwe",
  "Ghana",
  "Cameroon",
  "Canada",
] as const;

export type MasterClassOffice = (typeof MASTER_CLASS_OFFICES)[number];

export type MasterClassLearner = {
  id: string;
  name: string;
  initials: string;
  office: MasterClassOffice;
  role: string;
  /** Seeded 0–1 completion so the board looks inhabited before anyone plays. */
  seedCompletion: number;
};

export type JourneyStageId = "kickoff" | "foundations" | "hands-on" | "applied";

export type CourseId =
  | "claude-account"
  | "claude-101"
  | "fluency-foundations"
  | "fluency-nonprofits";

export type Course = {
  id: CourseId;
  title: string;
  duration: string;
  blurb: string;
  href: string;
  badge: string;
};

export type CheckpointQuestion = {
  id: string;
  prompt: string;
  options: [string, string, string, string];
  /** 0-based index into `options` */
  answer: 0 | 1 | 2 | 3;
  explanation: string;
};

export type Checkpoint = {
  courseId: CourseId;
  title: string;
  intro: string;
  questions: CheckpointQuestion[];
};

export type LearnerProgress = {
  completedCourseIds: CourseId[];
  passedQuizIds: CourseId[];
  bestQuizScores: Partial<Record<CourseId, number>>;
  showAndTell: string | null;
};

export type MasterClassStore = {
  learnerId: string | null;
  byLearner: Record<string, LearnerProgress>;
};
