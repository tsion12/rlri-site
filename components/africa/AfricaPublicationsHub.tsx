import Image from "next/image";
import Link from "next/link";
import { africaRoutes } from "@/lib/africa-routes";
import type { WpPostWithSource } from "@/lib/wp";
import { blogPostPath, stripHtml } from "@/lib/wp";

/* ── Publication types ───────────────────────────────────────── */
const PUB_TYPES = [
  {
    id: "blogs",
    href: "/africa/publications/blogs",
    label: "Blogs & Op-eds",
    description:
      "Research insights, field perspectives, and expert commentary on Africa's most pressing development challenges.",
    icon: (
      <svg className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
        <path
          fillRule="evenodd"
          d="M2 5a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5Zm3.293 1.293a1 1 0 0 1 1.414 0l3 3a1 1 0 0 1 0 1.414l-3 3a1 1 0 1 1-1.414-1.414L7.586 11H5a1 1 0 1 1 0-2h2.586L5.293 7.707a1 1 0 0 1 0-1.414ZM11 9a1 1 0 1 0 0 2h2a1 1 0 1 0 0-2h-2Z"
          clipRule="evenodd"
        />
      </svg>
    ),
    countLabel: "8+ articles",
  },
  {
    id: "stories",
    href: "/africa/publications/stories",
    label: "Stories",
    description:
      "First-hand accounts and field stories illustrating the human impact of our programs across Africa.",
    icon: (
      <svg className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
        <path d="M9 4.804A7.968 7.968 0 0 0 5.354 8H4a2 2 0 0 0-2 2v1a2 2 0 0 0 2 2h.585A8 8 0 0 0 9 16.197V17h2v-.803A8 8 0 0 0 15.415 13H16a2 2 0 0 0 2-2v-1a2 2 0 0 0-2-2h-1.354A7.968 7.968 0 0 0 11 4.804V4H9v.804Z" />
      </svg>
    ),
    countLabel: "5 stories",
  },
  {
    id: "policy-briefs",
    href: "/africa/publications/policy-briefs",
    label: "Policy Briefs",
    description:
      "Concise, evidence-based analyses of critical issues designed to inform policy decisions and drive real-world change.",
    icon: (
      <svg className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
        <path
          fillRule="evenodd"
          d="M6 2a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2V7.414A2 2 0 0 0 15.414 6L12 2.586A2 2 0 0 0 10.586 2H6Zm2 10a1 1 0 1 0 0 2h4a1 1 0 1 0 0-2H8Zm0-3a1 1 0 0 0 0 2h4a1 1 0 0 0 0-2H8ZM9 5a1 1 0 0 1 2 0v3h3l-4-4v1Z"
          clipRule="evenodd"
        />
      </svg>
    ),
    countLabel: "2 briefs",
  },
] as const;

const typeIconWrapClass =
  "flex h-10 w-10 shrink-0 items-center justify-center rounded-lg border border-zinc-200/90 bg-zinc-50 text-teal-800 dark:border-zinc-700 dark:bg-zinc-800/60 dark:text-teal-300";

const typeCardClass =
  "group flex flex-col rounded-2xl border border-zinc-200/90 bg-white p-6 shadow-sm transition-colors hover:border-teal-200/80 dark:border-zinc-800 dark:bg-zinc-900/50 dark:hover:border-teal-800/40";

const countPillClass =
  "inline-block w-fit rounded-full border border-zinc-200/90 bg-zinc-50 px-2.5 py-0.5 text-[10px] font-semibold uppercase tracking-[0.12em] text-zinc-600 dark:border-zinc-700 dark:bg-zinc-800/60 dark:text-zinc-400";

/* ── Editorial process ───────────────────────────────────────── */
const EDITORIAL_ASSURANCES = [
  {
    title: "Blind peer review",
    description: "Every manuscript is assigned to a Topic-Specific Editor for blind review and editorial feedback.",
  },
  {
    title: "DOI registration",
    description: "Approved outputs receive a DOI and complete metadata for long-term scholarly visibility.",
  },
  {
    title: "Global dissemination",
    description: "The Managing Editor handles final layout, publication, and distribution to our networks.",
  },
] as const;

const EDITORIAL_CONTACT = "contact-africa@reallifeinstitute.org";

/* ── Post card ─────────────────────────────────────────────────── */
function LatestPostCard({ post }: { post: WpPostWithSource }) {
  const excerpt = post.excerpt ? stripHtml(post.excerpt.rendered).slice(0, 120).trim() : "";
  const date = new Date(post.date).toLocaleDateString("en-GB", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
  const theme = post.theme?.trim();
  const badge = theme && theme.toLowerCase() !== "uncategorized" ? theme : "Blog";

  return (
    <Link
      href={blogPostPath(post)}
      className="group flex flex-col overflow-hidden rounded-2xl border border-zinc-200/90 bg-white p-6 shadow-sm transition-colors hover:border-teal-200/80 dark:border-zinc-800 dark:bg-zinc-900/50 dark:hover:border-teal-800/40"
    >
      {post.featuredImage && (
        <div className="relative mb-4 h-40 overflow-hidden rounded-xl">
          <Image
            src={post.featuredImage}
            alt=""
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, 33vw"
          />
        </div>
      )}
      <span className="mb-3 inline-block w-fit rounded-full border border-zinc-200/90 bg-zinc-50 px-2.5 py-0.5 text-[10px] font-semibold uppercase tracking-[0.12em] text-zinc-600 dark:border-zinc-700 dark:bg-zinc-800/60 dark:text-zinc-400">
        {badge}
      </span>
      <h3
        className="flex-1 text-sm font-semibold leading-snug text-zinc-900 transition-colors group-hover:text-teal-800 dark:text-zinc-50 dark:group-hover:text-teal-300"
      >
        {stripHtml(post.title.rendered)}
      </h3>
      {excerpt && (
        <p className="mt-2 line-clamp-2 text-xs leading-relaxed text-zinc-500 dark:text-zinc-400">{excerpt}</p>
      )}
      <p className="mt-4 text-[10px] font-medium text-zinc-400 dark:text-zinc-500">{date}</p>
    </Link>
  );
}

/* ── Main component ──────────────────────────────────────────── */
export function AfricaPublicationsHub({ latestPosts }: { latestPosts: WpPostWithSource[] }) {
  return (
    <>
      <section
        className="border-b border-zinc-200/80 bg-white py-20 dark:border-zinc-800 dark:bg-zinc-950 sm:py-24"
        aria-labelledby="publications-heading"
      >
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <p className="text-[11px] font-semibold uppercase tracking-[0.25em] text-teal-700 dark:text-teal-400">
            Africa Programs
          </p>
          <h1
            id="publications-heading"
            className="mt-4 text-4xl font-semibold tracking-tight text-zinc-900 dark:text-zinc-50 sm:text-5xl"
          >
            Publications
          </h1>
          <p className="mt-5 max-w-3xl text-lg leading-relaxed text-zinc-600 dark:text-zinc-400">
            Research insights, field stories, and policy content from the Real Life Research Institute – Africa Programs.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link
              href="/africa/publications/blogs"
              className="inline-flex min-h-11 items-center justify-center rounded-lg bg-teal-700 px-6 text-sm font-semibold text-white shadow-sm transition hover:bg-teal-600"
            >
              Browse all blogs
            </Link>
            <Link
              href={africaRoutes.home}
              className="inline-flex min-h-11 items-center justify-center rounded-lg border border-zinc-200 bg-white px-6 text-sm font-semibold text-zinc-800 transition hover:border-teal-700/40 hover:text-teal-800 dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-100 dark:hover:border-zinc-600"
            >
              Africa home
            </Link>
          </div>
          <p className="mt-8 text-sm text-zinc-600 dark:text-zinc-400">
            <Link href="#publication-types" className="font-medium text-teal-800 underline-offset-2 hover:underline dark:text-teal-300">
              Publication types
            </Link>
            <span className="text-zinc-400"> · </span>
            <Link href="#editorial-process" className="font-medium text-teal-800 underline-offset-2 hover:underline dark:text-teal-300">
              Editorial process
            </Link>
            {latestPosts.length > 0 ? (
              <>
                <span className="text-zinc-400"> · </span>
                <Link href="#latest-blog" className="font-medium text-teal-800 underline-offset-2 hover:underline dark:text-teal-300">
                  Latest from the blog
                </Link>
              </>
            ) : null}
          </p>
        </div>
      </section>

      <section
        id="publication-types"
        className="scroll-mt-20 border-b border-zinc-200/80 bg-zinc-50/80 py-16 dark:border-zinc-800 dark:bg-zinc-950 sm:py-20 lg:py-24"
      >
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-10 max-w-2xl">
            <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-teal-700 dark:text-teal-400">Explore</p>
            <h2 className="mt-3 text-3xl font-semibold tracking-tight text-zinc-900 dark:text-zinc-50 sm:text-4xl">
              Publication types
            </h2>
            <p className="mt-3 text-base leading-relaxed text-zinc-600 dark:text-zinc-400">
              Three ways we share knowledge from the field to policy and global audiences.
            </p>
          </div>

          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {PUB_TYPES.map(({ id, href, label, description, icon, countLabel }) => (
              <Link key={id} href={href} className={typeCardClass}>
                <div className={typeIconWrapClass}>{icon}</div>
                <span className={`mt-4 ${countPillClass}`}>{countLabel}</span>
                <h3 className="mt-3 text-base font-semibold tracking-tight text-zinc-900 dark:text-zinc-50">{label}</h3>
                <p className="mt-2 flex-1 text-sm leading-relaxed text-zinc-600 dark:text-zinc-400">{description}</p>
                <span className="mt-6 inline-flex items-center gap-1.5 text-sm font-semibold text-teal-800 dark:text-teal-300">
                  Browse
                  <svg className="h-3.5 w-3.5" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M2 7h10M8 3l4 4-4 4" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section
        id="editorial-process"
        className="scroll-mt-20 border-b border-zinc-200/80 bg-white py-16 dark:border-zinc-800 dark:bg-zinc-950 sm:py-20 lg:py-24"
        aria-labelledby="editorial-process-heading"
      >
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,26rem)] lg:items-center lg:gap-16">
            <div>
              <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-teal-700 dark:text-teal-400">
                Editorial process
              </p>
              <h2
                id="editorial-process-heading"
                className="mt-3 text-3xl font-semibold tracking-tight text-zinc-900 dark:text-zinc-50 sm:text-4xl"
              >
                From submission to global dissemination
              </h2>
              <p className="mt-3 max-w-xl text-base leading-relaxed text-zinc-600 dark:text-zinc-400">
                Everything we publish moves through the same five-stage editorial workflow — from intake and screening by
                the Assistant Editor, to thematic peer review, to final approval and release by the Managing Editor.
              </p>

              <ul className="mt-8 space-y-5">
                {EDITORIAL_ASSURANCES.map(({ title, description }) => (
                  <li key={title} className="flex gap-3">
                    <span
                      className="mt-2 size-1.5 shrink-0 rounded-full bg-teal-600 dark:bg-teal-400"
                      aria-hidden
                    />
                    <div>
                      <h3 className="text-sm font-semibold text-zinc-900 dark:text-zinc-50">{title}</h3>
                      <p className="mt-1 text-sm leading-relaxed text-zinc-600 dark:text-zinc-400">{description}</p>
                    </div>
                  </li>
                ))}
              </ul>

              <div className="mt-8 flex flex-wrap gap-3">
                <a
                  href={`mailto:${EDITORIAL_CONTACT}?subject=Manuscript%20submission%20%E2%80%94%20RLRI%20Africa%20Programs`}
                  className="inline-flex min-h-11 items-center justify-center rounded-lg bg-teal-700 px-6 text-sm font-semibold text-white shadow-sm transition hover:bg-teal-600"
                >
                  Submit a manuscript
                </a>
                <Link
                  href={africaRoutes.career}
                  className="inline-flex min-h-11 items-center justify-center rounded-lg border border-zinc-200 bg-white px-6 text-sm font-semibold text-zinc-800 transition hover:border-teal-700/40 hover:text-teal-800 dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-100 dark:hover:border-zinc-600"
                >
                  Join the editorial team
                </Link>
              </div>
            </div>

            <figure className="mx-auto w-full max-w-sm lg:max-w-none">
              <div className="overflow-hidden rounded-3xl border border-zinc-200/90 bg-white shadow-sm dark:border-zinc-800">
                <Image
                  src="/assets/publications/editorial-workflow.png"
                  alt="RLRI editorial workflow in five steps: submission of the manuscript by email to the Assistant Editor; initial screening for scope, relevance, and completeness; thematic review by a Topic-Specific Editor through blind peer review; editorial approval of the revised manuscript; and publication and dissemination with DOI registration and layout by the Managing Editor."
                  width={723}
                  height={1024}
                  className="h-auto w-full"
                  sizes="(max-width: 1024px) 24rem, 26rem"
                />
              </div>
              <figcaption className="mt-4 text-xs leading-relaxed text-zinc-500 dark:text-zinc-500">
                The five stages every RLRI manuscript passes through before publication.
              </figcaption>
            </figure>
          </div>
        </div>
      </section>

      {latestPosts.length > 0 && (
        <section id="latest-blog" className="scroll-mt-20 bg-white py-16 dark:bg-zinc-950 sm:py-20 lg:py-24">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="mb-10 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
              <div>
                <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-teal-700 dark:text-teal-400">
                  Latest
                </p>
                <h2 className="mt-3 text-3xl font-semibold tracking-tight text-zinc-900 dark:text-zinc-50 sm:text-4xl">
                  From the blog
                </h2>
              </div>
              <Link
                href="/africa/publications/blogs"
                className="inline-flex min-h-11 shrink-0 items-center justify-center rounded-lg border border-zinc-200 bg-white px-5 text-sm font-semibold text-zinc-800 transition hover:border-teal-700/40 hover:text-teal-800 dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-100 dark:hover:border-zinc-600"
              >
                View all
              </Link>
            </div>

            <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {latestPosts.slice(0, 3).map((post) => (
                <LatestPostCard key={`${post.source}-${post.id}`} post={post} />
              ))}
            </div>
          </div>
        </section>
      )}
    </>
  );
}
