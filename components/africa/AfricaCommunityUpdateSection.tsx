import Link from "next/link";
import { AfricaVideoEmbed } from "@/components/africa/AfricaVideoEmbed";
import { au } from "@/components/africa/africa-ui";
import { africaRoutes } from "@/lib/africa-routes";
import { africaVideos } from "@/lib/africa-media";

export function AfricaCommunityUpdateSection() {
  return (
    <section
      className={`${au.home.section} ${au.home.sectionMuted} ${au.home.sectionPad}`}
      aria-labelledby="africa-community-update-heading"
    >
      <div className="grid items-start gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.15fr)] lg:gap-12">
          <div>
            <p className={au.home.eyebrow}>Community update</p>
            <h2 id="africa-community-update-heading" className={au.home.title}>
              Ebola outbreak awareness
            </h2>
            <p className={au.home.lead}>
              Practical guidance for communities and partners on staying informed, reducing risk, and
              supporting coordinated public-health responses during Ebola outbreaks.
            </p>
            <p className="mt-4 max-w-xl text-sm leading-relaxed text-zinc-600 dark:text-zinc-400">
              This video is part of RLRI Africa Programs&apos; outreach to share timely, accessible information
              alongside our research, webinars, and field engagement.
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <Link
                href={africaRoutes.eventEbolaDrc}
                className="inline-flex min-h-11 items-center justify-center rounded-lg bg-teal-700 px-5 text-sm font-semibold text-white transition hover:bg-teal-600"
              >
                June 12 webinar
              </Link>
              <Link
                href={africaRoutes.stories}
                className="inline-flex min-h-11 items-center justify-center rounded-lg border border-zinc-200 bg-white px-5 text-sm font-semibold text-zinc-800 transition hover:border-teal-700/40 hover:text-teal-800 dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-100 dark:hover:border-zinc-600"
              >
                Field stories
              </Link>
              <Link
                href={africaRoutes.events}
                className="inline-flex min-h-11 items-center justify-center rounded-lg border border-zinc-200 bg-white px-5 text-sm font-semibold text-zinc-800 transition hover:border-teal-700/40 hover:text-teal-800 dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-100 dark:hover:border-zinc-600"
              >
                All events
              </Link>
            </div>
          </div>
          <AfricaVideoEmbed
            src={africaVideos.ebolaAwareness}
            title="Ebola outbreak awareness — RLRI Africa Programs"
            caption="Recent community health awareness message from the Africa Program."
          />
      </div>
    </section>
  );
}
