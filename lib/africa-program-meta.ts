import { programsAnchor } from "@/lib/africa-routes";
import type { WebinarProgramOrdinal } from "@/lib/africa-events";

/**
 * Single source of truth for the research program teams that support webinars.
 * Used by the attribution line, the events filter, and the calendar dots so the
 * names and colours never drift between them.
 */
export type ProgramMeta = {
  /** Full team name, as shown in the attribution line. */
  name: string;
  /** Short label for the filter dropdown and calendar legend. */
  shortName: string;
  /** Link to the program on /africa/programs. */
  href: string;
  /** Solid dot colour for calendar markers (distinct per program). */
  dotClass: string;
  /** Chip styling for the active filter state. */
  chipClass: string;
};

export const PROGRAM_META: Record<WebinarProgramOrdinal, ProgramMeta> = {
  "01": {
    name: "Oceans Team",
    shortName: "Oceans",
    href: programsAnchor("01"),
    dotClass: "bg-sky-500",
    chipClass: "bg-sky-100 text-sky-800 dark:bg-sky-500/15 dark:text-sky-300",
  },
  "02": {
    name: "Digital Futures Team",
    shortName: "Digital Futures",
    href: programsAnchor("02"),
    dotClass: "bg-violet-500",
    chipClass: "bg-violet-100 text-violet-800 dark:bg-violet-500/15 dark:text-violet-300",
  },
  "03": {
    name: "Climate Adaptation & Resilience Team",
    shortName: "Climate Adaptation",
    href: programsAnchor("03"),
    dotClass: "bg-emerald-500",
    chipClass: "bg-emerald-100 text-emerald-800 dark:bg-emerald-500/15 dark:text-emerald-300",
  },
  "04": {
    name: "Peacebuilding & Inclusive Dialogues Team",
    shortName: "Peacebuilding",
    href: programsAnchor("04"),
    dotClass: "bg-amber-500",
    chipClass: "bg-amber-100 text-amber-800 dark:bg-amber-500/15 dark:text-amber-300",
  },
  "05": {
    name: "Health Systems, Equity, and Social Transformation Team",
    shortName: "Health Systems",
    href: programsAnchor("05"),
    dotClass: "bg-rose-500",
    chipClass: "bg-rose-100 text-rose-800 dark:bg-rose-500/15 dark:text-rose-300",
  },
};

export const PROGRAM_ORDINALS: WebinarProgramOrdinal[] = ["01", "02", "03", "04", "05"];
