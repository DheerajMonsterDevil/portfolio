import type { MetadataRoute } from "next";
import { getAllPosts, getAllTags } from "@/lib/posts";

const SITE_URL = "https://dheerajreddybhumanapalli.github.io";

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  const posts = getAllPosts();
  const tags = getAllTags();

  return [
    { url: `${SITE_URL}/`, lastModified: new Date() },
    { url: `${SITE_URL}/blog/`, lastModified: new Date() },
    ...posts.map((post) => ({
      url: `${SITE_URL}/blog/${post.slug}/`,
      lastModified: new Date(post.date),
    })),
    ...tags.map((tag) => ({
      url: `${SITE_URL}/blog/tag/${tag}/`,
      lastModified: new Date(),
    })),
  ];
}
