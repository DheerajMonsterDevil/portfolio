import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { BlogCard } from "@/components/BlogCard";
import { FadeIn } from "@/components/FadeIn";
import { getAllPosts, getAllTags } from "@/lib/posts";

export function generateStaticParams() {
  const tags = getAllTags();
  // Same placeholder strategy as /blog/[slug]: static export needs at least
  // one param; this page 404s and is never linked or listed in the sitemap.
  if (tags.length === 0) return [{ tag: "__no_tags__" }];
  return tags.map((tag) => ({ tag }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ tag: string }>;
}): Promise<Metadata> {
  const { tag } = await params;
  return {
    title: `Posts tagged "${tag}" | Dheeraj Reddy Bhumanapalli`,
    description: `All blog posts tagged "${tag}" — AI news and technical newsletters by Dheeraj Reddy Bhumanapalli.`,
  };
}

export default async function TagPage({
  params,
}: {
  params: Promise<{ tag: string }>;
}) {
  const { tag } = await params;
  const tags = getAllTags();
  if (!tags.includes(tag)) notFound();
  const posts = getAllPosts().filter((post) => post.tags.includes(tag));

  return (
    <>
      <Navbar />
      <main className="mx-auto max-w-5xl px-6 py-16 sm:py-20">
        <FadeIn>
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 text-sm font-medium text-muted transition-colors hover:text-foreground"
          >
            <ArrowLeft className="h-4 w-4" aria-hidden /> All posts
          </Link>
          <h1 className="mt-6 text-4xl font-bold tracking-tight sm:text-5xl">
            Posts tagged{" "}
            <span className="rounded-full bg-card px-4 py-1 align-middle text-2xl text-accent sm:text-3xl">
              {tag}
            </span>
          </h1>
          <p className="mt-4 text-lg text-muted">
            {posts.length} {posts.length === 1 ? "post" : "posts"}
          </p>
        </FadeIn>
        <div className="mt-10 grid gap-6 sm:grid-cols-2">
          {posts.map((post) => (
            <BlogCard key={post.slug} post={post} />
          ))}
        </div>
      </main>
      <Footer />
    </>
  );
}
