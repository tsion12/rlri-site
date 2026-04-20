import Image from "next/image";
import Link from "next/link";
import type { WpPostWithSource } from "@/lib/wp";
import { blogPostPath, stripHtml } from "@/lib/wp";
import { africaRoutes } from "@/lib/africa-routes";
import { PubSubNav } from "./AfricaPublicationsNav";
import { PolicyBriefTrackingLinks } from "./PolicyBriefTrackingLinks";

function themeBadge(post: WpPostWithSource) {
  const t = post.theme?.trim();
  if (t && t.toLowerCase() !== "uncategorized") return t;
  return "Story";
}

function PublicationsLightHero({
  eyebrow,
  title,
  description,
  meta,
}: {
  eyebrow: string;
  title: string;
  description: string;
  meta?: string;
}) {
  return (
    <section className="border-b border-zinc-200/80 bg-white py-16 dark:border-zinc-800 dark:bg-zinc-950 sm:py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <p className="text-[11px] font-semibold uppercase tracking-[0.25em] text-teal-700 dark:text-teal-400">
          <Link href="/africa/publications" className="transition hover:text-teal-600">
            Publications
          </Link>
          <span className="text-zinc-400"> · </span>
          {eyebrow}
        </p>
        <h1 className="mt-4 text-4xl font-semibold tracking-tight text-zinc-900 dark:text-zinc-50 sm:text-5xl">{title}</h1>
        <p className="mt-5 max-w-3xl text-lg leading-relaxed text-zinc-600 dark:text-zinc-400">{description}</p>
        {meta ? <p className="mt-4 text-sm text-zinc-600 dark:text-zinc-400">{meta}</p> : null}
      </div>
    </section>
  );
}

function StoryCard({ post }: { post: WpPostWithSource }) {
  const excerpt = post.excerpt ? stripHtml(post.excerpt.rendered).slice(0, 150).trim() : "";
  const date = new Date(post.date).toLocaleDateString("en-GB", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });

  return (
    <Link
      href={blogPostPath(post)}
      className="group flex flex-col overflow-hidden rounded-2xl border border-zinc-200/90 bg-white shadow-sm transition-colors hover:border-teal-200/80 dark:border-zinc-800 dark:bg-zinc-900/50 dark:hover:border-teal-800/40"
    >
      {post.featuredImage && (
        <div className="relative h-44 overflow-hidden">
          <Image
            src={post.featuredImage}
            alt=""
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 33vw"
          />
        </div>
      )}
      <div className="flex flex-1 flex-col p-6 sm:p-7">
        <div className="flex flex-wrap items-center gap-2">
          <span className="inline-block rounded-full border border-zinc-200/90 bg-zinc-50 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-[0.12em] text-zinc-600 dark:border-zinc-700 dark:bg-zinc-800/60 dark:text-zinc-400">
            {themeBadge(post)}
          </span>
          <span className="text-[10px] text-zinc-400 dark:text-zinc-500">{date}</span>
        </div>
        <h3
          className="mt-3 flex-1 text-sm font-semibold leading-snug text-zinc-900 transition-colors group-hover:text-teal-800 dark:text-zinc-50 dark:group-hover:text-teal-300"
        >
          {stripHtml(post.title.rendered)}
        </h3>
        {excerpt && <p className="mt-3 text-sm leading-relaxed text-zinc-600 dark:text-zinc-400">{excerpt}</p>}
        <span className="mt-5 inline-flex items-center gap-1.5 text-xs font-semibold text-teal-800 dark:text-teal-300">
          Read story
          <svg className="h-3.5 w-3.5" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M2 7h10M8 3l4 4-4 4" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </span>
      </div>
    </Link>
  );
}

export function AfricaStoriesPage({ posts }: { posts: WpPostWithSource[] }) {
  const count = posts.length;
  return (
    <>
      <PubSubNav active="stories" />
      <PublicationsLightHero
        eyebrow="Stories"
        title="Field stories"
        description="First-hand accounts and field narratives illustrating the impact of our programs and the communities we work with across Africa."
        meta={
          count > 0
            ? `${count} ${count === 1 ? "story" : "stories"} in this section`
            : undefined
        }
      />
      <section className="border-b border-zinc-200/80 bg-zinc-50/80 py-12 dark:border-zinc-800 dark:bg-zinc-950 sm:py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          {count === 0 ? (
            <div className="flex flex-col items-center py-16 text-center">
              <div className="flex h-14 w-14 items-center justify-center rounded-xl border border-zinc-200 bg-zinc-50 text-zinc-400 dark:border-zinc-700 dark:bg-zinc-800/60">
                <svg className="h-6 w-6" viewBox="0 0 20 20" fill="currentColor">
                  <path d="M9 4.804A7.968 7.968 0 0 0 5.354 8H4a2 2 0 0 0-2 2v1a2 2 0 0 0 2 2h.585A8 8 0 0 0 9 16.197V17h2v-.803A8 8 0 0 0 15.415 13H16a2 2 0 0 0 2-2v-1a2 2 0 0 0-2-2h-1.354A7.968 7.968 0 0 0 11 4.804V4H9v.804Z" />
                </svg>
              </div>
              <h3 className="mt-5 text-base font-semibold text-zinc-900 dark:text-zinc-50">No stories yet</h3>
              <p className="mt-2 max-w-sm text-sm text-zinc-600 dark:text-zinc-400">
                Stories from the field will appear here once they are published.
              </p>
              <Link
                href={africaRoutes.publications}
                className="mt-6 inline-flex min-h-11 items-center justify-center rounded-lg bg-teal-700 px-6 text-sm font-semibold text-white shadow-sm transition hover:bg-teal-600"
              >
                Publications hub
              </Link>
            </div>
          ) : (
            <>
              <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
                {posts.map((post) => (
                  <StoryCard key={`${post.source}-${post.id}`} post={post} />
                ))}
              </div>
              <div className="mt-10 text-center">
                <Link
                  href={africaRoutes.publications}
                  className="inline-flex min-h-11 items-center justify-center rounded-lg border border-zinc-200 bg-white px-6 text-sm font-semibold text-zinc-800 transition hover:border-teal-700/40 hover:text-teal-800 dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-100"
                >
                  Back to publications hub
                </Link>
              </div>
            </>
          )}
        </div>
      </section>
    </>
  );
}

export function AfricaPolicyBriefsPage() {
  const briefs = [
    {
      title:
        "IMPROVING WATER AND SANITATION SERVICE DELIVERY IN CAMEROON, ETHIOPIA, KENYA, AND ZIMBABWE: WHAT IS WORKING, WHAT ISN'T, AND WHY?",
      description:
        "Evidence-informed policy brief from RLRI Africa Program. Download the full PDF for findings and recommendations.",
      href: "https://cms-programs.reallifeinstitute.org/wp-content/uploads/2026/04/Policy-Brief-FEBRUARY-1.pdf",
      date: "April 2026",
      format: "PDF",
    },
  ] as const;

  const topics = [
    "Climate adaptation",
    "Ocean governance",
    "Digital rights",
    "Peacebuilding",
    "Gender equality",
    "Food security",
  ] as const;

  return (
    <>
      <PubSubNav active="policy-briefs" />
      <PublicationsLightHero
        eyebrow="Policy"
        title="Policy briefs"
        description="Concise, evidence-based analyses of critical issues designed to inform policy decisions and practical change."
        meta={`${briefs.length} brief${briefs.length !== 1 ? "s" : ""} currently available.`}
      />
      <section className="border-b border-zinc-200/80 bg-zinc-50/80 py-12 dark:border-zinc-800 dark:bg-zinc-950 sm:py-16 lg:py-20">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <div className="space-y-4">
            {briefs.map((brief) => (
              <article
                key={brief.title}
                className="rounded-2xl border border-zinc-200/90 bg-white p-6 shadow-sm dark:border-zinc-800 dark:bg-zinc-900/50 sm:p-7"
              >
                <div className="flex flex-wrap items-center gap-2">
                  <span className="rounded-full border border-zinc-200/90 bg-zinc-50 px-2.5 py-0.5 text-[10px] font-semibold uppercase tracking-[0.12em] text-zinc-600 dark:border-zinc-700 dark:bg-zinc-800/60 dark:text-zinc-400">
                    {brief.format}
                  </span>
                  <span className="text-xs text-zinc-500 dark:text-zinc-400">{brief.date}</span>
                </div>
                <h2 className="mt-3 text-xl font-semibold tracking-tight text-zinc-900 dark:text-zinc-50">
                  {brief.title}
                </h2>
                <p className="mt-2 text-sm leading-relaxed text-zinc-600 dark:text-zinc-400">{brief.description}</p>
                <PolicyBriefTrackingLinks href={brief.href} briefTitle={brief.title} />
              </article>
            ))}
          </div>

          <div className="mt-8 flex flex-wrap items-center gap-2">
            {topics.map((topic) => (
              <span
                key={topic}
                className="rounded-full border border-zinc-200/90 bg-white px-3 py-1 text-[11px] font-medium text-zinc-600 shadow-sm dark:border-zinc-700 dark:bg-zinc-900/50 dark:text-zinc-400"
              >
                {topic}
              </span>
            ))}
          </div>
          <div className="mt-10 flex flex-wrap items-center gap-3">
            <Link
              href={africaRoutes.publications}
              className="inline-flex min-h-11 items-center justify-center rounded-lg bg-teal-700 px-6 text-sm font-semibold text-white shadow-sm transition hover:bg-teal-600"
            >
              Publications hub
            </Link>
            <Link
              href="/africa/publications/blogs"
              className="inline-flex min-h-11 items-center justify-center rounded-lg border border-zinc-200 bg-white px-6 text-sm font-semibold text-zinc-800 transition hover:border-teal-700/40 dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-100"
            >
              Read blogs &amp; op-eds
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
