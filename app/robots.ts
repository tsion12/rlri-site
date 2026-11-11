import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/site";

/** Routes kept out of search and AI crawlers (also noindexed via headers). */
const DISALLOW = ["/internal/", "/api/"];

/**
 * AI assistant and search crawlers we explicitly welcome. Listing them by name
 * (in addition to the `*` rule) makes our intent unambiguous for GEO: we want
 * these assistants to crawl, understand, and cite the site.
 */
const ALLOWED_AI_AND_SEARCH_BOTS = [
  "GPTBot",
  "OAI-SearchBot",
  "ChatGPT-User",
  "ClaudeBot",
  "Claude-SearchBot",
  "Claude-User",
  "PerplexityBot",
  "Google-Extended",
  "Googlebot",
  "Bingbot",
];

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: DISALLOW,
      },
      {
        userAgent: ALLOWED_AI_AND_SEARCH_BOTS,
        allow: "/",
        disallow: DISALLOW,
      },
    ],
    sitemap: `${SITE_URL}/sitemap.xml`,
    host: SITE_URL,
  };
}
