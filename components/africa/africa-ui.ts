/**
 * Africa shell — shared surface + type tokens (shadcn/Material-inspired).
 * Single source of truth for header/footer so the layout stays consistent.
 */
export const au = {
  /** Sticky header shell */
  header: {
    outer:
      "sticky top-0 z-50 border-b border-zinc-200/60 bg-white/80 shadow-[0_1px_0_0_rgba(255,255,255,0.8)_inset,0_4px_24px_-8px_rgba(15,23,42,0.06)] backdrop-blur-xl supports-[backdrop-filter]:bg-white/70 dark:border-zinc-800/80 dark:bg-zinc-950/85 dark:shadow-[inset_0_1px_0_0_rgba(255,255,255,0.04),0_8px_32px_-12px_rgba(0,0,0,0.45)]",
    inner:
      "mx-auto flex min-h-16 max-w-7xl items-center justify-between gap-2 px-3 py-1.5 sm:min-h-[4rem] sm:gap-3 sm:px-4 sm:py-2 lg:min-h-[4.25rem] lg:gap-5 lg:px-6",
    navTrack:
      "flex items-center gap-0.5 rounded-xl border border-zinc-200/70 bg-zinc-100/60 p-1 shadow-inner shadow-zinc-900/5 dark:border-zinc-800/80 dark:bg-zinc-900/40 dark:shadow-none",
    navItem:
      "inline-flex items-center rounded-lg px-3 py-2 text-sm font-medium tracking-tight transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal-500/40 focus-visible:ring-offset-2 focus-visible:ring-offset-white dark:focus-visible:ring-offset-zinc-950",
    navItemActive:
      "bg-white text-zinc-900 shadow-sm ring-1 ring-zinc-200/80 dark:bg-zinc-800 dark:text-zinc-50 dark:ring-zinc-700/80",
    navItemIdle:
      "text-zinc-600 hover:bg-white/80 hover:text-zinc-900 dark:text-zinc-400 dark:hover:bg-zinc-800/60 dark:hover:text-zinc-100",
    dropdown:
      "absolute right-0 top-[calc(100%+0.5rem)] z-50 min-w-[13.5rem] overflow-hidden rounded-xl border border-zinc-200/80 bg-white/95 p-1 shadow-lg shadow-zinc-900/10 ring-1 ring-zinc-900/5 backdrop-blur-xl dark:border-zinc-800 dark:bg-zinc-950/95 dark:ring-white/5",
    dropdownItem:
      "block rounded-lg px-3 py-2.5 text-sm text-zinc-700 transition-colors hover:bg-zinc-100 hover:text-zinc-900 dark:text-zinc-300 dark:hover:bg-zinc-800/80 dark:hover:text-white",
    donate:
      "inline-flex items-center justify-center rounded-lg bg-teal-700 px-4 py-2 text-xs font-semibold uppercase tracking-wide text-white shadow-sm ring-1 ring-white/15 transition hover:bg-teal-600 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal-500/50 focus-visible:ring-offset-2 dark:ring-white/10",
    iconButton:
      "inline-flex h-10 w-10 items-center justify-center rounded-lg border border-zinc-200/80 bg-white text-zinc-600 shadow-sm transition hover:bg-zinc-50 hover:text-zinc-900 dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-300 dark:hover:bg-zinc-800",
  },
  /** Footer shell */
  footer: {
    main:
      "mt-auto border-t border-zinc-200/70 bg-zinc-50/80 dark:border-zinc-800 dark:bg-zinc-950",
    mainInner: "relative mx-auto max-w-7xl px-4 py-14 sm:px-6 sm:py-16 lg:px-8 lg:py-20",
    mesh:
      "pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_80%_50%_at_50%_-20%,rgba(20,184,166,0.07),transparent_55%)] dark:bg-[radial-gradient(ellipse_80%_50%_at_50%_-20%,rgba(45,212,191,0.05),transparent_50%)]",
    sectionTitle:
      "text-[11px] font-semibold uppercase tracking-[0.22em] text-zinc-500 dark:text-zinc-500",
    card:
      "rounded-2xl border border-zinc-200/80 bg-white/90 p-6 shadow-sm shadow-zinc-900/5 dark:border-zinc-800/80 dark:bg-zinc-900/40 dark:shadow-none",
    link: "text-sm text-zinc-600 transition-colors hover:text-teal-700 dark:text-zinc-400 dark:hover:text-teal-400",
    socialBtn:
      "flex size-10 items-center justify-center rounded-lg border border-zinc-200/90 bg-white text-zinc-500 shadow-sm transition hover:-translate-y-0.5 hover:border-teal-200 hover:bg-teal-50/80 hover:text-teal-700 dark:border-zinc-800 dark:bg-zinc-900 dark:text-zinc-400 dark:hover:border-teal-800 dark:hover:bg-teal-950/40 dark:hover:text-teal-300",
    bottomBar:
      "border-t border-zinc-800/80 bg-zinc-950 text-zinc-400 dark:border-zinc-800 dark:bg-black",
    bottomInner:
      "mx-auto flex max-w-7xl flex-col items-center justify-between gap-4 px-4 py-6 text-center text-sm sm:flex-row sm:text-left lg:px-8",
    legalLink: "text-zinc-500 transition hover:text-white",
  },
  /** Home hero */
  hero: {
    section:
      "relative overflow-hidden border-b border-zinc-300 bg-zinc-50 dark:border-zinc-700 dark:bg-zinc-950",
    overlay:
      "pointer-events-none absolute inset-0 bg-[linear-gradient(120deg,rgba(15,23,42,0.05)_0%,rgba(15,23,42,0.01)_36%,transparent_65%),linear-gradient(to_bottom,rgba(255,255,255,0.6),rgba(255,255,255,0.15))] dark:bg-[linear-gradient(120deg,rgba(2,6,23,0.45)_0%,rgba(2,6,23,0.2)_40%,transparent_72%),linear-gradient(to_bottom,rgba(2,6,23,0.18),rgba(2,6,23,0.05))]",
    texture:
      "pointer-events-none absolute inset-0 opacity-40 bg-[linear-gradient(to_right,rgba(15,23,42,0.06)_1px,transparent_1px),linear-gradient(to_bottom,rgba(15,23,42,0.06)_1px,transparent_1px)] bg-[size:56px_56px] [mask-image:linear-gradient(to_bottom,black_20%,transparent_90%)] dark:bg-[linear-gradient(to_right,rgba(255,255,255,0.05)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.05)_1px,transparent_1px)]",
    bloomA:
      "pointer-events-none absolute -left-[20%] top-0 h-[min(85vh,720px)] w-[70%] bg-[radial-gradient(ellipse_70%_60%_at_30%_20%,rgba(45,212,191,0.14),transparent_65%)] dark:bg-[radial-gradient(ellipse_70%_60%_at_30%_20%,rgba(20,184,166,0.12),transparent_65%)]",
    bloomB:
      "pointer-events-none absolute -right-[10%] top-[10%] h-[min(70vh,560px)] w-[55%] bg-[radial-gradient(ellipse_65%_55%_at_70%_30%,rgba(13,148,136,0.11),transparent_60%)] dark:bg-[radial-gradient(ellipse_65%_55%_at_70%_30%,rgba(45,212,191,0.08),transparent_60%)]",
    grid:
      "pointer-events-none absolute inset-0 bg-[linear-gradient(to_right,rgba(24,24,27,0.04)_1px,transparent_1px),linear-gradient(to_bottom,rgba(24,24,27,0.04)_1px,transparent_1px)] bg-[size:48px_48px] [mask-image:linear-gradient(to_bottom,black_20%,transparent_85%)] dark:bg-[linear-gradient(to_right,rgba(255,255,255,0.04)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.04)_1px,transparent_1px)]",
    inner:
      "relative mx-auto max-w-7xl px-4 py-14 sm:px-6 sm:py-16 lg:px-8 lg:py-20",
    gridLayout: "grid items-start gap-10 lg:grid-cols-12 lg:gap-10",
    colCopy: "lg:col-span-6 xl:col-span-7",
    colAside: "lg:col-span-6 xl:col-span-5 lg:pt-1",
    eyebrow:
      "inline-flex items-center gap-2 border-l-2 border-emerald-700 pl-3 text-[11px] font-semibold uppercase tracking-[0.2em] text-zinc-700 dark:border-emerald-500 dark:text-zinc-300",
    headline:
      "mt-5 max-w-3xl text-balance font-serif text-4xl font-semibold tracking-tight text-zinc-900 sm:text-5xl xl:text-[3.2rem] xl:leading-[1.12] dark:text-zinc-100",
    body:
      "mt-5 max-w-2xl text-lg leading-relaxed text-zinc-700 dark:text-zinc-300",
    primaryCta:
      "inline-flex min-h-11 items-center justify-center border border-emerald-800 bg-emerald-800 px-6 text-sm font-semibold uppercase tracking-[0.04em] text-white transition hover:bg-emerald-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500/50 focus-visible:ring-offset-2 dark:border-emerald-600 dark:bg-emerald-700 dark:hover:bg-emerald-600",
    secondaryCta:
      "inline-flex min-h-11 items-center justify-center border border-zinc-400 bg-white px-6 text-sm font-semibold uppercase tracking-[0.04em] text-zinc-800 transition hover:bg-zinc-100 dark:border-zinc-600 dark:bg-zinc-900 dark:text-zinc-100 dark:hover:bg-zinc-800",
    ctaRow: "mt-8 flex flex-wrap items-center gap-3",
    statRow: "mt-7 flex flex-wrap items-center gap-2.5",
    statChip:
      "inline-flex items-center border border-zinc-300 bg-white px-3 py-1.5 text-sm font-medium text-zinc-700 dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-300",
    spotlightGrid: "mt-10 grid gap-4 sm:grid-cols-2",
    spotlightCard:
      "group rounded-2xl border border-zinc-200/80 bg-white/88 p-5 shadow-sm backdrop-blur-sm transition [transform:translateZ(0)] hover:-translate-y-0.5 hover:border-teal-200/90 hover:shadow-lg hover:shadow-zinc-900/5 dark:border-zinc-800/80 dark:bg-zinc-900/60 dark:hover:border-teal-800/60 dark:hover:shadow-black/30",
    spotlightLabel:
      "text-[11px] font-semibold uppercase tracking-[0.18em] text-zinc-500 dark:text-zinc-500",
    spotlightTitle:
      "mt-2 text-base font-semibold leading-snug tracking-tight text-zinc-900 transition group-hover:text-teal-800 dark:text-zinc-50 dark:group-hover:text-teal-300",
    spotlightText: "mt-2 text-sm leading-relaxed text-zinc-600 dark:text-zinc-400",
    spotlightMeta: "mt-3 flex flex-wrap items-center gap-2 text-xs text-zinc-500 dark:text-zinc-500",
    spotlightLink:
      "mt-4 inline-flex items-center gap-1 text-sm font-semibold text-teal-700 transition hover:text-teal-800 dark:text-teal-400 dark:hover:text-teal-300",
    mediaStage: "relative lg:pl-4 xl:pl-8",
    mediaShell:
      "relative overflow-hidden rounded-[2rem] border border-zinc-200/80 bg-white/80 p-2 shadow-[0_30px_80px_-32px_rgba(15,23,42,0.25)] ring-1 ring-zinc-900/5 backdrop-blur-xl dark:border-zinc-800/80 dark:bg-zinc-900/55 dark:ring-white/5",
    mediaFrame:
      "relative aspect-[4/5] overflow-hidden rounded-[1.5rem] bg-linear-to-br from-teal-100 via-emerald-50 to-white dark:from-teal-950 dark:via-zinc-900 dark:to-zinc-950",
    mediaImage: "h-full w-full object-cover transition duration-700 will-change-transform group-hover:scale-[1.03]",
    mediaOverlay:
      "absolute inset-x-0 bottom-0 bg-linear-to-t from-zinc-950/88 via-zinc-950/45 to-transparent p-6 text-white",
    mediaKicker: "text-[11px] font-semibold uppercase tracking-[0.22em] text-white/70",
    mediaHeading: "mt-2 text-xl font-semibold leading-tight tracking-tight text-white",
    mediaMeta: "mt-3 inline-flex items-center gap-2 text-sm text-white/80",
    floatingCard:
      "absolute -left-4 top-6 rounded-2xl border border-white/60 bg-white/80 px-4 py-3 text-sm text-zinc-800 shadow-xl shadow-zinc-950/10 backdrop-blur-md dark:border-zinc-700/80 dark:bg-zinc-900/75 dark:text-zinc-100",
    featureCard:
      "rounded-3xl border border-zinc-200/80 bg-white/70 p-1 shadow-[0_24px_60px_-24px_rgba(15,23,42,0.18)] ring-1 ring-zinc-900/5 backdrop-blur-xl dark:border-zinc-800/80 dark:bg-zinc-900/50 dark:shadow-[0_24px_60px_-24px_rgba(0,0,0,0.5)] dark:ring-white/5",
    featureInner: "rounded-[1.35rem] bg-linear-to-b from-white/80 to-zinc-50/90 p-6 sm:p-8 dark:from-zinc-900/80 dark:to-zinc-950/90",
    featureTitle:
      "text-[11px] font-semibold uppercase tracking-[0.22em] text-zinc-500 dark:text-zinc-500",
    focusRow:
      "group flex gap-4 rounded-2xl border border-transparent p-3 transition hover:border-teal-200/80 hover:bg-teal-50/50 dark:hover:border-teal-900/60 dark:hover:bg-teal-950/30",
    focusIcon:
      "flex size-11 shrink-0 items-center justify-center rounded-xl bg-teal-100 text-teal-800 shadow-inner shadow-teal-900/5 dark:bg-teal-950/80 dark:text-teal-300",
    focusHeading: "font-semibold text-zinc-900 dark:text-zinc-100",
    focusText: "mt-0.5 text-sm text-zinc-600 dark:text-zinc-400",
  },
  /** Home page (below hero) */
  home: {
    section: "relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8",
    sectionPad: "py-16 sm:py-20 lg:py-24",
    sectionMuted: "border-y border-zinc-200/70 bg-zinc-50/90 dark:border-zinc-800/80 dark:bg-zinc-900/35",
    eyebrow: "text-[11px] font-semibold uppercase tracking-[0.22em] text-teal-700 dark:text-teal-400",
    title: "mt-3 text-balance text-3xl font-semibold tracking-tight text-zinc-900 dark:text-zinc-50 sm:text-4xl",
    lead: "mt-4 max-w-2xl text-lg leading-relaxed text-zinc-600 dark:text-zinc-400",
    linkAll:
      "inline-flex items-center gap-1.5 text-sm font-semibold text-teal-700 transition hover:text-teal-800 dark:text-teal-400 dark:hover:text-teal-300",
    newsGrid: "mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3",
    newsCard:
      "group flex h-full flex-col overflow-hidden rounded-2xl border border-zinc-200/80 bg-white shadow-sm transition hover:shadow-md hover:border-zinc-300/80 dark:border-zinc-800/80 dark:bg-zinc-900/55 dark:hover:border-zinc-700",
    newsMedia:
      "relative aspect-[16/10] overflow-hidden border-b border-zinc-200/80 bg-linear-to-br from-teal-100 via-emerald-50 to-white dark:border-zinc-800/80 dark:from-teal-950 dark:via-zinc-900 dark:to-zinc-950",
    newsImage: "h-full w-full object-cover transition duration-500 group-hover:scale-[1.02]",
    newsMediaFallback:
      "absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(20,184,166,0.45),transparent_35%),linear-gradient(135deg,rgba(13,148,136,0.95),rgba(15,23,42,0.92))]",
    newsBody: "flex flex-1 flex-col p-6",
    newsDate: "text-xs font-medium text-zinc-500 dark:text-zinc-500",
    newsTitle:
      "mt-3 text-lg font-semibold leading-snug tracking-tight text-zinc-900 transition group-hover:text-teal-800 dark:text-zinc-50 dark:group-hover:text-teal-300",
    newsExcerpt: "mt-2 flex-1 text-sm leading-relaxed text-zinc-600 line-clamp-3 dark:text-zinc-400",
    newsRead: "mt-4 text-sm font-semibold text-teal-700 dark:text-teal-400",
    badgeMain:
      "inline-flex rounded-full bg-zinc-200/90 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-zinc-700 dark:bg-zinc-800 dark:text-zinc-300",
    badgeAfrica:
      "inline-flex rounded-full bg-teal-100 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-teal-900 dark:bg-teal-950/80 dark:text-teal-200",
    programsGrid: "mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3",
    programCard:
      "flex h-full flex-col overflow-hidden rounded-2xl border border-zinc-200/80 bg-white/90 shadow-sm transition hover:shadow-md hover:border-zinc-300/80 dark:border-zinc-800/80 dark:bg-zinc-900/40 dark:hover:border-zinc-700",
    programMedia:
      "relative aspect-[16/10] overflow-hidden border-b border-zinc-200/80 bg-linear-to-br from-teal-100 via-emerald-50 to-white dark:border-zinc-800/80 dark:from-teal-950 dark:via-zinc-900 dark:to-zinc-950",
    programImage: "h-full w-full object-cover transition duration-500 group-hover:scale-[1.02]",
    programCredit:
      "absolute inset-x-0 bottom-0 bg-linear-to-t from-zinc-950/75 to-transparent px-4 py-3 text-[11px] text-white/80",
    programBodyWrap: "flex flex-1 flex-col p-6",
    programTitle: "text-lg font-semibold text-zinc-900 dark:text-zinc-50",
    programBody: "mt-2 flex-1 text-sm leading-relaxed text-zinc-600 dark:text-zinc-400",
    programLink:
      "mt-5 inline-flex items-center gap-1 text-sm font-semibold text-teal-700 hover:text-teal-800 dark:text-teal-400 dark:hover:text-teal-300",
    showcaseGrid: "grid items-center gap-8 lg:grid-cols-12 lg:gap-10 xl:gap-14",
    showcaseMediaCol: "lg:col-span-6",
    showcaseCopyCol: "lg:col-span-6",
    showcaseMediaShell:
      "group relative overflow-hidden rounded-[2rem] border border-zinc-200/80 bg-white/90 p-2 shadow-[0_28px_70px_-28px_rgba(15,23,42,0.2)] ring-1 ring-zinc-900/5 dark:border-zinc-800/80 dark:bg-zinc-900/45 dark:ring-white/5",
    showcaseMediaFrame:
      "relative aspect-[5/4] overflow-hidden rounded-[1.5rem] bg-linear-to-br from-teal-100 via-emerald-50 to-white dark:from-teal-950 dark:via-zinc-900 dark:to-zinc-950",
    showcaseImage: "h-full w-full object-cover transition duration-700 will-change-transform group-hover:scale-[1.03]",
    showcaseCredit:
      "absolute inset-x-0 bottom-0 bg-linear-to-t from-zinc-950/80 to-transparent px-5 py-4 text-[11px] text-white/80",
    showcaseQuote:
      "absolute left-5 top-5 max-w-[14rem] rounded-2xl border border-white/60 bg-white/78 px-4 py-3 text-sm text-zinc-800 shadow-xl shadow-zinc-950/10 backdrop-blur-md dark:border-zinc-700/80 dark:bg-zinc-900/75 dark:text-zinc-100",
    showcaseLead: "mt-4 max-w-xl text-lg leading-relaxed text-zinc-600 dark:text-zinc-400",
    showcaseMetrics: "mt-8 grid gap-3 sm:grid-cols-3",
    showcaseMetric:
      "rounded-2xl border border-zinc-200/80 bg-white/90 p-4 shadow-sm dark:border-zinc-800/80 dark:bg-zinc-900/45",
    showcaseMetricValue: "text-2xl font-semibold tracking-tight text-zinc-900 dark:text-zinc-50",
    showcaseMetricLabel: "mt-1 text-sm text-zinc-600 dark:text-zinc-400",
    showcaseCard:
      "mt-8 rounded-3xl border border-teal-200/80 bg-linear-to-br from-teal-50 via-white to-white p-6 shadow-sm dark:border-teal-900/50 dark:from-teal-950/40 dark:via-zinc-900/60 dark:to-zinc-900/40",
    ctaBand:
      "relative overflow-hidden border-y border-teal-900/20 bg-teal-700 py-16 text-white dark:border-teal-950/40",
    ctaInner: "relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8",
    ctaTitle: "text-2xl font-semibold tracking-tight sm:text-3xl",
    ctaLead: "mt-3 max-w-xl text-teal-100/90",
    ctaRow: "mt-8 flex flex-wrap gap-3",
    ctaPrimary:
      "inline-flex min-h-11 items-center justify-center rounded-xl bg-white px-6 text-sm font-semibold text-teal-900 shadow-sm transition hover:bg-teal-50",
    ctaGhost:
      "inline-flex min-h-11 items-center justify-center rounded-xl border border-white/25 bg-white/5 px-6 text-sm font-semibold text-white backdrop-blur-sm transition hover:bg-white/10",
  },
  /** About page */
  about: {
    hero:
      "relative isolate overflow-hidden border-b border-zinc-200/60 bg-[#f7faf9] dark:border-zinc-800/80 dark:bg-zinc-950",
    heroBloom:
      "pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_80%_60%_at_50%_-10%,rgba(45,212,191,0.12),transparent_55%)] dark:bg-[radial-gradient(ellipse_80%_60%_at_50%_-10%,rgba(20,184,166,0.1),transparent_50%)]",
    heroInner: "relative mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-20 lg:px-8 lg:py-24",
    heroEyebrow:
      "inline-flex items-center gap-2 rounded-full border border-teal-200/80 bg-white/70 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.2em] text-teal-800 shadow-sm backdrop-blur-sm dark:border-teal-800/60 dark:bg-zinc-900/70 dark:text-teal-300",
    heroTitle:
      "mt-6 text-balance bg-linear-to-br from-[#0f766e] via-[#0d9488] to-[#14b8a6] bg-clip-text text-4xl font-semibold tracking-tight text-transparent sm:text-5xl",
    heroSubtitle: "mt-3 text-lg font-medium text-zinc-700 dark:text-zinc-300",
    heroLead: "mt-4 max-w-2xl text-lg leading-relaxed text-zinc-600 dark:text-zinc-400",
    section: "relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8",
    sectionPad: "py-14 sm:py-16 lg:py-20",
    proseCard:
      "rounded-3xl border border-zinc-200/80 bg-white/90 p-8 shadow-sm dark:border-zinc-800/80 dark:bg-zinc-900/50 sm:p-10",
    prose: "space-y-5 text-base leading-relaxed text-zinc-700 dark:text-zinc-300",
    sectionTitle:
      "text-[11px] font-semibold uppercase tracking-[0.22em] text-teal-700 dark:text-teal-400",
    sectionHeading: "mt-3 text-3xl font-semibold tracking-tight text-zinc-900 dark:text-zinc-50 sm:text-4xl",
    valuesGrid: "mt-10 grid gap-5 sm:grid-cols-2",
    valueCard:
      "flex h-full flex-col rounded-2xl border border-zinc-200/80 bg-white/90 p-6 shadow-sm transition hover:border-teal-200/80 hover:shadow-md dark:border-zinc-800/80 dark:bg-zinc-900/45 dark:hover:border-teal-800/50",
    valueLabel: "text-xs font-semibold uppercase tracking-wider text-teal-700 dark:text-teal-400",
    valueTitle: "mt-2 text-lg font-semibold text-zinc-900 dark:text-zinc-50",
    valueBody: "mt-2 flex-1 text-sm leading-relaxed text-zinc-600 dark:text-zinc-400",
    imageBand:
      "relative mt-12 overflow-hidden rounded-3xl border border-zinc-200/80 shadow-xl shadow-zinc-900/10 dark:border-zinc-800/80 dark:shadow-black/40",
    policiesIntro: "mt-4 max-w-2xl text-lg leading-relaxed text-zinc-600 dark:text-zinc-400",
    policiesGrid: "mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3",
    policyCard:
      "flex h-full flex-col rounded-2xl border border-zinc-200/80 bg-zinc-50/80 p-5 dark:border-zinc-800/80 dark:bg-zinc-900/40",
    policyDate: "text-xs font-medium text-zinc-500 dark:text-zinc-500",
    policyName: "mt-2 text-sm font-semibold leading-snug text-zinc-900 dark:text-zinc-50",
    policyExcerpt: "mt-2 flex-1 text-sm leading-relaxed text-zinc-600 dark:text-zinc-400",
    policyLink:
      "mt-4 inline-flex text-sm font-semibold text-teal-700 hover:text-teal-800 dark:text-teal-400 dark:hover:text-teal-300",
    ctaBand:
      "mt-16 rounded-3xl border border-teal-200/80 bg-linear-to-br from-teal-50 via-white to-zinc-50 p-8 dark:border-teal-900/40 dark:from-teal-950/30 dark:via-zinc-900/60 dark:to-zinc-950 sm:p-10",
    ctaTitle: "text-xl font-semibold tracking-tight text-zinc-900 dark:text-zinc-50 sm:text-2xl",
    ctaText: "mt-2 max-w-2xl text-zinc-600 dark:text-zinc-400",
    ctaRow: "mt-6 flex flex-wrap gap-3",
    ctaPrimary:
      "inline-flex min-h-11 items-center justify-center rounded-xl bg-linear-to-b from-teal-600 to-teal-700 px-6 text-sm font-semibold text-white shadow-md transition hover:from-teal-500 hover:to-teal-600",
    ctaGhost:
      "inline-flex min-h-11 items-center justify-center rounded-xl border border-zinc-200/90 bg-white px-6 text-sm font-semibold text-zinc-800 shadow-sm transition hover:border-teal-300 dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-100",
  },
} as const;
