import { notFound } from "next/navigation";
import { getAllPosts, getPostBySlug } from "../../../lib/blog";

type BlogPostPageProps = {
  params: { slug: string };
};

export async function generateStaticParams() {
  const posts = await getAllPosts();
  return posts.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({ params }: BlogPostPageProps) {
  const { slug } = params;
  const post = await getPostBySlug(slug);

  if (!post) {
    return {
      title: "Post not found",
    };
  }

  return {
    title: post.title,
    description: post.excerpt,
  };
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const { slug } = params;
  const post = await getPostBySlug(slug);

  if (!post) {
    notFound();
  }

  return (
    <div className="px-6 pb-16 pt-12">
      <article className="mx-auto w-full max-w-none space-y-6 px-6 sm:px-8">
        <div>
          <p className="text-xs uppercase tracking-[0.2em] text-charcoal/50">
            {post.publishedAt
              ? new Date(post.publishedAt).toLocaleDateString("en-US", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })
              : "Draft"}
          </p>
          <h1 className="mt-3 font-display text-4xl text-charcoal">{post.title}</h1>
          <p className="mt-4 text-lg text-charcoal/80">{post.excerpt}</p>
        </div>
        <div className="rounded-3xl border border-mist bg-white/70 p-6 text-sm leading-relaxed text-charcoal/80">
          {post.content}
        </div>
      </article>
    </div>
  );
}
