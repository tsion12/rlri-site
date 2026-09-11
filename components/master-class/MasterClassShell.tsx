import Link from "next/link";
import { ThemeToggle } from "@/components/ThemeToggle";
import { AfricaProgramLogo } from "@/components/africa/AfricaProgramLogo";
import { africaRoutes } from "@/lib/africa-routes";

export function MasterClassShell({ children }: { children: React.ReactNode }) {
  return (
    <div className="africa-theme flex min-h-full flex-col bg-[#f7faf9] bg-[radial-gradient(ellipse_120%_80%_at_50%_-20%,rgba(20,184,166,0.09),transparent_55%)] text-[#1c1917] dark:bg-zinc-950 dark:bg-none dark:text-zinc-100">
      <a
        href="#master-class-main"
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-60 focus:rounded-lg focus:bg-white focus:px-3 focus:py-2 focus:text-sm focus:font-semibold focus:text-teal-800 focus:shadow-lg dark:focus:bg-zinc-900 dark:focus:text-teal-200"
      >
        Skip to content
      </a>
      <header className="sticky top-0 z-50 border-b border-zinc-200/60 bg-white/80 backdrop-blur-xl dark:border-zinc-800/80 dark:bg-zinc-950/85">
        <div className="mx-auto flex min-h-14 max-w-6xl items-center justify-between gap-3 px-4 py-2 sm:px-6">
          <div className="flex min-w-0 items-center gap-3">
            <AfricaProgramLogo variant="footer" />
            <span className="hidden rounded-full border border-teal-200/80 bg-teal-50 px-2.5 py-0.5 text-[10px] font-semibold uppercase tracking-[0.16em] text-teal-800 sm:inline-flex dark:border-teal-800/60 dark:bg-teal-950/70 dark:text-teal-200">
              Internal
            </span>
          </div>
          <div className="flex items-center gap-2">
            <Link
              href={africaRoutes.home}
              className="rounded-lg px-3 py-2 text-sm font-medium text-zinc-600 transition hover:bg-zinc-100 hover:text-zinc-900 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal-500/40 dark:text-zinc-400 dark:hover:bg-zinc-800 dark:hover:text-zinc-100"
            >
              Back to site
            </Link>
            <ThemeToggle />
          </div>
        </div>
      </header>
      <main id="master-class-main" className="flex-1">
        {children}
      </main>
      <footer className="border-t border-zinc-200/70 px-4 py-6 text-center text-xs text-zinc-500 dark:border-zinc-800 dark:text-zinc-500">
        RLRI internal learning hub · not listed in public navigation · please don’t share the link widely
      </footer>
    </div>
  );
}
