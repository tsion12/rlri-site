import { parse, type HTMLElement } from "node-html-parser";

type FigureSource = {
  n: number;
  href: string;
  label: string;
};

/** Slug-keyed photo credits for WP captions that only say “sourced from the internet”. */
const BLOG_FIGURE_SOURCES: Record<string, FigureSource[]> = {
  "turning-waste-into-wealth-how-creative-recycling-can-drive-environmental-sustainability-in-african-schools":
    [
      {
        n: 1,
        href: "https://www.facebook.com/TeachersInNeed/posts/plastic-bottle-tops-are-great-learning-aid/496162819223158/",
        label: "Teachers in Need",
      },
      {
        n: 2,
        href: "https://justmontessori.com/africa/",
        label: "Just Montessori",
      },
      {
        n: 3,
        href: "https://komonews.com/news/offbeat/nigerian-teens-create-fashion-from-trash-to-fight-pollution-climate-change-recylcing-renewable-energy-lagos-africa-the-world-bank-egypt-global-warming-cop27-united-nations-plastic-litter-teenagers",
        label: "KOMO News",
      },
      {
        n: 4,
        href: "https://waste-ed.co.za/eco-bricks/",
        label: "Waste-Ed",
      },
    ],
};

function normalizeText(s: string): string {
  return s.replace(/\u00a0/g, " ").replace(/\s+/g, " ").trim();
}

function escapeHtml(s: string): string {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

/** Replace generic internet-photo notes with the credited source link for this post. */
export function applyFigureSources(html: string, slug: string): string {
  const sources = BLOG_FIGURE_SOURCES[slug];
  if (!html || !sources?.length) return html;

  const root = parse(html);
  const used = new Set<number>();

  for (const node of root.querySelectorAll("p, figcaption")) {
    const el = node as HTMLElement;
    const text = normalizeText(el.textContent || "");
    const match = text.match(/^fig\.?\s*(\d+)\b/i);
    if (!match) continue;
    const n = Number(match[1]);
    const source = sources.find((item) => item.n === n);
    if (!source || used.has(n)) continue;
    const alreadyCredited =
      text.toLowerCase().includes(source.label.toLowerCase()) &&
      Boolean(el.querySelector(`a[href="${source.href}"]`));
    if (alreadyCredited) {
      used.add(n);
      continue;
    }
    used.add(n);
    const cleaned = text
      .replace(/\s*\(\s*Photo sourced from the internet\s*\)/i, "")
      .replace(/\.+$/, "")
      .trim();
    const href = escapeHtml(source.href);
    const label = escapeHtml(source.label);
    el.set_content(
      `<em>${escapeHtml(cleaned)} (Source: <a href="${href}" target="_blank" rel="noopener noreferrer">${label}</a>).</em>`,
    );
  }

  return root.toString();
}
