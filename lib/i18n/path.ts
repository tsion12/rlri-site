import { defaultLocale, isLocale, type Locale } from "./config";
import { mainRoutes } from "@/lib/main-routes";

/** Prefix when viewing the main site via `/main` on localhost. */
export type MainPathBase = "" | "/main";

export type ParsedMainPath = {
  base: MainPathBase;
  locale: Locale;
  /** Path after locale, e.g. `/about/our-story` or `/`. */
  pathname: string;
};

/**
 * Parse locale from a Next.js or browser pathname.
 * Supports `/main/fr/about`, `/fr/about`, and `/about` (default en).
 */
export function parseMainPath(pathname: string): ParsedMainPath {
  let rest = pathname;
  let base: MainPathBase = "";

  if (rest === "/main" || rest.startsWith("/main/")) {
    base = "/main";
    rest = rest === "/main" ? "/" : rest.slice("/main".length) || "/";
  }

  const segments = rest.split("/").filter(Boolean);
  const maybeLocale = segments[0];

  if (maybeLocale && isLocale(maybeLocale)) {
    const tail = segments.slice(1);
    return {
      base,
      locale: maybeLocale,
      pathname: tail.length ? `/${tail.join("/")}` : "/",
    };
  }

  return {
    base,
    locale: defaultLocale,
    pathname: rest === "" ? "/" : rest.startsWith("/") ? rest : `/${rest}`,
  };
}

export function mainBaseFromPathname(pathname: string): MainPathBase {
  return parseMainPath(pathname).base;
}

export function mainLocaleFromPathname(pathname: string): Locale {
  return parseMainPath(pathname).locale;
}

/** Public URL segment for a locale (`""` for default English). */
export function localePathPrefix(locale: Locale): string {
  return locale === defaultLocale ? "" : `/${locale}`;
}

/**
 * Build a main-site href with locale and optional `/main` dev prefix.
 */
export function mainHref(
  route: string,
  options: { base: MainPathBase; locale: Locale }
): string {
  const hashIndex = route.indexOf("#");
  const pathOnly = hashIndex === -1 ? route : route.slice(0, hashIndex);
  const hash = hashIndex === -1 ? "" : route.slice(hashIndex);
  const path = pathOnly.startsWith("/") ? pathOnly : `/${pathOnly}`;
  const routePath = path === "/" ? "" : path;
  const localeSeg = localePathPrefix(options.locale);

  if (options.base === "/main") {
    const internal = `/main/${options.locale}${routePath}${hash}`;
    return internal === `/main/${options.locale}` && routePath === ""
      ? `/main/${options.locale}`
      : internal;
  }

  const publicPath = `${localeSeg}${routePath}${hash}` || "/";
  return publicPath;
}

export function navItemActiveMain(
  pathname: string,
  href: string,
  base: MainPathBase,
  locale: Locale
): boolean {
  if (href.startsWith("http")) return false;
  const pathOnly = href.split("#")[0] || href;
  const resolved = mainHref(pathOnly, { base, locale });
  if (href === mainRoutes.home) {
    return pathname === resolved || pathname === `${resolved}/`;
  }
  return pathname === resolved || pathname.startsWith(`${resolved}/`);
}

/** Same page, different locale (preserves route, swaps locale segment). */
export function mainHrefForLocale(pathname: string, targetLocale: Locale): string {
  const { base, pathname: routePath } = parseMainPath(pathname);
  return mainHref(routePath, { base, locale: targetLocale });
}
