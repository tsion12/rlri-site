import { masterClassMeta } from "@/lib/master-class/content";

export function PasscodeGate({ error }: { error?: boolean }) {
  return (
    <div className="mx-auto flex min-h-[calc(100dvh-8rem)] max-w-md flex-col justify-center px-4 py-8">
      <div className="rounded-3xl border border-zinc-200/80 bg-white/90 p-8 shadow-sm dark:border-zinc-800/80 dark:bg-zinc-900/55 sm:p-10">
        <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-teal-700 dark:text-teal-400">
          Staff only
        </p>
        <h1 className="mt-3 text-2xl font-semibold tracking-tight text-zinc-900 dark:text-zinc-50">
          {masterClassMeta.title}
        </h1>
        <p className="mt-3 text-sm leading-relaxed text-zinc-600 dark:text-zinc-400">
          This hub is for the RLRI cohort. Enter the shared passcode from the kickoff note to come in.
        </p>
        <form className="mt-8 space-y-4" action="/api/internal/master-class/unlock" method="post">
          <div>
            <label htmlFor="master-class-passcode" className="text-sm font-medium text-zinc-800 dark:text-zinc-200">
              Passcode
            </label>
            <input
              id="master-class-passcode"
              name="passcode"
              type="password"
              autoComplete="off"
              required
              className="mt-1.5 w-full rounded-xl border border-zinc-300 bg-white px-3 py-2.5 text-zinc-900 shadow-sm outline-none ring-teal-500/30 focus:border-teal-500 focus:ring-2 dark:border-zinc-700 dark:bg-zinc-950 dark:text-zinc-100"
            />
          </div>
          {error ? (
            <p className="text-sm text-rose-700 dark:text-rose-300" role="alert">
              That passcode doesn’t match. Try again?
            </p>
          ) : null}
          <button
            type="submit"
            className="inline-flex min-h-11 w-full items-center justify-center rounded-xl bg-teal-700 px-4 text-sm font-semibold text-white shadow-sm transition hover:bg-teal-600 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal-500/50"
          >
            Enter the classroom
          </button>
        </form>
      </div>
    </div>
  );
}
