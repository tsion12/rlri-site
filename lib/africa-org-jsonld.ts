import { SITE_URL, absoluteUrl } from "@/lib/site";

/**
 * schema.org Organization markup for the RLRI Africa Program (this site). Kept
 * in one place so the homepage and any publisher references stay consistent.
 * Facts are deliberate and verifiable — no invented URLs. `sameAs` mirrors the
 * social links in the site footer (components/africa/AfricaFooter.tsx).
 */
export const AFRICA_ORG_ID = `${SITE_URL}/#organization`;

const PARENT_ORG_URL = "https://reallifeinstitute.org";

const AREA_SERVED = [
  "Kenya",
  "Zimbabwe",
  "Ethiopia",
  "Cameroon",
  "Nigeria",
  "Ghana",
  "Morocco",
  "South Africa",
  "Democratic Republic of the Congo",
  "Sierra Leone",
];

const SAME_AS = [
  "https://www.instagram.com/rlri.africaprogram/",
  "https://x.com/rlri_africa",
  "https://www.linkedin.com/showcase/rlri-africa-program/",
  "https://www.facebook.com/profile.php?id=61587409661285",
  "https://www.youtube.com/@RealLifeResearchInstitute",
];

/** Organization node without `@context`, for embedding inside other markup. */
export function africaOrganizationNode() {
  return {
    "@type": "Organization",
    "@id": AFRICA_ORG_ID,
    name: "RLRI Africa Program",
    alternateName: "Real Life Research Institute Africa Program",
    url: SITE_URL,
    email: "contact-africa@reallifeinstitute.org",
    logo: absoluteUrl("/assets/RLRL-AP-Logo.png"),
    parentOrganization: {
      "@type": "Organization",
      name: "Real Life Research Institute",
      url: PARENT_ORG_URL,
    },
    areaServed: AREA_SERVED.map((name) => ({ "@type": "Country", name })),
    sameAs: SAME_AS,
  };
}

/** Standalone Organization markup (with `@context`) for the homepage. */
export function africaOrganizationJsonLd() {
  return { "@context": "https://schema.org", ...africaOrganizationNode() };
}
