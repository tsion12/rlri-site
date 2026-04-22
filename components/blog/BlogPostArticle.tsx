import Image from "next/image";
import Link from "next/link";
import { BlogSharePanel } from "@/components/blog/BlogSharePanel";
import { WebinarProgramSupportLine } from "@/components/africa/WebinarProgramSupportLine";
import { programsAnchor } from "@/lib/africa-routes";
import { stripBlogWordPressHtml } from "@/lib/strip-blog-html";
import { blogPostPath, stripHtml, type WpPostWithSource } from "@/lib/wp";

function formatPostDate(iso: string) {
  return new Intl.DateTimeFormat("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  }).format(new Date(iso));
}

function estimateReadingMinutes(html: string) {
  const text = stripHtml(html);
  const words = text.split(/\s+/).filter(Boolean).length;
  return Math.max(1, Math.round(words / 200));
}

const FOCUS_PROGRAMS = [
  { n: "01", label: "Oceans", icon: "🌊" },
  { n: "02", label: "Digital Futures", icon: "🧠" },
  { n: "03", label: "Climate Adaptation", icon: "🌍" },
  { n: "04", label: "Peacebuilding", icon: "🕊️" },
  { n: "05", label: "Food & Resources", icon: "🌾" },
] as const;

type AuthorProfile = {
  name: string;
  role: string;
  bio?: string;
  avatar?: string | null;
  linkedin?: string;
};

/** Single-author byline for Dr. Chris (reuse for title-matched posts). */
const CHRIS_SOLO: AuthorProfile[] = [
  {
    name: "Chris Begealawuh, PhD",
    role: "Author",
    linkedin: "https://www.linkedin.com/in/nchongayi-christantus-020827a1/",
  },
];

const AUTHOR_OVERRIDES: Record<string, AuthorProfile[]> = {
  "shaping-development-policies-in-the-sahel-through-evidence-based-synthesis-progress-from-a-baobab-clare-programme-funded-team":
    [
      {
        name: "Dr. Chris Begealawuh",
        role: "Co-author",
        linkedin: "https://www.linkedin.com/in/nchongayi-christantus-020827a1/",
      },
      {
        name: "Lloyd George Banda, PhD",
        role: "Co-author",
        linkedin: "https://www.linkedin.com/in/lloydgeorgeii/",
      },
    ],
  "cameroon-hosted-the-wtos-ministers-were-ldcs-able-to-reshape-the-rules": [
    {
      name: "Chris Begealawuh, PhD",
      role: "Co-author",
      linkedin: "https://www.linkedin.com/in/nchongayi-christantus-020827a1/",
    },
    {
      name: "Christelle Nfor",
      role: "Co-author",
      linkedin: "https://www.linkedin.com/in/nfor-christelle-mugha-8941421a7/",
    },
  ],
  "await-featuretour-clearallseennotify": [
    {
      name: "Richard A. Nyiawung, PhD",
      role: "Co-author",
      linkedin: "https://www.linkedin.com/in/richard-nyiawung-phd-67165b87/",
    },
    {
      name: "Chris Begealawuh, PhD",
      role: "Co-author",
      linkedin: "https://www.linkedin.com/in/nchongayi-christantus-020827a1/",
    },
  ],
  "are-african-laws-ready-for-tech-facilitated-violence-against-women": [
    {
      name: "Ernest Lequimboh",
      role: "Senior Policy Advisor",
      linkedin: "https://www.linkedin.com/in/ernest-lequimboh-3ba6b786/",
    },
  ],
  "cameroon-celebrates-national-dialogue-anniversary-but-critics-say-dialogue-outcomes-remain-unmet":
    CHRIS_SOLO,
  "mjadala-afrika-the-au-chairperson-elections-2024-candidate-debate":
    CHRIS_SOLO,
  "3784-2": CHRIS_SOLO,
  "digital-risks-and-opportunities-for-women-in-east-africa": [
    {
      name: "Achai",
      role: "Author",
      linkedin: "https://www.linkedin.com/in/achai-deng-0b581a37b/",
    },
  ],
  "rethinking-wash-governance-in-africa-insights-from-webinar-speaker-agbor": [
    {
      name: "Oru Allens Agbor",
      role: "Featured Speaker, WASH Webinar (February 2026)",
      linkedin: "https://www.linkedin.com/in/oru-allens-agbor-127673209/",
    },
  ],
  "empowering-roots-why-the-world-trade-organization-wto-agreement-on-fisheries-subsidies-matters-for-small-scale-fisheries":
    [
      {
        name: "Richard A. Nyiawung, PhD",
        role: "Co-author",
        linkedin: "https://www.linkedin.com/in/richard-nyiawung-phd-67165b87/",
      },
      {
        name: "Maurice Besseng, PhD",
        role: "Co-author",
        linkedin: "https://www.linkedin.com/in/mbeseng/",
      },
    ],
};

/** Normalize titles so WP punctuation/spacing variants still match overrides. */
function normalizeTitleKey(raw: string): string {
  return raw
    .toLowerCase()
    .replace(/[\u2018\u2019\u201A\u201B]/g, "'")
    .replace(/[\u2013\u2014\u2212]/g, "-")
    .replace(/\s+/g, " ")
    .trim();
}

/**
 * Title-keyed author lists (slug overrides in {@link AUTHOR_OVERRIDES} win first).
 * Keys are built from readable titles; must match {@link normalizeTitleKey}(post title).
 */
const TITLE_AUTHOR_OVERRIDES: Record<string, AuthorProfile[]> = {
  [normalizeTitleKey("Cameroon hosted the WTO's Ministers – Were LDCs Able to Reshape the Rules?")]:
    AUTHOR_OVERRIDES["cameroon-hosted-the-wtos-ministers-were-ldcs-able-to-reshape-the-rules"],
  [normalizeTitleKey(
    "BBNJ and the High Seas ambitions in the Gulf of Guinea (GoG) region: The need for more attention",
  )]: AUTHOR_OVERRIDES["await-featuretour-clearallseennotify"],
  [normalizeTitleKey("Are African Laws Ready for Tech-Facilitated Violence Against Women?")]:
    AUTHOR_OVERRIDES["are-african-laws-ready-for-tech-facilitated-violence-against-women"],
  [normalizeTitleKey(
    "Cameroon’s National Dialogue as a Lens for Uncovering Persistent Patterns of Inadequate Inclusion in African Peacebuilding Dialogues",
  )]: CHRIS_SOLO,
  [normalizeTitleKey(
    "Cameroon celebrates national dialogue anniversary, but critics say dialogue outcomes remain unmet",
  )]: CHRIS_SOLO,
  [normalizeTitleKey("Mjadala Afrika: The AU Chairperson Elections & 2024 Candidate Debate")]: CHRIS_SOLO,
  [normalizeTitleKey(
    "Empowering roots: Why the World Trade Organization (WTO) Agreement on Fisheries Subsidies matters for small-scale fisheries",
  )]: AUTHOR_OVERRIDES["empowering-roots-why-the-world-trade-organization-wto-agreement-on-fisheries-subsidies-matters-for-small-scale-fisheries"],
};

export function BlogPostArticle({ post }: { post: WpPostWithSource }) {
  const dateLabel = formatPostDate(post.date);
  const bodyHtml = stripBlogWordPressHtml(post.content.rendered);
  const minutes = estimateReadingMinutes(bodyHtml);
  const excerptPlain = post.excerpt?.rendered ? stripHtml(post.excerpt.rendered) : null;
  const titlePlain = stripHtml(post.title.rendered);
  const canonicalPath = blogPostPath(post);
  const fallbackAuthor: AuthorProfile = {
    name:
      post.authorName?.trim() ||
      (post.source === "africa" ? "RLRI Africa Programs Team" : "RLRI Editorial Team"),
    role: post.source === "africa" ? "Africa Program Contributor" : "RLRI Contributor",
    bio:
      post.authorBio?.trim() ||
      "Contributors focused on research, policy, and evidence-based analysis relevant to communities across Africa.",
    avatar: post.authorAvatar ?? null,
  };
  const overrideBySlug = AUTHOR_OVERRIDES[post.slug];
  const overrideByTitle = TITLE_AUTHOR_OVERRIDES[normalizeTitleKey(titlePlain)];
  const authors = overrideBySlug ?? overrideByTitle ?? [fallbackAuthor];

  return (
    <article className="relative mx-auto max-w-3xl px-4 pb-28 pt-6 sm:px-6 sm:pt-8">
      {/* Ambient accents */}
      <div
        aria-hidden
        className="pointer-events-none absolute -left-24 top-0 h-72 w-72 rounded-full bg-amber-400/8 blur-3xl dark:bg-amber-500/6"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute -right-20 top-40 h-64 w-64 rounded-full bg-stone-400/10 blur-3xl dark:bg-violet-500/5"
      />

      <nav className="relative mb-10" aria-label="Breadcrumb">
        <Link
          href="/blog"
          className="group inline-flex items-center gap-2 rounded-full border border-stone-200/90 bg-white/90 px-4 py-2.5 text-sm font-medium text-stone-600 shadow-sm ring-1 ring-stone-950/5 transition-all hover:border-amber-300/80 hover:bg-amber-50/80 hover:text-stone-900 dark:border-zinc-800 dark:bg-zinc-900/90 dark:text-zinc-400 dark:ring-white/5 dark:hover:border-zinc-600 dark:hover:bg-zinc-800/80 dark:hover:text-zinc-100"
        >
          <span aria-hidden className="transition-transform group-hover:-translate-x-0.5">
            ←
          </span>
          All posts
        </Link>
      </nav>

      <header className="relative">
        <p className="text-[11px] font-semibold uppercase tracking-[0.32em] text-amber-700 dark:text-amber-400/90">
          Journal
        </p>

        <h1
          className="mt-6 text-balance text-3xl font-semibold leading-[1.12] tracking-tight text-stone-900 dark:text-zinc-50 sm:mt-8 sm:text-4xl sm:leading-[1.08] lg:text-[2.5rem]"
        >
          {stripHtml(post.title.rendered)}
        </h1>

        <div className="mt-5 flex flex-wrap items-center gap-x-3 gap-y-1 text-sm text-stone-500 dark:text-zinc-500">
          <time dateTime={post.date} className="font-medium text-stone-700 dark:text-zinc-300">
            {dateLabel}
          </time>
          <span aria-hidden className="text-stone-300 dark:text-zinc-600">
            ·
          </span>
          <span>{minutes} min read</span>
        </div>

        {post.slug === "rethinking-wash-governance-in-africa-insights-from-webinar-speaker-agbor" ? (
          <WebinarProgramSupportLine month="february" className="mt-5" />
        ) : null}

        <section className="mt-6 rounded-2xl border border-zinc-200/80 bg-white p-5 shadow-sm dark:border-zinc-800 dark:bg-zinc-900/60 sm:p-6">
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-zinc-500 dark:text-zinc-500">
            {authors.length > 1 ? "Authors" : "Author profile"}
          </p>
          <div className="mt-3 space-y-3">
            {authors.map((author) => {
              const initial = author.name.charAt(0).toUpperCase();
              return (
                <div
                  key={author.name}
                  className="rounded-xl border border-zinc-200/80 bg-zinc-50/80 p-4 dark:border-zinc-700 dark:bg-zinc-800/50"
                >
                  <div className="flex items-start gap-3">
                    {author.avatar ? (
                      <Image
                        src={author.avatar}
                        alt={author.name}
                        width={44}
                        height={44}
                        className="rounded-full border border-zinc-200 object-cover dark:border-zinc-700"
                      />
                    ) : (
                      <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-zinc-200 bg-white text-sm font-semibold text-zinc-700 dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-200">
                        {initial}
                      </div>
                    )}
                    <div className="min-w-0">
                      <p className="text-sm font-semibold text-zinc-900 dark:text-zinc-50">{author.name}</p>
                      <p className="mt-0.5 text-xs text-zinc-500 dark:text-zinc-400">{author.role}</p>
                      {author.linkedin ? (
                        <a
                          href={author.linkedin}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="mt-2 inline-flex items-center gap-1 text-xs font-medium text-teal-700 underline-offset-2 hover:underline dark:text-teal-300"
                        >
                          LinkedIn profile
                        </a>
                      ) : null}
                    </div>
                  </div>
                  {author.bio ? (
                    <p className="mt-3 text-sm leading-relaxed text-zinc-600 dark:text-zinc-400">
                      {stripHtml(author.bio)}
                    </p>
                  ) : null}
                </div>
              );
            })}
          </div>
        </section>

        {post.featuredImage ? (
          <div className="relative mt-10 overflow-hidden rounded-2xl border border-stone-200/80 shadow-2xl shadow-stone-950/10 ring-1 ring-stone-950/5 dark:border-zinc-800 dark:shadow-black/40 dark:ring-white/5 sm:rounded-3xl">
            <div className="relative aspect-video w-full sm:aspect-2/1">
              <Image
                src={post.featuredImage}
                alt={titlePlain || "Article cover image"}
                fill
                priority
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 48rem"
              />
              <div
                aria-hidden
                className="absolute inset-0 bg-linear-to-t from-stone-950/40 via-transparent to-transparent dark:from-zinc-950/50"
              />
            </div>
          </div>
        ) : (
          <div
            aria-hidden
            className="mt-10 h-px w-full max-w-md bg-linear-to-r from-amber-500/50 via-amber-400/20 to-transparent"
          />
        )}
      </header>

      {excerptPlain ? (
        <p className="relative mt-10 border-l-[3px] border-amber-500/90 pl-5 text-lg font-medium leading-relaxed text-stone-700 dark:border-amber-400/80 dark:text-zinc-300">
          {excerptPlain}
        </p>
      ) : null}

      <div
        className={`blog-article-body rounded-2xl border border-stone-200/70 bg-white/50 px-5 py-8 shadow-inner shadow-stone-950/5 sm:rounded-3xl sm:px-8 sm:py-10 dark:border-zinc-800/70 dark:bg-zinc-950/35 dark:shadow-none ${
          excerptPlain ? "mt-10" : "mt-12"
        }`}
      >
        <div
          className="wp-post-content"
          dangerouslySetInnerHTML={{ __html: bodyHtml }}
        />
      </div>

      <section className="mt-12 rounded-2xl border border-zinc-200/80 bg-zinc-50/80 p-5 text-sm leading-relaxed text-zinc-600 dark:border-zinc-800 dark:bg-zinc-900/40 dark:text-zinc-400 sm:p-6">
        <p className="text-xs font-semibold uppercase tracking-[0.16em] text-zinc-500 dark:text-zinc-500">
          Disclaimer
        </p>
        <p className="mt-3">
          The opinions expressed in this article/multimedia are those of the author(s) and do not necessarily reflect
          the views of Real Life Research Institute or its Board of Directors.
        </p>
      </section>

      <section className="mt-10">
        <aside className="rounded-2xl border border-zinc-200/80 bg-white p-6 shadow-sm dark:border-zinc-800 dark:bg-zinc-900/60 sm:p-7">
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-zinc-500 dark:text-zinc-500">
            Focus programs
          </p>
          <div className="mt-4 grid grid-cols-2 gap-3">
            {FOCUS_PROGRAMS.map((program) => (
              <Link
                key={program.n}
                href={programsAnchor(program.n)}
                className="rounded-xl border border-zinc-200/80 bg-zinc-50 p-3 transition-colors hover:border-teal-200 hover:bg-white dark:border-zinc-700 dark:bg-zinc-800/60 dark:hover:border-teal-800/60"
              >
                <p className="text-lg leading-none">{program.icon}</p>
                <p className="mt-2 text-xs font-medium leading-snug text-zinc-700 dark:text-zinc-300">
                  {program.label}
                </p>
              </Link>
            ))}
          </div>

          <BlogSharePanel title={titlePlain} fallbackPath={canonicalPath} />
        </aside>
      </section>

      <footer className="relative mt-14 flex flex-col gap-4 border-t border-stone-200/80 pt-10 dark:border-zinc-800 sm:flex-row sm:items-center sm:justify-between">
        <Link
          href="/blog"
          className="inline-flex items-center gap-2 text-sm font-semibold text-amber-800 transition hover:text-amber-950 dark:text-amber-400 dark:hover:text-amber-200"
        >
          <span aria-hidden>←</span>
          Back to all posts
        </Link>
        <p className="text-xs text-stone-500 dark:text-zinc-500">{titlePlain}</p>
      </footer>

      <section className="mt-12 rounded-2xl border border-zinc-200/80 bg-zinc-50/80 p-6 dark:border-zinc-800 dark:bg-zinc-900/40 sm:p-7">
        <p className="text-xs font-semibold uppercase tracking-[0.18em] text-zinc-500 dark:text-zinc-500">
          Explore more from RLRI Africa Program
        </p>
        <div className="mt-4 grid gap-3 sm:grid-cols-2">
          <Link
            href="/africa/publications/blogs"
            className="inline-flex min-h-11 items-center justify-center rounded-lg bg-teal-700 px-5 text-sm font-semibold text-white transition hover:bg-teal-600"
          >
            Blogs &amp; op-eds
          </Link>
          <Link
            href="/africa/publications/stories"
            className="inline-flex min-h-11 items-center justify-center rounded-lg border border-zinc-200 bg-white px-5 text-sm font-semibold text-zinc-800 transition hover:border-teal-700/40 hover:text-teal-800 dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-100"
          >
            Stories
          </Link>
          <Link
            href="/africa/programs"
            className="inline-flex min-h-11 items-center justify-center rounded-lg border border-zinc-200 bg-white px-5 text-sm font-semibold text-zinc-800 transition hover:border-teal-700/40 hover:text-teal-800 dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-100"
          >
            Programs
          </Link>
          <Link
            href="/africa/events"
            className="inline-flex min-h-11 items-center justify-center rounded-lg border border-zinc-200 bg-white px-5 text-sm font-semibold text-zinc-800 transition hover:border-teal-700/40 hover:text-teal-800 dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-100"
          >
            Events &amp; webinars
          </Link>
        </div>
      </section>
    </article>
  );
}
