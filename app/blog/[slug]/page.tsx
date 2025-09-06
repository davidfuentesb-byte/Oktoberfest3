// app/blog/[slug]/page.tsx
import Link from "next/link";
import { getAllPosts, getPostBySlug } from "@/lib/posts";
import ImageWithFallback from "@/components/ImageWithFallback";

function formatDateEs(dateISO: string) {
  const d = new Date(dateISO);
  return d.toLocaleDateString("es-CL", { year: "numeric", month: "long", day: "numeric" });
}

export async function generateStaticParams() {
  // SSG: pre-generar rutas si haces build estático
  return getAllPosts().map((p) => ({ slug: p.slug }));
}

export default async function BlogPostPage({ params }: { params: { slug: string } }) {
  // Traemos el post y toda la lista (ya ordenada DESC por fecha en lib/posts.ts)
  const [post, all] = await Promise.all([getPostBySlug(params.slug), getAllPosts()]);

  if (!post) {
    return (
      <section className="section">
        <div className="container-default">
          <p>Artículo no encontrado.</p>
          <Link href="/blog" className="btn-ghost mt-4 inline-block">Volver al Blog</Link>
        </div>
      </section>
    );
  }

  // Encontrar posición del post actual en la lista ordenada (más nuevos primero)
  const idx = all.findIndex((p) => p.slug === post.slug);
  const newer = idx > 0 ? all[idx - 1] : null;                  // más nuevo que el actual
  const older = idx >= 0 && idx < all.length - 1 ? all[idx + 1] : null; // más antiguo que el actual

  return (
    <section className="section">
      <div className="container-default">
        {/* Volver arriba (izquierda) */}
        <Link href="/blog" className="btn-ghost inline-block mb-4">← Volver al Blog</Link>

        <article className="card overflow-hidden p-0">
          {/* HERO responsive:
              - móvil: 4/3
              - sm/md: 16/9
              - lg+: 21/9 + altura máxima 60vh */}
          <div className="mx-auto w-full max-w-5xl">
            <div className="relative overflow-hidden rounded-xl bg-gray-100
                            aspect-[4/3] sm:aspect-video lg:aspect-[21/9] lg:max-h-[60vh]">
              <ImageWithFallback
                src={post.cover}
                alt={post.title}
                className="w-full h-full object-cover"
              />
            </div>
          </div>

          {/* Contenido */}
          <div className="p-6 mx-auto w-full max-w-3xl">
            <h1 className="text-3xl md:text-4xl font-extrabold">{post.title}</h1>
            <div className="text-sm text-gray-500 mt-1">{formatDateEs(post.date)}</div>

            <div className="prose prose-amber max-w-none mt-6">
              <div dangerouslySetInnerHTML={{ __html: post.contentHtml }} />
            </div>
          </div>
        </article>

        {/* Navegación inferior: Nuevo ← Blog → Antiguo */}
        <nav className="mt-6">
          <div className="flex items-center justify-between gap-3">
            {/* Izquierda: más nuevo que el actual (si existe) */}
            <div className="flex-1">
              {newer ? (
                <Link href={`/blog/${newer.slug}`} className="btn-ghost inline-block">
                  ← {newer.title}
                </Link>
              ) : (
                <span className="inline-block opacity-50 cursor-default select-none px-3 py-1.5">
                  {/* sin enlace cuando no hay más nuevos */}
                </span>
              )}
            </div>

            {/* Centro: volver al índice del blog */}
            <div className="flex-shrink-0">
              <Link href="/blog" className="btn-ghost inline-block">Volver al Blog</Link>
            </div>

            {/* Derecha: más antiguo que el actual (si existe) */}
            <div className="flex-1 text-right">
              {older ? (
                <Link href={`/blog/${older.slug}`} className="btn-ghost inline-block">
                  {older.title} →
                </Link>
              ) : (
                <span className="inline-block opacity-50 cursor-default select-none px-3 py-1.5">
                  {/* sin enlace cuando no hay más antiguos */}
                </span>
              )}
            </div>
          </div>
        </nav>
      </div>
    </section>
  );
}
