import { parse, type HTMLElement } from "node-html-parser";
import { applyFigureSources } from "./blog-figure-sources";

function normalizeText(s: string): string {
  return s.replace(/\u00a0/g, " ").replace(/\s+/g, " ").trim();
}

/** Headings used by Elementor / ElementsKit for the reusable “focus” strip. */
function isFocusSectionHeading(t: string): boolean {
  if (t.length > 120) return false;
  const lower = t.toLowerCase();
  if (/^where\s+we\s+focus/.test(lower)) return true;
  if (/^our\s+focus\s+areas?/.test(lower)) return true;
  if (/^focus\s+areas?$/.test(lower)) return true;
  return false;
}

const FOCUS_PHRASE = /where\s+we\s+focus|our\s+focus\s+areas?/i;

/** Prefer removing an Elementor container/section; avoid nuking the whole post. */
function removeElementorFocusBlock(from: HTMLElement): boolean {
  let cur: HTMLElement | null = from;
  const candidates: HTMLElement[] = [];

  for (let depth = 0; depth < 45 && cur; depth++) {
    const cls = cur.getAttribute("class") || "";
    if (cls.includes("elementor-element")) {
      candidates.push(cur);
    }
    cur = cur.parentNode as HTMLElement | null;
  }

  if (candidates.length === 0) {
    return false;
  }

  const outer = candidates[candidates.length - 1];
  const outerLen = (outer.textContent || "").length;
  if (outerLen < 14000) {
    outer.remove();
    return true;
  }

  for (const el of candidates) {
    const cls = el.getAttribute("class") || "";
    const elType = el.getAttribute("data-element_type");
    const len = (el.textContent || "").length;
    if (len > 9000) continue;
    if (
      elType === "container" ||
      cls.includes("e-con") ||
      cls.includes("e-flex") ||
      cls.includes("elementor-top-section") ||
      (cls.includes("elementor-section") && cls.includes("elementor-element"))
    ) {
      el.remove();
      return true;
    }
  }

  const inner = candidates[0];
  if ((inner.textContent || "").length < 9000) {
    inner.remove();
    return true;
  }

  return false;
}

/** Strip by heading / widget title nodes (Elementor + ElementsKit class names). */
function stripByHeadingNodes(html: string): string {
  if (!html || !FOCUS_PHRASE.test(html)) return html;

  const root = parse(html);
  const selectors = [
    "h1",
    "h2",
    "h3",
    "h4",
    "h5",
    "h6",
    ".elementor-heading-title",
    "[class*='elementskit-section-title']",
    "[class*='ekit-heading--title']",
  ].join(",");

  for (const node of root.querySelectorAll(selectors)) {
    const t = normalizeText(node.textContent || "");
    if (!isFocusSectionHeading(t)) continue;
    if (removeElementorFocusBlock(node as HTMLElement)) continue;
    (node as HTMLElement).remove();
  }

  /* Plain <p> used as a faux heading in some templates */
  for (const p of root.querySelectorAll("p")) {
    const t = normalizeText(p.textContent || "");
    if (t.length > 90) continue;
    if (!isFocusSectionHeading(t)) continue;
    if (removeElementorFocusBlock(p as HTMLElement)) continue;
    (p as HTMLElement).remove();
  }

  return root.toString();
}

/** Strip Elementor heading widgets whose text matches (nested spans). */
function stripWidgetHeadingWidgets(html: string): string {
  if (!html || !FOCUS_PHRASE.test(html)) return html;

  const root = parse(html);
  for (const el of root.querySelectorAll(".elementor-widget-heading")) {
    const t = normalizeText(el.textContent || "");
    if (!isFocusSectionHeading(t)) continue;
    if (removeElementorFocusBlock(el as HTMLElement)) continue;
    (el as HTMLElement).remove();
  }
  return root.toString();
}

/**
 * Last resort: remove the largest elementor subtree that contains the focus phrase but is
 * unlikely to be the full article (phrase early enough, size cap).
 */
function stripLargestElementorBlockWithPhrase(html: string): string {
  if (!html || !FOCUS_PHRASE.test(html)) return html;

  const root = parse(html);
  let best: HTMLElement | null = null;
  let bestLen = 0;

  for (const el of root.querySelectorAll("[class*='elementor-element']")) {
    const text = el.textContent || "";
    if (!FOCUS_PHRASE.test(text)) continue;
    const len = text.length;
    if (len > 16000) continue;
    const idx = text.search(FOCUS_PHRASE);
    if (idx === -1) continue;
    if (len > 8000 && idx > 700) continue;
    if (len <= 8000 && idx > 2500) continue;
    if (len > bestLen) {
      bestLen = len;
      best = el as HTMLElement;
    }
  }

  if (best && bestLen > 150) {
    best.remove();
  }

  return root.toString();
}

/**
 * Removes WordPress/Elementor “Where we focus” (and variants) from `post.content.rendered`.
 * Run server-side before injecting HTML into the article body.
 * If stripping would remove more than 35% of the HTML, returns the original string (the
 * phrase can appear inside the article body, not only in chrome).
 */
const MAX_STRIP_FRACTION = 0.35;

/** Regex fallback when the HTML parser misses malformed WP script tags. */
function stripScriptTagsRegex(html: string): string {
  if (!html) return html;
  return html
    .replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, "")
    .replace(/<script\b[^>]*\/?>/gi, "")
    .replace(/<noscript\b[^<]*(?:(?!<\/noscript>)<[^<]*)*<\/noscript>/gi, "")
    .replace(/<noscript\b[^>]*\/?>/gi, "");
}

function stripInlineEventHandlers(html: string): string {
  if (!html) return html;
  return html.replace(/\s+on[a-z]+\s*=\s*(".*?"|'.*?'|[^\s>]+)/gi, "");
}

/**
 * Remove executable/non-article tags that should never be rendered inside post body HTML.
 * This keeps React client rendering safe and avoids script-tag runtime warnings.
 */
function stripUnsafeBodyTags(html: string): string {
  if (!html) return html;
  const root = parse(stripScriptTagsRegex(html));
  for (const node of root.querySelectorAll("script, noscript, iframe, object, embed, template")) {
    (node as HTMLElement).remove();
  }
  for (const link of root.querySelectorAll("link")) {
    const rel = (link.getAttribute("rel") || "").toLowerCase();
    const as = (link.getAttribute("as") || "").toLowerCase();
    if (rel === "preload" && as === "script") {
      (link as HTMLElement).remove();
    }
  }
  let out = stripInlineEventHandlers(root.toString());
  out = stripScriptTagsRegex(out);
  return out;
}

const AUTHORS_BIO_HEADING = /^authors?\s*['’]?\s*bio$/i;

/** Remove embedded “Authors' Bio” blocks from WP body when we render a dedicated section. */
export function stripEmbeddedAuthorsBio(html: string): string {
  if (!html || !/authors?\s*['’]?\s*bio/i.test(html)) return html;

  const root = parse(html);

  for (const el of root.querySelectorAll("h2, h3, h4, h5, h6, strong, b")) {
    const text = normalizeText(el.textContent || "");
    if (!AUTHORS_BIO_HEADING.test(text)) continue;

    let cursor: HTMLElement | null = el as HTMLElement;
    const parent = el.parentNode as HTMLElement | null;
    if (parent && (parent.tagName === "P" || parent.tagName === "DIV")) {
      cursor = parent;
    }

    while (cursor) {
      const next = cursor.nextSibling;
      cursor.remove();
      cursor = next as HTMLElement | null;
    }
    break;
  }

  return stripUnsafeBodyTags(root.toString());
}

/** Full blog body pipeline: WP cleanup, optional authors-bio removal, then hardening. */
export function finalizeBlogBodyHtml(
  html: string,
  options?: { stripAuthorsBio?: boolean; slug?: string },
): string {
  let out = stripBlogWordPressHtml(html);
  if (options?.stripAuthorsBio) {
    out = stripEmbeddedAuthorsBio(out);
  }
  if (options?.slug) {
    out = applyFigureSources(out, options.slug);
  }
  return stripUnsafeBodyTags(out);
}

export function stripBlogWordPressHtml(html: string): string {
  if (!html) return html;
  const safeInput = stripUnsafeBodyTags(html);
  const inLen = safeInput.length;
  let out = safeInput;
  out = stripByHeadingNodes(out);
  out = stripByHeadingNodes(out);
  out = stripWidgetHeadingWidgets(out);
  out = stripLargestElementorBlockWithPhrase(out);
  out = stripLargestElementorBlockWithPhrase(out);

  const removedFraction = inLen > 0 ? (inLen - out.length) / inLen : 0;
  if (removedFraction > MAX_STRIP_FRACTION) {
    return safeInput;
  }

  return stripUnsafeBodyTags(out);
}

/** @deprecated Use {@link stripBlogWordPressHtml} */
export function stripWhereWeFocusSection(html: string): string {
  return stripBlogWordPressHtml(html);
}
