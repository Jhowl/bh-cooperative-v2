import BlogPageContent from "../../../components/pages/blog-page";

export const metadata = {
  title: "Blog",
};

export default async function PortugueseBlogPage() {
  return <BlogPageContent locale="pt" />;
}
