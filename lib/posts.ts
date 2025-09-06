// lib/posts.ts
import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { remark } from "remark";
import html from "remark-html";

export type PostMeta = {
  slug: string;
  title: string;
  date: string;       // ISO (YYYY-MM-DD) recomendado
  excerpt?: string;
  cover?: string;     // ruta pública ej: /img/blog/mi-portada.jpg
  featured?: boolean; // NUEVO: destacados arriba del blog
};

export type Post = PostMeta & {
  contentHtml: string;
};

const postsDirectory = path.join(process.cwd(), "posts");

function isValidDate(d?: string) {
  if (!d) return false;
  const t = Date.parse(d);
  return !Number.isNaN(t);
}

export function getAllPosts(): PostMeta[] {
  if (!fs.existsSync(postsDirectory)) return [];

  const fileNames = fs.readdirSync(postsDirectory).filter((f) => f.endsWith(".md") || f.endsWith(".mdx"));
  const posts = fileNames.map((fileName) => {
    const slug = fileName.replace(/\.mdx?$/, "");
    const fullPath = path.join(postsDirectory, fileName);
    const fileContents = fs.readFileSync(fullPath, "utf8");
    const { data } = matter(fileContents);

    const meta: PostMeta = {
      slug,
      title: data.title ?? slug,
      date: isValidDate(data.date) ? data.date : "1970-01-01",
      excerpt: data.excerpt ?? "",
      cover: data.cover ?? "",
      featured: Boolean(data.featured) || false,
    };
    return meta;
  });

  // Orden general: más recientes primero
  posts.sort((a, b) => Date.parse(b.date) - Date.parse(a.date));
  return posts;
}

export async function getPostBySlug(slug: string): Promise<Post | null> {
  const mdPath = path.join(postsDirectory, `${slug}.md`);
  const mdxPath = path.join(postsDirectory, `${slug}.mdx`);
  const fullPath = fs.existsSync(mdPath) ? mdPath : fs.existsSync(mdxPath) ? mdxPath : "";

  if (!fullPath) return null;

  const fileContents = fs.readFileSync(fullPath, "utf8");
  const { data, content } = matter(fileContents);

  const processedContent = await remark().use(html).process(content);
  const contentHtml = processedContent.toString();

  return {
    slug,
    title: data.title ?? slug,
    date: isValidDate(data.date) ? data.date : "1970-01-01",
    excerpt: data.excerpt ?? "",
    cover: data.cover ?? "",
    featured: Boolean(data.featured) || false,
    contentHtml,
  };
}

export function getLatestPosts(n = 3): PostMeta[] {
  return getAllPosts().slice(0, n);
}
