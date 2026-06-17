import Link from "next/link";
import { BlogAuthorsBioSection } from "@/components/blog/BlogAuthorsBioSection";
import { BlogEngagement } from "@/components/blog/BlogEngagement";
import { BlogSharePanel } from "@/components/blog/BlogSharePanel";
import { WebinarProgramSupportLine } from "@/components/africa/WebinarProgramSupportLine";
import { africaRoutes, programsAnchor } from "@/lib/africa-routes";
import { resolveAuthorPhoto } from "@/lib/blog-author-photos";
import { finalizeBlogBodyHtml } from "@/lib/strip-blog-html";
import { blogPostPath, postIsMainPolicy, stripHtml, type WpPostWithSource } from "@/lib/wp";

/** Main-site policies list anchor (no main-routes module on Africa-only deploys). */
const MAIN_POLICIES_LIST_HREF = "/aboutus#institute-policies";

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

function cleanWpExcerptText(html: string): string {
  return stripHtml(html)
    .replace(/\[\s*&hellip;\s*\]/gi, "")
    .replace(/&hellip;/gi, "")
    .replace(/…+/g, "")
    .replace(/\.{3,}/g, "")
    .trim();
}

function normalizePlainForCompare(text: string): string {
  return text
    .replace(/\u00a0/g, " ")
    .replace(/[\u2018\u2019]/g, "'")
    .replace(/[\u2013\u2014]/g, "-")
    .replace(/\s+/g, " ")
    .trim()
    .toLowerCase();
}

/** Hide the lead block when WordPress auto-filled the excerpt from the article opening. */
function excerptRepeatsBodyOpening(excerptHtml: string, bodyHtml: string): boolean {
  const ex = normalizePlainForCompare(cleanWpExcerptText(excerptHtml));
  const body = normalizePlainForCompare(stripHtml(bodyHtml));
  if (!ex || !body || ex.length < 20) return false;
  if (body.startsWith(ex)) return true;

  const compareLen = Math.min(ex.length, body.length, 320);
  let shared = 0;
  for (let i = 0; i < compareLen; i += 1) {
    if (ex[i] === body[i]) shared += 1;
    else break;
  }
  return shared >= Math.min(80, Math.floor(ex.length * 0.72));
}

/** Shared subtitle for main-site policy detail pages. */
const POLICY_DETAIL_SUBTITLE =
  "At Real Life Research Institute, our policies put community first and reflect the values we live by.";

const FOCUS_PROGRAMS = [
  { n: "01", label: "Oceans", icon: "🌊" },
  { n: "02", label: "Digital Futures", icon: "🧠" },
  { n: "03", label: "Climate Adaptation", icon: "🌍" },
  { n: "04", label: "Peacebuilding", icon: "🕊️" },
  { n: "05", label: "Health Systems", icon: "🏥" },
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

/** Solomon Kimaita — same bio as April 2026 webinar speaker profile. */
const SOLOMON_KIMAITA_AUTHOR: AuthorProfile = {
  name: "Solomon Kimaita",
  role: "Author",
  linkedin: "https://www.linkedin.com/in/solomon-kimaita-5802021a8/",
  avatar: "/assets/april/Solomon.webp",
  bio: "Solomon Kimaita is a Lecturer of International Relations and Diplomacy at Zetech University in Nairobi, Kenya, specializing in Peace and Conflict Studies. He holds an M.A. in International Relations from the United States International University-Africa and a B.A. from Moi University. He teaches courses on development dynamics, regional integration, and international conflict management, and is a Certified Professional Mediator. His experience includes humanitarian work with UNHCR and project management in higher education development partnerships. Solomon has published and presented on topics such as AI in conflict prevention, youth participation in climate resilience, and digital diplomacy, and he is actively involved in curriculum development and student mentorship.",
};

const ERNEST_LEQUIMBOH_AUTHOR: AuthorProfile = {
  name: "Ernest Lequimboh",
  role: "Author",
  linkedin: "https://www.linkedin.com/in/ernest-lequimboh-3ba6b786/",
  avatar: "/assets/Team/Ernest-Lequimboh.webp",
  bio: "Ernest Lequimboh is an Award-Winning Author of 10 Investments You Must Make Before 40 and a Senior Policy Advisor at the Real Life Research Institute (RLRI), where he contributes to research and policy work at the intersection of artificial intelligence, governance, and inclusive public leadership. He brings experience in policy analysis and legislative modernization, a researcher with an academic foundation in Women and Gender Studies, Law, and Public Policy, alongside advanced studies in artificial intelligence and DevOps. His forthcoming paper critically examines AI Governance Capacity.",
};

const CHRISTELLE_NFOR_AUTHOR: AuthorProfile = {
  name: "Christelle Nfor Mugha",
  role: "Author",
  linkedin: "https://www.linkedin.com/in/nfor-christelle-mugha-8941421a7/",
  bio: "Christelle Nfor Mugha is a journalist and communications professional specialising in strategic communications, content development, and stakeholder engagement. She holds a Bachelor of Arts degree in Journalism from the Advanced School of Mass Communications, Yaoundé. Her work focuses on amplifying underrepresented voices and advancing public interest narratives, particularly around gender, governance, and social justice. She currently serves as Program Assistant at the Real Life Research Institute Africa Program, where she supports communications, digital engagement, and the dissemination of research and policy outputs across Africa. Her work bridges research and practice, translating complex policy and development issues into accessible, impactful content for diverse audiences across the continent and beyond.",
};

const LLOYD_GEORGE_BANDA_AUTHOR: AuthorProfile = {
  name: "Lloyd George Banda, PhD",
  role: "Postdoctoral Research Fellow",
  linkedin: "https://www.linkedin.com/in/lloydgeorgeii/",
  avatar: "/assets/authors/Lloyd.png",
  bio: "Lloyd George Banda is a political economist with expertise in applied econometrics, development economics, comparative politics, and public policy. He serves as a Postdoctoral Research Fellow on the BAOBAB synthesis team Climate Vulnerabilities, Conflicts, and Livelihood Dynamics in the Sahel (Climate Sahel Team). He holds a PhD in Political Science from Stellenbosch University. He has a strong background on governance and the effects of government policy on development outcomes at both the domestic and international levels. This work is geographically anchored in Sub-Saharan Africa and aligned with United Nations Sustainable Development Goal 16 (Peace, Justice, and Strong Institutions) and the interaction thereof with the three pillars of prosperity: environmental equilibrium, economic viability, and social equity. To support this research, Lloyd draws on a mixed-methods approach, combining qualitative inquiry with quantitative techniques such as economic modelling and computational analysis, using tools including Stata, AMOS, Python, and SPSS.",
};

const AUTHOR_OVERRIDES: Record<string, AuthorProfile[]> = {
  "shaping-development-policies-in-the-sahel-through-evidence-based-synthesis-progress-from-a-baobab-clare-programme-funded-team":
    [
      {
        name: "Dr. Chris Begealawuh",
        role: "Co-author",
        linkedin: "https://www.linkedin.com/in/nchongayi-christantus-020827a1/",
      },
      { ...LLOYD_GEORGE_BANDA_AUTHOR, role: "Co-author" },
    ],
  "cameroon-hosted-the-wtos-ministers-were-ldcs-able-to-reshape-the-rules": [
    {
      name: "Chris Begealawuh, PhD",
      role: "Co-author",
      linkedin: "https://www.linkedin.com/in/nchongayi-christantus-020827a1/",
    },
    { ...CHRISTELLE_NFOR_AUTHOR, role: "Co-author" },
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
    [CHRISTELLE_NFOR_AUTHOR],
  "rethinking-climate-adaptation-in-africa-why-local-knowledge-and-information-integrity-cannot-be-separated":
    [CHRISTELLE_NFOR_AUTHOR],
  "menstrual-poverty-in-cameroons-northwest-region-a-hidden-crisis-in-a-conflict-zone":
    [CHRISTELLE_NFOR_AUTHOR],
  "what-central-african-laws-say-about-sexual-and-reproductive-health-and-rights-and-what-they-do-not":
    [CHRISTELLE_NFOR_AUTHOR],
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
    [LLOYD_GEORGE_BANDA_AUTHOR],
  "the-fall-of-kidal-and-the-unravelling-of-malis-military-legitimacy": [LLOYD_GEORGE_BANDA_AUTHOR],
  "shrinking-aid-rising-instability-the-future-of-peacebuilding-in-sub-saharan-africa": [SOLOMON_KIMAITA_AUTHOR],
  "when-ai-makes-decisions-whos-really-in-charge": [ERNEST_LEQUIMBOH_AUTHOR],
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
  )]: [SOLOMON_KIMAITA_AUTHOR],
  [normalizeTitleKey(
    "Shrinking Aid, Rising Instability: The Future of Peacebuilding in Sub-Saharan Africa",
  )]: [SOLOMON_KIMAITA_AUTHOR],
  [normalizeTitleKey("When AI Makes Decisions, Who's Really in Charge?")]: [ERNEST_LEQUIMBOH_AUTHOR],
  [normalizeTitleKey("When AI Makes Decisions, Who’s Really in Charge?")]: [ERNEST_LEQUIMBOH_AUTHOR],
  [normalizeTitleKey("The Fall of Kidal and the Unravelling of Mali's Military Legitimacy")]: [
    LLOYD_GEORGE_BANDA_AUTHOR,
  ],
  [normalizeTitleKey("The Fall of Kidal and the Unravelling of Mali’s Military Legitimacy")]: [
    LLOYD_GEORGE_BANDA_AUTHOR,
  ],
  [normalizeTitleKey("Africa’s Digital Infrastructure Is More Exposed Than It Appears")]: [
    {
      name: "Alvin Korkie",
      role: "Author",
      linkedin: "https://www.linkedin.com/in/korkiecom/",
    },
  ],
};

function DownloadIcon() {
  return (
    <svg className="size-5 shrink-0" viewBox="0 0 20 20" fill="currentColor" aria-hidden>
      <path d="M10.75 2.75a.75.75 0 0 0-1.5 0v8.614L6.295 8.235a.75.75 0 1 0-1.09 1.03l4.25 4.5a.75.75 0 0 0 1.09 0l4.25-4.5a.75.75 0 1 0-1.09-1.03l-2.955 3.129V2.75Z" />
      <path d="M3.5 12.75a.75.75 0 0 0-1.5 0v2.5A2.75 2.75 0 0 0 4.75 18h10.5A2.75 2.75 0 0 0 18 15.25v-2.5a.75.75 0 0 0-1.5 0v2.5c0 .69-.56 1.25-1.25 1.25H4.75c-.69 0-1.25-.56-1.25-1.25v-2.5Z" />
    </svg>
  );
}

export function BlogPostArticle({ post }: { post: WpPostWithSource }) {
  const isPolicy = postIsMainPolicy(post);
  const policiesListHref = MAIN_POLICIES_LIST_HREF;
  const dateLabel = formatPostDate(post.date);
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
    !isPolicy &&
    !isGenericFallback &&
    (hasAuthorOverride ||
      authorsForSection.some((author) => author.bio || author.linkedin || author.avatar));
  const bodyHtml = finalizeBlogBodyHtml(post.content.rendered, {
    stripAuthorsBio: showAuthorsSection && authorsForSection.some((author) => author.bio),
  });
  const excerptHtml = post.excerpt?.rendered?.trim() ?? "";
  const excerptPlain = excerptHtml ? cleanWpExcerptText(excerptHtml) : "";
  const showExcerpt =
    !isPolicy &&
    excerptPlain.length > 0 &&
    !excerptRepeatsBodyOpening(excerptHtml, bodyHtml);
  const minutes = estimateReadingMinutes(bodyHtml);
  const themeLabel = post.programLabel ?? post.theme?.trim() ?? null;
  const showAuthorByline = !isPolicy && !isGenericFallback;
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
          href={isPolicy ? policiesListHref : africaRoutes.blogs}
          className="group inline-flex items-center gap-2 rounded-full border border-stone-200/90 bg-white/90 px-4 py-2.5 text-sm font-medium text-stone-600 shadow-sm ring-1 ring-stone-950/5 transition-all hover:border-amber-300/80 hover:bg-amber-50/80 hover:text-stone-900 dark:border-zinc-800 dark:bg-zinc-900/90 dark:text-zinc-400 dark:ring-white/5 dark:hover:border-zinc-600 dark:hover:bg-zinc-800/80 dark:hover:text-zinc-100"
        >
          <span aria-hidden className="transition-transform group-hover:-translate-x-0.5">
            ←
          </span>
          {isPolicy ? "All policies" : "All posts"}
        </Link>
      </nav>

      <header className="relative">
        <p
          className={`text-[11px] font-semibold uppercase tracking-[0.32em] ${
            isPolicy
              ? "text-teal-700 dark:text-teal-400/90"
              : "text-amber-700 dark:text-amber-400/90"
          }`}
        >
          {isPolicy ? "Policy" : "Journal"}
        </p>

        <h1
          className="mt-6 text-balance text-3xl font-semibold leading-[1.12] tracking-tight text-stone-900 dark:text-zinc-50 sm:mt-8 sm:text-4xl sm:leading-[1.08] lg:text-[2.5rem]"
        >
          {stripHtml(post.title.rendered)}
        </h1>

        {isPolicy ? (
          <p className="mt-5 max-w-2xl text-base leading-relaxed text-stone-600 dark:text-zinc-400 sm:text-lg">
            {POLICY_DETAIL_SUBTITLE}
          </p>
        ) : (
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
        )}

        {post.slug === "rethinking-wash-governance-in-africa-insights-from-webinar-speaker-agbor" ? (
          <WebinarProgramSupportLine program="05" className="mt-5" />
        ) : null}

      </header>

      {showExcerpt ? (
        <p className="relative mt-10 border-l-[3px] border-amber-500/90 pl-5 text-lg font-medium leading-relaxed text-stone-700 dark:border-amber-400/80 dark:text-zinc-300">
          {excerptPlain}
        </p>
      ) : null}

      {isPolicy && post.downloadUrl ? (
        <div
          className={`rounded-2xl border border-teal-200/90 bg-teal-50/90 p-6 shadow-sm dark:border-teal-800/60 dark:bg-teal-950/40 sm:p-7 ${
            showExcerpt ? "mt-10" : "mt-12"
          }`}
        >
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-teal-800/80 dark:text-teal-300/80">
            Official document
          </p>
          <p className="mt-2 text-sm leading-relaxed text-stone-600 dark:text-zinc-400">
            Download the published policy as a PDF for offline reading or printing.
          </p>
          <a
            href={post.downloadUrl}
            download
            target="_blank"
            rel="noopener noreferrer"
            className="mt-5 inline-flex min-h-11 items-center justify-center gap-2 rounded-xl bg-teal-700 px-6 text-sm font-semibold text-white transition hover:bg-teal-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-teal-600"
          >
            <DownloadIcon />
            Download PDF
          </a>
        </div>
      ) : null}

      <div
        className={`blog-article-body rounded-2xl border border-stone-200/70 bg-white/50 px-5 py-8 shadow-inner shadow-stone-950/5 sm:rounded-3xl sm:px-8 sm:py-10 dark:border-zinc-800/70 dark:bg-zinc-950/35 dark:shadow-none ${
          showExcerpt ? "mt-10" : "mt-12"
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
          {!isPolicy ? (
            <>
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
            </>
          ) : null}

          <div className={isPolicy ? undefined : "mt-6"}>
            <BlogSharePanel title={titlePlain} fallbackPath={canonicalPath} />
          </div>
        </aside>
      </section>

      <footer className="relative mt-14 flex flex-col gap-4 border-t border-stone-200/80 pt-10 dark:border-zinc-800 sm:flex-row sm:items-center sm:justify-between">
        <Link
          href={isPolicy ? policiesListHref : africaRoutes.blogs}
          className={`inline-flex items-center gap-2 text-sm font-semibold transition ${
            isPolicy
              ? "text-teal-800 hover:text-teal-950 dark:text-teal-400 dark:hover:text-teal-200"
              : "text-amber-800 hover:text-amber-950 dark:text-amber-400 dark:hover:text-amber-200"
          }`}
        >
          <span aria-hidden>←</span>
          {isPolicy ? "Back to all policies" : "Back to all posts"}
        </Link>
        <p className="text-xs text-stone-500 dark:text-zinc-500">{titlePlain}</p>
      </footer>

      {!isPolicy ? (
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
      ) : null}

      <BlogEngagement slug={post.slug} source={post.source} title={titlePlain} />
    </article>
  );
}
