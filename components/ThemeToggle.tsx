"use client";

import { useTheme } from "next-themes";

type Props = {
  className?: string;
  /** Compact icon-only (default). */
  variant?: "icon" | "pill";
};

export function ThemeToggle({ className = "", variant = "icon" }: Props) {
  const { resolvedTheme, setTheme } = useTheme();
  if (!resolvedTheme) {
    return (
      <span
        className={`inline-flex h-10 w-10 shrink-0 rounded-xl border border-transparent ${className}`}
        aria-hidden
      />
    );
  }

  const isDark = resolvedTheme === "dark";
  const toggle = () => setTheme(isDark ? "light" : "dark");

  const base =
    variant === "pill"
      ? "inline-flex items-center gap-2 rounded-full border border-teal-900/10 bg-white/90 px-3 py-2 text-xs font-semibold text-[#2f4f4f] shadow-sm transition hover:bg-teal-50 dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-200 dark:hover:bg-zinc-800"
      : "inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-teal-900/10 bg-white/90 text-[#2f4f4f] shadow-sm transition hover:bg-teal-50 dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-100 dark:hover:bg-zinc-800";

  return (
    <button
      type="button"
      onClick={toggle}
      className={`${base} ${className}`}
      aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
      title={isDark ? "Light mode" : "Dark mode"}
    >
      {isDark ? (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden>
          <circle cx="12" cy="12" r="4" />
          <path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M4.93 19.07l1.41-1.41M17.66 6.34l1.41-1.41" />
        </svg>
      ) : (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden>
          <path d="M21 12.79A9 9 0 1111.21 3 7 7 0 0021 12.79z" />
        </svg>
      )}
      {variant === "pill" && <span>{isDark ? "Light" : "Dark"}</span>}
    </button>
  );
}
