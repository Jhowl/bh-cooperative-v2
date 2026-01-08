import Link from "next/link";
import { getAllPosts } from "../../lib/blog";
import { getTranslations, localizePath, type Locale } from "../../lib/i18n";

type BlogPageContentProps = {
  locale: Locale;
};

export default async function BlogPageContent({ locale }: BlogPageContentProps) {
  const t = getTranslations(locale);
  const posts = await getAllPosts();
  const dateLocale = locale === "pt" ? "pt-PT" : "en-US";

  return (
    <div className="px-6 pb-16 pt-12">
      <div className="mx-auto w-full max-w-none space-y-10 px-6 sm:px-8">
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.25em] text-charcoal/60">
            {t.blog.badge}
          </p>
          <h1 className="mt-3 font-display text-4xl text-charcoal">
            {t.blog.title}
          </h1>
          <p className="mt-4 text-lg text-charcoal/80">{t.blog.intro}</p>
        </div>
        <div className="grid gap-6">
          {posts.map((post) => (
            <article
              key={post.slug}
              className="rounded-3xl border border-mist bg-white/70 p-6 shadow-sm"
            >
              <p className="text-xs uppercase tracking-[0.2em] text-charcoal/50">
                {post.publishedAt
                  ? new Date(post.publishedAt).toLocaleDateString(dateLocale, {
                      year: "numeric",
                      month: "short",
                      day: "numeric",
                    })
                  : t.blog.draft}
              </p>
              <h2 className="mt-3 font-display text-2xl text-charcoal">
                {post.title}
              </h2>
              <p className="mt-2 text-sm text-charcoal/70">{post.excerpt}</p>
              <Link
                href={localizePath(locale, `/blog/${post.slug}`)}
                className="mt-4 inline-flex text-sm font-semibold text-pine"
              >
                {t.blog.readMore}
              </Link>
            </article>
          ))}
        </div>
      </div>
    </div>
  );
}
