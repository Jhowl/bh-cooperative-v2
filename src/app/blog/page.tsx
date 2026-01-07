import Link from "next/link";
import { getAllPosts } from "../../lib/blog";

export const metadata = {
  title: "Blog",
};

export default async function BlogPage() {
  const posts = await getAllPosts();

  return (
    <div className="px-6 pb-16 pt-12">
      <div className="mx-auto w-full max-w-none space-y-10 px-6 sm:px-8">
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.25em] text-charcoal/60">
            Blog
          </p>
          <h1 className="mt-3 font-display text-4xl text-charcoal">
            News, updates, and cooperative stories.
          </h1>
          <p className="mt-4 text-lg text-charcoal/80">
            Insights from providers, coordinators, and community partners.
          </p>
        </div>
        <div className="grid gap-6">
          {posts.map((post) => (
            <article
              key={post.slug}
              className="rounded-3xl border border-mist bg-white/70 p-6 shadow-sm"
            >
              <p className="text-xs uppercase tracking-[0.2em] text-charcoal/50">
                {post.publishedAt
                  ? new Date(post.publishedAt).toLocaleDateString("en-US", {
                      year: "numeric",
                      month: "short",
                      day: "numeric",
                    })
                  : "Draft"}
              </p>
              <h2 className="mt-3 font-display text-2xl text-charcoal">
                {post.title}
              </h2>
              <p className="mt-2 text-sm text-charcoal/70">{post.excerpt}</p>
              <Link
                href={`/blog/${post.slug}`}
                className="mt-4 inline-flex text-sm font-semibold text-pine"
              >
                Read more →
              </Link>
            </article>
          ))}
        </div>
      </div>
    </div>
  );
}
