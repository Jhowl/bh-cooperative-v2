import BlogPageContent from "../../components/pages/blog-page";

export const metadata = {
  title: "Blog",
};

export default async function BlogPage() {
  return <BlogPageContent locale="en" />;
}
