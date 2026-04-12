"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useId, useRef, useState } from "react";
import { ThemeToggle } from "@/components/ThemeToggle";
import { africaRoutes } from "@/lib/africa-routes";
import { au } from "./africa-ui";
import { AfricaProgramLogo } from "./AfricaProgramLogo";

const publications = [
  { label: "Blogs / Op-eds", href: "/africa/publications/blogs" },
  { label: "Stories", href: "/africa/publications/stories" },
  { label: "Policy briefs", href: "/africa/publications/policy-briefs" },
] as const;

const aboutMenu = [
  { label: "Team", href: africaRoutes.team },
  { label: "Volunteers", href: africaRoutes.volunteers },
  { label: "Career", href: africaRoutes.career },
  { label: "Policies", href: africaRoutes.aboutPolicies },
] as const;

const navItems = [
  { label: "Events", href: "/africa/events" },
  { label: "Programs", href: "/africa/programs" },
] as const;

const mobileRow =
  "flex w-full items-center rounded-xl px-3 py-2.5 text-left text-sm font-medium text-zinc-700 transition-colors hover:bg-zinc-100 dark:text-zinc-300 dark:hover:bg-zinc-800/80";
const mobileRowActive =
  "bg-zinc-100 text-zinc-900 dark:bg-zinc-800/90 dark:text-white";

function NavLink({
  href,
  children,
  active,
}: {
  href: string;
  children: React.ReactNode;
  active: boolean;
}) {
  const isExternal = href.startsWith("http");
  const cls = `${au.header.navItem} ${active ? au.header.navItemActive : au.header.navItemIdle}`;

  if (isExternal) {
    return (
      <a href={href} className={cls}>
        {children}
      </a>
    );
  }

  return (
    <Link href={href} className={cls}>
      {children}
    </Link>
  );
}

function navItemActive(pathname: string, href: string) {
  if (href.startsWith("http")) return false;
  if (href === africaRoutes.home) return pathname === "/" || pathname === "/africa";
  return pathname === href || pathname.startsWith(`${href}/`);
}

export function AfricaHeader() {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [aboutOpen, setAboutOpen] = useState(false);
  const [pubOpen, setPubOpen] = useState(false);
  const pubId = useId();
  const aboutId = useId();
  const aboutRef = useRef<HTMLDivElement>(null);
  const pubRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      const t = e.target as Node;
      if (pubRef.current && !pubRef.current.contains(t)) setPubOpen(false);
      if (aboutRef.current && !aboutRef.current.contains(t)) setAboutOpen(false);
    }
    document.addEventListener("click", handleClickOutside);
    return () => document.removeEventListener("click", handleClickOutside);
  }, []);

  const aboutActive =
    pathname === "/africa/about" ||
    pathname.startsWith("/africa/about/") ||
    pathname === africaRoutes.team ||
    pathname === africaRoutes.volunteers ||
    pathname === africaRoutes.career;

  const pubActive = pathname.startsWith("/blog") || pathname.startsWith("/africa/publications");

  return (
    <header className={au.header.outer}>
      <div className={au.header.inner}>
        <div className="flex min-w-0 shrink items-center gap-2 lg:gap-3">
          <AfricaProgramLogo />
          <span
            className="hidden h-8 w-px shrink-0 bg-zinc-200/90 lg:block dark:bg-zinc-700/80"
            aria-hidden
          />
        </div>

        <nav className="hidden items-center lg:flex" aria-label="Primary">
          <div className={au.header.navTrack}>
            <NavLink href={africaRoutes.home} active={navItemActive(pathname, africaRoutes.home)}>
              Home
            </NavLink>

            <div className="relative flex items-center pl-0.5" ref={aboutRef}>
              <Link
                href="/africa/about"
                className={`${au.header.navItem} ${aboutActive ? au.header.navItemActive : au.header.navItemIdle}`}
              >
                About Us
              </Link>
              <button
                type="button"
                id={`${aboutId}-btn`}
                aria-expanded={aboutOpen}
                aria-controls={`${aboutId}-menu`}
                aria-haspopup="true"
                aria-label="About Us submenu"
                className={`-ml-1 flex h-8 w-6 items-center justify-center rounded-md transition-colors ${
                  aboutActive
                    ? "text-zinc-700 hover:bg-zinc-200/60 dark:text-zinc-200 dark:hover:bg-zinc-700/60"
                    : "text-zinc-500 hover:bg-zinc-200/50 dark:text-zinc-400 dark:hover:bg-zinc-800/60"
                }`}
                onClick={() => {
                  setAboutOpen((o) => !o);
                  setPubOpen(false);
                }}
              >
                <svg
                  width="12"
                  height="12"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.5"
                  className={`transition-transform duration-200 ${aboutOpen ? "rotate-180" : ""}`}
                  aria-hidden
                >
                  <path d="M6 9l6 6 6-6" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </button>

              {aboutOpen && (
                <div id={`${aboutId}-menu`} role="menu" className={au.header.dropdown}>
                  {aboutMenu.map((item) => (
                    <Link
                      key={item.href}
                      role="menuitem"
                      href={item.href}
                      className={au.header.dropdownItem}
                      onClick={() => setAboutOpen(false)}
                    >
                      {item.label}
                    </Link>
                  ))}
                </div>
              )}
            </div>

            {navItems.map((item) => (
              <NavLink key={item.href} href={item.href} active={navItemActive(pathname, item.href)}>
                {item.label}
              </NavLink>
            ))}

            <div className="relative pl-0.5" ref={pubRef}>
              <button
                type="button"
                id={`${pubId}-btn`}
                aria-expanded={pubOpen}
                aria-controls={`${pubId}-menu`}
                aria-haspopup="true"
                className={`${au.header.navItem} inline-flex items-center gap-1.5 ${
                  pubActive ? au.header.navItemActive : au.header.navItemIdle
                }`}
                onClick={() => {
                  setPubOpen((o) => !o);
                  setAboutOpen(false);
                }}
              >
                Publications
                <svg
                  width="14"
                  height="14"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  className={`opacity-70 transition-transform duration-200 ${pubOpen ? "rotate-180" : ""}`}
                  aria-hidden
                >
                  <path d="M6 9l6 6 6-6" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </button>

              {pubOpen && (
                <div
                  id={`${pubId}-menu`}
                  role="menu"
                  className={au.header.dropdown}
                >
                  {publications.map((p) => (
                    <Link
                      key={p.label}
                      role="menuitem"
                      href={p.href}
                      className={au.header.dropdownItem}
                      onClick={() => setPubOpen(false)}
                    >
                      {p.label}
                    </Link>
                  ))}
                </div>
              )}
            </div>

            <NavLink href={africaRoutes.faq} active={navItemActive(pathname, africaRoutes.faq)}>
              FAQs
            </NavLink>
          </div>
        </nav>

        <div className="flex shrink-0 items-center gap-1.5 sm:gap-2">
          <ThemeToggle className="!h-10 !w-10 !rounded-lg !border-zinc-200/80 !shadow-sm dark:!border-zinc-700" />

          <button
            type="button"
            className={`${au.header.iconButton} lg:hidden`}
            aria-expanded={mobileOpen}
            aria-controls="africa-mobile-nav"
            aria-label={mobileOpen ? "Close menu" : "Open menu"}
            onClick={() => setMobileOpen((o) => !o)}
          >
            {mobileOpen ? (
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M6 6l12 12M18 6L6 18" />
              </svg>
            ) : (
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M4 7h16M4 12h16M4 17h16" />
              </svg>
            )}
          </button>
        </div>
      </div>

      {mobileOpen && (
        <div
          id="africa-mobile-nav"
          className="border-t border-zinc-200/70 bg-white/95 backdrop-blur-xl dark:border-zinc-800 dark:bg-zinc-950/95 lg:hidden"
        >
          <div className="mx-auto max-w-7xl space-y-4 px-4 py-5 sm:px-6">
            <nav className="flex flex-col gap-1" aria-label="Mobile primary">
              <Link
                href={africaRoutes.home}
                className={`${mobileRow} ${navItemActive(pathname, africaRoutes.home) ? mobileRowActive : ""}`}
                onClick={() => setMobileOpen(false)}
              >
                Home
              </Link>
              {navItems.map((item) => {
                const active = navItemActive(pathname, item.href);
                const cls = `${mobileRow} ${active ? mobileRowActive : ""}`;
                return item.href.startsWith("http") ? (
                  <a key={item.href} href={item.href} className={cls}>
                    {item.label}
                  </a>
                ) : (
                  <Link key={item.href} href={item.href} className={cls}>
                    {item.label}
                  </Link>
                );
              })}
            </nav>
            <div>
              <Link
                href="/africa/about"
                className={`${mobileRow} ${navItemActive(pathname, "/africa/about") ? mobileRowActive : ""}`}
                onClick={() => setMobileOpen(false)}
              >
                About Us
              </Link>
              <div className="mt-1 flex flex-col gap-0.5 pl-3">
                {aboutMenu.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={au.header.dropdownItem}
                    onClick={() => setMobileOpen(false)}
                  >
                    {item.label}
                  </Link>
                ))}
              </div>
            </div>
            <div>
              <p className={au.footer.sectionTitle}>Publications</p>
              <div className="mt-2 flex flex-col gap-0.5">
                {publications.map((p) => (
                  <Link
                    key={p.label}
                    href={p.href}
                    className={`${au.header.dropdownItem}`}
                    onClick={() => setMobileOpen(false)}
                  >
                    {p.label}
                  </Link>
                ))}
              </div>
            </div>
            <Link
              href={africaRoutes.faq}
              className={`${mobileRow} ${navItemActive(pathname, africaRoutes.faq) ? mobileRowActive : ""}`}
              onClick={() => setMobileOpen(false)}
            >
              FAQs
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
