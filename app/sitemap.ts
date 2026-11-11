import type { MetadataRoute } from "next";
import { absoluteUrl } from "@/lib/site";
import { africaRoutes } from "@/lib/africa-routes";
import { getAfricaWebinarEvents } from "@/lib/africa-events";
import { blogPostPath, getAfricaPosts } from "@/lib/wp";

/** Public, indexable routes. Gated (/africa/learn), internal, and dynamic
 * filter/query routes are intentionally excluded. */
const STATIC_PATHS: string[] = [
  "/",
  "/africa",
  africaRoutes.about,
  africaRoutes.team,
  africaRoutes.volunteers,
  africaRoutes.career,
  africaRoutes.programs,
  africaRoutes.events,
  africaRoutes.publications,
  africaRoutes.blogs,
  africaRoutes.stories,
  africaRoutes.policyBriefs,
  "/africa/publications/peer-reviewed-papers",
  africaRoutes.faq,
  africaRoutes.donate,
  "/africa/get-involved/donations",
  "/blog",
];

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const now = new Date();

  const staticEntries: MetadataRoute.Sitemap = STATIC_PATHS.map((path) => ({
    url: absoluteUrl(path),
    lastModified: now,
    changeFrequency: path === africaRoutes.events || path === "/blog" ? "weekly" : "monthly",
    priority: path === "/" ? 1 : path === africaRoutes.events ? 0.9 : 0.6,
  }));

  const eventEntries: MetadataRoute.Sitemap = getAfricaWebinarEvents()
    .filter((event) => event.href.startsWith(`${africaRoutes.events}/`))
    .map((event) => ({
      url: absoluteUrl(event.href),
      lastModified: new Date(event.isoDate),
      changeFrequency: "monthly",
      priority: 0.7,
    }));

  // Individual blog/journal posts come from the headless WordPress CMS. If the
  // CMS is unreachable we fall back to the static + event entries rather than
  // failing the whole sitemap (mirrors the blog page's graceful degradation).
  let postEntries: MetadataRoute.Sitemap = [];
  try {
    const posts = await getAfricaPosts();
    postEntries = posts.map((post) => ({
      url: absoluteUrl(blogPostPath(post)),
      lastModified: post.modified ? new Date(post.modified) : new Date(post.date),
      changeFrequency: "monthly",
      priority: 0.6,
    }));
  } catch {
    postEntries = [];
  }

  return [...staticEntries, ...eventEntries, ...postEntries];
}
