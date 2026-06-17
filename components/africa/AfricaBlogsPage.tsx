import Image from "next/image";
import Link from "next/link";
import type { WpPostWithSource } from "@/lib/wp";
import { blogPostPath, stripHtml } from "@/lib/wp";
import { PubSubNav } from "./AfricaPublicationsNav";

function themeBadge(post: WpPostWithSource) {
  const t = post.theme?.trim();
  if (t && t.toLowerCase() !== "uncategorized") return t;
  return "Blog";
}

export function FeaturedPostCard({ post }: { post: WpPostWithSource }) {
  const excerpt = post.excerpt ? stripHtml(post.excerpt.rendered).slice(0, 180).trim() : "";
  const date = new Date(post.date).toLocaleDateString("en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  return (
    <Link
      href={blogPostPath(post)}
      className="group flex flex-col overflow-hidden rounded-2xl border border-zinc-200/90 bg-white shadow-sm transition-colors hover:border-teal-200/80 dark:border-zinc-800 dark:bg-zinc-900/50 dark:hover:border-teal-800/40 lg:flex-row"
    >
      {post.featuredImage && (
        <div className="relative h-52 w-full shrink-0 overflow-hidden lg:h-auto lg:min-h-[280px] lg:w-[42%]">
          <Image
            src={post.featuredImage}
            alt=""
            fill
            className="object-cover"
            sizes="(max-width: 1024px) 100vw, 42vw"
          />
        </div>
      )}
      <div className="flex flex-1 flex-col justify-center p-6 sm:p-8 lg:p-10">
        <div className="flex flex-wrap items-center gap-2 gap-y-1">
          <span className="inline-block rounded-full border border-zinc-200/90 bg-zinc-50 px-2.5 py-0.5 text-[10px] font-semibold uppercase tracking-[0.12em] text-zinc-600 dark:border-zinc-700 dark:bg-zinc-800/60 dark:text-zinc-400">
            {themeBadge(post)}
          </span>
          <span className="text-xs text-zinc-500 dark:text-zinc-500">{date}</span>
        </div>
        <h2
          className="mt-4 text-xl font-semibold leading-snug tracking-tight text-zinc-900 transition-colors group-hover:text-teal-800 dark:text-zinc-50 dark:group-hover:text-teal-300 sm:text-2xl"
        >
          {stripHtml(post.title.rendered)}
        </h2>
        {excerpt && (
          <p className="mt-4 line-clamp-3 text-sm leading-relaxed text-zinc-600 dark:text-zinc-400">{excerpt}</p>
        )}
        <span className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-teal-800 dark:text-teal-300">
          Read article
          <svg className="h-4 w-4" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M3 8h10M9 4l4 4-4 4" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </span>
      </div>
    </Link>
  );
}

export function BlogCard({ post }: { post: WpPostWithSource }) {
  const excerpt = post.excerpt ? stripHtml(post.excerpt.rendered).slice(0, 110).trim() : "";
  const date = new Date(post.date).toLocaleDateString("en-GB", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });

  return (
    <Link
      href={blogPostPath(post)}
      className="group flex flex-col overflow-hidden rounded-2xl border border-zinc-200/90 bg-white shadow-sm transition-colors hover:border-teal-200/80 dark:border-zinc-800 dark:bg-zinc-900/50 dark:hover:border-teal-800/40"
    >
      {post.featuredImage && (
        <div className="relative h-44 overflow-hidden">
          <Image
            src={post.featuredImage}
            alt=""
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 33vw"
          />
        </div>
      )}
      <div className="flex flex-1 flex-col p-6">
        <div className="flex flex-wrap items-center gap-2">
          <span className="inline-block rounded-full border border-zinc-200/90 bg-zinc-50 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-[0.12em] text-zinc-600 dark:border-zinc-700 dark:bg-zinc-800/60 dark:text-zinc-400">
            {themeBadge(post)}
          </span>
          <p className="text-[10px] font-medium text-zinc-400 dark:text-zinc-500">{date}</p>
        </div>
        <h3
          className="mt-3 flex-1 text-sm font-semibold leading-snug text-zinc-900 transition-colors group-hover:text-teal-800 dark:text-zinc-50 dark:group-hover:text-teal-300"
        >
          {stripHtml(post.title.rendered)}
        </h3>
        {excerpt && (
          <p className="mt-3 line-clamp-2 text-xs leading-relaxed text-zinc-500 dark:text-zinc-400">{excerpt}</p>
        )}
        <span className="mt-4 inline-flex items-center gap-1.5 text-xs font-semibold text-teal-800 dark:text-teal-300">
          Read more
          <svg className="h-3.5 w-3.5" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M2 7h10M8 3l4 4-4 4" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </span>
      </div>
    </Link>
  );
}

function EmptyState() {
  return (
    <div className="flex flex-col items-center justify-center py-20 text-center">
      <div className="flex h-14 w-14 items-center justify-center rounded-xl border border-zinc-200 bg-zinc-50 text-zinc-400 dark:border-zinc-700 dark:bg-zinc-800/60 dark:text-zinc-500">
        <svg className="h-6 w-6" viewBox="0 0 20 20" fill="currentColor">
          <path
            fillRule="evenodd"
            d="M2 5a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5Zm3.293 1.293a1 1 0 0 1 1.414 0l3 3a1 1 0 0 1 0 1.414l-3 3a1 1 0 1 1-1.414-1.414L7.586 11H5a1 1 0 1 1 0-2h2.586L5.293 7.707a1 1 0 0 1 0-1.414ZM11 9a1 1 0 1 0 0 2h2a1 1 0 1 0 0-2h-2Z"
            clipRule="evenodd"
          />
        </svg>
      </div>
      <h3 className="mt-5 text-base font-semibold text-zinc-900 dark:text-zinc-50">No posts yet</h3>
      <p className="mt-2 max-w-sm text-sm text-zinc-600 dark:text-zinc-400">
        New articles will appear here once they are published to the journal feed.
      </p>
      <Link
        href="/africa/publications"
        className="mt-6 inline-flex min-h-11 items-center justify-center rounded-lg border border-zinc-200 bg-white px-5 text-sm font-semibold text-zinc-800 transition hover:border-teal-700/40 dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-100"
      >
        Publications hub
      </Link>
    </div>
  );
}

export function AfricaBlogsPage({
  posts,
  activeProgramLabel,
  isServiceUnavailable = false,
}: {
  posts: WpPostWithSource[];
  activeProgramLabel?: string | null;
  isServiceUnavailable?: boolean;
}) {
  const [featured, ...rest] = posts;

  return (
    <>
      <PubSubNav active="blogs" />

      <section className="border-b border-zinc-200/80 bg-white py-16 dark:border-zinc-800 dark:bg-zinc-950 sm:py-20" aria-labelledby="blogs-heading">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <p className="text-[11px] font-semibold uppercase tracking-[0.25em] text-teal-700 dark:text-teal-400">
            <Link href="/africa/publications" className="transition hover:text-teal-600">
              Publications
            </Link>
            <span className="text-zinc-400"> · </span>
            Blogs
          </p>
          <h1 id="blogs-heading" className="mt-4 text-4xl font-semibold tracking-tight text-zinc-900 dark:text-zinc-50 sm:text-5xl">
            Blogs &amp; op-eds
          </h1>
          <p className="mt-5 max-w-3xl text-lg leading-relaxed text-zinc-600 dark:text-zinc-400">
            {activeProgramLabel
              ? `Research insights, field perspectives, and expert commentary in ${activeProgramLabel}.`
              : "Research insights, field perspectives, and expert commentary from our team across Africa."}
          </p>
          {activeProgramLabel ? (
            <p className="mt-3 text-sm text-zinc-600 dark:text-zinc-400">
              Showing program:{" "}
              <span className="font-medium text-zinc-900 dark:text-zinc-200">{activeProgramLabel}</span>
              <span className="text-zinc-400"> · </span>
              <Link href="/africa/publications/blogs" className="font-medium text-teal-800 hover:underline dark:text-teal-300">
                View all blogs
              </Link>
            </p>
          ) : null}
          <p className="mt-4 text-sm text-zinc-600 dark:text-zinc-400">
            <span className="font-medium text-zinc-900 dark:text-zinc-200">{posts.length}</span> article
            {posts.length !== 1 ? "s" : ""} in this section
          </p>
          {isServiceUnavailable ? (
            <p className="mt-3 rounded-lg border border-amber-200 bg-amber-50 px-3 py-2 text-sm text-amber-900 dark:border-amber-900/40 dark:bg-amber-950/30 dark:text-amber-200">
              We are temporarily unable to load blog posts from the CMS. Please try again shortly.
            </p>
          ) : null}
        </div>
      </section>

      <section className="border-b border-zinc-200/80 bg-zinc-50/80 py-12 dark:border-zinc-800 dark:bg-zinc-950 sm:py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          {posts.length === 0 ? (
            <EmptyState />
          ) : (
            <>
              {featured && (
                <div className="mb-10">
                  <FeaturedPostCard post={featured} />
                </div>
              )}
              {rest.length > 0 && (
                <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
                  {rest.map((post) => (
                    <BlogCard key={`${post.source}-${post.id}`} post={post} />
                  ))}
                </div>
              )}
            </>
          )}
        </div>
      </section>
    </>
  );
}
