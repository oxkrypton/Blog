import { BlogList, BlogPagination } from "@/components/blog-list";
import { allPosts } from "content-collections";
import type { Metadata } from "next";
import { Suspense } from "react";

export const metadata: Metadata = {
  title: "Blog",
  description: "Thoughts on software development, life, and more.",
  openGraph: {
    title: "Blog",
    description: "Thoughts on software development, life, and more.",
  },
  twitter: {
    card: "summary_large_image",
    title: "Blog",
    description: "Thoughts on software development, life, and more.",
  },
};

export default function BlogPage() {
  const posts = [...allPosts]
    .sort(
      (a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime()
    )
    .map((post) => ({
      slug: post._meta.path.replace(/\.mdx$/, ""),
      title: post.title,
      publishedAt: post.publishedAt,
    }));

  return (
    <Suspense fallback={<BlogList posts={posts} />}>
      <BlogPagination posts={posts} />
    </Suspense>
  );
}
