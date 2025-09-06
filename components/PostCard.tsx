// components/PostCard.tsx
import Link from "next/link";

export default function PostCard({
  slug, title, date, excerpt,
}: { slug: string; title: string; date?: string; excerpt?: string }) {
  return (
    <article className="card hover:shadow transition">
      <h3 className="text-lg font-semibold">
        <Link href={`/blog/${slug}`}>{title}</Link>
      </h3>
      {date && <p className="text-xs text-gray-500 mt-1">{date}</p>}
      {excerpt && <p className="text-sm mt-2 line-clamp-3">{excerpt}</p>}
      <Link href={`/blog/${slug}`} className="link text-sm mt-3 inline-block">
        Leer más →
      </Link>
    </article>
  );
}
