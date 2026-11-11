import type { Metadata } from "next";

const SITE_NAME = "RLRI Africa Program · Real Life Research Institute";
const DEFAULT_OG_IMAGE = {
  url: "/assets/RLRL-AP-Logo.png",
  width: 1600,
  height: 900,
  alt: SITE_NAME,
};

/**
 * Shared metadata for an event detail page: canonical URL plus Open Graph and
 * Twitter cards, built from the page's own title and description.
 */
export function eventDetailMetadata({
  title,
  description,
  path,
}: {
  title: string;
  description: string;
  path: string;
}): Metadata {
  return {
    title,
    description,
    alternates: { canonical: path },
    openGraph: {
      type: "article",
      url: path,
      siteName: SITE_NAME,
      title,
      description,
      images: [DEFAULT_OG_IMAGE],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [DEFAULT_OG_IMAGE.url],
    },
  };
}
