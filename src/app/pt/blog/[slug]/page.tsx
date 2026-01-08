import { getAllPosts, getPostBySlug } from "../../../../lib/blog";
import BlogPostPageContent from "../../../../components/pages/blog-post-page";

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
      title: "Post nao encontrado",
    };
  }

  return {
    title: post.title,
    description: post.excerpt,
  };
}

export default async function PortugueseBlogPostPage({
  params,
}: BlogPostPageProps) {
  return <BlogPostPageContent locale="pt" slug={params.slug} />;
}
