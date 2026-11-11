import { absoluteUrl } from "@/lib/site";
import { AFRICA_ORG_ID, africaOrganizationNode } from "@/lib/africa-org-jsonld";
import { blogPostPath, stripHtml, type WpPostWithSource } from "@/lib/wp";

/** Named human author(s) for the byline, as resolved by the article component. */
export type BlogJsonLdAuthor = { name: string; linkedin?: string };

/**
 * schema.org Article markup for a blog/journal post. Only fields backed by real
 * post data are emitted: named Person author(s) when the post has an attributed
 * byline (otherwise the publishing Organization), an image only when a featured
 * image exists, and dateModified only when the CMS returns it.
 */
export function blogArticleJsonLd(post: WpPostWithSource, authors?: BlogJsonLdAuthor[] | null) {
  const url = absoluteUrl(blogPostPath(post));
  const headline = stripHtml(post.title.rendered);
  const description =
    (post.excerpt?.rendered
      ? stripHtml(post.excerpt.rendered)
      : stripHtml(post.content.rendered)
    )
      .slice(0, 300)
      .trim() || undefined;

  // Prefer the named byline the page resolved; fall back to the Organization.
  // The generic CMS account name is not emitted as a Person.
  const people = (authors ?? [])
    .map((a) => a.name.trim())
    .filter(Boolean)
    .map((name, index) => {
      const linkedin = authors?.[index]?.linkedin?.trim();
      return {
        "@type": "Person",
        name,
        ...(linkedin ? { sameAs: [linkedin] } : {}),
      };
    });
  const author = people.length
    ? people.length === 1
      ? people[0]
      : people
    : { "@id": AFRICA_ORG_ID };

  const data: Record<string, unknown> = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline,
    description,
    datePublished: post.date,
    dateModified: post.modified || post.date,
    author,
    publisher: africaOrganizationNode(),
    mainEntityOfPage: { "@type": "WebPage", "@id": url },
    url,
  };

  if (post.featuredImage) {
    data.image = [post.featuredImage];
  }

  return data;
}
