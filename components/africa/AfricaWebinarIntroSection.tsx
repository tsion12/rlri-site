import { AfricaVideoEmbed } from "@/components/africa/AfricaVideoEmbed";
import { africaVideos } from "@/lib/africa-media";

export function AfricaWebinarIntroSection() {
  return (
    <section
      id="how-webinars-work"
      className="border-b border-zinc-200/80 bg-white py-16 dark:border-zinc-800 dark:bg-zinc-950 sm:py-20 lg:py-24"
      aria-labelledby="webinar-intro-heading"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid items-start gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.1fr)] lg:gap-12">
          <div>
            <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-teal-700 dark:text-teal-400">
              Webinar series
            </p>
            <h2
              id="webinar-intro-heading"
              className="mt-3 text-3xl font-semibold tracking-tight text-zinc-900 dark:text-zinc-50 sm:text-4xl"
            >
              How our webinars work
            </h2>
            <p className="mt-4 max-w-xl text-lg leading-relaxed text-zinc-600 dark:text-zinc-400">
              Every webinar follows the same simple rhythm so you always know what to expect — whether
              you are planning to join a live conversation or catching up on one that has already happened.
            </p>
            <ol className="mt-6 space-y-5">
              <li className="flex gap-4">
                <span className="mt-0.5 flex size-7 shrink-0 items-center justify-center rounded-full bg-teal-700 text-xs font-semibold text-white dark:bg-teal-600">
                  1
                </span>
                <div>
                  <p className="text-sm font-semibold text-zinc-900 dark:text-zinc-100">Before — register</p>
                  <p className="mt-1 text-sm leading-relaxed text-zinc-600 dark:text-zinc-400">
                    Upcoming sessions are announced here with their topic, speakers, and time zones. Register
                    ahead of the date and we will send you the joining link.
                  </p>
                </div>
              </li>
              <li className="flex gap-4">
                <span className="mt-0.5 flex size-7 shrink-0 items-center justify-center rounded-full bg-teal-700 text-xs font-semibold text-white dark:bg-teal-600">
                  2
                </span>
                <div>
                  <p className="text-sm font-semibold text-zinc-900 dark:text-zinc-100">During — join live</p>
                  <p className="mt-1 text-sm leading-relaxed text-zinc-600 dark:text-zinc-400">
                    Hear directly from researchers and practitioners, take part in the Q&amp;A, and pick up
                    resources shared by speakers during the session.
                  </p>
                </div>
              </li>
              <li className="flex gap-4">
                <span className="mt-0.5 flex size-7 shrink-0 items-center justify-center rounded-full bg-teal-700 text-xs font-semibold text-white dark:bg-teal-600">
                  3
                </span>
                <div>
                  <p className="text-sm font-semibold text-zinc-900 dark:text-zinc-100">After — revisit</p>
                  <p className="mt-1 text-sm leading-relaxed text-zinc-600 dark:text-zinc-400">
                    Missed it? Every past event keeps its recording and, where available, a related policy
                    brief so the discussion stays accessible long after the live date.
                  </p>
                </div>
              </li>
            </ol>
          </div>
          <AfricaVideoEmbed
            src={africaVideos.webinarIntro}
            title="Introduction to RLRI Africa Program webinars"
            caption="A short overview of how we schedule, host, and follow up on our webinar series."
          />
        </div>
      </div>
    </section>
  );
}
