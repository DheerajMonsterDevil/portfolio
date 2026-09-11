import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";
import { remark } from "remark";
import remarkHtml from "remark-html";

export interface PostFrontmatter {
  title: string;
  date: string;
  summary: string;
  tags: string[];
  image?: string;
  draft?: boolean;
}

export interface Post extends PostFrontmatter {
  slug: string;
  contentHtml: string;
  readingMinutes: number;
}

export interface PostMeta extends PostFrontmatter {
  slug: string;
  readingMinutes: number;
}

const POSTS_DIR = path.join(process.cwd(), "content", "blog");
const SLUG_PATTERN = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;

function readingMinutesFor(text: string): number {
  const words = text.trim().split(/\s+/).filter(Boolean).length;
  return Math.max(1, Math.ceil(words / 200));
}

function parseTags(value: unknown, slug: string): string[] {
  if (!Array.isArray(value)) {
    throw new Error(
      `Post "${slug}" has invalid frontmatter: "tags" must be a list, e.g. tags: [ai-news, newsletter]`
    );
  }
  const tags = value.map((t) => String(t).trim().toLowerCase());
  if (tags.some((t) => t.length === 0)) {
    throw new Error(`Post "${slug}" has an empty tag in frontmatter "tags"`);
  }
  return [...new Set(tags)];
}

function validateFrontmatter(slug: string, data: Record<string, unknown>): PostFrontmatter {
  const { title, date, summary, tags, image, draft } = data;

  if (typeof title !== "string" || title.trim().length === 0) {
    throw new Error(`Post "${slug}" has invalid frontmatter: "title" is required`);
  }
  if (typeof date !== "string" || !/^\d{4}-\d{2}-\d{2}$/.test(date) || Number.isNaN(Date.parse(date))) {
    throw new Error(
      `Post "${slug}" has invalid frontmatter: "date" must be YYYY-MM-DD`
    );
  }
  if (typeof summary !== "string" || summary.trim().length === 0) {
    throw new Error(`Post "${slug}" has invalid frontmatter: "summary" is required`);
  }
  if (image !== undefined && (typeof image !== "string" || image.trim().length === 0)) {
    throw new Error(`Post "${slug}" has invalid frontmatter: "image" must be a non-empty path`);
  }
  if (draft !== undefined && typeof draft !== "boolean") {
    throw new Error(`Post "${slug}" has invalid frontmatter: "draft" must be true or false`);
  }

  return {
    title: title.trim(),
    date,
    summary: summary.trim(),
    tags: parseTags(tags, slug),
    ...(image ? { image: (image as string).trim() } : {}),
    ...(draft !== undefined ? { draft } : {}),
  };
}

function readPostFile(fileName: string): Post | null {
  if (!fileName.endsWith(".md") || fileName.startsWith("_")) return null;
  const slug = fileName.replace(/\.md$/, "");
  if (!SLUG_PATTERN.test(slug)) {
    throw new Error(
      `Invalid post filename "${fileName}": use lowercase letters, numbers, and hyphens only (e.g. my-first-post.md)`
    );
  }
  const raw = fs.readFileSync(path.join(POSTS_DIR, fileName), "utf8");
  const { data, content } = matter(raw);
  const frontmatter = validateFrontmatter(slug, data as Record<string, unknown>);
  if (frontmatter.draft === true) return null;
  return {
    ...frontmatter,
    slug,
    contentHtml: "", // filled in by getPostBySlug
    readingMinutes: readingMinutesFor(content),
  };
}

async function markdownToHtml(markdown: string): Promise<string> {
  const file = await remark().use(remarkHtml).process(markdown);
  return String(file);
}

/** All published posts, newest first. */
export function getAllPosts(): PostMeta[] {
  if (!fs.existsSync(POSTS_DIR)) return [];
  const posts: PostMeta[] = [];
  for (const fileName of fs.readdirSync(POSTS_DIR)) {
    const post = readPostFile(fileName);
    if (post) {
      const { contentHtml: _omitted, ...meta } = post;
      posts.push(meta);
    }
  }
  return posts.sort((a, b) => (a.date < b.date ? 1 : a.date > b.date ? -1 : 0));
}

/** Full post (including rendered HTML) by slug. Returns null when not found. */
export async function getPostBySlug(slug: string): Promise<Post | null> {
  if (!fs.existsSync(POSTS_DIR)) return null;
  const filePath = path.join(POSTS_DIR, `${slug}.md`);
  if (!fs.existsSync(filePath)) return null;
  const raw = fs.readFileSync(filePath, "utf8");
  const { data, content } = matter(raw);
  const frontmatter = validateFrontmatter(slug, data as Record<string, unknown>);
  if (frontmatter.draft === true) return null;
  return {
    ...frontmatter,
    slug,
    contentHtml: await markdownToHtml(content),
    readingMinutes: readingMinutesFor(content),
  };
}

/** All tags across published posts, sorted alphabetically. */
export function getAllTags(): string[] {
  const tags = new Set<string>();
  for (const post of getAllPosts()) {
    for (const tag of post.tags) tags.add(tag);
  }
  return [...tags].sort();
}

/** Up to `limit` posts sharing the most tags with the given post (excluding itself). */
export function getRelatedPosts(slug: string, limit = 3): PostMeta[] {
  const posts = getAllPosts();
  const current = posts.find((p) => p.slug === slug);
  if (!current) return [];
  const tagSet = new Set(current.tags);
  return posts
    .filter((p) => p.slug !== slug)
    .map((p) => ({
      post: p,
      overlap: p.tags.filter((t) => tagSet.has(t)).length,
    }))
    .sort((a, b) => b.overlap - a.overlap || (a.post.date < b.post.date ? 1 : -1))
    .slice(0, limit)
    .map(({ post }) => post);
}
