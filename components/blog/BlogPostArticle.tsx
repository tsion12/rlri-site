import Link from "next/link";
import { BlogAuthorsBioSection } from "@/components/blog/BlogAuthorsBioSection";
import { BlogEngagement } from "@/components/blog/BlogEngagement";
import { BlogSharePanel } from "@/components/blog/BlogSharePanel";
import { WebinarProgramSupportLine } from "@/components/africa/WebinarProgramSupportLine";
import { programsAnchor } from "@/lib/africa-routes";
import { resolveAuthorPhoto } from "@/lib/blog-author-photos";
import { finalizeBlogBodyHtml } from "@/lib/strip-blog-html";
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

function authorBylineName(name: string) {
  return name.replace(/^Dr\.\s+/i, "").replace(/,?\s*Ph\.?D\.?$/i, "").trim();
}

function CalendarIcon() {
  return (
    <svg className="h-3.5 w-3.5 shrink-0 text-stone-400 dark:text-zinc-500" viewBox="0 0 20 20" fill="currentColor" aria-hidden>
      <path d="M5.25 3.5A.75.75 0 0 1 6 4.25V5h8v-.75a.75.75 0 0 1 1.5 0V5h.75A2.25 2.25 0 0 1 18.5 7.25v9A2.25 2.25 0 0 1 16.25 18.5h-12.5A2.25 2.25 0 0 1 1.5 16.25v-9A2.25 2.25 0 0 1 3.75 5H4.5v-.75A.75.75 0 0 1 6 4.25V5h8v-.75a.75.75 0 0 1 1.5 0V5h.75Zm-1 4.5v7.25c0 .414.336.75.75.75h12.5a.75.75 0 0 0 .75-.75v-7.25H4.25Z" />
    </svg>
  );
}

function AuthorIcon() {
  return (
    <svg className="h-3.5 w-3.5 shrink-0 text-stone-400 dark:text-zinc-500" viewBox="0 0 20 20" fill="currentColor" aria-hidden>
      <path d="M13.586 3.586a2 2 0 1 1 2.828 2.828l-.793.793-2.828-2.828.793-.793ZM11.379 5.793 3 14.172V17h2.828l8.38-8.379-2.83-2.828Z" />
    </svg>
  );
}

function MetaDivider() {
  return <span aria-hidden className="text-stone-300 dark:text-zinc-600">·</span>;
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
  "when-ai-becomes-a-weapon-what-african-governments-must-do-to-protect-women-online":
    [
      {
        name: "Prudence Chepngeno",
        role: "Author",
      },
    ],
  "inclusive-dialogue-in-action-reflections-on-pope-leo-xivs-apostolic-visit-to-africa":
    [
      {
        name: "Christelle Nfor",
        role: "Author",
        linkedin:
          "https://www.linkedin.com/in/nfor-christelle-mugha-8941421a7/",
      },
    ],
  "the-next-digital-divide-why-africa-risks-becoming-an-ai-consumer-rather-than-an-ai-creator":
    [
      {
        name: "Alvin Korkie",
        role: "Author",
        linkedin:
          "https://za.linkedin.com/in/korkiecom?utm_source=share&utm_medium=member_mweb&utm_campaign=share_via&utm_content=profile",
      },
    ],
  "running-away-from-heat-hunger-and-violence-understanding-the-sequencing-of-climate-conflict-dynamics-in-the-sahel":
    [
      {
        name: "Lloyd George Banda, PhD",
        role: "Author",
        linkedin: "https://www.linkedin.com/in/lloydgeorgeii/",
      },
    ],
  "aid-for-trade-and-development-cuts-how-donor-policy-shifts-are-deepening-the-climate-conflict-crisis-in-the-sahel":
    [
      {
        name: "Chris Begealawuh, PhD",
        role: "Co-author",
        linkedin: "https://www.linkedin.com/in/nchongayi-christantus-020827a1/",
        bio: "Chris Begealawuh holds a PhD in International Development from the University of Ottawa. He is a Member of the Baobab (Sahel Climate-Conflict) synthesis research project at the University of Cape Town, South Africa. Chris is also a Research Affiliate at Real Life Research Institute (RLRI), contributing seasonally to the organization’s Climate Adaptation & Resilience Program.",
      },
      {
        name: "María Ayuk, PhD",
        role: "Co-author",
        avatar: "/assets/authors/maria%20pp.jpeg",
        linkedin: "https://www.linkedin.com/in/maria-ayuk-923b201a",
        bio: "María Ayuk is a Postdoctoral Researcher and Associate Lecturer at Otto‑von‑Guericke University Magdeburg. Her research focuses on environmental and climate policy, forestry, sustainable development, knowledge transfer, and peace and security governance. She is a Member of the Baobab Sahel Climate‑Conflict project at the University of Cape Town, contributing to interdisciplinary research on climate‑related insecurity in the Sahel. An alumna of the George C. Marshall European Center for Security Studies, she brings an integrated perspective to the intersections of environmental change, security, and international cooperation.",
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
  [normalizeTitleKey(
    "Cameroon hosted the WTO's Ministers – Were LDCs Able to Reshape the Rules?",
  )]:
    AUTHOR_OVERRIDES[
      "cameroon-hosted-the-wtos-ministers-were-ldcs-able-to-reshape-the-rules"
    ],
  [normalizeTitleKey(
    "BBNJ and the High Seas ambitions in the Gulf of Guinea (GoG) region: The need for more attention",
  )]: AUTHOR_OVERRIDES["await-featuretour-clearallseennotify"],
  [normalizeTitleKey(
    "Are African Laws Ready for Tech-Facilitated Violence Against Women?",
  )]:
    AUTHOR_OVERRIDES[
      "are-african-laws-ready-for-tech-facilitated-violence-against-women"
    ],
  [normalizeTitleKey(
    "Cameroon’s National Dialogue as a Lens for Uncovering Persistent Patterns of Inadequate Inclusion in African Peacebuilding Dialogues",
  )]: CHRIS_SOLO,
  [normalizeTitleKey(
    "Cameroon celebrates national dialogue anniversary, but critics say dialogue outcomes remain unmet",
  )]: CHRIS_SOLO,
  [normalizeTitleKey(
    "Mjadala Afrika: The AU Chairperson Elections & 2024 Candidate Debate",
  )]: CHRIS_SOLO,
  [normalizeTitleKey(
    "Empowering roots: Why the World Trade Organization (WTO) Agreement on Fisheries Subsidies matters for small-scale fisheries",
  )]:
    AUTHOR_OVERRIDES[
      "empowering-roots-why-the-world-trade-organization-wto-agreement-on-fisheries-subsidies-matters-for-small-scale-fisheries"
    ],
  [normalizeTitleKey(
    "When AI becomes a weapon: what African governments must do to protect women online",
  )]:
    AUTHOR_OVERRIDES[
      "when-ai-becomes-a-weapon-what-african-governments-must-do-to-protect-women-online"
    ],
  [normalizeTitleKey(
    "When AI becomes a weapon: what African governments must do to protect women online.",
  )]:
    AUTHOR_OVERRIDES[
      "when-ai-becomes-a-weapon-what-african-governments-must-do-to-protect-women-online"
    ],
  [normalizeTitleKey(
    "From Data Cables to Conflict Corridors: How Middle East Instability is Reshaping Africa's Security and Political Landscape",
  )]: [
    {
      name: "Solomon Kimaita",
      role: "Author",
      linkedin: "https://www.linkedin.com/in/solomon-kimaita-5802021a8/",
    },
  ],
  [normalizeTitleKey("Africa’s Digital Infrastructure Is More Exposed Than It Appears")]: [
    {
      name: "Alvin Korkie",
      role: "Author",
      linkedin: "https://www.linkedin.com/in/korkiecom/",
    },
  ],
};

export function BlogPostArticle({ post }: { post: WpPostWithSource }) {
  const dateLabel = formatPostDate(post.date);
  const excerptPlain = post.excerpt?.rendered ? stripHtml(post.excerpt.rendered) : null;
  const titlePlain = stripHtml(post.title.rendered);
  const canonicalPath = blogPostPath(post);
  const wpAuthorBio = post.authorBio?.trim();
  const fallbackAuthor: AuthorProfile = {
    name:
      post.authorName?.trim() ||
      (post.source === "africa" ? "RLRI Africa Programs Team" : "RLRI Editorial Team"),
    role: post.source === "africa" ? "Africa Program Contributor" : "RLRI Contributor",
    bio: wpAuthorBio || undefined,
    avatar: post.authorAvatar ?? null,
  };
  const overrideBySlug = AUTHOR_OVERRIDES[post.slug];
  const overrideByTitle = TITLE_AUTHOR_OVERRIDES[normalizeTitleKey(titlePlain)];
  const authors = overrideBySlug ?? overrideByTitle ?? [fallbackAuthor];
  const hasAuthorOverride = Boolean(overrideBySlug ?? overrideByTitle);
  const authorsForSection = authors.map((author) => ({
    name: author.name,
    role: author.role,
    bio: author.bio?.trim() ?? "",
    avatar: resolveAuthorPhoto(author.name, author.avatar),
    linkedin: author.linkedin,
  }));
  const isGenericFallback =
    !hasAuthorOverride &&
    authorsForSection.length === 1 &&
    /RLRI|Editorial Team/i.test(authorsForSection[0].name);
  const showAuthorsSection =
    !isGenericFallback &&
    (hasAuthorOverride ||
      authorsForSection.some((author) => author.bio || author.linkedin || author.avatar));
  const bodyHtml = finalizeBlogBodyHtml(post.content.rendered, {
    stripAuthorsBio: showAuthorsSection && authorsForSection.some((author) => author.bio),
  });
  const minutes = estimateReadingMinutes(bodyHtml);
  const themeLabel = post.programLabel ?? post.theme?.trim() ?? null;
  const showAuthorByline = !isGenericFallback;
  const bylineAuthors = authors.map((author) => ({
    name: authorBylineName(author.name),
    linkedin: author.linkedin,
  }));

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

        <div className="mt-5 flex flex-wrap items-center gap-x-2 gap-y-2 text-sm text-stone-500 dark:text-zinc-500">
          {themeLabel ? (
            <>
              <span>
                In{" "}
                <span className="font-medium text-teal-800 dark:text-teal-300">{themeLabel}</span>
              </span>
              <MetaDivider />
            </>
          ) : null}
          <span className="inline-flex items-center gap-1.5">
            <CalendarIcon />
            <time dateTime={post.date} className="font-medium text-stone-700 dark:text-zinc-300">
              {dateLabel}
            </time>
          </span>
          {showAuthorByline && bylineAuthors.length > 0 ? (
            <>
              <MetaDivider />
              <span className="inline-flex flex-wrap items-center gap-1.5">
                <AuthorIcon />
                <span className="inline-flex flex-wrap items-center gap-x-1">
                  {bylineAuthors.map((author, index) => (
                    <span key={author.name} className="inline-flex items-center">
                      {index > 0 ? (
                        <span className="mr-1 text-stone-400 dark:text-zinc-500">
                          {index === bylineAuthors.length - 1 ? "and " : ", "}
                        </span>
                      ) : null}
                      {author.linkedin ? (
                        <a
                          href={author.linkedin}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="font-medium text-teal-800 underline-offset-2 hover:underline dark:text-teal-300"
                        >
                          {author.name}
                        </a>
                      ) : (
                        <span className="font-medium text-teal-800 dark:text-teal-300">{author.name}</span>
                      )}
                    </span>
                  ))}
                </span>
              </span>
            </>
          ) : null}
          <MetaDivider />
          <span>{minutes} min read</span>
        </div>

        {post.slug === "rethinking-wash-governance-in-africa-insights-from-webinar-speaker-agbor" ? (
          <WebinarProgramSupportLine month="february" className="mt-5" />
        ) : null}

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

      {showAuthorsSection ? <BlogAuthorsBioSection authors={authorsForSection} /> : null}

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

      <BlogEngagement slug={post.slug} source={post.source} title={titlePlain} />
    </article>
  );
}
