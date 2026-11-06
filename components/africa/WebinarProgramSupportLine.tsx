import Link from "next/link";
import type { WebinarProgramOrdinal } from "@/lib/africa-events";
import { PROGRAM_META } from "@/lib/africa-program-meta";

const linkClass =
  "font-medium text-teal-800 underline underline-offset-2 transition hover:text-teal-600 dark:text-teal-300 dark:hover:text-teal-200";

type Props = {
  program: WebinarProgramOrdinal;
  className?: string;
};

/**
 * Standard attribution line linking a webinar to its supporting program on /africa/programs.
 */
export function WebinarProgramSupportLine({ program, className = "" }: Props) {
  const { href, name } = PROGRAM_META[program];
  return (
    <p className={`text-sm leading-relaxed text-zinc-600 dark:text-zinc-400 ${className}`.trim()}>
      This webinar is supported by the{" "}
      <Link href={href} className={linkClass}>
        {name}
      </Link>
      .
    </p>
  );
}
