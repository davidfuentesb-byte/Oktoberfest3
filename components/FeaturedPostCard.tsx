// components/FeaturedPostCard.tsx
import Link from "next/link";
import ImageWithFallback from "@/components/ImageWithFallback";

export type FeaturedPostCardProps = {
  slug: string;
  title: string;
  date: string;     // ISO
  excerpt?: string;
  cover?: string;
};

function formatDateEs(dateISO: string) {
  const d = new Date(dateISO);
  return d.toLocaleDateString("es-CL", { year: "numeric", month: "long", day: "numeric" });
}

export default function FeaturedPostCard({ slug, title, date, excerpt, cover }: FeaturedPostCardProps) {
  return (
    <article className="card card-featured p-0 overflow-hidden h-full">
      <Link href={`/blog/${slug}`} className="block focus:outline-none focus:ring-2 focus:ring-amber-400 rounded-xl">
        {/* Badge “Destacado” */}
        <div className="px-4 pt-3">
          <span className="badge">Destacado</span>
        </div>

        <div className="aspect-[4/3] bg-gray-100">
          <ImageWithFallback
            src={cover}
            alt={title}
            className="w-full h-full object-cover"
          />
        </div>

        <div className="p-4">
          <h3 className="font-semibold leading-snug line-clamp-2">{title}</h3>
          <div className="text-xs text-gray-600 mt-1">{formatDateEs(date)}</div>
          {excerpt && <p className="text-sm text-gray-700 mt-2 line-clamp-3">{excerpt}</p>}
          <span className="inline-block mt-3 btn-ghost">Leer más</span>
        </div>
      </Link>
    </article>
  );
}
