import { notFound } from "next/navigation";
import { getPostBySlug } from "../../lib/blog";
import { getTranslations, type Locale } from "../../lib/i18n";

type BlogPostPageContentProps = {
  locale: Locale;
  slug: string;
};

export default async function BlogPostPageContent({
  locale,
  slug,
}: BlogPostPageContentProps) {
  const t = getTranslations(locale);
  const post = await getPostBySlug(slug);

  if (!post) {
    notFound();
  }

  const dateLocale = locale === "pt" ? "pt-PT" : "en-US";

  return (
    <div className="px-6 pb-16 pt-12">
      <article className="mx-auto w-full max-w-none space-y-6 px-6 sm:px-8">
        <div>
          <p className="text-xs uppercase tracking-[0.2em] text-charcoal/50">
            {post.publishedAt
              ? new Date(post.publishedAt).toLocaleDateString(dateLocale, {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })
              : t.blog.draft}
          </p>
          <h1 className="mt-3 font-display text-4xl text-charcoal">
            {post.title}
          </h1>
          <p className="mt-4 text-lg text-charcoal/80">{post.excerpt}</p>
        </div>
        <div className="rounded-3xl border border-mist bg-white/70 p-6 text-sm leading-relaxed text-charcoal/80">
          {post.content}
        </div>
      </article>
    </div>
  );
}
