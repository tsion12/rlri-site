import Link from "next/link";
import { BlogSourceBadge } from "@/components/blog/BlogSourceBadge";
import { blogPostPath, getAfricaPosts } from "@/lib/wp";

export default async function BlogPage() {
  const posts = await getAfricaPosts();

  return (
    <div className="mx-auto max-w-2xl px-4 pb-24 pt-12 sm:px-6 sm:pt-16">
      <p className="mb-2 text-xs font-semibold uppercase tracking-[0.28em] text-amber-700 dark:text-amber-400/90">
        Journal
      </p>
      <h1 className="mb-3 bg-linear-to-br from-stone-900 to-stone-600 bg-clip-text text-4xl font-semibold tracking-tight text-transparent dark:from-zinc-50 dark:to-zinc-400 sm:text-5xl">
        Blog
      </h1>
      <p className="mb-12 max-w-lg text-lg leading-relaxed text-stone-600 dark:text-zinc-400">
        Stories and updates from the Real Life Research Institute Africa Program.
      </p>

      <ul className="flex flex-col gap-3 sm:gap-4">
        {posts.map((post) => (
          <li key={`${post.source}-${post.id}`}>
            <Link
              href={blogPostPath(post)}
              className="group relative block overflow-hidden rounded-2xl border border-stone-200/90 bg-white/80 p-6 shadow-sm ring-1 ring-stone-950/4 transition-all duration-300 hover:-translate-y-0.5 hover:border-amber-200/80 hover:shadow-lg hover:shadow-amber-950/5 dark:border-zinc-800 dark:bg-zinc-900/70 dark:ring-white/6 dark:hover:border-amber-900/50 dark:hover:shadow-black/40"
            >
              <div className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                <div className="absolute -right-8 -top-8 h-32 w-32 rounded-full bg-amber-400/10 blur-2xl dark:bg-amber-400/5" />
              </div>
              <div className="relative flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between sm:gap-6">
                <div className="min-w-0 flex-1">
                  <BlogSourceBadge source={post.source} />
                  <h2 className="mt-3 text-xl font-semibold leading-snug tracking-tight text-stone-900 transition-colors group-hover:text-amber-900 dark:text-zinc-50 dark:group-hover:text-amber-100 sm:text-[1.35rem]">
                    <span
                      dangerouslySetInnerHTML={{
                        __html: post.title.rendered,
                      }}
                    />
                  </h2>
                </div>
                <span
                  className="shrink-0 text-sm font-medium text-amber-700/70 transition-colors group-hover:text-amber-800 dark:text-amber-400/80 dark:group-hover:text-amber-300"
                  aria-hidden
                >
                  Read →
                </span>
              </div>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
