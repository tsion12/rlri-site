export type WpSource = "main" | "africa";
import { unstable_cache } from "next/cache";
import { request as httpsRequest } from "node:https";

export type AfricaProgramKey =
  | "oceans"
  | "digital-futures"
  | "climate"
  | "peacebuilding"
  | "health-systems-equity-social-transformation";

const AFRICA_PROGRAM_META: Record<AfricaProgramKey, { label: string; categoryId: number }> = {
  oceans: { label: "Oceans", categoryId: 44 },
  "digital-futures": { label: "Digital Futures", categoryId: 45 },
  climate: { label: "Climate Adaptation & Resilience", categoryId: 46 },
  peacebuilding: { label: "Peacebuilding & Inclusive Dialogues", categoryId: 47 },
  "health-systems-equity-social-transformation": {
    label: "Health Systems, Equity, and Social Transformation",
    categoryId: 49,
  },
};

/** Legacy WP category folded into the health systems program. */
const FOOD_ENVIRONMENT_CATEGORY_ID = 48;

export type WpPost = {
  id: number;
  slug: string;
  /** ISO 8601 from WordPress REST API */
  date: string;
  title: { rendered: string };
  content: { rendered: string };
  excerpt?: { rendered: string };
  featuredImage?: string | null;
  theme?: string | null;
  programKey?: AfricaProgramKey | null;
  programLabel?: string | null;
  authorName?: string | null;
  authorBio?: string | null;
  authorAvatar?: string | null;
  /** Set when main-site policy pipeline is enabled; optional until then. */
  isPolicy?: boolean;
  /** First PDF link in policy post content, when `isPolicy`. */
  downloadUrl?: string | null;
};

export type WpPostWithSource = WpPost & { source: WpSource };

export type WpPageHighlight = {
  title: string;
  excerpt: string;
  link: string;
  modified: string;
  featuredImage?: string | null;
  /** Set when the title/excerpt come from a parsed Elementor countdown block (scheduled event). */
  eventDateISO?: string | null;
};

type WpApiPost = Omit<WpPost, "featuredImage"> & {
  categories?: number[];
  _embedded?: {
    author?: Array<{
      name?: string;
      description?: string;
      avatar_urls?: Record<string, string>;
    }>;
    "wp:term"?: Array<
      Array<{
        id?: number;
        taxonomy?: string;
        name?: string;
        slug?: string;
      }>
    >;
  };
  yoast_head_json?: {
    og_image?: Array<{
      url?: string;
    }>;
  };
};

type WpApiPage = {
  title: { rendered: string };
  excerpt?: { rendered: string };
  content: { rendered: string };
  link: string;
  modified: string;
  yoast_head_json?: {
    og_image?: Array<{
      url?: string;
    }>;
  };
};

type WpApiCategory = {
  id: number;
  name?: string;
  slug?: string;
};

const API: Record<WpSource, string> = {
  main: "https://reallifeinstitute.org/wp-json/wp/v2",
  africa: "https://cms-programs.reallifeinstitute.org/wp-json/wp/v2",
};

const WP_REVALIDATE_SECONDS = 300;
const WP_TIMEOUT_MS = 12000;
const WP_POSTS_PER_PAGE = 50;
const WP_RETRY_DELAYS_MS = [350, 900];

export function sourceDisplay(source: WpSource): string {
  return source === "main" ? "Main" : "Africa";
}

export function isWpSource(s: string): s is WpSource {
  return s === "main" || s === "africa";
}

/**
 * Internal URL for a journal post. Encodes the slug so literal `%` (common on
 * some WP installs) and other reserved characters survive path parsing.
 */
export function blogPostPath(post: WpPostWithSource): string {
  return `/blog/${post.source}/${encodeURIComponent(post.slug)}`;
}

function decodeHtmlEntities(input: string): string {
  const namedEntities: Record<string, string> = {
    amp: "&",
    nbsp: " ",
    quot: '"',
    apos: "'",
    lt: "<",
    gt: ">",
    ndash: "–",
    mdash: "—",
  };

  return input
    .replace(/&#(\d+);/g, (_, dec: string) => {
      const codePoint = Number.parseInt(dec, 10);
      return Number.isNaN(codePoint) ? _ : String.fromCodePoint(codePoint);
    })
    .replace(/&#x([0-9a-fA-F]+);/g, (_, hex: string) => {
      const codePoint = Number.parseInt(hex, 16);
      return Number.isNaN(codePoint) ? _ : String.fromCodePoint(codePoint);
    })
    .replace(/&([a-zA-Z]+);/g, (_, name: string) => namedEntities[name] ?? _);
}

/** Plain text from WordPress HTML fields */
export function stripHtml(html: string): string {
  return decodeHtmlEntities(html.replace(/<[^>]*>/g, ""))
    .replace(/[–—−]/g, "-")
    .replace(/\s+/g, " ")
    .trim();
}

function decodeBasicEntities(input: string): string {
  return input
    .replaceAll("&amp;", "&")
    .replaceAll("&#038;", "&")
    .replaceAll("&quot;", '"')
    .replaceAll("&#039;", "'");
}

function normCategoryName(input: string): string {
  return decodeBasicEntities(input)
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, " ")
    .trim();
}

const CATEGORY_NAME_TO_PROGRAM = new Map<string, AfricaProgramKey>([
  ["oceans", "oceans"],
  ["ocean maritime", "oceans"],
  ["digital futures", "digital-futures"],
  ["technology society", "digital-futures"],
  ["climate adaptation resilience", "climate"],
  ["environment resilience", "climate"],
  ["peacebuilding inclusive dialogues", "peacebuilding"],
  ["peace civil society", "peacebuilding"],
  ["food environment and natural resources", "health-systems-equity-social-transformation"],
  ["food systems environment", "health-systems-equity-social-transformation"],
  ["health systems equity and social transformation", "health-systems-equity-social-transformation"],
  ["health systems", "health-systems-equity-social-transformation"],
  ["public health", "health-systems-equity-social-transformation"],
]);

const GENERIC_CATEGORY_NAMES = new Set([
  "uncategorized",
  "blog",
  "blog ap",
  "stories ap",
  "stories africa",
  "publication",
  "policy",
  "policies africa",
  "research",
  "development",
]);

function parseAfricaProgramFromCategories(
  categories: Array<{ id?: number; name: string }>,
): AfricaProgramKey | null {
  for (const cat of categories) {
    if (typeof cat.id === "number") {
      if (cat.id === FOOD_ENVIRONMENT_CATEGORY_ID) {
        return "health-systems-equity-social-transformation";
      }
      const key = (Object.keys(AFRICA_PROGRAM_META) as AfricaProgramKey[]).find(
        (k) => AFRICA_PROGRAM_META[k].categoryId === cat.id,
      );
      if (key) return key;
    }
  }
  for (const cat of categories) {
    const key = CATEGORY_NAME_TO_PROGRAM.get(normCategoryName(cat.name));
    if (key) return key;
  }
  return null;
}

function normalizePost(source: WpSource, post: WpApiPost): WpPostWithSource {
  const terms = post._embedded?.["wp:term"] ?? [];
  const allTerms = terms.flatMap((group) => group ?? []);
  const author = post._embedded?.author?.[0];
  const avatarCandidates = author?.avatar_urls ? Object.values(author.avatar_urls) : [];
  const categories = allTerms
    .filter((term) => term.taxonomy === "category" && term.name && term.name.trim().length > 0)
    .map((term) => ({ id: term.id, name: decodeBasicEntities(term.name!.trim()) }));
  const programKey = source === "africa" ? parseAfricaProgramFromCategories(categories) : null;
  const programLabel = programKey ? AFRICA_PROGRAM_META[programKey].label : null;
  const category = categories.find((cat) => !GENERIC_CATEGORY_NAMES.has(normCategoryName(cat.name)));

  return {
    id: post.id,
    slug: post.slug,
    date: post.date,
    title: post.title,
    content: post.content ?? { rendered: "" },
    excerpt: post.excerpt,
    featuredImage: post.yoast_head_json?.og_image?.[0]?.url ?? null,
    theme: programLabel ?? category?.name?.trim() ?? null,
    programKey,
    programLabel,
    authorName: author?.name?.trim() ?? null,
    authorBio: author?.description?.trim() ?? null,
    authorAvatar: avatarCandidates[0] ?? null,
    source,
  };
}

const AFRICA_PROGRAM_QUERY_VALUES: Record<AfricaProgramKey, string[]> = {
  oceans: ["oceans", "ocean", "ocean-maritime"],
  "digital-futures": ["digital-futures", "digital", "technology-society"],
  climate: ["climate", "climate-adaptation-resilience", "environment-resilience"],
  peacebuilding: ["peacebuilding", "peacebuilding-inclusive-dialogues", "peace-civil-society"],
  "health-systems-equity-social-transformation": [
    "health-systems-equity-social-transformation",
    "health-systems",
    "health-equity",
    "food-environment-natural-resources",
    "food-environment",
    "food-systems-environment",
  ],
};

export function parseAfricaProgram(value: string | null | undefined): AfricaProgramKey | null {
  if (!value) return null;
  const v = value.trim().toLowerCase();
  const keys = Object.keys(AFRICA_PROGRAM_QUERY_VALUES) as AfricaProgramKey[];
  for (const key of keys) {
    if (AFRICA_PROGRAM_QUERY_VALUES[key].includes(v)) return key;
  }
  return null;
}

export function getAfricaProgramLabel(program: AfricaProgramKey): string {
  return AFRICA_PROGRAM_META[program].label;
}

export function postMatchesAfricaProgram(post: WpPostWithSource, program: AfricaProgramKey): boolean {
  if (post.source !== "africa") return false;
  if (post.programKey) return post.programKey === program;
  if (post.programLabel) return getAfricaProgramLabel(program) === post.programLabel;
  return false;
}

async function fetchJsonViaHttpsIpv4<T>(url: string): Promise<T | null> {
  return new Promise((resolve) => {
    const req = httpsRequest(
      url,
      {
        family: 4,
        timeout: WP_TIMEOUT_MS,
        headers: { accept: "application/json" },
      },
      (res) => {
        if (!res.statusCode || res.statusCode < 200 || res.statusCode >= 300) {
          res.resume();
          resolve(null);
          return;
        }
        let raw = "";
        res.setEncoding("utf8");
        res.on("data", (chunk) => {
          raw += chunk;
        });
        res.on("end", () => {
          try {
            resolve(JSON.parse(raw) as T);
          } catch {
            resolve(null);
          }
        });
      },
    );

    req.on("timeout", () => {
      req.destroy(new Error("timeout"));
    });
    req.on("error", () => {
      resolve(null);
    });
    req.end();
  });
}

function sleep(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

async function fetchWithRetry(url: string): Promise<Response | null> {
  for (let attempt = 0; attempt <= WP_RETRY_DELAYS_MS.length; attempt += 1) {
    try {
      const res = await fetch(url, {
        next: { revalidate: WP_REVALIDATE_SECONDS },
      });
      if (res.ok) return res;

      // Retry transient infra/CMS responses like 5xx/429/408.
      if (![408, 429].includes(res.status) && (res.status < 500 || res.status >= 600)) {
        return null;
      }
    } catch {
      // handled below by IPv4 fallback and retry delay
    }

    if (attempt < WP_RETRY_DELAYS_MS.length) {
      await sleep(WP_RETRY_DELAYS_MS[attempt]);
    }
  }
  return null;
}

async function wpFetchJson<T>(url: string): Promise<T | null> {
  const res = await fetchWithRetry(url);
  if (res?.ok) {
    try {
      return (await res.json()) as T;
    } catch {
      return null;
    }
  }
  // Fallback path for environments where undici fetch intermittently times out
  // on dual-stack DNS routes; forcing IPv4 is typically more reliable.
  return fetchJsonViaHttpsIpv4<T>(url);
}

async function wpFetchJsonWithAfricaFallback<T>(url: string): Promise<T | null> {
  return wpFetchJson<T>(url);
}

async function fetchPostsForSource(source: WpSource): Promise<WpPostWithSource[]> {
  const url = new URL(`${API[source]}/posts`);
  url.searchParams.set("per_page", String(WP_POSTS_PER_PAGE));
  url.searchParams.set("_embed", "author,wp:term");
  const posts = source === "africa"
    ? await wpFetchJsonWithAfricaFallback<WpApiPost[]>(url.toString())
    : await wpFetchJson<WpApiPost[]>(url.toString());
  if (!Array.isArray(posts)) return [];
  return posts.map((p) => normalizePost(source, p));
}

/** Merged posts from both WordPress sites. If one site fails, posts from the other are still returned. */
export async function getPosts(): Promise<WpPostWithSource[]> {
  const [mainPosts, africaPosts] = await Promise.all([
    fetchPostsForSource("main"),
    fetchPostsForSource("africa"),
  ]);
  return [...mainPosts, ...africaPosts];
}

/** Category IDs on the Africa Programs WordPress site. */
const AFRICA_CAT = {
  blogAp: 42,     // Legacy "Blog AP" ID; fallback by category name/slug is applied.
  storiesAp: 43,  // Legacy "Stories AP" ID; fallback by category name/slug is applied.
} as const;

const BLOG_AP_CATEGORY_NAMES = new Set(["blog ap"]);
const STORIES_AP_CATEGORY_NAMES = new Set(["stories ap"]);
const AFRICA_CATEGORY_PAGE_SIZE = 100;
const AFRICA_POST_MAX_PAGES = 4;
const africaCategoryIdCache = new Map<string, number | null>();

async function fetchAfricaPostsRaw(
  categoryId?: number,
  options?: { perPage?: number; maxPages?: number },
): Promise<WpApiPost[]> {
  const perPage = options?.perPage ?? 50;
  const maxPages = options?.maxPages ?? AFRICA_POST_MAX_PAGES;
  const all: WpApiPost[] = [];
  for (let page = 1; page <= maxPages; page += 1) {
    const url = new URL(`${API.africa}/posts`);
    if (typeof categoryId === "number") {
      url.searchParams.set("categories", String(categoryId));
    }
    url.searchParams.set("per_page", String(perPage));
    url.searchParams.set("page", String(page));
    url.searchParams.set("_fields", "id,slug,date,title,excerpt,categories,yoast_head_json");
    url.searchParams.set("_embed", "author,wp:term");
    const posts = await wpFetchJsonWithAfricaFallback<WpApiPost[]>(url.toString());
    if (!Array.isArray(posts) || posts.length === 0) break;
    all.push(...posts);
    if (posts.length < perPage) break;
  }
  return dedupePosts(all);
}

function dedupePosts(posts: WpApiPost[]) {
  const seen = new Set<number>();
  return posts.filter((post) => {
    if (seen.has(post.id)) return false;
    seen.add(post.id);
    return true;
  });
}

async function fetchAfricaCategories(): Promise<WpApiCategory[]> {
  const all: WpApiCategory[] = [];
  for (let page = 1; page <= AFRICA_POST_MAX_PAGES; page += 1) {
    const url = new URL(`${API.africa}/categories`);
    url.searchParams.set("per_page", String(AFRICA_CATEGORY_PAGE_SIZE));
    url.searchParams.set("page", String(page));
    const categories = await wpFetchJsonWithAfricaFallback<WpApiCategory[]>(url.toString());
    if (!Array.isArray(categories) || categories.length === 0) break;
    all.push(...categories);
    if (categories.length < AFRICA_CATEGORY_PAGE_SIZE) break;
  }
  return all;
}

function categoryMatchesNames(category: WpApiCategory, names: ReadonlySet<string>) {
  const normalizedName = category.name ? normCategoryName(category.name) : "";
  const normalizedSlug = category.slug ? normCategoryName(category.slug) : "";
  return names.has(normalizedName) || names.has(normalizedSlug);
}

async function lookupAfricaCategoryId(primaryId: number, names: ReadonlySet<string>): Promise<number | null> {
  const cacheKey = `${primaryId}:${Array.from(names).sort().join(",")}`;
  if (africaCategoryIdCache.has(cacheKey)) {
    return africaCategoryIdCache.get(cacheKey) ?? null;
  }

  const categories = await fetchAfricaCategories();
  if (categories.length === 0) {
    africaCategoryIdCache.set(cacheKey, primaryId);
    return primaryId;
  }

  const hasPrimary = categories.some((category) => category.id === primaryId);
  if (hasPrimary) {
    africaCategoryIdCache.set(cacheKey, primaryId);
    return primaryId;
  }

  const matched = categories.find((category) => categoryMatchesNames(category, names));
  const resolved = matched?.id ?? null;
  africaCategoryIdCache.set(cacheKey, resolved);
  return resolved;
}

async function fetchAfricaPostsForCategory(
  primaryId: number,
  names: ReadonlySet<string>,
  options?: { perPage?: number; maxPages?: number },
): Promise<WpApiPost[]> {
  const perPage = options?.perPage ?? 50;
  const maxPages = options?.maxPages ?? AFRICA_POST_MAX_PAGES;
  let posts = await fetchAfricaPostsRaw(primaryId, { perPage, maxPages });
  if (posts.length > 0) return posts;

  const altId = await lookupAfricaCategoryId(primaryId, names);
  if (altId && altId !== primaryId) {
    posts = await fetchAfricaPostsRaw(altId, { perPage, maxPages });
  }
  return posts;
}

/** Africa "Blog-AP" category posts, newest first. Safe on fetch failure (empty list). */
async function getAfricaPostsUncached(): Promise<WpPostWithSource[]> {
  const posts = await fetchAfricaPostsForCategory(AFRICA_CAT.blogAp, BLOG_AP_CATEGORY_NAMES);
  return posts
    .map((p) => normalizePost("africa", p))
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
}

export async function getAfricaPosts(): Promise<WpPostWithSource[]> {
  const posts = await unstable_cache(getAfricaPostsUncached, ["africa-posts"], {
    revalidate: WP_REVALIDATE_SECONDS,
  })();
  // Avoid serving a stale empty list from a prior CMS outage.
  if (posts.length === 0) return getAfricaPostsUncached();
  return posts;
}

/** Quick health probe to distinguish an empty feed from a CMS outage. */
export async function isAfricaWpAvailable(): Promise<boolean> {
  return unstable_cache(
    async () => {
      const url = new URL(`${API.africa}/posts`);
      url.searchParams.set("per_page", "1");
      url.searchParams.set("_fields", "id");
      const posts = await wpFetchJsonWithAfricaFallback<Array<{ id: number }>>(url.toString());
      return Array.isArray(posts);
    },
    ["africa-wp-health"],
    { revalidate: 60 },
  )();
}

/** Lightweight fetch for homepage cards — one CMS request, small payload. */
async function getAfricaPostsPreviewUncached(limit: number): Promise<WpPostWithSource[]> {
  const posts = await fetchAfricaPostsForCategory(AFRICA_CAT.blogAp, BLOG_AP_CATEGORY_NAMES, {
    perPage: Math.min(Math.max(limit, 1), 20),
    maxPages: 1,
  });
  return posts
    .map((p) => normalizePost("africa", p))
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
    .slice(0, limit);
}

export async function getAfricaPostsPreview(limit = 3): Promise<WpPostWithSource[]> {
  return unstable_cache(() => getAfricaPostsPreviewUncached(limit), ["africa-posts-preview", String(limit)], {
    revalidate: WP_REVALIDATE_SECONDS,
  })();
}

/** Africa "Stories-AP" category posts, newest first. Safe on fetch failure (empty list). */
async function getAfricaStoriesUncached(): Promise<WpPostWithSource[]> {
  const posts = await fetchAfricaPostsForCategory(AFRICA_CAT.storiesAp, STORIES_AP_CATEGORY_NAMES);
  return posts
    .map((p) => normalizePost("africa", p))
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
}

export async function getAfricaStories(): Promise<WpPostWithSource[]> {
  return unstable_cache(getAfricaStoriesUncached, ["africa-stories"], {
    revalidate: WP_REVALIDATE_SECONDS,
  })();
}

/** Newest first, merged from both sites. Safe on fetch failure (empty list). */
export async function getLatestPosts(limit = 6): Promise<WpPostWithSource[]> {
  try {
    const posts = await getPosts();
    return posts
      .filter((p) => p.date)
      .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
      .slice(0, limit);
  } catch {
    return [];
  }
}

export async function getPost(
  source: WpSource,
  slug: string,
): Promise<WpPostWithSource | null> {
  const url = new URL(`${API[source]}/posts`);
  url.searchParams.set("slug", slug);
  url.searchParams.set("_embed", "author,wp:term");

  const posts = source === "africa"
    ? await wpFetchJsonWithAfricaFallback<WpApiPost[]>(url.toString())
    : await wpFetchJson<WpApiPost[]>(url.toString());
  if (!Array.isArray(posts)) return null;
  const post = posts[0];
  if (!post) return null;

  return normalizePost(source, post);
}

/** Headings that are UI chrome, not webinar titles (Elementor / ElementsKit). */
const ELEMENTOR_TITLE_SKIP =
  /^(venue|access the virtual webinar|connect via google meet|next webinar)$/i;

type ParsedCountdownEvent = {
  title: string;
  excerpt: string;
  at: Date;
};

/**
 * Parse ElementsKit countdown widgets and associated titles from the upcoming-events page HTML.
 */
function parseElementorCountdownEvents(html: string): ParsedCountdownEvent[] {
  const results: ParsedCountdownEvent[] = [];
  const countdownRe = /data-ekit-countdown="([^"]+)"/g;
  let m: RegExpExecArray | null;
  while ((m = countdownRe.exec(html)) !== null) {
    const pos = m.index;
    const dateStr = m[1].trim();
    const before = html.slice(0, pos);

    const titleMatches = [
      ...before.matchAll(/class="ekit-heading--title[^"]*"[^>]*>([^<]+)<\/h2>/gi),
    ].map((x) => stripHtml(x[1]).trim());
    const titles = titleMatches.filter(
      (t) => t.length >= 12 && !ELEMENTOR_TITLE_SKIP.test(t),
    );
    const title = titles[titles.length - 1];
    if (!title) continue;

    const isoLike = dateStr.includes("T") ? dateStr : dateStr.replace(" ", "T");
    const at = new Date(isoLike);
    if (Number.isNaN(at.getTime())) continue;

    const descMatch = [...before.matchAll(/<div[^>]*ekit-heading__description[^>]*>([\s\S]*?)<\/div>/gi)];
    const rawDesc = descMatch.length > 0 ? descMatch[descMatch.length - 1][1] : "";
    const excerpt = stripHtml(rawDesc).slice(0, 280).trim();

    results.push({ title, excerpt, at });
  }
  return results;
}

/**
 * Prefer the next upcoming event (soonest at/after start of today). If none, use the most recent past event.
 */
function pickHeroCountdownEvent(events: ParsedCountdownEvent[]): ParsedCountdownEvent | null {
  if (events.length === 0) return null;
  const start = new Date();
  start.setHours(0, 0, 0, 0);
  const startMs = start.getTime();

  const upcoming = events.filter((e) => e.at.getTime() >= startMs);
  if (upcoming.length > 0) {
    return upcoming.sort((a, b) => a.at.getTime() - b.at.getTime())[0];
  }
  return events.sort((a, b) => b.at.getTime() - a.at.getTime())[0];
}

/**
 * Returns the Africa upcoming-events page, with the hero preferring the most relevant parsed webinar
 * (ElementsKit countdown + heading) when present.
 */
async function getUpcomingEventsPageUncached(): Promise<WpPageHighlight | null> {
  const url = new URL(`${API.africa}/pages`);
  url.searchParams.set("slug", "upcoming-events");

  const pages = await wpFetchJsonWithAfricaFallback<WpApiPage[]>(url.toString());
  if (!Array.isArray(pages) || pages.length === 0) return null;

  const candidates = pages.map((page) => {
    const parsed = parseElementorCountdownEvents(page.content.rendered);
    const selected = pickHeroCountdownEvent(parsed);
    return { page, selected };
  });

  const now = new Date();
  now.setHours(0, 0, 0, 0);
  const todayMs = now.getTime();

  const withUpcoming = candidates
    .filter((c) => c.selected && c.selected.at.getTime() >= todayMs)
    .sort((a, b) => a.selected!.at.getTime() - b.selected!.at.getTime());

  const withAnyEvent = candidates
    .filter((c) => c.selected)
    .sort((a, b) => b.selected!.at.getTime() - a.selected!.at.getTime());

  const preferredCandidate =
    withUpcoming[0] ??
    withAnyEvent[0] ??
    (candidates.find((c) => c.page.link.includes("/events/upcoming-events/")) ??
      [...candidates].sort(
        (a, b) => new Date(b.page.modified).getTime() - new Date(a.page.modified).getTime(),
      )[0]);

  const preferred = preferredCandidate.page;
  const selected = preferredCandidate.selected;

  const rawPageExcerpt = preferred.excerpt?.rendered || preferred.content.rendered;
  const pageExcerpt = stripHtml(rawPageExcerpt).slice(0, 220).trim();

  const pageTitle = stripHtml(preferred.title.rendered) || "Upcoming Events";

  if (selected) {
    return {
      title: selected.title,
      excerpt: selected.excerpt || pageExcerpt,
      link: preferred.link,
      modified: preferred.modified,
      featuredImage: preferred.yoast_head_json?.og_image?.[0]?.url ?? null,
      eventDateISO: selected.at.toISOString(),
    };
  }

  return {
    title: pageTitle,
    excerpt: pageExcerpt,
    link: preferred.link,
    modified: preferred.modified,
    featuredImage: preferred.yoast_head_json?.og_image?.[0]?.url ?? null,
    eventDateISO: null,
  };
}

export async function getUpcomingEventsPage(): Promise<WpPageHighlight | null> {
  return unstable_cache(getUpcomingEventsPageUncached, ["africa-upcoming-events"], {
    revalidate: WP_REVALIDATE_SECONDS,
  })();
}

/** True for main-site policy detail pages when `isPolicy` is set on the post. */
export function postIsMainPolicy(
  post: Pick<WpPostWithSource, "source"> & { isPolicy?: boolean },
): boolean {
  return post.source === "main" && post.isPolicy === true;
}
