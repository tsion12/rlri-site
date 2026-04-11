import Link from "next/link";
import { blogPostPath, stripHtml, type WpPageHighlight, type WpPostWithSource } from "@/lib/wp";
import { africaRoutes } from "@/lib/africa-routes";
import { au } from "./africa-ui";


type Props = {
  featuredPost?: WpPostWithSource | null;
  upcomingEvent?: WpPageHighlight | null;
};

export function AfricaHero({ featuredPost, upcomingEvent }: Props) {
  /** Prioritize events in the hero spotlight when we have any event content. */
  const prioritizeEvent = Boolean(upcomingEvent);
  const featuredPostTitle = featuredPost ? stripHtml(featuredPost.title.rendered) : null;

  const featuredAnnouncementTitle = prioritizeEvent
    ? upcomingEvent?.title ?? "Upcoming webinar and event updates"
    : "Upcoming webinar and event updates";
  const featuredAnnouncementText = prioritizeEvent
    ? upcomingEvent?.excerpt
      ? trimText(upcomingEvent.excerpt, 185)
      : "Webinars and events are highlighted first in the hero so visitors can quickly find what is happening next."
    : "See the latest webinar announcements, registration links, and event details from the Africa Program.";
  const featuredAnnouncementMeta = prioritizeEvent
    ? upcomingEvent?.eventDateISO
      ? `Date and time · ${formatDate(upcomingEvent.eventDateISO)}`
      : upcomingEvent
        ? `Updated ${formatDate(upcomingEvent.modified)}`
        : "Live schedule"
    : "Live schedule";
  const bulletinTitle = prioritizeEvent
    ? featuredPostTitle ?? "Fresh research and commentary from the Africa journal"
    : featuredPostTitle ?? "Latest Insights";
  const bulletinText = prioritizeEvent
    ? featuredPost
      ? "Browse the newest article while keeping upcoming webinars and events front and center."
      : "No recent article is available right now. Visit the journal for the full archive."
    : featuredPost
      ? "A new post is live now. Open the latest article directly from the hero."
      : "Follow the newest research notes, commentary, and institute updates as they are published.";

  return (
    <section className={au.hero.section} aria-labelledby="africa-hero-heading">
      <div className="pointer-events-none absolute inset-0" aria-hidden>
        <div className="absolute inset-0 bg-[url('/assets/map.jpg')] bg-center bg-cover bg-no-repeat opacity-40 dark:opacity-48" />
        <div className="absolute inset-0 bg-linear-to-r from-black/62 via-black/52 to-black/38 dark:from-black/72 dark:via-black/62 dark:to-black/45" />
      </div>
      <div className={au.hero.overlay} aria-hidden />
      <div className={au.hero.texture} aria-hidden />
      <div className={`${au.hero.inner} relative z-10`}>
        <div className={au.hero.gridLayout}>
          <div className={au.hero.colCopy}>
            <p className={au.hero.eyebrow}>
              <span className="inline-block h-1.5 w-1.5 bg-emerald-700 dark:bg-emerald-500" />
              Africa Program
            </p>
            <h1 id="africa-hero-heading" className={au.hero.headline}>
              Advancing African-led solutions for sustainable futures
            </h1>
            <p className={au.hero.body}>
              The Real Life Research Institute – Africa Program accelerates actionable research and connects
              African knowledge, policy, and practice to deliver evidence-based solutions with global impact.
            </p>
            <div className={au.hero.statRow}>
              <span className={au.hero.statChip}>
                Research-driven
              </span>
              <span className={au.hero.statChip}>
                Policy-oriented
              </span>
              <span className={au.hero.statChip}>
                Implementation-focused
              </span>
            </div>
            <div className={au.hero.ctaRow}>
              <Link href={africaRoutes.programs} className={au.hero.primaryCta}>
                Explore programs
              </Link>
              <a
                href={africaRoutes.canadianProgram}
                className={au.hero.secondaryCta}
                target="_blank"
                rel="noopener noreferrer"
              >
                Explore our Canadian program
              </a>
            </div>
          </div>

          <aside className={au.hero.colAside} aria-label="Featured institute announcements">
            <article className="border border-zinc-300 bg-white p-6 dark:border-zinc-700 dark:bg-zinc-900">
              <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-zinc-600 dark:text-zinc-400">
                Featured announcement
              </p>
              <h2 className="mt-3 font-serif text-2xl leading-tight text-zinc-900 dark:text-zinc-100">
                {featuredAnnouncementTitle}
              </h2>
              <p className="mt-3 text-sm leading-relaxed text-zinc-700 dark:text-zinc-300">
                {featuredAnnouncementText}
              </p>
              <div className="mt-4 border-t border-zinc-200 pt-3 text-xs font-medium uppercase tracking-[0.12em] text-zinc-600 dark:border-zinc-700 dark:text-zinc-400">
                {featuredAnnouncementMeta}
              </div>
              <Link href={africaRoutes.events} className="mt-5 inline-flex text-sm font-semibold text-emerald-800 hover:underline dark:text-emerald-300">
                {prioritizeEvent ? "Register for event" : "Review event schedule"}
              </Link>
            </article>

            <article className="mt-4 border border-zinc-300 bg-zinc-50 p-5 dark:border-zinc-700 dark:bg-zinc-900/70">
              <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-zinc-600 dark:text-zinc-400">
                Research bulletin
              </p>
              <h3 className="mt-2 text-lg font-semibold leading-snug text-zinc-900 dark:text-zinc-100">
                {bulletinTitle}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-zinc-700 dark:text-zinc-300">
                {bulletinText}
              </p>
              <div className="mt-4 border-t border-zinc-200 pt-3 text-xs text-zinc-600 dark:border-zinc-700 dark:text-zinc-400">
                {featuredPost
                  ? `${formatDate(featuredPost.date)} · ${featuredPost.source === "africa" ? "Africa Program" : "Main Institute"}`
                  : "Live from the journal"}
              </div>
              <Link
                href={featuredPost ? blogPostPath(featuredPost) : "/blog"}
                className="mt-4 inline-flex text-sm font-semibold text-emerald-800 hover:underline dark:text-emerald-300"
              >
                Read latest publication
              </Link>
            </article>
          </aside>
        </div>
      </div>
    </section>
  );
}

function formatDate(value: string) {
  return new Intl.DateTimeFormat("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  }).format(new Date(value));
}

function trimText(text: string, limit: number) {
  return text.length > limit ? `${text.slice(0, limit - 1).trimEnd()}…` : text;
}

