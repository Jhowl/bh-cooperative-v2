export type BlogPost = {
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  publishedAt: string;
};

const fallbackPosts: BlogPost[] = [
  {
    slug: "community-care-in-action",
    title: "Community Care in Action",
    excerpt: "How the cooperative model keeps service delivery personal and dependable.",
    content:
      "Our providers collaborate on schedules, share best practices, and support one another to deliver consistent care for every client.",
    publishedAt: "2025-01-12",
  },
  {
    slug: "building-trust-with-clients",
    title: "Building Trust with Clients",
    excerpt: "Clear standards, transparent expectations, and reliable follow-up.",
    content:
      "We align every service plan with detailed onboarding, progress updates, and accessible coordinators who stay involved.",
    publishedAt: "2024-12-05",
  },
];

type StrapiPostResponse = {
  data: Array<{
    attributes: {
      title: string;
      slug: string;
      excerpt?: string;
      content?: string;
      publishedAt?: string;
    };
  }>;
};

async function fetchStrapiPosts(): Promise<BlogPost[] | null> {
  const baseUrl = process.env.STRAPI_API_URL;
  if (!baseUrl) {
    return null;
  }

  const url = new URL("/api/posts", baseUrl);
  url.searchParams.set("pagination[pageSize]", "100");
  url.searchParams.set("sort", "publishedAt:desc");

  const headers: HeadersInit = {};
  if (process.env.STRAPI_API_TOKEN) {
    headers.Authorization = `Bearer ${process.env.STRAPI_API_TOKEN}`;
  }

  const response = await fetch(url.toString(), {
    headers,
    next: { revalidate: 300 },
  });

  if (!response.ok) {
    return null;
  }

  const payload = (await response.json()) as StrapiPostResponse;

  return payload.data.map((post) => ({
    slug: post.attributes.slug,
    title: post.attributes.title,
    excerpt: post.attributes.excerpt ?? "",
    content: post.attributes.content ?? "",
    publishedAt: post.attributes.publishedAt ?? "",
  }));
}

export async function getAllPosts(): Promise<BlogPost[]> {
  const posts = await fetchStrapiPosts();
  return posts && posts.length > 0 ? posts : fallbackPosts;
}

export async function getPostBySlug(slug: string): Promise<BlogPost | null> {
  const posts = await getAllPosts();
  return posts.find((post) => post.slug === slug) ?? null;
}
