import { framework4d } from "@/lib/master-class/content";

export function FrameworkSection() {
  return (
    <section className="mx-auto max-w-6xl px-4 py-16 sm:px-6 sm:py-20" aria-labelledby="framework-heading">
      <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-teal-700 dark:text-teal-400">
        How we work with AI
      </p>
      <h2 id="framework-heading" className="mt-3 text-3xl font-semibold tracking-tight text-zinc-900 dark:text-zinc-50">
        The 4D framework
      </h2>
      <p className="mt-3 max-w-2xl text-lg leading-relaxed text-zinc-600 dark:text-zinc-400">
        Four habits to keep Claude useful — and us accountable. Hover or focus a card; the idea is the same in the field.
      </p>
      <ul className="mt-10 grid gap-4 sm:grid-cols-2">
        {framework4d.map((item, index) => (
          <li
            key={item.id}
            className="mc-fade-up group rounded-2xl border border-zinc-200/80 bg-white/90 p-6 shadow-sm transition hover:-translate-y-0.5 hover:border-teal-200/80 hover:shadow-md dark:border-zinc-800/80 dark:bg-zinc-900/45 dark:hover:border-teal-800/50"
            style={{ animationDelay: `${index * 90}ms` }}
          >
            <p className="text-xs font-semibold uppercase tracking-wider text-teal-700 dark:text-teal-400">
              {item.letter} · {item.prompt}
            </p>
            <h3 className="mt-2 text-xl font-semibold text-zinc-900 dark:text-zinc-50">{item.title}</h3>
            <p className="mt-2 text-sm leading-relaxed text-zinc-600 dark:text-zinc-400">{item.body}</p>
          </li>
        ))}
      </ul>
    </section>
  );
}
